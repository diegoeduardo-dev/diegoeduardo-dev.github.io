import { useState } from "preact/hooks";
import {
  links,
  projects,
  type Project,
  type ProjectTopic,
} from "../config/portfolio";
import type { Copy } from "../copy";
import type { Lang } from "../i18n/types";
import { ArrowLink } from "./ArrowLink";
import { Icon } from "./Icon";
import { ProjectActions } from "./ProjectActions";
import { ProjectGallery } from "./ProjectGallery";
import { Reveal } from "./Reveal";
import { Tags } from "./Tags";

type Filter = "all" | ProjectTopic;

function ProjectVisual({
  project,
  lang,
  s,
}: {
  project: Project;
  lang: Lang;
  s: Copy;
}) {
  if (project.images?.length) {
    return (
      <ProjectGallery
        title={project.name}
        images={project.images}
        lang={lang}
        s={s}
      />
    );
  }
  if (project.image) {
    return (
      <a
        className="screenshot-link"
        href={project.repo}
        target="_blank"
        rel="noreferrer"
        aria-label={`${project.name}: ${s.repository}`}
      >
        <img
          src={project.image}
          alt={`${project.name}: ${s.screenshotAlt}`}
          width={800}
          height={500}
          loading="lazy"
        />
        <span className="screenshot-open">
          <Icon name="arrow-up-right" size={22} />
        </span>
      </a>
    );
  }
  return null;
}

export function Projects({ lang, s }: { lang: Lang; s: Copy }) {
  const [filter, setFilter] = useState<Filter>("all");

  const details: Record<string, [string, string]> = {
    zapflow: [s.zap, s.zapText],
    "digital-store": [s.store, s.storeText],
  };

  const filters: [Filter, string][] = [
    ["all", s.all],
    ["java", "Java"],
    ["automation", s.automation],
    ["api", s.api],
  ];
  const shown = projects.filter(
    (project) => filter === "all" || project.topics.includes(filter),
  );

  return (
    <section
      id="projects"
      className="projects-section wrap"
      aria-labelledby="projects-title"
    >
      <div className="section-heading">
        <h2 id="projects-title">{s.selected}</h2>
        <p>{s.projectIntro}</p>
      </div>

      <div className="projects-toolbar">
        <div className="filters" role="group" aria-label={s.projects}>
          {filters.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={filter === key ? "selected" : ""}
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="project-count" aria-live="polite">
          {String(shown.length).padStart(2, "0")} {s.projects.toLowerCase()}
        </span>
      </div>

      <div>
        {shown.map((project) => {
          const [title, text] = details[project.id];
          return (
            <article
              key={project.id}
              className={`project ${project.featured ? "project-featured" : ""}`}
            >
              <Reveal className="project-visual">
                <ProjectVisual project={project} lang={lang} s={s} />
              </Reveal>
              <div className="project-copy">
                <div className="project-meta">
                  <span>{project.name}</span>
                  {project.featured && (
                    <span className="featured-label">{s.featured}</span>
                  )}
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <Tags items={project.tags} />
                <ProjectActions project={project} s={s} />
              </div>
            </article>
          );
        })}
      </div>

      <div className="projects-footer">
        <ArrowLink href={links.github}>
          {s.more}
          <Icon name="github-logo" size={20} />
        </ArrowLink>
      </div>
    </section>
  );
}
