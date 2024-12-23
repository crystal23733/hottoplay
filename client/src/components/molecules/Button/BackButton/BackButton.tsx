'use client';

import { Button } from '@/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      목록으로
    </Button>
  );
};

export default BackButton;
