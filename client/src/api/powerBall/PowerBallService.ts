import FetchApi from '../lib/fetch/FetchApi';
import ENDPOINT from '../url/constants/ENDPOINT';
import IPowerBallService from './interface/powerBallService';
import {
  PowerBallGenerateRequest,
  PowerBallGenerateResponse,
  StatisticsRequest,
  StatisticsResponse,
} from './powerBall.types';

/**
 * 파워볼 서비스 클래스
 */
export default class PowerBallService implements IPowerBallService {
  private api: FetchApi<PowerBallGenerateResponse>;
  private apiStatistics: FetchApi<StatisticsResponse>;

  constructor() {
    this.api = new FetchApi<PowerBallGenerateResponse>(ENDPOINT.POWER_BALL);
    this.apiStatistics = new FetchApi<StatisticsResponse>(ENDPOINT.POWER_BALL);
  }

  /**
   * 파워볼 번호 생성 요청
   * @param params - 생성 요청 파라미터
   * @returns 생성된 번호 응답
   */
  async generate(params: PowerBallGenerateRequest): Promise<PowerBallGenerateResponse> {
    return await this.api.request(`${ENDPOINT.POWER_BALL_GENERATE}`, 'POST', params);
  }

  /**
   * 파워볼 통계 조회
   * @param number - 통계를 조회할 번호 배열
   * @returns 통계 응답
   */
  async getStatistics(numbers: StatisticsRequest): Promise<StatisticsResponse> {
    return await this.apiStatistics.request(`${ENDPOINT.POWER_BALL_STATISTICS}`, 'POST', {
      numbers: numbers.numbers,
    });
  }
}
