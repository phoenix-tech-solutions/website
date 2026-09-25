import { FormEvent, useState } from "react";
import { Button, Container, Field } from "../components/primitives";
import { Mark } from "../components/brand";
import { FormState, postForm, validateForm } from "../lib/forms";
import { useDocumentHead } from "../lib/useDocumentHead";

const next = ["We read your request.", "We meet with you for 30 minutes.", "We send you a plan."];
const required = ["organization", "name", "email", "about"];

export default function Start() {
  useDocumentHead("Start a project · Phoenix Tech Solutions");
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Each finished required answer adds a piece to the wing, in the same order as the process.
  const [answered, setAnswered] = useState(0);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validateForm(form, required);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstInvalid = Object.keys(nextErrors)[0];
      requestAnimationFrame(() => {
        (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      });
      return;
    }
    setState("submitting");
    try {
      await postForm(form, import.meta.env.VITE_FORMSPREE_START ?? "");
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="start-page">
      <Container>
        <div className="form-layout">
          <div className="form-copy">
            <h1 tabIndex={-1} className="t-display">
              Tell us about your organization.
            </h1>
            <p className="t-lead muted">Free for nonprofits, school clubs, and community groups.</p>
            <div className="next-steps">
              <h2 className="t-h3">What happens next</h2>
              <ol>
                {next.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="form-wrap">
            {state === "success" ? (
              <div className="form-success" role="status">
                <p className="t-h2">Thanks, we got your request.</p>
                <p className="muted">We'll reply within a week.</p>
              </div>
            ) : (
              <form
                className="form-panel"
                onSubmit={submit}
                onInput={(event) => {
                  const found = validateForm(event.currentTarget, required);
                  setAnswered(required.filter((name) => !found[name]).length);
                }}
                noValidate
                aria-busy={state === "submitting"}
              >
                <div className="form-progress">
                  <Mark size={56} progress={answered} />
                  <div>
                    <p className="t-label">
                      {answered === required.length
                        ? "Ready to send"
                        : `${answered} of ${required.length} required answers`}
                    </p>
                    <p className="t-small muted">Fields marked * are required.</p>
                  </div>
                </div>
                <div className="form-pair">
                  <Field
                    label="Organization name"
                    name="organization"
                    required
                    error={errors.organization}
                  />
                  <Field
                    label="Your name"
                    name="name"
                    autoComplete="name"
                    required
                    error={errors.name}
                  />
                </div>
                <div className="form-pair">
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    error={errors.email}
                  />
                  <Field label="What do you need?" name="need" as="select">
                    <option>Website</option>
                    <option>Mobile app</option>
                    <option>Not sure</option>
                  </Field>
                </div>
                <Field
                  label="What does your organization do?"
                  name="about"
                  as="textarea"
                  rows={4}
                  required
                  error={errors.about}
                />
                <div className="form-pair">
                  <Field label="Current website (optional)" name="currentWebsite" type="url" />
                  <Field label="Timeline" name="timeline" as="select">
                    <option>No rush</option>
                    <option>Next few months</option>
                    <option>There's a deadline</option>
                  </Field>
                </div>
                <Field
                  label="Anything else (optional)"
                  name="anythingElse"
                  as="textarea"
                  rows={3}
                />
                <div hidden>
                  <input id="start-gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </div>
                {state === "error" && (
                  <p className="form-error" role="alert">
                    The form could not send. Your answers are still here.
                  </p>
                )}
                <Button type="submit" variant="accent" size="lg" disabled={state === "submitting"}>
                  {state === "submitting" ? "Sending…" : "Send project details"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
