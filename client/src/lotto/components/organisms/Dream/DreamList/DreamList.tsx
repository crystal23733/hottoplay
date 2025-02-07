'use client';

import DreamCard from '@/lotto/components/molecules/Dream/DreamCard/DreamCard';
import DreamListProps from './DreamList.types';

const DreamList: React.FC<DreamListProps> = ({ dreams, searchTerm }) => {
  const filteredDreams = dreams.filter(dream =>
    dream.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid gap-4">
      {filteredDreams.map((dream, index) => (
        <DreamCard
          key={index}
          keyword={dream.keyword}
          interpretation={dream.interpretation}
          type={dream.type}
          image={dream.image}
        />
      ))}
    </div>
  );
};

export default DreamList;
