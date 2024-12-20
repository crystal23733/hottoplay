'use client';

import useNoticeList from '@/hooks/Notice/Lookup/useNoticeList';
import { Card } from '@/ui/Card';
import calculatePagination from '@/utils/calculatePagination';
import formatDate from '@/utils/formatDate';
import Pagination from '../../Pagination/Pagination';
import Loading from '@/components/atoms/Loading/Loading';
import { useRouter } from 'next/navigation';

const NoticeList = () => {
  const { data, loading, error, currentPage, setCurrentPage } = useNoticeList();
  const router = useRouter();
  const totalPages = data ? calculatePagination(data.total, data.limit) : 0;

  const handleNoticeClick = (noticeId: string) => {
    router.push(`/notices/${noticeId}`);
  };

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center py-8">
          <Loading size="lg" />
        </div>
      ) : error ? (
        <Card className="p-6">
          <div className="text-center text-red-500">{error}</div>
        </Card>
      ) : !data || data.notices.length === 0 ? (
        <Card className="p-6">
          <div className="text-center text-gray-500">등록된 공지사항이 없습니다.</div>
        </Card>
      ) : (
        <>
          {/* 공지사항 목록 */}
          <div className="space-y-4">
            {data?.notices.map(notice => (
              <Card
                key={notice.id}
                className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleNoticeClick(notice.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{notice.title}</h3>
                    <div className="text-sm text-muted-foreground">
                      {notice.author} · {formatDate(notice.created_at)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default NoticeList;
