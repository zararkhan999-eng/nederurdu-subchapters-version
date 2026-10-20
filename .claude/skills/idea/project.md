# NederUrdu project facts for /idea

Things the agent can't find by looking, or gets wrong by default. Add to this file when a `/idea` run trips over something new.

## Branches

- Base branch: `release/play-1.0` while it exists (it's the live line; `main` is behind). Otherwise `main`. A branch the user names wins.
- Never push, merge to the base, or open a PR without asking.

## Other sessions edit this folder

Other Claude chats work in this same checkout at the same time. So:

- All `/idea` work happens in worktrees, never in the main checkout. The integration branch gets its own worktree at `.worktrees/<feature-slug>` (gitignored).
- Worktrees have no `node_modules`; symlink it: `ln -s "<main checkout>/node_modules" node_modules`.
- If the worktree has no `playwright.isolated.config.js` (the base branch may predate it), copy it in from the main checkout and leave it out of commits.
- Stage files by name. Check `git log` for commits you didn't make before merging.

## Checks

Run every check from the worktree:

- **Tests**: Playwright via `playwright.isolated.config.js`, which runs its own server on `$PORT` (default 4180) and refuses to reuse one. Port 4173 is often held by another session serving old code, which silently makes results meaningless. Pick a free port per worktree (`PORT=4181 …`, `4183 …`), since implementers run in parallel.
- **Browser**: Playwright's bundled Chromium isn't installed. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.
- **Single file / grep while building**: `npx playwright test -c playwright.isolated.config.js --workers=1 --grep "<name>"`. The full suite once at the end (about 270 tests; slow when the machine is busy, so run it in the background).
- **Course content**: when `course-data.js` or lesson text changes, `npm run audit:course` must pass.
- **Android**: after any web file change, `npm run android:sync-web`, and commit the copies under `android/app/src/main/assets/public/` with the change.
- No typechecker: this is plain browser JS.

## Product rules

- Learners are Urdu speakers learning Dutch. Urdu prose is RTL; Dutch inside it is wrapped by `escapeMixedText` in `app.js`. Use it for any Urdu string that can quote Dutch.
- No speech recognition (decided). No network permission on Android: everything works offline.
- UI direction: bold, playful, Duolingo-like, with the Pim guide character.
