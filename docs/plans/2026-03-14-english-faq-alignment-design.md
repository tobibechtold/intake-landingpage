# English FAQ Alignment Design

## Goal

Bring the English FAQ up to date with the newly expanded German FAQ while keeping the English wording very close to the German source.

## Decision

Use the German FAQ entries as the source of truth and add near-direct English equivalents for the new questions and expanded answers. Only make small grammar and wording adjustments where the literal translation would read unnaturally in English.

## Scope

- expand existing English answers where the German entry now contains more detail
- add English versions of the new German FAQ entries
- keep the same overall order and data shape in `src/lib/faqData.ts`

## Content Areas

- one-time purchase and no trial
- food data sources and update cadence
- Apple Health / Health Connect read and write behavior
- historical weight import
- activity calories added to goals
- custom goals and personalization
- AI food recognition status
- privacy wording aligned with German

## Testing

No dedicated FAQ test file currently exists in the repo. Verification should rely on a fresh test run of the existing project test suite or a nearby slice, plus careful review of the localized FAQ data diff.
