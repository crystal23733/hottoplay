import FetchApi from '../lib/fetch/FetchApi';
import ENDPOINT from '../url/constants/ENDPOINT';
import IMegaMillionsService from './interface/megaMillionsService';
import {
  MegaMillionsDrawsResponse,
  MegaMillionsGenerateRequest,
  MegaMillionsGenerateResponse,
  NumberFrequencyResponse,
  StatisticsRequest,
  StatisticsResponse,
} from './megaMillions.types';

/**
 * 메가밀리언 서비스 클래스
 * 메가밀리언 API 요청 처리
 */
export default class MegaMillionsService implements IMegaMillionsService {
  private api: FetchApi<MegaMillionsGenerateResponse>;
  private apiStatistics: FetchApi<StatisticsResponse>;
  private apiDraws: FetchApi<MegaMillionsDrawsResponse>;
  private apiNumberFrequency: FetchApi<NumberFrequencyResponse>;

  constructor() {
    this.api = new FetchApi(ENDPOINT.MEGA_MILLIONS);
    this.apiStatistics = new FetchApi(ENDPOINT.MEGA_MILLIONS);
    this.apiDraws = new FetchApi(ENDPOINT.MEGA_MILLIONS);
    this.apiNumberFrequency = new FetchApi(ENDPOINT.MEGA_MILLIONS);
  }

  /**
   * 메가밀리언 번호 생성 요청
   * @param params - 생성 요청 파라미터
   * @returns 생성된 번호 응답
   */
  async generate(params: MegaMillionsGenerateRequest): Promise<MegaMillionsGenerateResponse> {
    return await this.api.request(`${ENDPOINT.MEGA_MILLIONS_GENERATE}`, 'POST', params);
  }

  /**
   * 메가밀리언 통계 조회
   * @param numbers - 통계를 조회할 번호 배열
   * @returns 통계 응답
   */
  async getStatistics(numbers: StatisticsRequest): Promise<StatisticsResponse> {
    return await this.apiStatistics.request(`${ENDPOINT.MEGA_MILLIONS_STATISTICS}`, 'POST', {
      numbers: numbers.numbers,
    });
  }

  /**
   * 메가밀리언 추첨 결과 목록 조회
   * @param page - 페이지 번호 (선택적)
   * @param size - 페이지 크기 (선택적)
   * @returns 추첨 결과 목록 응답
   */
  async getDraws(page?: number, size?: number): Promise<MegaMillionsDrawsResponse> {
    const queryParams = new URLSearchParams();
    if (page !== undefined) queryParams.append('page', page.toString());
    if (size !== undefined) queryParams.append('size', size.toString());

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';

    return await this.apiDraws.request(`${ENDPOINT.MEGA_MILLIONS_DRAWS}${queryString}`, 'GET');
  }

  /**
   * 메가밀리언 특정 추첨 결과 조회
   * @param drawDate - 추첨 날짜 (YYYY-MM-DD 형식)
   * @returns 특정 추첨 결과 응답
   */
  async getDrawDetail(drawDate: string): Promise<MegaMillionsDrawsResponse> {
    return await this.apiDraws.request(`${ENDPOINT.MEGA_MILLIONS_DRAW_DETAIL}/${drawDate}`, 'GET');
  }

  /**
   * 메가밀리언 번호 빈도 조회
   * @returns 번호 빈도 응답
   */
  async getNumberFrequency(): Promise<NumberFrequencyResponse> {
    return await this.apiNumberFrequency.request(
      `${ENDPOINT.MEGA_MILLIONS_NUMBER_FREQUENCY}`,
      'GET'
    );
  }
}
