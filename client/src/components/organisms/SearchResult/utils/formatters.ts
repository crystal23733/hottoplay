/**
 * 숫자를 한국 화폐 단위로 포맷팅하는 함수
 *
 * @param {number} amount - 포맷팅할 금액
 * @returns {string} 포맷팅된 금액 문자열 (예: 1억 2,345만원)
 */
export default (amount: number): string => {
  const units = ['원', '만', '억', '조'];
  const digits = [0, 4, 8, 12];

  let result = '';
  let remaining = amount;

  for (let i = digits.length - 1; i >= 0; i--) {
    const unit = Math.floor(remaining / Math.pow(10, digits[i]));
    if (unit > 0) {
      result += `${unit.toLocaleString()}${units[i]} `;
      remaining %= Math.pow(10, digits[i]);
    }
  }

  return result.trim() || '0원';
};
