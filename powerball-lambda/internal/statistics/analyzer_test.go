package statistics

import (
	"powerball-lambda/internal/models"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestParseDate(t *testing.T) {
	tests := []struct {
		name     string
		dateStr  string
		expected time.Time
		wantErr  bool
	}{
		{
			name:     "정상적인 날짜",
			dateStr:  "Wed, Jan 8, 2025",
			expected: time.Date(2025, time.January, 8, 0, 0, 0, 0, time.UTC),
			wantErr:  false,
		},
		{
			name:     "다른 요일과 월",
			dateStr:  "Mon, Feb 10, 2025",
			expected: time.Date(2025, time.February, 10, 0, 0, 0, 0, time.UTC),
			wantErr:  false,
		},
		{
			name:    "잘못된 형식",
			dateStr: "2025-01-08",
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, err := parseDate(tt.dateStr)
			if tt.wantErr {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
				assert.Equal(t, tt.expected, result)
			}
		})
	}
}

func TestGetNumberStatistics(t *testing.T) {
	// 테스트용 데이터 생성
	draws := []models.PowerballDraw{
		{
			Date:         "Wed, Jan 8, 2025",
			WhiteNumbers: []string{"1", "20", "36", "38", "43"},
			Powerball:    "24",
		},
		{
			Date:         "Mon, Dec 30, 2024",
			WhiteNumbers: []string{"9", "19", "33", "38", "39"},
			Powerball:    "1",
		},
		{
			Date:         "Sat, Dec 28, 2024",
			WhiteNumbers: []string{"1", "15", "25", "35", "45"},
			Powerball:    "15",
		},
	}

	analyzer := NewAnalyzer(draws)

	t.Run("날짜순 통계 확인", func(t *testing.T) {
		stats := analyzer.GetNumberStatistics([]int{1})
		assert.Equal(t, 1, stats[0].Number)
		assert.Equal(t, 2, stats[0].WhiteBallCount)
		assert.Equal(t, 1, stats[0].PowerBallCount)
		assert.Equal(t, "Wed, Jan 8, 2025", stats[0].LastWhiteBallDate)
		assert.Equal(t, "Mon, Dec 30, 2024", stats[0].LastPowerBallDate)
	})

	t.Run("여러 번호 통계 확인", func(t *testing.T) {
		stats := analyzer.GetNumberStatistics([]int{1, 38})
		assert.Len(t, stats, 2)

		// 1번 통계 확인
		assert.Equal(t, 1, stats[0].Number)
		assert.Equal(t, 2, stats[0].WhiteBallCount)
		assert.Equal(t, 1, stats[0].PowerBallCount)
		assert.Equal(t, "Wed, Jan 8, 2025", stats[0].LastWhiteBallDate)
		assert.Equal(t, "Mon, Dec 30, 2024", stats[0].LastPowerBallDate)

		// 38번 통계 확인
		assert.Equal(t, 38, stats[1].Number)
		assert.Equal(t, 2, stats[1].WhiteBallCount)
		assert.Equal(t, 0, stats[1].PowerBallCount)
		assert.Equal(t, "Wed, Jan 8, 2025", stats[1].LastWhiteBallDate)
		assert.Equal(t, "", stats[1].LastPowerBallDate)
	})
}

func TestGetCombinationStatistics(t *testing.T) {
	// 테스트용 데이터 - 날짜가 오름차순으로 정렬되어 있음
	draws := []models.PowerballDraw{
		{
			Date:         "Sat, Dec 28, 2024",
			WhiteNumbers: []string{"1", "20", "36", "35", "55"},
			Powerball:    "15",
			Era:          "current",
		},
		{
			Date:         "Mon, Dec 30, 2024",
			WhiteNumbers: []string{"9", "19", "33", "38", "39"},
			Powerball:    "1",
			Era:          "current",
		},
		{
			Date:         "Wed, Jan 8, 2025",
			WhiteNumbers: []string{"1", "20", "36", "38", "43"},
			Powerball:    "24",
			Era:          "current",
		},
	}

	analyzer := NewAnalyzer(draws)

	t.Run("날짜 파싱 테스트", func(t *testing.T) {
		date1, err1 := parseDate("Wed, Jan 8, 2025")
		date2, err2 := parseDate("Sat, Dec 28, 2024")

		assert.NoError(t, err1)
		assert.NoError(t, err2)
		assert.True(t, date1.After(date2), "첫 번째 날짜가 더 최근이어야 함")
	})

	t.Run("조합 통계 확인", func(t *testing.T) {
		stats := analyzer.GetCombinationStatistics([]int{1, 20, 36})
		assert.NotNil(t, stats)
		assert.Equal(t, 2, stats.AppearanceCount, "조합이 2번 나타나야 함")
		assert.Equal(t, "Sat, Dec 28, 2024", stats.LastAppearance,
			"첫 번째로 발견된 날짜여야 함")
	})

	t.Run("존재하지 않는 조합 확인", func(t *testing.T) {
		stats := analyzer.GetCombinationStatistics([]int{1, 2, 3})
		assert.NotNil(t, stats)
		assert.Equal(t, 0, stats.AppearanceCount)
		assert.Equal(t, "", stats.LastAppearance)
	})

	t.Run("부분 조합 확인", func(t *testing.T) {
		stats := analyzer.GetCombinationStatistics([]int{1, 20})
		assert.NotNil(t, stats)
		assert.Equal(t, 2, stats.AppearanceCount, "부분 조합이 2번 나타나야 함")
		assert.Equal(t, "Sat, Dec 28, 2024", stats.LastAppearance,
			"첫 번째로 발견된 날짜여야 함")
	})

	t.Run("날짜순 데이터 확인", func(t *testing.T) {
		var prevDate time.Time
		for i, draw := range draws {
			currentDate, err := parseDate(draw.Date)
			assert.NoError(t, err)

			if i > 0 {
				assert.True(t, prevDate.Before(currentDate),
					"데이터가 날짜 오름차순으로 정렬되어 있어야 함 (%v는 %v보다 이후여야 함)",
					currentDate, prevDate)
			}
			prevDate = currentDate
		}
	})
}
