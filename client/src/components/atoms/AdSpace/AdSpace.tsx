import { AdSpaceProps, AD_SPACE_SIZES } from './AdSpace.types';

/**
 * 구글 애드센스 권장 크기에 맞춘 광고 공간을 표시하는 컴포넌트
 */
export const AdSpace = ({ size = 'medium-rectangle', className = '' }: AdSpaceProps) => {
  return (
    <div
      className={`
      ${AD_SPACE_SIZES[size]}
      ${className}
    `}
    />
  );
};
