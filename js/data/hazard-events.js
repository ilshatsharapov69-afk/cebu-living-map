window.MAP = window.MAP || {};

MAP.TYPHOON_EVENTS = [
  {
    id: 'haiyan-2013', name: 'Haiyan / Yolanda', date: '2013-11-08',
    category: 5, maxWind: 315, deaths: 6300,
    info: 'Сильнейший тайфун при выходе на сушу в истории. Штормовой нагон до 5м в Таклобане. 550,928 домов разрушено.',
    track: [
      {lat:11.05,lng:125.73,wind:315,label:'Выход на сушу: Guiuan, Eastern Samar'},
      {lat:11.25,lng:125.00,wind:295,label:'Tacloban, Leyte'},
      {lat:11.32,lng:124.40,wind:270,label:'Пересечение Leyte'},
      {lat:11.25,lng:124.01,wind:250,label:'Daanbantayan, север Себу'},
      {lat:11.17,lng:123.72,wind:240,label:'Остров Бантаян'},
      {lat:11.00,lng:123.10,wind:220,label:'Concepcion, Iloilo'},
    ],
    cityImpact: [
      {city:'Tacloban',lat:11.25,lng:125.00,deaths:2600,damage:'$1.5B',info:'Штормовой нагон 5-7м. Вода до 2-го этажа. Аэропорт разрушен.'},
      {city:'Guiuan',lat:11.05,lng:125.73,deaths:112,damage:'$200M',info:'Первый удар. 95% зданий разрушено.'},
      {city:'Ormoc',lat:11.00,lng:124.61,deaths:93,damage:'$150M',info:'Повторная трагедия после 1991. Штормовой нагон и ветер.'},
      {city:'Bantayan Island',lat:11.17,lng:123.72,deaths:23,damage:'$100M',info:'Остров полностью опустошён ветром 240 км/ч.'},
    ]
  },
  {
    id: 'rai-2021', name: 'Rai / Odette', date: '2021-12-16',
    category: 5, maxWind: 260, deaths: 397,
    info: '9 выходов на сушу, 9.9 млн пострадавших. Масштабные разрушения на Бохоле, Себу, Южном Лейте.',
    track: [
      {lat:9.86,lng:126.00,wind:260,label:'Siargao'},
      {lat:10.03,lng:125.03,wind:240,label:'Liloan, Southern Leyte'},
      {lat:10.15,lng:124.42,wind:220,label:'Pres. Carlos P. Garcia, Бохол'},
      {lat:10.09,lng:124.07,wind:210,label:'Bien Unido, Бохол'},
      {lat:10.11,lng:123.64,wind:195,label:'Каркар, Себу'},
      {lat:9.95,lng:123.19,wind:180,label:'La Libertad, Негрос'},
    ],
    cityImpact: [
      {city:'Siargao',lat:9.86,lng:126.00,deaths:21,damage:'$300M',info:'95% построек разрушено. Туристическая инфраструктура уничтожена.'},
      {city:'Cebu City',lat:10.31,lng:123.89,deaths:58,damage:'$500M',info:'Массовые разрушения. Без электричества 3 недели.'},
      {city:'Bohol',lat:10.15,lng:124.42,deaths:43,damage:'$200M',info:'Два выхода на сушу. Побережье опустошено.'},
      {city:'Southern Leyte',lat:10.03,lng:125.03,deaths:35,damage:'$150M',info:'Штормовой нагон затопил прибрежные посёлки.'},
    ]
  },
  {
    id: 'mike-1990', name: 'Mike / Ruping', date: '1990-11-12',
    category: 4, maxWind: 250, deaths: 748,
    info: 'Прямой удар по Себу. 88 кораблей затонуло в порту. 90% деревянных домов разрушено. Нагон 3-4м.',
    track: [
      {lat:9.85,lng:125.94,wind:250,label:'Dinagat Islands'},
      {lat:9.93,lng:125.03,wind:240,label:'Southern Leyte'},
      {lat:10.32,lng:123.89,wind:220,label:'Себу Сити'},
      {lat:10.17,lng:123.30,wind:200,label:'К Негросу'},
      {lat:10.60,lng:122.57,wind:180,label:'Guimaras Strait'},
    ],
    cityImpact: [
      {city:'Cebu City',lat:10.32,lng:123.89,deaths:200,damage:'$250M',info:'Прямой удар. 88 судов затонуло. 90% деревянных домов разрушено.'},
      {city:'Negros',lat:10.17,lng:123.30,deaths:80,damage:'$100M',info:'Сильный ветер и штормовой нагон.'},
    ]
  },
  {
    id: 'hagupit-2014', name: 'Hagupit / Ruby', date: '2014-12-06',
    category: 3, maxWind: 205, deaths: 18,
    info: 'Медленный тайфун, сильные наводнения. Низкая смертность благодаря урокам Хайяна.',
    track: [
      {lat:11.24,lng:125.56,wind:205,label:'Dolores, Eastern Samar'},
      {lat:11.50,lng:124.95,wind:185,label:'Самар'},
      {lat:12.13,lng:124.10,wind:150,label:'Масбате'},
    ],
    cityImpact: [
      {city:'Dolores',lat:11.24,lng:125.56,deaths:8,damage:'$50M',info:'Первый выход на сушу. Массовая эвакуация спасла жизни.'},
    ]
  },
  {
    id: 'phanfone-2019', name: 'Phanfone / Ursula', date: '2019-12-24',
    category: 2, maxWind: 175, deaths: 50,
    info: 'Рождественский тайфун. 7 выходов на сушу. $67.2M ущерба.',
    track: [
      {lat:11.25,lng:125.62,wind:175,label:'Salcedo, Eastern Samar'},
      {lat:11.25,lng:125.00,wind:165,label:'Таклобан'},
      {lat:11.43,lng:124.56,wind:150,label:'Билиран'},
      {lat:11.42,lng:123.95,wind:140,label:'Gigantes Islands'},
      {lat:11.70,lng:122.50,wind:130,label:'Аклан'},
    ],
    cityImpact: [
      {city:'Tacloban',lat:11.25,lng:125.00,deaths:12,damage:'$20M',info:'Травма Хайяна. Массовая эвакуация заранее.'},
      {city:'Aklan',lat:11.70,lng:122.50,deaths:8,damage:'$15M',info:'Ближе к Boracay. Туристы застряли на Рождество.'},
    ]
  },
  {
    id: 'bopha-2012', name: 'Bopha / Pablo', date: '2012-12-04',
    category: 5, maxWind: 280, deaths: 1067,
    info: 'Сильнейший тайфун в Минданао. Селевой поток похоронил New Bataan (566 погибших).',
    track: [
      {lat:7.66,lng:126.50,wind:280,label:'Baganga, Davao Oriental'},
      {lat:7.80,lng:125.70,wind:260,label:'Минданао'},
      {lat:8.50,lng:124.50,wind:220,label:'Север Минданао'},
      {lat:9.20,lng:123.50,wind:180,label:'Море Сулу, у Негроса'},
    ],
    cityImpact: [
      {city:'New Bataan',lat:7.58,lng:126.18,deaths:566,damage:'$100M',info:'Селевой поток похоронил весь посёлок. 566 погибших.'},
      {city:'Baganga',lat:7.66,lng:126.50,deaths:180,damage:'$200M',info:'Первый выход на сушу. Ветер 280 км/ч.'},
      {city:'Cateel',lat:7.79,lng:126.45,deaths:121,damage:'$80M',info:'Муниципалитет полностью разрушен.'},
    ]
  },
  {
    id: 'fengshen-2008', name: 'Fengshen / Frank', date: '2008-06-21',
    category: 2, maxWind: 165, deaths: 1371,
    info: 'Паром MV Princess of the Stars перевернулся — 846 из 922 пассажиров погибли.',
    track: [
      {lat:11.20,lng:125.50,wind:165,label:'Eastern Samar'},
      {lat:11.40,lng:124.60,wind:155,label:'Лейте'},
      {lat:11.50,lng:123.50,wind:140,label:'Себу Стрейт'},
      {lat:12.30,lng:122.50,wind:130,label:'Море Сибуян (паром)'},
    ],
    cityImpact: [
      {city:'Море Сибуян',lat:12.30,lng:122.50,deaths:846,damage:'',info:'Паром MV Princess of the Stars перевернулся. 846 из 922 погибли.'},
      {city:'Iloilo City',lat:10.69,lng:122.56,deaths:120,damage:'$80M',info:'Сильные наводнения. Центр города затоплен.'},
    ]
  },
  {
    id: 'thelma-1991', name: 'Thelma / Uring', date: '1991-11-05',
    category: 1, maxWind: 85, deaths: 5081,
    info: 'Слабый ветер но катастрофические паводки. 580мм осадков за часы. 4,922 погибших в Ормоке.',
    track: [
      {lat:10.50,lng:126.50,wind:85,label:'Приближение'},
      {lat:11.00,lng:125.00,wind:80,label:'Лейте'},
      {lat:11.04,lng:124.61,wind:75,label:'Ормок (катастрофа)'},
      {lat:11.20,lng:123.80,wind:70,label:'Себу Стрейт'},
    ],
    cityImpact: [
      {city:'Ormoc',lat:11.00,lng:124.61,deaths:4922,damage:'$50M',info:'580мм за 3 часа. Селевой поток снёс весь центр города. Самое смертоносное наводнение.'},
    ]
  },
  {
    id: 'kalmaegi-2025', name: 'Kalmaegi / Tino', date: '2025-11-04',
    category: 2, maxWind: 183, deaths: 269,
    info: 'Худшие паводки в истории Себу. 1.5 месяца осадков за 24ч. 2.4 млн пострадавших.',
    track: [
      {lat:9.80,lng:125.50,wind:183,label:'С востока'},
      {lat:10.00,lng:124.50,wind:175,label:'Южный Лейте'},
      {lat:10.10,lng:124.00,wind:165,label:'Бохол'},
      {lat:10.30,lng:123.75,wind:155,label:'Себу (наводнение)'},
      {lat:10.00,lng:123.20,wind:140,label:'Негрос'},
    ],
    cityImpact: [
      {city:'Cebu City',lat:10.31,lng:123.89,deaths:71,damage:'$500M',info:'Худший паводок в истории. 1.5 месяца осадков за 24 часа.'},
      {city:'Negros Occidental',lat:10.00,lng:123.20,deaths:62,damage:'$200M',info:'62 пропавших без вести. Провинция не оправилась от землетрясения.'},
      {city:'Bohol',lat:10.10,lng:124.00,deaths:25,damage:'$80M',info:'Наводнение и оползни. Дороги перекрыты.'},
    ]
  },
  {
    id: 'washi-2011', name: 'Washi / Sendong', date: '2011-12-16',
    category: 1, maxWind: 100, deaths: 1292,
    info: 'Катастрофические паводки в Cagayan de Oro и Iligan. Вода поднялась на 3.3м за час.',
    track: [
      {lat:8.00,lng:127.00,wind:100,label:'С востока'},
      {lat:8.50,lng:125.50,wind:95,label:'Вост. Минданао'},
      {lat:8.48,lng:124.65,wind:90,label:'Cagayan de Oro'},
      {lat:8.23,lng:124.24,wind:85,label:'Iligan'},
    ],
    cityImpact: [
      {city:'Cagayan de Oro',lat:8.45,lng:124.63,deaths:674,damage:'$200M',info:'Вода поднялась на 3.3м за час. Реки вышли из берегов.'},
      {city:'Iligan',lat:8.23,lng:124.24,deaths:491,damage:'$100M',info:'Жилые районы вдоль рек полностью затоплены.'},
    ]
  },
  {
    id: 'mangkhut-2018', name: 'Mangkhut / Ompong', date: '2018-09-15',
    category: 5, maxWind: 285, deaths: 127,
    info: 'Самый сильный тайфун 2018 года. Прямой удар по северному Лусону. Ветер 285 км/ч. Оползни в Кордильерах.',
    track: [
      {lat:18.25,lng:122.10,wind:285,label:'Baggao, Cagayan'},
      {lat:17.80,lng:121.50,wind:260,label:'Tuguegarao'},
      {lat:17.20,lng:120.80,wind:230,label:'Кордильеры'},
      {lat:16.50,lng:120.20,wind:200,label:'Baguio area'},
      {lat:16.00,lng:119.50,wind:180,label:'Выход в Южно-Китайское море'},
    ],
    cityImpact: [
      {city:'Tuguegarao',lat:17.61,lng:121.73,deaths:12,damage:'$100M',info:'Прямой удар. Ветер 260 км/ч. Крыши сорваны.'},
      {city:'Baguio',lat:16.40,lng:120.60,deaths:15,damage:'$80M',info:'Оползни в горных районах.'},
      {city:'Itogon, Benguet',lat:16.37,lng:120.68,deaths:100,damage:'$50M',info:'Оползень на бывшей шахте. 100+ горняков погибли.'},
    ]
  },
  {
    id: 'vamco-2020', name: 'Vamco / Ulysses', date: '2020-11-11',
    category: 3, maxWind: 220, deaths: 101,
    info: 'Катастрофическое наводнение в Метро Маниле и долине Кагаян. Уровень воды как в 2009 (Ondoy).',
    track: [
      {lat:14.00,lng:124.00,wind:220,label:'Patnanungan, Quezon'},
      {lat:14.50,lng:122.50,wind:200,label:'Пересечение Лусона'},
      {lat:15.00,lng:121.00,wind:180,label:'Metro Manila'},
      {lat:16.50,lng:120.50,wind:160,label:'Долина Кагаян'},
    ],
    cityImpact: [
      {city:'Metro Manila',lat:14.55,lng:121.02,deaths:39,damage:'$300M',info:'Уровень воды в Marikina как при Ondoy 2009.'},
      {city:'Cagayan Valley',lat:17.61,lng:121.73,deaths:35,damage:'$400M',info:'Вся долина затоплена. Слив дамбы Magat. Спасение вертолётами.'},
    ]
  },
  {
    id: 'goni-2020', name: 'Goni / Rolly', date: '2020-10-31',
    category: 5, maxWind: 315, deaths: 32,
    info: 'Самый сильный тайфун при выходе на сушу в 2020 году. 315 км/ч. Разрушил Катандуанес и Бикол.',
    track: [
      {lat:13.60,lng:124.20,wind:315,label:'Bato, Catanduanes'},
      {lat:13.40,lng:123.70,wind:280,label:'Tiwi, Albay'},
      {lat:13.20,lng:123.00,wind:230,label:'Ticao Pass'},
      {lat:13.50,lng:121.50,wind:180,label:'Quezon Province'},
    ],
    cityImpact: [
      {city:'Catanduanes',lat:13.58,lng:124.23,deaths:10,damage:'$200M',info:'Первый удар. 315 км/ч. Остров опустошён.'},
      {city:'Albay',lat:13.40,lng:123.70,deaths:15,damage:'$250M',info:'Лахары с Майона. Грязевые потоки затопили города.'},
    ]
  },
  {
    id: 'ketsana-2009', name: 'Ketsana / Ondoy', date: '2009-09-26',
    category: 1, maxWind: 100, deaths: 464,
    info: '455мм осадков за 6 часов в Маниле. Худшее наводнение с 1967 года. 80% Метро Манилы затоплено.',
    track: [
      {lat:14.80,lng:122.50,wind:100,label:'Северо-восток Лусона'},
      {lat:14.50,lng:121.50,wind:95,label:'Quezon Province'},
      {lat:14.50,lng:121.00,wind:90,label:'Metro Manila (катастрофа)'},
      {lat:14.50,lng:120.00,wind:80,label:'Zambales'},
    ],
    cityImpact: [
      {city:'Marikina',lat:14.65,lng:121.10,deaths:150,damage:'$200M',info:'Река поднялась на 8м. Весь город под водой.'},
      {city:'Pasig',lat:14.58,lng:121.09,deaths:80,damage:'$300M',info:'Низкие районы полностью затоплены.'},
      {city:'Cainta/Rizal',lat:14.57,lng:121.12,deaths:100,damage:'$150M',info:'Горные потоки обрушились на жилые кварталы.'},
    ]
  },
];

