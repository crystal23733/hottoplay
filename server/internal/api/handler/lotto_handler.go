package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"server/internal/models"
	"server/internal/service"
)

// LottoHandler는 로또 관련 HTTP 요청을 처리하는 핸들러입니다.
type LottoHandler struct {
	service service.LottoServiceInterface
}

// NewLottoHandler는 새로운 LottoHandler 인스턴스를 생성합니다.
func NewLottoHandler(service service.LottoServiceInterface) *LottoHandler {
	return &LottoHandler{
		service: service,
	}
}

// GenerateNumbers는 로또 번호 생성 요청을 처리합니다.
func (h *LottoHandler) GenerateNumbers(w http.ResponseWriter, r *http.Request) {
	var req models.LottoRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "잘못된 요청 형식입니다", http.StatusBadRequest)
		return
	}
	log.Printf("req: %+v", req)

	var numbers []int
	var err error

	switch req.Type {
	case "unique":
		numbers, err = h.service.GenerateUniqueNumbers()
	case "many":
		numbers = h.service.GeneratePopularBasedNumbers()
	default:
		http.Error(w, "지원하지 않는 생성 타입입니다", http.StatusBadRequest)
		return
	}

	if err != nil {
		json.NewEncoder(w).Encode(models.LottoResponse{
			Error: err.Error(),
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.LottoResponse{
		Numbers: numbers,
	})
}
