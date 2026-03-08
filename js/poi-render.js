window.MAP = window.MAP || {};

MAP.createPOIMarker = function(poi, config) {
    var sizes = { large: 8, medium: 5, small: 3 };
    var r = sizes[poi.importance] || 4;

    var marker = L.circleMarker([poi.lat, poi.lng], {
        radius: r,
        fillColor: config.color,
        color: '#fff',
        weight: 1.5,
        fillOpacity: 0.85,
        opacity: 0.9,
    });

    var gmapsSearchUrl = 'https://www.google.com/maps/search/' + encodeURIComponent(poi.name) + '/@' + poi.lat + ',' + poi.lng + ',17z';

    var popupHtml = '<div style="font-family:-apple-system,sans-serif;min-width:180px;">' +
        '<div style="font-size:13px;font-weight:bold;margin-bottom:4px;color:#1a1a2e;">' + poi.name + '</div>' +
        '<div style="font-size:10px;color:#888;margin-bottom:6px;">' + poi.lat.toFixed(4) + ', ' + poi.lng.toFixed(4) + '</div>' +
        '<div style="display:flex;gap:4px;">' +
            '<a href="' + gmapsSearchUrl + '" target="_blank" rel="noopener"' +
               ' style="flex:1;display:block;text-align:center;padding:6px 8px;background:#4285f4;color:white;' +
               'border-radius:4px;text-decoration:none;font-size:11px;font-weight:bold;">' +
                '📍 Google Maps</a>' +
            '<a href="https://www.google.com/maps/@' + poi.lat + ',' + poi.lng + ',3a,75y,0h,90t/data=!3m6!1e1!3m4!1s!2e0!7i16384!8i8192" target="_blank" rel="noopener"' +
               ' style="flex:1;display:block;text-align:center;padding:6px 8px;background:#34a853;color:white;' +
               'border-radius:4px;text-decoration:none;font-size:11px;font-weight:bold;">' +
                '🔍 Street View</a>' +
        '</div></div>';

    marker.bindTooltip('<b>' + poi.name + '</b>', { direction: 'top', offset: [0, -4] });
    marker.bindPopup(popupHtml, { maxWidth: 250 });
    return marker;
};

MAP.renderPOICluster = function(key) {
    // Remove existing
    if (MAP.poiClusterGroups[key]) {
        MAP.map.removeLayer(MAP.poiClusterGroups[key]);
        delete MAP.poiClusterGroups[key];
    }

    var data = MAP.poiData[key];
    if (!data || data.length === 0) return;

    var config = MAP.POI_CATEGORIES[key];
    var clusterOpts = {
        maxClusterRadius: 40,
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true,
        iconCreateFunction: function(cluster) {
            var count = cluster.getChildCount();
            var size = count < 10 ? 28 : count < 50 ? 36 : 44;
            return L.divIcon({
                html: '<div class="poi-cluster-icon" style="background:' + config.color + ';width:' + size + 'px;height:' + size + 'px;">' + count + '</div>',
                className: '',
                iconSize: [size, size],
            });
        },
    };
    if (config.disableClusteringAtZoom) {
        clusterOpts.disableClusteringAtZoom = config.disableClusteringAtZoom;
    }

    var group = L.markerClusterGroup(clusterOpts);
    for (var i = 0; i < data.length; i++) {
        group.addLayer(MAP.createPOIMarker(data[i], config));
    }

    MAP.poiClusterGroups[key] = group;
    MAP.map.addLayer(group);
};

MAP.removePOICluster = function(key) {
    if (MAP.poiClusterGroups[key]) {
        MAP.map.removeLayer(MAP.poiClusterGroups[key]);
        delete MAP.poiClusterGroups[key];
    }
};
