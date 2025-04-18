package generator

import (
	"megamillions-lambda/internal/models"
	"sort"
	"testing"

	"github.com/stretchr/testify/assert"
)

// 테스트용 MegaMillionsDraw 생성 헬퍼 함수
func createTestDraws() []models.MegaMillionsDraw {
	return []models.MegaMillionsDraw{
		{
			Date:         "2023-01-01",
			WhiteNumbers: []int{1, 15, 23, 44, 61},
			MegaBall:     10,
			Rules: models.Rules{
				WhiteBallRange: []int{1, 70},
				MegaBallRange:  []int{1, 24},
			},
		},
		{
			Date:         "2022-12-30",
			WhiteNumbers: []int{5, 15, 25, 47, 62},
			MegaBall:     15,
			Rules: models.Rules{
				WhiteBallRange: []int{1, 70},
				MegaBallRange:  []int{1, 24},
			},
		},
		{
			Date:         "2022-12-27",
			WhiteNumbers: []int{1, 15, 23, 44, 67},
			MegaBall:     10,
			Rules: models.Rules{
				WhiteBallRange: []int{1, 70},
				MegaBallRange:  []int{1, 24},
			},
		},
	}
}

// NewGenerator 테스트
func TestNewGenerator(t *testing.T) {
	draws := createTestDraws()
	g := NewGenerator(draws)

	// Generator가 올바르게 초기화되었는지 확인
	assert.NotNil(t, g)
	assert.Equal(t, draws, g.draws)
	assert.Equal(t, []int{1, 70}, g.whiteBallRange)
	assert.Equal(t, []int{1, 24}, g.megaBallRange)
	assert.NotNil(t, g.rand)
}

// 빈 draws 목록으로 초기화 테스트
func TestNewGeneratorWithEmptyDraws(t *testing.T) {
	g := NewGenerator([]models.MegaMillionsDraw{})

	assert.NotNil(t, g)
	assert.Empty(t, g.draws)
	assert.Equal(t, []int{1, 70}, g.whiteBallRange) // 기본값 확인
	assert.Equal(t, []int{1, 24}, g.megaBallRange)  // 기본값 확인
	assert.NotNil(t, g.rand)
}

// analyzeFrequency 메서드 테스트
func TestAnalyzeFrequency(t *testing.T) {
	draws := createTestDraws()
	g := NewGenerator(draws)

	// 흰 공 번호 빈도 분석 테스트
	whiteFreq := g.analyzeFrequency(false)

	// 빈도 정렬 확인 (높은 빈도 순)
	assert.GreaterOrEqual(t, len(whiteFreq), 3)

	// 15가 3번으로 가장 많이 나타남
	assert.Equal(t, 15, whiteFreq[0].Number)
	assert.Equal(t, 3, whiteFreq[0].Count)

	// 메가볼 빈도 분석 테스트
	megaFreq := g.analyzeFrequency(true)

	assert.Equal(t, 2, len(megaFreq))

	// 10이 2번으로 가장 많이 나타남
	assert.Equal(t, 10, megaFreq[0].Number)
	assert.Equal(t, 2, megaFreq[0].Count)
}

// GenerateRandom 테스트
func TestGenerateRandom(t *testing.T) {
	g := NewGenerator(createTestDraws())

	for i := 0; i < 10; i++ {
		numbers := g.GenerateRandom()

		// 흰 공 번호 검증
		assert.Len(t, numbers.WhiteNumbers, 5)

		// 범위 검증
		for _, num := range numbers.WhiteNumbers {
			assert.GreaterOrEqual(t, num, g.whiteBallRange[0])
			assert.LessOrEqual(t, num, g.whiteBallRange[1])
		}

		// 중복 번호 검증
		numMap := make(map[int]bool)
		for _, num := range numbers.WhiteNumbers {
			assert.False(t, numMap[num], "중복된 흰 공 번호가 있습니다")
			numMap[num] = true
		}

		// 정렬 검증
		for i := 0; i < len(numbers.WhiteNumbers)-1; i++ {
			assert.LessOrEqual(t, numbers.WhiteNumbers[i], numbers.WhiteNumbers[i+1])
		}

		// 메가볼 검증
		assert.GreaterOrEqual(t, numbers.MegaBall, g.megaBallRange[0])
		assert.LessOrEqual(t, numbers.MegaBall, g.megaBallRange[1])
	}
}

