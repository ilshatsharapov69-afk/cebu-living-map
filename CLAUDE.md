# MAP_V1 — Philippines Living Map

Interactive Leaflet.js map comparing 78 living locations across the Philippines.
Dark theme, Russian language UI, static site (no build tools).

## Tech Stack
- Vanilla HTML/CSS/JS, no frameworks, no build step
- Leaflet.js 1.9.4, MarkerCluster 1.5.3, Leaflet Heat 0.2.0 (CDN)
- Overpass API (OpenStreetMap POI, viewport-based), USGS Earthquake API, Google Maps links

## File Structure
```
index.html              — HTML shell (~80 lines), loads CSS + JS via script tags
css/style.css           — All styles (dark theme, sidebar, popups, responsive)
js/data/factors.js      — MAP.FACTORS (11 rating factors)
js/data/locations.js    — MAP.LOCATIONS (78 locations with ratings, hazards, metadata)
js/data/islands.js      — MAP.ISLAND_POLYGONS (20 island outlines)
js/data/hazard-events.js — MAP.TYPHOON/FLOOD/LANDSLIDE/CRIME/HEALTH_EVENTS
js/data/poi-config.js   — OVERPASS_URL, CACHE_TTL, MIN_POI_ZOOM, POI_CATEGORIES (with buildQuery)
js/data/hazard-config.js — MAP.HAZARD_CATEGORIES (7 volcanoes, 6 fault lines), USGS_EARTHQUAKE_URL
js/scoring.js           — computeScore, getScore, scoreToColor, ratingToColor
js/overpass.js          — fetchPOICategory, fetchAllPOIs, mergeWithStatic, transformOverpass, getViewportBBox, debouncedRefreshPOIs
js/poi-render.js        — createPOIMarker, renderPOICluster, removePOICluster
js/hazard-render.js     — renderEarthquakeLayer, triggerSeismicWave, toggleHazardLayer, shared utils (haversineDistance, removeHazardLayer)
js/hazard-volcano.js    — renderVolcanoLayer, triggerEruptionAnimation (ash cloud animation)
js/hazard-typhoon.js    — renderTyphoonLayer, animateTyphoonPath (moving typhoon with wind field)
js/hazard-point.js      — renderFloodLayer, renderLandslideLayer, renderCrimeLayer, renderHealthLayer (specialized per-type)
js/map-init.js          — initMap, renderMarkers, createPopupHTML, toggleLocations
js/sidebar.js           — renderPOIToggles, renderHazardToggles, renderSliders, renderRankings, switchRatingMode, resetWeights
js/app.js               — State init, DOMContentLoaded, event listeners, moveend POI refresh
```

## Architecture
- **Namespace:** All modules attach to `window.MAP` global object. No ES modules.
- **Script order matters:** data files first, then logic, then app.js last.
- **State lives in MAP:** `currentWeights`, `ratingMode`, `map`, `markersLayer`, `poiData`, `hazardLayers`, etc.
- **No inline event handlers.** All bound via addEventListener in app.js and sidebar.js.
- **Viewport-based POI:** Overpass queries use current map viewport instead of static BBOX. Min zoom 8. Debounced refresh on pan/zoom.

## Key Data
- `FACTORS` — 11 factors: costOfLiving, internet, food, walkability, quiet, shopsWalkable, beach, safety, airQuality, immigration, expatCommunity
- `LOCATIONS` — 78 locations with `ratings` (1-10 per factor), `hazards` (1-10), `meta` (rent, internet, bi, transport, notes)
- `POI_CATEGORIES` — 6 types: food, shopsWalkable, convenience, beach, immigration, internet
- `HAZARD_CATEGORIES` — 7 types: earthquake, volcano, typhoon, flood, landslide, crime, health

## Location Regions
Metro Manila, North Luzon, Central Luzon, Calabarzon, Bicol, Mindoro, Palawan, Cebu City, Cebu Province, Cebu Islands, Bohol, Negros Oriental, Siquijor, Western Visayas, Eastern Visayas, Davao, Northern Mindanao, Soccsksargen, Zamboanga, Caraga

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
