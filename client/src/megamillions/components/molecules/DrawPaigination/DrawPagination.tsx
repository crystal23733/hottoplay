'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/Select';
import DrawPaginationProps from './DrawPagination.types';
import { Button } from '@/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { memo } from 'react';

/**
 * 파워볼 추첨 결과 페이지네이션 컴포넌트
 * @param {DrawPaginationProps} props - 파워볼 추첨 결과 페이지네이션 컴포넌트 속성
 * @returns {React.ReactNode} 파워볼 추첨 결과 페이지네이션 컴포넌트
 */
const DrawPagination: React.FC<DrawPaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  totalResults,
}) => {
  const pageSizeOptions = [10, 20, 50];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-sm text-muted-foreground">
        Showing {Math.min((currentPage - 1) * pageSize + 1, totalResults)} -{' '}
        {Math.min(currentPage * pageSize, totalResults)} of {totalResults} results
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <Select
            value={pageSize.toString()}
            onValueChange={value => onPageSizeChange(parseInt(value))}
          >
            <SelectTrigger className="h-8 w-[80px]">
              <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map(option => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="ml-1 text-sm text-muted-foreground">per page</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="text-sm">
            Page {currentPage} of {Math.max(1, totalPages)}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(DrawPagination);
