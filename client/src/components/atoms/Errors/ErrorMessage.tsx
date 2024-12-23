import { Card } from '@/ui/Card';
import ErrorMessageProps from './ErrorMessage.types';
import { cn } from '@/lib/utils';

const ErrorMessage = ({ message, className, cardClassName }: ErrorMessageProps) => {
  return (
    <Card className={cn('p-6', cardClassName)}>
      <div className={cn('text-center text-red-500', className)}>{message}</div>
    </Card>
  );
};

export default ErrorMessage;
