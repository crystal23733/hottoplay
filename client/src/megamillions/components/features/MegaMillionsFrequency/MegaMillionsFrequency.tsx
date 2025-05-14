'use client';

import { useToast } from '@/common/hooks/use-toast';
import { Button } from '@/ui/Button';
import { RefreshCw } from 'lucide-react';
import { useEffect } from 'react';
import NumberFrequencyCharts from '../../organisms/NumberFrequencyCharts/NumberFrequencyCharts';
import useMegaMillionsNumberFrequency from '@/megamillions/hooks/useMegaMillionsNumberFrequency';

/**
 * 메가밀리언스 번호 빈도 분석 페이지 컴포넌트
 * @returns {React.ReactNode} 메가밀리언스 번호 빈도 분석 페이지
 */
const MegaMillionsFrequency = () => {
  const { data, loading, error, refreshFrequency } = useMegaMillionsNumberFrequency();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: 'Data loading error',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  const handleRefresh = () => {
    refreshFrequency();
    toast({
      description: 'Refreshing number frequency data...',
    });
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">MegaMillions Number Frequency</h1>
        <p className="text-muted-foreground">
          Check the frequency of MegaMillions numbers based on historical drawing data.
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={loading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      <NumberFrequencyCharts data={data} loading={loading} error={error} />
    </div>
  );
};

export default MegaMillionsFrequency;
