'use client';

import LottoNumber from '@/components/atoms/LottoNumber/LottoNumber';
import { SearchResultProps } from './SearchResult.types';
import formatters from './utils/formatters';

/**
 * 회차별 로또 당첨 정보를 상세하게 표시하는 컴포넌트
 *
 * @component SearchResult
 * @param {Object} props - 컴포넌트 props
 * @param {LottoRoundDetail[]} props.results - 검색된 회차별 상세 결과 배열
 * @param {string} [props.title='회차별 당첨 번호'] - 결과 섹션의 제목
 *
 */
const SearchResult: React.FC<SearchResultProps> = ({ results, title }) => {
  if (results.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">검색 결과가 없습니다.</div>;
  }
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-6">
        {results.map(
          ({
            drwNo,
            drwNoDate,
            numbers,
            bnusNo,
            totSellamnt,
            firstAccumamnt,
            firstPrzwnerCo,
            firstWinamnt,
          }) => (
            <div key={drwNo} className="border rounded-lg overflow-hidden">
              {/* 회차 정보 */}
              <div className="bg-muted p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg">{drwNo}회</span>
                  <span className="text-muted-foreground">{drwNoDate}</span>
                </div>
              </div>

              {/* 당첨 번호 */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    {numbers.map(num => (
                      <LottoNumber key={num} number={num} size="md" />
                    ))}
                  </div>
                  <span className="text-muted-foreground">+</span>
                  <LottoNumber number={bnusNo} size="md" />
                </div>
              </div>

              {/* 당첨금 정보 */}
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">총 판매금액</div>
                    <div className="font-medium">{formatters(totSellamnt)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">1등 총 당첨금액</div>
                    <div className="font-medium">{formatters(firstAccumamnt)}</div>
                  </div>
                </div>

                {/* 1등 당첨 정보 */}
                <div className="p-3 bg-muted/50 rounded">
                  <div className="text-sm font-medium mb-1">1등 당첨 현황</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">당첨금: </span>
                      <span className="font-medium">{formatters(firstPrzwnerCo)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">당첨자: </span>
                      <span className="font-medium">{firstWinamnt.toLocaleString()}명</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchResult;
