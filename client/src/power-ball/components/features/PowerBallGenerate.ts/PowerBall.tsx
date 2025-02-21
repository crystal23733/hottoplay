'use client';

import usePowerBallGenerate from '@/power-ball/hooks/usePowerBallGenerate';
import { Card } from '@/ui/Card';
import PowerBallMethodSelect from '../../atoms/RadioOption/PowerBallMethodSelect';
import PowerBallGenerator from '../../atoms/PowerBallGenerator/PowerBallGenerator';
import { Alert, AlertDescription } from '@/ui/alert';
import { AlertCircle } from 'lucide-react';
import PowerBallResults from '../../organisms/PowerBallResults/PowerBallResults';
// import AdBanner from '@/components/atoms/AdBanner/AdBanner';

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
      {/* 상단 광고(데스크톱) */}
      {/* <div className="hidden md:block">
        <AdBanner size="leaderboard" className="mx-auto" />
      </div> */}

      {/* 상단 광고(모바일) */}
      {/* <div className="md:hidden">
        <AdBanner size="mobile-leaderboard" className="mx-auto" />
      </div> */}

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

      {/* 중간 광고 - 결과가 있을 때만 표시 */}
      {/* {data && data.length > 0 && (
        <>
          <div className="hidden md:block">
            <AdBanner size="large-rectangle" className="mx-auto" />
          </div>
          <div className="md:hidden">
            <AdBanner size="mobile-banner-two" className="mx-auto" />
          </div>
        </>
      )} */}

      {data && data.length > 0 && <PowerBallResults numbers={data} method={method} />}

      {/* 하단 광고 */}
      {/* <div className="hidden md:block">
        <AdBanner size="leaderboard" className="mx-auto" />
      </div>
      <div className="md:hidden">
        <AdBanner size="mobile-banner-two" className="mx-auto" />
      </div> */}
    </div>
  );
};

export default PowerBall;
