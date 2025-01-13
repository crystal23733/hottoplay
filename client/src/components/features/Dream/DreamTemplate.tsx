'use client';

import { useState } from 'react';
import { MainLayout } from '../MainLayout/MainLayout';
import BackButton from '@/components/molecules/Button/BackButton/BackButton';
import { Card } from '@/ui/Card';
import { Search } from 'lucide-react';
import DreamList from '@/components/organisms/Dream/DreamList/DreamList';
import { dreamData } from '../../../data/dreams';
import { Input } from '@/ui/input';

const DreamTemplate = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 min-h-screen pt-8 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <BackButton>홈으로</BackButton>

            <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600">
              꿈 해몽
            </h1>

            <Card className="p-6 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="꿈 키워드를 입력하세요 (예: 돼지)"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </Card>

            <DreamList dreams={dreamData} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DreamTemplate;
