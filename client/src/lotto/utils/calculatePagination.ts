/**
 * 페이지 계산
 * @param total 총 데이터 수
 * @param limit 페이지당 데이터 수
 * @returns 페이지 수
 */
export default (total: number, limit: number): number => {
  if (limit <= 0) return 0;
  return Math.ceil(total / limit);
};
