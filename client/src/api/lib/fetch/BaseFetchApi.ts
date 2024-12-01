import IFetchApi from './IFetchApi';

/**
 * @abstract class BaseFetchApi - Fetch라이브러리를 구현하는 추상 클래스
 */
export default abstract class<T> implements IFetchApi<T> {
  protected baseUrl: string;
  protected defaultHeader: Record<string, string>;
  protected controller?: AbortController;
  /**
   * @constructor
   * @param {string} baseUrl - 기본 URL
   * @param {Record<string, string>} defaultHeader - 기본 헤더
   */
  constructor(baseUrl: string, defaultHeader: Record<string, string>) {
    this.baseUrl = baseUrl;
    this.defaultHeader = defaultHeader;
  }

  /**
   * 요청 취소 기능
   */
  abortRequest(): void {
    if (this.controller) {
      this.controller.abort();
      this.controller = undefined;
    }
  }

  /**
   * 구체적인 구현은 상속받는 클래스에서 처리
   */
  abstract request(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    body?: object,
    header?: object,
    credential?: boolean
  ): Promise<T>;
}
