/**
 * 생성된 로또 번호 6개를 표시하는 컴포넌트
 * 번호가 생성되기 전에는 물음표로 표시됨
 *
 * @component
 * @example
 * ```tsx
 * <LottoResult />
 * ```
 */
export default function LottoResult() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">생성된 번호</h3>
      <div className="flex justify-center gap-4">
        {/* 번호가 생성되면 여기에 표시됩니다 */}
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
