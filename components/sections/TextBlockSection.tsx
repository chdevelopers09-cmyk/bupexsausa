import { cn } from '@/lib/utils';

interface TextBlockSectionProps {
  variant?: 'centered' | 'left';
  heading?: string;
  subheading?: string;
  body: string;
  colorScheme?: 'white' | 'light';
}

export default function TextBlockSection({
  variant = 'centered',
  heading,
  subheading,
  body,
  colorScheme = 'white',
}: TextBlockSectionProps) {
  return (
    <section className={cn(
      "section-padding",
      colorScheme === 'light' ? "bg-gray-50" : "bg-white"
    )}>
      <div className={cn(
        "container-wide max-w-4xl",
        variant === 'centered' ? "text-center" : "text-left"
      )}>
        {heading && (
          <h2 className="text-3xl md:text-4xl font-black text-dark mb-4">{heading}</h2>
        )}
        {subheading && (
          <p className="text-xl text-primary font-medium mb-8 leading-tight">{subheading}</p>
        )}
        {heading && !subheading && variant === 'centered' && (
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-10"></div>
        )}
        <div className={cn(
          "text-gray-500 text-lg leading-relaxed prose prose-purple max-w-none",
          variant === 'centered' ? "mx-auto" : ""
        )}>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </div>
    </section>
  );
}
