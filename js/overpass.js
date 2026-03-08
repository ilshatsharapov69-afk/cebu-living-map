window.MAP = window.MAP || {};

MAP.fetchPOICategory = async function(key) {
    var config = MAP.POI_CATEGORIES[key];
    if (config.static) {
        MAP.poiData[key] = config.points;
        return config.points;
    }

    // Check cache
    var cacheKey = 'overpass_' + key;
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
        var resp = await fetch(MAP.OVERPASS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'data=' + encodeURIComponent(config.query),
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

    var merged = overpassData.slice();
    for (var i = 0; i < staticData.length; i++) {
        var sp = staticData[i];
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

        return { name: name, lat: lat, lng: lng, importance: importance };
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

MAP.fetchAllPOIs = async function() {
    var status = document.getElementById('poi-status');
    status.textContent = 'Загрузка POI из OpenStreetMap...';
    status.className = 'poi-status loading';

    var keys = Object.keys(MAP.POI_CATEGORIES);
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
