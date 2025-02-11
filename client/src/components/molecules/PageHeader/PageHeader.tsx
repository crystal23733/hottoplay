import PageHeaderProps from './PageHeader.types';
import { headerTexts } from '@/constants/texts';

const PageHeader: React.FC<PageHeaderProps> = ({ language }) => {
  return (
    <div className="text-center mb-8 sm:mb-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 dark:from-blue-400 dark:via-purple-400 dark:to-violet-400 text-transparent bg-clip-text">
        {headerTexts[language].title}
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
        {headerTexts[language].subtitle}
      </p>
    </div>
  );
};

export default PageHeader;
