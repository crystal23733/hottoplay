// internal/generator/statistics_test.go
package generator

import (
	"powerball-lambda/internal/models"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGenerateHotNumbers(t *testing.T) {
	// 테스트용 과거 데이터 생성
	draws := []models.PowerballDraw{
		{
			WhiteNumbers: []string{"1", "2", "3", "4", "5"},
			Powerball:    "1",
		},
		{
			WhiteNumbers: []string{"1", "2", "3", "4", "6"},
			Powerball:    "1",
		},
		{
			WhiteNumbers: []string{"1", "2", "3", "4", "7"},
			Powerball:    "1",
		},
		{
			WhiteNumbers: []string{"10", "20", "30", "40", "50"},
			Powerball:    "2",
		},
		{
			WhiteNumbers: []string{"11", "21", "31", "41", "51"},
			Powerball:    "3",
		},
		{
			WhiteNumbers: []string{"15", "25", "35", "45", "55"},
			Powerball:    "5",
		},
		{
			WhiteNumbers: []string{"16", "26", "36", "46", "56"},
			Powerball:    "10",
		},
		{
			WhiteNumbers: []string{"17", "27", "37", "47", "57"},
			Powerball:    "15",
		},
		{
			WhiteNumbers: []string{"18", "28", "38", "48", "58"},
			Powerball:    "20",
		},
		{
			WhiteNumbers: []string{"19", "29", "39", "49", "59"},
			Powerball:    "25",
		},
		{
			WhiteNumbers: []string{"1", "2", "3", "4", "8"},
			Powerball:    "1",
		},
		{
			WhiteNumbers: []string{"1", "2", "3", "4", "9"},
			Powerball:    "1",
		},
		{
			WhiteNumbers: []string{"1", "2", "3", "5", "6"},
			Powerball:    "2",
		},
		{
			WhiteNumbers: []string{"1", "2", "3", "5", "7"},
			Powerball:    "2",
		},
		{
			WhiteNumbers: []string{"1", "2", "3", "6", "7"},
			Powerball:    "3",
		},
	}

	g := NewGenerator(draws)

	t.Run("핫 넘버 생성", func(t *testing.T) {
		numbers := g.GenerateHotNumbers()

		// 기본 검증
		assert.Len(t, numbers.WhiteNumbers, 5, "흰 공은 5개여야 합니다")
		assert.Greater(t, numbers.Powerball, 0, "파워볼은 0보다 커야 합니다")

		// 범위 검증
		for _, num := range numbers.WhiteNumbers {
			assert.GreaterOrEqual(t, num, 1, "흰 공 번호는 1 이상이어야 합니다")
			assert.LessOrEqual(t, num, 69, "흰 공 번호는 69 이하여야 합니다")
		}
		assert.GreaterOrEqual(t, numbers.Powerball, 1, "파워볼은 1 이상이어야 합니다")
		assert.LessOrEqual(t, numbers.Powerball, 26, "파워볼은 26 이하여야 합니다")

		// 중복 검증
		numMap := make(map[int]bool)
		for _, num := range numbers.WhiteNumbers {
			assert.False(t, numMap[num], "흰 공 번호는 중복되면 안 됩니다")
			numMap[num] = true
		}

		// 정렬 검증
		for i := 0; i < len(numbers.WhiteNumbers)-1; i++ {
			assert.Less(t,
				numbers.WhiteNumbers[i],
				numbers.WhiteNumbers[i+1],
				"흰 공 번호는 오름차순으로 정렬되어야 합니다",
			)
		}
	})
}

func TestGenerateColdNumbers(t *testing.T) {
	// 테스트용 과거 데이터 생성
	draws := []models.PowerballDraw{
		// 1~10번이 매우 자주 나오는 패턴
		{
			WhiteNumbers: []string{"1", "2", "3", "4", "5"},
			Powerball:    "1",
		},
		{
			WhiteNumbers: []string{"6", "7", "8", "9", "10"},
			Powerball:    "2",
		},
		{
			WhiteNumbers: []string{"1", "2", "3", "4", "6"},
			Powerball:    "1",
		},
		{
			WhiteNumbers: []string{"5", "6", "7", "8", "9"},
			Powerball:    "2",
		},
		{
			WhiteNumbers: []string{"1", "2", "3", "4", "7"},
			Powerball:    "1",
		},
		{
			WhiteNumbers: []string{"5", "6", "7", "8", "10"},
			Powerball:    "2",
		},
		{
			WhiteNumbers: []string{"1", "2", "3", "4", "8"},
			Powerball:    "1",
		},
		{
			WhiteNumbers: []string{"5", "6", "7", "9", "10"},
			Powerball:    "2",
		},
		// 중간 번호대(30~40)는 가끔 나오는 패턴
		{
			WhiteNumbers: []string{"31", "32", "33", "34", "35"},
			Powerball:    "10",
		},
		{
			WhiteNumbers: []string{"36", "37", "38", "39", "40"},
			Powerball:    "15",
		},
		// 높은 번호대(60~69)는 매우 드물게 나오는 패턴
		{
			WhiteNumbers: []string{"61", "62", "63", "64", "65"},
			Powerball:    "20",
		},
	}

	g := NewGenerator(draws)

	t.Run("콜드 넘버 생성", func(t *testing.T) {
		numbers := g.GenerateColdNumbers()

		// 기본 검증
		assert.Len(t, numbers.WhiteNumbers, 5, "흰 공은 5개여야 합니다")
		assert.Greater(t, numbers.Powerball, 0, "파워볼은 0보다 커야 합니다")

		// 범위 검증
		for _, num := range numbers.WhiteNumbers {
			assert.GreaterOrEqual(t, num, 1, "흰 공 번호는 1 이상이어야 합니다")
			assert.LessOrEqual(t, num, 69, "흰 공 번호는 69 이하여야 합니다")
		}
		assert.GreaterOrEqual(t, numbers.Powerball, 1, "파워볼은 1 이상이어야 합니다")
		assert.LessOrEqual(t, numbers.Powerball, 26, "파워볼은 26 이하여야 합니다")

		// 중복 검증
		numMap := make(map[int]bool)
		for _, num := range numbers.WhiteNumbers {
			assert.False(t, numMap[num], "흰 공 번호는 중복되면 안 됩니다")
			numMap[num] = true
		}

		// 정렬 검증
		for i := 0; i < len(numbers.WhiteNumbers)-1; i++ {
			assert.Less(t,
				numbers.WhiteNumbers[i],
				numbers.WhiteNumbers[i+1],
				"흰 공 번호는 오름차순으로 정렬되어야 합니다",
			)
		}
	})

	t.Run("빈도수 검증", func(t *testing.T) {
		// 여러 번 생성하여 낮은 빈도의 번호가 더 자주 선택되는지 검증
		frequency := make(map[int]int)
		iterations := 100

		for i := 0; i < iterations; i++ {
			numbers := g.GenerateColdNumbers()
			for _, num := range numbers.WhiteNumbers {
				frequency[num]++
			}
		}

		// 자주 나왔던 낮은 번호들(1~7)의 출현 빈도가 적은지 검증
		for i := 1; i <= 7; i++ {
			assert.LessOrEqual(t,
				frequency[i],
				iterations/2,
				"자주 나왔던 번호의 출현 빈도가 너무 높습니다",
			)
		}
	})
}
