import { FormEvent, useState } from "react";
import { Button, Container, Eyebrow, Field, Section, StatusDot } from "../components/primitives";
import { FormState, postForm, validateForm } from "../lib/forms";
import { useDocumentHead } from "../lib/useDocumentHead";
export default function Join() {
  useDocumentHead("Join · Phoenix Tech Solutions");
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const next = validateForm(form, ["name", "school", "email", "work", "why"]);
    setErrors(next);
    if (Object.keys(next).length) return;
    setState("submitting");
    try {
      await postForm(form, import.meta.env.VITE_FORMSPREE_JOIN ?? "");
      setState("success");
    } catch {
      setState("error");
    }
  }
  return (
    <>
      <header className="page-header">
        <Container>
          <Eyebrow accent>For students</Eyebrow>
          <h1 tabIndex={-1} className="t-display-l">
            Build things that get <em className="italic">used.</em>
          </h1>
          <p className="t-body-l muted measure">
            Real clients, real deadlines, real deployments, and a portfolio that isn't another to-do
            app.
          </p>
        </Container>
      </header>
      <Section ruleTop labelledby="join-work">
        <Eyebrow>What you'd actually do</Eyebrow>
        <h2 id="join-work" className="sr-only">
          The work
        </h2>
        <div className="service-list">
          {[
            ["01", "Design", "Turn a client's rough idea into screens they can understand."],
            ["02", "Build", "Write the code, test it on real devices, and put it online."],
            [
              "03",
              "Talk to clients",
              "Ask useful questions, show progress, and listen when something is wrong.",
            ],
          ].map(([index, title, body]) => (
            <article className="service-row" key={title}>
              <span className="t-mono muted">{index}</span>
              <div>
                <h3 className="t-heading">{title}</h3>
                <p className="muted measure">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section ground="raised" labelledby="expect-title">
        <h2 id="expect-title" className="t-display-m">
          What we expect.
        </h2>
        <p className="t-body-l muted measure">
          A few hours a week. You finish what you start. You show up to client calls and say early
          when you're stuck. That's the job.
        </p>
        <div className="open-roles">
          <p>
            <StatusDot status="building" label="Open" /> Design
          </p>
          <p>
            <StatusDot status="building" label="Open" /> Front-end development
          </p>
          <p>
            <StatusDot status="building" label="Open" /> Mobile development
          </p>
        </div>
      </Section>
      <Section labelledby="apply-title">
        <div className="form-layout">
          <div className="form-copy">
            <Eyebrow>Application</Eyebrow>
            <h2 id="apply-title" className="t-display-m">
              Tell us what you want to make.
            </h2>
          </div>
          <div className="form-wrap">
            {state === "success" ? (
              <div className="form-success" role="status">
                <p className="t-display-m">Got it.</p>
                <p>We'll read your application and follow up soon.</p>
              </div>
            ) : (
              <form
                className="form-panel"
                onSubmit={submit}
                noValidate
                aria-busy={state === "submitting"}
              >
                <Field label="Name" name="name" required error={errors.name} />
                <Field label="School / grade" name="school" required error={errors.school} />
                <Field label="Email" name="email" type="email" required error={errors.email} />
                <Field
                  label="What do you want to work on?"
                  name="work"
                  as="textarea"
                  required
                  error={errors.work}
                />
                <Field label="Show us something you've made" name="portfolio" type="url" />
                <Field label="Why PTS?" name="why" as="textarea" required error={errors.why} />
                <div hidden>
                  <input name="_gotcha" tabIndex={-1} />
                </div>
                {state === "error" && (
                  <p className="form-error t-mono" role="alert">
                    That didn't send. Your answers are preserved.
                  </p>
                )}
                <Button type="submit" size="lg" disabled={state === "submitting"}>
                  {state === "submitting" ? "Sending…" : "Send application"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
