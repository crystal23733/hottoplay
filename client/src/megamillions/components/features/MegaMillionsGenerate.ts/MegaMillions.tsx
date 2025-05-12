'use client';

import { Card } from '@/ui/Card';
import { Alert, AlertDescription } from '@/ui/alert';
import { AlertCircle, Info } from 'lucide-react';
import MegaMillionsMethodSelect from '../../atoms/RadioOption/MegaMillionsMethodSelect';
import MegaMillionsGenerator from '../../atoms/MegaMillionsGenerator/MegaMillionsGenerator';
import MegaMillionsResults from '../../organisms/MegaMillionsResults/MegaMillionsResults';
import useMegaMillionsGenerate from '@/megamillions/hooks/useMegaMillionsGenerate';

/**
 * 메가밀리언 번호 생성 페이지
 * @returns 메가밀리언 번호 생성 페이지
 * @example
 * <MegaMillions />
 */
const MegaMillions = () => {
  const { method, setMethod, count, setCount, data, loading, error, generate } =
    useMegaMillionsGenerate();

  return (
    <div className="space-y-8">
      {/* 데이터 참고 시점 안내 */}
      <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
        <Info className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          All statistical data and number patterns are based on MegaMillions drawings since April 8,
          2025.
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Generate Method</h2>
            <MegaMillionsMethodSelect value={method} onChange={setMethod} disabled={loading} />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Generate Numbers</h2>
            <MegaMillionsGenerator
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

      {data && data.length > 0 && <MegaMillionsResults numbers={data} method={method} />}
    </div>
  );
};

export default MegaMillions;
