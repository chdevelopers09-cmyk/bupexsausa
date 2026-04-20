import { cn } from '@/lib/utils';

interface SpacerSectionProps {
  variant?: 'small' | 'large';
}

export default function SpacerSection({ variant = 'small' }: SpacerSectionProps) {
  return (
    <div className={cn(
      "w-full",
      variant === 'small' ? "h-10 md:h-12" : "h-20 md:h-32"
    )} />
  );
}
