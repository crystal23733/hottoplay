import FetchApi from '../lib/fetch/FetchApi';
import apiKey from '../url/constants/apiKey';
import baseUrl from '../url/constants/baseUrl';
import createUrl from '../url/createUrl';
import IPopular from './IPopular.types';

const fetchApi = new FetchApi<IPopular[]>(baseUrl);

/**
 * 가장 많이 나온 번호들을 조회하는 함수
 * @param {string} popular - 선택 옵션
 * @returns {Promise<{Numbers: number, Freq: number}[]>} 가장 많이 나온 번호들
 */
export default (popular: string) => {
  const PopularUrl = process.env.NEXT_PUBLIC_POPULAR_WATCH_ENDPOINT as string;
  const URL = `${createUrl(PopularUrl)}?popular=${popular}`;
  const headers = {
    'X-API-KEY': apiKey,
  };
  return fetchApi.request(URL, 'GET', undefined, headers, true);
};
