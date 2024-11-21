'use client';

/**
 * 회차별 당첨번호를 표시하는 컴포넌트
 * 6개의 당첨번호와 1개의 보너스 번호를 표시
 *
 * @component
 * @example
 * ```tsx
 * <SearchResult />
 * ```
 */
export default function SearchResult() {
  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            ?
          </div>
        ))}
      </div>
    </div>
  );
}
