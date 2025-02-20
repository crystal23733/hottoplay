import FetchApi from '../lib/fetch/FetchApi';
import ENDPOINT from '../url/constants/ENDPOINT';
import IPowerBallService from './interface/powerBallService';
import { PowerBallGenerateRequest, PowerBallGenerateResponse } from './powerBall.types';

/**
 * 파워볼 서비스 클래스
 */
export default class PowerBallService implements IPowerBallService {
  private api: FetchApi<PowerBallGenerateResponse>;

  constructor() {
    this.api = new FetchApi<PowerBallGenerateResponse>(ENDPOINT.POWER_BALL);
  }

  /**
   * 파워볼 번호 생성 요청
   * @param params - 생성 요청 파라미터
   * @returns 생성된 번호 응답
   */
  async generate(params: PowerBallGenerateRequest): Promise<PowerBallGenerateResponse> {
    return await this.api.request(`${ENDPOINT.POWER_BALL_GENERATE}`, 'POST', params);
  }
}
