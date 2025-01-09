'use client';

import { Card } from '@/ui/Card';
import DreamCardProps from './DreamCard.types';
import DreamTag from '@/components/atoms/Dream/DreamTag/DreamTag';

const DreamCard: React.FC<DreamCardProps> = ({ keyword, interpretation, type }) => {
  return (
    <Card className="p-6 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{keyword}</h3>
        <DreamTag type={type} />
      </div>
      <p className="text-muted-foreground">{interpretation}</p>
    </Card>
  );
};

export default DreamCard;
