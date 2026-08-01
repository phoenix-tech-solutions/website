import { FormEvent, useState } from "react";
import { Button, Container, Eyebrow, Field } from "../components/primitives";
import { FormState, postForm, validateForm } from "../lib/forms";
import { useDocumentHead } from "../lib/useDocumentHead";
const next = [
  "We read it within a week",
  "A 30-minute call",
  "Designs in week one",
  "Live in about a month",
];
export default function Start() {
  useDocumentHead("Start a project · Phoenix Tech Solutions");
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validateForm(form, ["organization", "name", "email", "about"]);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setState("submitting");
    try {
      await postForm(form, import.meta.env.VITE_FORMSPREE_START ?? "");
      setState("success");
    } catch {
      setState("error");
    }
  }
  return (
    <section className="section">
      <Container>
        <div className="form-layout">
          <div className="form-copy sticky-copy">
            <Eyebrow accent>Start a project</Eyebrow>
            <h1 tabIndex={-1} className="t-display-l">
              Tell us about <em className="italic">your organization.</em>
            </h1>
            <p className="t-body-l muted">
              There's no cost, no catch, and no contract. We build for nonprofits, school clubs, and
              community groups.
            </p>
            <div className="checklist">
              <Eyebrow>What happens next</Eyebrow>
              {next.map((item, index) => (
                <p key={item}>
                  <span className="t-mono-sm">0{index + 1}</span>
                  {item}
                </p>
              ))}
            </div>
            <div className="checklist">
              <Eyebrow>What we need from you</Eyebrow>
              <p>A rough idea of what the site should do</p>
              <p>Your text and photos, or help writing them</p>
              <p>One person who can approve things</p>
            </div>
          </div>
          <div className="form-wrap">
            {state === "success" ? (
              <div className="form-success" role="status">
                <p className="t-display-m">Got it.</p>
                <p className="t-body-l">
                  We'll read this and get back to you within a week. Usually sooner.
                </p>
              </div>
            ) : (
              <form
                className="form-panel"
                onSubmit={submit}
                noValidate
                aria-busy={state === "submitting"}
              >
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
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  error={errors.email}
                />
                <Field
                  label="What does your organization do?"
                  name="about"
                  as="textarea"
                  required
                  error={errors.about}
                />
                <Field label="What do you need?" name="need" as="select">
                  <option>Website</option>
                  <option>Mobile app</option>
                  <option>Not sure</option>
                </Field>
                <Field label="Do you have a website now?" name="currentWebsite" type="url" />
                <Field label="Timeline" name="timeline" as="select">
                  <option>No rush</option>
                  <option>Next few months</option>
                  <option>There's a deadline</option>
                </Field>
                <Field label="Anything else" name="anythingElse" as="textarea" />
                <div hidden>
                  <input id="start-gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </div>
                {state === "error" && (
                  <p className="form-error t-mono" role="alert">
                    That didn't send. The form endpoint may still need to be configured; your
                    answers are preserved.
                  </p>
                )}
                <Button type="submit" size="lg" disabled={state === "submitting"}>
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
