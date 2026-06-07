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

## Updating

BranFlix does not check Seerr for updates. Deploy new versions manually from this
repository (watch [releases](https://github.com/BEdwards05/branflix/releases) or
`main`).

### Before you update

1. Back up your `config/` folder (especially `settings.json` and `db/db.sqlite3`).
2. Stop the running instance so the database is not written mid-update.

```bash
cp -a config "config.backup.$(date +%Y%m%d)"
```

### Docker

From your BranFlix clone on the host:

```bash
git fetch origin
git checkout main
git pull

docker compose down
docker compose up -d --build
```

Configuration is stored in `./config` on the host, so it survives image rebuilds.
The local image (`branflix:local`) must be rebuilt after each pull.

To deploy a specific version:

```bash
git fetch --tags
git checkout <tag>    # e.g. v0.1.0
docker compose up -d --build
```

### From source

```bash
git pull
pnpm install
pnpm build
pnpm start
```

Restart whatever process manager you use if BranFlix is not started directly
with `pnpm start`.

### Migrating from Seerr

You can point BranFlix at an existing Seerr `config/` directory (or copy it
into place before first start). This works best for **Plex + SQLite** setups.
Jellyfin and Emby configurations are not supported. Back up first, then verify
Plex sign-in, libraries, and Radarr/Sonarr after the first boot.

### After updating

- Confirm sign-in, Plex libraries, and a test request.
- Check **Settings → About** for the running version.
- Restart the container or process if prompted after settings changes.

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
