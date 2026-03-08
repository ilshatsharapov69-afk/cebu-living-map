window.MAP = window.MAP || {};

MAP.renderPOIToggles = function() {
    var container = document.getElementById('poi-toggles');
    container.innerHTML = '';
    var keys = Object.keys(MAP.POI_CATEGORIES);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var config = MAP.POI_CATEGORIES[key];
        MAP.poiVisible[key] = false;
        var div = document.createElement('div');
        div.className = 'poi-toggle';
        div.innerHTML = '<input type="checkbox" id="poi-' + key + '" data-key="' + key + '">' +
            '<span class="poi-color" style="background:' + config.color + '"></span>' +
            '<span>' + config.icon + ' ' + config.label + '</span>' +
            '<span class="poi-count" id="poi-count-' + key + '">...</span>';
        div.querySelector('input').addEventListener('change', (function(k) {
            return function(e) {
                MAP.poiVisible[k] = e.target.checked;
                if (e.target.checked) {
                    if (MAP.poiData[k]) MAP.renderPOICluster(k);
                } else {
                    MAP.removePOICluster(k);
                }
            };
        })(key));
        container.appendChild(div);
    }
};

MAP.updateToggleCount = function(key, count) {
    var el = document.getElementById('poi-count-' + key);
    if (el) el.textContent = count;
};

MAP.renderHazardToggles = function() {
    var container = document.getElementById('hazard-toggles');
    container.innerHTML = '';
    var entries = Object.entries(MAP.HAZARD_CATEGORIES);
    for (var i = 0; i < entries.length; i++) {
        var key = entries[i][0];
        var config = entries[i][1];
        MAP.hazardVisible[key] = false;
        var div = document.createElement('div');
        div.className = 'hazard-toggle';
        div.innerHTML = '<input type="checkbox" id="hazard-' + key + '" data-key="' + key + '">' +
            '<span class="hazard-color" style="background:' + config.color + '"></span>' +
            '<span>' + config.icon + ' ' + config.label + '</span>' +
            '<span class="hazard-count" id="hazard-count-' + key + '"></span>';
        div.querySelector('input').addEventListener('change', (function(k) {
            return function(e) {
                MAP.toggleHazardLayer(k, e.target.checked);
            };
        })(key));
        container.appendChild(div);
    }
};

MAP.renderSliders = function() {
    var container = document.getElementById('sliders');
    container.innerHTML = '';
    for (var i = 0; i < MAP.FACTORS.length; i++) {
        var f = MAP.FACTORS[i];
        var div = document.createElement('div');
        div.className = 'slider-item';
        div.innerHTML =
            '<input type="checkbox" class="factor-check" data-key="' + f.key + '" ' +
                (MAP.checkedFactors[f.key] ? 'checked' : '') + '>' +
            '<span class="icon">' + f.icon + '</span>' +
            '<label>' + f.label + '</label>' +
            '<input type="range" min="0" max="10" value="' + MAP.filterThresholds[f.key] + '">' +
            '<span class="wv" id="wv-' + f.key + '">' + MAP.filterThresholds[f.key] + '</span>';

        // Checkbox handler — toggle factor in score calculation
        div.querySelector('.factor-check').addEventListener('change', (function(fKey) {
            return function(e) {
                MAP.checkedFactors[fKey] = e.target.checked;
                MAP.renderMarkers();
                MAP.renderRankings();
            };
        })(f.key));

        // Slider handler — set filter threshold
        div.querySelector('input[type=range]').addEventListener('input', (function(fKey) {
            return function(e) {
                MAP.filterThresholds[fKey] = parseInt(e.target.value);
                document.getElementById('wv-' + fKey).textContent = e.target.value;
                MAP.renderMarkers();
                MAP.renderRankings();
            };
        })(f.key));

        container.appendChild(div);
    }
};

MAP.renderRankings = function() {
    var container = document.getElementById('rankings');
    var scored = MAP.LOCATIONS
        .filter(function(loc) { return MAP.passesFilter(loc); })
        .map(function(loc) { return { loc: loc, score: MAP.getScore(loc) }; });
    scored.sort(function(a, b) { return b.score - a.score; });
    container.innerHTML = '';

    if (scored.length === 0) {
        container.innerHTML = '<div style="text-align:center;color:#666;padding:20px;font-size:11px;">Нет подходящих локаций.<br>Уменьшите пороги фильтров.</div>';
        return;
    }

    scored.forEach(function(item, i) {
        var c = MAP.scoreToColor(item.score);
        var div = document.createElement('div');
        div.className = 'rank-item';
        div.innerHTML = '<span class="rank-num">' + (i+1) + '.</span><span class="rank-dot" style="background:' + c + '"></span>' +
            '<span class="rank-name">' + item.loc.name + '</span><span class="rank-score" style="color:' + c + '">' + Math.round(item.score) + '</span>';
        div.addEventListener('click', (function(loc) {
            return function() {
                MAP.map.flyTo([loc.lat, loc.lng], 14, { duration: 1 });
                setTimeout(function() { if (loc._marker) loc._marker.openPopup(); }, 1100);
            };
        })(item.loc));
        container.appendChild(div);
    });
};

MAP.resetWeights = function() {
    MAP.FACTORS.forEach(function(f) {
        MAP.checkedFactors[f.key] = true;
        MAP.filterThresholds[f.key] = 0;
    });
    MAP.renderSliders();
    MAP.renderMarkers();
    MAP.renderRankings();
};
