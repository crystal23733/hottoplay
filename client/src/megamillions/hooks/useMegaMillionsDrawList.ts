import customHook from '@/api/lib/customHook/customHook';
import { DrawListRequest, DrawListResponse } from '@/api/megamillions/megaMillionsDraw.types';
import MegaMillionsDrawService from '@/api/megamillions/MegaMillionsDrawService';
import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * 파워볼 추첨 결과 목록 조회 훅
 * 페이지네이션, 검색, 필터링 기능 지원
 */
export default () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [year, setYear] = useState<number | undefined>(undefined);
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [day, setDay] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [number, setNumber] = useState<number | undefined>(undefined);

  const { data, setData, loading, setLoading, error, setError } = customHook<DrawListResponse>();

  const megaMillionsDrawService = useMemo(() => new MegaMillionsDrawService(), []);

  // 검색 파라미터 변경 및 결과 조회
  const fetchDrawList = useCallback(async () => {
    setLoading(true);
    try {
      const params: DrawListRequest = {
        page,
        page_size: pageSize,
      };

      // 검색어가 있는 경우에만 추가
      if (searchTerm) {
        params.search_term = searchTerm;
      }

      // 필터 조건이 있는 경우에만 추가
      if (year !== undefined) params.year = year;
      if (month !== undefined) params.month = month;
      if (day !== undefined) params.day = day;
      if (startDate !== undefined) params.start_date = startDate;
      if (endDate !== undefined) params.end_date = endDate;
      if (number !== undefined) params.number = number;

      const response = await megaMillionsDrawService.getDrawList(params);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터 조회 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [
    page,
    pageSize,
    searchTerm,
    year,
    month,
    day,
    startDate,
    endDate,
    number,
    megaMillionsDrawService,
    setData,
    setError,
    setLoading,
  ]);

  // 페이지 변경
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // 페이지 크기 변경
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // 페이지 크기 변경 시 첫 페이지로 이동
  };

  // 필터 초기화
  const resetFilters = () => {
    setSearchTerm('');
    setYear(undefined);
    setMonth(undefined);
    setDay(undefined);
    setStartDate(undefined);
    setEndDate(undefined);
    setNumber(undefined);
    setPage(1);
  };

  // 검색 실행
  const searchDraws = (params: Partial<DrawListRequest>) => {
    if (params.search_term !== undefined) setSearchTerm(params.search_term);
    if (params.year !== undefined) setYear(params.year);
    if (params.month !== undefined) setMonth(params.month);
    if (params.day !== undefined) setDay(params.day);
    if (params.start_date !== undefined) setStartDate(params.start_date);
    if (params.end_date !== undefined) setEndDate(params.end_date);
    if (params.number !== undefined) setNumber(params.number);
    setPage(1); // 검색 시 첫 페이지로 이동
  };

  // 날짜 범위 설정
  const setDateRange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    setYear(undefined);
    setMonth(undefined);
    setDay(undefined);
    setPage(1);
  };

  // 페이지, 페이지 사이즈, 필터 변경 시 데이터 조회
  useEffect(() => {
    fetchDrawList();
  }, [fetchDrawList]);

  return {
    data,
    loading,
    error,
    page,
    pageSize,
    searchTerm,
    year,
    month,
    day,
    startDate,
    endDate,
    number,
    handlePageChange,
    handlePageSizeChange,
    resetFilters,
    searchDraws,
    setDateRange,
    fetchDrawList,
  };
};
