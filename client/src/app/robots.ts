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
        allow: ['/', '/lotto', '/lotto/notices', '/lotto/content/dream', '/sitemap.xml'],
        disallow: ['https://api.hottoplay.com/*'],
        // 크롤러의 과도한 요청 방지
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://hottoplay.com/sitemap.xml',
    host: 'https://hottoplay.com',
  };
}
