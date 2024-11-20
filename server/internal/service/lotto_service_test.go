package service

import (
	"context"
	"reflect"
	"server/internal/memory"
	"server/internal/models"
	"sort"
	"testing"
)

// mockS3Client는 테스트용 S3 클라이언트입니다.
type mockS3Client struct {
	data []models.LottoData
}

func (m *mockS3Client) LoadLottoData(ctx context.Context) ([]models.LottoData, error) {
	return m.data, nil
}

func TestLottoService(t *testing.T) {
	// 테스트 데이터 준비
	testData := []models.LottoData{
		{
			DrwNo:   1,
			DrwtNo1: 1, DrwtNo2: 2, DrwtNo3: 3,
			DrwtNo4: 4, DrwtNo5: 5, DrwtNo6: 6,
		},
		{
			DrwNo:   2,
			DrwtNo1: 7, DrwtNo2: 8, DrwtNo3: 9,
			DrwtNo4: 10, DrwtNo5: 11, DrwtNo6: 12,
		},
	}

	mockS3 := &mockS3Client{data: testData}
	cache := memory.NewMemoryCache()
	service := NewLottoService(cache, mockS3)

	t.Run("InitializeData", func(t *testing.T) {
		err := service.InitializeData(context.Background())
		if err != nil {
			t.Errorf("InitializeData() error = %v", err)
		}
	})

	t.Run("GenerateRandomNumbers", func(t *testing.T) {
		numbers := service.GenerateRandomNumbers()

		if len(numbers) != 6 {
			t.Errorf("GenerateRandomNumbers() returned %d numbers, want 6", len(numbers))
		}

		// 번호가 1-45 범위인지 확인
		for _, n := range numbers {
			if n < 1 || n > 45 {
				t.Errorf("Generated number %d is out of range [1,45]", n)
			}
		}

		// 정렬되어 있는지 확인
		if !sort.IntsAreSorted(numbers) {
			t.Error("Generated numbers are not sorted")
		}
	})

	t.Run("GenerateUniqueNumbers", func(t *testing.T) {
		numbers, err := service.GenerateUniqueNumbers()
		if err != nil {
			t.Errorf("GenerateUniqueNumbers() error = %v", err)
		}

		if len(numbers) != 6 {
			t.Errorf("GenerateUniqueNumbers() returned %d numbers, want 6", len(numbers))
		}

		// 기존 번호 조합과 다른지 확인
		for _, data := range testData {
			existingNumbers := []int{data.DrwtNo1, data.DrwtNo2, data.DrwtNo3,
				data.DrwtNo4, data.DrwtNo5, data.DrwtNo6}
			sort.Ints(existingNumbers)
			if reflect.DeepEqual(numbers, existingNumbers) {
				t.Error("Generated numbers match an existing combination")
			}
		}
	})

	t.Run("GeneratePopularBasedNumbers", func(t *testing.T) {
		numbers := service.GeneratePopularBasedNumbers()

		if len(numbers) != 6 {
			t.Errorf("GeneratePopularBasedNumbers() returned %d numbers, want 6", len(numbers))
		}

		// 정렬되어 있는지 확인
		if !sort.IntsAreSorted(numbers) {
			t.Error("Generated numbers are not sorted")
		}
	})

	t.Run("GenerateUserBasedNumbers", func(t *testing.T) {
		tests := []struct {
			name        string
			userNumbers []int
			wantErr     bool
		}{
			{
				name:        "Valid user numbers",
				userNumbers: []int{1, 2, 3},
				wantErr:     false,
			},
			{
				name:        "Too many numbers",
				userNumbers: []int{1, 2, 3, 4, 5, 6, 7},
				wantErr:     true,
			},
		}

		for _, tt := range tests {
			t.Run(tt.name, func(t *testing.T) {
				numbers, err := service.GenerateUserBasedNumbers(tt.userNumbers)

				if (err != nil) != tt.wantErr {
					t.Errorf("GenerateUserBasedNumbers() error = %v, wantErr %v", err, tt.wantErr)
					return
				}

				if !tt.wantErr {
					if len(numbers) != 6 {
						t.Errorf("GenerateUserBasedNumbers() returned %d numbers, want 6", len(numbers))
					}

					// 사용자 번호가 포함되어 있는지 확인
					for _, n := range tt.userNumbers {
						found := false
						for _, gen := range numbers {
							if gen == n {
								found = true
								break
							}
						}
						if !found {
							t.Errorf("User number %d not found in generated numbers", n)
						}
					}

					// 정렬되어 있는지 확인
					if !sort.IntsAreSorted(numbers) {
						t.Error("Generated numbers are not sorted")
					}
				}
			})
		}
	})
}
