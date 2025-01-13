'use client';

import { Search } from 'lucide-react';
import DreamSearchInputProps from './DreamSearchInput.types';
import { Input } from '@/ui/input';

const DreamSearchInput: React.FC<DreamSearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="꿈 키워드를 입력하세요 (예: 돼지)"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="pl-10"
        aria-label="꿈 키워드 검색"
      />
    </div>
  );
};

export default DreamSearchInput;
