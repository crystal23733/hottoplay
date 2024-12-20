export default (currentPage: number, totalPages: number, delta: number = 1): number[] => {
  const range: number[] = [];
  let start = Math.max(1, currentPage - delta);
  let end = Math.min(totalPages, currentPage + delta);

  // 시작 페이지 조정
  if (currentPage <= delta + 1) {
    end = Math.min(totalPages, 2 * delta + 1);
  }

  // 끝 페이지 조정
  if (currentPage >= totalPages - delta) {
    start = Math.max(1, totalPages - 2 * delta);
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
};
