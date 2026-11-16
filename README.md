# quote-buddha-frontend

The web app for Quote Buddha: a chat-first research workspace for the early Buddhist texts. The backend lives in a separate repo (`../quote-buddha`).

Status: planning and setup are done; the project is not scaffolded yet. Next: `docs/plans/01-scaffold-and-storybook.md`.

## Install
`npm install` (all packages are listed in `package.json`). Pinned on purpose: TypeScript 5 (`typescript-eslint` does not support 7 yet) and ESLint 9 (`eslint-plugin-jsx-a11y` does not support 10 yet).

If downloads are very slow, force IPv4: PowerShell `$env:NODE_OPTIONS="--dns-result-order=ipv4first --no-network-family-autoselection"`, then `npm install`.

## Start here
- `CLAUDE.md`: rules for people and agents working in this repo.
- `docs/plans/00-overall-plan.md`: the approved plan and build order.
- `docs/prototypes/`: open `workspace.html` and `design-system.html` in a browser. They are the visual source of truth.
- `docs/references/`: `brand.md` (tokens), `components.md` (inventory), `api-contract.md`, `wording.md`.
- `.claude/`: agents and skills for Claude Code.

## Layers
Tokens → atoms (`src/design-system`) → molecules → organisms (`src/components`) → templates → pages. Imports go one way only; only pages fetch data.
