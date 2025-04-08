import customHook from '@/api/lib/customHook/customHook';
import { NoticeListResponse } from '@/api/Notice/notice.types';
import NoticeService from '@/api/Notice/NoticeService';
import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * 공지사항 목록 조회 훅
 * @returns {Object} - 데이터, 로딩 상태, 에러 상태, 현재 페이지, 페이지 설정 함수
 */
export default () => {
  const { data, setData, loading, setLoading, error, setError } = customHook<NoticeListResponse>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  // useMemo로 서비스 객체 생성을 메모이제이션
  const noticeService = useMemo(() => new NoticeService(), []);

  const fetchNoticeList = useCallback(
    async (page: number) => {
      setLoading(true);
      await noticeService
        .getList(page)
        .then(response => {
          setData(response);
          setError(null);
        })
        .catch(error => {
          if (error instanceof Error) {
            setError(error.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setData, setError, setLoading, noticeService]
  );

  useEffect(() => {
    fetchNoticeList(currentPage);
  }, [currentPage, fetchNoticeList]);

  return { data, loading, error, currentPage, setCurrentPage };
};
