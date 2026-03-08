window.MAP = window.MAP || {};

MAP.fetchEarthquakes = async function() {
    try {
        var cached = sessionStorage.getItem('usgs_earthquakes');
        if (cached) {
            var parsed = JSON.parse(cached);
            if (Date.now() - parsed.ts < MAP.CACHE_TTL) {
                MAP.earthquakeData = parsed.data;
                return parsed.data;
            }
        }
    } catch(e) {}

    try {
        var resp = await fetch(MAP.USGS_EARTHQUAKE_URL);
        var geojson = await resp.json();
        MAP.earthquakeData = geojson.features || [];
        try {
            sessionStorage.setItem('usgs_earthquakes', JSON.stringify({ ts: Date.now(), data: MAP.earthquakeData }));
        } catch(e) {}
        return MAP.earthquakeData;
    } catch(e) {
        console.warn('USGS fetch failed:', e);
        MAP.earthquakeData = [];
        return [];
    }
};

MAP.magToColor = function(mag, alert) {
    if (alert === 'red') return '#ff0000';
    if (alert === 'orange') return '#ff4500';
    if (mag >= 7) return '#c0392b';
    if (mag >= 6) return '#e67e22';
    if (mag >= 5) return '#f1c40f';
    if (mag >= 4) return '#bdc3c7';
    return '#95a5a6';
};

MAP.alertToLabel = function(alert) {
    var labels = {green:'🟢 Зелёный',yellow:'🟡 Жёлтый',orange:'🟠 Оранжевый',red:'🔴 Красный'};
    return labels[alert] || '';
};

MAP.renderEarthquakeLayer = function() {
    if (MAP.hazardLayers.earthquake) {
        MAP.map.removeLayer(MAP.hazardLayers.earthquake);
        delete MAP.hazardLayers.earthquake;
    }
    if (!MAP.earthquakeData || MAP.earthquakeData.length === 0) return;

    var group = L.layerGroup();

    var heatPoints = MAP.earthquakeData.map(function(f) {
        var coords = f.geometry.coordinates;
        var lng = coords[0], lat = coords[1];
        var mag = f.properties.mag;
        var intensity = Math.min(1, Math.max(0.1, Math.pow((mag - 2.5) / 5, 1.5)));
        return [lat, lng, intensity];
    });

    var heat = L.heatLayer(heatPoints, {
        radius: 30, blur: 25, maxZoom: 13, max: 1.0,
        gradient: MAP.HAZARD_CATEGORIES.earthquake.gradient,
    });
    group.addLayer(heat);

    for (var i = 0; i < MAP.earthquakeData.length; i++) {
        var feature = MAP.earthquakeData[i];
        var coords = feature.geometry.coordinates;
        var lng = coords[0], lat = coords[1], depth = coords[2];
        var p = feature.properties;
        var mag = p.mag;
        var alert = p.alert;
        var place = p.place || 'Unknown';
        var time = new Date(p.time).toLocaleDateString();
        var felt = p.felt;
        var tsunami = p.tsunami;
        var mmi = p.mmi;

        var radius = Math.max(3, Math.pow(mag - 2, 1.8));
        var color = MAP.magToColor(mag, alert);
        var isStrong = mag >= 6.5;

        var marker = L.circleMarker([lat, lng], {
            radius: radius,
            fillColor: color,
            color: isStrong ? '#fff' : 'rgba(255,255,255,0.3)',
            weight: isStrong ? 2 : 0.5,
            fillOpacity: isStrong ? 0.85 : 0.5,
            opacity: isStrong ? 0.9 : 0.5,
        });

        marker.bindTooltip('<b>M' + mag.toFixed(1) + '</b> — ' + place, { direction: 'top' });

        var popupHtml = '<div style="font-family:-apple-system,sans-serif;min-width:180px;">' +
            '<div style="font-size:14px;font-weight:bold;color:' + color + ';">🌍 M' + mag.toFixed(1) + '</div>' +
            '<div style="font-size:11px;margin:3px 0;">' + place + '</div>' +
            '<div style="font-size:10px;color:#888;">Глубина: ' + depth.toFixed(0) + ' км</div>' +
            '<div style="font-size:10px;color:#888;">Дата: ' + time + '</div>';
        if (alert) popupHtml += '<div style="font-size:10px;margin-top:3px;">PAGER: ' + MAP.alertToLabel(alert) + '</div>';
        if (felt) popupHtml += '<div style="font-size:10px;color:#888;">Ощутили: ' + felt + ' чел.</div>';
        if (tsunami) popupHtml += '<div style="font-size:10px;color:#e74c3c;font-weight:bold;">⚠️ Угроза цунами</div>';
        if (mmi) popupHtml += '<div style="font-size:10px;color:#888;">Интенсивность (MMI): ' + mmi.toFixed(1) + '</div>';
        popupHtml += '</div>';

        marker.bindPopup(popupHtml);
        group.addLayer(marker);
    }

    MAP.hazardLayers.earthquake = group;
    MAP.map.addLayer(group);
};

