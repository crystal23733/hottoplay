import { AD_SIZES } from '@/constants/AD_SIZES';
import AdBannerProps from './AdBanner.types';

const AdBanner: React.FC<AdBannerProps> = ({ size, className }) => {
  // 구글 애드센스 승인 후 활성화
  // useEffect(() => {
  //   try {
  //     // 타입스크립트 에러 방지를 위한 전역 변수 선언
  //     declare global {
  //       interface Window {
  //         adsbygoogle: any[];
  //       }
  //     }
  //
  //     (window.adsbygoogle = window.adsbygoogle || []).push({});
  //   } catch (err) {
  //     console.error('Ad load error:', err);
  //   }
  // }, []);

  return (
    <div
      className={`bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center ${AD_SIZES[size]} ${className}`}
    >
      {/* 구글 애드센스 승인 전 임시 표시 */}
      <span className="text-gray-400 dark:text-gray-500 text-sm">Advertisement</span>

      {/* 구글 애드센스 승인 후 활성화 
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_CLIENT_ID"
        data-ad-slot="YOUR_AD_SLOT"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      */}
    </div>
  );
};

export default AdBanner;
