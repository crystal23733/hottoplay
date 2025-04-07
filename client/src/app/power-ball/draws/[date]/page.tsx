import PowerBallDrawDetail from '@/power-ball/components/features/PowerBallDrawDetail/PowerBallDrawDetail';

interface PowerBallDrawDetailPageProps {
  params: {
    date: string;
  };
}

export default function PowerBallDrawDetailPage({ params }: PowerBallDrawDetailPageProps) {
  const decodedDate = decodeURIComponent(params.date);
  return <PowerBallDrawDetail date={decodedDate} />;
}
