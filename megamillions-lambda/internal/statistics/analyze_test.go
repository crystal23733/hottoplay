package statistics

import (
	"megamillions-lambda/internal/models"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

// 테스트용 추첨 결과 데이터 생성 헬퍼 함수
func createTestDraws() []models.MegaMillionsDraw {
	return []models.MegaMillionsDraw{
		{
			Date:         "January 1, 2023",
			WhiteNumbers: []int{1, 15, 23, 44, 61},
			MegaBall:     10,
		},
		{
			Date:         "January 5, 2023",
			WhiteNumbers: []int{5, 15, 25, 47, 62},
			MegaBall:     15,
		},
		{
			Date:         "January 8, 2023",
			WhiteNumbers: []int{1, 15, 23, 44, 67},
			MegaBall:     10,
		},
		{
			Date:         "January 12, 2023",
			WhiteNumbers: []int{7, 9, 15, 23, 30},
			MegaBall:     1,
		},
	}
}

// NewAnalyzer 테스트
func TestNewAnalyzer(t *testing.T) {
	draws := createTestDraws()
	analyzer := NewAnalyzer(draws)

	assert.NotNil(t, analyzer)
	assert.Equal(t, draws, analyzer.draws)
}

// parseDate 테스트
func TestParseDate(t *testing.T) {
	// 정상 케이스
	date, err := parseDate("January 1, 2023")
	assert.NoError(t, err)
	assert.Equal(t, 2023, date.Year())
	assert.Equal(t, time.January, date.Month())
	assert.Equal(t, 1, date.Day())

	// 비정상 케이스
	_, err = parseDate("01-01-2023")
	assert.Error(t, err)
}

// GetNumberStatistics 테스트
// GetNumberStatistics 테스트만 수정
func TestGetNumberStatistics(t *testing.T) {
	draws := createTestDraws()
	analyzer := NewAnalyzer(draws)

	// 자주 등장하는 번호 테스트 (15번은 흰 공으로 4번 등장)
	stats := analyzer.GetNumberStatistics([]int{15})
	assert.Len(t, stats, 1)
	assert.Equal(t, 15, stats[0].Number)
	assert.Equal(t, 4, stats[0].WhiteBallCount)
	assert.Equal(t, 1, stats[0].MegaBallCount) // 15는 메가볼로 1번 등장 (5일)
	assert.Equal(t, "January 12, 2023", stats[0].LastWhiteBallDate)
	assert.Equal(t, "January 5, 2023", stats[0].LastMegaBallDate)

	// 메가볼로 등장하는 번호 테스트 (10번은 메가볼로 2번 등장)
	stats = analyzer.GetNumberStatistics([]int{10})
	assert.Equal(t, 10, stats[0].Number)
	assert.Equal(t, 0, stats[0].WhiteBallCount)     // 10번은 흰 공으로 등장하지 않음
	assert.Equal(t, 2, stats[0].MegaBallCount)      // 10번은 메가볼로 2번 등장
	assert.Equal(t, "", stats[0].LastWhiteBallDate) // 흰 공으로 등장하지 않았으므로 빈 문자열
	assert.Equal(t, "January 8, 2023", stats[0].LastMegaBallDate)

	// 두 역할 모두로 등장한 번호 테스트
	stats = analyzer.GetNumberStatistics([]int{1})
	assert.Equal(t, 1, stats[0].Number)
	assert.Equal(t, 2, stats[0].WhiteBallCount) // 1번은 흰 공으로 2번 등장
	assert.Equal(t, 1, stats[0].MegaBallCount)  // 1번은 메가볼로 1번 등장 (12일)
	assert.Equal(t, "January 8, 2023", stats[0].LastWhiteBallDate)
	assert.Equal(t, "January 12, 2023", stats[0].LastMegaBallDate)

	// 여러 번호 동시 테스트
	stats = analyzer.GetNumberStatistics([]int{1, 15, 10})
	assert.Len(t, stats, 3)
	assert.Equal(t, 2, stats[0].WhiteBallCount) // 1번 흰 공 등장 횟수
	assert.Equal(t, 1, stats[0].MegaBallCount)  // 1번 메가볼 등장 횟수
	assert.Equal(t, 4, stats[1].WhiteBallCount) // 15번 흰 공 등장 횟수
	assert.Equal(t, 1, stats[1].MegaBallCount)  // 15번 메가볼 등장 횟수
	assert.Equal(t, 0, stats[2].WhiteBallCount) // 10번 흰 공 등장 횟수
	assert.Equal(t, 2, stats[2].MegaBallCount)  // 10번 메가볼 등장 횟수
}

// GetCombinationStatistics 테스트
func TestGetCombinationStatistics(t *testing.T) {
	draws := createTestDraws()
	analyzer := NewAnalyzer(draws)

	// 자주 함께 등장하는 조합 테스트 (1, 15, 23)
	stats := analyzer.GetCombinationStatistics([]int{1, 15, 23})
	assert.NotNil(t, stats)
	assert.Equal(t, []int{1, 15, 23}, stats.Numbers)
	assert.Equal(t, 2, stats.AppearanceCount) // 1, 15, 23이 함께 등장한 횟수
	assert.Equal(t, "January 1, 2023", stats.LastAppearance)

	// 존재하지 않는 조합 테스트
	stats = analyzer.GetCombinationStatistics([]int{2, 3, 4})
	assert.NotNil(t, stats)
	assert.Equal(t, 0, stats.AppearanceCount)
	assert.Equal(t, "", stats.LastAppearance)

	// 단일 번호 테스트 (조합이 아니므로 nil 반환)
	stats = analyzer.GetCombinationStatistics([]int{15})
	assert.Nil(t, stats)

	// 순서가 다른 동일 조합 테스트
	stats1 := analyzer.GetCombinationStatistics([]int{15, 1, 23})
	stats2 := analyzer.GetCombinationStatistics([]int{1, 15, 23})
	assert.Equal(t, stats1.AppearanceCount, stats2.AppearanceCount)
}

// containsAll 함수 테스트
func TestContainsAll(t *testing.T) {
	// 모든 요소를 포함하는 경우
	source := []int{1, 3, 5, 7, 9}
	target := []int{1, 5, 9}
	assert.True(t, containsAll(source, target))

	// 일부 요소만 포함하는 경우
	target = []int{1, 5, 11}
	assert.False(t, containsAll(source, target))

	// 타겟이 더 긴 경우
	target = []int{1, 3, 5, 7, 9, 11}
	assert.False(t, containsAll(source, target))

	// 빈 타겟인 경우
	target = []int{}
	assert.True(t, containsAll(source, target))

	// 정렬되지 않은 경우 (containsAll 함수는 정렬된 배열을 가정)
	source = []int{1, 3, 5, 7, 9}
	target = []int{9, 1, 5}
	assert.False(t, containsAll(source, target))

	// 정렬된 배열로 테스트
	source = []int{1, 3, 5, 7, 9}
	target = []int{1, 5, 9}
	assert.True(t, containsAll(source, target))
}
