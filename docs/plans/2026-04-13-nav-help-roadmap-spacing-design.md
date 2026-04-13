# Header Help And Roadmap Return Design

**Context**

The previous IA cleanup removed `Help` from the top nav and removed the roadmap section from the homepage. That made the header cleaner, but it also hid a support destination the user still wants visible and removed a homepage element they still consider important. At the same time, the remaining nav links feel cramped.

**Decision**

- Put `Help` back into the top navigation.
- Keep `Feature Voting` out of the top nav.
- Restore the `FeatureVoting` section on the homepage.
- Keep the nav styling as plain text links with accent hover.
- Increase breathing room in the desktop nav with a slightly larger gap and light horizontal padding on each link.

**Rationale**

This preserves the clearer hierarchy from the last iteration while restoring the two elements the user explicitly values. Adding `Help` as a normal nav destination is lower-noise than bringing back `FAQ` and `Feature Voting` as well. Restoring the roadmap section on the homepage keeps that community signal visible without overloading the header. The spacing adjustment improves scanability and click comfort without changing the visual language.
