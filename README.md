# Ontario Parks Field Guide

An interactive field guide to Ontario's provincial parks. Explore parks on a live map, log nature journal entries, track species sightings, and earn achievement badges.

## Features

- **Explore** — Interactive Leaflet map of Ontario provincial parks with search, geolocation, and nearest-park sorting
- **Field Guide** — Searchable catalog of flora and fauna native to Ontario parks
- **Journal** — Personal nature journal with park and species tagging
- **Achievements** — Stats dashboard and badge system

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Leaflet / react-leaflet
- Framer Motion
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
   | `GEMINI_API_KEY` | API key used by the in-app AI features |

3. Start the dev server:
   ```
   npm run dev
   ```

   The app runs at `http://localhost:3000`.

## Credits

- Park and species data sourced from the [Ontario Data Catalogue](https://data.ontario.ca/)
- Plan your next trip at [Ontario Parks](https://www.ontarioparks.ca/en)
