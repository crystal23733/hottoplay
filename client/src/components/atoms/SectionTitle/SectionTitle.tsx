import SectionTitleProps from './SectionTitle.types';

/**
 * 섹션 타이틀
 * @param {string} children - 자식 요소
 * @param {string} className - 클래스 이름
 */
const SectionTitle: React.FC<SectionTitleProps> = ({ children, className }) => {
  return (
    <h2 className={`text-3xl font-bold text-gray-800 dark:text-gray-100 ${className}`}>
      {children}
    </h2>
  );
};

export default SectionTitle;
