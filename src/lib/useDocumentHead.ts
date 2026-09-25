import { useEffect } from "react";
export function useDocumentHead(
  title: string,
  description = "Free websites and apps for nonprofits, school clubs, and community groups, built by a student-run team in Atlanta.",
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
