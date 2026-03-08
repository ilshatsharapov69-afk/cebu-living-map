window.MAP = window.MAP || {};

MAP.BBOX = '9.0,123.0,11.5,124.6';
MAP.OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
MAP.CACHE_TTL = 3600000; // 1 hour

MAP.KNOWN_BRANDS = ['sm', 'gaisano', 'robinsons', 'ayala', 'metro', 'savemore', 'puregold', 'mercury', '7-eleven', 'ministop', 'island city mall', 'alturas', 'bq mall', 'lee super plaza', 'citymall'];

var BBOX = MAP.BBOX; // local alias for template literals below

MAP.POI_CATEGORIES = {
    food: {
        label: 'Рынки / Еда',
        icon: '🥬',
        color: '#27ae60',
        query: `[out:json][timeout:30];(node["amenity"="marketplace"](${BBOX});way["amenity"="marketplace"](${BBOX});node["shop"="supermarket"](${BBOX});way["shop"="supermarket"](${BBOX});node["shop"="greengrocer"](${BBOX});node["shop"="butcher"](${BBOX});node["shop"="seafood"](${BBOX}););out center body;`,
    },
    shopsWalkable: {
        label: 'Моллы / Магазины',
        icon: '🏪',
        color: '#3498db',
        query: `[out:json][timeout:30];(node["shop"="mall"](${BBOX});way["shop"="mall"](${BBOX});relation["shop"="mall"](${BBOX});node["shop"="department_store"](${BBOX});way["shop"="department_store"](${BBOX}););out center body;`,
    },
    convenience: {
        label: 'Convenience stores',
        icon: '🏬',
        color: '#e67e22',
        query: `[out:json][timeout:30];(node["shop"="convenience"](${BBOX}););out body;`,
        disableClusteringAtZoom: 16,
    },
    beach: {
        label: 'Пляжи',
        icon: '🏖️',
        color: '#f0c040',
        query: `[out:json][timeout:30];(node["natural"="beach"](${BBOX});way["natural"="beach"](${BBOX});node["leisure"="beach_resort"](${BBOX});way["leisure"="beach_resort"](${BBOX}););out center body;`,
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
        ],
    },
    immigration: {
        label: 'Офисы BI',
        icon: '🏛️',
        color: '#8e44ad',
        static: true,
        points: [
            { name: 'BI Cebu Main (J Centre Mall)', lat: 10.3310, lng: 123.9060, importance: 'large' },
            { name: 'BI Cebu Pier', lat: 10.2970, lng: 123.9020, importance: 'large' },
            { name: 'BI Tagbilaran', lat: 9.6480, lng: 123.8540, importance: 'large' },
            { name: 'BI Panglao', lat: 9.5780, lng: 123.7750, importance: 'medium' },
            { name: 'BI Dumaguete', lat: 9.3055, lng: 123.3040, importance: 'large' },
        ],
    },
    internet: {
        label: 'Fiber зоны',
        icon: '📶',
        color: '#00bcd4',
        static: true,
        points: [
            { name: 'PLDT/Converge Cebu Center', lat: 10.3100, lng: 123.8920, importance: 'large' },
            { name: 'IT Park Fiber Hub', lat: 10.3290, lng: 123.9050, importance: 'large' },
            { name: 'Lahug/Banilad Fiber', lat: 10.3400, lng: 123.8970, importance: 'medium' },
            { name: 'Mandaue Fiber', lat: 10.3330, lng: 123.9320, importance: 'medium' },
            { name: 'Consolacion Fiber', lat: 10.3770, lng: 123.9600, importance: 'medium' },
            { name: 'Liloan Fiber', lat: 10.3980, lng: 123.9930, importance: 'medium' },
            { name: 'Talisay Fiber', lat: 10.2450, lng: 123.8480, importance: 'medium' },
            { name: 'Minglanilla Fiber', lat: 10.2430, lng: 123.7940, importance: 'small' },
            { name: 'PLDT Tagbilaran', lat: 9.6490, lng: 123.8530, importance: 'large' },
            { name: 'Converge Tagbilaran', lat: 9.6510, lng: 123.8560, importance: 'medium' },
            { name: 'PLDT Dumaguete', lat: 9.3060, lng: 123.3050, importance: 'large' },
            { name: 'Converge Dumaguete', lat: 9.3080, lng: 123.3070, importance: 'medium' },
        ],
    },
};
