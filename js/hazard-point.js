window.MAP = window.MAP || {};

// ==================== FLOOD LAYER ====================

MAP.severityToFloodColor = function(severity) {
    if (severity >= 9) return '#0d47a1';
    if (severity >= 7) return '#1565c0';
    if (severity >= 5) return '#42a5f5';
    if (severity >= 3) return '#90caf9';
    return '#bbdefb';
};

MAP.renderFloodLayer = function() {
    MAP.removeHazardLayer('flood');
    var config = MAP.HAZARD_CATEGORIES.flood;
    var events = config.data;
    if (!events || events.length === 0) return;

    var group = L.layerGroup();

    // Heatmap
    var heatPoints = events.map(function(e) {
        var deathWeight = e.deaths ? Math.min(1, Math.log10(e.deaths + 1) / 4) : 0;
        var intensity = Math.min(1, Math.max(0.15, e.severity / 10 * 0.6 + deathWeight * 0.4));
        return [e.lat, e.lng, intensity];
    });
    group.addLayer(L.heatLayer(heatPoints, {
        radius: 35, blur: 28, maxZoom: 13, max: 1.0, gradient: config.gradient,
    }));

    // Sort by severity desc for staggered animation
    var sorted = events.slice().sort(function(a, b) { return b.severity - a.severity; });

    for (var i = 0; i < sorted.length; i++) {
        (function(e, delay) {
            var severity = e.severity || 5;
            var color = MAP.severityToFloodColor(severity);
            var deathBonus = e.deaths ? Math.min(8, Math.log10(e.deaths + 1) * 3) : 0;
            var finalRadius = Math.max(5, severity * 2 + deathBonus);
            var isHigh = severity >= 8;

            var marker = L.circleMarker([e.lat, e.lng], {
                radius: 0,
                fillColor: color,
                color: isHigh ? '#fff' : 'rgba(255,255,255,0.4)',
                weight: isHigh ? 2 : 1,
                fillOpacity: isHigh ? 0.85 : 0.6,
                opacity: isHigh ? 0.9 : 0.6,
            });

            marker.bindTooltip('<b>🌊 ' + e.name + '</b>', { direction: 'top' });

            var severityBar = '<div class="severity-bar"><div class="severity-fill" style="width:' + (severity * 10) + '%;background:' + color + ';"></div></div>';
            var popup = '<div class="flood-popup">' +
                '<div style="font-size:13px;font-weight:bold;color:' + color + ';">🌊 ' + e.name + '</div>' +
                '<div style="font-size:10px;color:#888;">Дата: ' + e.date + '</div>' +
                severityBar +
                '<div style="font-size:10px;color:#888;">Уровень опасности: ' + severity + '/10</div>';
            if (e.deaths) popup += '<div style="font-size:11px;color:#c0392b;font-weight:bold;">☠️ Погибших: ' + e.deaths.toLocaleString() + '</div>';
            if (e.affected) popup += '<div style="font-size:10px;color:#888;">Пострадавших: ' + e.affected.toLocaleString() + '</div>';
            if (e.cause) popup += '<div style="font-size:10px;color:#888;">Причина: ' + e.cause + '</div>';
            popup += '<div style="font-size:10px;color:#555;margin-top:4px;">' + e.info + '</div></div>';

            marker.bindPopup(popup, { maxWidth: 300 });
            group.addLayer(marker);

            setTimeout(function() {
                var startTime = Date.now();
                var dur = 400;
                function expand() {
                    var p = Math.min(1, (Date.now() - startTime) / dur);
                    var eased = 1 - Math.pow(1 - p, 3);
                    marker.setRadius(finalRadius * eased);
                    if (p < 1) requestAnimationFrame(expand);
                }
                requestAnimationFrame(expand);
            }, delay);
        })(sorted[i], i * 40);
    }

    MAP.hazardLayers.flood = group;
    MAP.map.addLayer(group);
    MAP.updateHazardCount('flood', events.length);
};

// ==================== LANDSLIDE LAYER ====================

MAP.severityToLandslideColor = function(severity) {
    if (severity >= 8) return '#3e2723';
    if (severity >= 5) return '#8d6e63';
    return '#bcaaa4';
};

