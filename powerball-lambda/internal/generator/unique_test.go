// internal/generator/unique_test.go
package generator

import (
	"powerball-lambda/internal/models"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGenerateUniqueCombination(t *testing.T) {
	// 테스트용 과거 데이터 생성
	draws := []models.PowerballDraw{
		{
			WhiteNumbers: []string{"01", "02", "03", "04", "05"},
			Powerball:    "01",
		},
		{
			WhiteNumbers: []string{"06", "07", "08", "09", "10"},
			Powerball:    "02",
		},
	}

	g := NewGenerator(draws)

	t.Run("유니크 조합 생성", func(t *testing.T) {
		numbers, err := g.GenerateUniqueCombination(1000)
		assert.NoError(t, err)

		// 기본 검증
		assert.Len(t, numbers.WhiteNumbers, 5)
		assert.Greater(t, numbers.Powerball, 0)

		// 범위 검증
		for _, num := range numbers.WhiteNumbers {
			assert.GreaterOrEqual(t, num, 1)
			assert.LessOrEqual(t, num, 69)
		}
		assert.GreaterOrEqual(t, numbers.Powerball, 1)
		assert.LessOrEqual(t, numbers.Powerball, 26)

		// 과거 조합과 중복 검증
		combination := g.createCombinationString(numbers)
		existingCombinations := g.createExistingCombinationsMap()
		assert.False(t, existingCombinations[combination])
	})

	t.Run("조합 문자열 생성", func(t *testing.T) {
		numbers := models.GeneratedNumbers{
			WhiteNumbers: []int{5, 4, 3, 2, 1},
			Powerball:    6,
		}

		combination := g.createCombinationString(numbers)
		expected := "01,02,03,04,05|06"
		assert.Equal(t, expected, combination)
	})
}
