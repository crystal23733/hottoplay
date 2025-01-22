/**
 * 연속된 숫자 패턴 생성
 * @returns 연속된 숫자 패턴
 */
export const generateSequentialPattern = (): number[] => {
  const startNum = Math.floor(Math.random() * 43) + 1;
  const sequential = [startNum, startNum + 1, startNum + 2];

  const remaining = Array.from({ length: 45 }, (_, i) => i + 1).filter(
    n => !sequential.includes(n)
  );

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * remaining.length);
    sequential.push(remaining[randomIndex]);
    remaining.splice(randomIndex, 1);
  }

  return sequential.sort((a, b) => a - b);
};

/**
 * 홀수와 짝수 패턴 생성
 * @returns 홀수와 짝수 패턴
 */
export const generateOddEvenPattern = (): number[] => {
  const odds: number[] = [];
  const evens: number[] = [];

  while (odds.length < 3 || evens.length < 3) {
    const num = Math.floor(Math.random() * 45) + 1;
    if (num % 2 === 0 && evens.length < 3 && !evens.includes(num)) {
      evens.push(num);
    } else if (num % 2 === 1 && odds.length < 3 && !odds.includes(num)) {
      odds.push(num);
    }
  }

  return [...odds, ...evens].sort((a, b) => a - b);
};

/**
 * 구간별 분배 패턴 생성
 * @returns 구간별 분배 패턴
 */
export const generateDistributedPattern = (): number[] => {
  const result: number[] = [];
  const ranges = [
    [1, 15],
    [16, 30],
    [31, 45],
  ];

  ranges.forEach(([min, max]) => {
    while (result.filter(n => n >= min && n <= max).length < 2) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!result.includes(num)) {
        result.push(num);
      }
    }
  });

  return result.sort((a, b) => a - b);
};
