/**
 * 날짜 포맷팅 함수
 * @param dateString 날짜 문자열
 * @returns 포맷팅된 날짜 문자열
 */
export default (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
