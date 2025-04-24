import BaseFetchApi from './BaseFetchApi';
import { isEncryptedResponse, decryptData } from '@/utils/encryption';

/**
 * @class FetchApi - Fetch라이브러리를 구현한 클래스
 */
export default class<T> extends BaseFetchApi<T> {
  private encryptionKey: string;

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
    this.encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '';
  }

  /**
   * @method request - 요청 메서드
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

      if (!response.ok) {
        const errorData = isJson ? await response.json() : null;
        throw new Error(errorData?.message || response.statusText || '요청 실패');
      }

      // 응답이 JSON이 아니면
      if (!isJson) {
        return (await response.text()) as unknown as T;
      }

      // JSON 응답 파싱
      const data = await response.json();

      // 암호화된 응답인지 확인하고 복호화 (isEncrypted 필드로만 체크)
      if (isEncryptedResponse(data)) {
        return await decryptData<T>(data.data, this.encryptionKey);
      }

      return data as T;
    } catch (error) {
      console.error('요청 처리 중 에러 발생:', error);
      throw error;
    }
  }
}
