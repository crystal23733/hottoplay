import DreamData from './types';
import IMAGE_PATHS from '@/constants/paths/paths';

const { POLITICIAN } = IMAGE_PATHS.DREAMS;

export const politicianDreams: DreamData[] = [
  {
    keyword: '정치인이 등장하는 꿈',
    interpretation:
      '정치인이 등장하는 꿈은 사회적 책임감과 리더십에 대한 자신의 역할을 반영합니다. 이는 중요한 결정을 내려야 할 시기임을 암시할 수 있습니다.',
    type: 'good',
    image: POLITICIAN,
  },
  {
    keyword: '정치인과 대화하는 꿈',
    interpretation:
      '꿈에서 정치인과의 대화나 만남은 인생의 중요한 선택이나 변화를 상징합니다. 이는 새로운 기회를 잡을 준비가 되었음을 나타낼 수도 있습니다.',
    type: 'good',
    image: POLITICIAN,
  },
  {
    keyword: '정치인을 존경하거나 친근하게 대하는 꿈',
    interpretation:
      '정치인을 존경하거나 친근하게 대하는 꿈은 자신의 사회적 지위나 영향력을 강화하고자 하는 열망을 나타냅니다.',
    type: 'good',
    image: POLITICIAN,
  },
];