MAP.renderLandslideLayer = function() {
    MAP.removeHazardLayer('landslide');
    var config = MAP.HAZARD_CATEGORIES.landslide;
    var events = config.data;
    if (!events || events.length === 0) return;

    var group = L.layerGroup();

    var heatPoints = events.map(function(e) {
        var deathWeight = e.deaths ? Math.min(1, Math.log10(e.deaths + 1) / 4) : 0;
        var intensity = Math.min(1, Math.max(0.15, e.severity / 10 * 0.6 + deathWeight * 0.4));
        return [e.lat, e.lng, intensity];
    });
    group.addLayer(L.heatLayer(heatPoints, {
        radius: 35, blur: 28, maxZoom: 13, max: 1.0, gradient: config.gradient,
    }));

    for (var i = 0; i < events.length; i++) {
        var e = events[i];
        var severity = e.severity || 5;
        var color = MAP.severityToLandslideColor(severity);
        var radius = severity >= 8 ? 12 : severity >= 5 ? 8 : 5;
        var deathBonus = e.deaths ? Math.min(5, Math.log10(e.deaths + 1) * 2) : 0;
        radius += deathBonus;
        var isHigh = severity >= 8;

        var marker = L.circleMarker([e.lat, e.lng], {
            radius: radius,
            fillColor: color,
            color: isHigh ? '#fff' : 'rgba(255,255,255,0.3)',
            weight: isHigh ? 2 : 1,
            fillOpacity: isHigh ? 0.85 : 0.6,
            opacity: isHigh ? 0.9 : 0.5,
        });

        marker.bindTooltip('<b>⛰️ ' + e.name + '</b>', { direction: 'top' });

        var severityBar = '<div class="severity-bar"><div class="severity-fill" style="width:' + (severity * 10) + '%;background:' + color + ';"></div></div>';
        var popup = '<div class="landslide-popup">' +
            '<div style="font-size:13px;font-weight:bold;color:' + color + ';">⛰️ ' + e.name + '</div>' +
            '<div style="font-size:10px;color:#888;">Дата: ' + e.date + '</div>' +
            severityBar +
            '<div style="font-size:10px;color:#888;">Уровень опасности: ' + severity + '/10</div>';
        if (e.deaths) popup += '<div style="font-size:11px;color:#c0392b;font-weight:bold;">☠️ Погибших: ' + e.deaths.toLocaleString() + '</div>';
        if (e.cause) popup += '<div style="font-size:10px;color:#888;">Причина: ' + e.cause + '</div>';
        popup += '<div style="font-size:10px;color:#555;margin-top:4px;">' + e.info + '</div></div>';

        marker.bindPopup(popup, { maxWidth: 300 });
        group.addLayer(marker);
    }

    MAP.hazardLayers.landslide = group;
    MAP.map.addLayer(group);
    MAP.updateHazardCount('landslide', events.length);
};

// ==================== CRIME LAYER ====================

// Crime index to color: 1-3 green, 4-5 yellow, 6-7 orange, 8-10 red
MAP.crimeIndexToColor = function(index) {
    if (index >= 9) return '#b71c1c';
    if (index >= 7) return '#c62828';
    if (index >= 6) return '#e65100';
    if (index >= 5) return '#f57f17';
    if (index >= 4) return '#f9a825';
    if (index >= 3) return '#7cb342';
    if (index >= 2) return '#43a047';
    return '#2e7d32';
};

MAP.crimeIndexToLabel = function(index) {
    if (index >= 9) return 'Крайне опасно';
    if (index >= 7) return 'Опасно';
    if (index >= 5) return 'Умеренно';
    if (index >= 3) return 'Безопасно';
    return 'Очень безопасно';
};

MAP.severityToCrimeColor = function(severity) {
    if (severity >= 8) return '#c62828';
    if (severity >= 6) return '#e65100';
    if (severity >= 4) return '#ff9800';
    return '#fdd835';
};

