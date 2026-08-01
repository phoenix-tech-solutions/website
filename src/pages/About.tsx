import {
  Button,
  Container,
  Editorial,
  Eyebrow,
  Prose,
  Rule,
  Section,
} from "../components/primitives";
import { site } from "../content/site";
import { useDocumentHead } from "../lib/useDocumentHead";

const principles = [
  "The work is always free.",
  "Clients can update what we build.",
  "A useful launch beats a perfect pitch.",
];

export default function About() {
  useDocumentHead("About · Phoenix Tech Solutions");
  return (
    <>
      <header className="page-header">
        <Container>
          <Eyebrow accent>About</Eyebrow>
          <h1 tabIndex={-1} className="t-display-l">
            Students building for the <em className="italic">community.</em>
          </h1>
        </Container>
      </header>
      <Container>
        <Rule />
      </Container>

      <Section labelledby="origin-title">
        <Editorial rail={<p className="t-mono muted">Founded 2024 · Atlanta</p>}>
          <Eyebrow>Why we exist</Eyebrow>
          <Prose>
            <h2 id="origin-title" className="sr-only">
              Why Phoenix Tech Solutions exists
            </h2>
            <p className="t-body-l">
              Small organizations need strong websites, but the cost often puts them out of reach.
            </p>
            <p className="muted">
              Phoenix Tech Solutions gives student builders real experience while giving community
              groups digital tools they own.
            </p>
          </Prose>
        </Editorial>
      </Section>

      <Section ruleTop labelledby="beliefs-title">
        <Eyebrow accent>Our standard</Eyebrow>
        <h2 id="beliefs-title" className="t-display-m">
          Three rules.
        </h2>
        <div className="beliefs beliefs--compact">
          {principles.map((principle, index) => (
            <article key={principle}>
              <span className="t-mono muted">0{index + 1}</span>
              <h3 className="t-heading">{principle}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section id="funding" ground="raised" labelledby="funding-title">
        <Editorial rail={<p className="t-mono muted">EIN 81-2908499</p>}>
          <Eyebrow>Nonprofit status</Eyebrow>
          <h2 id="funding-title" className="t-display-m">
            Fiscally sponsored by Hack Club.
          </h2>
          <p className="muted measure">
            Phoenix Tech Solutions is a project of The Hack Foundation, a 501(c)(3) nonprofit.
          </p>
          {site.donateUrl ? (
            <Button href={site.donateUrl} variant="secondary">
              Support our work
            </Button>
          ) : null}
        </Editorial>
      </Section>
    </>
  );
}
