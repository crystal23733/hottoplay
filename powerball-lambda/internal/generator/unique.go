package generator

import (
	"errors"
	"fmt"
	"powerball-lambda/internal/models"
	"sort"
	"strings"
)

// GenerateUniqueCombination은 과거에 나온적 없는 새로운 조합을 생성합니다.
//
// maxAttempts는 최대 시도 횟수입니다. 이 횟수를 초과하면 에러를 반환합니다.
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

	return models.GeneratedNumbers{}, ErrNoUniqueFound
}

// createExistingCombinationsMap은 과거 추첨 결과를 맵으로 변환합니다.
func (g *Generator) createExistingCombinationsMap() map[string]bool {
	combinations := make(map[string]bool)

	for _, draw := range g.draws {
		// 흰 공 번호를 정수로 변환
		whiteNumbers := make([]int, len(draw.WhiteNumbers))
		for i, numStr := range draw.WhiteNumbers {
			whiteNumbers[i] = parseInt(numStr)
		}

		// 파워볼 번호 변환
		powerball := parseInt(draw.Powerball)

		// GenerateNumbers 구조체 생성
		numbers := models.GeneratedNumbers{
			WhiteNumbers: whiteNumbers,
			Powerball:    powerball,
		}

		// 조합 문자열 생성 및 맵에 저장
		combination := g.createCombinationString(numbers)
		combinations[combination] = true
	}

	return combinations
}

// createCombinationString은 번호 조합을 고유한 문자열로 변환합니다.
//
// 예: "01,02,03,04,05|06" (흰 공 번호는 정렬되고 파워볼은 | 뒤에 위치)
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
	return strings.Join(whiteStrs, ",") + "|" + g.formatNumber(numbers.Powerball)
}

// formatNumber는 번호를 2자리 문자열로 변환합니다.
//
// 예: 1 -> "01", 23 -> "23"
func (g *Generator) formatNumber(num int) string {
	return fmt.Sprintf("%02d", num)
}

// ErrNoUniqueFound는 유니크한 조합을 찾지 못했을 때 반환되는 에러입니다.
var ErrNoUniqueFound = errors.New("유니크한 조합을 찾을 수 없습니다")
