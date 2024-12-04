'use client';

import LottoNumber from '@/components/atoms/LottoNumber/LottoNumber';
import { GroupedNumbers, PopularNumbersResultProps } from './PopularNumbersResult.types';

/**
 * 가장 많이 나온 로또 번호들을 빈도수별로 그룹화하여 표시하는 컴포넌트
 *
 * @component PopularNumbersResult
 * @param {Object} props - 컴포넌트 props
 * @param {PopularNumber[]} props.numbers - 번호와 빈도수 정보를 담은 배열
 * @param {string} [props.title='가장 많이 나온 번호'] - 결과 섹션의 제목
 */
const PopularNumbersResult: React.FC<PopularNumbersResultProps> = ({ numbers, title }) => {
  // 빈도수별로 번호들을 그룹화
  const groupedNumbers = numbers.reduce<GroupedNumbers>((acc, curr) => {
    const freq = curr.freq;
    if (!acc[freq]) {
      acc[freq] = [];
    }
    acc[freq].push(curr.numbers);
    return acc;
  }, {});

  // 빈도수 내림차순으로 정렬
  const sortedFrequencies = Object.keys(groupedNumbers)
    .map((key): number => Number(key))
    .sort((a, b): number => b - a);
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-2">
        {sortedFrequencies.map((freq: number) => (
          <div key={freq} className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">{freq}회 출현</div>
            <div className="flex flex-wrap gap-2">
              {groupedNumbers[freq]
                .sort((a, b): number => a - b) // 같은 빈도수 내에서 번호 오름차순 정렬
                .map((number: number) => (
                  <LottoNumber key={number} number={number} size="sm" />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularNumbersResult;
