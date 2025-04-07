'use client';

import usePowerBallGenerate from '@/power-ball/hooks/usePowerBallGenerate';
import { Card } from '@/ui/Card';
import PowerBallMethodSelect from '../../atoms/RadioOption/PowerBallMethodSelect';
import PowerBallGenerator from '../../atoms/PowerBallGenerator/PowerBallGenerator';
import { Alert, AlertDescription } from '@/ui/alert';
import { AlertCircle, Info } from 'lucide-react';
import PowerBallResults from '../../organisms/PowerBallResults/PowerBallResults';

/**
 * 파워볼 번호 생성 페이지
 * @returns 파워볼 번호 생성 페이지
 * @example
 * <PowerBall />
 */
const PowerBall = () => {
  const { method, setMethod, count, setCount, data, loading, error, generate } =
    usePowerBallGenerate();

  return (
    <div className="space-y-8">
      {/* 데이터 참고 시점 안내 */}
      <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
        <Info className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          All statistical data and number patterns are based on Powerball drawings since October 7,
          2015.
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Generate Method</h2>
            <PowerBallMethodSelect value={method} onChange={setMethod} disabled={loading} />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Generate Numbers</h2>
            <PowerBallGenerator
              count={count}
              onCountChange={setCount}
              onGenerate={generate}
              isLoading={loading}
            />
          </div>
        </div>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {data && data.length > 0 && <PowerBallResults numbers={data} method={method} />}
    </div>
  );
};

export default PowerBall;
