import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

// Same geometry as public/phoenix-wing-navy.svg, top feather first. Each navy shade is tucked
// under its terracotta face so the two never leave a seam.
export const FEATHERS = [
  {
    shade: "M191.7 61.5L51.7 141.5L19.1 212.5L35.2 204.9L61.7 152L192.9 62.4Z",
    face: "M273.7 5.5L222.7 111.5L77.7 191.5L86.2 173.1L185.7 96.5L74.2 164.1L48.7 219.5L6.3 240.5L19.1 212.5L33.9 204.1L60.4 151.2Z",
  },
  {
    shade: "M241.7 124.5L86.7 201L199.7 162.5L184.7 206.5Z",
    face: "M205.7 154.5L184.7 206.5L58.4 237.8L175.7 184L64.7 218.5L86.7 201Z",
  },
  {
    shade: "M180.7 225.5L71.7 247.9L136.7 250.5L121.7 274.5Z",
    face: "M143.7 243.5L121.7 274.5L7.7 270.5L113.7 258.5L35.7 255.3L71.7 247.9Z",
  },
];

/**
 * The wing mark. `progress` builds it up in four steps: bottom feather, middle, top, then the
 * navy shading. Unbuilt feathers render as a dashed outline, and so does a `missing` one.
 */
export function Mark({
  size = 32,
  label,
  progress = 4,
  missing,
  enter = false,
}: {
  size?: number;
  label?: string;
  progress?: number;
  missing?: 0 | 1 | 2;
  enter?: boolean;
}) {
  return (
    <svg
      className={cn("brand-mark", enter && "brand-mark--enter")}
      viewBox="0 0 280 280"
      width={size}
      height={size}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {FEATHERS.map((feather, index) => {
        const present = missing !== index;
        return (
          <g
            key={feather.face}
            className="brand-mark__feather"
            style={{ "--i": FEATHERS.length - 1 - index } as CSSProperties}
          >
            <path
              className="brand-mark__shade"
              d={feather.shade}
              data-on={present && progress >= 4}
            />
            <path
              className="brand-mark__face"
              d={feather.face}
              data-on={present && progress >= FEATHERS.length - index}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function Lockup({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      viewTransition
      className={cn("lockup", className)}
      aria-label="Phoenix Tech Solutions home"
    >
      <Mark size={30} />
      <span className="lockup__name">
        Phoenix <span>Tech Solutions</span>
      </span>
    </Link>
  );
}