MAP.renderVolcanoLayer = function() {
    if (MAP.hazardLayers.volcano) {
        MAP.map.removeLayer(MAP.hazardLayers.volcano);
        delete MAP.hazardLayers.volcano;
    }

    var config = MAP.HAZARD_CATEGORIES.volcano;
    var group = L.layerGroup();

    for (var vi = 0; vi < config.points.length; vi++) {
        var v = config.points[vi];
        var marker = L.marker([v.lat, v.lng], {
            icon: L.divIcon({
                html: '<div style="font-size:22px;text-shadow:0 1px 3px rgba(0,0,0,0.5);">🌋</div>',
                className: '',
                iconSize: [26, 26],
                iconAnchor: [13, 13],
            }),
        });
        marker.bindTooltip('<b>' + v.name + '</b> (' + v.status + ')', { direction: 'top', offset: [0, -12] });
        marker.bindPopup(
            '<div style="font-family:-apple-system,sans-serif;">' +
                '<div style="font-size:14px;font-weight:bold;color:#ff5722;">🌋 ' + v.name + '</div>' +
                '<div style="font-size:11px;">Статус: ' + v.status + '</div>' +
                '<div style="font-size:11px;">Высота: ' + v.elevation + '</div>' +
                '<div style="font-size:10px;color:#888;margin-top:4px;">Красный: PDZ (' + (v.dangerRadii[0]/1000) + 'км), Оранж: расширенная (' + (v.dangerRadii[1]/1000) + 'км), Жёлтый: пепел (' + (v.dangerRadii[2]/1000) + 'км)</div>' +
            '</div>'
        );
        group.addLayer(marker);

        var colors = ['#e74c3c', '#ff9800', '#ffc107'];
        var labels = ['PDZ', 'Extended', 'Ashfall'];
        v.dangerRadii.forEach(function(r, i) {
            var circle = L.circle([v.lat, v.lng], {
                radius: r, color: colors[i], fillColor: colors[i],
                fillOpacity: 0.08, weight: 1.5, dashArray: '6 4',
            });
            circle.bindTooltip(v.name + ' — ' + labels[i] + ' zone (' + (r/1000) + 'км)', { sticky: true });
            group.addLayer(circle);
        });
    }

    for (var fi = 0; fi < config.faultLines.length; fi++) {
        var fault = config.faultLines[fi];
        var line = L.polyline(fault.coords.map(function(c) { return [c[0], c[1]]; }), {
            color: '#e74c3c', weight: 2.5, opacity: 0.7, dashArray: '10 6',
        });
        line.bindTooltip('<b>' + fault.name + '</b>', { sticky: true });
        group.addLayer(line);
    }

    MAP.hazardLayers.volcano = group;
    MAP.map.addLayer(group);
};

MAP.removeHazardLayer = function(key) {
    if (MAP.hazardLayers[key]) {
        MAP.map.removeLayer(MAP.hazardLayers[key]);
        delete MAP.hazardLayers[key];
    }
};

