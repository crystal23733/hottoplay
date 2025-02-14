package generator

import (
	"powerball-lambda/internal/models"
	"sort"
)

// NumberFrequency는 번호의 출현 빈도를 나타내는 구조체입니다.
type NumberFrequency struct {
	// Number는 볼 번호입니다.
	Number int

	// Count는 해당 번호가 나온 횟수입니다.
	Count int
}

// analyzeFrequency는 과거 데이터에서 번호별 출현 빈도를 분석합니다.
//
// isPowerball이 true이면 파워볼 번호를, false이면 흰 공 번호를 분석합니다.
func (g *Generator) analyzeFrequency(isPowerball bool) []NumberFrequency {
	// 번호별 출현 횟수를 저장할 맵
	frequency := make(map[int]int)

	for _, draw := range g.draws {
		if isPowerball {
			// 파워볼 번호 분석
			num := parseInt(draw.Powerball)
			frequency[num]++
		} else {
			// 흰 공 번호 분석
			for _, numStr := range draw.WhiteNumbers {
				num := parseInt(numStr)
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

// GenerateHotNumbers는 자주 나온 번호들을 기반으로 번호를 생성합니다.
//
// 흰 공은 상위 15개 중에서 5개를 선택하고,
// 파워볼은 상위 5개 중에서 1개를 선택합니다.
func (g *Generator) GenerateHotNumbers() models.GeneratedNumbers {
	// 흰 공 빈도 분석
	whiteFreq := g.analyzeFrequency(false)

	// 상위 15개 중에서 5개 선택
	whiteBalls := make(map[int]bool)
	hotWhites := whiteFreq[:15] // 상위 15개만 사용

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

	// 파워볼 빈도 분석
	powerFreq := g.analyzeFrequency(true)

	// 상위 5개 중에서 1개 선택
	hotPowers := powerFreq[:5] // 상위 5개만 사용
	powerball := hotPowers[g.rand.Intn(len(hotPowers))].Number

	return models.GeneratedNumbers{
		WhiteNumbers: whiteNumbers,
		Powerball:    powerball,
	}
}

// GenerateColdNumbers는 적게 나온 번호들을 기반으로 번호를 생성합니다.
//
// 흰 공은 하위 15개 중에서 5개를 선택하고,
// 파워볼은 하위 5개 중에서 1개를 선택합니다.
func (g *Generator) GenerateColdNumbers() models.GeneratedNumbers {
	// 흰 공 빈도 분석
	whiteFreq := g.analyzeFrequency(false)

	// 하위 15개 중에서 5개 선택
	whiteBalls := make(map[int]bool)
	coldWhites := whiteFreq[len(whiteFreq)-15:] // 하위 15개만 사용

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

	// 파워볼 빈도 분석
	powerFreq := g.analyzeFrequency(true)

	// 하위 5개 중에서 1개 선택
	coldPowers := powerFreq[len(powerFreq)-5:] // 하위 5개 사용
	powerball := coldPowers[g.rand.Intn(len(coldPowers))].Number

	return models.GeneratedNumbers{
		WhiteNumbers: whiteNumbers,
		Powerball:    powerball,
	}
}

// parseInt는 문자열을 정수로 변환합니다.
func parseInt(s string) int {
	num := 0
	for _, ch := range s {
		if ch >= '0' && ch <= '9' {
			num = num*10 + int(ch-'0')
		}
	}

	return num
}
