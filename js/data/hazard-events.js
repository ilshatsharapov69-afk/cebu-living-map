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
    ]
  },
];

MAP.FLOOD_EVENTS = [
  {id:'fl-1',name:'Паводки тайфуна Tino (Себу)',date:'2025-11-04',lat:10.3157,lng:123.8854,deaths:71,affected:500000,severity:10,cause:'Тайфун Kalmaegi/Tino',info:'Худший паводок в истории Себу. Реки Guadalupe, Lahug, Kinalumsan вышли из берегов.'},
  {id:'fl-2',name:'Великий паводок Ормока',date:'1991-11-05',lat:11.0044,lng:124.6075,deaths:4922,affected:25000,severity:10,cause:'ТШ Thelma/Uring — 580мм за 3 часа',info:'Самое смертоносное наводнение в истории Филиппин на тот момент.'},
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
];

MAP.LANDSLIDE_EVENTS = [
  {id:'ls-1',name:'Оползень Нага',date:'2018-09-20',lat:10.2090,lng:123.7590,deaths:78,severity:10,cause:'Муссонные дожди + горная добыча',info:'80 гектаров. Известняковая скала обрушилась на рассвете. 77 домов уничтожено.'},
  {id:'ls-2',name:'Оползень Гинсаугон',date:'2006-02-17',lat:10.2750,lng:125.0050,deaths:1126,severity:10,cause:'10 дней дождей + землетрясение M2.6',info:'Деревня погребена вместе со школой. 8000 пострадавших.'},
  {id:'ls-3',name:'Оползни землетрясения Бохол',date:'2013-10-15',lat:9.8700,lng:124.0100,deaths:222,severity:9,cause:'Землетрясение M7.2',info:'Оползни на Шоколадных Холмах. 73,000+ зданий повреждено.'},
  {id:'ls-4',name:'Обвал свалки Бинали',date:'2026-01-08',lat:10.3600,lng:123.9200,deaths:19,severity:7,cause:'Землетрясение 2025 + дожди тайфуна Tino',info:'Мусорный оползень на городской свалке. Кризис утилизации отходов.'},
  {id:'ls-5',name:'Оползни тайфуна Tino (Себу)',date:'2025-11-04',lat:10.5700,lng:123.9500,deaths:15,severity:7,cause:'Экстремальные осадки тайфуна',info:'Множественные оползни в горах Себу. Дороги перекрыты, посёлки изолированы.'},
  {id:'ls-6',name:'Оползни тайфуна Odette',date:'2021-12-16',lat:9.9500,lng:123.5900,deaths:8,severity:6,cause:'Супертайфун Rai/Odette',info:'Множественные оползни на юге Себу.'},
  {id:'ls-7',name:'Оползни тайфуна Haiyan (Лейте)',date:'2013-11-08',lat:11.00,lng:124.90,deaths:50,severity:8,cause:'Супертайфун Haiyan',info:'Горные общины отрезаны от помощи на дни.'},
  {id:'ls-8',name:'Оползни Негрос',date:'2026-02-02',lat:10.2000,lng:122.9600,deaths:1,severity:3,cause:'ТШ Penha/Basyang',info:'Паводки и оползни в Negros Occidental.'},
  {id:'ls-9',name:'Оползни Себу-Бохол',date:'2022-08-04',lat:10.30,lng:123.95,deaths:2,severity:4,cause:'Муссонные дожди',info:'10 случаев затоплений. 288 семей пострадали.'},
];

MAP.CRIME_EVENTS = [
  {id:'cr-1',type:'theft',name:'Карманные кражи Colon Street',lat:10.2950,lng:123.8990,period:'Постоянно',severity:8,info:'Старейшая улица Филиппин. Воры работают группами. 202 случая за янв-июн 2022. Опасно после темноты.'},
  {id:'cr-2',type:'theft',name:'Кражи Carbon Market',lat:10.2920,lng:123.8970,period:'Постоянно',severity:8,info:'Крупнейший рынок Себу. Толпы и узкие проходы — рай для карманников.'},
  {id:'cr-3',type:'drugs',name:'Mango Avenue — наркотики и грабежи',lat:10.3100,lng:123.8930,period:'Постоянно',severity:7,info:'Ночной район. Наркоторговля. Группы детей 7-14 лет обыскивают карманы. Риск после полуночи.'},
  {id:'cr-4',type:'robbery',name:'Ограбление туристов у Temple of Leah',lat:10.3370,lng:123.8700,period:'2025',severity:6,info:'Двое иностранцев ограблены у туристической достопримечательности в горах Себу.'},
  {id:'cr-5',type:'murder',name:'Американец застрелен в баре отеля',lat:10.3157,lng:123.8854,period:'2024-03',severity:9,info:'Michael George Richey застрелен местным рэпером у бара отеля. Умер через 2 дня.'},
  {id:'cr-6',type:'murder',name:'Убийство японо-американца',lat:10.3157,lng:123.8854,period:'2023-11',severity:9,info:'72-летний муж убит. Сообщник жены приехал из Cagayan de Oro.'},
  {id:'cr-7',type:'scam',name:'ATM скимминг',lat:10.3200,lng:123.9050,period:'Постоянно',severity:5,info:'Турист потерял 40,000 PHP. Устройства на уличных банкоматах считывают PIN.'},
  {id:'cr-8',type:'scam',name:'Такси-мошенничество у аэропорта',lat:10.3100,lng:123.9800,period:'Постоянно',severity:4,info:'Таксисты отказываются включать счётчик, завышают цены, выбирают длинные маршруты.'},
  {id:'cr-9',type:'robbery',name:'Ночные грабежи даунтауна',lat:10.2980,lng:123.8960,period:'Постоянно',severity:7,info:'Грабежи в переулках и плохо освещённых районах центра после темноты.'},
  {id:'cr-10',type:'drugs',name:'Наркотрафик Себу',lat:10.3000,lng:123.9000,period:'2023-2024',severity:7,info:'Изъято шабу на P174.8M в одной операции. Двое арестованы с P8.5M метамфетамина.'},
  {id:'cr-11',type:'scam',name:'Рейд на онлайн-мошенников',lat:10.3300,lng:123.9100,period:'2022',severity:6,info:'300 граждан КНР арестованы. Нелегальный колл-центр. 150 экстрадированы.'},
  {id:'cr-12',type:'theft',name:'Fuente Osmeña Circle',lat:10.3080,lng:123.8910,period:'Постоянно',severity:6,info:'Площадь с бездомными. Мелкие кражи, особенно ночью. Рядом ночной район Mango Ave.'},
  {id:'cr-13',type:'scam',name:'Фейковые бронирования',lat:10.3157,lng:123.8854,period:'2023-2026',severity:5,info:'200+ задокументированных случаев с 2025. Фальшивые отели и туры.'},
  {id:'cr-14',type:'robbery',name:'Грабежи в прибрежных трущобах',lat:10.2900,lng:123.9050,period:'Постоянно',severity:7,info:'Переулки трущоб у побережья — высокий риск ограбления, особенно для иностранцев после темноты.'},
];

