window.MAP = window.MAP || {};

// Wind speed to color (continuous gradient)
MAP.windToColor = function(wind) {
    if (wind >= 250) return '#8b0000';
    if (wind >= 200) return '#cc0000';
    if (wind >= 160) return '#e67e22';
    if (wind >= 120) return '#f1c40f';
    return '#95a5a6';
};

// Wind speed to weight
MAP.windToWeight = function(wind) {
    return Math.max(2, Math.min(5, wind / 60));
};

MAP.renderTyphoonLayer = function() {
    MAP.removeHazardLayer('typhoon');
    var config = MAP.HAZARD_CATEGORIES.typhoon;
    var events = config.data;
    if (!events || events.length === 0) return;

    var group = L.layerGroup();

    // Heatmap
    var heatPoints = [];
    for (var ti = 0; ti < events.length; ti++) {
        var t = events[ti];
        for (var pi = 0; pi < t.track.length; pi++) {
            var pt = t.track[pi];
            var intensity = Math.min(1, Math.max(0.15, (pt.wind || t.maxWind) / 320));
            heatPoints.push([pt.lat, pt.lng, intensity]);
        }
    }
    group.addLayer(L.heatLayer(heatPoints, {
        radius: 35, blur: 30, maxZoom: 12, max: 1.0,
        gradient: config.gradient,
    }));

    // Per-typhoon rendering
    for (var ti = 0; ti < events.length; ti++) {
        var t = events[ti];

        // Segment-by-segment gradient polylines
        for (var pi = 0; pi < t.track.length - 1; pi++) {
            var p1 = t.track[pi];
            var p2 = t.track[pi + 1];
            var segWind = p1.wind || t.maxWind;
            var segColor = MAP.windToColor(segWind);
            var segWeight = MAP.windToWeight(segWind);

            var segment = L.polyline([[p1.lat, p1.lng], [p2.lat, p2.lng]], {
                color: segColor, weight: segWeight, opacity: 0.8,
                dashArray: segWind >= 200 ? null : '8 5',
            });
            segment.bindTooltip('<b>🌀 ' + t.name + '</b> (Cat ' + t.category + ')', { sticky: true });
            group.addLayer(segment);
        }

        // Track point markers
        for (var pi = 0; pi < t.track.length; pi++) {
            var p = t.track[pi];
            var wind = p.wind || t.maxWind;
            var color = MAP.windToColor(wind);
            var radius = Math.max(4, wind / 35);

            var marker = L.circleMarker([p.lat, p.lng], {
                radius: radius,
                fillColor: color,
                color: wind >= 200 ? '#fff' : 'rgba(255,255,255,0.4)',
                weight: wind >= 200 ? 2 : 1,
                fillOpacity: 0.8,
                opacity: 0.8,
            });

            marker.bindTooltip('<b>' + t.name + '</b> — ' + p.label + '<br>🌬️ ' + wind + ' км/ч', { direction: 'top' });

            // Build popup with city impact
            var popupHtml = '<div class="typhoon-popup">' +
                '<div class="typhoon-popup-title" style="color:' + MAP.windToColor(t.maxWind) + ';">🌀 ' + t.name + '</div>' +
                '<div class="typhoon-popup-info">Категория: ' + t.category + ' | Макс. ветер: ' + t.maxWind + ' км/ч</div>' +
                '<div class="typhoon-popup-info">📍 ' + p.label + ' | 🌬️ ' + wind + ' км/ч</div>' +
                '<div class="typhoon-popup-info">Дата: ' + t.date + '</div>';
            if (t.deaths) {
                popupHtml += '<div class="typhoon-popup-deaths">☠️ Погибших: ' + t.deaths.toLocaleString() + '</div>';
            }
            popupHtml += '<div class="typhoon-popup-desc">' + t.info + '</div>';

            // City impact table
            if (t.cityImpact && t.cityImpact.length > 0) {
                popupHtml += '<div class="typhoon-city-impact"><b>Ущерб по городам:</b>' +
                    '<table class="city-impact-table"><tr><th>Город</th><th>Жертвы</th><th>Ущерб</th></tr>';
                for (var ci = 0; ci < t.cityImpact.length; ci++) {
                    var c = t.cityImpact[ci];
                    popupHtml += '<tr><td>' + c.city + '</td>' +
                        '<td style="color:#c0392b;font-weight:bold;">' + (c.deaths || '—') + '</td>' +
                        '<td>' + (c.damage || '—') + '</td></tr>';
                }
                popupHtml += '</table></div>';
            }

            // Animate button
            popupHtml += '<button class="typhoon-animate-btn" data-ti="' + ti + '">▶ Анимировать путь</button>';
            popupHtml += '</div>';

            marker.bindPopup(popupHtml, { maxWidth: 350, minWidth: 250 });
            group.addLayer(marker);
        }
    }

    MAP.hazardLayers.typhoon = group;
    MAP.map.addLayer(group);

    // Bind animate buttons
    MAP.map.on('popupopen', function(e) {
        var popup = e.popup.getElement();
        if (!popup) return;
        var btns = popup.querySelectorAll('.typhoon-animate-btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function(ev) {
                var ti = parseInt(ev.target.getAttribute('data-ti'));
                MAP.map.closePopup();
                MAP.animateTyphoonPath(MAP.TYPHOON_EVENTS[ti]);
            });
        }
    });

    MAP.updateHazardCount('typhoon', events.length);
};

