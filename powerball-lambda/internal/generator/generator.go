package generator

import (
	"math/rand"
	"powerball-lambda/internal/models"
	"sort"
	"time"
)

// Generator는 파워볼 번호 생성기를 나타내는 구조체입니다.
type Generator struct {
	// draws는 과거 추첨 결과들을 저장합니다.
	draws []models.PowerballDraw

	// rand는 난수 생성기입니다.
	rand *rand.Rand
}

// NewGenerator는 새로운 Generator 인스턴스를 생성합니다.
//
// draws 매개변수는 과거 추첨 결과들의 슬라이스입니다.
func NewGenerator(draws []models.PowerballDraw) *Generator {
	return &Generator{
		draws: draws,
		rand:  rand.New(rand.NewSource(time.Now().UnixNano())),
	}
}

// GenerateRandom은 완전 무작위로 파워볼 번호를 생성합니다.
//
// 현재 규칙(흰 공: 1-69, 파워볼: 1-26)에 따라 번호를 생성합니다.
// 흰 공은 중복되지 않는 5개의 번호를 생성하고, 파워볼은 1개의 번호를 생성합니다.
// 생성된 흰 공 번호는 오름차순으로 정렬됩니다.
func (g *Generator) GenerateRandom() models.GeneratedNumbers {
	// 흰 공 번호를 저장할 맵 (중복 방지)
	whiteBalls := make(map[int]bool)

	// 5개의 흰 공 번호 생성
	for len(whiteBalls) < 5 {
		num := g.rand.Intn(69) + 1 // 1-69 범위의 난수 생성
		whiteBalls[num] = true
	}

	// 맵을 슬라이스로 변환
	whiteNumbers := make([]int, 0, 5)
	for num := range whiteBalls {
		whiteNumbers = append(whiteNumbers, num)
	}

	// 흰 공 번호 정렬
	sort.Ints(whiteNumbers)

	// 파워볼 번호 생성 (1-26)
	powerball := g.rand.Intn(26) + 1

	return models.GeneratedNumbers{
		WhiteNumbers: whiteNumbers,
		Powerball:    powerball,
	}
}
