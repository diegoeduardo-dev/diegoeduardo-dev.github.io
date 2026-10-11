import type { Project } from "../config/portfolio";
import type { Copy } from "../copy";
import { Icon } from "./Icon";

function destination(value?: string) {
  const url = value?.trim();
  return url && /^https?:\/\//i.test(url) ? url : undefined;
}

export function ProjectActions({
  project,
  s,
}: {
  project: Pick<Project, "repo" | "demo">;
  s: Copy;
}) {
  const repo = destination(project.repo);
  const demo = destination(project.demo);

  if (!repo && !demo) return null;
  const github = (
    <>
      <Icon name="github-logo" size={20} />
      GitHub
    </>
  );
  const preview = (
    <>
      {s.preview}
      <Icon name="arrow-up-right" size={19} />
    </>
  );

  return (
    <div className="project-actions">
      {repo ? (
        <a
          className="button project-button project-button-github"
          href={repo}
          target="_blank"
          rel="noreferrer"
        >
          {github}
        </a>
      ) : (
        <button
          type="button"
          className="button project-button project-button-github"
          disabled
          title={s.repoUnavailable}
        >
          {github}
        </button>
      )}
      {demo ? (
        <a
          className="button project-button project-button-preview"
          href={demo}
          target="_blank"
          rel="noreferrer"
        >
          {preview}
        </a>
      ) : (
        <button
          type="button"
          className="button project-button project-button-preview"
          disabled
          title={s.previewUnavailable}
        >
          {preview}
        </button>
      )}
    </div>
  );
}
