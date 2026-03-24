# German Copy Authenticity Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the German copy in the new landing-page conversion sections so it reads as native, direct German without changing FAQ or Product Updates.

**Architecture:** Keep the change isolated to the translation layer and one locale-specific homepage regression test. The implementation should prove the new German wording through a `/de` render path instead of relying on manual review only.

**Tech Stack:** React 18, Vite, TypeScript, Vitest, Testing Library, existing i18n translation map in `src/i18n/translations.ts`

---

### Task 1: Add German homepage regression coverage

**Files:**
- Modify: `src/pages/Index.test.tsx`
- Reference: `src/i18n/LanguageContext.tsx`

**Step 1: Write the failing test**

Add a second homepage test that renders the page on the German route and asserts a few rewritten section strings from the approved direction.

```tsx
it("renders the rewritten German conversion copy on the /de homepage", () => {
  render(
    <MemoryRouter initialEntries={["/de"]}>
      <LanguageProvider>
        <Index />
      </LanguageProvider>
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /kalorien tracken, ohne abo\./i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /warum viele zu intake wechseln/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /intake vs\. klassische abo-tracker/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /warum intake im alltag besser funktioniert/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /roadmap & abstimmung/i })
  ).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/Index.test.tsx`

Expected: FAIL because the current German strings still use the old wording.

**Step 3: Write minimal implementation**

No production implementation in this task. Only adjust the test until it correctly reflects the approved copy targets and fails for the right reason.

**Step 4: Run test to verify it still fails for missing copy changes**

Run: `npm test -- src/pages/Index.test.tsx`

Expected: FAIL on one or more German headings or links.

**Step 5: Commit**

Do not commit yet. The test should land with the translation change in the next task.

### Task 2: Rewrite the German conversion copy

**Files:**
- Modify: `src/i18n/translations.ts`
- Test: `src/pages/Index.test.tsx`

**Step 1: Update the German strings for the approved sections**

Change only the German values in the conversion-focused sections. Leave FAQ and Product Updates untouched.

Use this wording set as the implementation target:

```ts
heroTitle: "Kalorien tracken,"
heroTitleHighlight: "ohne Abo."
heroDescription:
  "Mit Intake trackst du Kalorien und Makros ohne monatliche Kosten, ohne Konto und ohne dass deine Daten dein Geraet verlassen."
heroSecondaryCta: "Warum viele wechseln"

whySwitchTitle: "Warum viele zu Intake wechseln"
whySwitchSubtitle:
  "Viele Kalorientracker kosten jeden Monat Geld, wollen erst ein Konto und gehen mit deinen Daten nicht gerade sparsam um. Intake laesst genau das weg."
whySwitchSubscriptionsTitle: "Kein Bock mehr auf Abos"
whySwitchSubscriptionsBody:
  "Du brauchst kein weiteres Monatsabo, nur um Essen einzutragen und deine Makros im Blick zu behalten."
whySwitchSubscriptionsBenefit: "Einmal zahlen und loslegen."
whySwitchAccountTitle: "Kein Konto noetig"
whySwitchAccountBody:
  "Wenn du nur dein Essen tracken willst, solltest du nicht erst deine Mailadresse abgeben muessen."
whySwitchAccountBenefit: "Direkt starten, ohne Account."
whySwitchPrivacyTitle: "Deine Daten bleiben bei dir"
whySwitchPrivacyBody:
  "Ernaehrungsdaten sind persoenlich. Deshalb bleiben sie bei Intake standardmaessig auf deinem Geraet."
whySwitchPrivacyBenefit: "Dein Tracking bleibt auf deinem Geraet."

comparisonTitle: "Intake vs. klassische Abo-Tracker"
comparisonSubtitle:
  "Alles, was du brauchst. Ohne Abo, ohne Konto und ohne unnoetigen Ballast."

proofStoriesTitle: "Warum Intake im Alltag besser funktioniert"
proofStoriesSubtitle:
  "Schnell eintragen, klar sehen, privat bleiben. Genau darum geht's."
proofStoryTrackFastBody:
  "Suchen, scannen und eintragen geht schnell, damit Tracking im Alltag nicht nervt."
proofStorySeeMattersTitle: "Das Wichtige im Blick"
proofStorySeeMattersBody:
  "Dashboard und Statistiken zeigen dir Kalorien, Makros und Fortschritt ohne unnoetige Spielereien."
proofStorySeeMattersPointThree: "Fuer schnelles Erfassen gemacht"
proofStoryStayControlTitle: "Alles unter Kontrolle"
proofStoryStayControlBody:
  "Du behaeltst die Kontrolle ueber deine Daten und deinen Ablauf, ohne auf Sync und Auswertungen zu verzichten."
proofStoryStayControlPointTwo: "Datenschutz direkt auf dem Geraet"

reviewsSummaryTitle: "Fuer viele die bessere Alternative zu ueberladenen Trackern"
reviewsSummaryBody:
  "Echtes App-Store-Feedback von Menschen, die einfach tracken wollten statt noch ein Abo zu verwalten."

featureVotingTitle: "Hilf mit,"
featureVotingTitleHighlight: "Intake weiter besser zu machen."
featureVotingDescription:
  "Schau dir die Roadmap an, stimme fuer Features ab und hilf dabei, Intake Schritt fuer Schritt besser zu machen."

ctaTitle: "Wechsle zu einem Kalorientracker ohne Abo."
ctaDescription:
  "Keine monatlichen Kosten. Kein Login-Zwang. Deine Daten bleiben auf deinem Geraet."
```

When editing the real file, keep the repo’s existing umlaut style. Do not transliterate to ASCII in source text if the file already uses native German characters.

**Step 2: Run the targeted test**

Run: `npm test -- src/pages/Index.test.tsx`

Expected: PASS

**Step 3: Read through the changed German block once**

Re-open the modified `de` section in `src/i18n/translations.ts` and confirm:

- FAQ keys were not changed
- Product Updates keys were not changed
- the new copy stays limited to the approved sections

**Step 4: Run the targeted test again if any string changed during review**

Run: `npm test -- src/pages/Index.test.tsx`

Expected: PASS

**Step 5: Commit**

```bash
git add src/i18n/translations.ts src/pages/Index.test.tsx
git commit -m "feat: refine german landing page copy"
```

### Task 3: Full verification

**Files:**
- Reference: `src/i18n/translations.ts`
- Reference: `src/pages/Index.test.tsx`

**Step 1: Run the focused component and page tests**

Run: `npm test -- src/pages/Index.test.tsx src/components/Hero.test.tsx`

Expected: PASS

**Step 2: Run the full test suite**

Run: `npm test`

Expected: PASS

**Step 3: Run the production build**

Run: `npm run build`

Expected: PASS, including prerender completion

**Step 4: Inspect git status**

Run: `git status --short`

Expected: only the intended tracked changes plus any pre-existing unrelated local files.

**Step 5: Commit any verification-only adjustments**

If no further edits were needed, no extra commit is required. If verification required a small follow-up fix, commit it separately with a focused message.
