package models

// DrawSummary는 회차 목록 응답을 위한 간략 정보입니다.
type DrawSummary struct {
	// 회차 날짜
	Date string `json:"date"`

	// 번호 목록
	WhiteNumbers []int `json:"white_numbers"`

	// 메가볼 번호
	MegaBall int `json:"mega_ball"`

	// 메가플라이어 번호
	MegaPlier interface{} `json:"mega_plier"`

	// 추정 당첨금
	EstimatedJackpot string `json:"estimated_jackpot,omitempty"`

	// 당첨자 수
	JackpotWinners int `json:"jackpot_winners,omitempty"`
}

// 검색 요청
type DrawListRequest struct {
	// 페이지 번호
	Page int `json:"page"`

	// 페이지 크기
	PageSize int `json:"page_size"`

	// 검색어
	SearchTerm string `json:"search_term,omitempty"`

	// 날짜 필터링 옵션
	Year      int    `json:"year,omitempty"`       // 연도로 필터링
	Month     int    `json:"month,omitempty"`      // 월로 필터링
	Day       int    `json:"day,omitempty"`        // 일로 필터링
	StartDate string `json:"start_date,omitempty"` // 시작 날짜 (형식: "April 11, 2025")
	EndDate   string `json:"end_date,omitempty"`   // 종료 날짜 (형식: "April 11, 2025")
	Number    int    `json:"number,omitempty"`     // 특정 번호로 검색
}

// 회차 목록 응답
type DrawListResponse struct {
	// 회차 목록
	Draws []DrawSummary `json:"draws"`

	// 총 회차 수
	TotalCount int `json:"total_count"`

	// 현재 페이지
	Page int `json:"page"`

	// 페이지 크기
	PageSize int `json:"page_size"`
}

// 특정 회차 요청
type DrawDetailRequest struct {
	// 회차 날짜
	Date string `json:"date"`
}

// 번호 빈도 응답
type NumberFrequencyResponse struct {
	// 흰공 번호 빈도 목록
	WhiteBalls []NumberFrequency `json:"white_balls"`

	// 메가볼 빈도 목록
	MegaBalls []NumberFrequency `json:"mega_balls"`
}

// 번호 빈도 정보
type NumberFrequency struct {
	// 번호
	Number int `json:"number"`

	// 빈도
	Count int `json:"count"`
}
