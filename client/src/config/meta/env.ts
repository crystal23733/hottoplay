interface EnvConfig {
  analytics: {
    gtmId: string;
    gaId: string;
  };
  siteVerification: {
    google: string;
    naver: string;
  };
  adsense: {
    clientId: string;
    topAdSlot: string;
    bottomAdSlot: string;
    sideAdSlot: string;
  };
  url: {
    base: string;
  };
}

// 환경 변수 유효성 검사 (선택적)
const optionalEnvs = [
  'NEXT_PUBLIC_GTM_ID',
  'NEXT_PUBLIC_GA_ID',
  'NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION',
  'NEXT_PUBLIC_NAVER_SITE_VERIFICATION',
  'NEXT_PUBLIC_ADSENSE_CLIENT_ID',
  'NEXT_PUBLIC_ADSENSE_TOP_AD_SLOT',
  'NEXT_PUBLIC_ADSENSE_BOTTOM_AD_SLOT',
  'NEXT_PUBLIC_ADSENSE_SIDE_AD_SLOT',
] as const;

// 개발 환경에서만 환경 변수 경고 표시
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  optionalEnvs.forEach(env => {
    if (!process.env[env]) {
      console.warn(`⚠️  ${env} 환경 변수가 설정되지 않았습니다.`);
    }
  });
}

const env: EnvConfig = {
  analytics: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-PLACEHOLDER',
    gaId: process.env.NEXT_PUBLIC_GA_ID || 'G-PLACEHOLDER',
  },
  siteVerification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'placeholder-verification',
    naver: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || 'placeholder-verification',
  },
  adsense: {
    clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-placeholder',
    topAdSlot: process.env.NEXT_PUBLIC_ADSENSE_TOP_AD_SLOT || '0000000000',
    bottomAdSlot: process.env.NEXT_PUBLIC_ADSENSE_BOTTOM_AD_SLOT || '0000000000',
    sideAdSlot: process.env.NEXT_PUBLIC_ADSENSE_SIDE_AD_SLOT || '0000000000',
  },
  url: {
    base: process.env.NEXT_PUBLIC_BASE_URL || 'https://hottoplay.com',
  },
} as const;

export default env;
