# Browser Language Redirect Design

## Goal
Redirect users from English localized routes (`/`, `/privacy`, `/terms`) to German localized routes when browser language is German, on every visit.

## Behavior
- Browser language starts with `de`:
  - `/` -> `/de`
  - `/privacy` -> `/de/privacy`
  - `/terms` -> `/de/terms`
- Already localized German routes (`/de*`) are not redirected.
- Unknown routes are not redirected.
- Redirect applies on every route visit (no persistence guard).

## Implementation
- Add pure utility for redirect decision based on pathname + browser language.
- Add `LocaleRedirect` component using `useLocation` and `useNavigate`.
- Mount `LocaleRedirect` under `BrowserRouter` so it runs on navigation.

## Verification
- Unit tests for redirect decision utility.
- Full test suite and production build.
