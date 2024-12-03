import { useToast } from '../use-toast';
import UseCopyToClipBoardReturn from './useCopyToClipBoard.types';

/**
 * 클립보드 복사 기능을 제공하는 커스텀 훅
 * 복사 성공/실패 시 토스트 메시지를 표시
 *
 * @returns {Object} copyToClipboard - 클립보드 복사 함수
 */
export default (): UseCopyToClipBoardReturn => {
  const { toast } = useToast();

  /**
   * 텍스트를 클립보드에 복사하는 함수
   *
   * @param {string} text  - 복사할 테스트
   * @returns {Promise<void>}
   */
  const copyToClipBoard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: '복사 완료',
        description: '번호가 클립보드에 복사되었습니다.',
      });
    } catch (err) {
      toast({
        title: '복사 실패',
        description: '번호를 복사하는데 실패했습니다.',
        variant: 'destructive',
      });
    }
  };

  return { copyToClipBoard };
};
