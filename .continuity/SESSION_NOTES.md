# Session Notes

## Goals
- Add Cash App and Zelle QR code scan images and methods to membership registration payment step.
- Push all project updates to GitHub.

## Blockers
- None

## Key Decisions
- Integrated Cash App (`cashapp-payment-app.jpg`) and Zelle (`zelle-payment-app.jpg`) QR code scan cards with handle copying and receipt proof upload. (Commit `7ce0757aa5c3a12b3f4659669d46a54b407071f4`)
- Fixed middleware canonical domain redirect in `middleware.ts` and sanitized `SITE_CONFIG.url` in `lib/config.ts` to stop appending `:3000` port to production domain redirects. (Commit `43cff63`)
