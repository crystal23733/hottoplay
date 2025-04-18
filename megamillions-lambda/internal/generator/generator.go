package generator

import (
	"errors"
	"math/rand"
	"megamillions-lambda/internal/models"
	"sort"
	"strconv"
	"time"
)

// Generator는 메가밀리언 번호 생성을 담당하는 구조체입니다.
type Generator struct {
	// draws는 현재 규칙에 해당하는 추첨 결과들을 저장합니다.
	draws []models.MegaMillionsDraw

	// rand는 난수 생성기입니다.
	rand *rand.Rand

	// 현재 게임 규칙의 번호 범위
	whiteBallRange []int
	megaBallRange  []int
}

// NumberFrequency는 번호의 출현 빈도를 나타내는 구조체입니다.
type NumberFrequency struct {
	// Number는 볼 번호입니다.
	Number int

	// Count는 해당 번호가 나온 횟수입니다.
	Count int
}

// NewGenerator는 새로운 Generator 인스턴스를 생성합니다.
func NewGenerator(draws []models.MegaMillionsDraw) *Generator {
	g := &Generator{
		draws: draws,
		rand:  rand.New(rand.NewSource(time.Now().UnixNano())),
	}

	// 현재 규칙 설정
	if len(draws) > 0 {
		g.whiteBallRange = draws[0].Rules.WhiteBallRange
		g.megaBallRange = draws[0].Rules.MegaBallRange
	} else {
		// 기본값: 현재 메가밀리언 규칙 (1-70, 1-24)
		g.whiteBallRange = []int{1, 70}
		g.megaBallRange = []int{1, 24}
	}

	return g
}

// analyzeFrequency는 과거 데이터에서 번호별 출현 빈도를 분석합니다.
// isMegaBall이 true이면 메가볼 번호를, false이면 흰 공 번호를 분석합니다.
func (g *Generator) analyzeFrequency(isMegaBall bool) []NumberFrequency {
	// 번호별 출현 횟수를 저장할 맵
	frequency := make(map[int]int)

	for _, draw := range g.draws {
		if isMegaBall {
			// 메가볼 번호 분석
			frequency[draw.MegaBall]++
		} else {
			// 흰 공 번호 분석
			for _, num := range draw.WhiteNumbers {
				frequency[num]++
			}
		}
	}

	// 맵을 슬라이스로 변환
	var frequencies []NumberFrequency
	for num, count := range frequency {
		frequencies = append(frequencies, NumberFrequency{
			Number: num,
			Count:  count,
		})
	}

	// 출현 빈도순으로 정렬
	sort.Slice(frequencies, func(i, j int) bool {
		return frequencies[i].Count > frequencies[j].Count
	})

	return frequencies
}

// GenerateRandom은 완전 무작위로 메가밀리언 번호를 생성합니다.
func (g *Generator) GenerateRandom() models.GeneratedNumbers {
	// 흰 공 번호를 저장할 맵 (중복 방지)
	whiteBalls := make(map[int]bool)

	// 5개의 흰 공 번호 생성
	for len(whiteBalls) < 5 {
		num := g.rand.Intn(g.whiteBallRange[1]-g.whiteBallRange[0]+1) + g.whiteBallRange[0]
		whiteBalls[num] = true
	}

	// 맵을 슬라이스로 변환
	whiteNumbers := make([]int, 0, 5)
	for num := range whiteBalls {
		whiteNumbers = append(whiteNumbers, num)
	}

	// 흰 공 번호 정렬
	sort.Ints(whiteNumbers)

	// 메가볼 번호 생성
	megaBall := g.rand.Intn(g.megaBallRange[1]-g.megaBallRange[0]+1) + g.megaBallRange[0]

	return models.GeneratedNumbers{
		WhiteNumbers: whiteNumbers,
		MegaBall:     megaBall,
	}
}

// GenerateHotNumbers는 자주 나온 번호들을 기반으로 번호를 생성합니다.
// 흰 공은 상위 15개 중에서 5개를 선택하고,
// 메가볼은 상위 5개 중에서 1개를 선택합니다.
func (g *Generator) GenerateHotNumbers() models.GeneratedNumbers {
	// 흰 공 빈도 분석
	whiteFreq := g.analyzeFrequency(false)

	// 상위 15개 중에서 5개 선택
	whiteBalls := make(map[int]bool)
	hotWhites := whiteFreq

	if len(hotWhites) > 15 {
		hotWhites = hotWhites[:15] // 상위 15개만 사용
	}

	for len(whiteBalls) < 5 {
		idx := g.rand.Intn(len(hotWhites))
		whiteBalls[hotWhites[idx].Number] = true
	}

	// 선택된 번호를 슬라이스로 변환 및 정렬
	whiteNumbers := make([]int, 0, 5)
	for num := range whiteBalls {
		whiteNumbers = append(whiteNumbers, num)
	}
	sort.Ints(whiteNumbers)

	// 메가볼 빈도 분석
	megaFreq := g.analyzeFrequency(true)

	// 상위 5개 중에서 1개 선택
	hotMegas := megaFreq
	if len(hotMegas) > 5 {
		hotMegas = hotMegas[:5] // 상위 5개만 사용
	}

	megaBall := hotMegas[g.rand.Intn(len(hotMegas))].Number

	return models.GeneratedNumbers{
		WhiteNumbers: whiteNumbers,
		MegaBall:     megaBall,
	}
}

