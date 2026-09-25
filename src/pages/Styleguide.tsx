import { Lockup, Mark } from "../components/brand";
import { Button, Container, Field, Section } from "../components/primitives";

const swatches = [
  ["Cream", "var(--color-cream)"],
  ["Ink", "var(--color-ink)"],
  ["Navy", "var(--color-navy)"],
  ["Terracotta", "var(--color-terracotta)"],
  ["Terracotta deep (small text)", "var(--color-terracotta-deep)"],
] as const;

export default function Styleguide() {
  return (
    <>
      <header className="page-header">
        <Container>
          <h1 tabIndex={-1} className="t-display">
            Styleguide
          </h1>
          <p className="t-lead muted">Cream ground, ink text, navy, and one terracotta accent.</p>
        </Container>
      </header>
      <Section ruleTop>
        <h2 className="t-h2">Color</h2>
        <div className="button-row">
          {swatches.map(([name, value]) => (
            <div key={name}>
              <div
                style={{
                  width: 120,
                  height: 72,
                  background: value,
                  border: "1px solid var(--color-line)",
                }}
              />
              <p className="t-label">{name}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section ruleTop>
        <h2 className="t-h2">Type</h2>
        <p className="t-display">Display</p>
        <p className="t-h2">Heading two</p>
        <p className="t-h3">Heading three</p>
        <p className="t-lead">Lead copy for the first important paragraph.</p>
        <p>Body copy stays calm and readable.</p>
        <p className="t-label">Label</p>
      </Section>
      <Section ruleTop>
        <h2 className="t-h2">Controls</h2>
        <div className="button-row">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
        </div>
      </Section>
      <Section ruleTop>
        <h2 className="t-h2">Brand</h2>
        <div className="button-row">
          <Mark size={96} />
          <Mark size={32} />
          <Lockup />
        </div>
      </Section>
      <Section ruleTop>
        <h2 className="t-h2">Fields</h2>
        <div className="form-panel">
          <Field label="Organization" name="example" required />
          <Field label="Message" name="message" as="textarea" />
          <Field label="Error state" name="error" error="A useful error message." />
        </div>
      </Section>
    </>
  );
}