MAP.FLOOD_EVENTS = [
  {id:'fl-1',name:'Паводки тайфуна Tino (Себу)',date:'2025-11-04',lat:10.3157,lng:123.8854,deaths:71,affected:500000,severity:10,cause:'Тайфун Kalmaegi/Tino',info:'Худший паводок в истории Себу. Реки Guadalupe, Lahug, Kinalumsan вышли из берегов. 1.5 месяца осадков за 24 часа.'},
  {id:'fl-2',name:'Великий паводок Ормока',date:'1991-11-05',lat:11.0044,lng:124.6075,deaths:4922,affected:25000,severity:10,cause:'ТШ Thelma/Uring — 580мм за 3 часа',info:'Самое смертоносное наводнение в истории Филиппин на тот момент. Селевой поток снёс весь центр города.'},
  {id:'fl-3',name:'Тайфун Ruping (Себу)',date:'1990-11-13',lat:10.3157,lng:123.8854,deaths:40,affected:100000,severity:9,cause:'Супертайфун Mike/Ruping',info:'Штормовой нагон 3-4м. 88 судов затонуло в порту Себу.'},
  {id:'fl-4',name:'TD Crising (Данао)',date:'2017-04-17',lat:10.4700,lng:124.0250,deaths:10,affected:1400,severity:6,cause:'Тропическая депрессия 02W',info:'Внезапные паводки. 200+ семей эвакуированы. Ущерб P84.8M.'},
  {id:'fl-5',name:'Тайфун Odette (юг Себу)',date:'2021-12-16',lat:10.1110,lng:123.6398,deaths:100,affected:2400000,severity:9,cause:'Супертайфун Rai/Odette',info:'Штормовой нагон до 3м. Каркар, Болхоон, Ослоб разрушены.'},
  {id:'fl-6',name:'Тайфун Odette (Бохол)',date:'2021-12-16',lat:10.1500,lng:124.0200,deaths:30,affected:400000,severity:8,cause:'Супертайфун Rai/Odette',info:'Два выхода на сушу на Бохоле. Штормовой нагон затопил побережье.'},
  {id:'fl-7',name:'Паводки Бохол',date:'2008-02-15',lat:9.9300,lng:124.0100,deaths:3,affected:5000,severity:4,cause:'Холодный фронт и конвергенция',info:'Ручьи Pondol и Catagbacan вышли из берегов в Loon.'},
  {id:'fl-8',name:'Паводки Себу',date:'2022-08-04',lat:10.3157,lng:123.8854,deaths:2,affected:1500,severity:5,cause:'Муссонные дожди',info:'Вода до 1.2м. 25 домов разрушено. Мусор усилил затопление.'},
  {id:'fl-9',name:'Паводки Негрос',date:'2025-07-17',lat:9.3068,lng:123.3054,deaths:1,affected:8000,severity:5,cause:'Юго-западный муссон',info:'Тысячи эвакуированы. Морское сообщение прервано.'},
  {id:'fl-10',name:'Паводки Себу',date:'2020-10-13',lat:10.3157,lng:123.8854,deaths:3,affected:2000,severity:5,cause:'Сильные дожди',info:'Внезапное наводнение застало жителей врасплох.'},
  {id:'fl-11',name:'Штормовой нагон Хайяна (Таклобан)',date:'2013-11-08',lat:11.2494,lng:124.9600,deaths:5000,affected:4100000,severity:10,cause:'Супертайфун Haiyan — нагон 5-7м',info:'Вода поднялась до 2-го этажа зданий. Большинство из 6300 погибших утонули.'},
  {id:'fl-12',name:'Тайфун Tino (Негрос)',date:'2025-11-04',lat:10.2000,lng:122.9600,deaths:62,affected:150000,severity:8,cause:'Тайфун Kalmaegi/Tino',info:'62 пропавших без вести. Провинция ещё не оправилась от землетрясения сентября 2025.'},
  {id:'fl-13',name:'Наводнение Ondoy (Манила)',date:'2009-09-26',lat:14.5547,lng:121.0244,deaths:464,affected:4900000,severity:10,cause:'ТШ Ketsana/Ondoy — 455мм за 6ч',info:'80% Метро Манилы затоплено. Marikina River поднялась на 8м. Худшее наводнение с 1967.'},
  {id:'fl-14',name:'Наводнение Ulysses (Манила)',date:'2020-11-12',lat:14.5547,lng:121.0244,deaths:73,affected:3700000,severity:9,cause:'Тайфун Vamco/Ulysses',info:'Уровень воды в Marikina как при Ondoy. Долина Кагаян полностью затоплена.'},
  {id:'fl-15',name:'Наводнение CDO (Sendong)',date:'2011-12-16',lat:8.4542,lng:124.6319,deaths:1292,affected:300000,severity:10,cause:'ТШ Washi/Sendong',info:'3.3м воды за час. Реки Cagayan de Oro вышли из берегов. Илиган тоже пострадал.'},
  {id:'fl-16',name:'Habagat Manila 2012',date:'2012-08-07',lat:14.5547,lng:121.0244,deaths:95,affected:4400000,severity:9,cause:'Юго-западный муссон усиленный тайфуном',info:'Непрекращающиеся дожди в течение недели. Вся Метро Манила под водой.'},
  {id:'fl-17',name:'Наводнение Давао 2024',date:'2024-06-15',lat:7.0707,lng:125.6087,deaths:5,affected:20000,severity:6,cause:'Муссонные дожди',info:'Река Davao вышла из берегов. Жители прибрежных барангаев эвакуированы.'},
  {id:'fl-18',name:'Долина Кагаян 2020',date:'2020-11-14',lat:17.6132,lng:121.7270,deaths:35,affected:500000,severity:9,cause:'Тайфун Vamco + слив дамбы Magat',info:'Вся долина Кагаян затоплена. Вода до крыш. Спасение вертолётами.'},
];

