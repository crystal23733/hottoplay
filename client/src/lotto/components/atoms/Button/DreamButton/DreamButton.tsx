'use client';

import { Button } from '@/ui/Button';
import { useRouter } from 'next/navigation';

const DreamButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => router.push('/content/dream')}
      className="text-sm font-medium text-muted-foreground hover:text-primary"
    >
      행운의 꿈 해몽
    </Button>
  );
};

export default DreamButton;
