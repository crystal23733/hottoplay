import customHook from '@/api/lib/customHook/customHook';
import { NumberFrequencyResponse } from '@/api/megamillions/megaMillionsDraw.types';
import MegaMillionsDrawService from '@/api/megamillions/megaMillionsDrawService';
import { useCallback, useEffect, useMemo } from 'react';

/**
 * 파워볼 번호 빈도 조회 훅
 * 자동으로 마운트 시 번호 빈도 정보를 가져옴
 */
export default () => {
  const { data, setData, loading, setLoading, error, setError } =
    customHook<NumberFrequencyResponse>();

  const megaMillionsDrawService = useMemo(() => new MegaMillionsDrawService(), []);

  const fetchNumberFrequency = useCallback(async () => {
    setLoading(true);
    try {
      const response = await megaMillionsDrawService.getNumberFrequency();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : '번호 빈도 조회 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [megaMillionsDrawService, setData, setError, setLoading]);

  useEffect(() => {
    fetchNumberFrequency();
  }, [fetchNumberFrequency]);

  return {
    data,
    loading,
    error,
    refreshFrequency: fetchNumberFrequency,
  };
};
