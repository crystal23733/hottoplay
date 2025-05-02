// client/src/api/megamillions/MegaMillionsService.ts
import FetchApi from '../lib/fetch/FetchApi';
import ENDPOINT from '../url/constants/ENDPOINT';
import IMegaMillionsService from './interface/megaMillionsService';
import {
  MegaMillionsGenerateRequest,
  MegaMillionsGenerateResponse,
  StatisticsRequest,
  StatisticsResponse,
} from './megaMillions.types';

/**
 * 메가밀리언스 서비스 클래스
 * 메가밀리언스 번호 생성 및 통계 API 요청 처리
 */
export default class MegaMillionsService implements IMegaMillionsService {
  private api: FetchApi<MegaMillionsGenerateResponse>;
  private apiStatistics: FetchApi<StatisticsResponse>;

  constructor() {
    this.api = new FetchApi(ENDPOINT.MEGA_MILLIONS);
    this.apiStatistics = new FetchApi(ENDPOINT.MEGA_MILLIONS);
  }

  /**
   * 메가밀리언스 번호 생성 요청
   * @param params - 생성 요청 파라미터
   * @returns 생성된 번호 응답
   */
  async generate(params: MegaMillionsGenerateRequest): Promise<MegaMillionsGenerateResponse> {
    return await this.api.request(`${ENDPOINT.MEGA_MILLIONS_GENERATE}`, 'POST', params);
  }

  /**
   * 메가밀리언스 통계 조회
   * @param numbers - 통계를 조회할 번호 배열
   * @returns 통계 응답
   */
  async getStatistics(numbers: StatisticsRequest): Promise<StatisticsResponse> {
    return await this.apiStatistics.request(`${ENDPOINT.MEGA_MILLIONS_STATISTICS}`, 'POST', {
      numbers: numbers.numbers,
    });
  }
}
