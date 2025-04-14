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
	draws                []models.MegaMillionsDraw
	whiteNumberFrequency map[int]int
	megaBallFrequency    map[int]int
	whiteBallRange       []int
	megaBallRange        []int
	rand                 *rand.Rand
}

// NumberFreq는 번호와 빈도를 나타내는 구조체입니다.
type NumberFreq struct {
	Number int
	Freq   int
}

// calculateFrequency는 번호별 출현 빈도를 계산합니다.
func (g *Generator) calculateFrequency() {
	for _, draw := range g.draws {
		for _, wn := range draw.WhiteNumbers {
			g.whiteNumberFrequency[wn]++
		}
		g.megaBallFrequency[draw.MegaBall]++
	}
}

// getFrequencySortedNumbers는 주어진 빈도 맵에서 정렬된 NumberFreq 슬라이스를 반환합니다.
func getFrequencySortedNumbers(freqMap map[int]int, ascending bool) []NumberFreq {
	freqs := make([]NumberFreq, 0, len(freqMap))
	for num, freq := range freqMap {
		freqs = append(freqs, NumberFreq{Number: num, Freq: freq})
	}

	// 빈도 정렬 (ascending이 true면 오름차순, false면 내림차순)
	sort.Slice(freqs, func(i, j int) bool {
		if ascending {
			return freqs[i].Freq < freqs[j].Freq
		}
		return freqs[i].Freq > freqs[j].Freq
	})

	return freqs
}

// NewGenerator는 새로운 Generator 인스턴스를 생성합니다.
func NewGenerator(draws []models.MegaMillionsDraw) *Generator {
	g := &Generator{
		draws:                draws,
		whiteNumberFrequency: make(map[int]int),
		megaBallFrequency:    make(map[int]int),
		rand:                 rand.New(rand.NewSource(time.Now().UnixNano())),
	}

	// 현재 규칙 설정
	if len(draws) > 0 {
		g.whiteBallRange = draws[0].Rules.WhiteBallRange
		g.megaBallRange = draws[0].Rules.MegaBallRange
	}

	// 번호 빈도 계산
	g.calculateFrequency()

	return g
}

// GenerateRandom은 완전 랜덤한 번호 조합을 생성합니다.
func (g *Generator) GenerateRandom() models.GeneratedNumbers {
	// 흰 공 번호 생성 (중복 없이 5개)
	whiteNumbers := make([]int, 0, 5)
	whiteNumbersMap := make(map[int]bool)

	for len(whiteNumbers) < 5 {
		// 1부터 whiteBallRange[1] 사이의 랜덤 번호 생성
		num := g.rand.Intn(g.whiteBallRange[1]-g.whiteBallRange[0]+1) + g.whiteBallRange[0]
		if !whiteNumbersMap[num] {
			whiteNumbers = append(whiteNumbers, num)
			whiteNumbersMap[num] = true
		}
	}

	// 오름차순 정렬
	sort.Ints(whiteNumbers)

	// 메가볼 번호 생성
	megaBall := g.rand.Intn(g.megaBallRange[1]-g.megaBallRange[0]+1) + g.megaBallRange[0]

	return models.GeneratedNumbers{
		WhiteNumbers: whiteNumbers,
		MegaBall:     megaBall,
	}
}

