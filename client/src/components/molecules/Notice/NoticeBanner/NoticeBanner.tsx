import Loading from '@/components/atoms/Loading/Loading';
import useNoticeDetail from '@/hooks/Notice/Detail/useNoticeDetail';
import useNoticeList from '@/hooks/Notice/Lookup/useNoticeList';
import stripMarkdown from '@/utils/stripMarkdown';
import { Bell } from 'lucide-react';
import Link from 'next/link';

const NoticeBanner = () => {
  const { data: listData, loading: listLoading, error: listError } = useNoticeList();

  const latestTimestamp = listData?.notices[0]?.timestamp;

  const {
    data: detailData,
    loading: detailLoading,
    error: detailError,
  } = useNoticeDetail(latestTimestamp || '');

  if (listLoading || detailLoading) return <Loading />;
  if (listError || detailError || !detailData || !latestTimestamp) return null;

  const cleanContent = stripMarkdown(detailData.content);

  return (
    <Link
      href={`/notices?nid=${latestTimestamp}`}
      className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 dark:from-indigo-500/20 dark:to-blue-500/20 
        border border-blue-100 dark:border-blue-800
        shadow-sm
        px-4 py-2.5 
        flex items-center gap-2 
        text-sm 
        hover:from-indigo-500/20 hover:to-blue-500/20 
        dark:hover:from-indigo-500/30 dark:hover:to-blue-500/30
        transition-all duration-300 
        rounded-lg overflow-hidden
        backdrop-blur-sm"
    >
      <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
      <div className="overflow-hidden flex-grow">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-blue-700 dark:text-blue-300 font-medium">{cleanContent}</span>
          <span className="text-blue-700 dark:text-blue-300 font-medium ml-8">{cleanContent}</span>
        </div>
      </div>
    </Link>
  );
};

export default NoticeBanner;
