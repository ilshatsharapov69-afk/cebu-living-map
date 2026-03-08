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

MAP.renderRatingModeSelect = function() {
    var select = document.getElementById('rating-mode');
    var html = '<option value="composite">Все факторы (composite)</option>';
    for (var i = 0; i < MAP.FACTORS.length; i++) {
        var f = MAP.FACTORS[i];
        html += '<option value="' + f.key + '">' + f.icon + ' ' + f.label + '</option>';
    }
    select.innerHTML = html;
};

MAP.switchRatingMode = function(mode) {
    MAP.ratingMode = mode;
    var items = document.querySelectorAll('.slider-item');
    items.forEach(function(el) { el.classList.toggle('disabled', mode !== 'composite'); });
    document.getElementById('reset-btn').style.opacity = mode !== 'composite' ? '0.3' : '1';
    document.getElementById('reset-btn').style.pointerEvents = mode !== 'composite' ? 'none' : 'auto';
    MAP.renderMarkers();
    MAP.renderRankings();
};

MAP.renderSliders = function() {
    var container = document.getElementById('sliders');
    container.innerHTML = '';
    for (var i = 0; i < MAP.FACTORS.length; i++) {
        var f = MAP.FACTORS[i];
        var div = document.createElement('div');
        div.className = 'slider-item' + (MAP.ratingMode !== 'composite' ? ' disabled' : '');
        div.innerHTML = '<span class="icon">' + f.icon + '</span><label>' + f.label + '</label>' +
            '<input type="range" min="0" max="5" value="' + MAP.currentWeights[f.key] + '">' +
            '<span class="wv" id="wv-' + f.key + '">' + MAP.currentWeights[f.key] + '</span>';
        div.querySelector('input').addEventListener('input', (function(fKey) {
            return function(e) {
                MAP.currentWeights[fKey] = parseInt(e.target.value);
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
    var scored = MAP.LOCATIONS.map(function(loc) { return { loc: loc, score: MAP.getScore(loc) }; });
    scored.sort(function(a, b) { return b.score - a.score; });
    container.innerHTML = '';
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
    MAP.FACTORS.forEach(function(f) { MAP.currentWeights[f.key] = f.defaultWeight; });
    MAP.renderSliders();
    MAP.renderMarkers();
    MAP.renderRankings();
};
