/**
 * GitHub Actions에서 사용되는 상수 값들을 정의
 * @module Constants
 */
module.exports = {
  BRANCH_RULES: {
    FEATURE_TO_DEVELOP: {
      base: ['develop'],
      head: ['feature/', 'bugfix/', 'bug-fix/'],
      method: 'merge'
    },
  },
  ERROR_MESSAGES: {
    INVALID_BASE: (expected) => `- Base branch is not "${expected}"`,
    INVALID_HEAD: (prefix) => `- Head branch does not start with ${prefix}`,
    NOT_MERGEABLE: '- PR is not mergeable',
    UNCLEAN_STATE: '- Mergeable state is not "clean"'
  }
};