MAP.renderCrimeLayer = function() {
    MAP.removeHazardLayer('crime');
    var config = MAP.HAZARD_CATEGORIES.crime;
    var events = config.data;

    var group = L.layerGroup();

    // 1. Regional crime statistics — colored city circles
    var stats = MAP.CRIME_STATS || [];
    if (stats.length > 0) {
        // Heatmap from stats
        var heatPoints = stats.map(function(s) {
            var intensity = Math.min(1, Math.max(0.1, s.crimeIndex / 10));
            return [s.lat, s.lng, intensity];
        });
        group.addLayer(L.heatLayer(heatPoints, {
            radius: 40, blur: 30, maxZoom: 12, max: 1.0, gradient: config.gradient,
        }));

        for (var si = 0; si < stats.length; si++) {
            var s = stats[si];
            var color = MAP.crimeIndexToColor(s.crimeIndex);
            var label = MAP.crimeIndexToLabel(s.crimeIndex);
            var radius = Math.max(8, 6 + s.crimeIndex * 1.5);

            var marker = L.circleMarker([s.lat, s.lng], {
                radius: radius,
                fillColor: color,
                color: '#fff',
                weight: 2,
                fillOpacity: 0.7,
                opacity: 0.8,
            });

            marker.bindTooltip('<b>🚔 ' + s.city + '</b> — ' + label + ' (' + s.crimeIndex + '/10)', { direction: 'top' });

            // Build stat popup
            var popup = '<div class="crime-stat-popup">' +
                '<div style="font-size:14px;font-weight:bold;color:' + color + ';">🚔 ' + s.city + '</div>' +
                '<div class="severity-bar"><div class="severity-fill" style="width:' + (s.crimeIndex * 10) + '%;background:' + color + ';"></div></div>' +
                '<div style="font-size:12px;color:' + color + ';font-weight:bold;">' + label + ' — ' + s.crimeIndex + '/10</div>' +
                '<div style="font-size:10px;color:#888;margin-top:4px;">👥 Население: ' + s.pop.toLocaleString() + '</div>';
            if (s.murderRate) popup += '<div style="font-size:10px;color:#888;">💀 Убийства: ~' + s.murderRate + ' на 100к/год</div>';
            if (s.theftRate) popup += '<div style="font-size:10px;color:#888;">👛 Кражи: ~' + s.theftRate + ' на 100к/год</div>';
            popup += '<div style="font-size:10px;color:#555;margin-top:4px;">' + s.info + '</div></div>';

            marker.bindPopup(popup, { maxWidth: 300 });
            group.addLayer(marker);
        }
    }

    // 2. Individual crime incidents — smaller markers on top
    var typeIcons = config.crimeTypeIcons || {};
    var foreignerColor = config.foreignerColor || '#e040fb';

    if (events && events.length > 0) {
        for (var i = 0; i < events.length; i++) {
            var e = events[i];
            var severity = e.severity || 5;
            var isForeigner = e.foreignerTarget === true;
            var eColor = isForeigner ? foreignerColor : MAP.severityToCrimeColor(severity);
            var eRadius = Math.max(4, severity * 0.8);
            var isHigh = severity >= 8;
            var icon = typeIcons[e.type] || '🚔';

            var eMarker = L.circleMarker([e.lat, e.lng], {
                radius: eRadius,
                fillColor: eColor,
                color: isForeigner ? '#fff' : (isHigh ? '#fff' : 'rgba(255,255,255,0.3)'),
                weight: isForeigner ? 2 : (isHigh ? 1.5 : 0.5),
                fillOpacity: isForeigner ? 0.9 : 0.5,
                opacity: isForeigner ? 0.95 : 0.4,
            });

            eMarker.bindTooltip('<b>' + icon + ' ' + e.name + '</b>' + (isForeigner ? ' ⚠️' : ''), { direction: 'top' });

            var popup = '<div class="crime-popup">' +
                '<div style="font-size:13px;font-weight:bold;color:' + eColor + ';">' + icon + ' ' + e.name + '</div>';
            if (isForeigner) {
                popup += '<div class="crime-foreigner-badge">⚠ Нацелено на иностранцев</div>';
            }
            popup += '<div style="font-size:10px;color:#888;">Тип: ' + (e.type || '—') + ' | Период: ' + (e.period || '—') + '</div>';
            var severityColor = MAP.severityToCrimeColor(severity);
            popup += '<div class="severity-bar"><div class="severity-fill" style="width:' + (severity * 10) + '%;background:' + severityColor + ';"></div></div>';
            popup += '<div style="font-size:10px;color:#888;">Уровень опасности: ' + severity + '/10</div>';
            popup += '<div style="font-size:10px;color:#555;margin-top:4px;">' + e.info + '</div></div>';

            eMarker.bindPopup(popup, { maxWidth: 300 });
            group.addLayer(eMarker);
        }
    }

    MAP.hazardLayers.crime = group;
    MAP.map.addLayer(group);
    MAP.updateHazardCount('crime', stats.length + (events ? events.length : 0));

    MAP._showCrimeLegend();
};

