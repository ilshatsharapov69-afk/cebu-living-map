window.MAP = window.MAP || {};

MAP.getViewportBBox = function() {
    var b = MAP.map.getBounds();
    return b.getSouth().toFixed(2) + ',' + b.getWest().toFixed(2) + ',' + b.getNorth().toFixed(2) + ',' + b.getEast().toFixed(2);
};

MAP.quantizeBBox = function() {
    var b = MAP.map.getBounds();
    // Round to 1 decimal for cache key stability
    return Math.floor(b.getSouth()*10)/10 + ',' + Math.floor(b.getWest()*10)/10 + ',' +
           Math.ceil(b.getNorth()*10)/10 + ',' + Math.ceil(b.getEast()*10)/10;
};

MAP.fetchPOICategory = async function(key) {
    var config = MAP.POI_CATEGORIES[key];
    if (config.static) {
        MAP.poiData[key] = config.points;
        return config.points;
    }

    // Check zoom level — don't fetch for too large area
    if (MAP.map.getZoom() < MAP.MIN_POI_ZOOM) {
        MAP.poiData[key] = config.staticFallback || [];
        return MAP.poiData[key];
    }

    var bbox = MAP.getViewportBBox();
    var quantized = MAP.quantizeBBox();

    // Check cache
    var cacheKey = 'overpass_' + key + '_' + quantized;
    try {
        var cached = sessionStorage.getItem(cacheKey);
        if (cached) {
            var parsed = JSON.parse(cached);
            if (Date.now() - parsed.ts < MAP.CACHE_TTL) {
                MAP.poiData[key] = parsed.data;
                return parsed.data;
            }
        }
    } catch(e) {}

    // Fetch from Overpass
    var overpassData = [];
    try {
        var query = config.buildQuery(bbox);
        var resp = await fetch(MAP.OVERPASS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'data=' + encodeURIComponent(query),
        });
        var json = await resp.json();
        overpassData = MAP.transformOverpass(json.elements || [], key);
    } catch(e) {
        console.warn('Overpass failed for ' + key + ':', e);
    }

    // Merge with static fallback (if any), deduplicating by proximity
    var merged = MAP.mergeWithStatic(overpassData, config.staticFallback || []);
    MAP.poiData[key] = merged;

    try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: merged }));
    } catch(e) {}

    return merged;
};

MAP.mergeWithStatic = function(overpassData, staticData) {
    if (!staticData || staticData.length === 0) return overpassData;
    if (overpassData.length === 0) return staticData;

    // Only include static points within the current viewport
    var b = MAP.map.getBounds();
    var visibleStatic = staticData.filter(function(sp) {
        return b.contains([sp.lat, sp.lng]);
    });

    var merged = overpassData.slice();
    for (var i = 0; i < visibleStatic.length; i++) {
        var sp = visibleStatic[i];
        var isDuplicate = overpassData.some(function(op) {
            var dlat = sp.lat - op.lat;
            var dlng = sp.lng - op.lng;
            return Math.sqrt(dlat*dlat + dlng*dlng) < 0.002; // ~200m
        });
        if (!isDuplicate) merged.push(sp);
    }
    return merged;
};

MAP.transformOverpass = function(elements, categoryKey) {
    return elements.map(function(el) {
        var lat = el.lat || (el.center && el.center.lat);
        var lng = el.lon || (el.center && el.center.lon);
        if (!lat || !lng) return null;

        var tags = el.tags || {};
        var name = tags.name || tags['name:en'] || tags.brand || MAP.inferName(tags);
        var importance = MAP.classifyImportance(el, tags);

        var result = { name: name, lat: lat, lng: lng, importance: importance };
        if (categoryKey === 'beach') {
            result.quality = 5;
            result.sandType = 'mixed';
            result.crowd = 'medium';
            result.activities = ['swimming'];
        }
        return result;
    }).filter(Boolean);
};

MAP.inferName = function(tags) {
    if (tags.operator) return tags.operator;
    var t = tags.shop || tags.amenity || tags.natural || tags.leisure || '';
    var typeLabels = { supermarket:'Supermarket', marketplace:'Market', convenience:'Convenience Store',
                  mall:'Mall', department_store:'Department Store', beach:'Beach', beach_resort:'Beach Resort',
                  greengrocer:'Greengrocer', butcher:'Butcher', seafood:'Seafood Shop' };
    return typeLabels[t] || 'POI';
};

MAP.classifyImportance = function(el, tags) {
    var name = (tags.name || '').toLowerCase();
    var brand = (tags.brand || '').toLowerCase();
    var hasBrand = MAP.KNOWN_BRANDS.some(function(b) { return name.includes(b) || brand.includes(b); });
    if (hasBrand || el.type === 'relation') return 'large';
    if (el.type === 'way' || tags.name) return 'medium';
    return 'small';
};

MAP.fetchSinglePOI = async function(key) {
    var status = document.getElementById('poi-status');
    var config = MAP.POI_CATEGORIES[key];
    status.textContent = 'Загрузка: ' + config.label + '...';
    status.className = 'poi-status loading';

    await MAP.fetchPOICategory(key);
    var count = MAP.poiData[key] ? MAP.poiData[key].length : 0;
    MAP.updateToggleCount(key, count);

    if (MAP.poiVisible[key]) MAP.renderPOICluster(key);

    status.textContent = config.label + ': ' + count + ' точек';
    status.className = 'poi-status';
};

MAP.fetchAllPOIs = async function() {
    var allKeys = Object.keys(MAP.POI_CATEGORIES);
    var keys = allKeys.filter(function(k) { return MAP.poiVisible[k]; });
    if (keys.length === 0) return;

    var status = document.getElementById('poi-status');
    status.textContent = 'Загрузка POI из OpenStreetMap...';
    status.className = 'poi-status loading';

    await Promise.allSettled(keys.map(function(k) { return MAP.fetchPOICategory(k); }));

    var total = 0;
    keys.forEach(function(k) {
        var count = MAP.poiData[k] ? MAP.poiData[k].length : 0;
        total += count;
        MAP.updateToggleCount(k, count);
    });

    status.textContent = 'Загружено ' + total + ' точек';
    status.className = 'poi-status';

    // Render visible categories
    for (var i = 0; i < keys.length; i++) {
        if (MAP.poiVisible[keys[i]]) MAP.renderPOICluster(keys[i]);
    }
};

MAP.refreshVisiblePOIs = function() {
    var keys = Object.keys(MAP.POI_CATEGORIES);
    var hasVisible = keys.some(function(k) { return MAP.poiVisible[k] && !MAP.POI_CATEGORIES[k].static; });
    if (!hasVisible) return;

    MAP.fetchAllPOIs();
};

MAP._poiRefreshTimer = null;
MAP.debouncedRefreshPOIs = function() {
    clearTimeout(MAP._poiRefreshTimer);
    MAP._poiRefreshTimer = setTimeout(MAP.refreshVisiblePOIs, 800);
};
