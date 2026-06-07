<p align="center">
<img src="./public/logo_full.svg" alt="BranFlix" style="margin: 20px 0; max-width: 320px;">
</p>

# BranFlix

**BranFlix** is a self-hosted media request and discovery manager for your Plex library. Request movies and TV shows, approve requests, and automate downloads through Radarr and Sonarr.

BranFlix is a fork of [Seerr](https://github.com/seerr-team/seerr), focused on a Plex-only workflow. See [NOTICE](./NOTICE) for upstream attribution.

## Features

- **Plex integration** — OAuth sign-in, user import, and library sync
- **TMDB discovery** — Search and browse movies and TV shows
- **Radarr & Sonarr** — Automated download requests on approval
- **Notifications** — Discord, email, Pushover, Slack, Telegram, webhooks, and more
- **Request management** — Approve or deny requests with granular permissions
- **SQLite or PostgreSQL** — Choose the database that fits your setup

## Requirements

- Node.js `^22.19.0` (see `.nvmrc`)
- pnpm `^10.0.0`

## Quick start (development)

```bash
git clone <your-repo-url> branflix
cd branflix
pnpm install
pnpm dev
```

Open http://localhost:5055 and complete the setup wizard:

1. Sign in with Plex
2. Configure Plex libraries
3. Connect Radarr, Sonarr, and TMDB

## Docker

```bash
docker compose up -d --build
```

BranFlix listens on port **5055**. Configuration is persisted in `./config`.

Environment variables (optional):

| Variable | Default | Description |
|----------|---------|-------------|
| `HOST_PORT` | `5055` | Host port mapping |
| `LOG_LEVEL` | `info` | Log verbosity |
| `TZ` | `UTC` | Container timezone |

## API documentation

When running locally: http://localhost:5055/api-docs

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Run production build |
| `pnpm test` | Run test suite |
| `pnpm typecheck` | TypeScript check |

## Differences from Seerr

- Rebranded as **BranFlix**
- **Plex-only** — Jellyfin and Emby support removed
- No upstream Seerr update checks

## License

MIT — see [LICENSE](./LICENSE) and [NOTICE](./NOTICE).