MAP.LANDSLIDE_EVENTS = [
  {id:'ls-1',name:'Оползень Нага',date:'2018-09-20',lat:10.2090,lng:123.7590,deaths:78,severity:10,cause:'Муссонные дожди + горная добыча',info:'80 гектаров. Известняковая скала обрушилась на рассвете. 77 домов уничтожено. Крупнейший оползень в истории Себу.'},
  {id:'ls-2',name:'Оползень Гинсаугон',date:'2006-02-17',lat:10.2750,lng:125.0050,deaths:1126,severity:10,cause:'10 дней дождей + землетрясение M2.6',info:'Деревня погребена вместе со школой. 8000 пострадавших. Тела не были найдены — вся территория объявлена кладбищем.'},
  {id:'ls-3',name:'Оползни землетрясения Бохол',date:'2013-10-15',lat:9.8700,lng:124.0100,deaths:222,severity:9,cause:'Землетрясение M7.2',info:'Оползни на Шоколадных Холмах. 73,000+ зданий повреждено. Исторические церкви разрушены.'},
  {id:'ls-4',name:'Обвал свалки Бинали',date:'2026-01-08',lat:10.3600,lng:123.9200,deaths:19,severity:7,cause:'Землетрясение 2025 + дожди тайфуна Tino',info:'Мусорный оползень на городской свалке. Кризис утилизации отходов.'},
  {id:'ls-5',name:'Оползни тайфуна Tino (Себу)',date:'2025-11-04',lat:10.5700,lng:123.9500,deaths:15,severity:7,cause:'Экстремальные осадки тайфуна',info:'Множественные оползни в горах Себу. Дороги перекрыты, посёлки изолированы.'},
  {id:'ls-6',name:'Оползни тайфуна Odette',date:'2021-12-16',lat:9.9500,lng:123.5900,deaths:8,severity:6,cause:'Супертайфун Rai/Odette',info:'Множественные оползни на юге Себу. Горные дороги разрушены.'},
  {id:'ls-7',name:'Оползни тайфуна Haiyan (Лейте)',date:'2013-11-08',lat:11.00,lng:124.90,deaths:50,severity:8,cause:'Супертайфун Haiyan',info:'Горные общины отрезаны от помощи на дни. Дороги заблокированы на недели.'},
  {id:'ls-8',name:'Оползни Негрос',date:'2026-02-02',lat:10.2000,lng:122.9600,deaths:1,severity:3,cause:'ТШ Penha/Basyang',info:'Паводки и оползни в Negros Occidental. Незначительные разрушения.'},
  {id:'ls-9',name:'Оползни Себу-Бохол',date:'2022-08-04',lat:10.30,lng:123.95,deaths:2,severity:4,cause:'Муссонные дожди',info:'10 случаев затоплений. 288 семей пострадали.'},
  {id:'ls-10',name:'Оползень Итогон (Benguet)',date:'2018-09-15',lat:16.3660,lng:120.6750,deaths:100,severity:10,cause:'Тайфун Mangkhut/Ompong + горная добыча',info:'Бывшая шахта обрушилась на бункхаус. 100+ горняков и их семей погибли. Трагедия вскрыла проблему незаконной добычи.'},
  {id:'ls-11',name:'Оползень Пантукан (Davao de Oro)',date:'2024-02-06',lat:7.6700,lng:126.0600,deaths:90,severity:9,cause:'Непрекращающиеся дожди + горная добыча',info:'Массивный оползень в золотодобывающем районе. Деревня Masara погребена. Спасательная операция длилась месяц.'},
];