// GenerateHotNumbers 테스트
func TestGenerateHotNumbers(t *testing.T) {
	g := NewGenerator(createTestDraws())

	for i := 0; i < 10; i++ {
		numbers := g.GenerateHotNumbers()

		// 기본 검증
		assert.Len(t, numbers.WhiteNumbers, 5)

		// 중복 검증
		numMap := make(map[int]bool)
		for _, num := range numbers.WhiteNumbers {
			assert.False(t, numMap[num], "중복된 흰 공 번호가 있습니다")
			numMap[num] = true
		}

		// 정렬 검증
		for i := 0; i < len(numbers.WhiteNumbers)-1; i++ {
			assert.LessOrEqual(t, numbers.WhiteNumbers[i], numbers.WhiteNumbers[i+1])
		}

		// 자주 등장하는 번호 확인
		// 테스트 데이터의 모든 가능한 흰 공 번호
		possibleWhiteNumbers := map[int]bool{
			1: true, 5: true, 15: true, 23: true, 25: true,
			44: true, 47: true, 61: true, 62: true, 67: true,
		}

		for _, num := range numbers.WhiteNumbers {
			_, exists := possibleWhiteNumbers[num]
			assert.True(t, exists, "번호 %d는 테스트 데이터에 없습니다", num)
		}

		// 메가볼도 자주 등장하는 번호여야 함
		possibleMegaBalls := map[int]bool{10: true, 15: true}
		_, exists := possibleMegaBalls[numbers.MegaBall]
		assert.True(t, exists, "메가볼 %d는 테스트 데이터에 없습니다", numbers.MegaBall)
	}
}

// GenerateColdNumbers 테스트
func TestGenerateColdNumbers(t *testing.T) {
	g := NewGenerator(createTestDraws())

	for i := 0; i < 10; i++ {
		numbers := g.GenerateColdNumbers()

		// 기본 검증
		assert.Len(t, numbers.WhiteNumbers, 5)

		// 중복 검증
		numMap := make(map[int]bool)
		for _, num := range numbers.WhiteNumbers {
			assert.False(t, numMap[num], "중복된 흰 공 번호가 있습니다")
			numMap[num] = true
		}

		// 정렬 검증
		for i := 0; i < len(numbers.WhiteNumbers)-1; i++ {
			assert.LessOrEqual(t, numbers.WhiteNumbers[i], numbers.WhiteNumbers[i+1])
		}

		// 메가볼 범위 검증
		assert.GreaterOrEqual(t, numbers.MegaBall, g.megaBallRange[0])
		assert.LessOrEqual(t, numbers.MegaBall, g.megaBallRange[1])

		// 모든 번호가 가능한 범위 내에 있는지 확인
		for _, num := range numbers.WhiteNumbers {
			assert.GreaterOrEqual(t, num, g.whiteBallRange[0])
			assert.LessOrEqual(t, num, g.whiteBallRange[1])
		}
	}
}

// createCombinationString 메서드 테스트
func TestCreateCombinationString(t *testing.T) {
	g := NewGenerator([]models.MegaMillionsDraw{})

	// 테스트 케이스 1: 기본 테스트
	testNumbers := models.GeneratedNumbers{
		WhiteNumbers: []int{1, 15, 23, 44, 61},
		MegaBall:     10,
	}

	combination := g.createCombinationString(testNumbers)
	expected := "1-15-23-44-61|10"
	assert.Equal(t, expected, combination)

	// 테스트 케이스 2: 정렬 동작 확인
	unsortedNumbers := models.GeneratedNumbers{
		WhiteNumbers: []int{61, 1, 44, 15, 23},
		MegaBall:     10,
	}

	combination = g.createCombinationString(unsortedNumbers)
	assert.Equal(t, expected, combination, "정렬되지 않은 번호가 올바르게 정렬되지 않았습니다")

	// 테스트 케이스 3: 다른 번호
	differentNumbers := models.GeneratedNumbers{
		WhiteNumbers: []int{2, 16, 24, 45, 62},
		MegaBall:     11,
	}

	differentCombination := g.createCombinationString(differentNumbers)
	assert.NotEqual(t, combination, differentCombination, "다른 번호 세트가 동일한 조합 문자열을 생성했습니다")
}

