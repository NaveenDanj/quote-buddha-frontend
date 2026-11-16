# quote-buddha-frontend

The web app for Quote Buddha: a chat-first research workspace for the early Buddhist texts. The backend lives in a separate repo (`../quote-buddha`).

Status: planning and setup are done; the project is not scaffolded yet. Next: `docs/plans/01-scaffold-and-storybook.md`.

## Start here
- `CLAUDE.md`: rules for people and agents working in this repo.
- `docs/plans/00-overall-plan.md`: the approved plan and build order.
- `docs/prototypes/`: open `workspace.html` and `design-system.html` in a browser. They are the visual source of truth.
- `docs/references/`: `brand.md` (tokens), `components.md` (inventory), `api-contract.md`, `wording.md`.
- `.claude/`: agents and skills for Claude Code.

## Layers
Tokens → atoms (`src/design-system`) → molecules → organisms (`src/components`) → templates → pages. Imports go one way only; only pages fetch data.
