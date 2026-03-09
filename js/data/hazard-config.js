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
              dangerRadii: [6000, 14000, 20000],
              eruptions: [
                  { date: '2024-12-09', vei: 2, casualties: 0, ashDirection: 'W', ashReachKm: 15, ashDurationDays: 3,
                    info: 'Внезапное извержение. Пепловой столб 3 км. 87,000 эвакуированы. Alert Level 3.',
                    affectedCities: [
                        {name:'La Carlota',lat:10.42,lng:122.92,pop:63000,ashMm:5,info:'Пепел покрыл крыши и посевы'},
                        {name:'Kabankalan',lat:9.58,lng:122.82,pop:90000,ashMm:2,info:'Лёгкое пеплопадение'},
                        {name:'Bago City',lat:10.54,lng:122.84,pop:170000,ashMm:8,info:'Активная эвакуация зоны 6км'},
                        {name:'Bacolod',lat:10.68,lng:122.97,pop:600000,ashMm:1,info:'Мелкий пепел, закрыты школы'},
                    ]},
                  { date: '2006-08-10', vei: 1, casualties: 4, ashDirection: 'SW', ashReachKm: 10, ashDurationDays: 2,
                    info: '4 альпиниста погибли от пирокластических потоков. Извержение без предупреждения.',
                    affectedCities: [
                        {name:'La Castellana',lat:10.33,lng:122.98,pop:36000,ashMm:10,info:'Ближайший город. Пирокластика дошла до окраин'},
                    ]},
                  { date: '1996-08-10', vei: 2, casualties: 3, ashDirection: 'W', ashReachKm: 12, ashDurationDays: 4,
                    info: 'Фреатическое извержение. 3 погибших от лахаров.',
                    affectedCities: [
                        {name:'La Carlota',lat:10.42,lng:122.92,pop:60000,ashMm:4,info:'Лахары и пеплопадение'},
                    ]},
              ],
              threatenedLocations: ['bacolod', 'silay', 'kabankalan', 'iloilo-city', 'dumaguete']
            },
            { name: 'Taal Volcano', lat: 14.0113, lng: 120.9980, status: 'Active', elevation: '311m',
              dangerRadii: [7000, 14000, 17000],
              eruptions: [
                  { date: '2020-01-12', vei: 4, casualties: 39, ashDirection: 'NE', ashReachKm: 60, ashDurationDays: 14,
                    info: 'Фреатомагматическое извержение. Пепловой столб 15 км. 376,000 эвакуированы. Пепел накрыл Metro Manila.',
                    ashAreaKm2: 8500,
                    affectedCities: [
                        {name:'Tagaytay',lat:14.10,lng:120.96,pop:77000,ashMm:50,info:'Полная эвакуация. 2км от кратера. Пепел 5см'},
                        {name:'Talisay, Batangas',lat:14.09,lng:121.02,pop:40000,ashMm:100,info:'Внутри PDZ. Полная эвакуация'},
                        {name:'Agoncillo',lat:13.93,lng:120.93,pop:39000,ashMm:80,info:'Полная эвакуация. Лахары угроза'},
                        {name:'Lemery',lat:13.87,lng:120.91,pop:83000,ashMm:40,info:'Частичная эвакуация'},
                        {name:'Lipa City',lat:13.94,lng:121.16,pop:370000,ashMm:15,info:'Пепел 1.5см. Школы закрыты'},
                        {name:'Batangas City',lat:13.76,lng:121.06,pop:330000,ashMm:10,info:'Пепел покрыл город. Порт остановлен'},
                        {name:'Calamba',lat:14.21,lng:121.17,pop:500000,ashMm:8,info:'Пепел из облака. Промышленная зона остановлена'},
                        {name:'Alabang/Muntinlupa',lat:14.42,lng:121.04,pop:500000,ashMm:3,info:'Пепел на автомобилях. Видимость снижена'},
                        {name:'Makati/BGC',lat:14.55,lng:121.03,pop:600000,ashMm:2,info:'Тонкий слой пепла. Рейсы отменены'},
                        {name:'Manila',lat:14.60,lng:120.98,pop:1800000,ashMm:1,info:'NAIA закрыт. 500+ рейсов отменено'},
                    ]},
                  { date: '1965-09-28', vei: 4, casualties: 200, ashDirection: 'SW', ashReachKm: 25, ashDurationDays: 7,
                    info: 'Базисный поток уничтожил несколько посёлков на берегу озера.',
                    ashAreaKm2: 1200,
                    affectedCities: [
                        {name:'Talisay',lat:14.09,lng:121.02,pop:15000,ashMm:80,info:'Базисный поток. Десятки погибших'},
                        {name:'San Nicolas',lat:13.93,lng:120.95,pop:10000,ashMm:60,info:'Посёлок уничтожен'},
                    ]},
                  { date: '1911-01-30', vei: 4, casualties: 1335, ashDirection: 'SW', ashReachKm: 30, ashDurationDays: 5,
                    info: 'Самое смертоносное извержение Тааля. Базисный поток уничтожил целые поселения.',
                    ashAreaKm2: 1800,
                    affectedCities: [
                        {name:'Talisay',lat:14.09,lng:121.02,pop:3000,ashMm:200,info:'Полное разрушение. Сотни погибших'},
                        {name:'Бухта Bombon',lat:13.90,lng:121.00,pop:5000,ashMm:100,info:'Поселения у озера стёрты'},
                    ]},
              ],
              threatenedLocations: ['tagaytay', 'batangas-city', 'lipa', 'nasugbu', 'calamba', 'santa-rosa', 'las-pinas', 'paranaque', 'alabang', 'cavite-city', 'dasmarinas']
            },
            { name: 'Mayon Volcano', lat: 13.2570, lng: 123.6850, status: 'Active', elevation: '2462m',
              dangerRadii: [6000, 8000, 15000],
              eruptions: [
                  { date: '2018-01-22', vei: 3, casualties: 0, ashDirection: 'W', ashReachKm: 9, ashDurationDays: 5,
                    info: 'Лавовые фонтаны и пирокластические потоки. 90,000 эвакуированы. Alert Level 4.',
                    ashAreaKm2: 250,
                    affectedCities: [
                        {name:'Legazpi City',lat:13.14,lng:123.73,pop:210000,ashMm:15,info:'Эвакуация зон у реки. Пепел на зданиях'},
                        {name:'Daraga',lat:13.16,lng:123.70,pop:130000,ashMm:20,info:'Прямо у подножия. Массовая эвакуация'},
                        {name:'Camalig',lat:13.13,lng:123.67,pop:90000,ashMm:25,info:'Зона пирокластических потоков'},
                        {name:'Guinobatan',lat:13.18,lng:123.60,pop:80000,ashMm:10,info:'Пепел и лахары при дождях'},
                    ]},
                  { date: '1993-02-02', vei: 3, casualties: 77, ashDirection: 'SW', ashReachKm: 12, ashDurationDays: 7,
                    info: '77 погибших, включая 30 школьников и учителей от пирокластического потока.',
                    ashAreaKm2: 350,
                    affectedCities: [
                        {name:'Legazpi City',lat:13.14,lng:123.73,pop:150000,ashMm:20,info:'Пирокластический поток дошёл до окраин'},
                        {name:'Budiao',lat:13.23,lng:123.62,pop:5000,ashMm:50,info:'Школа накрыта пирокластикой. 30 детей погибли'},
                        {name:'Camalig',lat:13.13,lng:123.67,pop:70000,ashMm:30,info:'Эвакуация после пирокластических потоков'},
                    ]},
                  { date: '1814-02-01', vei: 4, casualties: 1200, ashDirection: 'S', ashReachKm: 30, ashDurationDays: 14,
                    info: 'Сильнейшее извержение Майона. Город Cagsawa погребён. Осталась только колокольня церкви.',
                    ashAreaKm2: 2000,
                    affectedCities: [
                        {name:'Cagsawa',lat:13.14,lng:123.69,pop:5000,ashMm:500,info:'Город полностью погребён. 1200 погибших в церкви'},
                        {name:'Budiao',lat:13.23,lng:123.62,pop:2000,ashMm:100,info:'Лахары и пеплопадение'},
                        {name:'Camalig',lat:13.13,lng:123.67,pop:8000,ashMm:80,info:'Тяжёлые разрушения от лахаров'},
                    ]},
              ],
              threatenedLocations: ['legazpi', 'naga-camarines', 'sorsogon']
            },
            { name: 'Mount Pinatubo', lat: 15.1429, lng: 120.3496, status: 'Active', elevation: '1486m',
              dangerRadii: [10000, 20000, 40000],
              eruptions: [
                  { date: '1991-06-15', vei: 6, casualties: 847, ashDirection: 'WSW', ashReachKm: 400, ashDurationDays: 90,
                    info: 'Второе крупнейшее извержение XX века. Пепел поднялся на 35 км. Глобальное похолодание на 0.5°C. 200,000 эвакуированы. Лахары продолжались годами.',
                    ashAreaKm2: 200000,
                    affectedCities: [
                        {name:'Angeles City',lat:15.17,lng:120.59,pop:315000,ashMm:150,info:'Полная эвакуация Clark Air Base. 10+ см пепла'},
                        {name:'Olongapo/Subic',lat:14.83,lng:120.28,pop:220000,ashMm:100,info:'ВМБ Subic Bay эвакуирована. 20,000 военных'},
                        {name:'San Fernando (Pampanga)',lat:15.03,lng:120.69,pop:280000,ashMm:80,info:'Столица провинции. Крыши обрушились от пепла'},
                        {name:'Tarlac City',lat:15.43,lng:120.60,pop:320000,ashMm:40,info:'Тяжёлое пеплопадение. Поля уничтожены'},
                        {name:'Dau/Mabalacat',lat:15.05,lng:120.56,pop:200000,ashMm:120,info:'Ближайший крупный город. Массовая эвакуация'},
                        {name:'Dagupan',lat:16.04,lng:120.34,pop:170000,ashMm:15,info:'Пепел долетел на 100+ км'},
                        {name:'Metro Manila',lat:14.55,lng:121.00,pop:8000000,ashMm:5,info:'Пепел накрыл столицу. Аэропорт закрыт'},
                        {name:'Бангкок (Таиланд)',lat:13.75,lng:100.50,pop:0,ashMm:0,info:'Пепел в стратосфере. Глобальное похолодание 0.5°C на 2 года'},
                    ]},
              ],
              threatenedLocations: ['angeles', 'subic', 'san-fernando-pampanga', 'tarlac', 'dagupan', 'caloocan', 'valenzuela', 'navotas', 'quezon-city', 'makati', 'bgc']
            },
            { name: 'Mount Bulusan', lat: 12.7697, lng: 124.0508, status: 'Active', elevation: '1565m',
              dangerRadii: [4000, 8000, 12000],
              eruptions: [
                  { date: '2022-06-05', vei: 1, casualties: 0, ashDirection: 'SW', ashReachKm: 5, ashDurationDays: 1,
                    info: 'Фреатическое извержение. Пепловой столб 1 км. Alert Level 1.',
                    affectedCities: [
                        {name:'Juban',lat:12.73,lng:123.99,pop:25000,ashMm:5,info:'Ближайший город. Мелкий пепел'},
                    ]},
                  { date: '2016-12-29', vei: 2, casualties: 0, ashDirection: 'W', ashReachKm: 8, ashDurationDays: 2,
                    info: 'Серия фреатических извержений. 9,000 эвакуированы.',
                    affectedCities: [
                        {name:'Juban',lat:12.73,lng:123.99,pop:25000,ashMm:8,info:'Частичная эвакуация'},
                        {name:'Irosin',lat:12.70,lng:124.03,pop:55000,ashMm:5,info:'Пепел на крышах. Фермы пострадали'},
                        {name:'Sorsogon City',lat:12.97,lng:124.00,pop:170000,ashMm:2,info:'Лёгкое пеплопадение'},
                    ]},
              ],
              threatenedLocations: ['sorsogon']
            },
            { name: 'Mount Hibok-Hibok', lat: 9.2030, lng: 124.6730, status: 'Active', elevation: '1332m',
              dangerRadii: [4000, 8000, 12000],
              eruptions: [
                  { date: '1951-12-04', vei: 3, casualties: 500, ashDirection: 'SW', ashReachKm: 15, ashDurationDays: 10,
                    info: 'Пирокластические потоки уничтожили несколько деревень. 500 погибших, 3,000 эвакуированы.',
                    ashAreaKm2: 450,
                    affectedCities: [
                        {name:'Mambajao',lat:9.25,lng:124.72,pop:15000,ashMm:30,info:'Столица Камигуин. Массовая эвакуация'},
                        {name:'Catarman',lat:9.17,lng:124.67,pop:5000,ashMm:50,info:'Пирокластика уничтожила деревни'},
                        {name:'Guinsiliban',lat:9.12,lng:124.70,pop:3000,ashMm:20,info:'Южная часть острова — пепел и лахары'},
                    ]},
              ],
              threatenedLocations: ['camiguin']
            },
            { name: 'Mount Apo', lat: 7.0005, lng: 125.2708, status: 'Potentially Active', elevation: '2954m',
              dangerRadii: [6000, 12000, 18000],
              eruptions: [
                  { date: '1641-01-01', vei: 2, casualties: 0, ashDirection: 'E', ashReachKm: 10, ashDurationDays: 3,
                    info: 'Последнее зафиксированное извержение (~1641). С тех пор спит. Высочайшая гора Филиппин.',
                    affectedCities: [
                        {name:'Kidapawan',lat:7.01,lng:125.09,pop:130000,ashMm:5,info:'Ближайший город у подножия'},
                    ]},
              ],
              threatenedLocations: ['davao', 'digos', 'kidapawan']
            },
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
        crimeTypeIcons: {
            'theft': '👛', 'robbery': '🔪', 'murder': '💀',
            'drugs': '💊', 'scam': '🎭', 'terrorism': '💣'
        },
        foreignerColor: '#e040fb',
    },
    health: {
        label: 'Здоровье', icon: '🏥', color: '#ff9800',
        data: MAP.HEALTH_EVENTS,
        gradient: {0.1:'#fff3e0',0.3:'#ffcc80',0.5:'#ff9800',0.7:'#e65100',1.0:'#bf360c'},
        diseaseColors: {
            'dengue': '#9ccc65',
            'COVID-19': '#ef5350',
            'leptospirosis': '#8d6e63',
            'rabies': '#b71c1c',
            'cholera': '#1565c0',
            'measles': '#ab47bc',
            'food': '#66bb6a',
            'respiratory': '#78909c',
            'dengvaxia': '#ffb74d',
            'TB': '#e0e0e0',
            'malaria': '#00897b',
        },
        diseaseLabels: {
            'dengue': 'Денге',
            'COVID-19': 'COVID-19',
            'leptospirosis': 'Лептоспироз',
            'rabies': 'Бешенство',
            'cholera': 'Холера',
            'measles': 'Корь',
            'food': 'Пищ. отравление',
            'respiratory': 'Респираторные',
            'dengvaxia': 'Dengvaxia',
            'TB': 'Туберкулёз',
            'malaria': 'Малярия',
        },
    },
};

MAP.USGS_EARTHQUAKE_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?' +
    'format=geojson&minlatitude=4&maxlatitude=21&minlongitude=116&maxlongitude=128' +
    '&minmagnitude=3&starttime=2014-01-01&orderby=magnitude&limit=1000';
