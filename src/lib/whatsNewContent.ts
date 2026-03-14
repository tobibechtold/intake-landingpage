import { Language } from "@/i18n/translations";

export interface WhatsNewEntry {
  bodyHtml: string;
  coverImage: string;
  highlights: string[];
  locale: Language;
  publishedAt: string;
  slug: string;
  summary: string;
  title: string;
  version: string;
  video?: string;
}

type FrontmatterValue = string | string[];

const markdownModules = import.meta.glob("../../content/whats-new/*/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const assetModules = import.meta.glob("../../content/whats-new/*/assets/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const parseScalar = (value: string): string => {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
};

const parseFrontmatter = (rawFrontmatter: string): Record<string, FrontmatterValue> => {
  const result: Record<string, FrontmatterValue> = {};
  let currentListKey: string | null = null;

  rawFrontmatter.split("\n").forEach((line) => {
    if (!line.trim()) {
      return;
    }

    if (currentListKey && line.startsWith("  - ")) {
      (result[currentListKey] as string[]).push(parseScalar(line.slice(4)));
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

const applyInlineMarkdown = (value: string, version: string): string => {
  let html = escapeHtml(value);

  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, href: string) => {
    const resolvedHref = href.startsWith("./assets/")
      ? resolveAssetPath(version, href)
      : href;

    return `<a href="${escapeHtml(resolvedHref)}">${label}</a>`;
  });

  return html;
};

const renderMarkdown = (body: string, version: string): string => {
  const blocks = body
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks
    .map((block) => {
      const imageMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        const [, alt, src] = imageMatch;
        return `<figure><img src="${escapeHtml(resolveAssetPath(version, src))}" alt="${escapeHtml(
          alt
        )}" loading="lazy" /></figure>`;
      }

      if (block.startsWith("### ")) {
        return `<h3>${applyInlineMarkdown(block.slice(4), version)}</h3>`;
      }

      if (block.startsWith("## ")) {
        return `<h2>${applyInlineMarkdown(block.slice(3), version)}</h2>`;
      }

      if (block.startsWith("# ")) {
        return `<h1>${applyInlineMarkdown(block.slice(2), version)}</h1>`;
      }

      const listItems = block
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("- "));

      if (listItems.length > 0 && listItems.length === block.split("\n").length) {
        const items = listItems
          .map((line) => `<li>${applyInlineMarkdown(line.slice(2), version)}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }

      const paragraph = block
        .split("\n")
        .map((line) => line.trim())
        .join(" ");

      return `<p>${applyInlineMarkdown(paragraph, version)}</p>`;
    })
    .join("\n");
};

const parseMarkdownFile = (raw: string) => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error("What's New markdown file is missing frontmatter.");
  }

  const [, frontmatter, body] = match;
  return {
    body,
    data: parseFrontmatter(frontmatter),
  };
};

const getAssetModuleKey = (version: string, relativePath: string) =>
  `../../content/whats-new/${version}/${relativePath.replace(/^\.\//, "")}`;

const resolveAssetPath = (version: string, relativePath: string): string => {
  const asset = assetModules[getAssetModuleKey(version, relativePath)];

  if (!asset) {
    throw new Error(`Missing What's New asset for ${version}: ${relativePath}`);
  }

  return asset;
};

const compareVersionsDesc = (left: string, right: string): number => {
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

const entries = Object.entries(markdownModules)
  .map(([path, raw]) => {
    const match = path.match(/content\/whats-new\/([^/]+)\/(de|en)\.md$/);
    if (!match) {
      throw new Error(`Unexpected What's New content path: ${path}`);
    }

    const [, version, locale] = match;
    const { data, body } = parseMarkdownFile(raw);

    if (
      typeof data.version !== "string" ||
      typeof data.publishedAt !== "string" ||
      typeof data.title !== "string" ||
      typeof data.summary !== "string" ||
      typeof data.coverImage !== "string"
    ) {
      throw new Error(`Missing required frontmatter fields in What's New entry ${path}`);
    }

    if (data.version !== version) {
      throw new Error(`Version mismatch in What's New entry ${path}`);
    }

    return {
      bodyHtml: renderMarkdown(body, version),
      coverImage: resolveAssetPath(version, data.coverImage),
      highlights: Array.isArray(data.highlights) ? data.highlights : [],
      locale: locale as Language,
      publishedAt: data.publishedAt,
      slug: version,
      summary: data.summary,
      title: data.title,
      version,
      video: typeof data.video === "string" ? resolveAssetPath(version, data.video) : undefined,
    } satisfies WhatsNewEntry;
  })
  .sort((left, right) => compareVersionsDesc(left.version, right.version));

export const getWhatsNewEntries = (locale: Language): WhatsNewEntry[] =>
  entries.filter((entry) => entry.locale === locale);

export const getWhatsNewEntry = (
  version: string,
  locale: Language
): WhatsNewEntry | undefined =>
  entries.find((entry) => entry.locale === locale && entry.version === version);
