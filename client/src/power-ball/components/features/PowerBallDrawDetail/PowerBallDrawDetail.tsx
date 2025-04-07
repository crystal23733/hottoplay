'use client';

import usePowerBallDrawDetail from '@/power-ball/hooks/usePowerBallDrawDetail';
import PowerBallDrawDetailProps from './PowerBallDrawDetail.types';
import { useToast } from '@/common/hooks/use-toast';
import { useEffect } from 'react';
import { Button } from '@/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/Card';
import PowerBallNumber from '../../atoms/PowerBallNumber/PowerBallNumber';
import PrizeBreakdownTable from '../../molecules/PrizeBreakdownTable/PrizeBreakdownTable';

/**
 * 파워볼 추첨 결과 상세 페이지 컴포넌트
 * @param {PowerBallDrawDetailProps} props - 파워볼 추첨 결과 상세 페이지 컴포넌트 속성
 * @param {string} props.date - 추첨 날짜
 * @returns {React.ReactNode} 파워볼 추첨 결과 상세 페이지 컴포넌트
 */
const PowerBallDrawDetail: React.FC<PowerBallDrawDetailProps> = ({ date }) => {
  const { data, loading, error } = usePowerBallDrawDetail(date);
  const { toast } = useToast();

  /**
   * 오류 처리
   */
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  /**
   * 로딩 상태
   */
  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
          <div className="h-[300px] bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  /**
   * 데이터가 없는 경우
   */
  if (!data) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="text-center py-12">
          <h2 className="text-xl font-medium">Drawing result not found</h2>
          <p className="text-muted-foreground mt-2">
            We couldn&apos;t find the drawing result for {date}
          </p>
          <Button asChild className="mt-4">
            <Link href="/power-ball/draws">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Drawing Results
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/power-ball/draws">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Drawing Results
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Powerball Result: {data.date}</h1>
        <p className="text-muted-foreground">Power Play: {data.power_play}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Winning Numbers</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap items-center gap-4 justify-center p-2">
              {data.white_numbers.map((number, index) => (
                <PowerBallNumber
                  key={index}
                  number={parseInt(number)}
                  isPowerball={false}
                  className="md:w-16 md:h-16"
                />
              ))}
              <div
                className="w-8 h-px bg-gray-200 mx-2 md:mx-4"
                role="separator"
                aria-orientation="vertical"
              />
              <PowerBallNumber
                number={parseInt(data.powerball)}
                isPowerball={true}
                className="md:w-16 md:h-16"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jackpot Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.estimated_jackpot && (
                <div>
                  <span className="font-medium">Estimated Jackpot:</span>{' '}
                  <span className="text-primary font-bold">{data.estimated_jackpot}</span>
                </div>
              )}

              {data.cash_value && (
                <div>
                  <span className="font-medium">Cash Value:</span> <span>{data.cash_value}</span>
                </div>
              )}

              <div>
                <span className="font-medium">Jackpot Winners:</span>{' '}
                <span>{data.jackpot_winners_location || 'None'}</span>
              </div>

              <div>
                <span className="font-medium">Match 5 + Power Play Winners:</span>{' '}
                <span>{data.match5_pp_winners_location || 'None'}</span>
              </div>

              <div>
                <span className="font-medium">Match 5 Winners:</span>{' '}
                <span>{data.match5_winners_location || 'None'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {data.prize_breakdown && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Prize Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <PrizeBreakdownTable prizeBreakdown={data.prize_breakdown} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PowerBallDrawDetail;
