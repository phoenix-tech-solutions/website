import {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { useInView } from "../../lib/useInView";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  href?: string;
  as?: "link";
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};
export function Button({
  variant = "primary",
  size = "md",
  href,
  as,
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = cn("button", `button--${variant}`, size === "lg" && "button--lg", className);
  if (href && as === "link")
    return (
      <Link className={classes} to={href} onClick={rest.onClick}>
        {children}
      </Link>
    );
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        className={classes}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
        {external && <span aria-hidden>↗</span>}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
export function Eyebrow({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <p className="eyebrow t-mono">
      {accent && <span className="eyebrow__mark" aria-hidden />}
      {children}
    </p>
  );
}
export function Rule({
  tone = "default",
  animated = false,
}: {
  tone?: "default" | "strong";
  animated?: boolean;
}) {
  const { ref, inView } = useInView<HTMLHRElement>();
  return (
    <hr
      ref={ref}
      className={cn("rule", tone === "strong" && "rule--strong", animated && "rule--animated")}
      data-visible={!animated || inView}
    />
  );
}
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container", className)}>{children}</div>;
}
export function Section({
  children,
  id,
  ground = "bone",
  bleed = false,
  ruleTop = false,
  className,
  labelledby,
}: {
  children: ReactNode;
  id?: string;
  ground?: "bone" | "ash" | "raised";
  bleed?: boolean;
  ruleTop?: boolean;
  className?: string;
  labelledby?: string;
}) {
  const body = bleed ? children : <Container>{children}</Container>;
  return (
    <section
      id={id}
      aria-labelledby={labelledby}
      className={cn(
        "section",
        ground !== "bone" && `section--${ground}`,
        ruleTop && "section--rule",
        className,
      )}
    >
      {body}
    </section>
  );
}
export function Editorial({ children, rail }: { children: ReactNode; rail: ReactNode }) {
  return (
    <div className="editorial">
      <div className="editorial__main">{children}</div>
      <aside className="editorial__rail">{rail}</aside>
    </div>
  );
}
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("prose", className)}>{children}</div>;
}
export function StatusDot({
  status,
  label,
}: {
  status: "live" | "building" | "queued";
  label?: string;
}) {
  return (
    <span className="status">
      <span
        className={cn("status__dot", status !== "live" && `status__dot--${status}`)}
        aria-hidden
      />
      {label && <span>{label}</span>}
      <span className="sr-only">{!label && status}</span>
    </span>
  );
}
export function Icon({ name }: { name: "arrow" | "external" | "menu" | "close" }) {
  if (name === "menu")
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden>
        <path d="M2 5h12M2 11h12" fill="none" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    );
  if (name === "close")
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden>
        <path d="M3 3l10 10M13 3L3 13" fill="none" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    );
  return <span aria-hidden>{name === "external" ? "↗" : "→"}</span>;
}
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal-clip" data-visible={reduced || inView}>
      <div className="reveal-inner" style={{ transitionDelay: `${delay}s` }}>
        {children}
      </div>
    </div>
  );
}
export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.6 });
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!inView || reduced) return;
    let start = 0;
    let frame = 0;
    const tick = (time: number) => {
      if (!start) start = time;
      const p = Math.min(1, (time - start) / duration);
      setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, inView, reduced, value]);
  return (
    <span ref={ref} className="t-numeral">
      <span className="sr-only">
        {prefix}
        {value}
        {suffix}
      </span>
      <span aria-hidden>
        {prefix}
        {reduced ? value : shown}
        {suffix}
      </span>
    </span>
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
      <label className="t-mono" htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      {as === "textarea" ? (
        <textarea {...common} {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : as === "select" ? (
        <select {...common} {...(props as SelectHTMLAttributes<HTMLSelectElement>)}>
          {children}
        </select>
      ) : (
        <input {...common} {...(props as InputHTMLAttributes<HTMLInputElement>)} />
      )}{" "}
      {error && (
        <p id={errorId} className="field__error t-mono-sm">
          {error}
        </p>
      )}
    </div>
  );
}
export function Chip({
  children,
  selected,
  onClick,
  onKeyDown,
}: {
  children: ReactNode;
  selected: boolean;
  onClick: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      className="chip t-mono-sm"
      aria-selected={selected}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  );
}
