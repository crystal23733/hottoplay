import fetchRoundNumber from '@/api/searchRound/fetchRoundNumber';
import { LottoRoundDetail } from '@/components/organisms/SearchResult/SearchResult.types';
import { useEffect, useState } from 'react';

export default (round: string) => {
  const [data, setData] = useState<LottoRoundDetail>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchRoundNumber(round);
      try {
        setData(response);
        console.log(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };
    fetchData();
  }, [round]);
  return {
    data,
  };
};
