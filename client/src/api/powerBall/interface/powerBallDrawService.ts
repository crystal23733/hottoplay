import {
  DrawDetailRequest,
  DrawDetailResponse,
  DrawListRequest,
  DrawListResponse,
  NumberFrequencyResponse,
} from '../powerBallDraw.types';

/**
 * 파워볼 추첨 결과 서비스 인터페이스
 * 파워볼 추첨 결과 목록 조회, 상세 조회, 번호 빈도 조회 기능 제공
 */
export default interface IPowerBallDrawService {
  /**
   * 파워볼 추첨 결과 목록 조회
   * @param params - 조회 요청 파라미터 (페이지네이션, 필터링 등)
   * @returns 추첨 결과 목록
   */
  getDrawList: (params: DrawListRequest) => Promise<DrawListResponse>;

  /**
   * 파워볼 추첨 결과 상세 조회
   * @param params - 조회 요청 파라미터 (날짜)
   * @returns 추첨 결과 상세 정보
   */
  getDrawDetail: (params: DrawDetailRequest) => Promise<DrawDetailResponse>;

  /**
   * 파워볼 번호 빈도 조회
   * @returns 번호 빈도 정보
   */
  getNumberFrequency: () => Promise<NumberFrequencyResponse>;
}
