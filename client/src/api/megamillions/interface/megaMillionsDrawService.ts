import {
  DrawDetailRequest,
  DrawDetailResponse,
  DrawListRequest,
  DrawListResponse,
  NumberFrequencyResponse,
} from '../megaMillionsDraw.types';

/**
 * 메가밀리언스 추첨 결과 서비스 인터페이스
 * 추첨 결과 관련 API 호출을 위한 메서드 정의
 */
export default interface IMegaMillionsDrawService {
  /**
   * 메가밀리언스 추첨 결과 목록 조회
   * @param params 페이지네이션, 필터링 정보
   */
  getDrawList: (params: DrawListRequest) => Promise<DrawListResponse>;

  /**
   * 메가밀리언스 추첨 결과 상세 조회
   * @param params 조회할 날짜 정보
   */
  getDrawDetail: (params: DrawDetailRequest) => Promise<DrawDetailResponse>;

  /**
   * 메가밀리언스 번호 빈도 조회
   */
  getNumberFrequency: () => Promise<NumberFrequencyResponse>;
}
