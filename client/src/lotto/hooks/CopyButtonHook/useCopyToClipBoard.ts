import { useToast } from '../../../common/hooks/use-toast';
import { TOAST_MESSAGES, TOAST_VARIANTS } from './constants/toast';
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
        variant: TOAST_VARIANTS.SUCCESS,
        title: TOAST_MESSAGES.COPY.SUCCESS.TITLE,
        description: TOAST_MESSAGES.COPY.SUCCESS.DESCRIPTION(text),
        duration: TOAST_MESSAGES.DURATION,
      });
    } catch {
      toast({
        variant: TOAST_VARIANTS.ERROR,
        title: TOAST_MESSAGES.COPY.ERROR.TITLE,
        description: TOAST_MESSAGES.COPY.ERROR.DESCRIPTION,
        duration: TOAST_MESSAGES.DURATION,
      });
    }
  };

  return { copyToClipBoard };
};
