import { useState } from 'react';
import { PowerBallMethod } from '../components/atoms/RadioOption/PowerBallMethodSelect.types';
import customHook from '@/api/lib/customHook/customHook';
import { PowerBallNumber } from '@/api/powerBall/powerBall.types';
import PowerBallService from '@/api/powerBall/PowerBallService';

/**
 * 파워볼 번호 생성 훅
 * 파워볼 번호 생성 요청 및 응답 처리
 */
export default () => {
  const [method, setMethod] = useState<PowerBallMethod>('random');
  const [count, setCount] = useState(1);
  const { data, loading, error, setData, setLoading, setError } = customHook<PowerBallNumber[]>();

  const powerBallService = new PowerBallService();

  const generate = async () => {
    setLoading(true);
    try {
      const response = await powerBallService.generate({ method, count });
      setData(response.numbers);
    } catch (err) {
      setError(err instanceof Error ? err.message : '번호 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return {
    method,
    setMethod,
    count,
    setCount,
    data,
    loading,
    error,
    generate,
  };
};
