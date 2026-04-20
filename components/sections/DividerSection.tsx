import { cn } from '@/lib/utils';

interface DividerSectionProps {
  variant?: 'solid' | 'dashed' | 'dotted';
}

export default function DividerSection({ variant = 'solid' }: DividerSectionProps) {
  return (
    <div className="container-wide py-12">
      <hr className={cn(
        "border-gray-100",
        variant === 'solid' ? "border-solid" :
        variant === 'dashed' ? "border-dashed" : "border-dotted"
      )} />
    </div>
  );
}
