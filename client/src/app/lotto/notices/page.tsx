'use client';

import Loading from '@/lotto/components/atoms/Loading/Loading';
import NoticeDetailTemplate from '@/lotto/components/features/Notice/NoticeDetailTemplate';
import NoticeListTemplate from '@/lotto/components/features/Notice/NoticeListTemplate';
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