// Typhoon path animation
MAP.animateTyphoonPath = function(typhoon) {
    if (MAP._typhoonCleanup) MAP._typhoonCleanup();

    var animGroup = L.layerGroup().addTo(MAP.map);
    var track = typhoon.track;
    if (!track || track.length < 2) return;

    // Total animation time
    var totalDuration = 5000; // 5 seconds
    var startTime = Date.now();
    var animFrameId;
    var reachedCities = {};

    // Compute total track length for interpolation
    var segLengths = [];
    var totalLength = 0;
    for (var i = 0; i < track.length - 1; i++) {
        var d = MAP.haversineDistance(track[i].lat, track[i].lng, track[i+1].lat, track[i+1].lng);
        segLengths.push(d);
        totalLength += d;
    }

    // Moving typhoon icon
    var typhoonIcon = L.divIcon({
        html: '<div class="typhoon-moving-icon">🌀</div>',
        className: '', iconSize: [40, 40], iconAnchor: [20, 20],
    });
    var movingMarker = L.marker([track[0].lat, track[0].lng], {
        icon: typhoonIcon, interactive: false, zIndexOffset: 3000,
    });
    animGroup.addLayer(movingMarker);

    // Wind field circle
    var windField = L.circle([track[0].lat, track[0].lng], {
        radius: 50000, color: MAP.windToColor(track[0].wind), fillColor: MAP.windToColor(track[0].wind),
        fillOpacity: 0.12, weight: 1.5, opacity: 0.4, interactive: false,
    });
    animGroup.addLayer(windField);

    // Trail polyline (builds up as typhoon moves)
    var trailCoords = [[track[0].lat, track[0].lng]];
    var trailLine = L.polyline(trailCoords, {
        color: MAP.windToColor(track[0].wind), weight: 3, opacity: 0.7, interactive: false,
    });
    animGroup.addLayer(trailLine);

    // Legend
    var legendHtml = '<div class="typhoon-anim-legend">' +
        '<div style="font-weight:bold;margin-bottom:4px;">🌀 ' + typhoon.name + '</div>' +
        '<div>Категория: ' + typhoon.category + '</div>' +
        '<div>Макс. ветер: ' + typhoon.maxWind + ' км/ч</div>' +
        '<div>Дата: ' + typhoon.date + '</div>';
    if (typhoon.deaths) {
        legendHtml += '<div style="color:#ff1744;font-weight:bold;">☠️ Погибших: ' + typhoon.deaths.toLocaleString() + '</div>';
    }
    legendHtml += '<div id="typhoon-anim-wind" style="color:#ccc;margin-top:4px;"></div>';
    legendHtml += '</div>';
    var legendEl = document.createElement('div');
    legendEl.innerHTML = legendHtml;
    legendEl.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:1500;pointer-events:none;';
    document.body.appendChild(legendEl);

    function interpolatePosition(progress) {
        var targetDist = progress * totalLength;
        var accum = 0;
        for (var i = 0; i < segLengths.length; i++) {
            if (accum + segLengths[i] >= targetDist) {
                var segProgress = (targetDist - accum) / segLengths[i];
                var lat = track[i].lat + (track[i+1].lat - track[i].lat) * segProgress;
                var lng = track[i].lng + (track[i+1].lng - track[i].lng) * segProgress;
                var wind = track[i].wind + (track[i+1].wind - track[i].wind) * segProgress;
                return { lat: lat, lng: lng, wind: wind, segIndex: i };
            }
            accum += segLengths[i];
        }
        var last = track[track.length - 1];
        return { lat: last.lat, lng: last.lng, wind: last.wind, segIndex: track.length - 2 };
    }

    function animate() {
        var elapsed = Date.now() - startTime;
        var progress = Math.min(1, elapsed / totalDuration);

        var pos = interpolatePosition(progress);
        var color = MAP.windToColor(pos.wind);
        var windRadius = Math.max(30000, pos.wind * 200);

        // Update moving marker
        movingMarker.setLatLng([pos.lat, pos.lng]);

        // Update wind field
        windField.setLatLng([pos.lat, pos.lng]);
        windField.setRadius(windRadius);
        windField.setStyle({ color: color, fillColor: color });

        // Update trail
        trailCoords.push([pos.lat, pos.lng]);
        trailLine.setLatLngs(trailCoords);
        trailLine.setStyle({ color: color });

        // Update wind display in legend
        var windEl = document.getElementById('typhoon-anim-wind');
        if (windEl) {
            windEl.innerHTML = '🌬️ ' + Math.round(pos.wind) + ' км/ч';
            windEl.style.color = color;
        }

        // Place trail markers at each passed track point
        for (var i = 0; i <= pos.segIndex; i++) {
            var pt = track[i];
            if (!pt._trailPlaced) {
                pt._trailPlaced = true;
                animGroup.addLayer(L.circleMarker([pt.lat, pt.lng], {
                    radius: 5, fillColor: MAP.windToColor(pt.wind), color: '#fff',
                    weight: 1, fillOpacity: 0.8, interactive: false,
                }));
            }
        }

        // City impacts
        if (typhoon.cityImpact) {
            for (var ci = 0; ci < typhoon.cityImpact.length; ci++) {
                var city = typhoon.cityImpact[ci];
                if (reachedCities[city.city]) continue;
                var dist = MAP.haversineDistance(pos.lat, pos.lng, city.lat, city.lng);
                if (dist < 50) {
                    reachedCities[city.city] = true;
                    showTyphoonCityImpact(city, typhoon, animGroup);
                }
            }
        }

        if (progress < 1) {
            animFrameId = requestAnimationFrame(animate);
        } else {
            // Place final track point marker
            var last = track[track.length - 1];
            if (!last._trailPlaced) {
                last._trailPlaced = true;
                animGroup.addLayer(L.circleMarker([last.lat, last.lng], {
                    radius: 5, fillColor: MAP.windToColor(last.wind), color: '#fff',
                    weight: 1, fillOpacity: 0.8, interactive: false,
                }));
            }
            // Hide the moving icon after completion
            animGroup.removeLayer(movingMarker);
            animGroup.removeLayer(windField);
        }
    }

    function showTyphoonCityImpact(city, typhoon, group) {
        var html = '<div class="typhoon-impact-label">' +
            '<div><b>' + city.city + '</b></div>';
        if (city.deaths) {
            html += '<div style="color:#ff1744;font-weight:bold;">☠️ ' + city.deaths.toLocaleString() + '</div>';
        }
        if (city.damage) {
            html += '<div style="font-size:10px;color:#ff9800;">💰 ' + city.damage + '</div>';
        }
        html += '<div style="font-size:10px;color:#aaa;">' + city.info + '</div>';
        html += '</div>';

        var icon = L.divIcon({ html: html, className: '', iconSize: [0, 0], iconAnchor: [-10, 20] });
        group.addLayer(L.marker([city.lat, city.lng], { icon: icon, interactive: false, zIndexOffset: 2000 }));

        // Impact pulse
        group.addLayer(L.circleMarker([city.lat, city.lng], {
            radius: city.deaths >= 500 ? 18 : city.deaths >= 50 ? 14 : 10,
            color: city.deaths >= 500 ? '#ff1744' : '#e040fb',
            fillColor: city.deaths >= 500 ? '#ff1744' : '#e040fb',
            fillOpacity: 0.25, weight: 2, opacity: 0.6, interactive: false,
        }));
    }

    function cleanup() {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        if (MAP.map.hasLayer(animGroup)) MAP.map.removeLayer(animGroup);
        if (legendEl && legendEl.parentNode) legendEl.parentNode.removeChild(legendEl);
        MAP._typhoonCleanup = null;
        // Clean up _trailPlaced flags
        for (var i = 0; i < track.length; i++) {
            delete track[i]._trailPlaced;
        }
    }

    MAP._typhoonCleanup = cleanup;
    MAP.map.once('click', cleanup);
    animFrameId = requestAnimationFrame(animate);
};
