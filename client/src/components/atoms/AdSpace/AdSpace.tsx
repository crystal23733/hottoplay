import { AdSpaceProps, AD_SPACE_HEIGHTS } from './AdSpace.types';

/**
 * 기본 광고 공간을 표시하는 컴포넌트
 */
export const AdSpace = ({ label, height = 'md', className = '' }: AdSpaceProps) => {
  return (
    <div
      className={`
      bg-muted rounded-lg
      ${AD_SPACE_HEIGHTS[height]}
      ${className}
    `}
    >
      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
        {label}
      </div>
    </div>
  );
};
