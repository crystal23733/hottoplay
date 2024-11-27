import customHook from '@/api/lib/customHook/customHook';
import fetchPopularWatch from '@/api/popularWatch/fetchPopularWatch';
import IPopular from '@/api/popularWatch/IPopular.types';
import { useEffect } from 'react';

/**
 * 가장 많이 나온 번호를 조회하는 훅  
 * @param {string} popular - 조회할 타입
 * @returns {Object} - 데이터, 로딩 상태, 에러 상태
 */
export default (popular: string) => {
  const { data, setData, loading, setLoading, error, setError } = customHook<IPopular[]>();
  useEffect(() => {
    // popular가 빈 문자열이면 API 요청을 보내지 않음
    if (popular === '') return;
    const fetchData = async () => {
      const response = await fetchPopularWatch(popular);
      setError(null);
      setLoading(false);
      try {
        setData(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('알 수 없는 에러가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [popular]);
  return { data, loading, error };
};
