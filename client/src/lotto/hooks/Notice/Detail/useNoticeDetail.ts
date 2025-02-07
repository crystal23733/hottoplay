import customHook from '@/api/lib/customHook/customHook';
import { NoticeDetailResponse } from '@/api/Notice/notice.types';
import NoticeService from '@/api/Notice/NoticeService';
import { useEffect } from 'react';

export default (timestamp: string) => {
  const { data, loading, error, setData, setLoading, setError } =
    customHook<NoticeDetailResponse>();

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      setLoading(true);
      const noticeService = new NoticeService();
      await noticeService
        .getDetail(timestamp)
        .then(response => {
          setData(response);
          setError(null);
        })
        .catch(error => {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('알 수 없는 오류가 발생했습니다.');
          }
        })
        .finally(() => setLoading(false));
    };
    fetchNoticeDetail();
  }, [timestamp]);

  return { data, loading, error };
};
