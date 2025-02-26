import { Info } from 'lucide-react';
import generationMethod from './constants/generationMethod';
import GenerationMethodInfoProps from './GenerationMethodInfo.types';

/**
 * 번호 생성 방식에 대한 설명을 표시하는 컴포넌트
 *
 * @component
 * @param {Object} props - 컴포넌트 props
 * @param {keyof typeof GENERATION_METHODS} props.type - 생성 방식 타입
 */
const GenerationMethodInfo: React.FC<GenerationMethodInfoProps> = ({ type }) => {
  const { title, description } = generationMethod[type];

  return (
    <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg mt-2">
      <Info className="w-5 h-5 text-blue-500 mt-0.5" />
      <div>
        <h4 className="font-medium text-sm text-blue-700 dark:text-blue-300">{title}</h4>
        <p className="text-sm text-blue-600/80 dark:text-blue-400/80 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default GenerationMethodInfo;
