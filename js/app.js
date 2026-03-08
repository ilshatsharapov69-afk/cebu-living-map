window.MAP = window.MAP || {};

// State
MAP.currentWeights = {};
MAP.ratingMode = 'composite';
MAP.poiClusterGroups = {};
MAP.poiData = {};
MAP.poiVisible = {};
MAP.hazardLayers = {};
MAP.hazardVisible = {};
MAP.earthquakeData = null;
MAP.locationsVisible = true;

// Initialize weights from factor defaults
MAP.FACTORS.forEach(function(f) { MAP.currentWeights[f.key] = f.defaultWeight; });

// Boot
document.addEventListener('DOMContentLoaded', function() {
    MAP.initMap();
    MAP.renderPOIToggles();
    MAP.renderHazardToggles();
    MAP.renderRatingModeSelect();
    MAP.renderSliders();
    MAP.renderMarkers();
    MAP.renderRankings();
    MAP.fetchAllPOIs();

    // Event listeners (replacing inline handlers)
    document.getElementById('rating-mode').addEventListener('change', function(e) {
        MAP.switchRatingMode(e.target.value);
    });
    document.getElementById('reset-btn').addEventListener('click', function() {
        MAP.resetWeights();
    });
    document.getElementById('show-locations').addEventListener('change', function(e) {
        MAP.toggleLocations(e.target.checked);
    });
    document.getElementById('toggle-sidebar').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('open');
    });
});
