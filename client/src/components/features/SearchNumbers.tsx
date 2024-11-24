'use client';

import { useState } from 'react';
import { Card } from '@/ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/Select';
import SearchResult from '@/components/organisms/SearchResult/SearchResult';
import PopularNumbersResult from '@/components/organisms/PopularNumbersResult/PopularNumbersResult';
import { LottoRoundDetail } from '../organisms/SearchResult/SearchResult.types';

type SearchType = 'round' | 'popular';

/**
 * 로또 번호 조회 기능을 제공하는 템플릿 컴포넌트
 * 회차별 당첨번호 조회와 가장 많이 나온 번호 조회 기능을 제공
 *
 * @component
 * @example
 * ```tsx
 * <SearchNumbers />
 * ```
 */
export default function SearchNumbers() {
  const [searchType, setSearchType] = useState<SearchType>('round');
  const [round, setRound] = useState<string>('');
  // 더미 데이터
  const sampleResults: LottoRoundDetail[] = [
    {
      round: 861,
      date: '2019-06-01',
      numbers: [11, 17, 19, 21, 22, 25],
      bonus: 24,
      totalSales: 81032551000,
      firstPrize: 4872108844,
      firstWinnerCount: 4,
      firstAccumulated: 19488435376,
    },
    {
      round: 860,
      date: '2019-05-25',
      numbers: [1, 4, 10, 12, 28, 45],
      bonus: 15,
      totalSales: 78025470000,
      firstPrize: 2578650615,
      firstWinnerCount: 7,
      firstAccumulated: 18050554305,
    },
    {
      round: 859,
      date: '2019-05-18',
      numbers: [5, 7, 13, 20, 21, 44],
      bonus: 33,
      totalSales: 82145600000,
      firstPrize: 3752486585,
      firstWinnerCount: 5,
      firstAccumulated: 18762432925,
    },
  ];

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">번호 조회</h2>
          <Select onValueChange={value => setSearchType(value as SearchType)}>
            <SelectTrigger>
              <SelectValue placeholder="조회 방식을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="round">회차별 당첨번호 조회</SelectItem>
              <SelectItem value="popular">가장 많이 나온 번호 조회</SelectItem>
            </SelectContent>
          </Select>

          {searchType === 'round' && (
            <Select onValueChange={setRound}>
              <SelectTrigger>
                <SelectValue placeholder="회차를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 1000 }, (_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    {i + 1}회차
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {searchType === 'round' ? (
          <SearchResult title="회차별 당첨 번호" results={sampleResults} />
        ) : (
          <PopularNumbersResult
            numbers={[
              // 여기에 API에서 받아온 데이터를 넣습니다
              // 예시 데이터
              { number: 1, frequency: 10 },
              { number: 2, frequency: 10 },
              { number: 3, frequency: 8 },
              // ...
            ]}
            title="가장 많이 나온 번호"
          />
        )}
      </div>
    </Card>
  );
}
