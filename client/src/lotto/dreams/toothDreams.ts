import DreamData from './types';
import IMAGE_PATHS from '@/lotto/constants/paths/paths';

const { TOOTH } = IMAGE_PATHS.DREAMS;

export const toothDreams: DreamData[] = [
  {
    keyword: '썩은 이빨이 빠지는 꿈',
    interpretation:
      '평소 갖고 있던 고민과 걱정이 해결되며, 어색했던 친구와 한층 더 가까워지게 되는 긍정적인 변화가 있을 것을 암시합니다. 이는 부정적인 것들이 제거되고 새로운 시작을 맞이할 수 있음을 의미합니다.',
    type: 'good',
    image: TOOTH,
  },
  {
    keyword: '건강한 이빨이 빠지는 꿈',
    interpretation:
      '어떤 결정을 할 때 신중해야 하며, 친구나 가족 등 가까운 사람과 불화가 있을 수 있음을 암시합니다. 중요한 선택이나 결정을 앞두고 있다면 더욱 신중하게 생각해볼 필요가 있습니다.',
    type: 'bad',
    image: TOOTH,
  },
  {
    keyword: '이빨이 모두 빠지는 꿈',
    interpretation:
      '큰 변화나 상실감을 나타내며, 자신의 능력에 대한 자신감 상실을 의미할 수 있습니다. 새로운 환경이나 큰 변화를 앞두고 있는 상황에서 자주 나타나는 꿈으로, 특히 스트레스 관리에 주의가 필요합니다.',
    type: 'bad',
    image: TOOTH,
  },
];
