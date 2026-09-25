import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Section } from "../components/primitives";
import { Mark } from "../components/brand";
import { SiteWing } from "../components/work";
import { featured, live, spell } from "../content/projects";
import { services } from "../content/services";
import { process } from "../content/process";
import { faq } from "../content/faq";
import { site } from "../content/site";
import { useDocumentHead } from "../lib/useDocumentHead";

// Top feather to bottom: the pink Champions header reads best at the largest size.
const wing = ["stories-of-champions", "food4lives", "re-imagine-robotics"]
  .map((slug) => featured.find((project) => project.slug === slug))
  .filter((project) => project !== undefined);

// The feathers slide in on the first visit only, not every time someone comes back home.
let wingShown = false;

export default function Home() {
  useDocumentHead("Phoenix Tech Solutions: free websites for nonprofits");
  const [enter] = useState(() => !wingShown);
  useEffect(() => {
    wingShown = true;
  }, []);
  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <Container className="hero-grid">
          <div className="hero-copy">
            <h1 id="home-title" tabIndex={-1} className="t-display">
              Free websites for nonprofits and school clubs.
            </h1>
            <p className="t-lead muted">
              We're a student-run team in {site.location}. We design and build your site, then hand
              over the code and the logins so it stays yours.
            </p>
            <div className="button-row">
              <Button to="/start" variant="accent" size="lg">
                Start a project
              </Button>
              <Button to="/work" variant="secondary" size="lg">
                See our work
              </Button>
            </div>
          </div>
          <figure className="hero-wing">
            <SiteWing projects={wing} enter={enter} />
            <figcaption className="t-small muted">
              Pictured: sites we built for{" "}
              {wing.map((project, index) => (
                <span key={project.slug}>
                  {index === wing.length - 1 ? "and " : ""}
                  <Link
                    to={`/work/${project.slug}`}
                    viewTransition
                    className="wing-caption__link"
                    data-feather={index + 1}
                  >
                    {project.client}
                  </Link>
                  {index < wing.length - 1 ? ", " : ""}
                </span>
              ))}
              , three of our {spell(live.length)} live sites.
            </figcaption>
          </figure>
        </Container>
      </section>

      <Section id="services" labelledby="services-title" tone="sunk">
        <div className="section-head">
          <h2 id="services-title" className="t-h2">
            What we build
          </h2>
          <Link to="/work" viewTransition className="text-link">
            See our work
          </Link>
        </div>
        <div className="offer-grid">
          {services.map((service) => (
            <article key={service.title} className="offer">
              <h3 className="t-h3">{service.title}</h3>
              <p className="muted">{service.body}</p>
              <p className="t-label">{service.timeline}</p>
            </article>
          ))}
        </div>
        <p className="handoff t-lead">
          Every project ends with a handoff. You get the code, the logins, and a walkthrough, so
          your team can keep the site up to date without us.
        </p>
      </Section>

      <Section id="process" labelledby="process-title">
        <div className="section-head">
          <h2 id="process-title" className="t-h2">
            How a project works
          </h2>
        </div>
        <ol className="steps">
          {process.map((step, index) => (
            <li key={step.title}>
              <Mark size={72} progress={index + 1} />
              <p className="t-label">Step {index + 1}</p>
              <h3 className="t-h3">{step.title}</h3>
              <p className="muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="steps-note muted">
          Most websites launch four to six weeks after the first call.
        </p>
      </Section>

      <Section id="faq" labelledby="faq-title" ruleTop>
        <div className="split">
          <h2 id="faq-title" className="t-h2">
            Questions we get
          </h2>
          <div className="faq">
            {faq.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span className="faq__icon" aria-hidden />
                </summary>
                <p className="muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <section className="closing" aria-labelledby="closing-title">
        <Container className="closing-inner">
          <div>
            <h2 id="closing-title" className="t-h2">
              Tell us about your organization.
            </h2>
            <p>We read every request and reply within a week.</p>
          </div>
          <Button to="/start" variant="accent" size="lg">
            Start a project
          </Button>
        </Container>
      </section>
    </>
  );
}
