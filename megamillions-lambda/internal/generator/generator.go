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

// calculateFrequency는 번호별 출현 빈도를 계산합니다.
func (g *Generator) calculateFrequency() {
	for _, draw := range g.draws {
		for _, wn := range draw.WhiteNumbers {
			g.whiteNumberFrequency[wn]++
		}
		g.megaBallFrequency[draw.MegaBall]++
	}
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
