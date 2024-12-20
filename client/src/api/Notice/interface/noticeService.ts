import { NoticeListResponse } from '../notice.types';

/**
 * 공지사항 서비스 인터페이스
 * @interface
 * @property {Function} getList - 공지사항 목록 조회
 */
export default interface INoticeService {
  getList: (page: number, limit: number) => Promise<NoticeListResponse>;
}
