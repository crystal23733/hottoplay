import NoticeService from '@/api/Notice/NoticeService';
import CLIENT_URL from '@/api/url/constants/CLIENT_URL';
import ENDPOINT from '@/api/url/constants/ENDPOINT';
import { MetadataRoute } from 'next';

export default async (): Promise<MetadataRoute.Sitemap> => {
  const noticeService = new NoticeService();
  try {
    const response = await noticeService.getList(1, 100);
    return response.notices.map(notice => ({
      url: `${CLIENT_URL}/lotto${ENDPOINT.NOTICES}?nid=${notice.timestamp}`,
      lastModified: new Date(notice.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('공지사항 목록 조회 실패', error);
    return [];
  }
};
