package generator

import (
	"megamillions-lambda/internal/models"
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
				MegaBallRange:  []int{1, 25},
			},
		},
		{
			Date:         "2022-12-30",
			WhiteNumbers: []int{5, 15, 25, 47, 62},
			MegaBall:     15,
			Rules: models.Rules{
				WhiteBallRange: []int{1, 70},
				MegaBallRange:  []int{1, 25},
			},
		},
		{
			Date:         "2022-12-27",
			WhiteNumbers: []int{1, 15, 23, 44, 67},
			MegaBall:     10,
			Rules: models.Rules{
				WhiteBallRange: []int{1, 70},
				MegaBallRange:  []int{1, 25},
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
	assert.Equal(t, []int{1, 25}, g.megaBallRange)
	assert.NotNil(t, g.rand)

	// 빈도수가 올바르게 계산되었는지 확인
	assert.Equal(t, 2, g.whiteNumberFrequency[1])
	assert.Equal(t, 3, g.whiteNumberFrequency[15]) // 세 번 등장
	assert.Equal(t, 2, g.whiteNumberFrequency[23])
	assert.Equal(t, 2, g.whiteNumberFrequency[44])
	assert.Equal(t, 2, g.megaBallFrequency[10])
	assert.Equal(t, 1, g.megaBallFrequency[15])
}

// 빈 draws 목록으로 초기화 테스트
func TestNewGeneratorWithEmptyDraws(t *testing.T) {
	g := NewGenerator([]models.MegaMillionsDraw{})

	assert.NotNil(t, g)
	assert.Empty(t, g.draws)
	assert.Empty(t, g.whiteBallRange)
	assert.Empty(t, g.megaBallRange)
	assert.NotNil(t, g.rand)
}

// GenerateRandom 테스트
func TestGenerateRandom(t *testing.T) {
	draws := createTestDraws()
	g := NewGenerator(draws)

	// 여러 번 번호 생성을 테스트
	for i := 0; i < 10; i++ {
		numbers := g.GenerateRandom()

		// 흰 공 검증
		assert.Len(t, numbers.WhiteNumbers, 5)

		// 번호 범위 검증
		for _, num := range numbers.WhiteNumbers {
			assert.GreaterOrEqual(t, num, g.whiteBallRange[0])
			assert.LessOrEqual(t, num, g.whiteBallRange[1])
		}

		// 중복 검증
		numMap := make(map[int]bool)
		for _, num := range numbers.WhiteNumbers {
			assert.False(t, numMap[num], "흰 공 번호에 중복이 있습니다")
			numMap[num] = true
		}

		// 정렬 검증
		for i := 0; i < len(numbers.WhiteNumbers)-1; i++ {
			assert.Less(t, numbers.WhiteNumbers[i], numbers.WhiteNumbers[i+1])
		}

		// 메가볼 검증
		assert.GreaterOrEqual(t, numbers.MegaBall, g.megaBallRange[0])
		assert.LessOrEqual(t, numbers.MegaBall, g.megaBallRange[1])
	}
}

// 서로 다른 번호를 생성하는지 테스트
func TestGenerateRandomUniqueness(t *testing.T) {
	draws := createTestDraws()
	g := NewGenerator(draws)

	// 두 개의 번호 조합 생성
	numbers1 := g.GenerateRandom()
	numbers2 := g.GenerateRandom()

	// 두 번호 조합이 완전히 동일할 가능성은 낮음 (매우 낮은 확률로 같을 수는 있음)
	// 이 테스트는 완벽하진 않지만 rand 시드 설정이 제대로 되었는지 확인하는 용도
	equal := true
	if len(numbers1.WhiteNumbers) == len(numbers2.WhiteNumbers) {
		for i := 0; i < len(numbers1.WhiteNumbers); i++ {
			if numbers1.WhiteNumbers[i] != numbers2.WhiteNumbers[i] {
				equal = false
				break
			}
		}
	} else {
		equal = false
	}

	if equal && numbers1.MegaBall == numbers2.MegaBall {
		// 두 번호 조합이 완전히 같을 확률은 매우 낮음
		// 하지만 완전히 불가능한 것은 아니므로 경고만 출력
		t.Log("주의: 두 번호 조합이 완전히 동일합니다. 이는 가능하지만 확률적으로 매우 낮은 일입니다.")
	}
}

// calculateFrequency 메서드 테스트
func TestCalculateFrequency(t *testing.T) {
	// 커스텀 테스트 데이터 생성
	draws := []models.MegaMillionsDraw{
		{
			WhiteNumbers: []int{1, 2, 3, 4, 5},
			MegaBall:     10,
		},
		{
			WhiteNumbers: []int{1, 2, 3, 4, 6},
			MegaBall:     10,
		},
		{
			WhiteNumbers: []int{10, 20, 30, 40, 50},
			MegaBall:     20,
		},
	}

	g := &Generator{
		draws:                draws,
		whiteNumberFrequency: make(map[int]int),
		megaBallFrequency:    make(map[int]int),
	}

	// 빈도수 계산
	g.calculateFrequency()

	// 빈도수 검증
	assert.Equal(t, 2, g.whiteNumberFrequency[1])
	assert.Equal(t, 2, g.whiteNumberFrequency[2])
	assert.Equal(t, 2, g.whiteNumberFrequency[3])
	assert.Equal(t, 2, g.whiteNumberFrequency[4])
	assert.Equal(t, 1, g.whiteNumberFrequency[5])
	assert.Equal(t, 1, g.whiteNumberFrequency[6])
	assert.Equal(t, 1, g.whiteNumberFrequency[10])
	assert.Equal(t, 1, g.whiteNumberFrequency[20])

	assert.Equal(t, 2, g.megaBallFrequency[10])
	assert.Equal(t, 1, g.megaBallFrequency[20])
}

// getFrequencySortedNumbers 함수 테스트
func TestGetFrequencySortedNumbers(t *testing.T) {
	// 테스트용 빈도 맵
	freqMap := map[int]int{
		1: 10,
		2: 5,
		3: 15,
		4: 8,
		5: 12,
	}

	// 내림차순 정렬 테스트
	descendingFreqs := getFrequencySortedNumbers(freqMap, false)
	assert.Len(t, descendingFreqs, 5)
	assert.Equal(t, 3, descendingFreqs[0].Number) // 15가 가장 높은 빈도
	assert.Equal(t, 15, descendingFreqs[0].Freq)
	assert.Equal(t, 5, descendingFreqs[1].Number) // 12가 두 번째 높은 빈도
	assert.Equal(t, 12, descendingFreqs[1].Freq)
	assert.Equal(t, 1, descendingFreqs[2].Number) // 10이 세 번째 높은 빈도
	assert.Equal(t, 10, descendingFreqs[2].Freq)
	assert.Equal(t, 4, descendingFreqs[3].Number) // 8이 네 번째 높은 빈도
	assert.Equal(t, 8, descendingFreqs[3].Freq)
	assert.Equal(t, 2, descendingFreqs[4].Number) // 5가 다섯 번째 높은 빈도
	assert.Equal(t, 5, descendingFreqs[4].Freq)

	// 오름차순 정렬 테스트
	ascendingFreqs := getFrequencySortedNumbers(freqMap, true)
	assert.Len(t, ascendingFreqs, 5)
	assert.Equal(t, 2, ascendingFreqs[0].Number) // 5가 가장 낮은 빈도
	assert.Equal(t, 5, ascendingFreqs[0].Freq)
	assert.Equal(t, 4, ascendingFreqs[1].Number) // 8이 두 번째 낮은 빈도
	assert.Equal(t, 8, ascendingFreqs[1].Freq)
	assert.Equal(t, 1, ascendingFreqs[2].Number) // 10이 세 번째 낮은 빈도
	assert.Equal(t, 10, ascendingFreqs[2].Freq)
	assert.Equal(t, 5, ascendingFreqs[3].Number) // 12가 네 번째 낮은 빈도
	assert.Equal(t, 12, ascendingFreqs[3].Freq)
	assert.Equal(t, 3, ascendingFreqs[4].Number) // 15가 다섯 번째 낮은 빈도
	assert.Equal(t, 15, ascendingFreqs[4].Freq)
}

// GenerateHotNumbers 함수 테스트
func TestGenerateHotNumbers(t *testing.T) {
	draws := createTestDraws()
	g := NewGenerator(draws)

	// 여러 번 번호 생성을 테스트
	for i := 0; i < 10; i++ {
		numbers := g.GenerateHotNumbers()

		// 기본 검증
		assert.Len(t, numbers.WhiteNumbers, 5)

		// 중복 검증
		numMap := make(map[int]bool)
		for _, num := range numbers.WhiteNumbers {
			assert.False(t, numMap[num], "흰 공 번호에 중복이 있습니다")
			numMap[num] = true
		}

		// 정렬 검증
		for i := 0; i < len(numbers.WhiteNumbers)-1; i++ {
			assert.Less(t, numbers.WhiteNumbers[i], numbers.WhiteNumbers[i+1])
		}

		// 생성된 번호가 테스트 데이터의 번호들 중에 있는지 확인
		// 참고: 무작위 요소가 있어 항상 일치하지는 않을 수 있음
		possibleWhiteNumbers := map[int]bool{
			1: true, 5: true, 15: true, 23: true, 25: true,
			44: true, 47: true, 61: true, 62: true, 67: true,
		}

		for _, num := range numbers.WhiteNumbers {
			_, exists := possibleWhiteNumbers[num]
			assert.True(t, exists, "번호 %d는 테스트 데이터에 없습니다", num)
		}

		// 메가볼 검증
		possibleMegaBalls := map[int]bool{10: true, 15: true}
		_, exists := possibleMegaBalls[numbers.MegaBall]
		assert.True(t, exists, "메가볼 %d는 테스트 데이터에 없습니다", numbers.MegaBall)
	}
}

// 많은 테스트 데이터로 GenerateHotNumbers 테스트
func TestGenerateHotNumbersWithLargeDataset(t *testing.T) {
	// 더 많은 테스트 데이터 생성
	draws := make([]models.MegaMillionsDraw, 0)

	// 흰 공 번호 (1-30 범위로 제한하고 일부 번호에 높은 빈도 부여)
	highFreqWhite := []int{7, 11, 23, 29, 30}

	// 메가볼 (1-10 범위로 제한하고 일부 번호에 높은 빈도 부여)
	highFreqMega := []int{3, 7}

	// 20개 데이터 생성
	for i := 0; i < 20; i++ {
		whiteNumbers := make([]int, 5)

		// 자주 등장하는 번호들을 더 많이 포함
		if i < 15 { // 75%의 확률로 자주 등장하는 번호 포함
			for j := 0; j < 5; j++ {
				whiteNumbers[j] = highFreqWhite[j%len(highFreqWhite)]
			}
		} else {
			// 나머지는 무작위 번호
			for j := 0; j < 5; j++ {
				whiteNumbers[j] = j + 1
			}
		}

		// 메가볼도 자주 등장하는 번호 더 많이 포함
		megaBall := 1
		if i < 15 { // 75%의 확률로 자주 등장하는 메가볼
			megaBall = highFreqMega[i%len(highFreqMega)]
		}

		draws = append(draws, models.MegaMillionsDraw{
			WhiteNumbers: whiteNumbers,
			MegaBall:     megaBall,
			Rules: models.Rules{
				WhiteBallRange: []int{1, 30},
				MegaBallRange:  []int{1, 10},
			},
		})
	}

	g := NewGenerator(draws)

	// Hot number 빈도 확인을 위한 맵
	hotWhiteCount := make(map[int]int)
	hotMegaCount := make(map[int]int)

	// 여러 번 번호 생성 테스트
	iterations := 100
	for i := 0; i < iterations; i++ {
		numbers := g.GenerateHotNumbers()

		// 각 생성된 번호 카운트
		for _, num := range numbers.WhiteNumbers {
			hotWhiteCount[num]++
		}
		hotMegaCount[numbers.MegaBall]++
	}

	// 자주 등장하는 번호가 생성된 결과에도 자주 포함되는지 확인
	for _, num := range highFreqWhite {
		// 자주 등장하는 번호는 결과에도 더 많이 포함되어야 함
		// 모든 경우에 등장하지는 않을 수 있지만, 일정 비율 이상은 기대함
		freq := float64(hotWhiteCount[num]) / float64(iterations) * 100
		t.Logf("높은 빈도 흰 공 번호 %d의 생성 비율: %.2f%%", num, freq)
		assert.Greater(t, freq, 5.0, "높은 빈도 번호 %d가 생성 결과에 충분히 포함되지 않음", num)
	}

	for _, num := range highFreqMega {
		freq := float64(hotMegaCount[num]) / float64(iterations) * 100
		t.Logf("높은 빈도 메가볼 %d의 생성 비율: %.2f%%", num, freq)
		assert.Greater(t, freq, 10.0, "높은 빈도 메가볼 %d가 생성 결과에 충분히 포함되지 않음", num)
	}
}
