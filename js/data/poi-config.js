window.MAP = window.MAP || {};

MAP.OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
MAP.CACHE_TTL = 3600000; // 1 hour
MAP.MIN_POI_ZOOM = 8; // don't fetch POIs below this zoom level

MAP.KNOWN_BRANDS = ['sm', 'gaisano', 'robinsons', 'ayala', 'metro', 'savemore', 'puregold', 'mercury', '7-eleven', 'ministop', 'island city mall', 'alturas', 'bq mall', 'lee super plaza', 'citymall'];

MAP.POI_CATEGORIES = {
    food: {
        label: 'Рынки / Еда',
        icon: '🥬',
        color: '#27ae60',
        buildQuery: function(bbox) {
            return '[out:json][timeout:30];(node["amenity"="marketplace"](' + bbox + ');way["amenity"="marketplace"](' + bbox + ');node["shop"="supermarket"](' + bbox + ');way["shop"="supermarket"](' + bbox + ');node["shop"="greengrocer"](' + bbox + ');node["shop"="butcher"](' + bbox + ');node["shop"="seafood"](' + bbox + '););out center body;';
        },
    },
    shopsWalkable: {
        label: 'Моллы / Магазины',
        icon: '🏪',
        color: '#3498db',
        buildQuery: function(bbox) {
            return '[out:json][timeout:30];(node["shop"="mall"](' + bbox + ');way["shop"="mall"](' + bbox + ');relation["shop"="mall"](' + bbox + ');node["shop"="department_store"](' + bbox + ');way["shop"="department_store"](' + bbox + '););out center body;';
        },
    },
    convenience: {
        label: 'Минимаркеты',
        icon: '🏬',
        color: '#e67e22',
        buildQuery: function(bbox) {
            return '[out:json][timeout:30];(node["shop"="convenience"](' + bbox + '););out body;';
        },
        disableClusteringAtZoom: 16,
    },
    beach: {
        label: 'Пляжи',
        icon: '🏖️',
        color: '#f0c040',
        buildQuery: function(bbox) {
            return '[out:json][timeout:30];(node["natural"="beach"](' + bbox + ');way["natural"="beach"](' + bbox + ');node["leisure"="beach_resort"](' + bbox + ');way["leisure"="beach_resort"](' + bbox + '););out center body;';
        },
        disableClusteringAtZoom: 12,
        staticFallback: [], // данные загружаются из js/data/beach-data.js → MAP.BEACHES
    },
    immigration: {
        label: 'Офисы миграционной службы',
        icon: '🏛️',
        color: '#8e44ad',
        static: true,
        points: [
            // Cebu
            { name: 'BI Cebu Main (J Centre Mall)', lat: 10.3310, lng: 123.9060, importance: 'large' },
            { name: 'BI Cebu Pier', lat: 10.2970, lng: 123.9020, importance: 'large' },
            // Bohol
            { name: 'BI Tagbilaran', lat: 9.6480, lng: 123.8540, importance: 'large' },
            { name: 'BI Panglao', lat: 9.5780, lng: 123.7750, importance: 'medium' },
            // Negros
            { name: 'BI Dumaguete', lat: 9.3055, lng: 123.3040, importance: 'large' },
            // Manila
            { name: 'BI Manila Main Office', lat: 14.5896, lng: 120.9813, importance: 'large' },
            { name: 'BI NAIA Terminal 1', lat: 14.5086, lng: 121.0197, importance: 'large' },
            // Luzon
            { name: 'BI Clark', lat: 15.1860, lng: 120.5470, importance: 'large' },
            { name: 'BI Subic', lat: 14.8100, lng: 120.2830, importance: 'medium' },
            { name: 'BI Legazpi', lat: 13.1400, lng: 123.7440, importance: 'medium' },
            // Western Visayas
            { name: 'BI Iloilo', lat: 10.6953, lng: 122.5646, importance: 'large' },
            { name: 'BI Bacolod', lat: 10.6803, lng: 122.9568, importance: 'large' },
            { name: 'BI Boracay (Caticlan)', lat: 11.9250, lng: 121.9530, importance: 'medium' },
            // Eastern Visayas
            { name: 'BI Tacloban', lat: 11.2500, lng: 124.9580, importance: 'large' },
            // Palawan
            { name: 'BI Puerto Princesa', lat: 9.7420, lng: 118.7360, importance: 'large' },
            // Mindanao
            { name: 'BI Davao', lat: 7.0648, lng: 125.6111, importance: 'large' },
            { name: 'BI Cagayan de Oro', lat: 8.4789, lng: 124.6422, importance: 'large' },
            { name: 'BI General Santos', lat: 6.1120, lng: 125.1720, importance: 'medium' },
            { name: 'BI Zamboanga', lat: 6.9080, lng: 122.0710, importance: 'large' },
        ],
    },
    internet: {
        label: 'Качество интернета',
        icon: '📶',
        color: '#00bcd4',
        static: true,
        dynamicFromLocations: true,
        points: [], // populated from MAP.LOCATIONS in app.js
        disableClusteringAtZoom: 8,
    },
    attractions: {
        label: 'Достопримечательности',
        icon: '⭐',
        color: '#e74c3c',
        static: true,
        markerType: 'star',
        zoomFilter: function(points, zoom) {
            if (zoom >= 12) return points;
            if (zoom >= 9) return points.filter(function(p) { return p.tier <= 2; });
            return points.filter(function(p) { return p.tier === 1; });
        },
        disableClusteringAtZoom: 14,
        points: [],
    },
};
