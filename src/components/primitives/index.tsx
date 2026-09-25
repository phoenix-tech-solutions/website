import {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

type ButtonProps = {
  variant?: "primary" | "secondary" | "accent";
  size?: "md" | "lg";
  /** Internal route, rendered as a router link. */
  to?: string;
  /** External URL, opened in a new tab. */
  href?: string;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};
export function Button({
  variant = "primary",
  size = "md",
  to,
  href,
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = cn("button", `button--${variant}`, size === "lg" && "button--lg", className);
  if (to)
    return (
      <Link className={classes} to={to} viewTransition onClick={rest.onClick}>
        {children}
      </Link>
    );
  if (href)
    return (
      <ExternalLink className={classes} href={href}>
        {children}
      </ExternalLink>
    );
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
export function ExternalLink({
  href,
  children,
  className = "text-link",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container", className)}>{children}</div>;
}
export function Section({
  children,
  id,
  tone,
  ruleTop = false,
  className,
  labelledby,
}: {
  children: ReactNode;
  id?: string;
  tone?: "sunk";
  ruleTop?: boolean;
  className?: string;
  labelledby?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledby}
      className={cn("section", tone && `section--${tone}`, ruleTop && "section--rule", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
export function Screenshot({
  src,
  alt,
  sizes = "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 400px",
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("shot", className)}>
      <div className="shot__frame">
        <img
          src={src}
          srcSet={`${src.replace(/\.webp$/, "-800.webp")} 800w, ${src} 1600w`}
          sizes={sizes}
          alt={alt}
          width="1600"
          height="900"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
        />
      </div>
    </div>
  );
}
export function Icon({ name }: { name: "menu" | "close" }) {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden>
      <path
        d={name === "menu" ? "M2 5h12M2 11h12" : "M3 3l10 10M13 3L3 13"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
type FieldProps = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  as?: "input" | "textarea" | "select";
  children?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> &
  SelectHTMLAttributes<HTMLSelectElement>;
export function Field({
  label,
  name,
  error,
  required,
  as = "input",
  children,
  ...props
}: FieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const common = {
    id,
    name,
    "aria-required": required || undefined,
    "aria-invalid": !!error,
    "aria-describedby": error ? errorId : undefined,
    required,
  };
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      {as === "textarea" ? (
        <textarea {...common} {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : as === "select" ? (
        <select {...common} {...(props as SelectHTMLAttributes<HTMLSelectElement>)}>
          {children}
        </select>
      ) : (
        <input {...common} {...(props as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && (
        <p id={errorId} className="field__error">
          {error}
        </p>
      )}
    </div>
  );
}
