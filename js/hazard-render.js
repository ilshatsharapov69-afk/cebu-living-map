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
        var deaths = p.deaths || 0;

        // Size: small quakes smaller but visible, large quakes bigger
        var radius;
        if (mag < 4) radius = 3;
        else if (mag < 5) radius = 5;
        else if (mag < 6) radius = 7;
        else if (mag < 7) radius = 10;
        else radius = 14;

        var color = MAP.magToColor(mag, alert);

        var marker = L.circleMarker([lat, lng], {
            radius: radius,
            fillColor: color,
            color: '#fff',
            weight: mag >= 6 ? 2 : 1,
            fillOpacity: 0.9,
            opacity: 0.9,
            interactive: true,
        });

        marker.bindTooltip('<b>M' + mag.toFixed(1) + '</b> — ' + place, { direction: 'top' });

        // Store earthquake data on marker for wave animation
        marker._eqData = {
            lat: lat, lng: lng, mag: mag, depth: depth,
            color: color, place: place, time: time,
            alert: alert, felt: felt, tsunami: tsunami, mmi: mmi, deaths: deaths,
        };

        marker.on('click', function(e) {
            var eq = e.target._eqData;
            MAP.triggerSeismicWave(eq);
        });

        var popupHtml = '<div style="font-family:-apple-system,sans-serif;min-width:180px;">' +
            '<div style="font-size:14px;font-weight:bold;color:' + color + ';">🌍 M' + mag.toFixed(1) + '</div>' +
            '<div style="font-size:11px;margin:3px 0;">' + place + '</div>' +
            '<div style="font-size:10px;color:#888;">Глубина: ' + depth.toFixed(0) + ' км</div>' +
            '<div style="font-size:10px;color:#888;">Дата: ' + time + '</div>';
        if (alert) popupHtml += '<div style="font-size:10px;margin-top:3px;">PAGER: ' + MAP.alertToLabel(alert) + '</div>';
        if (felt) popupHtml += '<div style="font-size:10px;color:#888;">Ощутили: ' + felt + ' чел.</div>';
        if (tsunami) popupHtml += '<div style="font-size:10px;color:#e74c3c;font-weight:bold;">⚠️ Угроза цунами</div>';
        if (mmi) popupHtml += '<div style="font-size:10px;color:#888;">Интенсивность (MMI): ' + mmi.toFixed(1) + '</div>';
        if (deaths) popupHtml += '<div style="font-size:11px;color:#c0392b;font-weight:bold;">☠️ Погибших: ' + deaths.toLocaleString() + '</div>';
        popupHtml += '<div style="font-size:9px;color:#666;margin-top:4px;">🔘 Кликните маркер для симуляции волны</div>';
        popupHtml += '</div>';

        marker.bindPopup(popupHtml);
        group.addLayer(marker);
    }

    MAP.hazardLayers.earthquake = group;
    MAP.map.addLayer(group);
};

