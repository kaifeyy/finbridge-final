import { MotionContainer, MotionItem } from "@/components/Motion";
import { Button } from "@/components/ui/button";

interface CoursePageProps {
  title: string;
  docxUrl: string; // direct DOCX URL to embed & download
}

export default function CoursePage({ title, docxUrl }: CoursePageProps) {
  const embedSrc = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(docxUrl)}`;

  return (
    <MotionContainer className="bg-background min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-2">View the full course document below or download it to read offline.</p>
        </div>

        <MotionItem className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="w-full" style={{ height: 820 }}>
            <iframe
              title={`${title} document viewer`}
              src={embedSrc}
              allowFullScreen
              className="w-full h-full"
              style={{ border: 0 }}
            />
          </div>
        </MotionItem>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">If the viewer doesn’t load, use the button to open the file directly.</div>
          <a href={docxUrl} target="_blank" rel="noreferrer" download>
            <Button>Download DOCX</Button>
          </a>
        </div>
      </div>
    </MotionContainer>
  );
}
