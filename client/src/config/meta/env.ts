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
    throw new Error(`${env} 환경 변수가 설정되지 않았습니다.`);
  }
});

const env: EnvConfig = {
  analytics: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
    gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  },
  siteVerification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    naver: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || '',
  },
  adsense: {
    clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
    topAdSlot: process.env.NEXT_PUBLIC_ADSENSE_TOP_AD_SLOT || '',
    bottomAdSlot: process.env.NEXT_PUBLIC_ADSENSE_BOTTOM_AD_SLOT || '',
    sideAdSlot: process.env.NEXT_PUBLIC_ADSENSE_SIDE_AD_SLOT || '',
  },
  url: {
    base: 'https://hottoplay.com',
  },
} as const;

export default env;
