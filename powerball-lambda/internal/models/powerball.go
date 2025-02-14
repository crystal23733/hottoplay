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
}

// Rules는 파워볼 게임의 규칙을 나타내는 구조체입니다.
type Rules struct {
	// WhiteBallRange는 흰 공의 번호 범위를 나타냅니다. [최소값, 최대값]
	WhiteBallRange []int `json:"white_ball_range"`

	// PowerBallRange는 파워볼의 번호 범위를 나타냅니다. [최소값, 최대값]
	PowerBallRange []int `json:"powerball_range"`
}

// GeneratedNumbers는 생성된 파워볼 번호 조합을 나타내는 구조체입니다.
type GeneratedNumbers struct {
	// WhiteNumbers는 생성된 흰 공 번호들을 나타냅니다.
	WhiteNumbers []int `json:"white_numbers"`

	// Powerball은 생성된 파워볼 번호를 나타냅니다.
	Powerball int `json:"powerball"`
}
