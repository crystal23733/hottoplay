const Description: React.FC = () => (
  <div className="max-w-3xl mx-auto px-6 mt-8">
    <div className="text-center space-y-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
      <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
        유니크한 번호 조합, 가장 많이 당첨된 번호 기반 조합,
        <br />
        그리고 사용자가 만들어가는 번호 조합 등 다양한 방식으로 번호를 생성해보세요.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        추후 게시판을 도입할 예정이니 원하는 번호 뽑기 방식을 말씀하시면
        <br />
        지속적으로 업데이트하겠습니다.
      </p>
    </div>
  </div>
);

export default Description;
