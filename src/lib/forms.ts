export type FormState = "idle" | "submitting" | "success" | "error";
export function validateForm(form: HTMLFormElement, required: string[]) {
  const data = new FormData(form);
  const errors: Record<string, string> = {};
  for (const name of required) {
    if (!String(data.get(name) ?? "").trim()) errors[name] = "This field is required.";
  }
  const email = String(data.get("email") ?? "");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address.";
  return errors;
}
export async function postForm(form: HTMLFormElement, id: string) {
  if (!id) throw new Error("missing-endpoint");
  const response = await fetch(`https://formspree.io/f/${id}`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new FormData(form),
  });
  if (!response.ok) throw new Error("submit-failed");
}
