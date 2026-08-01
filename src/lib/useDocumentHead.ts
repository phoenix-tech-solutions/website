import { useEffect } from "react";
export function useDocumentHead(
  title: string,
  description = "A student-run nonprofit that designs and builds websites and apps for community organizations. Free, permanently.",
) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.append(meta);
    }
    meta.content = description;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = `https://phoenixtechsolutions.org${location.pathname}`;
  }, [title, description]);
}
