'use client';

import { useState } from 'react';
import { Card } from '@/ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/Select';
import { Button } from '@/ui/Button';
import NumberGrid from '@/components/organisms/NumberGrid/NumberGrid';
import LottoResult from '@/components/organisms/LottoResult/LottoResult';
import generateLottoNumbers from './utils/generateLottoNumbers';
import { GeneratedNumberSet, GenerateType } from './GenerateNumbers.types';
import GenerationMethodInfo from '@/components/molecules/GenerationMethodInfo/GenerationMethodInfo';
import StatisticsOptions from '@/components/molecules/StatisticsOptions/StatisticsOptions';
import { StatisticsType } from '@/components/molecules/StatisticsOptions/StatisticsOptions.types';
import { PatternType } from '@/components/molecules/PatternOptions/PatternOptions.types';
import PatternOptions from '@/components/molecules/PatternOptions/PatternOptions';

/**
 * 로또 번호 생성 기능을 제공하는 템플릿 컴포넌트
 * 랜덤, 유니크, 많이 나온 번호, 커스텀 생성 방식을 선택할 수 있음
 *
 * @component
 * @example
 * ```tsx
 * <GenerateNumbers />
 * ```
 */
export default function GenerateNumbers() {
  const [generateType, setGenerateType] = useState<GenerateType>('default');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [generatedNumbers, setGeneratedNumbers] = useState<GeneratedNumberSet | null>(null);
  const [statisticsType, setStatisticsType] = useState<StatisticsType>('hot');
  const [patternType, setPatternType] = useState<PatternType>('sequential');

  const handleGenerate = async () => {
    const numbers = await generateLottoNumbers(generateType, selectedNumbers);
    if (numbers.length === 6) {
      setGeneratedNumbers({
        numbers,
        type: generateType,
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">번호 생성</h2>
          <Select onValueChange={value => setGenerateType(value as GenerateType)}>
            <SelectTrigger>
              <SelectValue placeholder="생성 방식을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">랜덤 번호 생성</SelectItem>
              <SelectItem value="unique">유니크 번호 생성</SelectItem>
              <SelectItem value="many">많이 나온 번호 생성</SelectItem>
              <SelectItem value="custom">커스텀 번호 생성</SelectItem>
              <SelectItem value="statistics">통계 기반 번호 생성</SelectItem>
              <SelectItem value="pattern">패턴 기반 번호 생성</SelectItem>
            </SelectContent>
          </Select>
          {generateType && <GenerationMethodInfo type={generateType} />}

          {generateType === 'custom' && (
            <NumberGrid
              selectedNumbers={selectedNumbers}
              onNumberToggle={number => {
                setSelectedNumbers(prev =>
                  prev.includes(number)
                    ? prev.filter(n => n !== number)
                    : prev.length < 6
                      ? [...prev, number]
                      : prev
                );
              }}
              maxSelection={6}
            />
          )}

          {generateType === 'statistics' && (
            <StatisticsOptions value={statisticsType} onChange={setStatisticsType} />
          )}

          {generateType === 'pattern' && (
            <PatternOptions value={patternType} onChange={setPatternType} />
          )}

          <Button
            className="w-full"
            onClick={handleGenerate}
            disabled={generateType === 'custom' && selectedNumbers.length === 0}
          >
            번호 생성하기
          </Button>
        </div>
        {generatedNumbers && (
          <LottoResult numbers={generatedNumbers.numbers} title="생성된 번호" size="lg" />
        )}
      </div>
    </Card>
  );
}
