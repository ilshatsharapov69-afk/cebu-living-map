window.MAP = window.MAP || {};

/* ── Hiking trails layer: Waymarked Trails tiles + Overpass route polylines ── */

MAP.hikingTileLayer = null;
MAP.hikingRouteLayer = null;
MAP.hikingVisible = false;
MAP._hikingRouteCache = {};

MAP.HIKING_SAC_COLORS = {
    hiking:                      '#27ae60',
    mountain_hiking:             '#f39c12',
    demanding_mountain_hiking:   '#e74c3c',
    alpine_hiking:               '#c0392b',
    difficult_alpine_hiking:     '#8e44ad',
};

MAP.HIKING_SAC_LABELS = {
    hiking:                      'Пешая тропа',
    mountain_hiking:             'Горная тропа',
    demanding_mountain_hiking:   'Сложная горная',
    alpine_hiking:               'Альпинизм',
    difficult_alpine_hiking:     'Сложный альпинизм',
};

MAP.HIKING_DIFFICULTY_COLORS = {
    easy:     '#27ae60',
    moderate: '#f39c12',
    hard:     '#e74c3c',
};

/* ── Toggle hiking layer on/off ── */
MAP.toggleHikingLayer = function(visible) {
    MAP.hikingVisible = visible;

    if (visible) {
        // 1. Add Waymarked Trails tile overlay
        if (!MAP.hikingTileLayer) {
            MAP.hikingTileLayer = L.tileLayer(
                'https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png',
                {
                    maxZoom: 18,
                    opacity: 0.75,
                    attribution: 'Trails: <a href="https://waymarkedtrails.org">Waymarked Trails</a>',
                }
            );
        }
        MAP.map.addLayer(MAP.hikingTileLayer);

        // 2. Fetch clickable route polylines
        MAP.fetchHikingRoutes();
    } else {
        if (MAP.hikingTileLayer) MAP.map.removeLayer(MAP.hikingTileLayer);
        if (MAP.hikingRouteLayer) {
            MAP.map.removeLayer(MAP.hikingRouteLayer);
            MAP.hikingRouteLayer = null;
        }
    }
};

/* ── Fetch route=hiking relations with geometry from Overpass ── */
MAP.fetchHikingRoutes = async function() {
    if (!MAP.hikingVisible) return;
    if (MAP.map.getZoom() < 10) {
        // At low zoom, only show tile overlay, remove polylines
        if (MAP.hikingRouteLayer) {
            MAP.map.removeLayer(MAP.hikingRouteLayer);
            MAP.hikingRouteLayer = null;
        }
        return;
    }

    var bbox = MAP.getViewportBBox();
    var quantized = MAP.quantizeBBox();
    var cacheKey = 'hiking_routes_' + quantized;

    // Check cache
    try {
        var cached = sessionStorage.getItem(cacheKey);
        if (cached) {
            var parsed = JSON.parse(cached);
            if (Date.now() - parsed.ts < MAP.CACHE_TTL) {
                MAP.renderHikingRoutes(parsed.data);
                return;
            }
        }
    } catch(e) {}

    // Fetch from Overpass
    var status = document.getElementById('poi-status');
    if (status) {
        status.textContent = 'Загрузка хайкинг-маршрутов...';
        status.className = 'poi-status loading';
    }

    try {
        var query = '[out:json][timeout:45];relation["route"="hiking"](' + bbox + ');out body geom;';
        var resp = await fetch(MAP.OVERPASS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'data=' + encodeURIComponent(query),
        });
        var json = await resp.json();
        var elements = json.elements || [];

        // Cache
        try {
            sessionStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: elements }));
        } catch(e) {}

        MAP.renderHikingRoutes(elements);

        if (status) {
            status.textContent = 'Маршрутов: ' + elements.length;
            status.className = 'poi-status';
        }
    } catch(e) {
        console.warn('Hiking routes fetch failed:', e);
        if (status) {
            status.textContent = 'Ошибка загрузки маршрутов';
            status.className = 'poi-status';
        }
    }
};

