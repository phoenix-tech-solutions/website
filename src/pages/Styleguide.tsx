import { BuiltByBadge, Lockup, Mark } from "../components/brand";
import {
  Button,
  Chip,
  Container,
  Counter,
  Eyebrow,
  Field,
  Rule,
  Section,
  StatusDot,
} from "../components/primitives";
export default function Styleguide() {
  return (
    <Container>
      <header className="page-header">
        <Eyebrow accent>Private styleguide</Eyebrow>
        <h1 tabIndex={-1} className="t-display-l">
          Paper, ash, and one ember.
        </h1>
      </header>
      <Rule />
      <Section>
        <h2 className="t-display-m">Type</h2>
        <p className="t-display-xl">Display XL</p>
        <p className="t-display-l">Display L</p>
        <p className="t-display-m">Display M</p>
        <p className="t-heading">Heading</p>
        <p className="t-body-l">Large body copy for the first important paragraph.</p>
        <p className="t-body muted">Default body copy stays calm and readable.</p>
        <p className="t-mono">Technical label</p>
        <Counter value={10} />
      </Section>
      <Rule />
      <Section>
        <h2 className="t-display-m">Controls</h2>
        <div className="button-row">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="chip-row">
          <Chip selected onClick={() => undefined}>
            Active
          </Chip>
          <Chip selected={false} onClick={() => undefined}>
            Inactive
          </Chip>
        </div>
        <div className="button-row">
          <StatusDot status="live" label="Live" />
          <StatusDot status="building" label="Building" />
          <StatusDot status="queued" label="Queued" />
        </div>
      </Section>
      <Rule />
      <Section>
        <h2 className="t-display-m">Brand</h2>
        <div className="button-row">
          <Mark size={48} />
          <Lockup />
          <BuiltByBadge />
        </div>
      </Section>
      <Rule />
      <Section>
        <h2 className="t-display-m">Fields</h2>
        <div className="form-panel">
          <Field label="Organization" name="example" />
          <Field label="Message" name="message" as="textarea" />
          <Field label="Error state" name="error" error="A useful error message." />
        </div>
      </Section>
    </Container>
  );
}
