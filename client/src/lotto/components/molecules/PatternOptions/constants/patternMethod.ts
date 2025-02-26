const PATTERN_METHODS = {
  sequential: {
    title: '연속 번호 포함',
    description: '3개의 연속된 번호를 포함하고, 나머지는 랜덤하게 생성합니다.',
  },
  oddEven: {
    title: '홀짝 균형 조합',
    description: '홀수와 짝수를 3:3 비율로 선택하여 균형 잡힌 번호 조합을 생성합니다.',
  },
  distributed: {
    title: '구간별 안배 조합',
    description: '1-15, 16-30, 31-45 각 구간에서 2개씩 선택하여 고르게 분포된 번호를 생성합니다.',
  },
};

export default PATTERN_METHODS;
