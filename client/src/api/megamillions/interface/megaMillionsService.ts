// client/src/api/megamillions/interface/megaMillionsService.ts
import {
  MegaMillionsGenerateRequest,
  MegaMillionsGenerateResponse,
  StatisticsRequest,
  StatisticsResponse,
} from '../megaMillions.types';

/**
 * 메가밀리언스 서비스 인터페이스
 * 메가밀리언스 번호 생성 및 통계 API 호출을 위한 메서드 정의
 */
export default interface IMegaMillionsService {
  /**
   * 메가밀리언스 번호 생성
   * @param params - 생성 요청 파라미터
   */
  generate: (params: MegaMillionsGenerateRequest) => Promise<MegaMillionsGenerateResponse>;

  /**
   * 메가밀리언스 통계 조회
   * @param numbers 통계를 조회할 번호 정보
   */
  getStatistics: (numbers: StatisticsRequest) => Promise<StatisticsResponse>;
}
