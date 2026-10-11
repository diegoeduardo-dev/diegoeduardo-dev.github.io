import { experience } from "../config/portfolio";
import type { Copy } from "../copy";
import type { Lang } from "../i18n/types";
import { formatMonth } from "../lib/date";
import { Tags } from "./Tags";

export function Experience({ lang, s }: { lang: Lang; s: Copy }) {
  const details: Record<string, string[]> = s.jobDetails;
  return (
    <section
      id="experience"
      className="experience-section wrap"
      aria-labelledby="experience-title"
    >
      <div className="experience-grid">
        <h2 id="experience-title" className="multiline">
          {s.work}
        </h2>
        <ol>
          {experience.map((job) => (
            <li className="job" key={job.id}>
              <div className="job-date">
                <span>
                  <time dateTime={job.start}>
                    {formatMonth(job.start, lang)}
                  </time>
                  {job.end !== job.start && (
                    <>
                      {" "}
                      —{" "}
                      {job.end ? (
                        <time dateTime={job.end}>
                          {formatMonth(job.end, lang)}
                        </time>
                      ) : (
                        s.now
                      )}
                    </>
                  )}
                </span>
                {job.place && <span>{job.place[lang]}</span>}
              </div>
              <h3>{job.org}</h3>
              <p className="job-role">{job.title[lang]}</p>
              {job.parts?.map((part) => (
                <div className="job-part" key={part.id}>
                  <h4>{part.name[lang]}</h4>
                  <ul className="job-details">
                    {details[part.id].map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                  <Tags items={part.tech} />
                </div>
              ))}
              {job.tech && (
                <>
                  <ul className="job-details">
                    {details[job.id].map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                  <Tags items={job.tech} />
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
