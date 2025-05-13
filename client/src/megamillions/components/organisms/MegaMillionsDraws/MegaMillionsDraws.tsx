'use client';

import { useToast } from '@/common/hooks/use-toast';
import { useEffect } from 'react';
import DrawList from '../../molecules/DrawList/DrawList';
import DrawPagination from '../../molecules/DrawPaigination/DrawPagination';
import DrawSearch from '../../molecules/DrawSearch/DrawSearch';
import useMegaMillionsDrawList from '@/megamillions/hooks/useMegaMillionsDrawList';

/**
 * 메가밀리언스 추첨 결과 목록 페이지 컴포넌트
 * @returns {React.ReactNode} 메가밀리언스 추첨 결과 목록 페이지
 */
const MegaMillionsDraws = () => {
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
  } = useMegaMillionsDrawList();

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
        <h1 className="text-3xl font-bold mb-2">MegaMillions Drawing Results</h1>
        <p className="text-muted-foreground">
          View all MegaMillions drawing results and jackpot information.
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

export default MegaMillionsDraws;
