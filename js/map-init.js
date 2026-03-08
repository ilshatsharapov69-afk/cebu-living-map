window.MAP = window.MAP || {};

MAP.initMap = function() {
    MAP.map = L.map('map', { zoomControl: true }).setView([12.0, 122.5], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 18,
    }).addTo(MAP.map);

    MAP.markersLayer = L.layerGroup().addTo(MAP.map);
};

MAP.toggleLocations = function(show) {
    MAP.locationsVisible = show;
    if (show) {
        MAP.map.addLayer(MAP.markersLayer);
    } else {
        MAP.map.removeLayer(MAP.markersLayer);
    }
    document.getElementById('location-ui').style.display = show ? '' : 'none';
};

MAP.renderMarkers = function() {
    MAP.markersLayer.clearLayers();
    for (var i = 0; i < MAP.LOCATIONS.length; i++) {
        var loc = MAP.LOCATIONS[i];
        if (!MAP.passesFilter(loc)) { loc._marker = null; continue; }
        var score = MAP.getScore(loc);
        var color = MAP.scoreToColor(score);
        var radius = 6 + (score / 100) * 10;

        var marker = L.circleMarker([loc.lat, loc.lng], {
            radius: radius, fillColor: color, color: '#fff', weight: 2, opacity: 0.9, fillOpacity: 0.85,
        });

        marker.bindTooltip('<b>' + loc.name + '</b><br>Score: ' + Math.round(score), { direction: 'top', offset: [0, -8] });
        marker.bindPopup(MAP.createPopupHTML(loc, score), { maxWidth: 360, maxHeight: 500 });
        marker.addTo(MAP.markersLayer);
        loc._marker = marker;
        loc._score = score;
    }
};

MAP.getInternetType = function(rating) {
    if (rating >= 9) return 'Fiber 100+ Mbps';
    if (rating >= 7) return 'Fiber 50-100 Mbps';
    if (rating >= 5) return '4G/LTE стабильный';
    if (rating >= 3) return '4G базовый';
    if (rating >= 2) return '3G / слабый сигнал';
    return 'Starlink / нет покрытия';
};

MAP.createPopupHTML = function(loc, score) {
    var color = MAP.scoreToColor(score);
    var h = '<div class="loc-popup"><h3>' + loc.name + '</h3>';
    h += '<span class="score-badge" style="background:' + color + '">' + Math.round(score) + '/100</span>';
    h += '<div class="popup-region">' + (loc.region || '') + '</div>';
    h += '<div style="margin-top:4px">';
    for (var i = 0; i < MAP.FACTORS.length; i++) {
        var f = MAP.FACTORS[i];
        var r = loc.ratings[f.key] || 5;
        h += '<div class="bar-row"><span class="bar-icon">' + f.icon + '</span><span class="bar-label">' + f.label + '</span>';
        h += '<div class="bar-track"><div class="bar-fill" style="width:' + (r*10) + '%;background:' + MAP.ratingToColor(r) + '"></div></div>';
        h += '<span class="bar-val">' + r + '</span></div>';
        // Show detail text if available
        if (loc.details && loc.details[f.key]) {
            h += '<div class="bar-detail">' + loc.details[f.key] + '</div>';
        }
        // Show internet type for internet factor
        if (f.key === 'internet') {
            h += '<div class="bar-detail internet-type">Тип: ' + MAP.getInternetType(r) + '</div>';
        }
    }
    h += '</div>';
    // Google Maps link
    var gmUrl = 'https://www.google.com/maps/search/' + encodeURIComponent(loc.name) + '/@' + loc.lat + ',' + loc.lng + ',14z';
    h += '<div style="margin-top:6px;"><a href="' + gmUrl + '" target="_blank" rel="noopener"' +
        ' style="display:block;text-align:center;padding:6px;background:#4285f4;color:white;border-radius:4px;text-decoration:none;font-size:11px;font-weight:bold;">' +
        '📍 Открыть в Google Maps</a></div>';
    h += '</div>';
    return h;
};
