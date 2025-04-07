import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import FrequencyChartProps from './FrequencyChart.types';
import { memo } from 'react';

/**
 * 번호 빈도 차트 컴포넌트
 * @param {FrequencyChartProps} props - 차트 속성
 * @returns {React.ReactNode} 번호 빈도 차트
 */
const FrequencyChart: React.FC<FrequencyChartProps> = ({
  data,
  title,
  color,
  label = 'Frequency',
  height = 300,
}) => {
  // 시각화를 위한 데이터 포맷팅
  const chartData = data.map(item => ({
    number: item.number,
    count: item.count,
  }));

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">{title}</h3>
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="number" />
            <YAxis />
            <Tooltip
              formatter={value => [`${value} times`, label]}
              labelFormatter={value => `Number ${value}`}
            />
            <Legend />
            <Bar dataKey="count" name={label} fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default memo(FrequencyChart);
