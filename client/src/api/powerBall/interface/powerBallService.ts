import {
  PowerBallGenerateRequest,
  PowerBallGenerateResponse,
  StatisticsRequest,
  StatisticsResponse,
} from '../powerBall.types';

/**
 * 파워볼 서비스 인터페이스
 * 파워볼 번호 생성 요청 및 응답 타입 정의
 */
export default interface IPowerBallService {
  generate: (params: PowerBallGenerateRequest) => Promise<PowerBallGenerateResponse>;
  getStatistics: (numbers: StatisticsRequest) => Promise<StatisticsResponse>;
}
