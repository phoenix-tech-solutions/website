import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { useInView } from "../../lib/useInView";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";

const CELLS: [number, number][] = [
  [2, 0],
  [1, 1],
  [3, 1],
  [0, 2],
  [2, 2],
  [4, 2],
  [0, 3],
  [1, 3],
  [3, 3],
  [4, 3],
  [0, 4],
  [1, 4],
  [2, 4],
  [3, 4],
  [4, 4],
];

export function Mark({
  size = 20,
  animated = false,
  title = true,
}: {
  size?: number;
  animated?: boolean;
  title?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <svg
      viewBox="0 0 19 19"
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>Phoenix Tech Solutions</title>}
      {CELLS.map(([x, y], index) => (
        <rect
          key={`${x}-${y}`}
          x={x * 4}
          y={y * 4}
          width="3"
          height="3"
          fill={index === 0 ? "var(--color-ember)" : "currentColor"}
          style={{ animationDelay: `${(4 - y) * 0.04}s` }}
          className={cn(
            animated && !reduced && "mark-cell--animated",
            index === 0 && animated && "mark-apex",
          )}
        />
      ))}
    </svg>
  );
}

export function Lockup({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      to="/"
      className={cn("lockup", inverted && "lockup--inverted")}
      aria-label="Phoenix Tech Solutions home"
    >
      <Mark animated />
      <span>
        <strong>Phoenix</strong> <span>Tech Solutions</span>
      </span>
    </Link>
  );
}
export function Grain() {
  return <div className="grain" aria-hidden />;
}
export function DotGrid() {
  return <div className="dot-grid" aria-hidden />;
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

function noise(x: number, y: number) {
  const value = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return value - Math.floor(value);
}
function mix(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((value, i) => Math.round(value + (pb[i] - value) * t)).join(",")})`;
}

export function EmberField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const pointer = useRef({ x: -999, y: -999, active: false });
  const draw = useCallback((canvas: HTMLCanvasElement, staticOnly = false) => {
    const box = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(box.width * dpr);
    canvas.height = Math.round(box.height * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return () => undefined;
    ctx.scale(dpr, dpr);
    let pitch = innerWidth < 640 ? 12 : 9;
    while (Math.ceil(box.width / pitch) * Math.ceil(box.height / pitch) > 2600) pitch += 1;
    const cols = Math.ceil(box.width / pitch),
      rows = Math.ceil(box.height / pitch);
    const base = new Float32Array(cols * rows);
    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols; col++)
        base[row * cols + col] = Math.min(
          0.5,
          noise(col * 0.09, row * 0.09) * 0.34 + (row / rows) * 0.22,
        );
    const heat = new Float32Array(base);
    let raf = 0,
      t = 0,
      last = 0,
      running = true;
    const frame = (time = 0) => {
      if (!running) return;
      const throttle = cols * rows > 1800 || (navigator.hardwareConcurrency ?? 8) <= 4;
      if (!staticOnly && throttle && time - last < 33) {
        raf = requestAnimationFrame(frame);
        return;
      }
      last = time;
      ctx.clearRect(0, 0, box.width, box.height);
      t += 0.006;
      for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col;
          let value = staticOnly
            ? base[i]
            : Math.max(base[i] + Math.sin(t + col * 0.22 + row * 0.16) * 0.05, heat[i] * 0.938);
          if (pointer.current.active && !staticOnly) {
            const distance = Math.hypot(
              col * pitch + pitch / 2 - pointer.current.x,
              row * pitch + pitch / 2 - pointer.current.y,
            );
            if (distance < 150) value += (1 - distance / 150) ** 2 * 0.42;
          }
          value = Math.min(1, value);
          heat[i] = value;
          ctx.fillStyle =
            value < 0.5
              ? mix("#A9A093", "#BF3B1E", value * 2)
              : mix("#BF3B1E", "#E8663F", (value - 0.5) * 2);
          const size = pitch * (0.34 + value * 0.62);
          ctx.fillRect(
            col * pitch + (pitch - size) / 2,
            row * pitch + (pitch - size) / 2,
            size,
            size,
          );
        }
      if (!staticOnly) raf = requestAnimationFrame(frame);
    };
    frame();
    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let intersecting = true;
    let stop = draw(canvas, reduced);
    const sync = () => {
      stop();
      if (reduced || (intersecting && !document.hidden)) stop = draw(canvas, reduced);
    };
    const resize = new ResizeObserver(sync);
    resize.observe(canvas);
    const observer = reduced
      ? null
      : new IntersectionObserver(([entry]) => {
          intersecting = entry.isIntersecting;
          sync();
        });
    observer?.observe(canvas);
    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
    };
    const leave = () => {
      pointer.current.active = false;
    };
    canvas.addEventListener("pointermove", move, { passive: true });
    for (const event of ["pointerleave", "pointerup", "pointercancel"])
      canvas.addEventListener(event, leave);
    document.addEventListener("visibilitychange", sync);
    return () => {
      stop();
      observer?.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", sync);
      canvas.removeEventListener("pointermove", move);
      for (const event of ["pointerleave", "pointerup", "pointercancel"])
        canvas.removeEventListener(event, leave);
    };
  }, [draw, reduced]);
  return (
    <canvas
      ref={ref}
      className="ember-field"
      role="img"
      aria-label="An animated field of embers that warms where the cursor moves."
    />
  );
}

export function BuiltByBadge({
  variant = "light",
  clientSlug = "client",
}: {
  variant?: "light" | "dark" | "minimal";
  clientSlug?: string;
}) {
  return (
    <a
      className={cn("built-badge", `built-badge--${variant}`)}
      href={`https://phoenixtechsolutions.org?ref=${encodeURIComponent(clientSlug)}`}
      target="_blank"
      rel="noopener"
    >
      <Mark size={14} title={false} />
      <span className="t-mono-sm">Built by Phoenix Tech Solutions</span>
    </a>
  );
}
