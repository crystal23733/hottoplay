'use client';

import { Button } from '@/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BackButtonProps from './BackButton.types';

const BackButton: React.FC<BackButtonProps> = ({ children }) => {
  const router = useRouter();

  return (
    <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      {children}
    </Button>
  );
};

export default BackButton;
