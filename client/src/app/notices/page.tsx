'use client';

import Loading from '@/components/atoms/Loading/Loading';
import NoticeDetailTemplate from '@/components/features/Notice/NoticeDetailTemplate';
import NoticeListTemplate from '@/components/features/Notice/NoticeListTemplate';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function NoticeContent() {
  const searchParams = useSearchParams();
  const nid = searchParams.get('nid');

  return nid ? <NoticeDetailTemplate timestamp={nid} /> : <NoticeListTemplate />;
}

export default function NoticesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NoticeContent />
    </Suspense>
  );
}
