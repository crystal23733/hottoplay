import DreamData from '@/data/dreams/types';
import { pigDreams } from './pigDreams';
import { celebrityDreams } from './celebrityDreams';
import { politicianDreams } from './politicianDreams';
import { snakeDreams } from './snakeDreams';
import { toothDreams } from './toothDreams';

export const dreamData: DreamData[] = [
  ...pigDreams,
  ...celebrityDreams,
  ...politicianDreams,
  ...snakeDreams,
  ...toothDreams,
];

// 개별 export도 제공
export { pigDreams, celebrityDreams, politicianDreams, snakeDreams, toothDreams };
