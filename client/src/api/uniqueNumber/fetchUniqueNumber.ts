import FetchApi from '../lib/fetch/FetchApi';
import apiKey from '../url/constants/apiKey';
import baseUrl from '../url/constants/baseUrl';
import createUrl from '../url/createUrl';
import UniqueNumber from './uniqueNumber.types';

const fetchApi = new FetchApi<UniqueNumber>(baseUrl);

/**
 * 고유 번호 생성 API
 * @param {string} endpoint
 * @param {object} body
 * @returns {Promise<UniqueNumber>}
 */
export default (endpoint: string, body: object) => {
  const URL = createUrl(endpoint);
  const headers = {
    'X-API-KEY': apiKey,
  };
  return fetchApi.request(URL, 'POST', body, headers, true);
};
