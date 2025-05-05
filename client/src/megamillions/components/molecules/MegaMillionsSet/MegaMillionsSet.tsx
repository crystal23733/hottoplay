import { useToast } from '@/common/hooks/use-toast';
import MegaMillionsSetProps from './MegaMillionsSet.types';
import { Card } from '@/ui/Card';
import { Copy } from 'lucide-react';
import MegaMillionsNumber from '../../atoms/MegaMillionsNumber/MegaMillionsNumber';

/**
 * 메가밀리언스 번호 세트 컴포넌트
 * @param {MegaMillionsSetProps} props - 메가밀리언스 번호 세트 컴포넌트 속성
 * @returns {React.ReactNode} 메가밀리언스 번호 세트 컴포넌트
 * @example
 * <MegaMillionsSet whiteNumbers={[1, 2, 3, 4, 5]} mega_ball={10} setNumber={1} />
 */
const MegaMillionsSet: React.FC<MegaMillionsSetProps> = ({
  whiteNumbers,
  mega_ball,
  setNumber,
  animationDelay = 0,
}) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      const numbers = [...whiteNumbers, mega_ball].join(' - ');
      await navigator.clipboard.writeText(numbers);
      toast({
        description: 'Numbers copied to clipboard!',
      });
    } catch (error) {
      console.error('Clipboard error:', error);
      toast({
        description: 'Failed to copy numbers',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card
      className="p-4 animate-fadeIn"
      style={{ animationDelay: `${animationDelay}ms` }}
      role="article"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">Set #{setNumber}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          aria-label="Copy numbers"
        >
          <Copy className="h-3 w-3" />
          <span>Copy</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {whiteNumbers.map((number, index) => (
          <MegaMillionsNumber
            key={index}
            number={number}
            className="animate-scaleIn"
            style={{ animationDelay: `${animationDelay + (index + 1) * 100}ms` }}
          />
        ))}
        <div className="w-4 h-px bg-gray-200 mx-2" role="separator" aria-orientation="vertical" />
        <MegaMillionsNumber
          number={mega_ball}
          isMegaBall
          className="animate-scaleIn"
          style={{ animationDelay: `${animationDelay + 600}ms` }}
        />
      </div>
    </Card>
  );
};

export default MegaMillionsSet;
