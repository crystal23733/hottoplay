package models

// PowerballDraw는 파워볼 추첨 결과를 나타내는 구조체입니다.
type PowerballDraw struct {
	// Date는 추첨 날짜를 나타냅니다. (예: "Web, Feb 5, 2025")
	Date string `json:"date"`

	// WhiteNumbers는 흰 공 번호들을 나타냅니다.
	WhiteNumbers []string `json:"white_numbers"`

	// Powerball은 파워볼 번호를 나타냅니다.
	Powerball string `json:"powerball"`

	// PowerPlay는 파워플레이 배수를 나타냅니다. (예: "3x")
	PowerPlay string `json:"power_play"`

	// Era는 현재 규칙이 적용되는 시기를 나타냅니다.
	Era string `json:"era"`

	// Rules는 해당 회차의 규칙을 나타냅니다.
	Rules Rules `json:"rules"`

	// EstimatedJackpot는 추정 당첨금을 나타냅니다.
	EstimatedJackpot string `json:"estimated_jackpot,omitempty"`

	// CashValue는 현금 당첨금을 나타냅니다.
	CashValue string `json:"cash_value,omitempty"`

	// JackpotWinnersLocation는 당첨자 위치를 나타냅니다.
	JackpotWinnersLocation string `json:"jackpot_winners_location,omitempty"`

	// Match5PPWinnersLocation는 5+1 당첨자 위치를 나타냅니다.
	Match5PPWinnersLocation string `json:"match5_pp_winners_location,omitempty"`

	// Match5WinnersLocation는 5+0 당첨자 위치를 나타냅니다.
	Match5WinnersLocation string `json:"match5_winners_location,omitempty"`

	// PrizeBreakdown는 각 당첨 단계별 정보를 나타냅니다.
	PrizeBreakdown []PrizeTier `json:"prize_breakdown,omitempty"`
}

// PrizeTier는 각 당첨 단계별 정보를 나타냅니다.
type PrizeTier struct {
	// PrizeTier는 당첨 단계를 나타냅니다.
	PrizeTier string `json:"prize_tier"`

	// Winners는 당첨자 수를 나타냅니다.
	Winners string `json:"winners"`

	// Prize는 당첨금을 나타냅니다.
	Prize string `json:"prize"`

	// PowerPlay는 파워플레이 배수를 나타냅니다.
	PowerPlay string `json:"power_play"`
}

// Rules는 파워볼 게임의 규칙을 나타내는 구조체입니다.
type Rules struct {
	// WhiteBallRange는 흰 공의 번호 범위를 나타냅니다. [최소값, 최대값]
	WhiteBallRange []int `json:"white_ball_range"`

	// PowerBallRange는 파워볼의 번호 범위를 나타냅니다. [최소값, 최대값]
	PowerBallRange []int `json:"power_ball_range"`
}

// GeneratedNumbers는 생성된 파워볼 번호 조합을 나타내는 구조체입니다.
type GeneratedNumbers struct {
	// WhiteNumbers는 생성된 흰 공 번호들을 나타냅니다.
	WhiteNumbers []int `json:"white_numbers"`

	// Powerball은 생성된 파워볼 번호를 나타냅니다.
	Powerball int `json:"powerball"`
}
