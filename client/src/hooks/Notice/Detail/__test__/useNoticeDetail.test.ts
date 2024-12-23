import { renderHook, waitFor } from '@testing-library/react';
import useNoticeDetail from '../useNoticeDetail';
import NoticeService from '@/api/Notice/NoticeService';

// NoticeService 모킹
jest.mock('@/api/Notice/NoticeService');

const mockNotice = {
  id: '1',
  title: '테스트 공지',
  content: '테스트 내용',
  author: '관리자',
  created_at: '2024-01-01T00:00:00Z',
};

describe('useNoticeDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('성공적으로 공지사항을 불러와야 합니다', async () => {
    (NoticeService.prototype.getDetail as jest.Mock).mockResolvedValueOnce(mockNotice);

    const { result } = renderHook(() => useNoticeDetail('1234567890'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockNotice);
    expect(result.current.error).toBeNull();
  });

  it('에러를 처리할 수 있어야 합니다', async () => {
    const error = new Error('Failed to fetch');
    (NoticeService.prototype.getDetail as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useNoticeDetail('1234567890'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Failed to fetch');
  });
});
