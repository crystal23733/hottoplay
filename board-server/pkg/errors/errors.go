package errors

import "errors"

var (
	// ErrInvalidInput은 잘못된 입력값이 제공되었을 때 반환
	ErrInvalidInput = errors.New("잘못된 입력입니다.")
	// ErrNotFound는 요청한 리소스를 찾을 수 없을 때 반환
	ErrNotFound = errors.New("요청한 리소스를 찾을 수 없습니다.")
	// ErrInternalServer는 내부 서버 오류가 발생했을 때 반환
	ErrInternalServer = errors.New("서버 오류가 발생했습니다.")
	// ErrEmptyTitle은 게시글 제목이 비어있을 때 반환
	ErrEmptyTitle = errors.New("제목은 필수 입력 항목입니다.")
	// ErrEmptyContent는 게시글 내용이 비어있을 때 반환
	ErrEmptyContent = errors.New("내용은 필수 입력 항목입니다.")
	// ErrUnauthorized는 인증되지 않은 사용자가 요청했을 때 반환
	ErrUnauthorized = errors.New("인증되지 않은 사용자입니다.")
	// ErrUserNotFound는 사용자를 찾을 수 없을 때 반환
	ErrUserNotFound = errors.New("사용자를 찾을 수 없습니다.")
)
