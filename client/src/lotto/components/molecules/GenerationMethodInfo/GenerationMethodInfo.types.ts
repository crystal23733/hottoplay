import generationMethod from './constants/generationMethod';

/**
 * GenerationMethodInfo 컴포넌트의 Props 타입
 * @interface GenerationMethodInfoProps
 */
export default interface GenerationMethodInfoProps {
  /** 생성 방식 타입 */
  type: keyof typeof generationMethod;
}
