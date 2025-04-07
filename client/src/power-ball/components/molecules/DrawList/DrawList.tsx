import { memo } from 'react';
import DrawListItem from '../../atoms/DrawListItem/DrawListItem';
import DrawListProps from './DrawList.types';

const DrawList: React.FC<DrawListProps> = ({ draws, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse bg-muted rounded-lg h-24" />
        ))}
      </div>
    );
  }

  if (draws.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground">No drawing results found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {draws.map((draw, index) => (
        <DrawListItem key={`${draw.date}-${index}`} draw={draw} />
      ))}
    </div>
  );
};

export default memo(DrawList);
