import PowerBallDrawDetail from '@/power-ball/components/features/PowerBallDrawDetail/PowerBallDrawDetail';

interface PowerBallDrawDetailPageProps {
  params: Promise<{
    date: string;
  }>;
}

export default async function PowerBallDrawDetailPage({ params }: PowerBallDrawDetailPageProps) {
  const { date } = await params;
  const decodedDate = decodeURIComponent(date);
  return <PowerBallDrawDetail date={decodedDate} />;
}
