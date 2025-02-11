'use client';

import GameCard from '@/components/molecules/GameCard/GameCard';
import GameGridProps from './GameGrid.types';

/**
 * 게임 그리드
 * @param {GameCardProps[]} games - 게임 목록
 */
const GameGrid: React.FC<GameGridProps> = ({ games }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {games.map(game => (
        <GameCard key={game.href} {...game} />
      ))}
    </div>
  );
};

export default GameGrid;
