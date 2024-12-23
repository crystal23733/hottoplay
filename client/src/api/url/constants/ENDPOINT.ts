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
} as const;
