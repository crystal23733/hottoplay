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
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-2">
        {numbers.map(({ numbers: number, freq }) => (
          <div key={number} className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">{freq}회 출현</div>
            <div className="flex flex-wrap gap-2">
              <LottoNumber key={number} number={number} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularNumbersResult;
