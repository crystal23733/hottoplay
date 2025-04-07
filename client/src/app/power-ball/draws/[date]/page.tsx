'use client';

import Loading from '@/lotto/components/atoms/Loading/Loading';
import PowerBallDrawDetail from '@/power-ball/components/features/PowerBallDrawDetail/PowerBallDrawDetail';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';

function DrawDetailContent() {
  const params = useParams();
  const date = params.date as string;
  const decodedDate = decodeURIComponent(date);

  return <PowerBallDrawDetail date={decodedDate} />;
}

export default function PowerBallDrawDetailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DrawDetailContent />
    </Suspense>
  );
}
