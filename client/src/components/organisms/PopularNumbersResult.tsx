'use client';

/**
 * 가장 많이 나온 로또 번호들을 빈도수별로 그룹화하여 표시하는 컴포넌트
 *
 * @component
 * @param {Object} props
 * @param {Array<PopularNumber>} props.numbers - 번호와 빈도수 정보를 담은 배열
 *
 * @example
 * ```tsx
 * <PopularNumbersResult numbers={[{ number: 1, frequency: 10 }, { number: 2, frequency: 8 }]} />
 * ```
 */
interface PopularNumber {
  number: number;
  frequency: number;
}

interface PopularNumbersResultProps {
  numbers: PopularNumber[];
}

export default function PopularNumbersResult({ numbers }: PopularNumbersResultProps) {
  // 같은 빈도수를 가진 번호들을 그룹화
  const groupedNumbers = numbers.reduce(
    (acc, curr) => {
      const key = curr.frequency;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr.number);
      return acc;
    },
    {} as Record<number, number[]>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">가장 많이 나온 번호</h3>
      <div className="space-y-2">
        {Object.entries(groupedNumbers)
          .sort(([freqA], [freqB]) => Number(freqB) - Number(freqA))
          .map(([frequency, nums]) => (
            <div key={frequency} className="p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">{frequency}회 출현</div>
              <div className="flex flex-wrap gap-2">
                {nums
                  .sort((a, b) => a - b)
                  .map(num => (
                    <div
                      key={num}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm"
                    >
                      {num}
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
