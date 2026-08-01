import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Chip, Container, Eyebrow, Rule, StatusDot } from "../components/primitives";
import { DitherImage } from "../components/brand";
import { projects } from "../content/projects";
import { useDocumentHead } from "../lib/useDocumentHead";
import { useMediaQuery } from "../lib/useMediaQuery";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";
const filters = [
  { id: "all", label: "All" },
  { id: "websites", label: "Websites" },
  { id: "apps", label: "Apps" },
  { id: "building", label: "In progress" },
] as const;
export default function Work() {
  useDocumentHead("Work · Phoenix Tech Solutions");
  const [params, setParams] = useSearchParams();
  const active = filters.some((f) => f.id === params.get("filter")) ? params.get("filter")! : "all";
  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          active === "all" ||
          (active === "websites" && p.kind === "website") ||
          (active === "apps" && p.kind === "app") ||
          (active === "building" && p.status !== "live"),
      ),
    [active],
  );
  const [preview, setPreview] = useState<string>();
  const fine = useMediaQuery("(pointer: fine) and (min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const cursor = useRef({ tx: 0, ty: 0, x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!fine || reduced) return;
    let frame = 0;
    const tick = () => {
      const p = cursor.current;
      p.x += (p.tx - p.x) * 0.14;
      p.y += (p.ty - p.y) * 0.14;
      if (previewRef.current)
        previewRef.current.style.transform = `translate3d(${Math.min(innerWidth - 224, p.x + 24)}px,${Math.min(innerHeight - 174, p.y + 24)}px,0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [fine, reduced]);
  const setFilter = (id: string) => setParams(id === "all" ? {} : { filter: id });
  return (
    <>
      <header className="page-header">
        <Container>
          <Eyebrow accent>Work</Eyebrow>
          <h1 tabIndex={-1} className="t-display-l">
            Work, in the open.
          </h1>
          <p className="t-body-l muted measure">Live projects and current builds.</p>
        </Container>
      </header>
      <Container>
        <Rule />
        <div className="chip-row" role="tablist" aria-label="Filter work">
          {filters.map((filter, index) => (
            <Chip
              key={filter.id}
              selected={active === filter.id}
              onClick={() => setFilter(filter.id)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                event.preventDefault();
                const next =
                  (index + (event.key === "ArrowRight" ? 1 : -1) + filters.length) % filters.length;
                setFilter(filters[next].id);
                (event.currentTarget.parentElement?.children[next] as HTMLElement)?.focus();
              }}
            >
              {filter.label}
            </Chip>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"} shown
        </p>
        <ul
          className="work-list"
          onPointerMove={(event) => {
            cursor.current.tx = event.clientX;
            cursor.current.ty = event.clientY;
          }}
        >
          {filtered.map((project, index) => (
            <li key={project.slug}>
              {project.status === "live" ? (
                <Link
                  to={`/work/${project.slug}`}
                  onPointerEnter={() => project.cover && setPreview(project.cover)}
                  onPointerLeave={() => setPreview(undefined)}
                >
                  <WorkRow project={project} index={index} />
                </Link>
              ) : (
                <div>
                  <WorkRow project={project} index={index} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </Container>
      {fine && !reduced && (
        <div ref={previewRef} className="cursor-preview" data-visible={!!preview} aria-hidden>
          {preview && <DitherImage src={preview} alt="" trigger="hover" />}
        </div>
      )}
    </>
  );
}
function WorkRow({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <div className="work-row">
      <span className="t-mono-sm muted">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <h2 className="t-heading">{project.client}</h2>
        <p className="t-small muted">{project.summary}</p>
      </div>
      <span className="t-mono-sm muted">{project.sector}</span>
      <span className="t-mono-sm muted">{project.year}</span>
      <span className="t-mono-sm">
        <StatusDot
          status={project.status}
          label={
            project.status === "building"
              ? "Building"
              : project.status === "queued"
                ? "Queued"
                : "Live"
          }
        />
      </span>
    </div>
  );
}