// GenerateColdNumbers는 적게 나온 번호들을 기반으로 번호를 생성합니다.
// 흰 공은 하위 15개 중에서 5개를 선택하고,
// 메가볼은 하위 5개 중에서 1개를 선택합니다.
func (g *Generator) GenerateColdNumbers() models.GeneratedNumbers {
	// 흰 공 빈도 분석
	whiteFreq := g.analyzeFrequency(false)

	// 하위 15개 중에서 5개 선택
	whiteBalls := make(map[int]bool)
	coldWhites := whiteFreq

	if len(coldWhites) > 15 {
		coldWhites = coldWhites[len(coldWhites)-15:] // 하위 15개만 사용
	}

	for len(whiteBalls) < 5 {
		idx := g.rand.Intn(len(coldWhites))
		whiteBalls[coldWhites[idx].Number] = true
	}

	// 선택된 번호를 슬라이스로 변환 및 정렬
	whiteNumbers := make([]int, 0, 5)
	for num := range whiteBalls {
		whiteNumbers = append(whiteNumbers, num)
	}
	sort.Ints(whiteNumbers)

	// 메가볼 빈도 분석
	megaFreq := g.analyzeFrequency(true)

	// 하위 5개 중에서 1개 선택
	coldMegas := megaFreq
	if len(coldMegas) > 5 {
		coldMegas = coldMegas[len(coldMegas)-5:] // 하위 5개만 사용
	}

	megaBall := coldMegas[g.rand.Intn(len(coldMegas))].Number

	return models.GeneratedNumbers{
		WhiteNumbers: whiteNumbers,
		MegaBall:     megaBall,
	}
}

// GenerateUniqueCombination은 과거에 나온적 없는 새로운 조합을 생성합니다.
func (g *Generator) GenerateUniqueCombination(maxAttempts int) (models.GeneratedNumbers, error) {
	// 과거 조합을 맵으로 변환하여 빠른 검색이 가능하게 함
	existingCombinations := g.createExistingCombinationsMap()

	// 최대 시도 횟수만큼 반복
	for attempt := 0; attempt < maxAttempts; attempt++ {
		// 랜덤 번호 생성
		numbers := g.GenerateRandom()

		// 조합 문자열 생성
		combination := g.createCombinationString(numbers)

		// 과거에 나온적 없는 조합인지 확인
		if !existingCombinations[combination] {
			return numbers, nil
		}
	}

	return models.GeneratedNumbers{}, errors.New("유니크한 조합을 찾지 못했습니다")
}

// createExistingCombinationsMap은 과거 추첨 결과를 맵으로 변환합니다.
func (g *Generator) createExistingCombinationsMap() map[string]bool {
	combinations := make(map[string]bool)

	for _, draw := range g.draws {
		// GenerateNumbers 구조체 생성
		numbers := models.GeneratedNumbers{
			WhiteNumbers: draw.WhiteNumbers,
			MegaBall:     draw.MegaBall,
		}

		// 조합 문자열 생성 및 맵에 저장
		combination := g.createCombinationString(numbers)
		combinations[combination] = true
	}

	return combinations
}

// createCombinationString은 번호 조합을 고유한 문자열로 변환합니다.
func (g *Generator) createCombinationString(numbers models.GeneratedNumbers) string {
	// 흰 공 번호 정렬
	sortedWhites := make([]int, len(numbers.WhiteNumbers))
	copy(sortedWhites, numbers.WhiteNumbers)
	sort.Ints(sortedWhites)

	// 번호를 문자열로 변환
	whiteStrs := make([]string, len(sortedWhites))
	for i, num := range sortedWhites {
		whiteStrs[i] = g.formatNumber(num)
	}

	// 최종 조합 문자열 생성
	return strconv.Itoa(sortedWhites[0]) + "-" +
		strconv.Itoa(sortedWhites[1]) + "-" +
		strconv.Itoa(sortedWhites[2]) + "-" +
		strconv.Itoa(sortedWhites[3]) + "-" +
		strconv.Itoa(sortedWhites[4]) + "|" +
		strconv.Itoa(numbers.MegaBall)
}

// formatNumber는 번호를 2자리 문자열로 변환합니다.
func (g *Generator) formatNumber(num int) string {
	return strconv.Itoa(num)
}