MAP._showCrimeLegend = function() {
    var container = document.getElementById('hazard-legend');
    if (!container) return;
    var existing = document.getElementById('crime-sub-legend');
    if (existing) existing.remove();

    var html = '<div id="crime-sub-legend" class="hazard-sub-legend">' +
        '<div style="font-size:9px;color:#999;width:100%;margin-bottom:2px;">Индекс криминала по городам:</div>' +
        '<span><span class="dot" style="background:#2e7d32;"></span> 1-2 Безопасно</span>' +
        '<span><span class="dot" style="background:#7cb342;"></span> 3 Спокойно</span>' +
        '<span><span class="dot" style="background:#f9a825;"></span> 4-5 Умеренно</span>' +
        '<span><span class="dot" style="background:#e65100;"></span> 6-7 Опасно</span>' +
        '<span><span class="dot" style="background:#c62828;"></span> 8-10 Высокая опасность</span>' +
        '<span><span class="dot" style="background:#e040fb;"></span> Против иностранцев</span>' +
        '</div>';
    container.insertAdjacentHTML('beforeend', html);
};

MAP._removeCrimeLegend = function() {
    var el = document.getElementById('crime-sub-legend');
    if (el) el.remove();
};

// ==================== HEALTH LAYER ====================

// Health risk to color: 1-3 green, 4-5 yellow, 6-7 orange, 8-10 red
MAP.healthRiskToColor = function(risk) {
    if (risk >= 9) return '#b71c1c';
    if (risk >= 7) return '#d32f2f';
    if (risk >= 6) return '#e65100';
    if (risk >= 5) return '#f57f17';
    if (risk >= 4) return '#f9a825';
    if (risk >= 3) return '#7cb342';
    return '#2e7d32';
};

MAP.healthRiskToLabel = function(risk) {
    if (risk >= 8) return 'Высокий риск';
    if (risk >= 6) return 'Повышенный';
    if (risk >= 4) return 'Умеренный';
    return 'Низкий риск';
};

