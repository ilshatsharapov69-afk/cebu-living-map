window.MAP = window.MAP || {};

// Compute destination lat/lng given origin, bearing (degrees), and distance (km)
MAP.bearingToLatLng = function(lat, lng, bearingDeg, distKm) {
    var R = 6371;
    var d = distKm / R;
    var brng = bearingDeg * Math.PI / 180;
    var lat1 = lat * Math.PI / 180;
    var lng1 = lng * Math.PI / 180;
    var lat2 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(brng));
    var lng2 = lng1 + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(lat1), Math.cos(d) - Math.sin(lat1) * Math.sin(lat2));
    return [lat2 * 180 / Math.PI, lng2 * 180 / Math.PI];
};

// Convert compass direction to bearing degrees
MAP.compassToBearing = function(dir) {
    var map = {
        'N':0,'NNE':22.5,'NE':45,'ENE':67.5,'E':90,'ESE':112.5,'SE':135,'SSE':157.5,
        'S':180,'SSW':202.5,'SW':225,'WSW':247.5,'W':270,'WNW':292.5,'NW':315,'NNW':337.5
    };
    return map[dir] || 0;
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

        // Volcano marker
        var marker = L.marker([v.lat, v.lng], {
            icon: L.divIcon({
                html: '<div style="font-size:22px;text-shadow:0 1px 3px rgba(0,0,0,0.5);">🌋</div>',
                className: '',
                iconSize: [26, 26],
                iconAnchor: [13, 13],
            }),
        });

        marker.bindTooltip('<b>' + v.name + '</b> (' + v.status + ')', { direction: 'top', offset: [0, -12] });

        // Build popup with eruption history
        var popupHtml = '<div class="volcano-popup">' +
            '<div class="volcano-popup-title">🌋 ' + v.name + '</div>' +
            '<div class="volcano-popup-info">Статус: <b>' + v.status + '</b> | Высота: ' + v.elevation + '</div>' +
            '<div class="volcano-popup-zones">🔴 PDZ: ' + (v.dangerRadii[0]/1000) + 'км | 🟠 Расш.: ' + (v.dangerRadii[1]/1000) + 'км | 🟡 Пепел: ' + (v.dangerRadii[2]/1000) + 'км</div>';

        // Eruption history table
        if (v.eruptions && v.eruptions.length > 0) {
            popupHtml += '<div class="volcano-eruption-history"><b>История извержений:</b>';
            popupHtml += '<table class="eruption-table"><tr><th>Дата</th><th>VEI</th><th>Жертвы</th><th>Пепел</th><th></th></tr>';
            for (var ei = 0; ei < v.eruptions.length; ei++) {
                var er = v.eruptions[ei];
                var veiColor = er.vei >= 5 ? '#ff1744' : er.vei >= 3 ? '#ff9800' : '#ffc107';
                var ashArea = er.ashAreaKm2 ? er.ashAreaKm2.toLocaleString() + ' км²' : er.ashReachKm + ' км';
                var cityCount = er.affectedCities ? er.affectedCities.length : 0;
                popupHtml += '<tr>' +
                    '<td>' + er.date.substring(0, 4) + '</td>' +
                    '<td style="color:' + veiColor + ';font-weight:bold;">VEI ' + er.vei + '</td>' +
                    '<td>' + (er.casualties > 0 ? '☠️ ' + er.casualties : '—') + '</td>' +
                    '<td style="font-size:9px;">' + ashArea + (cityCount ? '<br>' + cityCount + ' городов' : '') + '</td>' +
                    '<td><button class="eruption-btn" data-vi="' + vi + '" data-ei="' + ei + '">▶</button></td>' +
                    '</tr>';
                popupHtml += '<tr><td colspan="5" class="eruption-info">' + er.info + '</td></tr>';
            }
            popupHtml += '</table></div>';
        }

        // Threatened locations
        if (v.threatenedLocations && v.threatenedLocations.length > 0) {
            popupHtml += '<div class="volcano-threatened"><b>Под угрозой:</b> ';
            var names = [];
            for (var ti = 0; ti < v.threatenedLocations.length; ti++) {
                var locId = v.threatenedLocations[ti];
                for (var li = 0; li < MAP.LOCATIONS.length; li++) {
                    if (MAP.LOCATIONS[li].id === locId) {
                        var dist = MAP.haversineDistance(v.lat, v.lng, MAP.LOCATIONS[li].lat, MAP.LOCATIONS[li].lng);
                        names.push(MAP.LOCATIONS[li].name + ' (' + dist.toFixed(0) + 'км)');
                        break;
                    }
                }
            }
            popupHtml += names.join(', ');
            popupHtml += '</div>';
        }

        popupHtml += '</div>';

        marker.bindPopup(popupHtml, { maxWidth: 420, minWidth: 300 });

        marker._volcanoIndex = vi;
        group.addLayer(marker);

        // Danger zone circles
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

    // Fault lines
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

    // Bind eruption buttons after popup opens
    MAP.map.on('popupopen', function(e) {
        var popup = e.popup.getElement();
        if (!popup) return;
        var buttons = popup.querySelectorAll('.eruption-btn');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function(ev) {
                var vi = parseInt(ev.target.getAttribute('data-vi'));
                var ei = parseInt(ev.target.getAttribute('data-ei'));
                MAP.map.closePopup();
                MAP.triggerEruptionAnimation(
                    MAP.HAZARD_CATEGORIES.volcano.points[vi],
                    MAP.HAZARD_CATEGORIES.volcano.points[vi].eruptions[ei]
                );
            });
        }
    });

    MAP.updateHazardCount('volcano', config.points.length);
};

