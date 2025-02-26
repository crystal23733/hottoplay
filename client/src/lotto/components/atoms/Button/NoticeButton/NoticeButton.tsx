'use client';

import { Button } from '@/ui/Button';
import { useRouter } from 'next/navigation';

const NoticeLink: React.FC = () => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      onClick={() => router.push('/lotto/notices')}
      className="text-sm font-medium text-muted-foreground hover:text-primary"
    >
      공지사항
    </Button>
  );
};

export default NoticeLink;
