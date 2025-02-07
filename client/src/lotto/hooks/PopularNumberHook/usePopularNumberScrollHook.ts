import { PopularNumber } from '@/lotto/components/organisms/PopularNumbersResult/PopularNumbersResult.types';
import { useCallback, useRef, useState } from 'react';

/**
 * 인기 번호 무한 스크롤 커스텀 훅
 * @param allNumbers - 전체 번호 배열
 * @param initialCount - 초기에 보여줄 아이템 수
 * @param incrementCount - 추가로 보여줄 아이템 수
 */
export default (
  allNumbers: PopularNumber[],
  initialCount: number = 10,
  incrementCount: number = 10
) => {
  const [displayCount, setDisplayCount] = useState<number>(initialCount);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // 현재 보여줄 번호들
  const visibleNumbers = allNumbers.slice(0, displayCount);

  // Intersection Observer 콜백
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore) {
        const newCount = displayCount + incrementCount;
        setDisplayCount(newCount);
        setHasMore(newCount < allNumbers.length);
      }
    },
    [displayCount, hasMore, allNumbers.length, incrementCount]
  );

  // ref 설정 콜백
  const setLastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      if (node && hasMore) {
        observer.current = new IntersectionObserver(handleObserver, {
          root: null,
          rootMargin: '20px',
          threshold: 1.0,
        });
        observer.current.observe(node);
      }
    },
    [handleObserver, hasMore]
  );

  return {
    visibleNumbers,
    hasMore,
    setLastElementRef,
  };
};
