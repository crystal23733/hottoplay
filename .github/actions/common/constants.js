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
    RELEASE_TO_DEVELOP: {
      base: ['develop'],
      head: ['release/'],
      method: 'merge'
    },
    RELEASE_TO_MAIN: {
      base: ['main'],
      head: ['release/'],
      method: 'squash'
    }
  },
  ERROR_MESSAGES: {
    INVALID_BASE: (expected) => `- 대상 브랜치가 "${expected}"가 아닙니다.`,
    INVALID_HEAD: (prefix) => `- 대상 브랜치가 ${prefix}로 시작하지 않습니다.`,
    NOT_MERGEABLE: '- 현재 PR을 병합할 수 없는 상태입니다',
    UNCLEAN_STATE: '- PR 상태가 깨끗하지 않습니다 (충돌이나 리뷰 필요)',
    MERGE_FAILED: '병합 조건이 충족되지 않았습니다',
    DETAILED_REASONS: '상세 실패 사유:',
    BUILD_FAILED: 'Docker 빌드 실패',
    DOCKER_BUILD_FAILED: '도커 빌드 실패',
    DOCKER_PUSH_FAILED: '도커 이미지 푸시 실패',
    BUILD_PROCESS_ERROR: (step) => `${step} 단계에서 실패`
  }
};