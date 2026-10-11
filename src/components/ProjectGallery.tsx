import { useEffect, useRef, useState } from "preact/hooks";
import type { ProjectImage } from "../config/portfolio";
import type { Copy } from "../copy";
import type { Lang } from "../i18n/types";
import { Icon } from "./Icon";

function ImageFrame({
  images,
  index,
  previous,
  backwards,
  lang,
  expanded = false,
}: {
  images: ProjectImage[];
  index: number;
  previous: number | null;
  backwards: boolean;
  lang: Lang;
  expanded?: boolean;
}) {
  const current = images[index];
  return (
    <span
      className={`gallery-image-stack ${backwards ? "is-backward" : ""} ${expanded ? "gallery-image-stack-expanded" : ""}`}
    >
      {previous !== null && (
        <img
          key={`${images[previous].src}-${current.src}`}
          className="gallery-image-outgoing"
          src={images[previous].src}
          alt=""
          aria-hidden="true"
          width={1600}
          height={1000}
        />
      )}
      <img
        key={current.src}
        className={`gallery-image ${previous !== null ? "is-changing" : ""} ${expanded ? "gallery-dialog-image" : ""}`}
        src={current.src}
        alt={current.alt[lang]}
        width={1600}
        height={1000}
        loading={expanded ? "eager" : "lazy"}
        decoding="async"
      />
    </span>
  );
}

export function ProjectGallery({
  title,
  images,
  lang,
  s,
}: {
  title: string;
  images: ProjectImage[];
  lang: Lang;
  s: Copy;
}) {
  const [slide, setSlide] = useState<{
    index: number;
    previous: number | null;
    backwards: boolean;
  }>({ index: 0, previous: null, backwards: false });
  const { index, previous, backwards } = slide;
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [reduced, setReduced] = useState(false);
  const root = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = images[index];

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (paused || expanded || reduced || !visible || images.length < 2) return;
    const timer = setInterval(
      () =>
        setSlide((value) => ({
          index: (value.index + 1) % images.length,
          previous: value.index,
          backwards: false,
        })),
      3000,
    );
    return () => clearInterval(timer);
  }, [paused, expanded, reduced, visible, images.length]);

  useEffect(() => {
    if (!visible) return;
    images.forEach((image) => {
      const preload = new Image();
      preload.src = image.src;
    });
  }, [visible, images]);

  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [expanded]);

  function choose(value: number) {
    const next = (value + images.length) % images.length;
    if (next !== index)
      setSlide({ index: next, previous: index, backwards: value < index });
    setPaused(true);
  }
  function keys(event: KeyboardEvent) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      choose(index + (event.key === "ArrowRight" ? 1 : -1));
    }
  }
  function open() {
    setPaused(true);
    dialog.current?.showModal();
    setExpanded(true);
  }

  const controls = (
    <div className="gallery-controls">
      <button
        type="button"
        className="icon-button gallery-prev"
        onClick={() => choose(index - 1)}
        aria-label={s.previousImage}
      >
        <Icon name="arrow-up-right" size={19} />
      </button>
      {!reduced && (
        <button
          type="button"
          className="gallery-pause"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
        >
          {paused ? s.resumeImages : s.pauseImages}
        </button>
      )}
      <button
        type="button"
        className="icon-button gallery-next"
        onClick={() => choose(index + 1)}
        aria-label={s.nextImage}
      >
        <Icon name="arrow-up-right" size={19} />
      </button>
    </div>
  );

  return (
    <section ref={root} onKeyDown={keys} aria-label={`${s.gallery}: ${title}`}>
      <button
        type="button"
        className="screenshot-link gallery-open"
        onClick={open}
        aria-label={`${s.expandImage}: ${current.label[lang]}`}
      >
        <ImageFrame
          images={images}
          index={index}
          previous={previous}
          backwards={backwards}
          lang={lang}
        />
        <span className="screenshot-open">
          <Icon name="arrow-up-right" size={22} />
        </span>
      </button>
      <div className="gallery-footer">
        <div
          className="gallery-description"
          aria-live={paused ? "polite" : "off"}
        >
          <strong>
            {current.label[lang]}{" "}
            <span>
              {index + 1} / {images.length}
            </span>
          </strong>
          <small>{current.caption?.[lang] ?? s.demoEnvironment}</small>
        </div>
        {controls}
      </div>
      <div className="gallery-dots" role="group" aria-label={s.chooseImage}>
        {images.map((image, i) => (
          <button
            type="button"
            key={image.src}
            className={i === index ? "selected" : ""}
            onClick={() => choose(i)}
            aria-label={image.label[lang]}
            aria-pressed={i === index}
          />
        ))}
      </div>
      <dialog
        className="gallery-dialog"
        ref={dialog}
        aria-labelledby="gallery-dialog-title"
        onClose={() => setExpanded(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <div onKeyDown={keys}>
          <div className="gallery-dialog-header">
            <div>
              <h3 id="gallery-dialog-title">
                {title} · {current.label[lang]}
              </h3>
              <p>{current.caption?.[lang] ?? s.demoEnvironment}</p>
            </div>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => dialog.current?.close()}
            >
              {s.closeGallery}
            </button>
          </div>
          <ImageFrame
            images={images}
            index={index}
            previous={previous}
            backwards={backwards}
            lang={lang}
            expanded
          />
          <div className="gallery-dialog-footer">
            <span>
              {index + 1} / {images.length}
            </span>
            {controls}
          </div>
        </div>
      </dialog>
    </section>
  );
}
