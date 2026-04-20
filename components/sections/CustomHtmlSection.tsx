interface CustomHtmlSectionProps {
  html: string;
}

export default function CustomHtmlSection({ html }: CustomHtmlSectionProps) {
  return (
    <section className="bg-white">
      <div className="container-wide py-12">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </section>
  );
}
