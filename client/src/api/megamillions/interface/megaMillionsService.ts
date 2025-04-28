import {
  MegaMillionsDrawsResponse,
  MegaMillionsGenerateRequest,
  MegaMillionsGenerateResponse,
  NumberFrequencyResponse,
  StatisticsRequest,
  StatisticsResponse,
} from '../megaMillions.types';

/**
 * 메가밀리언 서비스 인터페이스
 * 메가밀리언 관련 API 호출을 위한 메서드 정의
 */
export default interface IMegaMillionsService {
  /**
   * 메가밀리언 번호 생성
   * @param params - 생성 요청 파라미터
   */
  generate: (params: MegaMillionsGenerateRequest) => Promise<MegaMillionsGenerateResponse>;

  /**
   * 메가밀리언 통계 조회
   * @param numbers 통계를 조회할 번호 정보
   */
  getStatistics: (numbers: StatisticsRequest) => Promise<StatisticsResponse>;

  /**
   * 메가밀리언 추첨 결과 목록 조회
   * @param page 페이지 번호 (선택적)
   * @param size 페이지 크기 (선택적)
   */
  getDraws: (page?: number, size?: number) => Promise<MegaMillionsDrawsResponse>;

  /**
   * 메가밀리언 특정 추첨 결과 조회
   * @param drawDate 추첨 날짜 (YYYY-MM-DD 형식)
   */
  getDrawDetail: (drawDate: string) => Promise<MegaMillionsDrawsResponse>;

  /**
   * 메가밀리언 번호 빈도 조회
   */
  getNumberFrequency: () => Promise<NumberFrequencyResponse>;
}
