import FetchApi from '../lib/fetch/FetchApi';
import ENDPOINT from '../url/constants/ENDPOINT';
import NOTICE_URL from '../url/constants/noticeUrl';
import INoticeService from './interface/noticeService';
import { NoticeListResponse } from './notice.types';

/**
 * 공지사항 서비스
 */
export default class NoticeService implements INoticeService {
  private api: FetchApi<NoticeListResponse>;

  /**
   * 생성자
   */
  constructor() {
    this.api = new FetchApi<NoticeListResponse>(NOTICE_URL);
  }

  /**
   * 공지사항 목록 조회
   * @param {number} page - 페이지
   * @param {number} limit - 페이지당 데이터 수
   * @returns {Promise<NoticeListResponse>} - 공지사항 목록
   */
  async getList(page: number = 1, limit: number = 10): Promise<NoticeListResponse> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    return await this.api.request(
      `${ENDPOINT.API}${ENDPOINT.NOTICES}?${queryParams.toString()}`,
      'GET'
    );
  }
}
