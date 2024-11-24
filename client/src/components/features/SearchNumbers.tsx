'use client';

import { useState } from 'react';
import { Card } from '@/ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/Select';
import SearchResult from '@/components/organisms/SearchResult';
import PopularNumbersResult from '@/components/organisms/PopularNumbersResult/PopularNumbersResult';

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
          <SearchResult />
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
