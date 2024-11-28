import { Coins } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <Coins className="h-6 w-6 text-blue-500" />
      <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
        hottoplay
      </h1>
    </div>
  );
};

export default Logo;
