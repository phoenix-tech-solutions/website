import { Button } from "../components/primitives";
import { Mark } from "../components/brand";
import { useDocumentHead } from "../lib/useDocumentHead";
export default function NotFound() {
  useDocumentHead("404 · Phoenix Tech Solutions");
  return (
    <section className="not-found">
      <Mark size={48} animated />
      <p className="t-mono">404</p>
      <h1 tabIndex={-1} className="t-display-l">
        This page never got <em className="italic">built.</em>
      </h1>
      <div className="button-row">
        <Button href="/" as="link">
          Go home
        </Button>
        <Button href="/work" as="link" variant="secondary">
          See our work
        </Button>
      </div>
    </section>
  );
}
