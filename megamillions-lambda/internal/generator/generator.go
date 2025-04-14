package generator

import (
	"math/rand"
	"megamillions-lambda/internal/models"
	"sort"
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
