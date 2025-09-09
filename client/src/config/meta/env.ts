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

// 환경 변수 유효성 검사
const requiredEnvs = [
  'NEXT_PUBLIC_GTM_ID',
  'NEXT_PUBLIC_GA_ID',
  'NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION',
  'NEXT_PUBLIC_NAVER_SITE_VERIFICATION',
  'NEXT_PUBLIC_ADSENSE_CLIENT_ID',
  'NEXT_PUBLIC_ADSENSE_TOP_AD_SLOT',
  'NEXT_PUBLIC_ADSENSE_BOTTOM_AD_SLOT',
  'NEXT_PUBLIC_ADSENSE_SIDE_AD_SLOT',
] as const;

// 누락된 환경 변수 체크
requiredEnvs.forEach(env => {
  if (!process.env[env]) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`${env} 환경 변수가 설정되지 않았습니다.`);
    } else {
      console.warn(
        `⚠️  ${env} 환경 변수가 설정되지 않았습니다. 개발 환경에서는 기본값을 사용합니다.`
      );
    }
  }
});

const env: EnvConfig = {
  analytics: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-DEV',
    gaId: process.env.NEXT_PUBLIC_GA_ID || 'G-DEV',
  },
  siteVerification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'dev-verification',
    naver: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || 'dev-verification',
  },
  adsense: {
    clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-7408626546715060',
    topAdSlot: process.env.NEXT_PUBLIC_ADSENSE_TOP_AD_SLOT || '9600184389',
    bottomAdSlot: process.env.NEXT_PUBLIC_ADSENSE_BOTTOM_AD_SLOT || '3477629163',
    sideAdSlot: process.env.NEXT_PUBLIC_ADSENSE_SIDE_AD_SLOT || '6287625334',
  },
  url: {
    base: process.env.NODE_ENV === 'production' ? 'https://hottoplay.com' : 'http://localhost:3000',
  },
} as const;

export default env;
