'use client';

import DreamSearch from '@/lotto/components/molecules/Dream/DreamSearch/DreamSearch';
import { useMemo, useState } from 'react';
import DreamList from '../DreamList/DreamList';
import { dreamData } from '@/lotto/dreams';
import calculatePagination from '@/lotto/utils/calculatePagination';
import Pagination from '@/lotto/components/molecules/Pagination/Pagination';
import { Alert, AlertDescription } from '@/ui/alert';
import { Info } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

const DreamContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 검색어로 필터링된 꿈 데이터
  const filteredDreams = useMemo(() => {
    if (!searchTerm.trim()) return dreamData;
    return dreamData.filter(dream =>
      dream.keyword.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // 현재 페이지에 표시할 꿈 데이터
  const currentDreams = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredDreams.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredDreams, currentPage]);

  // 전체 페이지 수 계산
  const totalPages = calculatePagination(filteredDreams.length, ITEMS_PER_PAGE);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <>
      <Alert className="mb-6">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          <AlertDescription className="m-0">
            ※ 꿈 해몽은 재미로만 봐주세요. 실제 현실과는 무관합니다.
          </AlertDescription>
        </div>
      </Alert>
      <DreamSearch searchTerm={searchTerm} onSearch={handleSearch} />
      <DreamList dreams={currentDreams} searchTerm={searchTerm} />
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default DreamContent;
