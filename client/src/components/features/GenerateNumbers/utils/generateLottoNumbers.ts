import fetchUniqueNumber from '@/api/uniqueNumber/fetchUniqueNumber';
import { GenerateType } from '../GenerateNumbers.types';

/**
 * 선택된 생성 방식에 따라 로또 번호를 생성하는 함수
 * 현재는 default와 custom 방식만 지원
 *
 * @param {GenerateType} type - 생성 방식
 * @param {number[]} selectedNumbers - 커스텀 생성 시 선택된 번호들
 * @returns {number[]} 생성된 6개의 로또 번호
 */
export default async (type: GenerateType, selectedNumbers: number[] = []): Promise<number[]> => {
  const endpoint = process.env.NEXT_PUBLIC_LOTTO_CREATE_ENDPOINT as string;
  switch (type) {
    case 'default':
      return Array.from({ length: 45 }, (_, i) => i + 1)
        .sort(() => Math.random() - 0.5)
        .slice(0, 6)
        .sort((a, b) => a - b);

    case 'custom':
      if (selectedNumbers.length === 6) {
        return [...selectedNumbers].sort((a, b) => a - b);
      }

      const remainingCount = 6 - selectedNumbers.length;
      const availableNumbers = Array.from({ length: 45 }, (_, i) => i + 1).filter(
        n => !selectedNumbers.includes(n)
      );

      const randomNumbers = availableNumbers
        .sort(() => Math.random() - 0.5)
        .slice(0, remainingCount);

      return [...selectedNumbers, ...randomNumbers].sort((a, b) => a - b);

    case 'unique':
      const unique = {
        type: 'unique',
      };
      const uniqueNumber = await fetchUniqueNumber(endpoint, unique);
      return uniqueNumber.numbers;

    case 'many':
      const many = {
        type: 'many',
      };
      const manyNumber = await fetchUniqueNumber(endpoint, many);
      return manyNumber.numbers;

    default:
      return [];
  }
};
