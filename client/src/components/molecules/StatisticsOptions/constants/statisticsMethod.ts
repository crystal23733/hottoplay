const STATISTICS_METHODS = {
  hot: {
    title: '상위 빈도 조합',
    description:
      '자주 당첨된 상위 20%의 번호와 중간 빈도의 번호를 조합하여 균형 잡힌 번호를 생성합니다.',
  },
  cold: {
    title: '최근 미출현 번호',
    description: '최근 50회차 동안 적게 나온 번호들을 기반으로 반전을 노리는 번호를 생성합니다.',
  },
  balanced: {
    title: '구간별 빈도 조합',
    description: '1-15, 16-30, 31-45 각 구간에서 출현 빈도를 고려하여 골고루 선택합니다.',
  },
  weighted: {
    title: '확률 가중치 기반',
    description: '전체 당첨 이력의 출현 빈도를 확률 가중치로 활용하여 번호를 생성합니다.',
  },
};

export default STATISTICS_METHODS;
