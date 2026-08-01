import { useState } from "react";
import { BuiltByBadge } from "../components/brand";
import { Button, Container, Eyebrow, Section } from "../components/primitives";
import { useDocumentHead } from "../lib/useDocumentHead";
const snippet = `<a href="https://phoenixtechsolutions.org?ref=client" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;border-top:1px solid #DDD5C8;padding-top:12px;color:#6B6459;font:500 11px/1.4 ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;text-decoration:none"><svg viewBox="0 0 19 19" width="14" height="14" aria-hidden="true"><path fill="#BF3B1E" d="M8 0h3v3H8z"/><path fill="#14120F" d="M4 4h3v3H4zm8 0h3v3h-3zM0 8h3v3H0zm8 0h3v3H8zm8 0h3v3h-3zM0 12h7v3H0zm12 0h7v3h-7zM0 16h19v3H0z"/></svg>Built by Phoenix Tech Solutions</a>`;
export default function Badge() {
  useDocumentHead("Badge · Phoenix Tech Solutions");
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  return (
    <>
      <header className="page-header">
        <Container>
          <Eyebrow accent>Built by PTS</Eyebrow>
          <h1 tabIndex={-1} className="t-display-l">
            A maker's <em className="italic">stamp.</em>
          </h1>
          <p className="t-body-l muted measure">
            Put it in the footer. Keep the mark's colors. The link helps the next organization find
            us.
          </p>
        </Container>
      </header>
      <Section ruleTop labelledby="preview-title">
        <h2 id="preview-title" className="t-display-m">
          Three variants.
        </h2>
        <div className="badge-previews">
          <div>
            <BuiltByBadge variant="light" />
          </div>
          <div className="badge-dark">
            <BuiltByBadge variant="dark" />
          </div>
          <div>
            <BuiltByBadge variant="minimal" />
          </div>
        </div>
      </Section>
      <Section ground="raised" labelledby="html-title">
        <Eyebrow>Plain HTML</Eyebrow>
        <h2 id="html-title" className="t-display-m">
          Copy and paste.
        </h2>
        <div className="code-block">
          <pre>
            <code>{snippet}</code>
          </pre>
          <Button type="button" variant="secondary" onClick={copy}>
            {copied ? "Copied" : "Copy HTML"}
          </Button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Badge HTML copied" : ""}
          </span>
        </div>
      </Section>
      <Section labelledby="react-title">
        <Eyebrow>React</Eyebrow>
        <h2 id="react-title" className="t-display-m">
          Use the same markup.
        </h2>
        <pre className="code-block">
          <code>{`<BuiltByBadge variant="light" clientSlug="your-org" />`}</code>
        </pre>
      </Section>
    </>
  );
}
