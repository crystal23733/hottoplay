'use client';

import NoticeDetailTemplate from '@/components/features/Notice/NoticeDetailTemplate';
import NoticeListTemplate from '@/components/features/Notice/NoticeListTemplate';
import { useSearchParams } from 'next/navigation';

export default function NoticesPage() {
  const searchParams = useSearchParams();
  const timestamp = searchParams.get('nid');

  return timestamp ? <NoticeDetailTemplate timestamp={timestamp} /> : <NoticeListTemplate />;
}
