import LottoNumber from '@/components/atoms/LottoNumber/LottoNumber';
import LottoResultProps from './LottoResult.types';

/**
 * 로또 번호 6개를 표시하는 결과 컴포넌트
 * 번호가 없을 경우 물음표로 표시
 *
 * @component LottoResult
 * @param {Object} props - 컴포넌트 props
 * @param {number[] | null} props.numbers - 표시할 로또 번호 배열
 * @param {string} [props.title='생성된 번호'] - 결과 섹션의 제목
 * @param {'sm' | 'md' | 'lg'} [props.size='lg'] - 번호 원의 크기
 */
const LottoResult: React.FC<LottoResultProps> = ({ numbers, title, size }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex justify-center gap-4">
        {/* 번호가 생성되면 여기에 표시됩니다 */}
        {Array.from({ length: 6 }, (_, i) => (
          <LottoNumber key={i} number={numbers?.[i] ?? '?'} size={size} />
        ))}
      </div>
    </div>
  );
};

export default LottoResult;