// GenerateUniqueCombination 테스트
func TestGenerateUniqueCombination(t *testing.T) {
	// 테스트 케이스 1: 과거 조합이 없는 경우
	emptyG := NewGenerator([]models.MegaMillionsDraw{})

	numbers, err := emptyG.GenerateUniqueCombination(10)
	assert.NoError(t, err)
	assert.Len(t, numbers.WhiteNumbers, 5)

	// 테스트 케이스 2: 과거 조합이 있는 경우
	draws := createTestDraws()
	g := NewGenerator(draws)

	numbers, err = g.GenerateUniqueCombination(100)
	assert.NoError(t, err)

	// 생성된 조합이 과거 조합과 다른지 확인
	isUnique := true
	for _, draw := range draws {
		if isEqualCombination(numbers, draw) {
			isUnique = false
			break
		}
	}

	assert.True(t, isUnique, "생성된 조합이 과거 조합과 같습니다")

	// 테스트 케이스 3: 가능한 모든 조합이 이미 사용된 경우
	limitedG := NewGenerator([]models.MegaMillionsDraw{})
	limitedG.whiteBallRange = []int{1, 5} // 1~5 중 5개를 뽑는 방법은 1개만 가능
	limitedG.megaBallRange = []int{1, 1}  // 메가볼은 1만 가능

	// 가능한 유일한 조합 추가
	limitedG.draws = append(limitedG.draws, models.MegaMillionsDraw{
		WhiteNumbers: []int{1, 2, 3, 4, 5},
		MegaBall:     1,
	})

	// 유니크한 조합을 찾는 것은 불가능해야 함
	_, err = limitedG.GenerateUniqueCombination(10)
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "유니크한 조합을 찾지 못했습니다")
}

// createExistingCombinationsMap 메서드 테스트
func TestCreateExistingCombinationsMap(t *testing.T) {
	draws := createTestDraws()
	g := NewGenerator(draws)

	combinations := g.createExistingCombinationsMap()

	// 각 draw에 대해 조합이 맵에 있는지 확인
	for _, draw := range draws {
		numbers := models.GeneratedNumbers{
			WhiteNumbers: draw.WhiteNumbers,
			MegaBall:     draw.MegaBall,
		}

		combination := g.createCombinationString(numbers)
		assert.True(t, combinations[combination], "조합 %s가 맵에 없습니다", combination)
	}

	// 다른 번호 조합은 맵에 없어야 함
	differentNumbers := models.GeneratedNumbers{
		WhiteNumbers: []int{2, 16, 24, 45, 62},
		MegaBall:     11,
	}

	differentCombination := g.createCombinationString(differentNumbers)
	assert.False(t, combinations[differentCombination], "다른 조합 %s가 맵에 있습니다", differentCombination)
}

// formatNumber 메서드 테스트
func TestFormatNumber(t *testing.T) {
	g := NewGenerator([]models.MegaMillionsDraw{})

	assert.Equal(t, "5", g.formatNumber(5))
	assert.Equal(t, "10", g.formatNumber(10))
	assert.Equal(t, "0", g.formatNumber(0))
}

// 헬퍼 함수: 두 번호 조합이 같은지 확인
func isEqualCombination(numbers models.GeneratedNumbers, draw models.MegaMillionsDraw) bool {
	if numbers.MegaBall != draw.MegaBall {
		return false
	}

	sortedWhites := make([]int, len(numbers.WhiteNumbers))
	copy(sortedWhites, numbers.WhiteNumbers)
	sort.Ints(sortedWhites)

	sortedDrawWhites := make([]int, len(draw.WhiteNumbers))
	copy(sortedDrawWhites, draw.WhiteNumbers)
	sort.Ints(sortedDrawWhites)

	if len(sortedWhites) != len(sortedDrawWhites) {
		return false
	}

	for i := range sortedWhites {
		if sortedWhites[i] != sortedDrawWhites[i] {
			return false
		}
	}

	return true
}
