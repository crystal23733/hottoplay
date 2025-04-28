import { Brain, Flame, Snowflake, Zap } from 'lucide-react';
import { MegaMillionsMethodInfo } from '../MegaMillionsMethodSelect.types';

/**
 * 메가밀리언 생성 메서드 정보
 * @constant
 * @type {Array<MegaMillionsMethodInfo>}
 */
export const MEGAMILLIONS_METHODS: MegaMillionsMethodInfo[] = [
  {
    id: 'random',
    label: 'Quick Pick',
    shortDescription: 'Completely random numbers',
    description: 'This is a simple and basic random number generation method.',
    icon: Zap,
  },
  {
    id: 'hot',
    label: 'Hot Numbers',
    shortDescription: 'Most frequently drawn numbers',
    description:
      'Use numbers that have been drawn most frequently in recent MegaMillions history. This method is based on actual drawing data from the past few months, identifying numbers that appear more often than others.',
    icon: Flame,
  },
  {
    id: 'cold',
    label: 'Cold Numbers',
    shortDescription: 'Least frequently drawn numbers',
    description:
      "Select numbers that have appeared less frequently in recent drawings. Some players believe that 'cold' numbers are 'due' to be drawn soon. This strategy is based on the same historical data as Hot Numbers.",
    icon: Snowflake,
  },
  {
    id: 'unique',
    label: 'Smart Pick',
    shortDescription: 'Unique Number',
    description: 'Generated only with combinations that have never won before.',
    icon: Brain,
  },
];

/**
 * 메가밀리언 메서드 이름 맵핑
 * @constant
 * @type {Object}
 */
export const methodNameMap: Record<string, string> = {
  random: 'Quick Pick',
  hot: 'Hot Numbers',
  cold: 'Cold Numbers',
  unique: 'Unique Combination',
};
