import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/Tabs';
import GenerateNumbers from '@/lotto/components/features/GenerateNumbers/GenerateNumbers';
import SearchNumbers from '@/lotto/components/features/SearchNumbers';
// import { AdLayout } from '@/components/features/AdLayout/AdLayout';

/**
 * 번호 생성과 번호 조회 탭 컴포넌트
 * @returns { JSX.Element } - 탭 컴포넌트
 */
const TabContent: React.FC = () => {
  return (
    <Tabs defaultValue="generate" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-lg">
        <TabsTrigger
          value="generate"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-violet-500/20 transition-all duration-300"
        >
          번호 생성
        </TabsTrigger>
        <TabsTrigger
          value="search"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-violet-500/20 transition-all duration-300"
        >
          번호 조회
        </TabsTrigger>
      </TabsList>
      {/* <AdLayout> */}
      <TabsContent value="generate" className="mt-2">
        <GenerateNumbers />
      </TabsContent>
      <TabsContent value="search" className="mt-2">
        <SearchNumbers />
      </TabsContent>
      {/* </AdLayout> */}
    </Tabs>
  );
};

export default TabContent;
