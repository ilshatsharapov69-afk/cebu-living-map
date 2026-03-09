window.MAP = window.MAP || {};

// State
MAP.checkedFactors = {};
MAP.filterThresholds = {};
MAP.poiClusterGroups = {};
MAP.poiData = {};
MAP.poiVisible = {};
MAP.hazardLayers = {};
MAP.hazardVisible = {};
MAP.earthquakeData = null;
MAP.locationsVisible = true;

// Initialize all factors as checked, all thresholds at 0
MAP.FACTORS.forEach(function(f) {
    MAP.checkedFactors[f.key] = true;
    MAP.filterThresholds[f.key] = 0;
});

// Boot
document.addEventListener('DOMContentLoaded', function() {
    MAP.initMap();
    // Generate internet quality points from LOCATIONS before rendering toggles
    MAP.POI_CATEGORIES.internet.points = MAP.LOCATIONS.map(function(loc) {
        return {
            name: loc.name,
            lat: loc.lat,
            lng: loc.lng,
            importance: loc.ratings.internet >= 8 ? 'large' : loc.ratings.internet >= 5 ? 'medium' : 'small',
            internetRating: loc.ratings.internet,
            details: loc.details ? loc.details.internet : ''
        };
    });

    // Wire attractions data
    if (MAP.ATTRACTIONS) {
        MAP.POI_CATEGORIES.attractions.points = MAP.ATTRACTIONS;
    }

    // Wire beach data and render functions
    if (MAP.BEACHES) {
        MAP.POI_CATEGORIES.beach.staticFallback = MAP.BEACHES;
    }
    if (MAP.beachPopupFn) {
        MAP.POI_CATEGORIES.beach.popupFn = MAP.beachPopupFn;
    }
    if (MAP.beachColorFn) {
        MAP.POI_CATEGORIES.beach.colorFn = MAP.beachColorFn;
    }

    MAP.renderPOIToggles();
    MAP.renderHazardToggles();
    MAP.renderSliders();
    MAP.renderMarkers();
    MAP.renderRankings();

    // Event listeners
    document.getElementById('reset-btn').addEventListener('click', function() {
        MAP.resetWeights();
    });
    document.getElementById('show-locations').addEventListener('change', function(e) {
        MAP.toggleLocations(e.target.checked);
    });
    document.getElementById('toggle-sidebar').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('open');
    });

    // Re-fetch POI layers when user pans/zooms to new area
    MAP.map.on('moveend', MAP.debouncedRefreshPOIs);

    // Refresh hiking routes on pan/zoom
    MAP.map.on('moveend', MAP.debouncedRefreshHiking);

    // Re-render attractions when zoom crosses tier boundaries
    MAP._lastAttractionTier = null;
    MAP.map.on('zoomend', function() {
        if (!MAP.poiVisible.attractions) return;
        var z = MAP.map.getZoom();
        var newTier = z >= 12 ? 3 : z >= 9 ? 2 : 1;
        if (newTier !== MAP._lastAttractionTier) {
            MAP._lastAttractionTier = newTier;
            MAP.renderPOICluster('attractions');
        }
    });

    // Dismiss seismic wave visualization on map click
    MAP.map.on('click', function() {
        if (MAP._waveCleanup && !MAP._waveAnimating) {
            MAP._waveCleanup();
        }
    });
});