MAP.CRIME_EVENTS = [
  // Cebu
  {id:'cr-1',type:'theft',name:'Карманные кражи Colon Street',lat:10.2950,lng:123.8990,period:'Постоянно',severity:8,info:'Старейшая улица Филиппин. Воры работают группами. 202 случая за янв-июн 2022. Опасно после темноты.'},
  {id:'cr-2',type:'theft',name:'Кражи Carbon Market',lat:10.2920,lng:123.8970,period:'Постоянно',severity:8,info:'Крупнейший рынок Себу. Толпы и узкие проходы — рай для карманников. Особенно опасно в предпраздничные дни.'},
  {id:'cr-3',type:'drugs',name:'Mango Avenue — наркотики и грабежи',lat:10.3100,lng:123.8930,period:'Постоянно',severity:7,info:'Ночной район. Наркоторговля. Группы детей 7-14 лет обыскивают карманы. Риск после полуночи.'},
  {id:'cr-4',type:'robbery',name:'Ограбление туристов у Temple of Leah',lat:10.3370,lng:123.8700,period:'2025',severity:6,foreignerTarget:true,info:'Двое иностранцев ограблены у туристической достопримечательности в горах Себу.'},
  {id:'cr-5',type:'murder',name:'Американец застрелен в баре отеля',lat:10.3157,lng:123.8854,period:'2024-03',severity:9,foreignerTarget:true,info:'Michael George Richey застрелен местным рэпером у бара отеля. Умер через 2 дня.'},
  {id:'cr-6',type:'murder',name:'Убийство японо-американца',lat:10.3157,lng:123.8854,period:'2023-11',severity:9,foreignerTarget:true,info:'72-летний муж убит. Сообщник жены приехал из Cagayan de Oro. Заказное убийство.'},
  {id:'cr-7',type:'scam',name:'ATM скимминг',lat:10.3200,lng:123.9050,period:'Постоянно',severity:5,info:'Турист потерял 40,000 PHP. Устройства на уличных банкоматах считывают PIN.'},
  {id:'cr-8',type:'scam',name:'Такси-мошенничество у аэропорта',lat:10.3100,lng:123.9800,period:'Постоянно',severity:4,foreignerTarget:true,info:'Таксисты отказываются включать счётчик, завышают цены в 3-5 раз, выбирают длинные маршруты.'},
  {id:'cr-9',type:'robbery',name:'Ночные грабежи даунтауна',lat:10.2980,lng:123.8960,period:'Постоянно',severity:7,info:'Грабежи в переулках и плохо освещённых районах центра после темноты.'},
  {id:'cr-10',type:'drugs',name:'Наркотрафик Себу',lat:10.3000,lng:123.9000,period:'2023-2024',severity:7,info:'Изъято шабу на P174.8M в одной операции. Двое арестованы с P8.5M метамфетамина.'},
  {id:'cr-11',type:'scam',name:'Рейд на онлайн-мошенников',lat:10.3300,lng:123.9100,period:'2022',severity:6,info:'300 граждан КНР арестованы. Нелегальный колл-центр. 150 экстрадированы.'},
  {id:'cr-12',type:'theft',name:'Fuente Osmena Circle',lat:10.3080,lng:123.8910,period:'Постоянно',severity:6,info:'Площадь с бездомными. Мелкие кражи, особенно ночью. Рядом ночной район Mango Ave.'},
  {id:'cr-13',type:'scam',name:'Фейковые бронирования',lat:10.3157,lng:123.8854,period:'2023-2026',severity:5,foreignerTarget:true,info:'200+ задокументированных случаев с 2025. Фальшивые отели и туры. Мишени — иностранные туристы.'},
  {id:'cr-14',type:'robbery',name:'Грабежи в прибрежных трущобах',lat:10.2900,lng:123.9050,period:'Постоянно',severity:7,foreignerTarget:true,info:'Переулки трущоб у побережья — высокий риск ограбления, особенно для иностранцев после темноты.'},
  // Manila
  {id:'cr-15',type:'theft',name:'Карманные кражи Tondo',lat:14.6042,lng:120.9679,period:'Постоянно',severity:9,info:'Один из самых плотно населённых районов мира. Высокий уровень уличной преступности. Не рекомендуется посещать.'},
  {id:'cr-16',type:'theft',name:'Кражи Quiapo/Divisoria',lat:14.5988,lng:120.9840,period:'Постоянно',severity:8,info:'Крупнейшие рынки Манилы. Карманники в толпе. Особенно опасно в праздники.'},
  {id:'cr-17',type:'scam',name:'Туристические мошенничества Ermita',lat:14.5678,lng:120.9851,period:'Постоянно',severity:7,foreignerTarget:true,info:'Фальшивые туры, завышенные цены, навязчивые зазывалы. Классический район для обмана туристов.'},
  {id:'cr-18',type:'robbery',name:'Ограбления в Pasay/EDSA',lat:14.5378,lng:121.0014,period:'Постоянно',severity:7,info:'Район возле аэропорта. Грабежи в такси и у банкоматов.'},
  {id:'cr-19',type:'scam',name:'POGO мошеннические центры',lat:14.5547,lng:121.0244,period:'2020-2024',severity:8,info:'Нелегальные онлайн-казино. Тысячи иностранцев удерживались насильно. Масштабный рейд 2024.'},
  {id:'cr-20',type:'drugs',name:'Наркотрафик Metro Manila',lat:14.5547,lng:121.0244,period:'2016-2024',severity:8,info:'Война с наркотиками. Тысячи внесудебных расправ. Районы Tondo, Quezon City, Caloocan — наиболее опасны.'},
  // Davao
  {id:'cr-21',type:'robbery',name:'Безопасность Давао (строгий режим)',lat:7.0707,lng:125.6087,period:'Постоянно',severity:3,info:'Один из самых безопасных городов PH. Строгий комендантский час, запрет алкоголя после 01:00.'},
  // Zamboanga / Mindanao
  {id:'cr-22',type:'terrorism',name:'Осада Замбоанги 2013',lat:6.9214,lng:122.0790,period:'2013-09',severity:10,info:'MNLF захватили часть города. 20-дневная осада. 12 солдат, 107 повстанцев, 6 гражданских погибли. 120,000 эвакуированы.'},
  {id:'cr-23',type:'terrorism',name:'Marawi 2017',lat:8.0000,lng:124.2883,period:'2017-05',severity:10,info:'ISIS-affiliated Maute Group захватили город. 5-месячная осада. 1000+ погибших, 360,000 эвакуированы, город разрушен.'},
  {id:'cr-24',type:'robbery',name:'Криминал GenSan',lat:6.1164,lng:125.1716,period:'Постоянно',severity:5,info:'Порт, рыбный рынок. Мелкие кражи в районе порта, особенно ночью.'},
  // NEW: Boracay
  {id:'cr-25',type:'scam',name:'Мошенничество с туристами Boracay',lat:11.9674,lng:121.9248,period:'Постоянно',severity:6,foreignerTarget:true,info:'Завышенные цены на водные развлечения, фальшивые туры на острова, мошенничество с обменом валюты.'},
  {id:'cr-26',type:'theft',name:'Кражи на пляже Boracay',lat:11.9600,lng:121.9200,period:'Постоянно',severity:5,foreignerTarget:true,info:'Кражи вещей на пляже, особенно ночью на Stations 2-3. Камеры наблюдения не охватывают весь берег.'},
  // NEW: Angeles City / Clark
  {id:'cr-27',type:'robbery',name:'Грабежи в barrio Balibago',lat:15.1680,lng:120.5880,period:'Постоянно',severity:7,foreignerTarget:true,info:'Район ночной жизни. Нападения на подвыпивших иностранцев. Drugging (подмешивание в напитки) распространено.'},
  {id:'cr-28',type:'scam',name:'Bar fine мошенничество Angeles',lat:15.1650,lng:120.5850,period:'Постоянно',severity:5,foreignerTarget:true,info:'Завышенные счета в барах, "bar fine" ловушки. Сотни жалоб от иностранцев ежегодно.'},
  // NEW: Baguio
  {id:'cr-29',type:'theft',name:'Карманные кражи Baguio Market',lat:16.4100,lng:120.5950,period:'Постоянно',severity:5,info:'Session Road и Burnham Park — популярные места для карманников. Особенно в выходные и праздники.'},
  // NEW: Palawan
  {id:'cr-30',type:'scam',name:'Мошенничество с турами El Nido',lat:11.1785,lng:119.3921,period:'Постоянно',severity:4,foreignerTarget:true,info:'Поддельные лицензии на island hopping, завышенные цены, не включенные в тур расходы (environmental fee и т.д.).'},
  // NEW: Siargao
  {id:'cr-31',type:'theft',name:'Кражи мотоциклов Siargao',lat:9.8482,lng:126.0458,period:'2023-2025',severity:5,foreignerTarget:true,info:'Рост краж арендованных мотоциклов. Иностранцев вынуждают платить завышенную компенсацию.'},
  // NEW: Subic
  {id:'cr-32',type:'robbery',name:'Ночные грабежи Olongapo',lat:14.8292,lng:120.2830,period:'Постоянно',severity:6,foreignerTarget:true,info:'Бывшая база ВМС США. Район ночной жизни. Нападения на иностранцев возле баров.'},
  // NEW: Manila Chinatown
  {id:'cr-33',type:'robbery',name:'Ограбления Binondo/Chinatown',lat:14.6000,lng:120.9750,period:'Постоянно',severity:7,info:'Старейший Chinatown в мире. Мелкие кражи и грабежи, особенно вечером. Ценности в карманах.'},
  // NEW: Cebu resort areas
  {id:'cr-34',type:'scam',name:'Мошенничество с дайвингом (Моалбоал)',lat:9.9500,lng:123.3958,period:'Постоянно',severity:4,foreignerTarget:true,info:'Нелицензированные дайв-операторы, подставные повреждения оборудования, завышенные цены.'},
  // NEW: Manila airport area
  {id:'cr-35',type:'scam',name:'Tanim-bala (подброс пуль) NAIA',lat:14.5086,lng:121.0197,period:'2015-2019',severity:6,foreignerTarget:true,info:'Схема вымогательства: пули подбрасывают в багаж, затем требуют "штраф". Сотни жертв, в основном иностранцы и OFW.'},
  // NEW: Cotabato
  {id:'cr-36',type:'terrorism',name:'Теракт в Cotabato 2019',lat:7.2236,lng:124.2464,period:'2019-01',severity:9,info:'Взрыв в кафедральном соборе. 23 погибших, 109 раненых. Ответственность взяли боевики, связанные с ISIS.'},
  // NEW: Jolo
  {id:'cr-37',type:'terrorism',name:'Теракт в Jolo 2019',lat:6.0535,lng:121.0015,period:'2019-01',severity:10,info:'Двойной взрыв в церкви во время мессы. 23 погибших, 100+ раненых. Abu Sayyaf.'},
  {id:'cr-38',type:'terrorism',name:'Похищения Abu Sayyaf (Sulu)',lat:6.0535,lng:121.0015,period:'2000-2020',severity:10,foreignerTarget:true,info:'Систематические похищения иностранцев для выкупа. Десятки случаев. Некоторые заложники обезглавлены. Зона запрещена для туристов.'},
  // NEW: Regional crime incidents
  {id:'cr-39',type:'drugs',name:'Наркотрафик Caloocan',lat:14.6572,lng:120.9845,period:'2016-2024',severity:9,info:'Один из наиболее пострадавших от "войны с наркотиками" городов. Тысячи убитых. Операция Tokhang.'},
  {id:'cr-40',type:'robbery',name:'Ограбления Quezon City',lat:14.6760,lng:121.0437,period:'Постоянно',severity:7,info:'Крупнейший город Metro Manila. Высокий уровень краж и грабежей, особенно в Cubao и Novaliches.'},
  {id:'cr-41',type:'theft',name:'Кражи у Greenhills Mall',lat:14.6016,lng:121.0513,period:'Постоянно',severity:6,info:'Snatch theft в районе торговых центров. Мотоциклисты-грабители.'},
  {id:'cr-42',type:'robbery',name:'Ночные грабежи Iloilo',lat:10.6918,lng:122.5640,period:'Постоянно',severity:5,info:'Район La Paz и Jaro. Мелкие кражи в ночное время. В целом безопасный город.'},
  {id:'cr-43',type:'theft',name:'Карманные кражи Baclaran/Paranaque',lat:14.5340,lng:121.0000,period:'Постоянно',severity:7,info:'Рынок Baclaran — один из самых опасных в Metro Manila. Толпы, карманники, мошенники.'},
  {id:'cr-44',type:'scam',name:'Мошенничество в Puerto Galera',lat:13.5110,lng:120.9540,period:'Постоянно',severity:5,foreignerTarget:true,info:'Завышенные цены в барах, подмешивание в напитки, поддельные экскурсии.'},
  {id:'cr-45',type:'theft',name:'Кражи в Vigan',lat:17.5747,lng:120.3869,period:'Постоянно',severity:3,info:'Исторический город. Низкий уровень преступности. Мелкие кражи в туристических зонах.'},
  {id:'cr-46',type:'robbery',name:'Кражи мотоциклов CDO',lat:8.4542,lng:124.6319,period:'Постоянно',severity:5,info:'Рост краж мотоциклов. Район рынка — мелкие кражи.'},
  {id:'cr-47',type:'drugs',name:'Наркотрафик Zamboanga',lat:6.9214,lng:122.0790,period:'Постоянно',severity:8,info:'Транзитная точка для наркотиков из Малайзии и Индонезии. Высокий уровень преступности.'},
  {id:'cr-48',type:'robbery',name:'Ночные ограбления Tacloban',lat:11.2494,lng:124.9600,period:'Постоянно',severity:5,info:'Район рынка и автовокзала. После Хайяна — рост мелкой преступности.'},
  {id:'cr-49',type:'scam',name:'Мошенничество Panglao/Bohol',lat:9.5604,lng:123.7625,period:'Постоянно',severity:4,foreignerTarget:true,info:'Завышенные цены на туры, поддельные island hopping, мошенничество с прокатом.'},
  {id:'cr-50',type:'robbery',name:'Криминал Bacolod',lat:10.6840,lng:122.9700,period:'Постоянно',severity:5,info:'Район рынка и порта. Мелкие кражи. В целом безопаснее Metro Manila.'},
  {id:'cr-51',type:'theft',name:'Кражи Puerto Princesa',lat:9.7392,lng:118.7353,period:'Постоянно',severity:3,info:'Низкий уровень преступности. Мелкие кражи у туристических объектов.'},
  {id:'cr-52',type:'murder',name:'Внесудебные казни (EJK) Manila',lat:14.5547,lng:121.0244,period:'2016-2022',severity:10,info:'6,000+ убитых по официальным данным (реально до 30,000). "Война с наркотиками" Дутерте.'},
  {id:'cr-53',type:'robbery',name:'Грабежи Mandaluyong/Shaw',lat:14.5794,lng:121.0359,period:'Постоянно',severity:6,info:'Район EDSA-Shaw. Hold-up в переулках. Мотоциклисты-грабители.'},
  {id:'cr-54',type:'theft',name:'Кражи Coron Town',lat:12.0050,lng:120.2040,period:'Постоянно',severity:3,foreignerTarget:true,info:'Туристический городок. Мелкие кражи в хостелах и на пляже.'},
  {id:'cr-55',type:'scam',name:'Мошенничество Sagada',lat:17.0825,lng:121.0064,period:'Постоянно',severity:2,info:'Горный городок. Минимальная преступность. Редкие случаи обмана туристов с ценами.'},
];

