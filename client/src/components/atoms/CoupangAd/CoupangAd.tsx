import { COUPANG_AD_SIZES, CoupangAdProps } from './CoupangAd.types';

/**
 * 쿠팡 파트너스 광고 컴포넌트
 * @param props 쿠팡 파트너스 광고 Props
 * @returns 쿠팡 파트너스 광고 컴포넌트
 */
export const CoupangAd: React.FC<CoupangAdProps> = ({ size = 'rectangle', className }) => {
  return (
    <div className={`${COUPANG_AD_SIZES[size]} ${className}`}>
      {/* 쿠팡 파트너스 광고 스크립트가 들어갈 자리 */}
    </div>
  );
};

export default CoupangAd;
