import DreamData from './types';
import IMAGE_PATHS from '@/lotto/constants/paths/paths';

const { SNAKE } = IMAGE_PATHS.DREAMS;

export const snakeDreams: DreamData[] = [
  {
    keyword: '뱀이 나타나는 꿈',
    interpretation:
      '꿈에서 뱀이 나타나는 것은 재물과 행운이 다가올 징조로 여겨집니다. 특히, 뱀에게 물리는 꿈은 예상치 못한 행운이나 수입이 찾아올 수 있음을 의미합니다.',
    type: 'good',
    image: SNAKE,
  },
  {
    keyword: '뱀에게 물리는 꿈(길몽인 경우)',
    interpretation:
      '뱀에게 물리는 꿈은 다른 사람의 도움을 받아 출세하거나, 미혼인 경우 결혼을 암시하기도 합니다.',
    type: 'good',
    image: SNAKE,
  },
  {
    keyword: '뱀에게 물리는 꿈(흉몽인 경우)',
    interpretation:
      '뱀에게 물린 후 기분이 좋지 않았다면, 이는 건강상의 문제나 스트레스를 암시할 수 있습니다.',
    type: 'bad',
    image: SNAKE,
  },
  {
    keyword: '뱀에게 쫓기거나 공격당하는 꿈',
    interpretation:
      '뱀에게 쫓기거나 공격당하는 꿈은 주변 사람들과의 갈등이나 다툼을 예고할 수 있습니다.',
    type: 'bad',
    image: SNAKE,
  },
];
