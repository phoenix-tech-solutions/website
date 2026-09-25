import { Button, Container } from "../components/primitives";
import { Mark } from "../components/brand";
import { useDocumentHead } from "../lib/useDocumentHead";

export default function NotFound() {
  useDocumentHead("Page not found · Phoenix Tech Solutions");
  return (
    <section className="not-found">
      <Container>
        <Mark size={96} missing={1} enter />
        <h1 tabIndex={-1} className="t-display">
          Page not found
        </h1>
        <p className="t-lead muted measure">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="button-row">
          <Button to="/">Go to the homepage</Button>
          <Button to="/work" variant="secondary">
            See our work
          </Button>
        </div>
      </Container>
    </section>
  );
}
