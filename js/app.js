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
    MAP.renderPOIToggles();
    MAP.renderHazardToggles();
    MAP.renderSliders();
    MAP.renderMarkers();
    MAP.renderRankings();
    MAP.fetchAllPOIs();

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

    // Dismiss seismic wave visualization on map click
    MAP.map.on('click', function() {
        if (MAP._waveCleanup && !MAP._waveAnimating) {
            MAP._waveCleanup();
        }
    });
});
