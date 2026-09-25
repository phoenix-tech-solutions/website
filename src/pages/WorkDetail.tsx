import { Link, Navigate, useParams } from "react-router-dom";
import { Container, ExternalLink, Screenshot, Section } from "../components/primitives";
import { caseStudies } from "../content/projects";
import { useDocumentHead } from "../lib/useDocumentHead";

export default function WorkDetail() {
  const { slug } = useParams();
  const project = caseStudies.find((item) => item.slug === slug);
  useDocumentHead(`${project?.client ?? "Work"} · Phoenix Tech Solutions`, project?.summary);
  if (!project?.story) return <Navigate to="/work" replace />;
  const next = caseStudies[(caseStudies.indexOf(project) + 1) % caseStudies.length];
  return (
    <>
      <header className="page-header">
        <Container>
          <p className="crumb t-label">
            <Link to="/work" viewTransition>
              Work
            </Link>{" "}
            / {project.sector}
          </p>
          <h1 tabIndex={-1} className="t-display">
            {project.client}
          </h1>
          <p className="t-lead muted">{project.summary}</p>
          <dl className="case-meta">
            <div>
              <dt>Site</dt>
              <dd>{project.title}</dd>
            </div>
            <div>
              <dt>Launched</dt>
              <dd>{project.year}</dd>
            </div>
            {project.stack && (
              <div>
                <dt>Built with</dt>
                <dd>{project.stack.join(", ")}</dd>
              </div>
            )}
            {project.url && (
              <div>
                <dt>Live site</dt>
                <dd>
                  <ExternalLink href={project.url}>{new URL(project.url).hostname}</ExternalLink>
                </dd>
              </div>
            )}
          </dl>
        </Container>
      </header>
      {project.cover && (
        <Container>
          <Screenshot
            src={project.cover}
            alt={`Homepage of the ${project.title} website`}
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="shot--large"
            priority
          />
        </Container>
      )}
      <Section labelledby="story-title">
        <h2 id="story-title" className="sr-only">
          About the project
        </h2>
        <div className="prose case-story">
          {project.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>
      {next !== project && (
        <nav className="next-case" aria-label="Next case study">
          <Container>
            <p className="t-label">Next case study</p>
            <Link className="t-h2 text-link" to={`/work/${next.slug}`} viewTransition>
              {next.client}
            </Link>
          </Container>
        </nav>
      )}
    </>
  );
}
