package router

import (
	"board-server/internal/delivery/http/handler"
	"net/http"

	"github.com/labstack/echo/v4"
)

// InitRoutes는 모든 라우트를 초기화한다.
func InitRoutes(e *echo.Echo, noticeHandler *handler.NoticeHandler) {
	// API 그룹 생성
	api := e.Group("/api/v1")

	// 공지사항 라우트
	notices := api.Group("/notices")

	// 헬스체크
	notices.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "OK")
	})

	// 공지사항 라우트 설정
	notices.GET("/list", noticeHandler.GetNotices)
	notices.GET("/:timestamp", noticeHandler.GetNoticeDetail)
}
