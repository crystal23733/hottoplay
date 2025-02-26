/**
 * 엔드포인트
 * @constant
 * @type {Object}
 * @property {string} API - API 엔드포인트
 * @property {string} NOTICES - 공지사항 엔드포인트
 */
export default {
  API: process.env.NEXT_PUBLIC_API_ENDPOINT as string,
  NOTICES: process.env.NEXT_PUBLIC_NOTICE_LOOKUP_ENDPOINT as string,
  LIST: process.env.NEXT_PUBLIC_NOTICE_LIST_ENDPOINT as string,
  POWER_BALL: process.env.NEXT_PUBLIC_POWER_BALL_API_ENDPOINT as string,
  POWER_BALL_GENERATE: process.env.NEXT_PUBLIC_POWER_BALL_GENERATE_ENDPOINT as string,
  POWER_BALL_STATISTICS: process.env.NEXT_PUBLIC_POWER_BALL_STATISTICS_ENDPOINT as string,
} as const;
