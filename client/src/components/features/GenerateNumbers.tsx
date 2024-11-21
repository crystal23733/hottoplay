'use client';

import { useState } from 'react';
import { Card } from '@/ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/Select';
import { Button } from '@/ui/Button';
import NumberGrid from '@/components/organisms/NumberGrid';
import LottoResult from '@/components/organisms/LottoResult';

type GenerateType = 'default' | 'unique' | 'many' | 'custom';

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
            </SelectContent>
          </Select>

          {generateType === 'custom' && (
            <NumberGrid
              selectedNumbers={selectedNumbers}
              onNumberToggle={number => {
                setSelectedNumbers(prev =>
                  prev.includes(number) ? prev.filter(n => n !== number) : [...prev, number]
                );
              }}
            />
          )}

          <Button className="w-full">번호 생성하기</Button>
        </div>
        <LottoResult />
      </div>
    </Card>
  );
}
