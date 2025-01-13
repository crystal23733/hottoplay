'use client';

import DreamSearch from '@/components/molecules/Dream/DreamSearch/DreamSearch';
import { useState } from 'react';
import DreamList from '../DreamList/DreamList';
import { dreamData } from '@/data/dreams';

const DreamContent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <DreamSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
      <DreamList dreams={dreamData} searchTerm={searchTerm} />
    </>
  );
};

export default DreamContent;
