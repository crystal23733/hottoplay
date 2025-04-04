package utils

type ParseIntInterface interface {
	ParseInt(s string) (int, error)
}

// parseInt는 문자열을 정수로 변환합니다.
func ParseInt(s string) int {
	num := 0
	for _, ch := range s {
		if ch >= '0' && ch <= '9' {
			num = num*10 + int(ch-'0')
		}
	}

	return num
}
