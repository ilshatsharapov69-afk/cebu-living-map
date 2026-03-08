window.MAP = window.MAP || {};

MAP.HAZARD_CATEGORIES = {
    earthquake: {
        label: 'Землетрясения', icon: '🌍', color: '#e74c3c',
        gradient: {0.1:'#fee5d9',0.3:'#fcae91',0.5:'#fb6a4a',0.7:'#de2d26',1.0:'#a50f15'},
    },
    volcano: {
        label: 'Вулканы', icon: '🌋', color: '#ff5722',
        points: [
            { name: 'Mount Kanlaon', lat: 10.4124, lng: 123.1320, status: 'Active', elevation: '2435m',
              dangerRadii: [6000, 14000, 20000] },
            { name: 'Taal Volcano', lat: 14.0113, lng: 120.9980, status: 'Active', elevation: '311m',
              dangerRadii: [7000, 14000, 17000] },
            { name: 'Mayon Volcano', lat: 13.2570, lng: 123.6850, status: 'Active', elevation: '2462m',
              dangerRadii: [6000, 8000, 15000] },
            { name: 'Mount Pinatubo', lat: 15.1429, lng: 120.3496, status: 'Active', elevation: '1486m',
              dangerRadii: [10000, 20000, 40000] },
            { name: 'Mount Bulusan', lat: 12.7697, lng: 124.0508, status: 'Active', elevation: '1565m',
              dangerRadii: [4000, 8000, 12000] },
            { name: 'Mount Hibok-Hibok', lat: 9.2030, lng: 124.6730, status: 'Active', elevation: '1332m',
              dangerRadii: [4000, 8000, 12000] },
            { name: 'Mount Apo', lat: 7.0005, lng: 125.2708, status: 'Active', elevation: '2954m',
              dangerRadii: [6000, 12000, 18000] },
        ],
        faultLines: [
            { name: 'Central Cebu Fault', coords: [[11.2,123.85],[10.8,123.82],[10.4,123.80],[10.0,123.70],[9.6,123.55],[9.4,123.45]] },
            { name: 'East Bohol Fault', coords: [[9.9,124.1],[9.7,124.0],[9.5,123.9],[9.4,123.85]] },
            { name: 'Philippine Fault (main)', coords: [[18.5,121.0],[17.5,121.2],[16.5,121.3],[15.5,121.4],[14.5,121.5],[13.5,123.0],[12.5,124.0],[11.5,125.0],[10.5,125.5],[9.5,126.0],[8.5,126.3],[7.5,126.5]] },
            { name: 'West Valley Fault', coords: [[14.85,121.05],[14.70,121.03],[14.55,121.00],[14.40,120.95],[14.30,120.90]] },
            { name: 'Marikina Valley Fault', coords: [[14.80,121.12],[14.65,121.10],[14.50,121.08],[14.35,121.05]] },
            { name: 'Mindanao Fault', coords: [[9.0,125.5],[8.5,125.8],[8.0,126.0],[7.5,126.0],[7.0,126.0]] },
        ],
    },
    typhoon: {
        label: 'Тайфуны', icon: '🌀', color: '#9b59b6',
        data: MAP.TYPHOON_EVENTS,
        gradient: {0.1:'#f3e5f5',0.3:'#ce93d8',0.5:'#ab47bc',0.7:'#7b1fa2',1.0:'#4a148c'},
    },
    flood: {
        label: 'Наводнения', icon: '🌊', color: '#3498db',
        data: MAP.FLOOD_EVENTS,
        gradient: {0.1:'#e3f2fd',0.3:'#90caf9',0.5:'#42a5f5',0.7:'#1565c0',1.0:'#0d47a1'},
    },
    landslide: {
        label: 'Оползни', icon: '⛰️', color: '#795548',
        data: MAP.LANDSLIDE_EVENTS,
        gradient: {0.1:'#efebe9',0.3:'#bcaaa4',0.5:'#8d6e63',0.7:'#5d4037',1.0:'#3e2723'},
    },
    crime: {
        label: 'Криминал', icon: '🚔', color: '#e91e63',
        data: MAP.CRIME_EVENTS,
        gradient: {0.1:'#fce4ec',0.3:'#f48fb1',0.5:'#e91e63',0.7:'#c2185b',1.0:'#880e4f'},
    },
    health: {
        label: 'Здоровье', icon: '🏥', color: '#ff9800',
        data: MAP.HEALTH_EVENTS,
        gradient: {0.1:'#fff3e0',0.3:'#ffcc80',0.5:'#ff9800',0.7:'#e65100',1.0:'#bf360c'},
    },
};

MAP.USGS_EARTHQUAKE_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?' +
    'format=geojson&minlatitude=4&maxlatitude=21&minlongitude=116&maxlongitude=128' +
    '&minmagnitude=3&starttime=2014-01-01&orderby=magnitude&limit=1000';
