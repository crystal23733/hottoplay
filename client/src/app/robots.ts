import { MetadataRoute } from 'next';

/**
 * 로봇.txt 생성
 * @returns {MetadataRoute.Robots} - 로봇.txt 데이터
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // 특정 경로 차단이 필요한 경우
        // disallow: ['/admin/', '/private/']
      },
    ],
    sitemap: 'https://hottoplay.com/sitemap.xml',
    host: 'https://hottoplay.com',
  };
}
