import { useState, useEffect } from "react";
import { MotionContainer, MotionItem } from "@/components/Motion";

interface CoursePageProps {
  title: string;
  docUrl: string; // endpoint that returns HTML
}

export default function CoursePage({ title, docUrl }: CoursePageProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const resp = await fetch(docUrl, { cache: 'no-store' });
        if (!resp.ok) throw new Error('Failed to fetch course');

        const contentType = resp.headers.get('content-type') || '';
        if (contentType.includes('text/html')) {
          const text = await resp.text();
          if (mounted) setHtml(text);
        } else {
          // assume binary DOCX, convert client-side using mammoth (loaded via CDN)
          const arrayBuffer = await resp.arrayBuffer();
          // @ts-ignore
          const mammothLib = (window as any).mammoth;
          if (mammothLib) {
            const result = await mammothLib.convertToHtml({ arrayBuffer });
            if (mounted) setHtml(result.value || '<p>No content</p>');
          } else {
            // fallback: show download link
            if (mounted) setHtml(`<p class="text-muted-foreground">Unable to render document in-browser. <a href="${docUrl}" target="_blank" rel="noreferrer" class="text-primary underline">Download source</a></p>`);
          }
        }
      } catch (err) {
        console.error('Error loading course content:', err);
        if (mounted) setHtml('<p class="text-muted-foreground">Unable to load course content. Please try again later.</p>');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [docUrl]);

  return (
    <MotionContainer className="bg-background min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-2">Comprehensive free course with images, charts, and structured content.</p>
        </div>

        <MotionItem className="bg-card rounded-xl border border-border p-6">
          {loading ? (
            <div className="text-center py-10 text-muted-foreground">Loading course...</div>
          ) : (
            <div className="prose max-w-none text-sm" dangerouslySetInnerHTML={{ __html: html || '' }} />
          )}
        </MotionItem>

        <div className="mt-4 text-sm text-muted-foreground">
          If content looks incorrect, <a href={docUrl.replace('/html/', '/doc/')} target="_blank" rel="noreferrer" className="text-primary underline">download source document</a>.
        </div>
      </div>
    </MotionContainer>
  );
}
