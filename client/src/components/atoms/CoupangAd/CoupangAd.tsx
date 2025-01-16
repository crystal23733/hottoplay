import { COUPANG_AD_SIZES, CoupangAdProps } from './CoupangAd.types';

export const CoupangAd: React.FC<CoupangAdProps> = ({ size = 'rectangle', className }) => {
  return (
    <div className={`${COUPANG_AD_SIZES[size]} ${className}`}>
      {/* 쿠팡 파트너스 광고 스크립트가 들어갈 자리 */}
    </div>
  );
};