// Regional crime statistics by city/area (crime index 1-10, green=safe, red=dangerous)
MAP.CRIME_STATS = [
  // Metro Manila
  {city:'Manila City',lat:14.5995,lng:120.9842,crimeIndex:9,pop:1846000,murderRate:15.2,theftRate:320,info:'Одна из самых плотных и опасных столиц ЮВА. Tondo, Quiapo — наиболее криминальные.'},
  {city:'Quezon City',lat:14.6760,lng:121.0437,crimeIndex:7,pop:2960000,murderRate:8.1,theftRate:280,info:'Крупнейший город PH. Novaliches, Cubao — проблемные районы.'},
  {city:'Caloocan',lat:14.6572,lng:120.9845,crimeIndex:8,pop:1662000,murderRate:12.5,theftRate:290,info:'Высокая преступность, центр "войны с наркотиками". Caloocan North — зона риска.'},
  {city:'Makati CBD',lat:14.5547,lng:121.0244,crimeIndex:4,pop:582000,murderRate:2.1,theftRate:120,info:'Финансовый центр. Безопасно днём, мелкие кражи ночью. Охрана в бизнес-районе.'},
  {city:'BGC/Taguig',lat:14.5176,lng:121.0509,crimeIndex:3,pop:886000,murderRate:1.5,theftRate:80,info:'Самый безопасный район Metro Manila. Камеры, охрана, освещение.'},
  {city:'Pasay',lat:14.5378,lng:121.0014,crimeIndex:7,pop:427000,murderRate:9.3,theftRate:260,info:'Район аэропорта и развлечений. Высокий уровень краж и мошенничества.'},
  {city:'Pasig',lat:14.5764,lng:121.0851,crimeIndex:5,pop:803000,murderRate:4.2,theftRate:150,info:'Смешанный. Eastwood — безопасно, но старый центр — мелкая преступность.'},
  {city:'Paranaque',lat:14.4793,lng:121.0198,crimeIndex:6,pop:690000,murderRate:6.1,theftRate:200,info:'Baclaran market — опасная зона. Лучше в BF Homes.'},
  {city:'Mandaluyong',lat:14.5794,lng:121.0359,crimeIndex:5,pop:386000,murderRate:3.8,theftRate:160,info:'EDSA area — мелкие кражи. Shaw Blvd — район для осторожности.'},
  {city:'Las Piñas',lat:14.4445,lng:120.9932,crimeIndex:4,pop:606000,murderRate:3.0,theftRate:110,info:'Жилой район. Относительно безопасно. Alabang рядом — хороший район.'},
  {city:'Valenzuela',lat:14.7011,lng:120.9600,crimeIndex:7,pop:714000,murderRate:8.5,theftRate:240,info:'Промышленный город. Высокий уровень краж и наркопреступности.'},
  {city:'Navotas',lat:14.6667,lng:120.9417,crimeIndex:8,pop:250000,murderRate:11.0,theftRate:270,info:'Рыбацкий порт. Высокий уровень преступности и бедности.'},
  // Central Luzon
  {city:'Angeles City',lat:15.1680,lng:120.5880,crimeIndex:7,pop:462000,murderRate:7.5,theftRate:220,info:'Бывшая база Clark. Район ночной жизни — высокий риск для иностранцев. Drugging, грабежи.'},
  {city:'Olongapo/Subic',lat:14.8292,lng:120.2830,crimeIndex:6,pop:260000,murderRate:5.8,theftRate:180,info:'Бывшая ВМБ. Ночная жизнь — мелкие преступления. Subic Bay FZ — безопасно.'},
  {city:'San Fernando (Pampanga)',lat:15.0286,lng:120.6900,crimeIndex:5,pop:340000,murderRate:3.5,theftRate:140,info:'Провинциальная столица. Умеренный уровень преступности.'},
  // North Luzon
  {city:'Baguio',lat:16.4023,lng:120.5960,crimeIndex:4,pop:366000,murderRate:2.5,theftRate:130,info:'Летняя столица. Безопасно для туристов. Session Rd — мелкие кражи в толпе.'},
  {city:'Vigan',lat:17.5747,lng:120.3869,crimeIndex:2,pop:53000,murderRate:0.8,theftRate:40,info:'Исторический город UNESCO. Очень низкая преступность. Безопасно.'},
  {city:'Laoag',lat:18.1969,lng:120.5936,crimeIndex:3,pop:112000,murderRate:1.5,theftRate:60,info:'Провинциальный город. Спокойно и безопасно.'},
  {city:'Tuguegarao',lat:17.6132,lng:121.7270,crimeIndex:4,pop:166000,murderRate:2.8,theftRate:100,info:'Региональный центр. Умеренная преступность.'},
  // Calabarzon / South Luzon
  {city:'Tagaytay',lat:14.1153,lng:120.9621,crimeIndex:3,pop:77000,murderRate:1.2,theftRate:50,info:'Курортный город. Низкая преступность. Безопасно для туристов.'},
  {city:'Batangas City',lat:13.7565,lng:121.0583,crimeIndex:5,pop:330000,murderRate:4.0,theftRate:150,info:'Портовый город. Район порта — осторожно ночью.'},
  {city:'Naga (Camarines Sur)',lat:13.6192,lng:123.1814,crimeIndex:4,pop:209000,murderRate:2.5,theftRate:110,info:'Университетский город. Относительно безопасно.'},
  {city:'Legazpi',lat:13.1391,lng:123.7438,crimeIndex:4,pop:210000,murderRate:2.8,theftRate:100,info:'Город у Майона. Умеренная преступность. Район порта — осторожно.'},
  // Cebu
  {city:'Cebu City',lat:10.3157,lng:123.8854,crimeIndex:7,pop:964000,murderRate:8.2,theftRate:250,info:'Второй город PH. Colon St, Carbon Market — высокий риск. IT Park — безопасно.'},
  {city:'Mandaue',lat:10.3236,lng:123.9222,crimeIndex:5,pop:363000,murderRate:4.0,theftRate:160,info:'Промышленный пригород. Умеренно.'},
  {city:'Lapu-Lapu/Mactan',lat:10.3103,lng:123.9494,crimeIndex:4,pop:497000,murderRate:2.5,theftRate:110,info:'Остров Мактан. Туристические зоны безопасны. Мелкие кражи у пляжей.'},
  {city:'Moalboal',lat:9.9500,lng:123.3958,crimeIndex:3,pop:28000,murderRate:0.5,theftRate:30,info:'Дайверский посёлок. Очень безопасно. Мелкие мошенничества с ценами.'},
  {city:'Oslob',lat:9.4666,lng:123.4390,crimeIndex:2,pop:28000,murderRate:0.3,theftRate:20,info:'Рыбацкий городок. Whale shark туры. Минимальная преступность.'},
  // Bohol
  {city:'Tagbilaran',lat:9.6522,lng:123.8566,crimeIndex:3,pop:105000,murderRate:1.5,theftRate:60,info:'Столица Бохола. Спокойный провинциальный город.'},
  {city:'Panglao',lat:9.5604,lng:123.7625,crimeIndex:3,pop:38000,murderRate:1.0,theftRate:50,info:'Пляжный курорт. Безопасно. Редкие мошенничества с турами.'},
  // Negros / Siquijor
  {city:'Dumaguete',lat:9.3068,lng:123.3054,crimeIndex:3,pop:134000,murderRate:1.8,theftRate:60,info:'Университетский город. Один из самых безопасных на PH. Дружелюбная атмосфера.'},
  {city:'Bacolod',lat:10.6840,lng:122.9700,crimeIndex:5,pop:600000,murderRate:4.5,theftRate:160,info:'Город улыбок. Район рынка — мелкие кражи. В целом безопасно.'},
  {city:'Siquijor',lat:9.1987,lng:123.5950,crimeIndex:1,pop:100000,murderRate:0.2,theftRate:10,info:'Остров мистики. Практически нулевая преступность. Самое безопасное место на PH.'},
  // Western Visayas
  {city:'Iloilo City',lat:10.6918,lng:122.5640,crimeIndex:4,pop:457000,murderRate:3.0,theftRate:120,info:'Чистый город. Умеренная преступность. Район La Paz — осторожно ночью.'},
  {city:'Boracay/Malay',lat:11.9674,lng:121.9248,crimeIndex:5,pop:45000,murderRate:2.0,theftRate:180,info:'Туристический остров. Кражи на пляже, мошенничество с ценами. Полиция активна.'},
  // Eastern Visayas
  {city:'Tacloban',lat:11.2494,lng:124.9600,crimeIndex:5,pop:242000,murderRate:4.0,theftRate:150,info:'Столица Лейте. После Хайяна — рост мелкой преступности. Район рынка — осторожно.'},
  // Mindanao
  {city:'Davao City',lat:7.0707,lng:125.6087,crimeIndex:3,pop:1776000,murderRate:2.0,theftRate:80,info:'Один из самых безопасных крупных городов PH. Строгий порядок, комендантский час, запрет алкоголя.'},
  {city:'Cagayan de Oro',lat:8.4542,lng:124.6319,crimeIndex:5,pop:728000,murderRate:4.5,theftRate:150,info:'Растущий город. Район рынка — мелкие кражи. В целом средний уровень.'},
  {city:'General Santos',lat:6.1164,lng:125.1716,crimeIndex:5,pop:594000,murderRate:4.0,theftRate:140,info:'Тунцовая столица. Район порта — осторожно. В целом средне.'},
  {city:'Zamboanga',lat:6.9214,lng:122.0790,crimeIndex:8,pop:977000,murderRate:10.5,theftRate:220,info:'Исторически нестабильный. Осада 2013. Высокий уровень преступности и терроризма.'},
  {city:'Marawi',lat:8.0000,lng:124.2883,crimeIndex:9,pop:201000,murderRate:14.0,theftRate:100,info:'Разрушен осадой 2017. Зона конфликта. Не рекомендуется для посещения.'},
  {city:'Cotabato City',lat:7.2236,lng:124.2464,crimeIndex:8,pop:310000,murderRate:9.5,theftRate:180,info:'BARMM. Теракты, похищения. Высокий уровень преступности.'},
  {city:'Jolo (Sulu)',lat:6.0535,lng:121.0015,crimeIndex:10,pop:125000,murderRate:20.0,theftRate:150,info:'Наиболее опасное место на PH. Abu Sayyaf. Теракты, похищения. Запрет для туристов.'},
  {city:'Kidapawan',lat:7.0083,lng:125.0894,crimeIndex:5,pop:140000,murderRate:3.5,theftRate:100,info:'Провинциальный город. Умеренный уровень преступности.'},
  // Island destinations
  {city:'Siargao',lat:9.8482,lng:126.0458,crimeIndex:3,pop:55000,murderRate:1.0,theftRate:50,info:'Сёрф-остров. Безопасно. Мелкие кражи мотоциклов — растущая проблема.'},
  {city:'El Nido',lat:11.1785,lng:119.3921,crimeIndex:3,pop:43000,murderRate:0.5,theftRate:60,info:'Туристический рай. Безопасно. Мелкие мошенничества с ценами.'},
  {city:'Coron',lat:12.0050,lng:120.2040,crimeIndex:2,pop:52000,murderRate:0.3,theftRate:30,info:'Дайв-курорт. Очень безопасно. Практически нет преступности.'},
  {city:'Puerto Princesa',lat:9.7392,lng:118.7353,crimeIndex:3,pop:293000,murderRate:1.5,theftRate:70,info:'Столица Палаван. Безопасный город. Мелкие кражи у достопримечательностей.'},
  {city:'Camiguin',lat:9.1730,lng:124.7290,crimeIndex:2,pop:88000,murderRate:0.3,theftRate:15,info:'Маленький остров. Практически нулевая преступность. Дружелюбные жители.'},
];

