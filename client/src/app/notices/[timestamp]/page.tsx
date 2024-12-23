'use client';

import NoticeDetailTemplate from '@/components/features/Notice/NoticeDetailTemplate';
import { useParams } from 'next/navigation';

export default function NoticeDetailPage() {
  const params = useParams();
  return <NoticeDetailTemplate timestamp={params.timestamp as string} />;
}
