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
	assert.Equal(t, 1, g.whiteNumberFrequency[1])
	assert.Equal(t, 2, g.whiteNumberFrequency[15]) // 두 번 등장
	assert.Equal(t, 1, g.megaBallFrequency[10])
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
