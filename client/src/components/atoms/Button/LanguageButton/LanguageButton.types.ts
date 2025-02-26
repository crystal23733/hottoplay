import { Language } from '../../../../types/language';

export default interface LanguageButtonProps {
  currentLanguage: Language;
  onClick: () => void;
}
