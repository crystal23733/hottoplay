/**
 * 공지사항 목록 아이템 인터페이스
 * @interface
 * @property {string} id - 공지사항 아이디
 * @property {string} title - 공지사항 제목
 * @property {string} author - 공지사항 작성자
 * @property {string} created_at - 공지사항 작성일
 * @property {string} timestamp - 공지사항 작성일
 */
export interface NoticeListItem {
  id: string;
  title: string;
  author: string;
  created_at: string;
  timestamp: string;
}

/**
 * 공지사항 목록 응답 인터페이스
 * @interface
 * @property {NoticeListItem[]} notices - 공지사항 목록
 * @property {number} total - 공지사항 총 개수
 * @property {number} page - 현재 페이지
 * @property {number} limit - 페이지당 공지사항 개수
 */
export interface NoticeListResponse {
  notices: NoticeListItem[];
  total: number;
  page: number;
  limit: number;
}

/**
 * 공지사항 상세 응답 인터페이스
 * @interface
 * @property {string} id - 공지사항 아이디
 * @property {string} title - 공지사항 제목
 * @property {string} author - 공지사항 작성자
 * @property {string} created_at - 공지사항 작성일
 * @property {string} content - 공지사항 내용
 */
export interface NoticeDetailResponse {
  id: string;
  title: string;
  author: string;
  created_at: string;
  content: string;
}
