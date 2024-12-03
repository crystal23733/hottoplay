export const TOAST_MESSAGES = {
  COPY: {
    SUCCESS: {
      TITLE: '✨ 복사 완료!',
      DESCRIPTION: (numbers: string) => `${numbers} 번호가 클립보드에 복사되었습니다.`,
    },
    ERROR: {
      TITLE: '❌ 복사 실패',
      DESCRIPTION: '번호를 복사하는데 실패했습니다.',
    },
  },
  DURATION: 2000,
} as const;

export const TOAST_VARIANTS = {
  SUCCESS: 'success',
  ERROR: 'destructive',
} as const;
