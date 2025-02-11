'use client';

import { Card } from '@/ui/Card';
import DreamSearchProps from './DreamSearch.types';
import DreamSearchInput from '@/lotto/components/atoms/Dream/DreamSearchInput/DreamSearchInput';

const DreamSearch: React.FC<DreamSearchProps> = ({ searchTerm, onSearch }) => {
  return (
    <Card className="p-6 mb-6">
      <DreamSearchInput value={searchTerm} onChange={onSearch} />
    </Card>
  );
};

export default DreamSearch;
