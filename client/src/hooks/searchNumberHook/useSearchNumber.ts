import customHook from '@/api/lib/customHook/customHook';
import fetchRoundNumber from '@/api/searchRound/fetchRoundNumber';
import { LottoRoundDetail } from '@/components/organisms/SearchResult/SearchResult.types';
import { useEffect } from 'react';

/**
 * @function useSearchNumber - 회차별 당첨번호 조회 훅
 * @param {string} round - 회차
 * @returns {ICustomHook<LottoRoundDetail>} - 커스텀 훅
 */
export default (round: string) => {
  const { data, setData, loading, setLoading, error, setError } = customHook<LottoRoundDetail>();
  useEffect(() => {
    // round가 빈 문자열이면 API 요청을 보내지 않음
    if (round === '') return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchRoundNumber(round);
        setData(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('알 수 없는 에러가 발생하였습니다.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [round, setData, setLoading, setError]);
  return {
    data,
    loading,
    error,
  };
};
