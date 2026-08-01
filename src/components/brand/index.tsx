import { CSSProperties, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { useInView } from "../../lib/useInView";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";

export function Mark({
  size = 32,
  animated = false,
  title = true,
}: {
  size?: number;
  animated?: boolean;
  title?: boolean;
}) {
  return (
    <img
      className={cn("brand-mark", animated && "brand-mark--animated")}
      src="/phoenix-mark.png"
      alt={title ? "Phoenix Tech Solutions" : ""}
      width={size}
      height={size}
    />
  );
}

export function Lockup({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      to="/"
      className={cn("lockup", inverted && "lockup--inverted")}
      aria-label="Phoenix Tech Solutions home"
    >
      <img className="nav-logo" src="/phoenix-logo.webp" alt="" width="1024" height="1024" />
    </Link>
  );
}

const cycle = [
  {
    label: "Listen",
    detail: "We learn what your organization and its users need.",
  },
  {
    label: "Build",
    detail: "You review working screens while we design and develop.",
  },
  {
    label: "Launch",
    detail: "Your site goes live with the code, access, and a walkthrough.",
  },
] as const;

export function ProjectCycle() {
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const step = cycle[active];

  return (
    <div
      className="project-cycle"
      data-step={active + 1}
      style={{ "--cycle-turn": `${active * 120}deg` } as CSSProperties}
      onPointerMove={(event) => {
        if (reduced) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        event.currentTarget.style.setProperty("--cycle-rx", `${y * -2.4}deg`);
        event.currentTarget.style.setProperty("--cycle-ry", `${x * 2.4}deg`);
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--cycle-rx", "0deg");
        event.currentTarget.style.setProperty("--cycle-ry", "0deg");
      }}
    >
      <div className="project-cycle__top t-mono">
        <span>Project cycle</span>
        <span>0{active + 1} / 03</span>
      </div>

      <div className="project-cycle__visual" aria-hidden>
        <div className="project-cycle__orbit" />
        <div className="project-cycle__orbit project-cycle__orbit--inner" />
        <div className="project-cycle__dial">
          <span className="project-cycle__node project-cycle__node--one" />
          <span className="project-cycle__node project-cycle__node--two" />
          <span className="project-cycle__node project-cycle__node--three" />
        </div>
        <div className="project-cycle__core">
          <Mark size={116} title={false} />
        </div>
      </div>

      <div className="project-cycle__steps" aria-label="Explore our project process">
        {cycle.map((item, index) => (
          <button
            key={item.label}
            type="button"
            aria-pressed={active === index}
            aria-describedby="cycle-detail"
            onClick={() => setActive(index)}
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <span className="t-mono-sm">0{index + 1}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div id="cycle-detail" className="project-cycle__detail" role="status" aria-live="polite">
        <span className="t-mono">{step.label}</span>
        <p>{step.detail}</p>
      </div>
    </div>
  );
}

type DitherProps = {
  src: string;
  dither?: string;
  alt: string;
  ratio?: `${number}/${number}`;
  trigger?: "view" | "hover" | "both";
  priority?: boolean;
  className?: string;
};

export function DitherImage({
  src,
  dither = src.replace(/\.webp$/, ".dither.png"),
  alt,
  ratio = "4/3",
  trigger = "both",
  priority = false,
  className,
}: DitherProps) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const [hovered, setHovered] = useState(false);
  const resolved = reduced || (trigger !== "hover" && inView) || (trigger !== "view" && hovered);
  return (
    <div
      ref={ref}
      className={cn("dither", className)}
      style={{ aspectRatio: ratio }}
      data-resolved={resolved}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <img
        src={src}
        srcSet={`${src.replace(/\.webp$/, "-800.webp")} 800w, ${src} 1600w`}
        sizes={ratio === "16/9" ? "100vw" : "(max-width: 1023px) 100vw, 58vw"}
        alt={alt}
        width="1600"
        height="1200"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
      />
      {!reduced && (
        <img
          className="dither__top"
          src={dither}
          alt=""
          aria-hidden
          width="780"
          height="585"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      )}
    </div>
  );
}
