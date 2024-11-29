const { VALID_BASE_BRANCHES, VALID_HEAD_PREFIXES } = require('../common/constants');
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
   * PR이 머지 가능한 상태인지 검사
   * @param {Object} pullRequest - PR 정보
   * @returns {boolean}
   */
  validatePullRequest(pullRequest) {
    const baseCheck = ActionUtils.isValidBranch(pullRequest.base.ref, VALID_BASE_BRANCHES);
    const headCheck = ActionUtils.hasValidPrefix(pullRequest.head.ref, VALID_HEAD_PREFIXES);
    
    return {
      isValid: baseCheck && headCheck,
      baseCheck,
      headCheck
    };
  }
}

module.exports = PullRequestService;