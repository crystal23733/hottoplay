export default (markdown: string): string => {
  return (
    markdown
      // 헤더 제거 (### 등)
      .replace(/^#+\s/gm, '')
      // 볼드체 제거 (**text**)
      .replace(/\*\*(.*?)\*\*/g, '$1')
      // 이탤릭체 제거 (*text*)
      .replace(/\*(.*?)\*/g, '$1')
      // 링크 제거 ([text](url))
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      // 코드 블록 제거 (```code```)
      .replace(/```[\s\S]*?```/g, '')
      // 인라인 코드 제거 (`code`)
      .replace(/`(.*?)`/g, '$1')
      // 체크박스 제거 (- [ ] 또는 - [x])
      .replace(/- \[(x| )\] /g, '')
      // 불릿 포인트 제거 (- 또는 * 또는 +)
      .replace(/^[-*+]\s/gm, '')
      // 여러 줄 공백을 하나의 공백으로
      .replace(/\n\s*\n/g, ' ')
      // 연속된 공백을 하나의 공백으로
      .replace(/\s+/g, ' ')
      .trim()
  );
};