MAP.HEALTH_EVENTS = [
  // Cebu / Visayas
  {id:'hl-1',type:'dengue',name:'Эпидемия денге 2024 (Себу)',date:'2024',lat:10.3157,lng:123.8854,cases:15394,deaths:35,severity:8,info:'14 смертей в провинции Себу. Дети 5-10 лет — основная группа риска. Пик сезона: июнь-октябрь.'},
  {id:'hl-2',type:'dengue',name:'Вспышка денге 2022 (Себу)',date:'2022',lat:10.3157,lng:123.8854,cases:11000,deaths:71,severity:9,info:'Провинция Себу: 4,263 случая, 26 смертей. Пик каждые 3 года.'},
  {id:'hl-3',type:'dengue',name:'Денге 2025 (Центр. Висайи)',date:'2025',lat:10.3157,lng:123.8854,cases:5880,deaths:10,severity:6,info:'Себу 2,936, Бохол 1,275, Себу Сити 999 случаев.'},
  {id:'hl-4',type:'measles',name:'Вспышка кори 2019 (Себу)',date:'2019',lat:10.3157,lng:123.8854,cases:737,deaths:8,severity:7,info:'Рост 1,317%. Все 8 погибших — дети. Связано с вакцинофобией после скандала Dengvaxia.'},
  {id:'hl-5',type:'dengvaxia',name:'Скандал Dengvaxia',date:'2016-2017',lat:10.3157,lng:123.8854,cases:700000,deaths:10,severity:8,info:'Вакцина дана 700,000 детям. Может ухудшить денге у ранее не болевших. Доверие к вакцинам упало с 93% до 32%.'},
  {id:'hl-6',type:'COVID-19',name:'COVID-19 Себу 2020',date:'2020',lat:10.3157,lng:123.8854,cases:10820,deaths:690,severity:9,info:'Себу — лидер по COVID в Филиппинах. Смертность 6.38%. Месяцы карантина.'},
  {id:'hl-7',type:'COVID-19',name:'COVID-19 2021-2023 (Центр. Висайи)',date:'2021-2023',lat:10.3157,lng:123.8854,cases:210549,deaths:6685,severity:10,info:'Кумулятивно по Центральным Висайям. Волны Delta и Omicron.'},
  {id:'hl-8',type:'leptospirosis',name:'Лептоспироз после тайфуна Tino',date:'2025-11',lat:10.3157,lng:123.8854,cases:117,deaths:7,severity:7,info:'117 случаев за 20 дней после наводнения. Заражённая паводковая вода.'},
  {id:'hl-9',type:'leptospirosis',name:'Лептоспироз Себу 2025',date:'2025',lat:10.3157,lng:123.8854,cases:93,deaths:17,severity:6,info:'Годовой показатель. Месяцы дождей и паводков. Заражение через воду с отходами животных.'},
  {id:'hl-10',type:'rabies',name:'Зона риска бешенства (вся PH)',date:'2023-2024',lat:10.3157,lng:123.8854,cases:55,deaths:55,severity:6,info:'Все 55 случаев за 2023 — летальные (100% смертность). 71% от собак. 250-300 смертей/год по стране.'},
  {id:'hl-11',type:'food',name:'Отравление лечоном',date:'2022-05',lat:9.9300,lng:124.0100,cases:45,deaths:0,severity:3,info:'8+ случаев отравления испорченным лечоном (жареная свинья) в Центральных Висайях.'},
  {id:'hl-12',type:'food',name:'Отравление рыбой (общежитие)',date:'2023-06',lat:10.3000,lng:123.8900,cases:28,deaths:0,severity:3,info:'28 жителей общежития госпитализированы после испорченной рыбы.'},
  {id:'hl-13',type:'cholera',name:'Эндемичная зона холеры (Висайи)',date:'2008-2024',lat:10.00,lng:124.00,cases:3756,deaths:19,severity:5,info:'Холера эндемична. 42,071 случаев за 2008-2013. Плохая санитария в зонах паводков.'},
  // Manila / Luzon
  {id:'hl-14',type:'dengue',name:'Эпидемия денге Манила 2019',date:'2019',lat:14.5547,lng:121.0244,cases:420000,deaths:1530,severity:10,info:'Национальная эпидемия. 420,000 случаев — рекорд. Metro Manila, Calabarzon, Central Luzon — лидеры.'},
  {id:'hl-15',type:'COVID-19',name:'COVID-19 Metro Manila 2020-2022',date:'2020-2022',lat:14.5547,lng:121.0244,cases:1200000,deaths:25000,severity:10,info:'Metro Manila — эпицентр COVID в PH. Жёсткие карантины ECQ/MECQ. Экономика упала на 9.5%.'},
  {id:'hl-16',type:'leptospirosis',name:'Лептоспироз Манила 2009',date:'2009-10',lat:14.5547,lng:121.0244,cases:3000,deaths:180,severity:9,info:'После наводнения Ondoy. Массовое заражение через паводковую воду. 180 погибших.'},
  {id:'hl-17',type:'respiratory',name:'Загрязнение воздуха Taal 2020',date:'2020-01',lat:14.0113,lng:120.9980,cases:50000,deaths:0,severity:7,info:'Извержение вулкана Taal. Пепловое облако над Батангас и Metro Manila. 376,000 эвакуированы.'},
  // Mindanao
  {id:'hl-18',type:'dengue',name:'Эпидемия денге Давао 2019',date:'2019',lat:7.0707,lng:125.6087,cases:23000,deaths:98,severity:9,info:'Регион Давао — второй по числу случаев. Влажный климат и скопления воды.'},
  {id:'hl-19',type:'cholera',name:'Холера Замбоанга',date:'2023',lat:6.9214,lng:122.0790,cases:150,deaths:3,severity:5,info:'Вспышка холеры в трущобах побережья. Проблемы с водоснабжением.'},
  // NEW: HIV/STD
  {id:'hl-20',type:'dengue',name:'Денге Центральный Лусон 2019',date:'2019',lat:15.00,lng:120.70,cases:45000,deaths:180,severity:9,info:'Central Luzon — один из самых пострадавших регионов. Пик в июле-сентябре.'},
  {id:'hl-21',type:'rabies',name:'Бешенство Давао 2024',date:'2024',lat:7.0707,lng:125.6087,cases:12,deaths:12,severity:7,info:'12 смертей за год. Программа массовой вакцинации собак. 100% смертность без PEP.'},
  {id:'hl-22',type:'leptospirosis',name:'Лептоспироз CDO после Sendong',date:'2012-01',lat:8.4542,lng:124.6319,cases:500,deaths:42,severity:8,info:'Массовая вспышка после наводнения. Заражённая вода в затопленных районах.'},
  {id:'hl-23',type:'cholera',name:'Холера Cotabato 2020',date:'2020',lat:7.2236,lng:124.2464,cases:200,deaths:5,severity:5,info:'Вспышка в лагерях эвакуированных. Плохая санитария, недостаток чистой воды.'},
  {id:'hl-24',type:'measles',name:'Корь Манила 2019',date:'2019',lat:14.5547,lng:121.0244,cases:42000,deaths:560,severity:10,info:'Национальная эпидемия кори. 42,000 случаев, 560 смертей. Последствие скандала Dengvaxia — отказ от вакцинации.'},
  // Additional health events for coverage
  {id:'hl-25',type:'dengue',name:'Денге Western Visayas 2019',date:'2019',lat:10.69,lng:122.56,cases:32000,deaths:130,severity:9,info:'Регион Western Visayas — один из лидеров по денге. Iloilo, Capiz, Aklan — наиболее пострадавшие.'},
  {id:'hl-26',type:'dengue',name:'Денге CALABARZON 2019',date:'2019',lat:14.17,lng:121.24,cases:55000,deaths:220,severity:9,info:'CALABARZON — абсолютный лидер по денге 2019. Laguna, Cavite, Batangas.'},
  {id:'hl-27',type:'leptospirosis',name:'Лептоспироз Metro Manila 2024',date:'2024',lat:14.55,lng:121.02,cases:2500,deaths:160,severity:8,info:'После серии тайфунов. Затопленные районы — идеальная среда. 70% случаев — мужчины.'},
  {id:'hl-28',type:'rabies',name:'Бешенство Central Visayas 2024',date:'2024',lat:10.31,lng:123.89,cases:8,deaths:8,severity:6,info:'8 случаев за год. Все летальные. Бродячие собаки — основной источник.'},
  {id:'hl-29',type:'dengue',name:'Денге Zamboanga Peninsula 2019',date:'2019',lat:6.92,lng:122.08,cases:12000,deaths:45,severity:8,info:'Zamboanga Peninsula — высокий уровень денге из-за влажного климата.'},
  {id:'hl-30',type:'COVID-19',name:'COVID-19 CALABARZON 2021',date:'2021',lat:14.17,lng:121.24,cases:450000,deaths:8000,severity:10,info:'Второй по числу случаев регион после NCR. Cavite, Laguna, Rizal.'},
  {id:'hl-31',type:'dengue',name:'Денге Davao 2024',date:'2024',lat:7.07,lng:125.61,cases:18000,deaths:65,severity:8,info:'Davao Region — постоянно высокий уровень денге из-за тропического климата.'},
  {id:'hl-32',type:'respiratory',name:'Туберкулёз PH (национальный)',date:'2023',lat:14.55,lng:121.02,cases:741000,deaths:52000,severity:9,info:'Филиппины — #4 в мире по ТБ. 741,000 случаев/год. 52,000 смертей. Metro Manila — эпицентр.'},
];

