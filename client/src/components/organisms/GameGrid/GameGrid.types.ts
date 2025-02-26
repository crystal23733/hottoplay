import Game from '../../../types/game';

/**
 * 게임 그리드 인터페이스
 * @property {Game[]} games - 게임 목록
 */
export default interface GameGridProps {
  games: Game[];
}
