import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_DIR = path.resolve(__dirname, "..", "content", "whats-new");

const parseScalar = (value) => {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
};

const parseFrontmatter = (rawFrontmatter) => {
  const result = {};
  let currentListKey = null;

  rawFrontmatter.split("\n").forEach((line) => {
    if (!line.trim()) {
      return;
    }

    if (currentListKey && line.startsWith("  - ")) {
      result[currentListKey].push(parseScalar(line.slice(4)));
      return;
    }

    const match = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);
    if (!match) {
      currentListKey = null;
      return;
    }

    const [, key, value] = match;

    if (!value) {
      result[key] = [];
      currentListKey = key;
      return;
    }

    result[key] = parseScalar(value);
    currentListKey = null;
  });

  return result;
};

const parseMarkdownFile = (raw) => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error("What's New markdown file is missing frontmatter.");
  }

  const [, frontmatter] = match;
  return parseFrontmatter(frontmatter);
};

const compareVersionsDesc = (left, right) => {
  const leftParts = left.split(".").map((part) => Number.parseInt(part, 10));
  const rightParts = right.split(".").map((part) => Number.parseInt(part, 10));
  const maxLength = Math.max(leftParts.length, rightParts.length);

  for (let index = 0; index < maxLength; index += 1) {
    const leftValue = leftParts[index] ?? 0;
    const rightValue = rightParts[index] ?? 0;

    if (leftValue !== rightValue) {
      return rightValue - leftValue;
    }
  }

  return 0;
};

const readEntries = () => {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const version = entry.name;

      return ["en", "de"].flatMap((locale) => {
        const filePath = path.join(CONTENT_DIR, version, `${locale}.md`);
        if (!fs.existsSync(filePath)) {
          return [];
        }

        const raw = fs.readFileSync(filePath, "utf8");
        const data = parseMarkdownFile(raw);

        return [
          {
            locale,
            publishedAt: data.publishedAt,
            summary: data.summary,
            title: data.title,
            version: data.version ?? version,
          },
        ];
      });
    })
    .sort((left, right) => compareVersionsDesc(left.version, right.version));
};

export const getWhatsNewEntries = () => readEntries();

export const getWhatsNewEntry = (locale, version) =>
  readEntries().find((entry) => entry.locale === locale && entry.version === version);

export const getWhatsNewVersions = () =>
  [...new Set(readEntries().map((entry) => entry.version))].sort(compareVersionsDesc);

export const getLocalizedWhatsNewRoutes = (locale) => {
  const prefix = locale === "en" ? "/en" : "";
  return [
    `${prefix}/whats-new`,
    ...getWhatsNewVersions().map((version) => `${prefix}/whats-new/${version}`),
  ];
};
