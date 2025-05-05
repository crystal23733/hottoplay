import { useState } from 'react';
import customHook from '@/api/lib/customHook/customHook';
import { MegaMillionsMethod } from '../components/atoms/RadioOption/MegaMillionsMethodSelect.types';
import { MegaMillionsNumber } from '@/api/megamillions/megaMillions.types';
import MegaMillionsService from '@/api/megamillions/megaMillionsService';

/**
 * 메가밀리언스 번호 생성 훅
 * 메가밀리언스 번호 생성 요청 및 응답 처리
 */
export default () => {
  const [method, setMethod] = useState<MegaMillionsMethod>('random');
  const [count, setCount] = useState(1);
  const { data, loading, error, setData, setLoading, setError } =
    customHook<MegaMillionsNumber[]>();

  const megaMillionsService = new MegaMillionsService();

  const generate = async () => {
    setLoading(true);
    try {
      const response = await megaMillionsService.generate({ method, count });
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
