import DreamData from './types';
import IMAGE_PATHS from '@/lotto/constants/paths/paths';

const { DRAGON } = IMAGE_PATHS.DREAMS;

export const dragonDreams: DreamData[] = [
  {
    keyword: '용을 보는 꿈',
    interpretation:
      '큰 성취나 목표 달성의 기운이 다가오고 있음을 나타내며, 긍정적인 기회가 열릴 가능성이 높습니다.',
    type: 'good',
    image: DRAGON,
  },
  {
    keyword: '용이 하늘을 나는 꿈',
    interpretation: '인생에서 큰 성취나 성공을 상징하며, 중요한 목표를 달성할 가능성을 암시합니다.',
    type: 'good',
    image: DRAGON,
  },
  {
    keyword: '용이 집 안으로 들어오는 꿈',
    interpretation: '재물과 행운이 가정에 들어올 징조로 해석됩니다.',
    type: 'good',
    image: DRAGON,
  },
  {
    keyword: '용이 죽는 꿈',
    interpretation:
      '현재 진행 중인 일이나 계획이 실패하거나, 예상치 못한 어려움이 닥칠 수 있음을 경고합니다.',
    type: 'bad',
    image: DRAGON,
  },
];