MAP.renderPointHazardLayer = function(key) {
    MAP.removeHazardLayer(key);
    var config = MAP.HAZARD_CATEGORIES[key];
    var events = config.data;
    if (!events || events.length === 0) return;

    var group = L.layerGroup();

    var heatPoints = events.map(function(e) {
        var severity = e.severity || 5;
        var deathWeight = e.deaths ? Math.min(1, Math.log10(e.deaths + 1) / 4) : 0;
        var intensity = Math.min(1, Math.max(0.15, severity / 10 * 0.6 + deathWeight * 0.4));
        return [e.lat, e.lng, intensity];
    });

    var heat = L.heatLayer(heatPoints, {
        radius: 35, blur: 28, maxZoom: 13, max: 1.0,
        gradient: config.gradient,
    });
    group.addLayer(heat);

    for (var i = 0; i < events.length; i++) {
        var e = events[i];
        var severity = e.severity || 5;
        var radius = Math.max(4, severity * 1.2 + (e.deaths ? Math.min(8, Math.log10(e.deaths + 1) * 3) : 0));
        var isHigh = severity >= 8;

        var marker = L.circleMarker([e.lat, e.lng], {
            radius: radius,
            fillColor: config.color,
            color: isHigh ? '#fff' : 'rgba(255,255,255,0.3)',
            weight: isHigh ? 2 : 0.5,
            fillOpacity: isHigh ? 0.85 : 0.55,
            opacity: isHigh ? 0.9 : 0.5,
        });

        marker.bindTooltip('<b>' + config.icon + ' ' + e.name + '</b>', { direction: 'top' });

        var popup = '<div style="font-family:-apple-system,sans-serif;min-width:200px;">' +
            '<div style="font-size:13px;font-weight:bold;color:' + config.color + ';">' + config.icon + ' ' + e.name + '</div>';
        if (e.date || e.period) popup += '<div style="font-size:10px;color:#888;">Дата: ' + (e.date || e.period) + '</div>';
        if (e.location) popup += '<div style="font-size:10px;color:#888;">📍 ' + e.location + '</div>';
        if (e.deaths) popup += '<div style="font-size:11px;color:#c0392b;font-weight:bold;">☠️ Погибших: ' + e.deaths.toLocaleString() + '</div>';
        if (e.affected) popup += '<div style="font-size:10px;color:#888;">Пострадавших: ' + e.affected.toLocaleString() + '</div>';
        if (e.cases) popup += '<div style="font-size:10px;color:#888;">Случаев: ' + e.cases.toLocaleString() + '</div>';
        if (e.cause) popup += '<div style="font-size:10px;color:#888;">Причина: ' + e.cause + '</div>';
        if (e.type) popup += '<div style="font-size:10px;color:#888;">Тип: ' + e.type + '</div>';
        popup += '<div style="font-size:10px;color:#555;margin-top:4px;">' + e.info + '</div></div>';

        marker.bindPopup(popup);
        group.addLayer(marker);
    }

    MAP.hazardLayers[key] = group;
    MAP.map.addLayer(group);
};

