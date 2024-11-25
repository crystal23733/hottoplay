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

}
