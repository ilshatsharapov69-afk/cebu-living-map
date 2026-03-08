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
        label: 'Convenience stores',
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
        staticFallback: [
            // Moalboal
            { name:'Panagsama Beach', lat:9.9340, lng:123.3870, importance:'large' },
            { name:'White Beach Moalboal', lat:9.9230, lng:123.3780, importance:'large' },
            { name:'Basdaku Beach', lat:9.9280, lng:123.3820, importance:'medium' },
            // Bantayan
            { name:'Sugar Beach Bantayan', lat:11.1580, lng:123.7120, importance:'large' },
            { name:'Paradise Beach Bantayan', lat:11.1700, lng:123.7100, importance:'large' },
            { name:'Kota Beach Bantayan', lat:11.1630, lng:123.7080, importance:'medium' },
            // Malapascua
            { name:'Bounty Beach', lat:11.3260, lng:124.1100, importance:'large' },
            { name:'Langob Beach', lat:11.3310, lng:124.1040, importance:'medium' },
            // Camotes
            { name:'Santiago White Beach', lat:10.6700, lng:124.3600, importance:'large' },
            { name:'Mangodlong Beach', lat:10.6550, lng:124.3750, importance:'medium' },
            // Panglao
            { name:'Alona Beach', lat:9.5540, lng:123.7680, importance:'large' },
            { name:'Dumaluan Beach', lat:9.5520, lng:123.7510, importance:'large' },
            { name:'Doljo Beach', lat:9.5890, lng:123.7350, importance:'medium' },
            { name:'Bikini Beach Panglao', lat:9.5530, lng:123.7600, importance:'medium' },
            { name:'Danao Beach Panglao', lat:9.5580, lng:123.7780, importance:'medium' },
            // Anda Bohol
            { name:'Quinale Beach', lat:9.7350, lng:124.2850, importance:'large' },
            { name:'Cabagnow Cave Pool', lat:9.7410, lng:124.2730, importance:'medium' },
            // Oslob
            { name:'Tumalog Falls Beach', lat:9.4650, lng:123.4350, importance:'medium' },
            { name:'Sumilon Island Beach', lat:9.4380, lng:123.4850, importance:'large' },
            // Argao
            { name:'Mahayahay Beach', lat:9.8780, lng:123.5970, importance:'medium' },
            // Dumaguete area
            { name:'Rizal Boulevard Beach', lat:9.3010, lng:123.3020, importance:'medium' },
            { name:'Dauin Beach', lat:9.1870, lng:123.2680, importance:'large' },
            { name:'Apo Island Beach', lat:9.0720, lng:123.2700, importance:'large' },
            { name:'Zamboanguita Beach', lat:9.1020, lng:123.2100, importance:'medium' },
            { name:'Manjuyod Sandbar', lat:9.4960, lng:123.1580, importance:'large' },
            // Siquijor
            { name:'Paliton Beach', lat:9.1850, lng:123.4680, importance:'large' },
            { name:'Salagdoong Beach', lat:9.2280, lng:123.5750, importance:'large' },
            { name:'Solangon Beach', lat:9.1740, lng:123.5070, importance:'medium' },
            { name:'Kagusuan Beach', lat:9.1760, lng:123.4840, importance:'medium' },
            // Mactan/Cebu
            { name:'Mactan Newtown Beach', lat:10.3100, lng:123.9700, importance:'medium' },
            { name:'Shangri-La Beach Mactan', lat:10.2900, lng:124.0030, importance:'large' },
            { name:'Maribago Beach', lat:10.2820, lng:123.9960, importance:'medium' },
            { name:'Cordova Beach', lat:10.2600, lng:123.9580, importance:'medium' },
            // Liloan area
            { name:'Silot Bay Beach', lat:10.4010, lng:124.0050, importance:'small' },
            // Boracay
            { name:'White Beach Boracay', lat:11.9650, lng:121.9230, importance:'large' },
            { name:'Bulabog Beach', lat:11.9670, lng:121.9310, importance:'large' },
            { name:'Diniwid Beach', lat:11.9780, lng:121.9190, importance:'medium' },
            { name:'Puka Shell Beach', lat:11.9830, lng:121.9250, importance:'large' },
            // Palawan
            { name:'Nacpan Beach El Nido', lat:11.2470, lng:119.4120, importance:'large' },
            { name:'Las Cabanas Beach', lat:11.1560, lng:119.3750, importance:'large' },
            { name:'Long Beach San Vicente', lat:10.5600, lng:119.2700, importance:'large' },
            { name:'Honda Bay Beach', lat:9.8200, lng:118.7800, importance:'medium' },
            { name:'Nagtabon Beach', lat:9.7900, lng:118.6800, importance:'medium' },
            // Siargao
            { name:'Cloud 9 Beach', lat:9.8200, lng:126.1200, importance:'large' },
            { name:'General Luna Beach', lat:9.7900, lng:126.1100, importance:'large' },
            { name:'Daku Island Beach', lat:9.8400, lng:126.0900, importance:'medium' },
            // Camiguin
            { name:'White Island Camiguin', lat:9.2200, lng:124.6500, importance:'large' },
            { name:'Mantigue Island Beach', lat:9.1400, lng:124.8100, importance:'large' },
            // La Union
            { name:'San Juan Surf Beach', lat:16.6282, lng:120.3587, importance:'large' },
            { name:'Urbiztondo Beach', lat:16.6300, lng:120.3560, importance:'medium' },
            // Zambales/Subic
            { name:'Crystal Beach Zambales', lat:15.1500, lng:119.9600, importance:'medium' },
            { name:'Anawangin Cove', lat:14.8900, lng:120.1400, importance:'large' },
            // Batangas
            { name:'Laiya Beach', lat:13.6700, lng:121.3800, importance:'large' },
            { name:'Nasugbu Beach', lat:14.0700, lng:120.6100, importance:'medium' },
        ],
    },
    immigration: {
        label: 'Офисы BI',
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
        label: 'Fiber зоны',
        icon: '📶',
        color: '#00bcd4',
        static: true,
        points: [
            // Cebu
            { name: 'PLDT/Converge Cebu Center', lat: 10.3100, lng: 123.8920, importance: 'large' },
            { name: 'IT Park Fiber Hub', lat: 10.3290, lng: 123.9050, importance: 'large' },
            { name: 'Lahug/Banilad Fiber', lat: 10.3400, lng: 123.8970, importance: 'medium' },
            { name: 'Mandaue Fiber', lat: 10.3330, lng: 123.9320, importance: 'medium' },
            { name: 'Consolacion Fiber', lat: 10.3770, lng: 123.9600, importance: 'medium' },
            { name: 'Liloan Fiber', lat: 10.3980, lng: 123.9930, importance: 'medium' },
            { name: 'Talisay Fiber', lat: 10.2450, lng: 123.8480, importance: 'medium' },
            { name: 'Minglanilla Fiber', lat: 10.2430, lng: 123.7940, importance: 'small' },
            // Bohol
            { name: 'PLDT Tagbilaran', lat: 9.6490, lng: 123.8530, importance: 'large' },
            { name: 'Converge Tagbilaran', lat: 9.6510, lng: 123.8560, importance: 'medium' },
            // Negros
            { name: 'PLDT Dumaguete', lat: 9.3060, lng: 123.3050, importance: 'large' },
            { name: 'Converge Dumaguete', lat: 9.3080, lng: 123.3070, importance: 'medium' },
            // Metro Manila
            { name: 'Makati Fiber Hub', lat: 14.5547, lng: 121.0244, importance: 'large' },
            { name: 'BGC Fiber Hub', lat: 14.5515, lng: 121.0509, importance: 'large' },
            { name: 'Quezon City Fiber', lat: 14.6760, lng: 121.0437, importance: 'large' },
            { name: 'Ortigas Fiber Hub', lat: 14.5764, lng: 121.0851, importance: 'large' },
            { name: 'Alabang Fiber', lat: 14.4231, lng: 121.0397, importance: 'medium' },
            // Luzon
            { name: 'Clark Fiber Hub', lat: 15.1852, lng: 120.5464, importance: 'large' },
            { name: 'Baguio Fiber', lat: 16.4023, lng: 120.5960, importance: 'medium' },
            { name: 'Legazpi Fiber', lat: 13.1391, lng: 123.7438, importance: 'medium' },
            // Western Visayas
            { name: 'Iloilo Fiber Hub', lat: 10.6918, lng: 122.5621, importance: 'large' },
            { name: 'Bacolod Fiber', lat: 10.6840, lng: 122.9563, importance: 'large' },
            // Mindanao
            { name: 'Davao Fiber Hub', lat: 7.0707, lng: 125.6087, importance: 'large' },
            { name: 'CDO Fiber Hub', lat: 8.4542, lng: 124.6319, importance: 'large' },
            // Palawan
            { name: 'Puerto Princesa Fiber', lat: 9.7392, lng: 118.7353, importance: 'medium' },
            // Eastern Visayas
            { name: 'Tacloban Fiber', lat: 11.2494, lng: 124.9600, importance: 'medium' },
        ],
    },
};