MAP.renderTyphoonLayer = function() {
    MAP.removeHazardLayer('typhoon');
    var config = MAP.HAZARD_CATEGORIES.typhoon;
    var events = config.data;
    if (!events || events.length === 0) return;

    var group = L.layerGroup();

    function catColor(cat) {
        if (cat >= 5) return '#8b0000';
        if (cat >= 4) return '#cc0000';
        if (cat >= 3) return '#e67e22';
        if (cat >= 2) return '#f1c40f';
        return '#95a5a6';
    }

    var heatPoints = [];
    for (var ti = 0; ti < events.length; ti++) {
        var t = events[ti];
        for (var pi = 0; pi < t.track.length; pi++) {
            var pt = t.track[pi];
            var intensity = Math.min(1, Math.max(0.15, (pt.wind || t.maxWind) / 320));
            heatPoints.push([pt.lat, pt.lng, intensity]);
        }
    }
    var heat = L.heatLayer(heatPoints, {
        radius: 35, blur: 30, maxZoom: 12, max: 1.0,
        gradient: config.gradient,
    });
    group.addLayer(heat);

    for (var ti = 0; ti < events.length; ti++) {
        var t = events[ti];
        var coords = t.track.map(function(p) { return [p.lat, p.lng]; });
        var color = catColor(t.category);

        var line = L.polyline(coords, {
            color: color, weight: 2.5, opacity: 0.7, dashArray: '8 5',
        });
        line.bindTooltip('<b>' + config.icon + ' ' + t.name + '</b> (Cat ' + t.category + ')', { sticky: true });
        group.addLayer(line);

        for (var pi = 0; pi < t.track.length; pi++) {
            var p = t.track[pi];
            var wind = p.wind || t.maxWind;
            var radius = Math.max(3, wind / 40);

            var marker = L.circleMarker([p.lat, p.lng], {
                radius: radius,
                fillColor: color,
                color: t.category >= 4 ? '#fff' : 'rgba(255,255,255,0.3)',
                weight: t.category >= 4 ? 1.5 : 0.5,
                fillOpacity: 0.7,
                opacity: 0.7,
            });

            marker.bindTooltip('<b>' + t.name + '</b> — ' + p.label + '<br>Ветер: ' + wind + ' км/ч', { direction: 'top' });
            marker.bindPopup(
                '<div style="font-family:-apple-system,sans-serif;min-width:200px;">' +
                    '<div style="font-size:14px;font-weight:bold;color:' + color + ';">🌀 ' + t.name + '</div>' +
                    '<div style="font-size:11px;margin:3px 0;">Категория: ' + t.category + ' | Макс. ветер: ' + t.maxWind + ' км/ч</div>' +
                    '<div style="font-size:11px;">📍 ' + p.label + '</div>' +
                    '<div style="font-size:10px;color:#888;">Дата: ' + t.date + '</div>' +
                    (t.deaths ? '<div style="font-size:11px;color:#c0392b;font-weight:bold;">☠️ Погибших: ' + t.deaths.toLocaleString() + '</div>' : '') +
                    '<div style="font-size:10px;color:#555;margin-top:4px;">' + t.info + '</div>' +
                '</div>'
            );
            group.addLayer(marker);
        }
    }

    MAP.hazardLayers.typhoon = group;
    MAP.map.addLayer(group);
};

MAP.toggleHazardLayer = async function(key, show) {
    MAP.hazardVisible[key] = show;

    if (!show) {
        MAP.removeHazardLayer(key);
        MAP.updateHazardLegend();
        return;
    }

    var status = document.getElementById('hazard-status');

    if (key === 'earthquake') {
        if (!MAP.earthquakeData) {
            status.textContent = 'Загрузка землетрясений (USGS)...';
            status.className = 'poi-status loading';
            await MAP.fetchEarthquakes();
            var count = MAP.earthquakeData ? MAP.earthquakeData.length : 0;
            MAP.updateHazardCount('earthquake', count);
            status.textContent = count > 0 ? 'Загружено ' + count + ' землетрясений (M3+, с 2014)' : 'Нет данных USGS';
            status.className = 'poi-status';
        }
        MAP.renderEarthquakeLayer();
    } else if (key === 'volcano') {
        MAP.renderVolcanoLayer();
    } else if (key === 'typhoon') {
        MAP.renderTyphoonLayer();
        MAP.updateHazardCount('typhoon', MAP.TYPHOON_EVENTS.length);
    } else {
        MAP.renderPointHazardLayer(key);
        var config = MAP.HAZARD_CATEGORIES[key];
        var count = config.data ? config.data.length : 0;
        MAP.updateHazardCount(key, count);
    }

    MAP.updateHazardLegend();
};

MAP.updateHazardLegend = function() {
    var legend = document.getElementById('hazard-legend');
    var anyVisible = Object.values(MAP.hazardVisible).some(function(v) { return v; });
    legend.className = anyVisible ? 'hazard-legend visible' : 'hazard-legend';
};

MAP.updateHazardCount = function(key, count) {
    var el = document.getElementById('hazard-count-' + key);
    if (el) el.textContent = count > 0 ? count : '';
};
