package router

import (
	"board-server/internal/delivery/http/handler"

	"github.com/labstack/echo/v4"
)

// InitRoutes는 모든 라우트를 초기화한다.
func InitRoutes(e *echo.Echo, noticeHandler *handler.NoticeHandler) {
	// API 그룹 생성
	api := e.Group("/api/v1")

	// 공지사항 라우트
	notices := api.Group("/notices")

	// 공지사항 라우트 설정
	notices.GET("", noticeHandler.GetNotices)
}
