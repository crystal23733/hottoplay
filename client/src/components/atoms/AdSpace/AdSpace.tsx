import { AdSpaceProps, AD_SPACE_SIZES } from './AdSpace.types';

/**
 * 구글 애드센스 권장 크기에 맞춘 광고 공간을 표시하는 컴포넌트
 */
export const AdSpace = ({ label, size = 'medium-rectangle', className = '' }: AdSpaceProps) => {
  return (
    <div
      className={`
      bg-muted rounded-lg
      ${AD_SPACE_SIZES[size]}
      ${className}
    `}
    >
      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
        {label}
      </div>
    </div>
  );
};