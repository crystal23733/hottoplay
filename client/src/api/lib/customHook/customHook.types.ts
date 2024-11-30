/**
 * @interface ICustomHook - 커스텀 훅 인터페이스
 * @template {T} - 데이터 타입
 * @property {T | null} data - 데이터
 * @property {boolean} loading - 로딩 상태
 * @property {Error | null} error - 에러
 * @property {React.Dispatch<React.SetStateAction<T | null>>} setData - 데이터 설정 함수
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setLoading - 로딩 상태 설정 함수
 * @property {React.Dispatch<React.SetStateAction<Error | null>>} setError - 에러 설정 함수
 */
export default interface ICustomHook<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}
