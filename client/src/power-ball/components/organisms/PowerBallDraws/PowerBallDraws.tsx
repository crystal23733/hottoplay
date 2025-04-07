'use client';

import { useToast } from '@/common/hooks/use-toast';
import usePowerBallDrawList from '@/power-ball/hooks/usePowerBallDrawList';
import { useEffect } from 'react';
import DrawList from '../../molecules/DrawList/DrawList';
import DrawPagination from '../../molecules/DrawPaigination/DrawPagination';
import DrawSearch from '../../molecules/DrawSearch/DrawSearch';

/**
 * 파워볼 추첨 결과 목록 페이지 컴포넌트
 * @returns {React.ReactNode} 파워볼 추첨 결과 목록 페이지
 */
const PowerBallDraws = () => {
  const {
    data,
    loading,
    error,
    page,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    resetFilters,
    searchDraws,
    setDateRange,
  } = usePowerBallDrawList();

  const { toast } = useToast();

  /**
   * 오류 처리
   */
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  /**
   * 총 페이지 수 계산
   */
  const totalPages = data ? Math.ceil(data.total_count / data.page_size) : 0;

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Powerball Drawing Results</h1>
        <p className="text-muted-foreground">
          View all Powerball drawing results and jackpot information.
        </p>
      </div>

      <div className="mb-6">
        <DrawSearch
          onSearch={term => searchDraws({ search_term: term })}
          onDateSearch={(start, end) => setDateRange(start, end)}
          onReset={resetFilters}
        />
      </div>

      <div className="space-y-6">
        <DrawList draws={data?.draws || []} loading={loading} />

        {data && (
          <DrawPagination
            currentPage={page}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            totalResults={data.total_count}
          />
        )}
      </div>
    </div>
  );
};

export default PowerBallDraws;
