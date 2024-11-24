'use client';

import LottoNumber from '@/components/atoms/LottoNumber/LottoNumber';
import { PopularNumbersResultProps } from './PopularNumbersResult.types';

/**
 * 가장 많이 나온 로또 번호들을 빈도수별로 그룹화하여 표시하는 컴포넌트
 *
 * @component PopularNumbersResult
 * @param {Object} props - 컴포넌트 props
 * @param {PopularNumber[]} props.numbers - 번호와 빈도수 정보를 담은 배열
 * @param {string} [props.title='가장 많이 나온 번호'] - 결과 섹션의 제목
 */
const PopularNumbersResult: React.FC<PopularNumbersResultProps> = ({ numbers, title }) => {
  // 같은 빈도수를 가진 번호들을 그룹화
  const groupedNumbers = numbers.reduce<Record<number, number[]>>((acc, curr) => {
    const key = curr.frequency;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(curr.number);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-2">
        {Object.entries(groupedNumbers)
          .sort(([freqA], [freqB]) => Number(freqB) - Number(freqA))
          .map(([frequency, nums]) => (
            <div key={frequency} className="p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">{frequency}회 출현</div>
              <div className="flex flex-wrap gap-2">
                {nums
                  .sort((a, b) => a - b)
                  .map(num => (
                    <LottoNumber key={num} number={num} size="sm" />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PopularNumbersResult;
