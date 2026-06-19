# Intake AI What's New Design

## Goal

Create the Intake 2.4.0 What's New entry for the launch of Intake AI.

## Scope

The release page uses the existing `content/whats-new/<version>/<locale>.md` content pipeline. No custom React layout is needed. The page should be available in English and German, appear as the newest What's New entry, and use a copied SVG cover from the previous release with updated 2.4.0 text.

## Content

The only feature in Intake 2.4.0 is Intake AI. The page should explain that users can log food by describing a meal, using a meal photo, or scanning a nutrition label. It should emphasize that Intake AI creates editable suggestions and users should review them before saving.

The page needs a dedicated BYOK section. It should explain that users can bring their own OpenAI or Claude API key, that provider usage may be billed by the provider, and that a normal ChatGPT or Claude subscription does not include an API key or API credits.

## Assets

Use a new `content/whats-new/2.4.0/assets/cover.svg` copied from the previous release cover. Update the SVG title, description, version, and subtitle for Intake AI. Do not add the showcase video yet; the user will insert it later.

## Testing

Update the What's New content tests so English entries return 2.4.0 first and verify the BYOK clarification is rendered. Update the page test so the German overview expects the 2.4.0 card.
