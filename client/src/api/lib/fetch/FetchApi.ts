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

      if (!response.ok) {
        throw new Error(response.statusText || '요청 실패');
      }

      // 응답 본문이 없는 경우
      if (response.status === 204) {
        return {} as T;
      }

      const contentType = response.headers.get('content-type');

      // JSON 응답인 경우
      if (contentType?.includes('application/json')) {
        const data = await response.json();
        return data as T;
      }

      // 텍스트 응답인 경우
      const text = await response.text();

      // 텍스트가 JSON 형식인지 확인
      try {
        return JSON.parse(text) as T;
      } catch {
        // Notice API의 경우 텍스트 응답을 적절한 형태로 변환
        if (endpoint.includes('/notice')) {
          return {
            content: text || '',
            // 다른 필요한 필드들도 기본값으로 설정
            id: 0,
            title: '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as T;
        }
        return text as unknown as T;
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('요청이 취소되었습니다.', error);
        throw error;
      } else {
        console.error('요청 처리 중 에러 발생', error);
        throw error;
      }
    }
  }
}
