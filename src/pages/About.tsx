import { Button, Container, Section } from "../components/primitives";
import { site } from "../content/site";
import { team } from "../content/team";
import { useDocumentHead } from "../lib/useDocumentHead";

const principles = [
  "The work is always free.",
  "You can update what we build without us.",
  "We launch something useful first, then improve it.",
];

export default function About() {
  useDocumentHead("About · Phoenix Tech Solutions");
  return (
    <>
      <header className="page-header">
        <Container>
          <h1 tabIndex={-1} className="t-display measure">
            We're students who build websites for local nonprofits.
          </h1>
        </Container>
      </header>

      <Section labelledby="origin-title" ruleTop>
        <div className="split">
          <h2 id="origin-title" className="t-h2">
            Why we started
          </h2>
          <div className="prose">
            <p className="t-lead">
              Small organizations need good websites, but paying for one is often out of reach.
            </p>
            <p className="muted">
              Phoenix Tech Solutions started in {site.location} in {site.foundingYear}. Student
              builders get real client work, and community groups get a site they own and can update
              themselves.
            </p>
          </div>
        </div>
      </Section>

      <Section labelledby="principles-title" ruleTop>
        <div className="split">
          <h2 id="principles-title" className="t-h2">
            How we work
          </h2>
          <ul className="principles">
            {principles.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </div>
      </Section>

      {team.length > 0 && (
        <Section labelledby="team-title" ruleTop>
          <div className="section-head">
            <h2 id="team-title" className="t-h2">
              The team
            </h2>
          </div>
          <ul className="team-grid">
            {team.map((person) => (
              <li key={person.slug}>
                {person.photo && <img src={person.photo} alt="" loading="lazy" />}
                <h3 className="t-h3">{person.name}</h3>
                <p className="t-label">
                  {person.role}
                  {person.pronouns ? `, ${person.pronouns}` : ""}
                </p>
                {person.bio && <p className="muted">{person.bio}</p>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section id="funding" labelledby="funding-title" tone="sunk">
        <div className="split">
          <h2 id="funding-title" className="t-h2">
            Nonprofit status
          </h2>
          <div className="prose">
            <p>
              Phoenix Tech Solutions is fiscally sponsored by Hack Club. We're a project of The Hack
              Foundation, a 501(c)(3) nonprofit, EIN 81-2908499.
            </p>
            {site.donateUrl ? (
              <div className="button-row">
                <Button href={site.donateUrl} variant="secondary">
                  Support our work
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </Section>
    </>
  );
}
