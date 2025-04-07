'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import dayjs from 'dayjs';

import { cn } from '@/lib/utils';
import { Button } from '@/ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';

interface DatePickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function DatePicker({
  date,
  setDate,
  placeholder = 'Select date',
  label,
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  // Format date as Mon, Mar 31, 2025
  const formatDisplayDate = (date: Date): string => {
    return dayjs(date).format('ddd, MMM D, YYYY');
  };

  /**
   * 날짜가 변경될 때 입력 값 업데이트
   */
  React.useEffect(() => {
    if (date) {
      setInputValue(formatDisplayDate(date));
    } else {
      setInputValue('');
    }
  }, [date]);

  /**
   * 직접 입력 이벤트 핸들러
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    /**
     * 날짜 파싱
     */
    if (value) {
      const parsed = dayjs(value);
      if (parsed.isValid()) {
        setDate(parsed.toDate());
      }
    } else {
      setDate(null);
    }
  };

  /**
   * 월 이동 버튼 이벤트 핸들러
   */
  const handlePrevMonth = () => {
    if (date) {
      setDate(dayjs(date).subtract(1, 'month').toDate());
    } else {
      setDate(dayjs().subtract(1, 'month').toDate());
    }
  };

  const handleNextMonth = () => {
    if (date) {
      setDate(dayjs(date).add(1, 'month').toDate());
    } else {
      setDate(dayjs().add(1, 'month').toDate());
    }
  };

  /**
   * 년도 이동 버튼 이벤트 핸들러
   */
  const handlePrevYear = () => {
    if (date) {
      setDate(dayjs(date).subtract(1, 'year').toDate());
    } else {
      setDate(dayjs().subtract(1, 'year').toDate());
    }
  };

  const handleNextYear = () => {
    if (date) {
      setDate(dayjs(date).add(1, 'year').toDate());
    } else {
      setDate(dayjs().add(1, 'year').toDate());
    }
  };

  /**
   * 캘린더 컴포넌트
   */
  const Calendar = () => {
    const currentMonth = date ? dayjs(date) : dayjs();
    const daysInMonth = currentMonth.daysInMonth();
    const firstDayOfMonth = currentMonth.startOf('month').day(); // 0 for Sunday, 1 for Monday, etc.

    const days = [];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    /**
     * 주 요일 헤더 추가
     */
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={`weekday-${i}`}
          className="text-center text-xs font-medium text-muted-foreground py-1"
        >
          {weekDays[i]}
        </div>
      );
    }

    /**
     * 첫 번째 날짜 이전의 빈 셀 추가
     */
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    /**
     * 월의 날짜 추가
     */
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = currentMonth.date(day);
      const isSelected = date && dayjs(date).format('YYYY-MM-DD') === dayDate.format('YYYY-MM-DD');
      const isToday = dayjs().format('YYYY-MM-DD') === dayDate.format('YYYY-MM-DD');

      days.push(
        <Button
          key={`day-${day}`}
          type="button"
          variant={isSelected ? 'default' : 'ghost'}
          className={cn(
            'h-8 w-8 p-0 font-normal rounded-full text-sm',
            isSelected && 'bg-primary text-primary-foreground hover:bg-primary/90',
            isToday && !isSelected && 'border border-primary text-primary'
          )}
          onClick={() => {
            setDate(dayDate.toDate());
            setIsOpen(false);
          }}
        >
          {day}
        </Button>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={handlePrevYear}
            >
              {'<<'}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={handlePrevMonth}
            >
              {'<'}
            </Button>
          </div>
          <div className="font-medium text-sm">{currentMonth.format('MMMM YYYY')}</div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={handleNextMonth}
            >
              {'>'}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={handleNextYear}
            >
              {'>>'}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setDate(null);
              setInputValue('');
              setIsOpen(false);
            }}
          >
            Clear
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const today = new Date();
              setDate(today);
              setIsOpen(false);
            }}
          >
            Today
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={className}>
      {label && <Label className="block mb-2 text-sm font-medium">{label}</Label>}
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          className="w-full pr-10"
        />
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="start">
            <Calendar />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
