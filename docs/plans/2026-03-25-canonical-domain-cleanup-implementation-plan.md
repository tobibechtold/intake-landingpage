# Canonical Domain Cleanup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the legacy production SEO host with `https://www.getintake.de` everywhere the landing page emits canonical or alternate URLs.

**Architecture:** Add one shared site-origin constant that both runtime code and build scripts can import, then route all SEO URL generation through it. Keep the change narrowly scoped to metadata, sitemap generation, and regression tests so behavior changes are limited to emitted SEO URLs.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, Node build scripts in `scripts/`, runtime SEO helpers in `src/lib/`

---

### Task 1: Add failing regression coverage for the canonical host

**Files:**
- Modify: `src/lib/seo.test.ts`
- Modify: `src/lib/prerenderSeo.test.ts`
- Modify: `src/lib/sitemap.test.ts`
- Reference: `src/lib/seo.ts`
- Reference: `scripts/prerender-seo.js`
- Reference: `scripts/sitemap.js`

**Step 1: Write the failing runtime SEO assertions**

Update `src/lib/seo.test.ts` so representative routes assert canonical and alternate URLs on `https://www.getintake.de`.

Example:

```ts
const origin = "https://www.getintake.de";
const seo = getSeoContent("/de", origin);

expect(seo.canonical).toBe("https://www.getintake.de/de");
expect(seo.alternates.en).toBe("https://www.getintake.de/");
```

**Step 2: Write the failing prerender assertions**

Update `src/lib/prerenderSeo.test.ts` to expect canonical and alternate tags with `https://www.getintake.de`.

**Step 3: Write the failing sitemap assertions**

Update `src/lib/sitemap.test.ts` so generated `<loc>` entries use `https://www.getintake.de`.

**Step 4: Run the targeted tests to verify they fail**

Run: `npm test -- src/lib/seo.test.ts src/lib/prerenderSeo.test.ts src/lib/sitemap.test.ts`

Expected: FAIL because the old host is still hard-coded.

**Step 5: Commit**

Do not commit yet. Land the coverage with the implementation.

### Task 2: Centralize the canonical site origin

**Files:**
- Create: `src/lib/siteOrigin.ts`
- Modify: `src/components/SeoHead.tsx`
- Modify: `src/lib/seo.ts`

**Step 1: Add a shared canonical-origin module**

Create `src/lib/siteOrigin.ts` with a single exported constant:

```ts
export const SITE_ORIGIN = "https://www.getintake.de";
```

**Step 2: Update runtime SEO to import the shared constant**

Replace the local `SITE_ORIGIN` in `src/components/SeoHead.tsx` with an import from `src/lib/siteOrigin.ts`.

**Step 3: Keep structured data URLs aligned**

Ensure `src/lib/seo.ts` uses the passed-in origin for canonical, alternate, and schema URLs without introducing any fallback to the legacy host.

**Step 4: Run the runtime SEO tests**

Run: `npm test -- src/lib/seo.test.ts`

Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/siteOrigin.ts src/components/SeoHead.tsx src/lib/seo.ts src/lib/seo.test.ts
git commit -m "feat: centralize canonical site origin"
```

### Task 3: Align prerender and sitemap output with the shared origin

**Files:**
- Modify: `scripts/prerender-seo.js`
- Modify: `scripts/sitemap.js`
- Test: `src/lib/prerenderSeo.test.ts`
- Test: `src/lib/sitemap.test.ts`

**Step 1: Replace the hard-coded origin in prerender SEO**

Update `scripts/prerender-seo.js` so canonical and alternate URLs use `https://www.getintake.de`.

**Step 2: Replace the hard-coded origin in sitemap generation**

Update `scripts/sitemap.js` so every `<loc>` entry uses `https://www.getintake.de`.

**Step 3: Prefer one imported shared origin if script compatibility stays simple**

If straightforward, import the shared origin into the scripts. If module-format friction appears, keep a single-file constant in each script only if necessary and document why.

**Step 4: Run the targeted prerender and sitemap tests**

Run: `npm test -- src/lib/prerenderSeo.test.ts src/lib/sitemap.test.ts`

Expected: PASS

**Step 5: Commit**

```bash
git add scripts/prerender-seo.js scripts/sitemap.js src/lib/prerenderSeo.test.ts src/lib/sitemap.test.ts
git commit -m "feat: align prerender seo and sitemap host"
```

### Task 4: Full verification

**Files:**
- Reference: `src/components/SeoHead.tsx`
- Reference: `src/lib/seo.ts`
- Reference: `scripts/prerender-seo.js`
- Reference: `scripts/sitemap.js`

**Step 1: Run the focused SEO regression suite**

Run: `npm test -- src/lib/seo.test.ts src/lib/prerenderSeo.test.ts src/lib/sitemap.test.ts`

Expected: PASS

**Step 2: Search for the legacy production host**

Run: `rg -n "intake\\.tobibechtold\\.dev"`

Expected: no matches in active SEO code or tests.

**Step 3: Review the diff for scope**

Confirm that only canonical-host output changed and no route or copy changes slipped in.

**Step 4: Commit**

```bash
git add docs/plans/2026-03-25-canonical-domain-cleanup-design.md docs/plans/2026-03-25-canonical-domain-cleanup-implementation-plan.md
git commit -m "docs: add canonical domain cleanup plan"
```
