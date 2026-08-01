import {
  Button,
  Container,
  Editorial,
  Eyebrow,
  Prose,
  Rule,
  Section,
} from "../components/primitives";
import { DitherImage } from "../components/brand";
import { team } from "../content/team";
import { site } from "../content/site";
import { useDocumentHead } from "../lib/useDocumentHead";
export default function About() {
  useDocumentHead("About · Phoenix Tech Solutions");
  return (
    <>
      <header className="page-header">
        <Container>
          <Eyebrow accent>About</Eyebrow>
          <h1 tabIndex={-1} className="t-display-l">
            A workshop, run by <em className="italic">students.</em>
          </h1>
        </Container>
      </header>
      <Container>
        <Rule />
      </Container>
      <Section labelledby="origin-title">
        <Editorial
          rail={
            <div className="timeline t-mono-sm">
              <p>2024 · Founded</p>
              <p>2024 · First site shipped</p>
              <p>2026 · Work continues</p>
            </div>
          }
        >
          <Eyebrow>Origin</Eyebrow>
          <Prose className="drop-cap">
            <h2 id="origin-title" className="sr-only">
              How Phoenix Tech Solutions started
            </h2>
            <p>
              Phoenix Tech Solutions began with a simple problem: small community organizations
              needed websites, and the price of getting one made kept the work out of reach.
            </p>
            <p>
              Students already had the ability to design and build them. The missing piece was a
              dependable way to finish the work, hand it over, and stay available after launch.
            </p>
            <p>
              We operate as a fiscally sponsored project of The Hack Foundation, better known as
              Hack Club. That gives the organization a real nonprofit home while students do the
              building.
            </p>
          </Prose>
        </Editorial>
      </Section>
      <Section ruleTop labelledby="beliefs-title">
        <Eyebrow accent>What we believe</Eyebrow>
        <h2 id="beliefs-title" className="t-display-m">
          A few rules we keep.
        </h2>
        <div className="beliefs">
          {[
            [
              "A nonprofit shouldn't have to choose between a website and its actual work.",
              "The price is $0. We keep it that plain.",
            ],
            [
              "The person who runs the organization should be able to update the site.",
              "A handoff is part of the build, not an optional extra.",
            ],
            ["We finish things.", "A live, useful site matters more than a perfect deck."],
          ].map(([title, body], index) => (
            <article key={title}>
              <span className="t-mono muted">0{index + 1}</span>
              <div>
                <h3 className="t-heading">{title}</h3>
                <p className="muted">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section ruleTop labelledby="team-title">
        <Eyebrow accent>The team</Eyebrow>
        <h2 id="team-title" className="t-display-m">
          The people doing the work.
        </h2>
        {team.length ? (
          <div className="team-grid">
            {team.map((member) => (
              <article key={member.slug}>
                {member.photo && (
                  <DitherImage
                    src={member.photo}
                    alt={`${member.name}, ${member.role}`}
                    ratio="4/5"
                  />
                )}
                <h3 className="t-title">{member.name}</h3>
                <p className="t-mono muted">{member.role}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="confirmation-note t-body-l">
            The team roster is being confirmed before names and photos are published.
          </p>
        )}
      </Section>
      <Section id="funding" ground="raised" labelledby="funding-title">
        <Editorial rail={<p className="t-mono muted">EIN 81-2908499</p>}>
          <Eyebrow>How we're funded</Eyebrow>
          <h2 id="funding-title" className="t-display-m">
            A nonprofit home for student work.
          </h2>
          <p className="t-body-l muted measure">
            Phoenix Tech Solutions is fiscally sponsored by The Hack Foundation (d/b/a Hack Club), a
            501(c)(3) nonprofit. Donations made through the approved HCB page are tax-deductible in
            the United States.
          </p>
          {site.donateUrl ? (
            <Button href={site.donateUrl} variant="secondary">
              Support our work
            </Button>
          ) : (
            <p className="t-mono muted">Donation link pending confirmation</p>
          )}
        </Editorial>
      </Section>
    </>
  );
}
