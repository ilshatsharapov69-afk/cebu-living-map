# MAP_V1 — Cebu Region Living Map

Interactive Leaflet.js map comparing 28 living locations in the Cebu Region (Philippines).
Dark theme, Russian language UI, static site (no build tools).

## Tech Stack
- Vanilla HTML/CSS/JS, no frameworks, no build step
- Leaflet.js 1.9.4, MarkerCluster 1.5.3, Leaflet Heat 0.2.0 (CDN)
- Overpass API (OpenStreetMap POI), USGS Earthquake API, Google Maps links

## File Structure
```
index.html              — HTML shell (~80 lines), loads CSS + JS via script tags
css/style.css           — All styles (dark theme, sidebar, popups, responsive)
js/data/factors.js      — MAP.FACTORS (11 rating factors)
js/data/locations.js    — MAP.LOCATIONS (28 locations with ratings, hazards, metadata)
js/data/islands.js      — MAP.ISLAND_POLYGONS (9 island outlines)
js/data/hazard-events.js — MAP.TYPHOON/FLOOD/LANDSLIDE/CRIME/HEALTH_EVENTS
js/data/poi-config.js   — MAP.BBOX, OVERPASS_URL, CACHE_TTL, POI_CATEGORIES
js/data/hazard-config.js — MAP.HAZARD_CATEGORIES, USGS_EARTHQUAKE_URL
js/scoring.js           — computeScore, getScore, scoreToColor, ratingToColor
js/overpass.js          — fetchPOICategory, fetchAllPOIs, mergeWithStatic, transformOverpass
js/poi-render.js        — createPOIMarker, renderPOICluster, removePOICluster
js/hazard-render.js     — renderEarthquakeLayer, renderVolcanoLayer, renderTyphoonLayer, renderPointHazardLayer, toggleHazardLayer
js/map-init.js          — initMap, renderMarkers, createPopupHTML, toggleLocations
js/sidebar.js           — renderPOIToggles, renderHazardToggles, renderSliders, renderRankings, switchRatingMode, resetWeights
js/app.js               — State init, DOMContentLoaded, event listeners
```

## Architecture
- **Namespace:** All modules attach to `window.MAP` global object. No ES modules.
- **Script order matters:** data files first, then logic, then app.js last.
- **State lives in MAP:** `currentWeights`, `ratingMode`, `map`, `markersLayer`, `poiData`, `hazardLayers`, etc.
- **No inline event handlers.** All bound via addEventListener in app.js and sidebar.js.

## Key Data
- `FACTORS` — 11 factors: costOfLiving, internet, food, walkability, quiet, shopsWalkable, beach, safety, airQuality, immigration, expatCommunity
- `LOCATIONS` — 28 locations with `ratings` (1-10 per factor), `hazards` (1-10), `meta` (rent, internet, BI, ferry, notes)
- `POI_CATEGORIES` — 6 types: food, shopsWalkable, convenience, beach, immigration, internet
- `HAZARD_CATEGORIES` — 7 types: earthquake, volcano, typhoon, flood, landslide, crime, health

## Conventions
- Russian language for all user-facing strings
- camelCase for JS variables/functions
- sessionStorage caching for API responses (1h TTL)
- All DOM manipulation via vanilla JS

## Local Dev
- Open `index.html` directly in browser (file:// works)
- Or: `python -m http.server 8000` / VS Code Live Server

## Deploy
- GitHub Pages: push to main, enable in Settings > Pages
- Repo: https://github.com/ilshatsharapov69-afk/cebu-living-map

## Autonomy Level
- Work autonomously without asking for confirmation on file edits and bash commands
- Only ask for user confirmation on plans (implementation strategy, architecture decisions)

# currentDate
Today's date is 2026-03-08.
