import { Link, Navigate, useParams } from "react-router-dom";
import { Container, Editorial, Eyebrow, Prose, Section } from "../components/primitives";
import { DitherImage } from "../components/brand";
import { projects } from "../content/projects";
import { useDocumentHead } from "../lib/useDocumentHead";
export default function WorkDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  useDocumentHead(`${project?.client ?? "Work"} · Phoenix Tech Solutions`);
  if (!project || project.status !== "live") return <Navigate to="/work" replace />;
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  return (
    <>
      {project.cover && (
        <DitherImage
          className="case-hero"
          src={project.cover}
          alt={`Homepage of the ${project.title} site`}
          ratio="16/9"
          trigger="view"
          priority
        />
      )}
      <header className="page-header case-header">
        <Container>
          <Eyebrow accent>{project.sector}</Eyebrow>
          <div className="editorial">
            <div className="editorial__main">
              <h1 tabIndex={-1} className="t-display-l">
                {project.client}
              </h1>
              <p className="t-body-l muted">{project.summary}</p>
            </div>
            <dl className="editorial__rail case-meta">
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>{project.kind}</dd>
              </div>
              {project.stack && (
                <div>
                  <dt>Stack</dt>
                  <dd>{project.stack.join(" · ")}</dd>
                </div>
              )}
              {project.url && (
                <div>
                  <dt>Live</dt>
                  <dd>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      Visit site ↗
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </Container>
      </header>
      {project.caseStudy ? (
        <>
          <CaseSection label="The ask" text={project.caseStudy.ask} />
          <CaseSection label="What we made" text={project.caseStudy.made} />
          <CaseSection label="Result" text={project.caseStudy.result} />
        </>
      ) : (
        <Section>
          <p className="muted measure">
            A detailed account will be added after the client approves the project write-up.
          </p>
        </Section>
      )}
      <section className="next-project">
        <Container>
          <p className="t-mono">Next</p>
          <Link
            className="t-display-l"
            to={`/work/${next.status === "live" ? next.slug : projects[0].slug}`}
          >
            {next.status === "live" ? next.client : projects[0].client} →
          </Link>
        </Container>
      </section>
    </>
  );
}
function CaseSection({ label, text }: { label: string; text: string }) {
  return (
    <Section ruleTop>
      <Editorial rail={<p className="t-mono muted">{label}</p>}>
        <Prose>
          <h2 className="t-display-m">{label}</h2>
          <p className="t-body-l muted">{text}</p>
        </Prose>
      </Editorial>
    </Section>
  );
}
