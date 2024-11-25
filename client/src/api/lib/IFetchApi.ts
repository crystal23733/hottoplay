/**
 * @interface IFetchApi - Fetch라이브러리를 정의하는 인터페이스
 */
export default interface IFetchApi<T> {
  /**
   * @param {string}endpoint - 엔드포인트
   * @param {string}method - HTTP 메서드
   * @param {object}body - 요청 본문
   * @param {object}header - 헤더
   * @param {boolean}credential - 인증 정보 포함 여부
   * @returns {Promise<T>} - 요청 결과
   */
  request(
    endpoint: string,
    method: string,
    body?: object,
    header?: object,
    credential?: boolean
  ): Promise<T>;
  abortRequest(): void;
}
