package models

import "time"

// MegaMillionsDraw는 메가밀리언 추첨 결과를 나타내는 구조체입니다.
type MegaMillionsDraw struct {
	// Date는 추첨 날짜를 나타냅니다. (예: "April 11, 2025")
	Date string `json:"date"`

	// WhiteNumbers는 흰 공 번호들을 나타냅니다.
	WhiteNumbers []int `json:"white_numbers"`

	// MegaBall은 메가볼 번호를 나타냅니다.
	MegaBall int `json:"mega_ball"`

	// MegaPlier는 메가플라이어 배수를 나타냅니다.
	MegaPlier interface{} `json:"mega_plier"`

	// EstimatedJackpot는 추정 당첨금을 나타냅니다.
	EstimatedJackpot string `json:"estimated_jackpot"`

	// CashOption은 현금 당첨금 옵션을 나타냅니다.
	CashOption string `json:"cash_option"`

	// PrizeBreakdown는 각 당첨 단계별 정보를 나타냅니다.
	PrizeBreakdown []PrizeTier `json:"prize_breakdown"`

	// Era는 현재 규칙이 적용되는 시기를 나타냅니다.
	Era string `json:"era"`

	// Rules는 해당 회차의 규칙을 나타냅니다.
	Rules Rules `json:"rules"`
}

// PrizeTier는 각 당첨 단계별 정보를 나타냅니다.
type PrizeTier struct {
	// Category는 당첨 카테고리를 나타냅니다. (regular, megaplier 등)
	Category string `json:"category"`

	// Match는 당첨 매치를 나타냅니다. (예: "5+1", "4+0")
	Match string `json:"match"`

	// Prize는 당첨금을 나타냅니다.
	Prize string `json:"prize"`

	// Winners는 당첨자 수를 나타냅니다.
	Winners int `json:"winners"`

	// PrizeFund는 해당 등수의 총 당첨금을 나타냅니다.
	PrizeFund string `json:"prize_fund"`
}

// Rules는 메가밀리언 게임의 규칙을 나타내는 구조체입니다.
type Rules struct {
	// WhiteBallRange는 흰 공의 번호 범위를 나타냅니다. [최소값, 최대값]
	WhiteBallRange []int `json:"white_ball_range"`

	// MegaBallRange는 메가볼의 번호 범위를 나타냅니다. [최소값, 최대값]
	MegaBallRange []int `json:"mega_ball_range"`

	// StartDate는 해당 규칙의 시작 날짜입니다.
	StartDate string `json:"start_date"`

	// EndDate는 해당 규칙의 종료 날짜입니다. null이면 현재 적용중인 규칙입니다.
	EndDate interface{} `json:"end_date"`
}

// GameEra는 메가밀리언 게임의 시대별 규칙을 나타냅니다.
type GameEra struct {
	// Era는 시대 이름입니다.
	Era string `json:"era"`

	// Name은 게임의 이름입니다. (예: "The Big Game", "Mega Millions")
	Name string `json:"name"`

	// StartDate는 해당 시대의 시작 날짜입니다.
	StartDate time.Time `json:"start_date"`

	// EndDate는 해당 시대의 종료 날짜입니다. null이면 현재 적용중인 시대입니다.
	EndDate *time.Time `json:"end_date"`

	// WhiteBallRange는 흰 공의 번호 범위를 나타냅니다. [최소값, 최대값]
	WhiteBallRange []int `json:"white_ball_range"`

	// MegaBallRange는 메가볼의 번호 범위를 나타냅니다. [최소값, 최대값]
	MegaBallRange []int `json:"mega_ball_range"`

	// TicketPrice는 티켓 가격입니다.
	TicketPrice float64 `json:"ticket_price"`

	// JackpotOdds는 잭팟 당첨 확률입니다. (예: "1 : 302,575,350")
	JackpotOdds string `json:"jackpot_odds"`
}

// GeneratedNumbers는 생성된 메가밀리언 번호 조합을 나타내는 구조체입니다.
type GeneratedNumbers struct {
	// WhiteNumbers는 생성된 흰 공 번호들을 나타냅니다.
	WhiteNumbers []int `json:"white_numbers"`

	// MegaBall은 생성된 메가볼 번호를 나타냅니다.
	MegaBall int `json:"mega_ball"`
}
