import customHook from '@/api/lib/customHook/customHook';
import { MegaMillionsDrawsResponse } from '@/api/megamillions/megaMillions.types';
import MegaMillionsService from '@/api/megamillions/megaMillionsService';
import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * 파워볼 추첨 결과 상세 정보 조회 훅
 * @param initialDate - 초기 조회할 날짜 (없으면 조회하지 않음)
 */
export default (initialDate?: string) => {
  const [date, setDate] = useState<string | undefined>(initialDate);
  const { data, setData, loading, setLoading, error, setError } =
    customHook<MegaMillionsDrawsResponse>();

  const megaMillionsService = useMemo(() => new MegaMillionsService(), []);

  const fetchDrawDetail = useCallback(
    async (drawDate: string) => {
      if (!drawDate) return;

      setLoading(true);
      try {
        const response = await megaMillionsService.getDrawDetail(drawDate);
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : '상세 정보 조회 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    },
    [megaMillionsService, setData, setError, setLoading]
  );

  // 날짜가 변경되면 상세 정보 조회
  useEffect(() => {
    if (date) {
      fetchDrawDetail(date);
    }
  }, [date, fetchDrawDetail]);

  return {
    data,
    loading,
    error,
    setDate,
    fetchDrawDetail,
  };
};
