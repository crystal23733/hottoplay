import { Button } from '@/ui/Button';
import PaginationProps from './Pagination.types';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import getPageNumbers from '@/lotto/utils/getPageNumbers';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center gap-2">
      {/* 첫 페이지로 이동 */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(1)}
        disabled={currentPage <= 1}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>

      {/* 이전 페이지 */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* 페이지 번호 버튼들 */}
      {pageNumbers.map(pageNum => (
        <Button
          key={pageNum}
          variant={currentPage === pageNum ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPageChange(pageNum)}
          className="min-w-[40px]"
        >
          {pageNum}
        </Button>
      ))}

      {/* 다음 페이지 */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* 마지막 페이지로 이동 */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage >= totalPages}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
