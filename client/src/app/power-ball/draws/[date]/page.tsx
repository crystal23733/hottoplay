'use client';

import PowerBallDrawDetail from '@/power-ball/components/features/PowerBallDrawDetail/PowerBallDrawDetail';
import { useParams } from 'next/navigation';

export default function PowerBallDrawDetailPage() {
  const params = useParams();
  const date = params.date as string;
  const decodedDate = decodeURIComponent(date);

  return <PowerBallDrawDetail date={decodedDate} />;
}
