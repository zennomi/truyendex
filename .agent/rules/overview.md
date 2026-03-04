---
trigger: always_on
---

# Project Overview

## Development commands

- Install deps (Yarn 4):
  - `yarn install`
- Setup local env:
  - `cp -f .env.example .env.local`
- Run dev server:
  - `yarn dev`
- Run Turbo dev server:
  - `yarn devfast`
- Build production bundle:
  - `yarn build`
- Run production server:
  - `yarn start`
- Lint + auto-fix:
  - `yarn lint:fix`
- Format all files:
  - `yarn format`

### File-scoped quality commands

- Lint a single file:
  - `yarn eslint src/path/to/file.tsx --fix`
- Format a single file:
  - `yarn prettier --write src/path/to/file.tsx`

### Tests

- There is currently **no automated test runner configured** in `package.json` (no `test` script, no Jest/Vitest/Playwright config in this repo).
- So there is no built-in "run single test" command yet.

## High-level architecture

## 1) App structure and route groups (Next.js App Router)

- Framework: Next.js 14 + React 18 + TypeScript.
- Main app entry is split into two route groups:
  - `src/app/(main)`: core/global pages (auth pages, profile/dashboard pages, terms page, offline page, etc.).
  - `src/app/(nettrom)`: the main Vietnamese manga reading experience under `/nettrom/*`.
- API routes in this frontend repo:
  - `src/app/api/health/route.ts`
  - `src/app/api/sync-script/route.ts`

Both route groups use `LayoutWrapper` (`src/components/LayoutWrapper.tsx`) to apply global providers and shared infrastructure.

## 2) Provider and state model

`LayoutWrapper` composes global cross-cutting concerns:

- `SettingsProvider` (`src/contexts/settings.tsx`): persists reader settings in cookie key `truyendex-settings`.
- `MangadexContextProvider` (`src/contexts/mangadex.tsx`): in-memory cache for MangaDex manga entities/statistics to reduce repeated fetches.
- Global toast notifications (`react-toastify`) and GTM.

Reader pages add chapter-specific state via `ChapterContextProvider` (`src/contexts/chapter.tsx`), which coordinates:

- current chapter and manga,
- next/prev chapter navigation,
- chapter prefetching (`src/hooks/useChapterPreloader.tsx`),
- keyboard navigation,
- reading history updates.

## 3) Data/API boundaries

All API access is centralized under `src/api` with 3 namespaces exported from `src/api/index.ts`:

- `MangadexApi` (`src/api/mangadex/*`)
  - Wrapper around MangaDex endpoints (manga/chapter/group/statistics/etc.).
  - Core request logic is in `src/api/mangadex/util.ts`.
  - Requests are proxied via env-configured CORS endpoints (`NEXT_PUBLIC_CORS_URL`, optional `NEXT_PUBLIC_CORS_V2_URL`).
- `AppApi` (`src/api/core/*`)
  - Calls TruyenDex backend endpoints for account/comment/follow/read-list features.
  - Uses `axios` instance from `src/api/core/axios.ts` with credentials + dynamic `baseURL` from `Utils.Url.getBackendUrl()`.
- `TanamoeApi` (`src/api/tanamoe/index.ts`)
  - Uses PocketBase (`https://pb.tana.moe`) for licensed-title/upcoming-book data.

Important product split from README + code:

- Manga content metadata/chapters come from MangaDex.
- Community/account features (follow/comment/user settings) rely on external backend (`truyendex-api`), not this frontend repo.

## 4) Hooks and fetching conventions

- Data fetching is SWR-based (`useSWR` / `useSWR/immutable`) in `src/hooks/**`.
- UI components usually consume hooks/contexts instead of calling API modules inline.
- Error normalization and user-facing messages are handled via `Utils.Error.handleError` (`src/utils/error.ts`).

## 5) Routing, SEO, and metadata patterns

- Route-level metadata is heavily used, especially on manga/chapter pages in `src/app/(nettrom)/nettrom/**/layout.tsx`.
- `metadataBase` consistently comes from `Constants.APP_URL`.
- Constants and route builders are centralized in `src/constants/index.ts`.

## 6) Offline + multi-domain + PWA behavior

- Service worker setup uses Serwist:
  - config: `next.config.js`
  - worker: `src/app/sw.ts`
  - offline fallback target: `/ngoai-tuyen`
- Offline/domain failover UI lives in `src/components/core/offline.tsx`.
- Alternate domain probing uses `src/hooks/useAvailableDomain.tsx` and `src/constants/DOMAINS.json`.

## 7) Styling system

- Tailwind CSS + SCSS are both used.
- Shared base styles: `src/styles/base/index.scss`.
- Route-group specific style bundles:
  - `src/styles/core/index.scss`
  - `src/styles/nettrom/index.scss`
- `src/components/shadcn/*` contains local shadcn-based primitives.

## 8) Environment and operational notes

Required public envs are defined in `.env.example`:

- `NEXT_PUBLIC_CORS_URL`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_BACKEND_URL`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `NEXT_PUBLIC_APP_IMAGE_URL`

Optional but used in code/deploy:

- `NEXT_PUBLIC_CORS_V2_URL`

Operational details worth remembering:

- `next.config.js` sets `eslint.ignoreDuringBuilds = true`, so run lint explicitly before shipping.
- Husky pre-commit (`.husky/pre-commit`) runs:
  - `npm run lint:fix`
  - `npm run format`
- CI deploy workflow exists at `.github/workflows/deploy.yml` (triggered on `main`).