// Eruption animation — shows ash cloud, affected cities, area coverage
MAP.triggerEruptionAnimation = function(volcano, eruption) {
    if (MAP._eruptionCleanup) MAP._eruptionCleanup();

    var center = L.latLng(volcano.lat, volcano.lng);
    var animGroup = L.layerGroup().addTo(MAP.map);
    var bearing = MAP.compassToBearing(eruption.ashDirection);
    var maxRadiusKm = eruption.ashReachKm;
    var affectedCities = eruption.affectedCities || [];

    // Zoom to show the full ash reach
    var zoomTarget = maxRadiusKm > 100 ? 7 : maxRadiusKm > 30 ? 9 : 10;
    MAP.map.setView(center, zoomTarget, { animate: true, duration: 0.5 });

    // Epicenter marker
    var epicIcon = L.divIcon({
        html: '<div class="eruption-epicenter">🌋</div>',
        className: '', iconSize: [36, 36], iconAnchor: [18, 18],
    });
    animGroup.addLayer(L.marker(center, { icon: epicIcon, interactive: false, zIndexOffset: 3000 }));

    // Legend (will be updated during animation)
    var veiColor = eruption.vei >= 5 ? '#ff1744' : eruption.vei >= 3 ? '#ff9800' : '#ffc107';
    var ashAreaText = eruption.ashAreaKm2 ? eruption.ashAreaKm2.toLocaleString() + ' км²' : '~' + Math.round(Math.PI * maxRadiusKm * maxRadiusKm * 60 / 360).toLocaleString() + ' км²';
    var legendHtml = '<div class="eruption-legend">' +
        '<div style="font-weight:bold;margin-bottom:4px;">🌋 ' + volcano.name + '</div>' +
        '<div>Дата: ' + eruption.date + '</div>' +
        '<div>VEI: <span style="color:' + veiColor + ';font-weight:bold;">' + eruption.vei + '</span></div>' +
        '<div>Направление пепла: ' + eruption.ashDirection + '</div>' +
        '<div>Дальность: ' + maxRadiusKm + ' км</div>' +
        '<div>Площадь пепла: <b>' + ashAreaText + '</b></div>' +
        '<div>Пепел держался: ' + eruption.ashDurationDays + ' дней</div>';
    if (eruption.casualties > 0) {
        legendHtml += '<div style="color:#ff1744;font-weight:bold;">☠️ Жертвы: ' + eruption.casualties.toLocaleString() + '</div>';
    }
    if (affectedCities.length > 0) {
        legendHtml += '<div style="margin-top:4px;border-top:1px solid rgba(255,255,255,0.1);padding-top:4px;">' +
            '<b>Пострадавшие города: ' + affectedCities.length + '</b></div>';
        legendHtml += '<div id="eruption-city-count" style="font-size:10px;color:#aaa;">Ожидание...</div>';
    }
    legendHtml += '<div style="font-size:9px;color:#666;margin-top:6px;">Кликните карту для закрытия</div>';
    legendHtml += '</div>';
    var legendEl = document.createElement('div');
    legendEl.innerHTML = legendHtml;
    legendEl.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:1500;pointer-events:none;';
    document.body.appendChild(legendEl);

    // Phase 1: Blast circle
    var blastCircle = L.circle(center, {
        radius: 0, color: '#ff1744', fillColor: '#ff5722',
        fillOpacity: 0.3, weight: 2, interactive: false,
    });
    animGroup.addLayer(blastCircle);

    // Phase 2: Ash cloud polygon (fan shape) with gradient layers
    var ashPolygonOuter = L.polygon([], {
        color: '#888', fillColor: '#777',
        fillOpacity: 0.15, weight: 1, interactive: false,
    });
    var ashPolygonInner = L.polygon([], {
        color: '#555', fillColor: '#444',
        fillOpacity: 0.25, weight: 1.5, interactive: false,
    });
    animGroup.addLayer(ashPolygonOuter);
    animGroup.addLayer(ashPolygonInner);

    // Find threatened locations from MAP.LOCATIONS
    var threatened = [];
    if (volcano.threatenedLocations) {
        for (var ti = 0; ti < volcano.threatenedLocations.length; ti++) {
            var locId = volcano.threatenedLocations[ti];
            for (var li = 0; li < MAP.LOCATIONS.length; li++) {
                if (MAP.LOCATIONS[li].id === locId) {
                    threatened.push(MAP.LOCATIONS[li]);
                    break;
                }
            }
        }
    }

    var startTime = Date.now();
    var totalDuration = 6000; // 6 seconds for richer animation
    var citiesReached = {};
    var locImpactsShown = false;
    var animFrameId;

    function computeAshFan(progress, radiusFraction) {
        var currentReach = maxRadiusKm * progress * radiusFraction;
        if (currentReach < 1) return [];
        var spreadDeg = 30;
        var points = [[volcano.lat, volcano.lng]];
        var numArc = 20;
        for (var i = 0; i <= numArc; i++) {
            var angle = bearing - spreadDeg + (2 * spreadDeg * i / numArc);
            var pt = MAP.bearingToLatLng(volcano.lat, volcano.lng, angle, currentReach);
            points.push(pt);
        }
        return points;
    }

    // Check if a point is within the ash fan
    function isInAshFan(lat, lng, progress) {
        var dist = MAP.haversineDistance(volcano.lat, volcano.lng, lat, lng);
        var currentReach = maxRadiusKm * progress;
        if (dist > currentReach) return false;
        // Check bearing angle
        var dLat = lat - volcano.lat;
        var dLng = lng - volcano.lng;
        var angleDeg = (Math.atan2(dLng, dLat) * 180 / Math.PI + 360) % 360;
        // Convert to bearing convention (N=0, E=90)
        var diff = Math.abs(((angleDeg - bearing) + 540) % 360 - 180);
        return diff <= 35; // slightly wider than visual fan for detection
    }

    function animate() {
        var elapsed = Date.now() - startTime;
        var progress = Math.min(1, elapsed / totalDuration);

        // Phase 1 (0-0.2): Blast expanding to PDZ radius
        if (progress < 0.2) {
            var blastProgress = progress / 0.2;
            var pdzRadius = volcano.dangerRadii[0];
            blastCircle.setRadius(pdzRadius * blastProgress);
            blastCircle.setStyle({ fillOpacity: 0.4 * (1 - blastProgress * 0.5) });
        } else {
            blastCircle.setStyle({ fillOpacity: 0.08, opacity: 0.2 });
        }

        // Phase 2 (0.1-0.7): Ash cloud expanding with two layers
        if (progress > 0.1) {
            var ashProgress = Math.min(1, (progress - 0.1) / 0.6);

            // Outer (lighter) cloud
            var outerFan = computeAshFan(ashProgress, 1.0);
            if (outerFan.length > 2) {
                ashPolygonOuter.setLatLngs(outerFan);
                ashPolygonOuter.setStyle({ fillOpacity: 0.1 + 0.1 * ashProgress });
            }

            // Inner (denser) cloud - 40% of reach
            var innerFan = computeAshFan(ashProgress, 0.4);
            if (innerFan.length > 2) {
                ashPolygonInner.setLatLngs(innerFan);
                ashPolygonInner.setStyle({ fillOpacity: 0.2 + 0.15 * ashProgress });
            }

            // Phase 3: Show affected cities as ash reaches them
            for (var ci = 0; ci < affectedCities.length; ci++) {
                var city = affectedCities[ci];
                if (citiesReached[city.name]) continue;
                if (isInAshFan(city.lat, city.lng, ashProgress)) {
                    citiesReached[city.name] = true;
                    showAffectedCity(city, volcano, eruption, animGroup);
                    // Update city count in legend
                    var countEl = document.getElementById('eruption-city-count');
                    if (countEl) {
                        var reached = Object.keys(citiesReached).length;
                        countEl.innerHTML = '🏙️ Накрыто: ' + reached + ' / ' + affectedCities.length;
                    }
                }
            }
        }

        // Phase 4 (0.7+): Show remaining cities + threatened MAP.LOCATIONS
        if (progress >= 0.7) {
            // Show any cities not yet reached (they're far away)
            for (var ci = 0; ci < affectedCities.length; ci++) {
                var city = affectedCities[ci];
                if (!citiesReached[city.name]) {
                    citiesReached[city.name] = true;
                    showAffectedCity(city, volcano, eruption, animGroup);
                }
            }
            // Show threatened locations from MAP.LOCATIONS
            if (!locImpactsShown) {
                locImpactsShown = true;
                for (var i = 0; i < threatened.length; i++) {
                    showThreatenedLocation(threatened[i], volcano, eruption, animGroup);
                }
                var countEl = document.getElementById('eruption-city-count');
                if (countEl) {
                    countEl.innerHTML = '🏙️ Накрыто: ' + affectedCities.length + ' городов';
                }
            }
        }

        if (progress < 1) {
            animFrameId = requestAnimationFrame(animate);
        }
    }

    function showAffectedCity(city, volcano, eruption, group) {
        var dist = MAP.haversineDistance(volcano.lat, volcano.lng, city.lat, city.lng);
        var ashSeverity = city.ashMm >= 50 ? 'critical' : city.ashMm >= 10 ? 'heavy' : 'light';
        var sevColor = ashSeverity === 'critical' ? '#ff1744' : ashSeverity === 'heavy' ? '#ff9800' : '#ffc107';
        var sevLabel = ashSeverity === 'critical' ? 'Критический' : ashSeverity === 'heavy' ? 'Тяжёлый' : 'Лёгкий';

        var html = '<div class="volcano-city-label ' + ashSeverity + '">' +
            '<div style="font-weight:bold;color:' + sevColor + ';">' + city.name + '</div>' +
            '<div class="vcl-row">📏 ' + dist.toFixed(0) + ' км</div>';
        if (city.pop > 0) {
            html += '<div class="vcl-row">👥 ' + city.pop.toLocaleString() + ' чел.</div>';
        }
        html += '<div class="vcl-row">🌫️ Пепел: <b>' + city.ashMm + ' мм</b> <span style="color:' + sevColor + ';">(' + sevLabel + ')</span></div>';
        html += '<div class="vcl-info">' + city.info + '</div>';
        html += '</div>';

        var icon = L.divIcon({ html: html, className: '', iconSize: [0, 0], iconAnchor: [-10, 20] });
        group.addLayer(L.marker([city.lat, city.lng], { icon: icon, interactive: false, zIndexOffset: 2000 }));

        // Connection line from volcano to city
        group.addLayer(L.polyline([[volcano.lat, volcano.lng], [city.lat, city.lng]], {
            color: sevColor, weight: ashSeverity === 'critical' ? 2 : 1.5,
            opacity: ashSeverity === 'critical' ? 0.6 : 0.3, dashArray: '4 6', interactive: false,
        }));

        // Impact ring
        var ringRadius = ashSeverity === 'critical' ? 16 : ashSeverity === 'heavy' ? 12 : 8;
        group.addLayer(L.circleMarker([city.lat, city.lng], {
            radius: ringRadius, color: sevColor, fillColor: sevColor,
            fillOpacity: 0.25, weight: 2, opacity: 0.7, interactive: false,
        }));
    }

    function showThreatenedLocation(loc, volcano, eruption, group) {
        // Only show if not already covered by affectedCities
        for (var i = 0; i < affectedCities.length; i++) {
            var cdist = MAP.haversineDistance(loc.lat, loc.lng, affectedCities[i].lat, affectedCities[i].lng);
            if (cdist < 3) return; // Too close to an already shown city
        }

        var dist = MAP.haversineDistance(volcano.lat, volcano.lng, loc.lat, loc.lng);
        var html = '<div class="volcano-impact-label">' +
            '<div><b>' + loc.name + '</b></div>' +
            '<div style="font-size:10px;color:#aaa;">📏 ' + dist.toFixed(0) + ' км от вулкана</div>' +
            '<div style="color:#ff9800;">🌫️ Пепел: ~' + eruption.ashDurationDays + ' дней</div>';
        if (eruption.casualties > 0) {
            html += '<div style="color:#ff1744;">☠️ Жертв: ' + eruption.casualties + '</div>';
        }
        html += '</div>';

        var icon = L.divIcon({ html: html, className: '', iconSize: [0, 0], iconAnchor: [-10, 20] });
        group.addLayer(L.marker([loc.lat, loc.lng], { icon: icon, interactive: false, zIndexOffset: 2000 }));

        group.addLayer(L.polyline([[volcano.lat, volcano.lng], [loc.lat, loc.lng]], {
            color: '#ff9800', weight: 1.5, opacity: 0.3, dashArray: '4 6', interactive: false,
        }));

        group.addLayer(L.circleMarker([loc.lat, loc.lng], {
            radius: 10, color: '#ff9800', fillColor: '#ff9800',
            fillOpacity: 0.15, weight: 1.5, opacity: 0.5, interactive: false,
        }));
    }

    function cleanup() {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        if (MAP.map.hasLayer(animGroup)) MAP.map.removeLayer(animGroup);
        if (legendEl && legendEl.parentNode) legendEl.parentNode.removeChild(legendEl);
        MAP._eruptionCleanup = null;
    }

    MAP._eruptionCleanup = cleanup;
    MAP.map.once('click', cleanup);
    animFrameId = requestAnimationFrame(animate);
};
