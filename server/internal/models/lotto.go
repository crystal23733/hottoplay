package models

// LottoData는 로또 회차별 데이터의 구조를 정의합니다.
type LottoData struct {
	TotSellamnt    int    `json:"totSellamnt"`    // 총 판매 금액
	FirstWinamnt   int    `json:"firstWinamnt"`   // 1등 당첨금
	DrwNo          int    `json:"drwNo"`          // 회차 번호
	DrwtNo1        int    `json:"drwtNo1"`        // 당첨 번호 1
	DrwtNo2        int    `json:"drwtNo2"`        // 당첨 번호 2
	DrwtNo3        int    `json:"drwtNo3"`        // 당첨 번호 3
	DrwtNo4        int    `json:"drwtNo4"`        // 당첨 번호 4
	DrwtNo5        int    `json:"drwtNo5"`        // 당첨 번호 5
	DrwtNo6        int    `json:"drwtNo6"`        // 당첨 번호 6
	BnusNo         int    `json:"bnusNo"`         // 보너스 번호
	FirstPrzwnerCo int    `json:"firstPrzwnerCo"` // 1등 당첨자 수
	FirstAccumamnt int    `json:"firstAccumamnt"` // 1등 누적 당첨금
	ReturnValue    string `json:"returnValue"`    // 응답 상태 (예: success)
	DrwNoDate      string `json:"drwNoDate"`      // 추첨 날짜
}

// LottoRequest는 로또 번호 생성 요청의 구조를 정의합니다.
type LottoRequest struct {
	Type string `json:"type"` // 번호 생성 타입 (default, unique, many, custom)
}

// LottoResponse는 로또 번호 생성 응답의 구조를 정의합니다.
type LottoResponse struct {
	Numbers []int  `json:"numbers"`         // 생성된 로또 번호
	Error   string `json:"error,omitempty"` // 에러 메시지 (있는 경우)
}

type LottoRoundData struct {
	DrwNo          int    `json:"drwNo"`          // 회차 번호
	TotSellamnt    int    `json:"totSellamnt"`    // 총 판매 금액
	FirstWinamnt   int    `json:"firstWinamnt"`   // 1등 당첨금
	Numbers        []int  `json:"numbers"`        // 1~6번 번호
	BnusNo         int    `json:"bnusNo"`         // 보너스 번호
	FirstPrzwnerCo int    `json:"firstPrzwnerCo"` // 1등 당첨자 수
	FirstAccumamnt int    `json:"firstAccumamnt"` // 1등 누적 당첨금
	ReturnValue    string `json:"returnValue"`    // 응답 상태 (예: success)
	DrwNoDate      string `json:"drwNoDate"`      // 추첨 날짜
}

// PupolarResponse는 가장 많이나온 번호들을 응답하는 구조체입니다.
type PopularResponse struct {
	Numbers int `json:"numbers"`
	Freq    int `json:"freq"`
}
