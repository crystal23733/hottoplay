const { BRANCH_RULES } = require('../common/constants');
const ActionUtils = require('../common/utils');

/**
 * Pull Request 관련 작업을 처리하는 서비스
 * @class PullRequestService
 */
class PullRequestService {
  /**
   * @param {Object} github - GitHub API 객체
   * @param {Object} context - GitHub 컨텍스트
   */
  constructor(github, context) {
    this.github = github;
    this.context = context;
  }

  /**
   * PR 정보를 가져옴
   * @param {number} pullNumber - PR 번호
   * @returns {Promise<Object>}
   */
  async getPullRequest(pullNumber) {
    const { owner, repo } = this.context.repo;
    return this.github.rest.pulls.get({
      owner,
      repo,
      pull_number: pullNumber
    });
  }

  /**
   * PR 유형을 판단
   * @param {Object} pullRequest - PR 정보
   * @returns {string|null} - PR 유형 또는 null
   */
  determinePRType(pullRequest) {
    const { base, head } = pullRequest

    if (ActionUtils.isValidBranch(base.ref, BRANCH_RULES.FEATURE_TO_DEVELOP.base) && ActionUtils.hasValidPrefix(head.ref, BRANCH_RULES.FEATURE_TO_DEVELOP.head)) {
      return 'FEATURE_TO_DEVELOP';
    }

    return null;
  }

  /**
   * PR이 머지 가능한 상태인지 검사
   * @param {Object} pullRequest - PR 정보
   * @returns {boolean}
   */
  validatePullRequest(pullRequest) {
    const prType = this.determinePRType(pullRequest);
    if (!prType) {
      return {
        isValid: false,
        type: null,
        baseCheck: false,
        headCheck: false
      };
    }

    const rules = BRANCH_RULES[prType];
    const baseCheck = ActionUtils.isValidBranch(pullRequest.base.ref, rules.base);
    const headCheck = ActionUtils.hasValidPrefix(pullRequest.head.ref, rules.head);
    
    return {
      isValid: baseCheck && headCheck,
      type: prType,
      baseCheck,
      headCheck
    };
  }
}

module.exports = PullRequestService;