package statistics

import (
	"powerball-lambda/internal/models"
	"sort"
)

// Analyzer는 파워볼 번호 통계 분석을 담당하는 구조체입니다.
type Analyzer struct {
	draws []models.PowerballDraw
}

// NewAnalyzer는 새로운 Analyzer인스턴스를 생성합니다.
func NewAnalyzer(draws []models.PowerballDraw) *Analyzer {
	return &Analyzer{
		draws: draws,
	}
}

// GetNumberStatistics는 선택된 번호들의 통계를 반환합니다.
func (a *Analyzer) GetNumberStatistics(numbers []int) []models.NumberStatistics {
	stats := make([]models.NumberStatistics, len(numbers))

	// 각 번호별 통계 계산
	for i, num := range numbers {
		stat := models.NumberStatistics{Number: num}

		// 모든 추첨 결과를 순회하며 통계 수집
		for _, draw := range a.draws {
			// 흰 공으로 사용된 경우 확인
			for _, whiteNum := range draw.WhiteNumbers {
				if parseInt(whiteNum) == num {
					stat.WhiteBallCount++
					if draw.Date > stat.LastWhiteBallDate {
						stat.LastWhiteBallDate = draw.Date
					}
				}
			}

			// 파워볼로 사용된 경우 확인
			if parseInt(draw.Powerball) == num {
				stat.PowerBallCount++
				if draw.Date > stat.LastPowerBallDate {
					stat.LastPowerBallDate = draw.Date
				}
			}
		}

		stats[i] = stat
	}

	return stats
}

// GetCombinationStatistics는 선택된 번호 조합의 통계를 반환합니다.
func (a *Analyzer) GetCombinationStatistics(numbers []int) *models.CombinationStatistics {
	if len(numbers) < 2 {
		return nil
	}

	stats := &models.CombinationStatistics{
		Numbers: numbers,
	}

	// 선택된 번호들 정렬
	sortedNumbers := make([]int, len(numbers))
	copy(sortedNumbers, numbers)
	sort.Ints(sortedNumbers)

	// 모든 추첨 결과를 순회하며 조합 확인
	for _, draw := range a.draws {
		drawNumbers := make([]int, len(draw.WhiteNumbers))
		for i, num := range draw.WhiteNumbers {
			drawNumbers[i] = parseInt(num)
		}
		sort.Ints(drawNumbers)

		// 선택된 번호들이 모두 포함되어 있는지 확인
		if containsAll(drawNumbers, sortedNumbers) {
			stats.AppearanceCount++
			stats.LastAppearance = draw.Date
		}
	}

	return stats
}

// containsAll은 source가 target의 모든 요소를 포함하는지 확인합니다.
func containsAll(source, target []int) bool {
	if len(target) > len(source) {
		return false
	}

	targetIdx := 0
	for _, num := range source {
		if targetIdx >= len(target) {
			break
		}
		if num == target[targetIdx] {
			targetIdx++
		}
	}

	return targetIdx == len(target)
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
