import customHook from '@/api/lib/customHook/customHook';
import PowerBallDrawService from '@/api/powerBall/PowerBallDrawService';
import { NumberFrequencyResponse } from '@/api/powerBall/powerBallDraw.types';
import { useEffect } from 'react';

/**
 * 파워볼 번호 빈도 조회 훅
 * 자동으로 마운트 시 번호 빈도 정보를 가져옴
 */
export default () => {
  const { data, setData, loading, setLoading, error, setError } =
    customHook<NumberFrequencyResponse>();

  const powerBallDrawService = new PowerBallDrawService();

  const fetchNumberFrequency = async () => {
    setLoading(true);
    try {
      const response = await powerBallDrawService.getNumberFrequency();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : '번호 빈도 조회 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 한 번만 호출
  useEffect(() => {
    fetchNumberFrequency();
  }, []);

  return {
    data,
    loading,
    error,
    refreshFrequency: fetchNumberFrequency,
  };
};