// Calculate distance between two lat/lng points in km (Haversine)
MAP.haversineDistance = function(lat1, lng1, lat2, lng2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLng = (lng2 - lng1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng/2) * Math.sin(dLng/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Estimate felt intensity (MMI) at a distance from epicenter
MAP.estimateMMI = function(mag, depthKm, distKm) {
    // Simplified attenuation: MMI ≈ mag * 1.5 - 1.5 * log10(hypo_dist) - 0.5
    var hypoDist = Math.sqrt(distKm * distKm + depthKm * depthKm);
    if (hypoDist < 1) hypoDist = 1;
    var mmi = mag * 1.5 - 1.5 * Math.log10(hypoDist) - 0.5;
    return Math.max(1, Math.min(12, Math.round(mmi * 10) / 10));
};

MAP.mmiToLabel = function(mmi) {
    if (mmi >= 10) return 'Разрушительное';
    if (mmi >= 8) return 'Сильное разрушение';
    if (mmi >= 6) return 'Сильное';
    if (mmi >= 5) return 'Умеренное';
    if (mmi >= 4) return 'Ощутимое';
    if (mmi >= 3) return 'Слабое';
    return 'Не ощутимо';
};

MAP.mmiToColor = function(mmi) {
    if (mmi >= 10) return '#8b0000';
    if (mmi >= 8) return '#c0392b';
    if (mmi >= 6) return '#e67e22';
    if (mmi >= 5) return '#f1c40f';
    if (mmi >= 4) return '#27ae60';
    if (mmi >= 3) return '#3498db';
    return '#95a5a6';
};

// Seismic wave types: P-wave (fastest), S-wave (medium), Surface (slowest, most destructive)
MAP.SEISMIC_WAVES = [
    { type: 'P',       speed: 6.0,  color: '#4fc3f7', label: 'P-волна',       baseOpacity: 0.20, baseWeight: 1.5 },
    { type: 'S',       speed: 3.5,  color: '#ffb74d', label: 'S-волна',       baseOpacity: 0.28, baseWeight: 2.0 },
    { type: 'Surface', speed: 2.5,  color: '#ef5350', label: 'Поверхностная', baseOpacity: 0.35, baseWeight: 2.5 },
];

// Trigger seismic wave animation from earthquake epicenter
MAP.triggerSeismicWave = function(eq) {
    // Clean up any existing wave animation
    if (MAP._waveCleanup) MAP._waveCleanup();

    var epicenter = L.latLng(eq.lat, eq.lng);
    var waveGroup = L.layerGroup().addTo(MAP.map);
    var waveCircles = []; // circles to remove after animation
    MAP._waveAnimating = true;

    // Find nearby locations within max wave radius
    var maxRadiusKm = Math.min(300, eq.mag * 30);
    var nearbyLocations = [];

    for (var i = 0; i < MAP.LOCATIONS.length; i++) {
        var loc = MAP.LOCATIONS[i];
        var dist = MAP.haversineDistance(eq.lat, eq.lng, loc.lat, loc.lng);
        if (dist <= maxRadiusKm) {
            nearbyLocations.push({
                loc: loc,
                distKm: dist,
                mmi: MAP.estimateMMI(eq.mag, eq.depth, dist),
            });
        }
    }
    nearbyLocations.sort(function(a, b) { return a.distKm - b.distKm; });

    // Epicenter marker with glow
    var epicenterIcon = L.divIcon({
        html: '<div class="eq-epicenter-icon" style="background:' + eq.color + ';--eq-color:' + eq.color + ';">★</div>',
        className: '',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    });
    var epicenterMarker = L.marker(epicenter, {
        icon: epicenterIcon, interactive: false, zIndexOffset: 3000,
    });
    waveGroup.addLayer(epicenterMarker);

    // Wave legend
    var legendHtml = '<div class="wave-legend">' +
        '<div style="font-weight:bold;margin-bottom:4px;">🌍 M' + eq.mag.toFixed(1) + ' — ' + eq.place + '</div>';
    for (var li = 0; li < MAP.SEISMIC_WAVES.length; li++) {
        var sw = MAP.SEISMIC_WAVES[li];
        legendHtml += '<div><span class="wl-line" style="background:' + sw.color + ';display:inline-block;"></span> ' +
            sw.label + ' (' + sw.speed + ' км/с)</div>';
    }
    if (eq.deaths) {
        legendHtml += '<div style="color:#ff1744;font-weight:bold;margin-top:4px;">☠️ Погибших: ' + eq.deaths.toLocaleString() + '</div>';
    }
    legendHtml += '</div>';
    var legendEl = document.createElement('div');
    legendEl.innerHTML = legendHtml;
    legendEl.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:1500;pointer-events:none;';
    document.body.appendChild(legendEl);

    // Time scaling: animation takes ~4-5 seconds for full propagation
    // Surface wave is slowest, so total time = maxRadiusKm / 2.5 real seconds
    // We compress with timeScale to make it visually pleasant
    var surfaceTimeSec = maxRadiusKm / MAP.SEISMIC_WAVES[2].speed;
    var timeScale = surfaceTimeSec / 4.5; // compress to ~4.5s animation
    if (timeScale < 1) timeScale = 1;
    var maxRadiusMeters = maxRadiusKm * 1000;

    // Create wave circles — one per wave type
    for (var wi = 0; wi < MAP.SEISMIC_WAVES.length; wi++) {
        var waveType = MAP.SEISMIC_WAVES[wi];
        var circle = L.circle(epicenter, {
            radius: 0,
            color: waveType.color,
            fillColor: waveType.color,
            fillOpacity: 0.05,
            weight: waveType.baseWeight,
            opacity: waveType.baseOpacity,
            interactive: false,
        });
        waveGroup.addLayer(circle);
        waveCircles.push(circle);
    }

    var startTime = Date.now();
    var reachedLocations = {};
    var animFrameId;

    function animate() {
        var elapsedMs = Date.now() - startTime;
        var elapsedRealSec = (elapsedMs / 1000) * timeScale; // compressed real seconds
        var allDone = true;

        for (var wi = 0; wi < MAP.SEISMIC_WAVES.length; wi++) {
            var waveType = MAP.SEISMIC_WAVES[wi];
            var circle = waveCircles[wi];
            var currentRadiusKm = waveType.speed * elapsedRealSec;

            if (currentRadiusKm >= maxRadiusKm) {
                currentRadiusKm = maxRadiusKm;
            } else {
                allDone = false;
            }

            var progress = currentRadiusKm / maxRadiusKm;
            // Attenuation: amplitude decreases with distance^0.7
            var attenuation = Math.pow(1 - progress, 0.7);

            circle.setRadius(currentRadiusKm * 1000);
            circle.setStyle({
                opacity: waveType.baseOpacity * attenuation + 0.05,
                fillOpacity: 0.08 * attenuation,
                weight: Math.max(0.5, waveType.baseWeight * attenuation),
            });

            // Only Surface wave (index 2) triggers impacts
            if (wi === 2) {
                for (var j = 0; j < nearbyLocations.length; j++) {
                    var nl = nearbyLocations[j];
                    if (reachedLocations[nl.loc.id]) continue;
                    if (currentRadiusKm >= nl.distKm) {
                        reachedLocations[nl.loc.id] = true;
                        showImpactAtLocation(nl, eq, epicenter, waveGroup);
                    }
                }
            }
        }

        if (!allDone) {
            animFrameId = requestAnimationFrame(animate);
        } else {
            // Animation done: remove wave circles but keep impacts persistent
            MAP._waveAnimating = false;
            for (var ci = 0; ci < waveCircles.length; ci++) {
                waveGroup.removeLayer(waveCircles[ci]);
            }
        }
    }

    function showImpactAtLocation(nl, eq, epicenter, group) {
        var mmiColor = MAP.mmiToColor(nl.mmi);
        var mmiLabel = MAP.mmiToLabel(nl.mmi);

        // Death severity classification
        var deathClass = '';
        if (eq.deaths >= 100) deathClass = ' eq-impact-critical';
        else if (eq.deaths >= 10) deathClass = ' eq-impact-severe';

        var html = '<div class="eq-impact-label' + deathClass + '">' +
            '<div><b>' + nl.loc.name + '</b></div>' +
            '<div class="impact-mag" style="color:' + mmiColor + ';">MMI ' + nl.mmi.toFixed(1) + ' — ' + mmiLabel + '</div>' +
            '<div style="font-size:10px;color:#888;">📏 ' + nl.distKm.toFixed(0) + ' км от эпицентра</div>';
        if (eq.deaths) {
            html += '<div class="impact-deaths">☠️ Погибших: ' + eq.deaths.toLocaleString() + '</div>';
        }
        html += '</div>';

        var impactIcon = L.divIcon({
            html: html,
            className: '',
            iconSize: [0, 0],
            iconAnchor: [-10, 20],
        });

        var impactMarker = L.marker([nl.loc.lat, nl.loc.lng], {
            icon: impactIcon, interactive: false, zIndexOffset: 2000,
        });
        group.addLayer(impactMarker);

        // Connection line from epicenter to location
        var connectionLine = L.polyline([epicenter, [nl.loc.lat, nl.loc.lng]], {
            color: mmiColor,
            weight: eq.deaths >= 100 ? 2 : 1.5,
            opacity: eq.deaths >= 100 ? 0.6 : 0.35,
            dashArray: '4 6',
            interactive: false,
        });
        group.addLayer(connectionLine);

        // Pulse ring at location — bigger for deadly events
        var pulseRadius = eq.deaths >= 100 ? 18 : (eq.deaths >= 10 ? 14 : 10);
        var pulseColor = eq.deaths >= 100 ? '#ff1744' : mmiColor;
        var pulseCircle = L.circleMarker([nl.loc.lat, nl.loc.lng], {
            radius: pulseRadius,
            color: pulseColor,
            fillColor: pulseColor,
            fillOpacity: eq.deaths >= 100 ? 0.4 : 0.25,
            weight: eq.deaths >= 100 ? 2.5 : 2,
            opacity: 0.8,
            interactive: false,
        });
        group.addLayer(pulseCircle);
    }

    function cleanupAll() {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        if (MAP.map.hasLayer(waveGroup)) MAP.map.removeLayer(waveGroup);
        if (legendEl && legendEl.parentNode) legendEl.parentNode.removeChild(legendEl);
        MAP._waveCleanup = null;
        MAP._waveAnimating = false;
    }

    MAP._waveCleanup = cleanupAll;
    animFrameId = requestAnimationFrame(animate);
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
