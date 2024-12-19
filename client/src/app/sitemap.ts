import { MetadataRoute } from 'next';

/**
 * 라우트 타입 정의
 * @type {Route}
 */
type Route = {
  path: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
};

/**
 * 사이트맵 생성
 * @returns {MetadataRoute.Sitemap} - 사이트맵 데이터
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hottoplay.com';

  // 라우트 설정 (새로운 페이지 추가 시 여기에 추가)
  const routes: Route[] = [
    {
      path: '', // 메인 페이지
      priority: 1.0,
      changeFrequency: 'daily',
    },
    // 예시: 추후 추가될 수 있는 라우트들
    // {
    //   path: '/unique',      // 유니크 번호 생성
    //   priority: 0.8,
    //   changeFrequency: 'daily',
    // },
    // {
    //   path: '/custom',      // 커스텀 번호 생성
    //   priority: 0.8,
    //   changeFrequency: 'daily',
    // },
    // {
    //   path: '/statistics',  // 통계 페이지
    //   priority: 0.7,
    //   changeFrequency: 'weekly',
    // },
  ];

  // 사이트맵 생성
  return routes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
