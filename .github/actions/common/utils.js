/**
 * 공통으로 사용되는 유틸리티 함수들
 * @module Utils
 */
class ActionUtils {
  /**
   * 브랜치 이름이 유효한지 검사
   * @param {string} branchName - 검사할 브랜치 이름
   * @param {string[]} validNames - 유효한 브랜치 이름 목록
   * @returns {boolean}
   */
  static isValidBranch(branchName, validNames) {
    return validNames.includes(branchName);
  }

  /**
   * 브랜치 이름이 특정 접두사로 시작하는지 검사
   * @param {string} branchName - 검사할 브랜치 이름
   * @param {string[]} validPrefixes - 유효한 접두사 목록
   * @returns {boolean}
   */
  static hasValidPrefix(branchName, validPrefixes) {
    return validPrefixes.some(prefix => branchName.startsWith(prefix));
  }
}

module.exports = ActionUtils;