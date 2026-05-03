# Ontario Parks Field Guide

An interactive field guide to Ontario's provincial parks. Explore parks on a live map, log nature journal entries, track species sightings, earn achievement badges, and optionally connect your Strava account to sync outdoor activities.

## Features

- **Explore** — Interactive Leaflet map of Ontario provincial parks with search, geolocation, and nearest-park sorting
- **Field Guide** — Searchable catalog of flora and fauna native to Ontario parks
- **Journal** — Personal nature journal with park and species tagging
- **Achievements** — Stats dashboard, badge system, and optional Strava activity sync

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Leaflet / react-leaflet
- Framer Motion
- Express backend (Strava OAuth)
- Local storage for persistence

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the required values:
   ```
   cp .env.example .env
   ```

   | Variable | Description |
   |---|---|
   | `APP_URL` | The URL where the app is hosted (e.g. `http://localhost:3000`) |
   | `STRAVA_CLIENT_ID` | From [strava.com/settings/api](https://www.strava.com/settings/api) |
   | `STRAVA_CLIENT_SECRET` | From [strava.com/settings/api](https://www.strava.com/settings/api) |

   Strava credentials are only needed if you want to use the Strava activity sync feature. The app works fully without them.

3. Start the dev server:
   ```
   npm run dev
   ```

   The app runs at `http://localhost:3000`.
