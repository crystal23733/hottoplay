import PowerBallStatistics from '@/power-ball/components/features/PowerBallStatistics/PowerBallStatistics';

export default function PowerBallStatisticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Powerball Number Statistics</h1>
        <p className="text-muted-foreground">
          Analyze historical Powerball numbers since October 7, 2015. Select numbers to see their
          frequency, patterns, and last appearance dates.
        </p>
      </div>

      <PowerBallStatistics />
    </div>
  );
}
