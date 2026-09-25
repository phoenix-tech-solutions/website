import { CSSProperties, useId } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { FEATHERS } from "../brand";
import { ExternalLink, Screenshot } from "../primitives";
import { Project } from "../../content/projects";

export function ProjectCard({ project }: { project: Project }) {
  const body = (
    <>
      {project.cover && (
        <Screenshot src={project.cover} alt={`Homepage of the ${project.title} website`} />
      )}
      <h3 className="t-h3">{project.client}</h3>
    </>
  );
  return (
    <li className="project-card">
      {project.story ? (
        <Link to={`/work/${project.slug}`} viewTransition className="project-card__link">
          {body}
        </Link>
      ) : project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card__link"
        >
          {body}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <div className="project-card__link">{body}</div>
      )}
      <p className="t-label">
        {project.sector}, {project.year}
      </p>
      {project.summary && <p className="muted">{project.summary}</p>}
      {project.url && <ExternalLink href={project.url}>Visit the site</ExternalLink>}
    </li>
  );
}

// Where each screenshot sits inside its feather: rotated to run along the feather, and sized
// to cover the whole shape. Coordinates are in the mark's 280-unit viewBox.
const PLACEMENT = [
  { angle: -33, cx: 142, cy: 118, width: 340 },
  { angle: -20, cx: 134, cy: 196, width: 230 },
  { angle: -6, cx: 102, cy: 274, width: 200 },
];

/**
 * The wing mark with a client site inside each feather, top feather first. Each feather links to
 * its case study.
 */
export function SiteWing({ projects, enter }: { projects: Project[]; enter: boolean }) {
  const id = `wing${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg className={cn("wing", enter && "wing--enter")} viewBox="0 0 280 280" role="group">
      <defs>
        {FEATHERS.map((feather, index) => (
          <clipPath key={feather.face} id={`${id}-${index}`}>
            <path d={feather.face} />
          </clipPath>
        ))}
      </defs>
      {projects.slice(0, FEATHERS.length).map((project, index) => {
        const { angle, cx, cy, width } = PLACEMENT[index];
        const height = (width * 9) / 16;
        return (
          <Link
            key={project.slug}
            to={`/work/${project.slug}`}
            viewTransition
            className={`feather feather--${index + 1}`}
            aria-label={`${project.client} case study`}
            style={{ "--i": FEATHERS.length - 1 - index } as CSSProperties}
          >
            <path className="feather__shade" d={FEATHERS[index].shade} />
            <g clipPath={`url(#${id}-${index})`}>
              <path className="feather__base" d={FEATHERS[index].face} />
              {project.cover && (
                <image
                  href={project.cover.replace(/\.webp$/, "-800.webp")}
                  x={cx - width / 2}
                  y={cy - height / 2}
                  width={width}
                  height={height}
                  preserveAspectRatio="xMidYMin slice"
                  transform={`rotate(${angle} ${cx} ${cy})`}
                />
              )}
            </g>
          </Link>
        );
      })}
    </svg>
  );
}
