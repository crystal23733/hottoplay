import BaseFetchApi from './BaseFetchApi';

/**
 * @class FetchApi - Fetch라이브러리를 구현한 클래스
 */
export default class<T> extends BaseFetchApi<T> {
  /**
   * @constructor
   * @param {string} baseUrl - 기본 URL
   * @param {Record<string, string>} defaultHeader - 기본 헤더
   */
  constructor(
    baseUrl: string,
    defaultHeader: Record<string, string> = { 'content-type': 'application/json' }
  ) {
    super(baseUrl, defaultHeader);
  }

  /**
   * @method request - 요청 메서드
   * @param {string} endpoint - 엔드포인트
   * @param {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} method - 메서드
   * @param {object} body - 요청 본문
   * @param {object} header - 헤더
   * @param {boolean} credential - 인증 정보 포함 여부
   * @returns {Promise<T>} - 요청 결과
   */
  async request(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    body?: object,
    header?: object,
    credential?: boolean
  ): Promise<T> {
    this.abortRequest();
    const url = new URL(endpoint, this.baseUrl);

    const options: RequestInit = {
      method,
      headers: { ...this.defaultHeader, ...header },
      body: body ? JSON.stringify(body) : undefined,
      credentials: credential ? 'include' : 'same-origin',
      signal: this.controller?.signal,
    };

    try {
      const response = await fetch(url, options);
      const contentType = response.headers.get('Content-Type');
      const isJson = contentType?.includes('application/json');

      const data = isJson ? await response.json() : null;
      if (!response.ok) {
        throw new Error(data?.message || response.statusText || '요청 실패');
      }
      return data as T;
    } catch (error) {
      if (error instanceof Error && error.message === 'AbortError') {
        console.error('요청이 취소되었습니다.', error);
        throw error;
      } else {
        console.error('요청 처리 중 에러 발생', error);
        throw error;
      }
    }
  }
}
