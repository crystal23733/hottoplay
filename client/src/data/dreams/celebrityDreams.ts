import DreamData from './types';
import IMAGE_PATHS from '@/constants/paths/paths';

const { CELEBRITY } = IMAGE_PATHS.DREAMS;

export const celebrityDreams: DreamData[] = [
  {
    keyword: '유명인을 만나는 꿈',
    interpretation:
      '성공과 명예를 상징하며, 현재 도전하고 있는 일이 긍정적인 결과로 이어질 수 있음을 암시합니다. 특히 재물운과 성공운이 상승하는 시기가 될 수 있습니다.',
    type: 'good',
    image: CELEBRITY,
  },
  {
    keyword: '자신이 유명인이 되는 꿈',
    interpretation:
      '자신의 숨겨진 잠재력을 발휘하고자 하는 욕구를 나타냅니다. 현재 준비하고 있는 일이나 계획에서 좋은 성과를 거둘 수 있는 시기입니다.',
    type: 'good',
    image: CELEBRITY,
  },
  {
    keyword: '존경하는 유명인과 대화하는 꿈',
    interpretation:
      '동경하는 인물의 특징을 자신의 삶에서 실현하고자 하는 의지를 나타냅니다. 이는 개인적 성장과 발전의 좋은 기회가 될 수 있으며, 특히 재물운과 연관이 있습니다.',
    type: 'good',
    image: CELEBRITY,
  },
];
