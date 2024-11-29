/**
 * GitHub Actions에서 사용되는 상수 값들을 정의
 * @module Constants
 */
module.exports = {
  VALID_BASE_BRANCHES: ['develop'],
  VALID_HEAD_PREFIXES: ['feature/'],
  MERGE_METHOD: 'merge',
  ERROR_MESSAGES: {
    INVALID_BASE: '- Base branch is not "develop"',
    INVALID_HEAD: '- Head branch does not start with "feature/"',
    NOT_MERGEABLE: '- PR is not mergeable',
    UNCLEAN_STATE: '- Mergeable state is not "clean"'
  }
};