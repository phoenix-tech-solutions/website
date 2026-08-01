import {
  Button,
  Container,
  Counter,
  Eyebrow,
  Reveal,
  Rule,
  Section,
} from "../components/primitives";
import { DitherImage, ProjectCycle } from "../components/brand";
import { featured, live } from "../content/projects";
import { services } from "../content/services";
import { process } from "../content/process";
import { stats } from "../content/stats";
import { useDocumentHead } from "../lib/useDocumentHead";

export default function Home() {
  useDocumentHead("Phoenix Tech Solutions — Free websites for nonprofits");
  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <Container>
          <div className="hero-grid">
            <div className="hero-copy">
              <Eyebrow accent>Student-run · Atlanta · Free for nonprofits</Eyebrow>
              <Reveal>
                <h1 id="home-title" tabIndex={-1} className="t-display-xl">
                  Good work deserves a <em className="italic">good website.</em>
                </h1>
              </Reveal>
              <p className="t-body-l muted measure">
                We design and build websites and apps for community organizations at no cost.
              </p>
              <div className="button-row">
                <Button href="/start" as="link" size="lg">
                  Start a project
                </Button>
                <Button href="/work" as="link" variant="secondary" size="lg">
                  See our work
                </Button>
              </div>
            </div>
            <div className="hero-field">
              <ProjectCycle />
            </div>
          </div>
          <Rule />
          <div className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <Counter {...stat} />
                <span className="t-mono">{stat.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="proof" aria-labelledby="proof-title">
        <Container>
          <Eyebrow>
            <span id="proof-title">Built for</span>
          </Eyebrow>
          <div className="proof-list">
            {live.map((project) => (
              <span key={project.slug}>{project.client}</span>
            ))}
          </div>
        </Container>
      </section>

      <Section id="services" labelledby="services-title">
        <Eyebrow accent>What we do</Eyebrow>
        <h2 id="services-title" className="t-display-m">
          Design, build, and handoff.
        </h2>
        <div className="service-list">
          {services.map((service) => (
            <article key={service.index} className="service-row">
              <span className="t-mono muted">{service.index}</span>
              <div>
                <h3 className="t-heading">{service.title}</h3>
                <p className="measure muted">{service.body}</p>
              </div>
              <span className="t-mono muted">{service.detail}</span>
            </article>
          ))}
        </div>
      </Section>

      <Section id="selected-work" labelledby="work-title" ruleTop>
        <Eyebrow accent>Selected work</Eyebrow>
        <h2 id="work-title" className="t-display-m">
          Work that is live.
        </h2>
        <div className="selected-work">
          {featured.map((project, index) => (
            <article key={project.slug} className="featured-project">
              <div className="featured-image">
                <DitherImage
                  src={project.cover!}
                  alt={`${project.client} website homepage`}
                  trigger="both"
                />
              </div>
              <div className="featured-copy">
                <p className="t-mono muted">
                  {project.sector} · {project.year}
                </p>
                <h3 className="t-display-m">{project.client}</h3>
                <p className="t-body-l muted">{project.summary}</p>
                <Button href={`/work/${project.slug}`} as="link" variant="ghost">
                  View project →
                </Button>
              </div>
              <span className="featured-index t-mono-sm">0{index + 1}</span>
            </article>
          ))}
        </div>
        <p className="all-work">
          <Button href="/work" as="link" variant="ghost">
            All work →
          </Button>
        </p>
      </Section>

      <Section id="process" labelledby="process-title">
        <Eyebrow accent>How it works</Eyebrow>
        <h2 id="process-title" className="t-display-m">
          From idea to launch.
        </h2>
        <ol className="process-list">
          {process.map((step) => (
            <li key={step.index}>
              <span className="process-node" aria-hidden />
              <span className="t-mono muted">{step.index}</span>
              <h3 className="t-title">{step.title}</h3>
              <p className="t-small muted">{step.body}</p>
              <span className="t-mono-sm muted">{step.duration}</span>
            </li>
          ))}
        </ol>
      </Section>

      <section className="closing" aria-labelledby="closing-title">
        <Container>
          <h2 id="closing-title" className="t-display-l">
            Let's build yours.
          </h2>
          <p className="t-body-l">Tell us what your organization needs.</p>
          <Button href="/start" as="link" size="lg">
            Start a project
          </Button>
        </Container>
      </section>
    </>
  );
}
