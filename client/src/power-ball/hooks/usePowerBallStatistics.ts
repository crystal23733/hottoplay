import customHook from '@/api/lib/customHook/customHook';
import { StatisticsResponse } from '@/api/powerBall/powerBall.types';
import PowerBallService from '@/api/powerBall/PowerBallService';
import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * 파워볼 통계 커스텀 훅
 * @returns 파워볼 통계 조회 및 번호 선택 기능
 */
export default () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const { data, setData, loading, setLoading, error, setError } = customHook<StatisticsResponse>();

  const powerBallService = useMemo(() => new PowerBallService(), []);

  const fetchStatistics = useCallback(async () => {
    if (selectedNumbers.length === 0) {
      setData(null);
      return;
    }

    setLoading(true);
    try {
      const response = await powerBallService.getStatistics({ numbers: selectedNumbers });
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  }, [selectedNumbers, powerBallService, setData, setError, setLoading]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchStatistics();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [fetchStatistics]);

  /**
   * 번호 선택 핸들러
   * @param number - 선택할 번호
   */
  const handleNumberSelect = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(prev => prev.filter(n => n !== number));
    } else if (selectedNumbers.length < 5) {
      setSelectedNumbers(prev => [...prev, number]);
    }
  };

  return {
    selectedNumbers,
    data,
    loading,
    error,
    handleNumberSelect,
  };
};
