import { LottoRoundDetail } from '@/components/organisms/SearchResult/SearchResult.types';
import FetchApi from '../lib/FetchApi';
import baseUrl from '../url/constants/baseUrl';
import createUrl from '../url/createUrl';
import apiKey from '../url/constants/apiKey';

const fetchApi = new FetchApi<LottoRoundDetail>(baseUrl);

export default (round: string) => {
  const ROUND_NUMBER_ENDPOINT = process.env.NEXT_PUBLIC_ROUND_NUMBER_ENDPOINT as string;
  const URL = `${createUrl(ROUND_NUMBER_ENDPOINT)}?round=${round}`;
  const headers = {
    'X-API-KEY': apiKey,
  };
  return fetchApi.request(URL, 'GET', undefined, headers, true);
};
