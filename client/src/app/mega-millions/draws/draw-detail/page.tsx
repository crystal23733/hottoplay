'use client';

import Loading from '@/lotto/components/atoms/Loading/Loading';
import MegaMillionsDrawDetail from '@/megamillions/components/features/MegaMillionsDrawDetail/MegaMillionsDrawDetail';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function DrawDetailContent() {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');

  if (!date) {
    return <div>No date information available.</div>;
  }

  return <MegaMillionsDrawDetail date={date} />;
}

export default function DrawDetailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DrawDetailContent />
    </Suspense>
  );
}
