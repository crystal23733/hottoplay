package models

// NumberStatistics는 특정 번호의 통계 정보를 나타냅니다.
type NumberStatistics struct {
	Number         int    `json:"number"`
	WhiteBallCount int    `json:"white_ball_count"` // 흰 공으로 선택된 횟수
	PowerBallCount int    `json:"power_ball_count"` // 파워볼로 선택된 횟수
	LastDrawDate   string `json:"last_draw_date"`   // 마지막으로 뽑힌 날짜
}

// CombinationStatistics는 선택된 번호 조합의 통계 정보를 나타냅니다.
type CombinationStatistics struct {
	Numbers         []int  `json:"numbers"`          // 선택된 번호들
	AppearanceCount int    `json:"appearance_count"` // 해당 조합이 나온 횟수
	LastAppearance  string `json:"last_appearance"`  // 마지막으로 나온 날짜
}

// StatisticsResponse는 통계 API의 응답 구조체입니다.
type StatisticsResponse struct {
	NumberStats      []NumberStatistics     `json:"numberStats,omitempty"`
	CombinationStats *CombinationStatistics `json:"combinationStats,omitempty"`
}
