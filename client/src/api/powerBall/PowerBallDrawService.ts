import FetchApi from '../lib/fetch/FetchApi';
import ENDPOINT from '../url/constants/ENDPOINT';
import IPowerBallDrawService from './interface/powerBallDrawService';
import {
  DrawDetailRequest,
  DrawDetailResponse,
  DrawListRequest,
  DrawListResponse,
  NumberFrequencyResponse,
} from './powerBallDraw.types';

/**
 * 파워볼 추첨 결과 서비스 클래스
 * 파워볼 추첨 결과를 조회하는 API 호출 구현
 */
export default class PowerBallDrawService implements IPowerBallDrawService {
  private apiDrawList: FetchApi<DrawListResponse>;
  private apiDrawDetail: FetchApi<DrawDetailResponse>;
  private apiNumberFrequency: FetchApi<NumberFrequencyResponse>;

  /**
   * 생성자
   */
  constructor() {
    this.apiDrawList = new FetchApi<DrawListResponse>(ENDPOINT.POWER_BALL);
    this.apiDrawDetail = new FetchApi<DrawDetailResponse>(ENDPOINT.POWER_BALL);
    this.apiNumberFrequency = new FetchApi<NumberFrequencyResponse>(ENDPOINT.POWER_BALL);
  }

  /**
   * 파워볼 추첨 결과 목록 조회
   * @param params - 페이지네이션, 필터링 정보
   * @returns 추첨 결과 목록
   */
  async getDrawList(params: DrawListRequest): Promise<DrawListResponse> {
    return await this.apiDrawList.request(ENDPOINT.POWER_BALL_DRAWS, 'POST', params);
  }

  /**
   * 파워볼 추첨 결과 상세 조회
   * @param params - 조회할 날짜 정보
   * @returns 추첨 결과 상세 정보
   */
  async getDrawDetail(params: DrawDetailRequest): Promise<DrawDetailResponse> {
    return await this.apiDrawDetail.request(ENDPOINT.POWER_BALL_DRAW_DETAIL, 'POST', params);
  }

  /**
   * 파워볼 번호 빈도 조회
   * @returns 번호 빈도 정보
   */
  async getNumberFrequency(): Promise<NumberFrequencyResponse> {
    return await this.apiNumberFrequency.request(ENDPOINT.POWER_BALL_NUMBER_FREQUENCY, 'POST', {});
  }
}
