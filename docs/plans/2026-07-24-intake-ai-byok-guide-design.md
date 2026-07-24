# Intake AI BYOK Guide Design

## Goal

Add a beginner-friendly, bilingual help article that explains how to configure Intake AI with a user-owned API key from OpenAI, Claude, or Gemini.

## Routes and discovery

- German: `/hilfe/eigener-api-schluessel`
- English: `/en/help/own-api-key`
- Add a prominent guide card near the top of the Help page.
- Add a “How to set up BYOK” link to the BYOK pricing card on the Intake AI page.
- Preserve the current locale convention: German routes have no prefix and English routes use `/en`.

## Page structure

The article uses the existing marketing layout, header, footer, breadcrumbs, typography, colors, and card language.

1. Hero with a plain-language definition of BYOK and a short setup summary.
2. “Before you start” explanation of API keys and tokens for readers who have never used either.
3. Provider cards for OpenAI, Claude, and Gemini, each linking to the provider’s official API-key page.
4. Five-step setup flow:
   - Open Intake settings.
   - Choose a provider.
   - Keep the suitable default model or optionally enter another supported model name.
   - Paste the API key.
   - Save and try an Intake AI request.
5. Three screenshot placeholders that can later be replaced without changing the article structure.
6. Security and cost explanations.
7. Troubleshooting for invalid keys, missing provider credit or billing, unsupported model names, and exhausted free-tier or usage limits.
8. Navigation back to the Help overview and Intake AI.

## Content rules

- Explain an API key as a private password that lets Intake send a request directly to the selected AI provider under the user’s provider account.
- State that Intake stores the key securely only on the user’s device and that the key never leaves the device.
- Distinguish the API from consumer subscriptions such as ChatGPT Plus or Claude Pro.
- Explain tokens as small pieces of text processed by the model.
- Avoid promising a fixed price. State that users do not pay an Intake AI subscription for BYOK, while provider charges and billing mechanics remain subject to the provider’s current terms.
- Describe Gemini’s free tier as currently available for certain models and regions, with limits, and subject to change.
- Explain that Intake supplies a suitable default model for each provider, so entering a model name is optional.

## Verified provider destinations

- OpenAI: `https://platform.openai.com/api-keys`
- Claude: `https://platform.claude.com/settings/keys`
- Gemini: `https://aistudio.google.com/apikey`

These destinations were verified against the providers’ official documentation on 2026-07-24.

## Routing, SEO, and static output

- Add a logical `byokGuide` page to localized routing.
- Add matching routes in `App.tsx`.
- Add localized SEO titles and descriptions.
- Add both routes to prerender metadata, prerender body content, and the generated sitemap.
- Ensure language switching resolves to the equivalent localized article.

## Testing

- Extend locale-routing tests for both paths and alternate URLs.
- Add page tests covering localized headings, provider links, security wording, screenshot placeholders, and navigation.
- Extend Help and Intake AI page tests for the two new entry links.
- Extend sitemap and prerender SEO tests for both routes.
- Run the focused tests, full test suite, lint, and production build.

