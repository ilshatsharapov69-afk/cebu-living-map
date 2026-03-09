window.MAP = window.MAP || {};

// Color functions for quality-based markers
// Коричневый → золотой градиент для качества пляжей
MAP.beachQualityColor = function(q) {
    var colors = [
        '#5D4037','#6D4C3B','#7D5A3F','#8D6843','#9D7647',
        '#AD854B','#BD9440','#CDA435','#DDB52A','#FFD700'
    ];
    var i = Math.max(0, Math.min(9, Math.round(q) - 1));
    return colors[i];
};

MAP.internetQualityColor = function(r) {
    if (r <= 2) return '#e74c3c';
    if (r <= 4) return '#e67e22';
    if (r <= 6) return '#f1c40f';
    if (r <= 8) return '#2ecc71';
    return '#9b59b6';
};

// Информативный попап пляжа
MAP.beachPopupFn = function(poi) {
    var qc = MAP.beachQualityColor(poi.quality || 5);
    var q = poi.quality || 5;
    var gmapsUrl = 'https://www.google.com/maps/search/' + encodeURIComponent(poi.name) + '/@' + poi.lat + ',' + poi.lng + ',17z';
    var svUrl = 'https://www.google.com/maps/@' + poi.lat + ',' + poi.lng + ',3a,75y,0h,90t/data=!3m6!1e1!3m4!1s!2e0!7i16384!8i8192';

    var html = '<div class="beach-popup" style="font-family:-apple-system,sans-serif;min-width:220px;max-width:280px;">';

    // Заголовок
    html += '<div style="font-size:14px;font-weight:bold;margin-bottom:6px;color:#1a1a2e;">🏖️ ' + poi.name + '</div>';

    // Рейтинг с градиентной полоской
    html += '<div style="margin:6px 0;">' +
        '<span style="font-weight:bold;color:' + qc + ';font-size:13px;">★ ' + q + '/10</span>' +
        '<div style="background:#333;border-radius:4px;height:8px;margin-top:3px;overflow:hidden;">' +
            '<div style="background:linear-gradient(90deg,#5D4037,' + qc + ');width:' + (q * 10) + '%;height:100%;border-radius:4px;transition:width 0.5s;"></div>' +
        '</div></div>';

    // Бейджи: тип песка + загруженность
    var badges = '';
    if (poi.sandType && MAP.BEACH_SAND_TYPES && MAP.BEACH_SAND_TYPES[poi.sandType]) {
        var st = MAP.BEACH_SAND_TYPES[poi.sandType];
        badges += '<span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:bold;' +
            'background:' + st.bg + ';color:' + st.color + ';margin-right:4px;">🏝️ ' + st.label + '</span>';
    }
    if (poi.crowd && MAP.BEACH_CROWD_LABELS && MAP.BEACH_CROWD_LABELS[poi.crowd]) {
        var cr = MAP.BEACH_CROWD_LABELS[poi.crowd];
        badges += '<span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:bold;' +
            'background:#2a2a2a;color:' + cr.color + ';">' + cr.icon + ' ' + cr.label + '</span>';
    }
    if (badges) html += '<div style="margin:6px 0;line-height:1.8;">' + badges + '</div>';

    // Описание
    if (poi.desc) {
        html += '<div style="font-size:11px;color:#555;margin:6px 0;line-height:1.5;">' + poi.desc + '</div>';
    }

    // Активности
    if (poi.activities && poi.activities.length > 0 && MAP.BEACH_ACTIVITIES) {
        var acts = '';
        for (var i = 0; i < poi.activities.length; i++) {
            var a = MAP.BEACH_ACTIVITIES[poi.activities[i]];
            if (a) acts += '<span style="display:inline-block;padding:1px 6px;margin:2px 2px;border-radius:8px;font-size:9px;background:#1a1a2e;color:#ccc;">' + a.icon + ' ' + a.label + '</span>';
        }
        if (acts) html += '<div style="margin:6px 0;line-height:2;">' + acts + '</div>';
    }

    // Мета: сезон + доступ
    var meta = '';
    if (poi.bestSeason) meta += '📅 ' + poi.bestSeason;
    if (poi.access) {
        var accessLabels = { free: '✅ Бесплатный', paid: '💰 Платный', resort: '🏨 Резорт' };
        if (meta) meta += '  •  ';
        meta += (accessLabels[poi.access] || poi.access);
    }
    if (meta) html += '<div style="font-size:10px;color:#999;margin:4px 0;">' + meta + '</div>';

    // Координаты
    html += '<div style="font-size:9px;color:#777;margin:4px 0;">' + poi.lat.toFixed(4) + ', ' + poi.lng.toFixed(4) + '</div>';

    // Кнопки
    html += '<div style="display:flex;gap:4px;margin-top:6px;">' +
        '<a href="' + gmapsUrl + '" target="_blank" rel="noopener"' +
           ' style="flex:1;display:block;text-align:center;padding:6px 8px;background:#4285f4;color:white;' +
           'border-radius:4px;text-decoration:none;font-size:11px;font-weight:bold;">' +
            '📍 Google Maps</a>' +
        '<a href="' + svUrl + '" target="_blank" rel="noopener"' +
           ' style="flex:1;display:block;text-align:center;padding:6px 8px;background:#34a853;color:white;' +
           'border-radius:4px;text-decoration:none;font-size:11px;font-weight:bold;">' +
            '🔍 Street View</a>' +
    '</div></div>';

    return html;
};