MAP.renderHealthLayer = function() {
    MAP.removeHazardLayer('health');
    var config = MAP.HAZARD_CATEGORIES.health;
    var events = config.data;
    var diseaseColors = config.diseaseColors || {};

    var group = L.layerGroup();

    // 1. Regional health statistics — colored city circles
    var stats = MAP.HEALTH_STATS || [];
    if (stats.length > 0) {
        // Heatmap from stats
        var heatPoints = stats.map(function(s) {
            var intensity = Math.min(1, Math.max(0.1, s.healthRisk / 10));
            return [s.lat, s.lng, intensity];
        });
        group.addLayer(L.heatLayer(heatPoints, {
            radius: 40, blur: 30, maxZoom: 12, max: 1.0, gradient: config.gradient,
        }));

        for (var si = 0; si < stats.length; si++) {
            var s = stats[si];
            var color = MAP.healthRiskToColor(s.healthRisk);
            var label = MAP.healthRiskToLabel(s.healthRisk);
            var radius = Math.max(8, 6 + s.healthRisk * 1.5);

            var marker = L.circleMarker([s.lat, s.lng], {
                radius: radius,
                fillColor: color,
                color: '#fff',
                weight: 2,
                fillOpacity: 0.7,
                opacity: 0.8,
            });

            marker.bindTooltip('<b>🏥 ' + s.city + '</b> — ' + label + ' (' + s.healthRisk + '/10)', { direction: 'top' });

            // Build stat popup
            var popup = '<div class="health-stat-popup">' +
                '<div style="font-size:14px;font-weight:bold;color:' + color + ';">🏥 ' + s.city + '</div>' +
                '<div class="severity-bar"><div class="severity-fill" style="width:' + (s.healthRisk * 10) + '%;background:' + color + ';"></div></div>' +
                '<div style="font-size:12px;color:' + color + ';font-weight:bold;">' + label + ' — ' + s.healthRisk + '/10</div>' +
                '<div style="font-size:10px;color:#888;margin-top:4px;">👥 Население: ' + s.pop.toLocaleString() + '</div>';

            // Top diseases with colored dots
            if (s.topDiseases && s.topDiseases.length > 0) {
                popup += '<div style="font-size:10px;color:#888;margin-top:3px;">Основные болезни: ';
                for (var di = 0; di < s.topDiseases.length; di++) {
                    var d = s.topDiseases[di];
                    var dColor = diseaseColors[d] || '#ff9800';
                    var dLabel = (config.diseaseLabels && config.diseaseLabels[d]) || d;
                    popup += '<span style="color:' + dColor + ';font-weight:bold;">' + dLabel + '</span>';
                    if (di < s.topDiseases.length - 1) popup += ', ';
                }
                popup += '</div>';
            }

            popup += '<div style="font-size:10px;color:#555;margin-top:4px;">' + s.info + '</div></div>';

            marker.bindPopup(popup, { maxWidth: 320 });
            group.addLayer(marker);
        }
    }

    // 2. Individual health events — smaller markers on top
    if (events && events.length > 0) {
        for (var i = 0; i < events.length; i++) {
            var e = events[i];
            var severity = e.severity || 5;
            var eColor = diseaseColors[e.type] || config.color;
            var eRadius = Math.max(3, severity * 0.8 + (e.deaths ? Math.min(4, Math.log10(e.deaths + 1) * 1.5) : 0));
            var isHigh = severity >= 8;

            var eMarker = L.circleMarker([e.lat, e.lng], {
                radius: eRadius,
                fillColor: eColor,
                color: isHigh ? '#fff' : 'rgba(255,255,255,0.3)',
                weight: isHigh ? 1.5 : 0.5,
                fillOpacity: isHigh ? 0.7 : 0.4,
                opacity: isHigh ? 0.8 : 0.4,
            });

            var diseaseLabel = (config.diseaseLabels && config.diseaseLabels[e.type]) || e.type;
            eMarker.bindTooltip('<b>🏥 ' + e.name + '</b>', { direction: 'top' });

            var popup = '<div class="health-popup">' +
                '<div style="font-size:13px;font-weight:bold;color:' + eColor + ';">🏥 ' + e.name + '</div>' +
                '<div style="font-size:10px;color:#888;">Тип: <span style="color:' + eColor + ';font-weight:bold;">' + diseaseLabel + '</span></div>' +
                '<div style="font-size:10px;color:#888;">Дата: ' + (e.date || '—') + '</div>';
            if (e.cases) popup += '<div style="font-size:10px;color:#888;">Случаев: ' + e.cases.toLocaleString() + '</div>';
            if (e.deaths) popup += '<div style="font-size:11px;color:#c0392b;font-weight:bold;">☠️ Погибших: ' + e.deaths.toLocaleString() + '</div>';
            popup += '<div class="severity-bar"><div class="severity-fill" style="width:' + (severity * 10) + '%;background:' + eColor + ';"></div></div>';
            popup += '<div style="font-size:10px;color:#888;">Уровень опасности: ' + severity + '/10</div>';
            popup += '<div style="font-size:10px;color:#555;margin-top:4px;">' + e.info + '</div></div>';

            eMarker.bindPopup(popup, { maxWidth: 300 });
            group.addLayer(eMarker);
        }
    }

    MAP.hazardLayers.health = group;
    MAP.map.addLayer(group);
    MAP.updateHazardCount('health', stats.length + (events ? events.length : 0));

    MAP._showHealthLegend();
};

MAP._showHealthLegend = function() {
    var container = document.getElementById('hazard-legend');
    if (!container) return;
    var existing = document.getElementById('health-sub-legend');
    if (existing) existing.remove();

    var config = MAP.HAZARD_CATEGORIES.health;
    var colors = config.diseaseColors || {};
    var labels = config.diseaseLabels || {};

    var html = '<div id="health-sub-legend" class="health-disease-legend">' +
        '<div style="font-size:9px;color:#999;width:100%;margin-bottom:2px;">Риск по городам:</div>' +
        '<span><span class="dot" style="background:#2e7d32;"></span> 1-3 Низкий</span>' +
        '<span><span class="dot" style="background:#f9a825;"></span> 4-5 Умеренный</span>' +
        '<span><span class="dot" style="background:#e65100;"></span> 6-7 Повышенный</span>' +
        '<span><span class="dot" style="background:#b71c1c;"></span> 8-10 Высокий</span>';

    // Disease type legend
    html += '<div style="font-size:9px;color:#999;width:100%;margin-top:4px;margin-bottom:2px;">Болезни:</div>';
    for (var type in colors) {
        if (colors.hasOwnProperty(type)) {
            html += '<span><span class="dot" style="background:' + colors[type] + ';"></span> ' + (labels[type] || type) + '</span>';
        }
    }
    html += '</div>';
    container.insertAdjacentHTML('beforeend', html);
};

MAP._removeHealthLegend = function() {
    var el = document.getElementById('health-sub-legend');
    if (el) el.remove();
};
