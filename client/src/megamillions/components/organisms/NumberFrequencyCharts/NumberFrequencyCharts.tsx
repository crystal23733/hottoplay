'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/Card';
import FrequencyChart from '../../molecules/FrequencyChart/FrequencyChart';
import { memo } from 'react';
import NumberFrequencyChartsProps from './NumberFrequencyCharts.types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/Tabs';

/**
 * 번호 빈도 차트 컴포넌트
 * 흰공과 메가밀리언 빈도를 각각 차트로 표시
 * @param {NumberFrequencyChartsProps} props - 차트 속성
 * @returns {React.ReactNode} 번호 빈도 차트
 */
const NumberFrequencyCharts: React.FC<NumberFrequencyChartsProps> = ({ data, loading, error }) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Number Frequency Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Number Frequency Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-destructive">
            An error occurred while loading the data.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Number Frequency Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="white" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="white">White Balls</TabsTrigger>
            <TabsTrigger value="mega">Mega Balls</TabsTrigger>
          </TabsList>
          <TabsContent value="white">
            <FrequencyChart
              data={data.white_balls}
              title="MegaMillions White Ball Number Frequencies"
              color="#3b82f6" // 파란색
              label="MegaMillions White Ball Appearances"
              height={2000}
            />
          </TabsContent>
          <TabsContent value="mega">
            <FrequencyChart
              data={data.mega_balls}
              title="MegaMillions Mega Ball Number Frequencies"
              color="#fed111" // 노란
              label="MegaMillions Mega Ball Appearances"
              height={1000}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default memo(NumberFrequencyCharts);