// Color function wrapper for beach markers
MAP.beachColorFn = function(poi) {
    return MAP.beachQualityColor(poi.quality || 5);
};

MAP.createPOIMarker = function(poi, config) {
    var sizes = { large: 8, medium: 5, small: 3 };
    var r = sizes[poi.importance] || 4;
    var fillColor = config.colorFn ? config.colorFn(poi) : config.color;
    var weight = 1.5;

    // Beach: larger markers, color by quality
    if (poi.quality !== undefined) {
        fillColor = MAP.beachQualityColor(poi.quality);
        r = poi.importance === 'large' ? 10 : poi.importance === 'medium' ? 7 : 5;
        weight = 2;
    }

    // Internet: color by rating
    if (poi.internetRating !== undefined) {
        fillColor = MAP.internetQualityColor(poi.internetRating);
        weight = 2;
    }

    // Attraction markers — emoji icon per type, sized by tier
    if (config.markerType === 'star' && poi.type && MAP.ATTRACTION_ICONS) {
        var aIcon = MAP.ATTRACTION_ICONS[poi.type] || '⭐';
        var aSizes = { 1: 32, 2: 26, 3: 22 };
        var aFonts = { 1: 22, 2: 17, 3: 14 };
        var aSize = aSizes[poi.tier] || 24;
        var aFont = aFonts[poi.tier] || 16;

        var attrMarker = L.marker([poi.lat, poi.lng], {
            icon: L.divIcon({
                html: '<span style="font-size:' + aFont + 'px;line-height:' + aSize + 'px;">' + aIcon + '</span>',
                className: 'attraction-icon',
                iconSize: [aSize, aSize],
                iconAnchor: [aSize / 2, aSize / 2],
            })
        });

        var gmapsUrl = 'https://www.google.com/maps/search/' + encodeURIComponent(poi.name) + '/@' + poi.lat + ',' + poi.lng + ',17z';
        var attrPopup = '<div style="font-family:-apple-system,sans-serif;min-width:220px;">' +
            '<div style="font-size:14px;font-weight:bold;margin-bottom:4px;color:#e74c3c;">' + aIcon + ' ' + poi.name + '</div>' +
            (poi.desc ? '<div style="font-size:11px;color:#555;margin-bottom:6px;line-height:1.4;">' + poi.desc + '</div>' : '') +
            '<div style="font-size:10px;color:#888;margin-bottom:6px;">' + poi.lat.toFixed(4) + ', ' + poi.lng.toFixed(4) + '</div>' +
            '<div style="display:flex;gap:4px;">' +
                '<a href="' + gmapsUrl + '" target="_blank" rel="noopener"' +
                   ' style="flex:1;display:block;text-align:center;padding:6px 8px;background:#4285f4;color:white;' +
                   'border-radius:4px;text-decoration:none;font-size:11px;font-weight:bold;">' +
                    '📍 Google Maps</a>' +
                '<a href="https://www.google.com/maps/@' + poi.lat + ',' + poi.lng + ',3a,75y,0h,90t/data=!3m6!1e1!3m4!1s!2e0!7i16384!8i8192" target="_blank" rel="noopener"' +
                   ' style="flex:1;display:block;text-align:center;padding:6px 8px;background:#34a853;color:white;' +
                   'border-radius:4px;text-decoration:none;font-size:11px;font-weight:bold;">' +
                    '🔍 Street View</a>' +
            '</div></div>';

        attrMarker.bindTooltip('<b>' + aIcon + ' ' + poi.name + '</b>', { direction: 'top', offset: [0, -aSize / 2] });
        attrMarker.bindPopup(attrPopup, { maxWidth: 300 });
        return attrMarker;
    }

    var marker = L.circleMarker([poi.lat, poi.lng], {
        radius: r,
        fillColor: fillColor,
        color: '#fff',
        weight: weight,
        fillOpacity: 0.85,
        opacity: 0.9,
    });

    var gmapsSearchUrl = 'https://www.google.com/maps/search/' + encodeURIComponent(poi.name) + '/@' + poi.lat + ',' + poi.lng + ',17z';

    // Custom popup function (e.g. hiking, beach)
    if (config.popupFn) {
        var popupHtml = config.popupFn(poi);
        var tooltipText = '<b>' + poi.name + '</b>';
        if (poi.quality !== undefined) tooltipText += ' ★ ' + poi.quality + '/10';
        marker.bindTooltip(tooltipText, { direction: 'top', offset: [0, -4] });
        marker.bindPopup(popupHtml, { maxWidth: 300 });
        return marker;
    }

    // Build popup content
    var popupParts = ['<div style="font-family:-apple-system,sans-serif;min-width:180px;">'];
    popupParts.push('<div style="font-size:13px;font-weight:bold;margin-bottom:4px;color:#1a1a2e;">' + poi.name + '</div>');

    // Attraction description
    if (poi.desc) {
        popupParts.push('<div style="font-size:11px;color:#555;margin-bottom:6px;line-height:1.4;">' + poi.desc + '</div>');
    }

    // Beach quality bar
    if (poi.quality !== undefined) {
        var qc = MAP.beachQualityColor(poi.quality);
        popupParts.push(
            '<div style="margin:4px 0;">' +
                '<span style="font-weight:bold;color:' + qc + ';">★ ' + poi.quality + '/10</span>' +
                '<div style="background:#333;border-radius:3px;height:6px;margin-top:2px;">' +
                    '<div style="background:' + qc + ';width:' + (poi.quality * 10) + '%;height:100%;border-radius:3px;"></div>' +
                '</div>' +
            '</div>'
        );
    }

    // Internet quality bar
    if (poi.internetRating !== undefined) {
        var ic = MAP.internetQualityColor(poi.internetRating);
        popupParts.push(
            '<div style="margin:4px 0;">' +
                '<span style="font-weight:bold;color:' + ic + ';">📶 ' + poi.internetRating + '/10</span>' +
                '<div style="background:#333;border-radius:3px;height:6px;margin-top:2px;">' +
                    '<div style="background:' + ic + ';width:' + (poi.internetRating * 10) + '%;height:100%;border-radius:3px;"></div>' +
                '</div>' +
            '</div>'
        );
        if (poi.details) {
            popupParts.push('<div style="font-size:10px;color:#888;margin:4px 0;">' + poi.details + '</div>');
        }
    }

    popupParts.push('<div style="font-size:10px;color:#888;margin-bottom:6px;">' + poi.lat.toFixed(4) + ', ' + poi.lng.toFixed(4) + '</div>');
    popupParts.push(
        '<div style="display:flex;gap:4px;">' +
            '<a href="' + gmapsSearchUrl + '" target="_blank" rel="noopener"' +
               ' style="flex:1;display:block;text-align:center;padding:6px 8px;background:#4285f4;color:white;' +
               'border-radius:4px;text-decoration:none;font-size:11px;font-weight:bold;">' +
                '📍 Google Maps</a>' +
            '<a href="https://www.google.com/maps/@' + poi.lat + ',' + poi.lng + ',3a,75y,0h,90t/data=!3m6!1e1!3m4!1s!2e0!7i16384!8i8192" target="_blank" rel="noopener"' +
               ' style="flex:1;display:block;text-align:center;padding:6px 8px;background:#34a853;color:white;' +
               'border-radius:4px;text-decoration:none;font-size:11px;font-weight:bold;">' +
                '🔍 Street View</a>' +
        '</div></div>'
    );

    var popupHtml = popupParts.join('');

    // Tooltip
    var tooltipText = '<b>' + poi.name + '</b>';
    if (poi.quality !== undefined) tooltipText = '<b>' + poi.name + '</b> ★ ' + poi.quality + '/10';
    if (poi.internetRating !== undefined) tooltipText = '<b>' + poi.name + '</b>: ' + poi.internetRating + '/10';

    marker.bindTooltip(tooltipText, { direction: 'top', offset: [0, -4] });
    marker.bindPopup(popupHtml, { maxWidth: 280 });
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

    // Apply zoom-based filtering if defined
    if (config.zoomFilter) {
        data = config.zoomFilter(data, MAP.map.getZoom());
        if (!data || data.length === 0) return;
    }
    var isBeach = (key === 'beach');
    var isInternet = (key === 'internet');

    var clusterOpts = {
        maxClusterRadius: 40,
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true,
        iconCreateFunction: function(cluster) {
            var count = cluster.getChildCount();
            var size = count < 10 ? 28 : count < 50 ? 36 : 44;
            var clusterColor = config.color;

            // For beach/internet clusters, use average quality color
            if (isBeach || isInternet) {
                var children = cluster.getAllChildMarkers();
                var sum = 0, cnt = 0;
                for (var j = 0; j < children.length; j++) {
                    var p = children[j]._poi;
                    if (p) {
                        sum += (p.quality || p.internetRating || 5);
                        cnt++;
                    }
                }
                var avg = cnt > 0 ? sum / cnt : 5;
                clusterColor = isBeach ? MAP.beachQualityColor(avg) : MAP.internetQualityColor(avg);
            }

            return L.divIcon({
                html: '<div class="poi-cluster-icon" style="background:' + clusterColor + ';width:' + size + 'px;height:' + size + 'px;">' + count + '</div>',
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
        var m = MAP.createPOIMarker(data[i], config);
        m._poi = data[i]; // store reference for cluster color calculation
        group.addLayer(m);
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
