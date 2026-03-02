import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildPrerenderedHtml, PRERENDER_ROUTES } from "./prerender-seo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "..", "dist");
const templatePath = path.join(distDir, "index.html");

const routeToFilePath = (route) => {
  if (route === "/") {
    return path.join(distDir, "index.html");
  }

  const normalized = route.replace(/^\/+/, "");
  return path.join(distDir, normalized, "index.html");
};

const run = async () => {
  const template = await readFile(templatePath, "utf8");

  for (const route of PRERENDER_ROUTES) {
    const outPath = routeToFilePath(route);
    await mkdir(path.dirname(outPath), { recursive: true });
    const rendered = buildPrerenderedHtml(template, route);
    await writeFile(outPath, rendered, "utf8");
  }
};

run().catch((error) => {
  console.error("[prerender] failed:", error);
  process.exit(1);
});
