package generator

import (
	"math/rand"
	"megamillions-lambda/internal/models"
	"sort"
	"strconv"
	"testing"
	"time"

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
				WhiteBallRange: []int{1, 69},
				MegaBallRange:  []int{1, 24},
			},
		},
		{
			Date:         "2022-12-30",
			WhiteNumbers: []int{5, 15, 25, 47, 62},
			MegaBall:     15,
			Rules: models.Rules{
				WhiteBallRange: []int{1, 69},
				MegaBallRange:  []int{1, 24},
			},
		},
		{
			Date:         "2022-12-27",
			WhiteNumbers: []int{1, 15, 23, 44, 67},
			MegaBall:     10,
			Rules: models.Rules{
				WhiteBallRange: []int{1, 69},
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
	assert.Equal(t, []int{1, 69}, g.whiteBallRange)
	assert.Equal(t, []int{1, 24}, g.megaBallRange)
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

// GenerateColdNumbers 함수 테스트
func TestGenerateColdNumbers(t *testing.T) {
	draws := createTestDraws()
	g := NewGenerator(draws)

	// 여러 번 번호 생성을 테스트
	for i := 0; i < 10; i++ {
		numbers := g.GenerateColdNumbers()

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

		// 메가볼 범위 검증
		assert.GreaterOrEqual(t, numbers.MegaBall, g.megaBallRange[0])
		assert.LessOrEqual(t, numbers.MegaBall, g.megaBallRange[1])
	}
}

// 많은 테스트 데이터로 GenerateColdNumbers 테스트
func TestGenerateColdNumbersWithLargeDataset(t *testing.T) {
	// 더 많은 테스트 데이터 생성
	draws := make([]models.MegaMillionsDraw, 0)

	// 흰 공 번호 (1-30 범위로 제한하고 일부 번호에 낮은 빈도 부여)
	lowFreqWhite := []int{2, 8, 17, 22, 28}

	// 메가볼 (1-10 범위로 제한하고 일부 번호에 낮은 빈도 부여)
	lowFreqMega := []int{1, 9}

	// 20개 데이터 생성
	for i := 0; i < 20; i++ {
		whiteNumbers := make([]int, 5)

		// 자주 등장하지 않는 번호들 포함 (25%만 포함)
		if i >= 15 { // 25%의 확률로만 덜 등장하는 번호 포함
			for j := 0; j < 5; j++ {
				whiteNumbers[j] = lowFreqWhite[j%len(lowFreqWhite)]
			}
		} else {
			// 나머지는 자주 등장하는 번호 (10-14)
			for j := 0; j < 5; j++ {
				whiteNumbers[j] = j + 10
			}
		}

		// 메가볼도 드물게 등장하는 번호 포함
		megaBall := 5 // 기본 메가볼
		if i >= 15 {  // 25%의 확률로만 드물게 등장하는 메가볼
			megaBall = lowFreqMega[i%len(lowFreqMega)]
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

	// Cold number 빈도 확인을 위한 맵
	coldWhiteCount := make(map[int]int)
	coldMegaCount := make(map[int]int)

	// 여러 번 번호 생성 테스트
	iterations := 100
	for i := 0; i < iterations; i++ {
		numbers := g.GenerateColdNumbers()

		// 각 생성된 번호 카운트
		for _, num := range numbers.WhiteNumbers {
			coldWhiteCount[num]++
		}
		coldMegaCount[numbers.MegaBall]++
	}

	// 드물게 등장하는 번호가 생성된 결과에 자주 포함되는지 확인
	for _, num := range lowFreqWhite {
		// 드물게 등장하는 번호는 결과에 더 많이 포함되어야 함
		freq := float64(coldWhiteCount[num]) / float64(iterations) * 100
		t.Logf("낮은 빈도 흰 공 번호 %d의 생성 비율: %.2f%%", num, freq)
		assert.Greater(t, freq, 5.0, "낮은 빈도 번호 %d가 생성 결과에 충분히 포함되지 않음", num)
	}

	for _, num := range lowFreqMega {
		freq := float64(coldMegaCount[num]) / float64(iterations) * 100
		t.Logf("낮은 빈도 메가볼 %d의 생성 비율: %.2f%%", num, freq)
		assert.Greater(t, freq, 10.0, "낮은 빈도 메가볼 %d가 생성 결과에 충분히 포함되지 않음", num)
	}
}

// generateCombinationKey 함수 테스트
func TestGenerateCombinationKey(t *testing.T) {
	// 테스트 케이스 1: 기본 테스트
	whiteNumbers := []int{1, 15, 23, 44, 61}
	megaBall := 10
	key := generateCombinationKey(whiteNumbers, megaBall)

	// 예상 결과 검증
	sortedWhite := make([]int, len(whiteNumbers))
	copy(sortedWhite, whiteNumbers)
	sort.Ints(sortedWhite)

	expectedKey := 0
	for _, num := range sortedWhite {
		expectedKey = expectedKey*100 + num
	}
	expectedKey = expectedKey*100 + megaBall

	assert.Equal(t, strconv.Itoa(expectedKey), key)

	// 테스트 케이스 2: 동일한 번호 집합이지만 다른 순서
	shuffledWhite := []int{61, 1, 44, 15, 23}
	shuffledKey := generateCombinationKey(shuffledWhite, megaBall)

	// 다른 순서로 제공되어도 같은 키를 생성해야 함
	assert.Equal(t, key, shuffledKey)

	// 테스트 케이스 3: 다른 번호 집합
	differentWhite := []int{2, 16, 24, 45, 62}
	differentKey := generateCombinationKey(differentWhite, megaBall)

	// 다른 번호 집합은 다른 키를 생성해야 함
	assert.NotEqual(t, key, differentKey)

	// 테스트 케이스 4: 같은 흰 공 번호, 다른 메가볼
	differentMegaKey := generateCombinationKey(whiteNumbers, 11)

	// 메가볼이 다르면 다른 키를 생성해야 함
	assert.NotEqual(t, key, differentMegaKey)
}

// GenerateUniqueCombination 함수 테스트
func TestGenerateUniqueCombination(t *testing.T) {
	// 테스트 케이스 1: 과거 조합이 없는 경우
	testDraws := []models.MegaMillionsDraw{}
	g := NewGenerator(testDraws)
	g.whiteBallRange = []int{1, 69}
	g.megaBallRange = []int{1, 24}

	numbers, err := g.GenerateUniqueCombination(10)
	assert.NoError(t, err)
	assert.Len(t, numbers.WhiteNumbers, 5)

	// 테스트 케이스 2: 과거 조합이 있는 경우
	testDraws = []models.MegaMillionsDraw{
		{
			WhiteNumbers: []int{1, 15, 23, 44, 61},
			MegaBall:     10,
			Rules: models.Rules{
				WhiteBallRange: []int{1, 69},
				MegaBallRange:  []int{1, 24},
			},
		},
	}
	g = NewGenerator(testDraws)

	numbers, err = g.GenerateUniqueCombination(100)
	assert.NoError(t, err)

	// 생성된 조합이 과거 조합과 다른지 확인
	isDifferent := false
	if len(numbers.WhiteNumbers) == 5 {
		// 흰 공 번호와 메가볼이 정확히 동일하면 isDifferent는 false가 됨
		allSame := true
		sort.Ints(numbers.WhiteNumbers)
		for i, num := range numbers.WhiteNumbers {
			if num != testDraws[0].WhiteNumbers[i] {
				allSame = false
				break
			}
		}
		if !allSame || numbers.MegaBall != testDraws[0].MegaBall {
			isDifferent = true
		}
	}

	assert.True(t, isDifferent, "생성된 조합이 과거 조합과 동일함")
}

// 테스트 케이스 3: 최대 시도 횟수 초과 시나리오
func TestGenerateUniqueCombinationExceedMaxAttempts(t *testing.T) {
	// 이미 모든 가능한 조합이 사용된 상황을 만들기 위해
	// 아주 제한된 범위의 Generator 생성
	limitedG := &Generator{
		draws:                make([]models.MegaMillionsDraw, 0),
		whiteNumberFrequency: make(map[int]int),
		megaBallFrequency:    make(map[int]int),
		whiteBallRange:       []int{1, 5}, // 매우 제한된 범위
		megaBallRange:        []int{1, 1}, // 메가볼은 1개만 가능
		rand:                 rand.New(rand.NewSource(time.Now().UnixNano())),
	}

	// 가능한 모든 조합 생성 (5C5 * 1 = 1가지 조합)
	// 흰 공: 1, 2, 3, 4, 5, 메가볼: 1
	whiteNumbers := []int{1, 2, 3, 4, 5}

	// 이 조합을 과거 당첨 번호로 추가
	limitedG.draws = append(limitedG.draws, models.MegaMillionsDraw{
		WhiteNumbers: whiteNumbers,
		MegaBall:     1,
	})

	// 이제 새로운 조합을 생성하려 시도하면 실패해야 함
	// (가능한 모든 조합이 이미 과거에 나왔기 때문)
	_, err := limitedG.GenerateUniqueCombination(5)
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "failed to generate unique combination")
}

// 많은 과거 당첨 조합이 있는 상황에서 테스트
func TestGenerateUniqueCombinationWithManyPastDraws(t *testing.T) {
	// 50개의 과거 당첨 번호 생성
	testDraws := make([]models.MegaMillionsDraw, 50)

	// 다양한 과거 조합 생성
	for i := 0; i < 50; i++ {
		whiteNumbers := make([]int, 5)
		for j := 0; j < 5; j++ {
			whiteNumbers[j] = (i*5+j)%69 + 1 // 1-69 범위 내 번호
		}
		sort.Ints(whiteNumbers)

		testDraws[i] = models.MegaMillionsDraw{
			WhiteNumbers: whiteNumbers,
			MegaBall:     (i % 24) + 1, // 1-24 범위
			Rules: models.Rules{
				WhiteBallRange: []int{1, 69},
				MegaBallRange:  []int{1, 24},
			},
		}
	}

	g := NewGenerator(testDraws)

	// 유니크한 조합 생성 시도
	numbers, err := g.GenerateUniqueCombination(1000)

	// 오류가 없어야 하고 생성된 조합이 있어야 함
	assert.NoError(t, err)
	assert.Len(t, numbers.WhiteNumbers, 5)

	// 생성된 조합이 과거 조합과 다른지 확인
	key := generateCombinationKey(numbers.WhiteNumbers, numbers.MegaBall)

	// 과거 조합 맵 구성
	pastCombinations := make(map[string]bool)
	for _, draw := range testDraws {
		pastKey := generateCombinationKey(draw.WhiteNumbers, draw.MegaBall)
		pastCombinations[pastKey] = true
	}

	// 생성된 키가 과거 조합에 없어야 함
	assert.False(t, pastCombinations[key], "생성된 조합이 과거 조합과 중복됨")
}

// 엣지 케이스: 가능한 모든 조합이 이미 과거에 나왔을 때
func TestGenerateUniqueCombinationWhenAllCombinationsExist(t *testing.T) {
	// 가능한 모든 조합이 이미 나온 제한된 범위 설정
	// 예: 화이트볼 1-5, 메가볼 1-2 (총 가능한 조합: C(5,5) * 2 = 2가지)
	g := &Generator{
		draws:          make([]models.MegaMillionsDraw, 0),
		whiteBallRange: []int{1, 5},
		megaBallRange:  []int{1, 2},
		rand:           rand.New(rand.NewSource(time.Now().UnixNano())),
	}

	// 가능한 모든 조합을 과거 당첨 번호로 추가
	g.draws = append(g.draws, models.MegaMillionsDraw{
		WhiteNumbers: []int{1, 2, 3, 4, 5},
		MegaBall:     1,
	})

	g.draws = append(g.draws, models.MegaMillionsDraw{
		WhiteNumbers: []int{1, 2, 3, 4, 5},
		MegaBall:     2,
	})

	// 이제 모든 가능한 조합이 이미 과거에 나왔으므로, 새로운 조합을 생성할 수 없음
	_, err := g.GenerateUniqueCombination(10)
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "failed to generate unique combination")
}
