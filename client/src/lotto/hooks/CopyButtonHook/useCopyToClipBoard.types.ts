export default interface UseCopyToClipBoardReturn {
  copyToClipBoard: (text: string) => Promise<void>;
}
