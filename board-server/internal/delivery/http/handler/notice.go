package handler

import (
	"board-server/internal/usecase"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type NoticeHandler struct {
	noticeUsecase usecase.NoticeUsecase
}

func NewNoticeHandler(u usecase.NoticeUsecase) *NoticeHandler {
	return &NoticeHandler{
		noticeUsecase: u,
	}
}

// NoticeResponse는 클라이언트에 반환할 게시글 정보를 정의한다.
type NoticeResponse struct {
	ID        primitive.ObjectID `json:"id"`
	CreatedAt time.Time          `json:"created_at"`
	Title     string             `json:"title"`
	Author    string             `json:"author"`
}

// NoticeListResponse는 게시글 목록 응답 구조를 정의한다.
type NoticeListResponse struct {
	Total   int64            `json:"total"`
	Page    int              `json:"page"`
	Limit   int              `json:"limit"`
	Notices []NoticeResponse `json:"notices"`
}

// GetNotices는 게시글 목록을 조회하는 핸들러이다.
// @Summary 게시글 목록 조회
// @Description 게시글 목록을 조회합니다
// @Accept json
// @Produce json
// @Param page query int true "페이지 번호"
// @Param limit query int true "페이지당 게시글 수"
// @Success 200 {object} NoticeListResponse
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /notices [get]
func (h *NoticeHandler) GetNotices(c echo.Context) error {
	// 쿼리 파라미터 파싱
	page, err := strconv.Atoi(c.QueryParam("page"))
	if err != nil {
		page = 1
	}

	limit, err := strconv.Atoi(c.QueryParam("limit"))
	if err != nil {
		limit = 20
	}

	notices, total, err := h.noticeUsecase.GetNotices(page, limit)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "게시글 목록을 불러오는데 실패했습니다.",
		})
	}

	// 응답 데이터 변환
	noticeResponses := make([]NoticeResponse, len(notices))
	for i, notice := range notices {
		// 작성자 정보 조회
		author, err := h.noticeUsecase.GetUserByID(notice.Author)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"message": "작성자 정보를 불러오는데 실패했습니다.",
			})
		}

		noticeResponses[i] = NoticeResponse{
			ID:        notice.ID,
			Title:     notice.Title,
			Author:    author.Name,
			CreatedAt: notice.CreatedAt,
		}
	}

	response := NoticeListResponse{
		Notices: noticeResponses,
		Total:   total,
		Page:    page,
		Limit:   limit,
	}

	return c.JSON(http.StatusOK, response)
}
