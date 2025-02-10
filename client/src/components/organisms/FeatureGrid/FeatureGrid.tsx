import FeatureCard from '@/components/molecules/FeatureCard/FeatureCard';
import FeatureGridProps from './FeatureGrid.types';

/**
 * 기능 그리드
 * @param {FeatureCardProps[]} features - 기능 목록
 */
const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {features.map(feature => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
};

export default FeatureGrid;
