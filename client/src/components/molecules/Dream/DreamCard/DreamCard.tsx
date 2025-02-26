'use client';

import { Card } from '@/ui/Card';
import DreamCardProps from './DreamCard.types';
import DreamTag from '@/components/atoms/Dream/DreamTag/DreamTag';
import Image from 'next/image';

const DreamCard: React.FC<DreamCardProps> = ({ keyword, interpretation, type, image }) => {
  return (
    <Card className="p-6 hover:shadow-md transition-all">
      <div className="flex gap-6">
        {/* 이미지 영역 */}
        <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={keyword}
            fill
            priority={image.includes('SD_gold_pig')}
            className="object-cover"
            sizes="(max-width:768px) 128px, 128px"
          />
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{keyword}</h3>
          <DreamTag type={type} />
        </div>
        <p className="text-muted-foreground">{interpretation}</p>
      </div>
    </Card>
  );
};

export default DreamCard;
