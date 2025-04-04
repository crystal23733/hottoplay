package statistics

import (
	"powerball-lambda/internal/models"
	"powerball-lambda/internal/utils"
	"sort"
	"time"
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

// parseDate는 "Wed, Jan 8, 2025" 형식의 문자열을 time.Time으로 변환합니다.
func parseDate(dateStr string) (time.Time, error) {
	return time.Parse("Mon, Jan 2, 2006", dateStr)
}

// GetNumberStatistics는 선택된 번호들의 통계를 반환합니다.
func (a *Analyzer) GetNumberStatistics(numbers []int) []models.NumberStatistics {
	stats := make([]models.NumberStatistics, len(numbers))

	// 각 번호별 통계 계산
	for i, num := range numbers {
		stat := models.NumberStatistics{Number: num}
		var lastWhiteBallTime time.Time
		var lastPowerBallTime time.Time

		// 모든 추첨 결과를 순회하며 통계 수집
		for _, draw := range a.draws {
			// 흰 공으로 사용된 경우 확인
			for _, whiteNum := range draw.WhiteNumbers {
				if utils.ParseInt(whiteNum) == num {
					stat.WhiteBallCount++
					currentTime, _ := parseDate(draw.Date)
					if currentTime.After(lastWhiteBallTime) {
						lastWhiteBallTime = currentTime
						stat.LastWhiteBallDate = draw.Date
					}
				}
			}

			// 파워볼로 사용된 경우 확인
			if utils.ParseInt(draw.Powerball) == num {
				stat.PowerBallCount++
				currentTime, _ := parseDate(draw.Date)
				if currentTime.After(lastPowerBallTime) {
					lastPowerBallTime = currentTime
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

	var firstAppearance string
	var lastAppearance time.Time

	// 모든 추첨 결과를 순회하며 조합 확인
	for _, draw := range a.draws {
		drawNumbers := make([]int, len(draw.WhiteNumbers))
		for i, num := range draw.WhiteNumbers {
			drawNumbers[i] = utils.ParseInt(num)
		}
		sort.Ints(drawNumbers)

		// 선택된 번호들이 모두 포함되어 있는지 확인
		if containsAll(drawNumbers, sortedNumbers) {
			stats.AppearanceCount++

			// 첫 번째 출현 날짜 저장
			if firstAppearance == "" {
				firstAppearance = draw.Date
			}

			// 가장 최근 날짜 업데이트
			currentTime, _ := parseDate(draw.Date)
			if currentTime.After(lastAppearance) {
				lastAppearance = currentTime
			}
		}
	}

	stats.LastAppearance = firstAppearance
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
