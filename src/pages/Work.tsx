import { Container, Section } from "../components/primitives";
import { ProjectCard } from "../components/work";
import { inProgress, live, spell } from "../content/projects";
import { useDocumentHead } from "../lib/useDocumentHead";

const shown = live.filter((project) => project.cover);
const alsoLive = live.filter((project) => !project.cover);

export default function Work() {
  useDocumentHead("Work · Phoenix Tech Solutions");
  return (
    <>
      <header className="page-header">
        <Container>
          <h1 tabIndex={-1} className="t-display">
            Our work
          </h1>
          <p className="t-lead muted">
            {spell(live.length, true)} sites live and {spell(inProgress.length)} more on the way. We
            haven't charged for any of them.
          </p>
        </Container>
      </header>

      <Section labelledby="live-title" ruleTop>
        <div className="work-group">
          <h2 id="live-title" className="t-h2">
            Live
          </h2>
          <ul className="project-grid project-grid--two">
            {shown.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </ul>
          {alsoLive.length > 0 && (
            <div className="also-live">
              <h3 className="t-label">Also live</h3>
              <ul className="plain-list">
                {alsoLive.map((project) => (
                  <li key={project.slug}>
                    <p className="t-h3">{project.client}</p>
                    <p className="muted">{project.summary}</p>
                    <p className="t-label">{project.sector}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="work-group">
          <h2 id="progress-title" className="t-h2">
            In progress
          </h2>
          <ul className="plain-list" aria-labelledby="progress-title">
            {inProgress.map((project) => (
              <li key={project.slug}>
                <p className="t-h3">{project.title}</p>
                <p className="muted">{project.summary ?? `${project.sector} ${project.kind}.`}</p>
                <p
                  className={
                    project.status === "queued"
                      ? "status-label status-label--queued"
                      : "status-label"
                  }
                >
                  {project.status === "queued" ? "Up next" : "Building"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
