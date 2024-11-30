import { useState } from 'react';
import ICustomHook from './customHook.types';

/**
 * @function customHook - 커스텀 훅
 * @template {T} - 데이터 타입
 * @returns {ICustomHook<T>} - 커스텀 훅 인터페이스
 */
export default <T>(): ICustomHook<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return {
    data,
    loading,
    error,
    setData,
    setLoading,
    setError,
  };
};
