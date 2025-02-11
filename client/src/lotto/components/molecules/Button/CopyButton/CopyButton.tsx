import { Button } from '@/ui/Button';
import CopyButtonProps from './CopyButton.types';
import { CopyIcon } from 'lucide-react';

/**
 * 복사 기능을 가진 버튼 컴포넌트
 *
 * @component
 * @param {Object} props - 컴포넌트 props
 * @param {() => void} props.onClick - 클릭 핸들러 함수
 * @param {string} [props.className] - 추가 스타일 클래스
 */
const CopyButton: React.FC<CopyButtonProps> = ({ onClick, className }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={`flex items-center gap-2 ${className}`}
    >
      <CopyIcon className="h-4 w-4" />
    </Button>
  );
};

export default CopyButton;
