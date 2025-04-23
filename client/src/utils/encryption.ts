import CryptoJS from 'crypto-js';

// T 타입을 실제로 사용하여 ESLint 경고 제거
export interface EncryptedData<T> {
  isEncrypted: boolean;
  data: string;
  _type?: T; // T 타입을 참조하는 필드 추가 (실제로는 사용되지 않음)
}

/**
 * 응답이 암호화 되었는지 확인
 */
export const isEncryptedResponse = <T>(response: unknown): response is EncryptedData<T> => {
  return (
    response !== null &&
    typeof response === 'object' &&
    'isEncrypted' in response &&
    (response as EncryptedData<T>).isEncrypted === true &&
    'data' in response
  );
};

/**
 * 암호화된 데이터 복호화
 */
export const decryptData = <T>(encryptedBase64: string, key: string): T => {
  try {
    // Base64 디코딩
    const encrypted = CryptoJS.enc.Base64.parse(encryptedBase64);

    // IV는 첫 16바이트
    const iv = CryptoJS.lib.WordArray.create(encrypted.words.slice(0, 4), 16);

    // 암호문은 나머지 부분
    const ciphertext = CryptoJS.lib.WordArray.create(
      encrypted.words.slice(4),
      encrypted.sigBytes - 16
    );

    // 패딩된 키 생성 (AES-256은 32바이트 키 필요)
    const paddedKey = key.padEnd(32, ' ').slice(0, 32);
    const keyBytes = CryptoJS.enc.Utf8.parse(paddedKey);

    // 복호화 수행
    const decrypted = CryptoJS.AES.decrypt(ciphertext.toString(CryptoJS.enc.Base64), keyBytes, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // UTF-8 문자열로 변환
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    // JSON 파싱
    if (!decryptedText) {
      throw new Error('복호화된 데이터가 비어있습니다');
    }

    const result = JSON.parse(decryptedText) as T;
    return result;
  } catch (error) {
    console.error('decryptData error:', error);
    if (error instanceof Error) {
      if (error.message.includes('JSON')) {
        console.error('JSON parsing error');
      } else if (error.message.includes('malformed')) {
        console.error('UTF-8 decoding error');
      }
    }

    throw new Error('decryptData error: ' + (error instanceof Error ? error.message : String(error)));
  }
};