import GameBadgeProps from './GameBadge.types';

/**
 * 게임 뱃지
 * @param {string} language - 언어
 */
const GameBadge: React.FC<GameBadgeProps> = ({ language }) => {
  return (
    <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
      {language}
    </div>
  );
};

export default GameBadge;
