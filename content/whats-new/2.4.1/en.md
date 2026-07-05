---
version: "2.4.1"
publishedAt: "2026-06-22"
title: "What's new in Intake 2.4.1"
summary: "Voice input, Gemini, and fixes"
coverImage: "./assets/cover.svg"
highlights:
  - Speech to text for Intake AI
  - Voice input for own API key (BYOK) chats
  - Gemini as an own API key (BYOK) provider
  - Claude nutrient fixes
  - Intake AI subscription fix
---

## Speech to text for AI chats

Intake 2.4.1 makes AI chats faster when typing is not the best option.

You can now use speech to text in Intake AI and in chats that use your own API key (BYOK). Dictate a meal, add a correction, or continue a conversation with the AI without typing everything by hand.

This is especially useful for quick meal descriptions, follow-up messages, and small corrections such as portion sizes or missing ingredients.

## Gemini for your own API key (BYOK)

Gemini is now available as another provider for own API key (BYOK) chats.

If you prefer using your own API key (BYOK), you now have three provider options in Intake: OpenAI, Anthropic, and Gemini. Add your key in settings, choose a supported model, and Intake sends requests through that provider.

As with the other own API key (BYOK) providers, provider terms and provider-side usage costs still apply.

## Bug fixes

This update also fixes a few issues around Intake AI and own API key (BYOK) chats.

Some Claude models were not sending nutrient values correctly. Those models should now return nutrients as expected again.

Subscribers could also run into a problem when trying to use their Intake AI subscription on another iOS device, because the Terms of Service could not be accepted there. That flow is fixed, so your subscription can be used on your other iOS devices as intended.

You can find the full changelog [here](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Thank you for using Intake. I hope you enjoy the new release.

Tobi
