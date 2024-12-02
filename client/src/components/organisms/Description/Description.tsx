const Description: React.FC = () => (
  <div className="max-w-3xl mx-auto px-6 mt-8">
    <div className="text-center space-y-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
      <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
        유니크한 번호 조합, 가장 많이 당첨된 번호 기반 조합,
        <br />
        그리고 사용자가 만들어가는 번호 조합 등 다양한 방식으로 번호를 생성해보세요.
      </p>
      <div className="space-y-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          더 나은 서비스를 위해 여러분의 의견을 기다립니다.
          <br />
          원하시는 번호 생성 방식이나 기능 개선 제안을 보내주세요.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
          <svg
            className="w-4 h-4 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <a
            href="mailto:hottoplay@gmail.com"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            hottoplay24@gmail.com
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Description;
