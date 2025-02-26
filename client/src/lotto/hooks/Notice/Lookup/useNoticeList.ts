import customHook from '@/api/lib/customHook/customHook';
import { NoticeListResponse } from '@/api/Notice/notice.types';
import NoticeService from '@/api/Notice/NoticeService';
import { useEffect, useState } from 'react';

/**
 * 공지사항 목록 조회 훅
 * @returns {Object} - 데이터, 로딩 상태, 에러 상태, 현재 페이지, 페이지 설정 함수
 */
export default () => {
  const { data, setData, loading, setLoading, error, setError } = customHook<NoticeListResponse>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const noticeService = new NoticeService();

  /**
   * 공지사항 목록 조회
   * @param {number} page - 페이지 번호
   */
  const fetchNoticeList = async (page: number) => {
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
  };

  useEffect(() => {
    fetchNoticeList(currentPage);
  }, [currentPage]);

  return { data, loading, error, currentPage, setCurrentPage };
};
