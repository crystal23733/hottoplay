import { Label } from "@/ui/label";
import PowerBallGeneratorProps from "./PowerBallGenerator.types";
import { Input } from "@/ui/input";
import { Button } from "@/ui/Button";
import { Info, Loader2 } from "lucide-react";

/**
 * 파워볼 번호 생성기 컴포넌트
 * @param {PowerBallGeneratorProps} props - 파워볼 번호 생성기 컴포넌트 속성
 * @returns {React.ReactNode} 파워볼 번호 생성기 컴포넌트
 * @example
 * <PowerBallGenerator count={5} onCountChange={() => {}} onGenerate={() => {}} isLoading={false} disabled={false} />
 */
const PowerBallGenerator:React.FC<PowerBallGeneratorProps> = ({
  count,
  onCountChange,
  onGenerate,
  isLoading,
  disabled,
}) => {
  const handleCountChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;
    // 1-5 사이의 값만 허용
    const clampedValue = Math.max(1, Math.min(10, value));
    onCountChange(clampedValue);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="w-full md:w-48">
          <Label htmlFor="ticket-count" className="text-sm font-medium">
            Number of Sets
          </Label>
          <div className="mt-1.5">
            <Input
              id="ticket-count"
              type="number"
              min={1}
              max={5}
              value={count}
              onChange={handleCountChange}
              className="w-full"
              disabled={disabled || isLoading}
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Generate up to 5 sets at once
          </p>
        </div>

        <Button size="lg" className="w-full md:w-auto md:px-8" onClick={onGenerate} disabled={disabled || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              Generate Numbers
            </>
          )}
        </Button>
      </div>

      <div className="flex items-start gap-2 text-sm text-muted-foreground">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p>
          This is a free number generator for entertainment purposes only. 
          The numbers are generated based on your selected method. 
          Good luck with your picks!
        </p>
      </div>
    </div>
  );
}

export default PowerBallGenerator;