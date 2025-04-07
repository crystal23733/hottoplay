'use client';

import Loading from '@/lotto/components/atoms/Loading/Loading';
import PowerBallDrawDetail from '@/power-ball/components/features/PowerBallDrawDetail/PowerBallDrawDetail';
import { Suspense } from 'react';

export default async function PowerBallDrawDetailPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const resolvedParams = await params;

  return (
    <Suspense fallback={<Loading />}>
      <DrawDetailContent date={resolvedParams.date} />
    </Suspense>
  );
}

async function DrawDetailContent({ date }: { date: string }) {
  const decodedDate = decodeURIComponent(date);

  return <PowerBallDrawDetail date={decodedDate} />;
}