// Regional health risk statistics by city/area (healthRisk 1-10)
MAP.HEALTH_STATS = [
  // Metro Manila
  {city:'Manila City',lat:14.5995,lng:120.9842,healthRisk:8,pop:1846000,topDiseases:['TB','dengue','COVID'],info:'Плотность населения → ТБ, денге. Загрязнение воздуха. Лептоспироз после наводнений. 741K случаев ТБ/год по стране.'},
  {city:'Quezon City',lat:14.6760,lng:121.0437,healthRisk:7,pop:2960000,topDiseases:['dengue','TB','COVID'],info:'Крупнейший город — высокий уровень денге. Лидер по COVID в NCR. Недостаток зелёных зон.'},
  {city:'Makati/BGC',lat:14.5547,lng:121.0244,healthRisk:4,pop:582000,topDiseases:['respiratory','COVID'],info:'Хорошие больницы (Makati Med, St. Luke\'s). Загрязнение воздуха — главная проблема.'},
  {city:'Pasay/Paranaque',lat:14.5100,lng:121.0100,healthRisk:6,pop:1100000,topDiseases:['dengue','TB'],info:'Прибрежные районы — денге от стоячей воды. Бедные районы — ТБ.'},
  // Central Luzon
  {city:'Angeles/Clark',lat:15.1680,lng:120.5880,healthRisk:5,pop:462000,topDiseases:['dengue','respiratory'],info:'Бывшая база. Загрязнение от вулканического пепла (Пинатубо). Денге в сезон дождей.'},
  {city:'San Fernando (Pampanga)',lat:15.0286,lng:120.6900,healthRisk:5,pop:340000,topDiseases:['dengue','leptospirosis'],info:'Подвержен наводнениям → лептоспироз. Денге в июне-ноябре.'},
  // North Luzon
  {city:'Baguio',lat:16.4023,lng:120.5960,healthRisk:3,pop:366000,topDiseases:['respiratory'],info:'Горный город, прохладный климат. Минимум денге. Хороший воздух. Респираторные — от влажности.'},
  {city:'Laoag',lat:18.1969,lng:120.5936,healthRisk:3,pop:112000,topDiseases:['dengue'],info:'Сухой климат. Низкий уровень заболеваний. Хорошая провинциальная медицина.'},
  // Calabarzon
  {city:'Tagaytay',lat:14.1153,lng:120.9621,healthRisk:4,pop:77000,topDiseases:['respiratory'],info:'Горный курорт. Чистый воздух. Риск от вулканического пепла Тааля. Хорошие больницы рядом.'},
  {city:'Batangas City',lat:13.7565,lng:121.0583,healthRisk:5,pop:330000,topDiseases:['dengue','leptospirosis'],info:'Портовый город. Денге в сезон дождей. Риск от извержений Тааля.'},
  {city:'Calamba/Laguna',lat:14.2114,lng:121.1653,healthRisk:5,pop:500000,topDiseases:['dengue','COVID'],info:'Промышленная зона. Высокий уровень денге (CALABARZON — лидер 2019).'},
  // Bicol
  {city:'Legazpi',lat:13.1391,lng:123.7438,healthRisk:5,pop:210000,topDiseases:['dengue','respiratory'],info:'Вулканический пепел Майона. Денге в сезон дождей. Провинциальная медицина.'},
  {city:'Naga',lat:13.6192,lng:123.1814,healthRisk:4,pop:209000,topDiseases:['dengue'],info:'Университетский город. Хорошая медицина для региона. Денге — умеренно.'},
  // Cebu
  {city:'Cebu City',lat:10.3157,lng:123.8854,healthRisk:7,pop:964000,topDiseases:['dengue','COVID','leptospirosis'],info:'Лидер по COVID в 2020. Эпидемии денге каждые 3 года. Лептоспироз после тайфунов.'},
  {city:'Mandaue/Lapu-Lapu',lat:10.3236,lng:123.9222,healthRisk:5,pop:860000,topDiseases:['dengue'],info:'Промышленная зона + курорты. Денге в сезон дождей. Хорошие частные больницы.'},
  {city:'Moalboal',lat:9.9500,lng:123.3958,healthRisk:3,pop:28000,topDiseases:['dengue'],info:'Маленький посёлок. Мало болезней. Ближайшая больница — 2 часа в Себу.'},
  // Bohol
  {city:'Tagbilaran/Bohol',lat:9.6522,lng:123.8566,healthRisk:4,pop:105000,topDiseases:['dengue'],info:'Провинциальный город. Умеренный уровень денге. Хороший госпиталь.'},
  {city:'Panglao',lat:9.5604,lng:123.7625,healthRisk:3,pop:38000,topDiseases:['dengue'],info:'Курортный остров. Минимум болезней. Клиники для туристов.'},
  // Negros / Siquijor
  {city:'Dumaguete',lat:9.3068,lng:123.3054,healthRisk:3,pop:134000,topDiseases:['dengue'],info:'Университетский город. Хорошая медицина (Silliman). Низкий уровень болезней.'},
  {city:'Bacolod',lat:10.6840,lng:122.9700,healthRisk:5,pop:600000,topDiseases:['dengue','COVID'],info:'Крупный город Негроса. Денге в сезон. Хорошие больницы.'},
  {city:'Siquijor',lat:9.1987,lng:123.5950,healthRisk:3,pop:100000,topDiseases:['dengue'],info:'Маленький остров. Минимум болезней. Ограниченная медицина — серьёзные случаи → Думагете.'},
  // Western Visayas
  {city:'Iloilo City',lat:10.6918,lng:122.5640,healthRisk:5,pop:457000,topDiseases:['dengue','cholera'],info:'Western Visayas — лидер по денге 2019. Холера при наводнениях. Хорошие больницы.'},
  {city:'Boracay/Malay',lat:11.9674,lng:121.9248,healthRisk:4,pop:45000,topDiseases:['dengue'],info:'Туристический остров. Проблемы с канализацией (закрытие 2018). Клиники есть.'},
  // Eastern Visayas
  {city:'Tacloban',lat:11.2494,lng:124.9600,healthRisk:6,pop:242000,topDiseases:['dengue','leptospirosis'],info:'После Хайяна — всплеск лептоспироза. Денге ежегодно. Медицина восстанавливается.'},
  // Mindanao
  {city:'Davao City',lat:7.0707,lng:125.6087,healthRisk:5,pop:1776000,topDiseases:['dengue','rabies'],info:'Постоянно высокий денге (тропик). Бешенство — проблема. Хорошие больницы (SPMC, Davao Doctors).'},
  {city:'Cagayan de Oro',lat:8.4542,lng:124.6319,healthRisk:6,pop:728000,topDiseases:['dengue','leptospirosis'],info:'Лептоспироз после Sendong (42 погибших). Денге ежегодно. Медицина средняя.'},
  {city:'General Santos',lat:6.1164,lng:125.1716,healthRisk:5,pop:594000,topDiseases:['dengue','cholera'],info:'Портовый город. Денге, проблемы санитарии в бедных районах.'},
  {city:'Zamboanga',lat:6.9214,lng:122.0790,healthRisk:7,pop:977000,topDiseases:['dengue','cholera','malaria'],info:'Высокий денге, холера в трущобах, малярия на островах. Медицина ограничена.'},
  {city:'Cotabato',lat:7.2236,lng:124.2464,healthRisk:8,pop:310000,topDiseases:['cholera','dengue','malaria'],info:'BARMM — худшая медицина в PH. Холера, малярия. Конфликты мешают здравоохранению.'},
  {city:'Marawi',lat:8.0000,lng:124.2883,healthRisk:9,pop:201000,topDiseases:['cholera','TB','malaria'],info:'Разрушен осадой. Медицина практически отсутствует. Лагеря беженцев — вспышки болезней.'},
  // Islands
  {city:'Siargao',lat:9.8482,lng:126.0458,healthRisk:4,pop:55000,topDiseases:['dengue'],info:'Сёрф-остров. Мало болезней. Ограниченная медицина. Серьёзное → Суригао.'},
  {city:'El Nido',lat:11.1785,lng:119.3921,healthRisk:3,pop:43000,topDiseases:['dengue'],info:'Туристический рай. Минимум болезней. Базовые клиники. Серьёзное → Пуэрто-Принсеса.'},
  {city:'Coron',lat:12.0050,lng:120.2040,healthRisk:3,pop:52000,topDiseases:['dengue'],info:'Дайв-курорт. Мало болезней. Ограниченная медицина.'},
  {city:'Puerto Princesa',lat:9.7392,lng:118.7353,healthRisk:3,pop:293000,topDiseases:['dengue','malaria'],info:'Столица Палаван. Малярия на южных островах. Хорошая провинциальная медицина.'},
  {city:'Camiguin',lat:9.1730,lng:124.7290,healthRisk:3,pop:88000,topDiseases:['dengue'],info:'Маленький остров. Минимум болезней. Ограниченная медицина.'},
];
