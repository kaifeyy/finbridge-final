import { useState, useEffect, useMemo } from "react";
import { MotionContainer, MotionItem } from "@/components/Motion";

interface CoursePageProps {
  title: string;
  docUrl: string; // server endpoint that returns HTML (/courses/html/:id)
}

export default function CoursePage({ title, docUrl }: CoursePageProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Extract slug from docUrl and build absolute DOCX proxy url
  const { slug, docDownloadUrl, officeEmbedUrl } = useMemo(() => {
    const parts = docUrl.split("/");
    const id = parts[parts.length - 1] || "";
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const downloadUrl = `/courses/doc/${id}`;
    const officeUrl = origin
      ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(origin + downloadUrl)}`
      : "";
    return { slug: id, docDownloadUrl: downloadUrl, officeEmbedUrl: officeUrl };
  }, [docUrl]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const resp = await fetch(docUrl, { cache: "no-store" });
        if (!resp.ok) throw new Error("Failed to fetch course");
        const contentType = resp.headers.get("content-type") || "";
        if (contentType.includes("text/html")) {
          const text = await resp.text();
          if (mounted) setHtml(text);
        } else {
          const arrayBuffer = await resp.arrayBuffer();
          const mammothLib = (window as any).mammoth;
          if (mammothLib) {
            const result = await mammothLib.convertToHtml({ arrayBuffer });
            if (mounted) setHtml(result.value || "<p>No content</p>");
          } else {
            if (mounted)
              setHtml(
                `<p class="text-muted-foreground">Unable to render document in-browser. <a href="${docDownloadUrl}" target="_blank" rel="noreferrer" class="text-primary underline">Download source</a></p>`
              );
          }
        }
      } catch (err) {
        console.error("Error loading course content:", err);
        if (mounted) setHtml('<p class="text-muted-foreground">Unable to load course content. Please try again later.</p>');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [docUrl, docDownloadUrl]);

  return (
    <MotionContainer className="bg-background min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-2">Comprehensive free course with a clean, scrollable preview and download option.</p>
        </div>

        <MotionItem className="bg-card rounded-xl border border-border p-0 overflow-hidden">
          {/* Office Online embed preview */}
          <div className="w-full" style={{ minHeight: "70vh" }}>
            {officeEmbedUrl ? (
              <iframe
                title={`${title} preview`}
                src={officeEmbedUrl}
                className="w-full"
                style={{ height: "70vh", border: 0 }}
                onLoad={() => setIframeLoaded(true)}
              />
            ) : null}
          </div>

          {/* Fallback HTML (server-rendered) */}
          {!iframeLoaded && (
            <div className="p-6">
              {loading ? (
                <div className="text-center py-10 text-muted-foreground">Loading course...</div>
              ) : (
                <div className="prose max-w-none text-sm" dangerouslySetInnerHTML={{ __html: html || "" }} />
              )}
            </div>
          )}
        </MotionItem>

        <div className="mt-4 flex items-center gap-3">
          <a
            href={docDownloadUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-95"
          >
            Download DOCX
          </a>
          <a
            href={docUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground underline"
          >
            View HTML version
          </a>
        </div>
      </div>
    </MotionContainer>
  );
}
