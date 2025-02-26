import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    ko: {
      common: {
        notice: {
          backToList: '목록으로',
          loading: '로딩 중...',
          notFound: '공지사항을 찾을 수 없습니다.',
          error: '오류가 발생했습니다.',
        },
      },
    },
    en: {
      common: {
        notice: {
          backToList: 'Back to List',
          loading: 'Loading...',
          notFound: 'Notice not found.',
          error: 'An error occurred.',
        },
      },
    },
  },
  lng: 'ko', // 기본 언어
  fallbackLng: 'ko',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
