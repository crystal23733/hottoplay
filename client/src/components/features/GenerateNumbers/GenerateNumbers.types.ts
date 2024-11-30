/**
 * 로또 번호 생성 방식
 *
 * @type GenerateType
 * @property {'default'} default - 기본 랜덤 생성
 * @property {'unique'} unique - 중복 없는 랜덤 생성
 * @property {'many'} many - 많이 나온 번호 기반 생성
 * @property {'custom'} custom - 사용자 지정 번호 기반 생성
 */
export type GenerateType = 'default' | 'unique' | 'many' | 'custom';

/**
 * 생성된 로또 번호 세트
 *
 * @interface GeneratedNumberSet
 * @property {number[]} numbers - 생성된 6개의 번호
 * @property {string} type - 생성 방식
 */
export interface GeneratedNumberSet {
  numbers: number[];
  type: GenerateType;
}
