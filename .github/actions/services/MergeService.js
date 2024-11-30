const { rules } = require('eslint-config-prettier');
const { MERGE_METHOD, ERROR_MESSAGES, BRANCH_RULES } = require('../common/constants');

/**
 * PR 머지 관련 작업을 처리하는 서비스
 * @class MergeService
 */
class MergeService {
  /**
   * @param {Object} github - GitHub API 객체
   * @param {Object} context - GitHub 컨텍스트
   */
  constructor(github, context) {
    this.github = github;
    this.context = context;
  }

  /**
   * PR 머지 시도
   * @param {number} pullNumber - PR 번호
   * @param {Object} validation - 유효성 검사 결과
   * @returns {Promise<void>}
   */
  async mergePullRequest(pullNumber, validation) {
    const { owner, repo } = this.context.repo;

    if (!validation.isValid) {
      this.logFailureReasons(validation);
      throw new Error('Merge criteria not met');
    }

    await this.github.rest.pulls.merge({
      owner,
      repo,
      pull_number: pullNumber,
      merge_method: MERGE_METHOD
    });
  }

  /**
   * 머지 실패 이유 로깅
   * @param {Object} validation - 유효성 검사 결과
   * @private
   */
  logFailureReasons(validation) {
    const rules = BRANCH_RULES[validation.type || 'FEATURE_TO_DEVELOP'];
    console.log('Detailed Failure Reasons:');
    if (!validation.baseCheck) console.log(ERROR_MESSAGES.INVALID_BASE(rules.base[0]));
    if (!validation.headCheck) console.log(ERROR_MESSAGES.INVALID_HEAD);
  }
}

module.exports = MergeService;