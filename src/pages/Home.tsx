import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Counter,
  Editorial,
  Eyebrow,
  Reveal,
  Rule,
  Section,
} from "../components/primitives";
import { DitherImage, DotGrid, EmberField } from "../components/brand";
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
        <DotGrid />
        <Container>
          <div className="hero-grid">
            <div className="hero-copy">
              <Eyebrow accent>Est. 2024 · Atlanta, GA · Fiscally sponsored by Hack Club</Eyebrow>
              <Reveal>
                <h1 id="home-title" tabIndex={-1} className="t-display-xl">
                  Nonprofits do the hard part.
                  <br />
                  We handle <em className="italic">the website.</em>
                </h1>
              </Reveal>
              <p className="t-body-l muted measure">
                Phoenix Tech Solutions is a student-run nonprofit. We design and build websites and
                apps for community organizations. Free, and built to last.
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
              <EmberField />
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
            <span id="proof-title">Organizations we've built for</span>
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
          Three things, done properly.
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
          Six sites live. Ten organizations.
        </h2>
        <div className="selected-work">
          {featured.map((project, index) => (
            <article key={project.slug} className="featured-project">
              <div className="featured-image">
                <DitherImage
                  src={project.cover!}
                  alt={`Homepage of the ${project.title} website`}
                  trigger="both"
                />
              </div>
              <div className="featured-copy">
                <p className="t-mono muted">
                  {project.sector} · {project.year} · {project.kind}
                </p>
                <h3 className="t-display-m">{project.client}</h3>
                <p className="t-body-l muted">{project.summary}</p>
                <Button href={`/work/${project.slug}`} as="link" variant="ghost">
                  Read the case study →
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
      <Section id="impact" ground="ash" labelledby="impact-title">
        <Eyebrow>Since 2024</Eyebrow>
        <h2 id="impact-title" className="sr-only">
          Our impact
        </h2>
        <div className="impact-grid">
          {stats.map((stat) => (
            <div key={stat.label}>
              <Counter {...stat} />
              <span className="t-mono">{stat.label}</span>
            </div>
          ))}
        </div>
        <p className="impact-line t-body-l">
          Every one of these was built by a high school student, for free, for an organization that
          needed it.
        </p>
      </Section>
      <Section id="process" labelledby="process-title">
        <Eyebrow accent>How it works</Eyebrow>
        <h2 id="process-title" className="t-display-m">
          Four steps. About a month.
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
      <Section labelledby="partner-title" ruleTop>
        <Editorial
          rail={<p className="t-mono muted">Quote withheld until written permission is on file.</p>}
        >
          <Eyebrow>Partner voice</Eyebrow>
          <h2 id="partner-title" className="t-display-m">
            The work should speak first.
          </h2>
          <p className="t-body-l muted measure">
            We will publish a partner's words here only after the organization approves the quote
            and attribution.
          </p>
        </Editorial>
      </Section>
      <Section ground="raised" labelledby="students-title">
        <Editorial
          rail={
            <Link className="button button--ghost" to="/join">
              How to join →
            </Link>
          }
        >
          <Eyebrow>For students</Eyebrow>
          <h2 id="students-title" className="t-heading">
            We're always looking for people who want to build real things.
          </h2>
          <p className="muted measure">
            The work has real clients, real deadlines, and real users. You do not need to know
            everything before you start.
          </p>
        </Editorial>
      </Section>
      <section className="closing" aria-labelledby="closing-title">
        <DotGrid />
        <Container>
          <h2 id="closing-title" className="t-display-l">
            Let's build yours.
          </h2>
          <p className="t-body-l">
            Free, permanently. Tell us what your organization does and we'll take it from there.
          </p>
          <div className="button-row">
            <Button href="/start" as="link" size="lg">
              Start a project
            </Button>
            <Button href="/about#funding" as="link" variant="secondary" size="lg">
              Support our work
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
