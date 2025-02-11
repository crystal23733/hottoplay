import StatisticsOptionsProps, { StatisticsType } from './StatisticsOptions.types';
import STATISTICS_METHODS from './constants/statisticsMethod';

/**
 * 통계 기반 번호 생성 옵션
 * @param value - 선택된 옵션
 * @param onChange - 옵션 변경 함수
 * @returns
 */
export const StatisticsOptions: React.FC<StatisticsOptionsProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3" role="radiogroup" aria-label="통계 기반 번호 생성 옵션">
      {Object.entries(STATISTICS_METHODS).map(([key, { title, description }]) => (
        <div
          key={key}
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
            value === key
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50'
              : 'border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700'
          }`}
          onClick={() => onChange(key as StatisticsType)}
        >
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="flex-shrink-0 mt-1">
              <input
                type="radio"
                name="statistics-option"
                value={key}
                checked={value === key}
                onChange={() => onChange(key as StatisticsType)}
                className="w-4 h-4 text-blue-500"
                aria-label={title}
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default StatisticsOptions;
