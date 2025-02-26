import PowerBall from '@/power-ball/components/features/PowerBallGenerate.ts/PowerBall';

export default function PowerBallPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Powerball Number Generator</h1>
        <p className="text-muted-foreground">
          Generate your Powerball numbers using different strategies. Choose your preferred method
          and get your lucky numbers!
        </p>
      </div>

      <PowerBall />
    </div>
  );
}
