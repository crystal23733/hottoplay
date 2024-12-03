/**
 * 로또 번호 생성 방식별 설명 정보
 * @constant
 * @type {Record<string, { title: string; description: string }>}
 */
export default {
  default: {
    title: '랜덤 번호 생성',
    description: '무작위 번호를 생성합니다.',
  },
  unique: {
    title: '유니크 번호 생성',
    description: '과거에 당첨된 적이 없는 새로운 조합의 번호를 생성합니다.',
  },
  many: {
    title: '많이 나온 번호 생성',
    description: '역대 당첨 번호 중 가장 많이 등장한 번호들을 기반으로 조합을 생성합니다.',
  },
  custom: {
    title: '커스텀 번호 생성',
    description: '선택하신 번호들을 포함하여 나머지 번호를 무작위로 생성합니다.',
  },
} as const;
