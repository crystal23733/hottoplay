import FetchApi from '../lib/fetch/FetchApi';
import ENDPOINT from '../url/constants/ENDPOINT';
import IMegaMillionsDrawService from './interface/megaMillionsDrawService';
import {
  DrawDetailRequest,
  DrawDetailResponse,
  DrawListRequest,
  DrawListResponse,
  NumberFrequencyResponse,
} from './megaMillionsDraw.types';

/**
 * 메가밀리언스 추첨 결과 서비스 클래스
 * 메가밀리언스 추첨 결과를 조회하는 API 호출 구현
 */
export default class MegaMillionsDrawService implements IMegaMillionsDrawService {
  private apiDrawList: FetchApi<DrawListResponse>;
  private apiDrawDetail: FetchApi<DrawDetailResponse>;
  private apiNumberFrequency: FetchApi<NumberFrequencyResponse>;

  /**
   * 생성자
   */
  constructor() {
    this.apiDrawList = new FetchApi<DrawListResponse>(ENDPOINT.MEGA_MILLIONS);
    this.apiDrawDetail = new FetchApi<DrawDetailResponse>(ENDPOINT.MEGA_MILLIONS);
    this.apiNumberFrequency = new FetchApi<NumberFrequencyResponse>(ENDPOINT.MEGA_MILLIONS);
  }

  /**
   * 메가밀리언스 추첨 결과 목록 조회
   * @param params - 페이지네이션, 필터링 정보
   * @returns 추첨 결과 목록
   */
  async getDrawList(params: DrawListRequest): Promise<DrawListResponse> {
    return await this.apiDrawList.request(ENDPOINT.MEGA_MILLIONS_DRAWS, 'POST', params);
  }

  /**
   * 메가밀리언스 추첨 결과 상세 조회
   * @param params - 조회할 날짜 정보
   * @returns 추첨 결과 상세 정보
   */
  async getDrawDetail(params: DrawDetailRequest): Promise<DrawDetailResponse> {
    const requestParams = { draw_date: params.date };
    return await this.apiDrawDetail.request(
      ENDPOINT.MEGA_MILLIONS_DRAW_DETAIL,
      'POST',
      requestParams
    );
  }

  /**
   * 메가밀리언스 번호 빈도 조회
   * @returns 번호 빈도 정보
   */
  async getNumberFrequency(): Promise<NumberFrequencyResponse> {
    return await this.apiNumberFrequency.request(
      ENDPOINT.MEGA_MILLIONS_NUMBER_FREQUENCY,
      'POST',
      {}
    );
  }
}
