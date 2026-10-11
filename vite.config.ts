import { defineConfig, type Plugin } from "vite";
import preact from "@preact/preset-vite";
import { SITE_BASE, SITE_ORIGIN } from "./site.config.ts";

const HREFLANG = { "pt-BR": "", en: "en/", es: "es/" } as const;
const home = SITE_ORIGIN + SITE_BASE;

function seoFiles(): Plugin {
  return {
    name: "seo-files",
    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10);
      const alternates = Object.entries(HREFLANG)
        .map(
          ([l, p]) =>
            `    <xhtml:link rel="alternate" hreflang="${l}" href="${home}${p}"/>`,
        )
        .concat(
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${home}"/>`,
        )
        .join("\n");
      const urls = Object.values(HREFLANG)
        .map(
          (p) =>
            `  <url>\n    <loc>${home}${p}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`,
        )
        .join("\n");
      const emit = (fileName: string, source: string) =>
        this.emitFile({ type: "asset", fileName, source });
      emit(
        "sitemap.xml",
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
      );

      emit(
        "robots.txt",
        `User-agent: *\nAllow: /\n\nSitemap: ${home}sitemap.xml\n`,
      );
      emit(
        "404.html",
        `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>404 | Diego Eduardo</title><style>body{font:16px/1.6 system-ui,sans-serif;display:grid;place-content:center;min-height:100vh;margin:0;padding:1.5rem;text-align:center}a{color:#2948b8}</style></head><body><h1>404</h1><p>Página não encontrada. / Page not found. / Página no encontrada.</p><p><a href="${SITE_BASE}">${home}</a></p></body></html>`,
      );
    },
  };
}

export default defineConfig({
  base: SITE_BASE,
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#root",
        additionalPrerenderRoutes: ["/en/", "/es/"],
      },
    }),
    seoFiles(),
  ],
});