MAP.HEALTH_EVENTS = [
  {id:'hl-1',type:'dengue',name:'Эпидемия денге 2024',date:'2024',lat:10.3157,lng:123.8854,cases:15394,deaths:35,severity:8,info:'14 смертей в провинции Себу. Дети 5-10 лет — основная группа риска.'},
  {id:'hl-2',type:'dengue',name:'Вспышка денге 2022',date:'2022',lat:10.3157,lng:123.8854,cases:11000,deaths:71,severity:9,info:'Провинция Себу: 4,263 случая, 26 смертей. Пик каждые 3 года.'},
  {id:'hl-3',type:'dengue',name:'Денге 2025',date:'2025',lat:10.3157,lng:123.8854,cases:5880,deaths:10,severity:6,info:'Себу 2,936, Бохол 1,275, Себу Сити 999 случаев.'},
  {id:'hl-4',type:'measles',name:'Вспышка кори 2019',date:'2019',lat:10.3157,lng:123.8854,cases:737,deaths:8,severity:7,info:'Рост 1,317%. Все 8 погибших — дети. Связано с вакцинофобией после скандала Dengvaxia.'},
  {id:'hl-5',type:'dengvaxia',name:'Скандал Dengvaxia',date:'2016-2017',lat:10.3157,lng:123.8854,cases:700000,deaths:10,severity:8,info:'Вакцина дана 700,000 детям. Может ухудшить денге у ранее не болевших. Доверие к вакцинам упало с 93% до 32%.'},
  {id:'hl-6',type:'COVID-19',name:'COVID-19 Себу 2020',date:'2020',lat:10.3157,lng:123.8854,cases:10820,deaths:690,severity:9,info:'Себу — лидер по COVID в Филиппинах. Смертность 6.38%. Месяцы карантина.'},
  {id:'hl-7',type:'COVID-19',name:'COVID-19 2021-2023',date:'2021-2023',lat:10.3157,lng:123.8854,cases:210549,deaths:6685,severity:10,info:'Кумулятивно по Центральным Висайям. Волны Delta и Omicron.'},
  {id:'hl-8',type:'leptospirosis',name:'Лептоспироз после тайфуна Tino',date:'2025-11',lat:10.3157,lng:123.8854,cases:117,deaths:7,severity:7,info:'117 случаев за 20 дней после наводнения. Заражённая паводковая вода.'},
  {id:'hl-9',type:'leptospirosis',name:'Лептоспироз Себу 2025',date:'2025',lat:10.3157,lng:123.8854,cases:93,deaths:17,severity:6,info:'Годовой показатель. Месяцы дождей и паводков. Заражение через воду с отходами животных.'},
  {id:'hl-10',type:'rabies',name:'Зона риска бешенства',date:'2023-2024',lat:10.3157,lng:123.8854,cases:55,deaths:55,severity:6,info:'Все 55 случаев в Филиппинах за 2023 — летальные. 71% от собак. 250-300 смертей/год по стране.'},
  {id:'hl-11',type:'food',name:'Отравление лечоном',date:'2022-05',lat:9.9300,lng:124.0100,cases:45,deaths:0,severity:3,info:'8+ случаев отравления испорченным лечоном (жареная свинья) в Центральных Висайях.'},
  {id:'hl-12',type:'food',name:'Отравление рыбой (общежитие)',date:'2023-06',lat:10.3000,lng:123.8900,cases:28,deaths:0,severity:3,info:'28 жителей общежития госпитализированы после испорченной рыбы.'},
  {id:'hl-13',type:'cholera',name:'Эндемичная зона холеры',date:'2008-2024',lat:10.00,lng:124.00,cases:3756,deaths:19,severity:5,info:'Холера эндемична. 42,071 случаев за 2008-2013. Плохая санитария в зонах паводков.'},
];