// GenerateHotNumbers는 자주 나오는 번호를 기반으로 번호 조합을 생성합니다.
func (g *Generator) GenerateHotNumbers() models.GeneratedNumbers {
	// 흰 공 빈도 정렬
	whiteFreqs := getFrequencySortedNumbers(g.whiteNumberFrequency, false)

	// 상위 빈도 번호에서 랜덤 선택 (상위 15개 중 5개)
	numHotWhiteNumbers := len(whiteFreqs)
	if numHotWhiteNumbers > 15 {
		numHotWhiteNumbers = 15
	}

	whiteNumbers := make([]int, 0, 5)
	whiteNumbersMap := make(map[int]bool)

	for len(whiteNumbers) < 5 {
		idx := g.rand.Intn(numHotWhiteNumbers)
		num := whiteFreqs[idx].Number
		if !whiteNumbersMap[num] {
			whiteNumbers = append(whiteNumbers, num)
			whiteNumbersMap[num] = true
		}
	}

	// 오름차순 정렬
	sort.Ints(whiteNumbers)

	// 메가볼 빈도 정렬
	megaFreqs := getFrequencySortedNumbers(g.megaBallFrequency, false)

	// 상위 빈도 메가볼에서 선택 (상위 5개 중 1개)
	numHotMegaBalls := len(megaFreqs)
	if numHotMegaBalls > 5 {
		numHotMegaBalls = 5
	}

	megaBall := megaFreqs[g.rand.Intn(numHotMegaBalls)].Number

	return models.GeneratedNumbers{
		WhiteNumbers: whiteNumbers,
		MegaBall:     megaBall,
	}
}

// GenerateColdNumbers는 드물게 나오는 번호를 기반으로 번호 조합을 생성합니다.
func (g *Generator) GenerateColdNumbers() models.GeneratedNumbers {
	// 흰 공 빈도 정렬
	whiteFreqs := getFrequencySortedNumbers(g.whiteNumberFrequency, true)

	// 하위 빈도 번호에서 랜덤 선택 (하위 15개 중 5개)
	numColdWhiteNumbers := len(whiteFreqs)
	if numColdWhiteNumbers > 15 {
		numColdWhiteNumbers = 15
	}

	whiteNumbers := make([]int, 0, 5)
	whiteNumbersMap := make(map[int]bool)

	for len(whiteNumbers) < 5 {
		idx := g.rand.Intn(numColdWhiteNumbers)
		num := whiteFreqs[idx].Number
		if !whiteNumbersMap[num] {
			whiteNumbers = append(whiteNumbers, num)
			whiteNumbersMap[num] = true
		}
	}

	// 오름차순 정렬
	sort.Ints(whiteNumbers)

	// 메가볼 빈도 정렬
	megaFreqs := getFrequencySortedNumbers(g.megaBallFrequency, true)

	// 하위 빈도 메가볼에서 선택 (하위 5개 중 1개)
	numColdMegaBalls := len(megaFreqs)
	if numColdMegaBalls > 5 {
		numColdMegaBalls = 5
	}

	megaBall := megaFreqs[g.rand.Intn(numColdMegaBalls)].Number

	return models.GeneratedNumbers{
		WhiteNumbers: whiteNumbers,
		MegaBall:     megaBall,
	}
}

// generateCombinationKey는 번호 조합의 고유 키를 생성합니다.
func generateCombinationKey(whiteNumbers []int, megaBall int) string {
	// 흰 공 번호 복사 및 정렬
	sortedWhite := make([]int, len(whiteNumbers))
	copy(sortedWhite, whiteNumbers)
	sort.Ints(sortedWhite)

	// 키 생성 (시간을 줄이기 위해 간단한 해시 방식 사용)
	key := 0
	for _, num := range sortedWhite {
		key = key*100 + num
	}
	key = key*100 + megaBall

	return strconv.Itoa(key)
}

// GenerateUniqueCombination은 과거에 나온 적 없는 조합을 생성합니다.
func (g *Generator) GenerateUniqueCombination(maxAttempts int) (models.GeneratedNumbers, error) {
	// 과거 당첨 번호 조합 맵 구성
	pastCombinations := make(map[string]bool)
	for _, draw := range g.draws {
		// 키 생성 (흰 공 번호 + 메가볼)
		key := generateCombinationKey(draw.WhiteNumbers, draw.MegaBall)
		pastCombinations[key] = true
	}

	// 유니크한 조합 찾기
	for attempt := 0; attempt < maxAttempts; attempt++ {
		numbers := g.GenerateRandom()
		key := generateCombinationKey(numbers.WhiteNumbers, numbers.MegaBall)

		if !pastCombinations[key] {
			return numbers, nil
		}
	}

	return models.GeneratedNumbers{}, errors.New("failed to generate unique combination")
}
