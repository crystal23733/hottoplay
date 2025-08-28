import CLIENT_URL from '@/api/url/constants/CLIENT_URL';
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
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = CLIENT_URL;

  // 라우트 설정 (새로운 페이지 추가 시 여기에 추가)
  const routes: Route[] = [
    {
      path: '', // 메인 페이지
      priority: 1.0,
      changeFrequency: 'daily',
    },
    {
      path: '/lotto',
      priority: 0.8,
      changeFrequency: 'daily',
    },
    {
      path: '/lotto/content/dream',
      priority: 0.8,
      changeFrequency: 'daily',
    },
    {
      path: '/power-ball',
      priority: 0.8,
      changeFrequency: 'daily',
    },
    {
      path: '/power-ball/statistics',
      priority: 0.8,
      changeFrequency: 'daily',
    },
    {
      path: '/power-ball/draws',
      priority: 0.8,
      changeFrequency: 'daily',
    },
    {
      path: '/power-ball/frequency',
      priority: 0.8,
      changeFrequency: 'daily',
    },
  ];

  // 기본 사이트맵 생성
  const staticPaths = routes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...staticPaths];
}
