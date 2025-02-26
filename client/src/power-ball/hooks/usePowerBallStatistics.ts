import customHook from '@/api/lib/customHook/customHook';
import { StatisticsResponse } from '@/api/powerBall/powerBall.types';
import PowerBallService from '@/api/powerBall/PowerBallService';
import { useEffect, useState } from 'react';

/**
 * 파워볼 통계 커스텀 훅
 * @returns 파워볼 통계 조회 및 번호 선택 기능
 */
export default () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const { data, setData, loading, setLoading, error, setError } = customHook<StatisticsResponse>();

  const powerBallService = new PowerBallService();

  useEffect(() => {
    const fetchStatistics = async () => {
      // 선택된 번호가 없으면 API 호출하지 않음
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
    };

    // 디바운스 처리 (너무 빈번한 API 호출 방지)
    const timeoutId = setTimeout(() => {
      fetchStatistics();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [selectedNumbers]); // selectedNumbers가 변경될 때마다 실행

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
