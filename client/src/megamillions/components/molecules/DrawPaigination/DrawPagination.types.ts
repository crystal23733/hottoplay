/**
 * 파워볼 추첨 결과 페이지네이션 컴포넌트 타입
 * @property {number} currentPage - 현재 페이지
 * @property {number} totalPages - 총 페이지 수
 * @property {number} pageSize - 페이지 크기
 * @property {function} onPageChange - 페이지 변경 이벤트 핸들러
 * @property {function} onPageSizeChange - 페이지 크기 변경 이벤트 핸들러
 * @property {number} totalResults - 총 결과 수
 */
export default interface DrawPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  totalResults: number;
}
