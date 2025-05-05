import { useState } from 'react';
import DrawSearchProps from './DrawSearch.types';
import { Filter, Search, X } from 'lucide-react';
import { Input } from '@/ui/input';
import { Button } from '@/ui/Button';
import dayjs from 'dayjs';
import { DatePicker } from '@/ui/date-picker';
import { Card, CardContent } from '@/ui/Card';

/**
 * 파워볼 추첨 결과 검색 컴포넌트
 * @param {DrawSearchProps} props - 파워볼 추첨 결과 검색 컴포넌트 속성
 * @returns {React.ReactNode} 파워볼 추첨 결과 검색 컴포넌트
 */
const DrawSearch: React.FC<DrawSearchProps> = ({ onSearch, onDateSearch, onReset }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  /**
   * 검색 제출 이벤트 핸들러
   */
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  /**
   * 날짜 선택 이벤트 핸들러
   */
  const handleDateSelect = (selectedDate: Date | null) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDate = dayjs(selectedDate).format('ddd, MMM D, YYYY');
      onDateSearch(formattedDate, formattedDate);
    }
  };

  /**
   * 날짜 범위 검색 이벤트 핸들러
   */
  const handleDateRangeSearch = () => {
    if (startDate && endDate) {
      const formattedStart = dayjs(startDate).format('ddd, MMM D, YYYY');
      const formattedEnd = dayjs(endDate).format('ddd, MMM D, YYYY');
      onDateSearch(formattedStart, formattedEnd);
    }
  };

  /**
   * 검색 초기화 이벤트 핸들러
   */
  const handleReset = () => {
    setSearchTerm('');
    setDate(null);
    setStartDate(null);
    setEndDate(null);
    onReset();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <form onSubmit={handleSearchSubmit} className="flex">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search drawing results..."
                className="pl-8 rounded-r-none"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit" className="rounded-l-none">
              Search
            </Button>
          </form>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className="flex-shrink-0"
          aria-label="Toggle filters"
        >
          <Filter className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleReset}
          className="flex-shrink-0"
          aria-label="Reset filters"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <span className="text-sm font-medium">Specific Drawing Date</span>
                <DatePicker date={date} setDate={handleDateSelect} placeholder="Select a date" />
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">Start Date</span>
                <DatePicker date={startDate} setDate={setStartDate} placeholder="From date" />
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">End Date</span>
                <DatePicker date={endDate} setDate={setEndDate} placeholder="To date" />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button onClick={handleDateRangeSearch} disabled={!startDate || !endDate}>
                Apply Date Range
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DrawSearch;