/* ── Render route relations as Leaflet polylines ── */
MAP.renderHikingRoutes = function(relations) {
    if (MAP.hikingRouteLayer) {
        MAP.map.removeLayer(MAP.hikingRouteLayer);
    }
    MAP.hikingRouteLayer = L.layerGroup();

    for (var i = 0; i < relations.length; i++) {
        var rel = relations[i];
        var tags = rel.tags || {};
        var color = MAP.HIKING_SAC_COLORS[tags.sac_scale] || '#f39c12';
        var popupHtml = MAP.buildHikingRoutePopup(tags);
        var tooltipName = tags.name || 'Hiking Trail';

        // Extract geometry from members
        var members = rel.members || [];
        for (var j = 0; j < members.length; j++) {
            var member = members[j];
            if (member.type === 'way' && member.geometry && member.geometry.length > 1) {
                var latlngs = [];
                for (var k = 0; k < member.geometry.length; k++) {
                    var p = member.geometry[k];
                    if (p.lat && p.lon) latlngs.push([p.lat, p.lon]);
                }
                if (latlngs.length < 2) continue;

                var polyline = L.polyline(latlngs, {
                    color: color,
                    weight: 4,
                    opacity: 0.85,
                    lineCap: 'round',
                    lineJoin: 'round',
                });

                polyline.bindTooltip(tooltipName, {
                    sticky: true,
                    direction: 'top',
                    offset: [0, -8],
                });
                polyline.bindPopup(popupHtml, { maxWidth: 300 });

                // Highlight on hover
                (function(pl, origColor) {
                    pl.on('mouseover', function() { pl.setStyle({ weight: 6, opacity: 1 }); });
                    pl.on('mouseout', function() { pl.setStyle({ weight: 4, opacity: 0.85, color: origColor }); });
                })(polyline, color);

                MAP.hikingRouteLayer.addLayer(polyline);
            }
        }
    }

    MAP.map.addLayer(MAP.hikingRouteLayer);
};

/* ── Build popup HTML for a hiking route ── */
MAP.buildHikingRoutePopup = function(tags) {
    var sacLabel = MAP.HIKING_SAC_LABELS[tags.sac_scale] || '';
    var sacColor = MAP.HIKING_SAC_COLORS[tags.sac_scale] || '#f39c12';
    var name = tags.name || 'Hiking Trail';

    var html = '<div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;min-width:200px;max-width:280px;">';

    // Name
    html += '<div style="font-size:14px;font-weight:bold;margin-bottom:4px;color:#1a1a2e;">🥾 ' + name + '</div>';

    // Difficulty badge
    if (sacLabel) {
        html += '<div style="margin-bottom:6px;">' +
            '<span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;' +
            'font-weight:bold;color:#fff;background:' + sacColor + ';">' + sacLabel + '</span></div>';
    }

    // Route info
    var metaItems = [];
    if (tags.distance) metaItems.push('📏 ' + tags.distance + ' км');
    if (tags.ascent) metaItems.push('⬆ ' + tags.ascent + ' м');
    if (tags.descent) metaItems.push('⬇ ' + tags.descent + ' м');
    if (tags['ele:max']) metaItems.push('🏔 макс. ' + tags['ele:max'] + ' м');
    if (metaItems.length) {
        html += '<div style="font-size:11px;color:#666;margin-bottom:6px;">' +
            metaItems.join(' &nbsp;│&nbsp; ') + '</div>';
    }

    // Network
    var networkLabels = { lwn: 'Локальный', rwn: 'Региональный', nwn: 'Национальный', iwn: 'Международный' };
    if (tags.network && networkLabels[tags.network]) {
        html += '<div style="font-size:10px;color:#888;margin-bottom:4px;">Сеть: ' + networkLabels[tags.network] + '</div>';
    }

    // Description
    if (tags.description) {
        html += '<div style="font-size:11px;color:#333;margin-bottom:5px;line-height:1.4;">' + tags.description + '</div>';
    }

    // Access info
    if (tags.access === 'permit') {
        html += '<div style="font-size:10px;color:#e74c3c;margin-bottom:4px;">⚠ Требуется пермит</div>';
    }
    if (tags.fee === 'yes') {
        html += '<div style="font-size:10px;color:#e67e22;margin-bottom:4px;">💰 Платный вход</div>';
    }

    // Source
    if (tags.source) {
        html += '<div style="font-size:9px;color:#aaa;margin-bottom:4px;">Источник: ' + tags.source + '</div>';
    }

    // Roundtrip
    if (tags.roundtrip === 'yes') {
        html += '<div style="font-size:10px;color:#888;margin-bottom:4px;">🔄 Круговой маршрут</div>';
    } else if (tags.roundtrip === 'no') {
        html += '<div style="font-size:10px;color:#888;margin-bottom:4px;">➡ Линейный маршрут</div>';
    }

    html += '</div>';
    return html;
};

/* ── Debounced refresh for hiking routes on map move ── */
MAP._hikingRefreshTimer = null;
MAP.debouncedRefreshHiking = function() {
    if (!MAP.hikingVisible) return;
    clearTimeout(MAP._hikingRefreshTimer);
    MAP._hikingRefreshTimer = setTimeout(function() {
        MAP.fetchHikingRoutes();
    }, 1000);
};
