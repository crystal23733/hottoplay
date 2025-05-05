/**
 * 파워볼 추첨 결과 검색 컴포넌트 타입
 * @property {function} onSearch - 검색 이벤트 핸들러
 * @property {function} onDateSearch - 날짜 검색 이벤트 핸들러
 * @property {function} onReset - 초기화 이벤트 핸들러
 * @property {string[] | Date[]} availableDates - 사용 가능한 날짜 목록
 */
export default interface DrawSearchProps {
  onSearch: (searchTerm: string) => void;
  onDateSearch: (startDate: string, endDate: string) => void;
  onReset: () => void;
  availableDates?: string[] | Date[];
}
