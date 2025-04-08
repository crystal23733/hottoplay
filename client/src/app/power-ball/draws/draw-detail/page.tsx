'use client';

import Loading from '@/lotto/components/atoms/Loading/Loading';
import PowerBallDrawDetail from '@/power-ball/components/features/PowerBallDrawDetail/PowerBallDrawDetail';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function DrawDetailContent() {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');

  if (!date) {
    return <div>No date information available.</div>;
  }

  return <PowerBallDrawDetail date={date} />;
}

export default function DrawDetailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DrawDetailContent />
    </Suspense>
  );
}
