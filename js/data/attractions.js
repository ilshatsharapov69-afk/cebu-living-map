window.MAP = window.MAP || {};

// Достопримечательности Филиппин
// tier 1 = zoom 6+  (топ, всемирно известные)
// tier 2 = zoom 9+  (региональные, популярные)
// tier 3 = zoom 12+ (локальные, стоит посетить рядом)
//
// type: waterfall, church, volcano, mountain, cave, island, park,
//       museum, historic, viewpoint, marine, hotspring, nature,
//       monument, adventure, landmark

// Маппинг type → emoji для маркеров
MAP.ATTRACTION_ICONS = {
    waterfall:  '💧',
    church:     '⛪',
    volcano:    '🌋',
    mountain:   '⛰️',
    cave:       '🦇',
    island:     '🏝️',
    park:       '🌳',
    museum:     '🎨',
    historic:   '🏛️',
    viewpoint:  '👁️',
    marine:     '🤿',
    hotspring:  '♨️',
    nature:     '🌿',
    monument:   '🗿',
    adventure:  '🏄',
    landmark:   '📍',
};

MAP.ATTRACTIONS = [
    // ═══════════════════════════════════════════
    // TIER 1 — Топ достопримечательности (zoom 6+)
    // ═══════════════════════════════════════════

    // --- Cordillera / North Luzon ---
    { name: 'Banaue Rice Terraces', desc: 'Рисовые террасы Банауэ — 2000-летний шедевр ифугао, наследие ЮНЕСКО', lat: 16.9167, lng: 121.0500, tier: 1, importance: 'large', type: 'nature' },
    { name: 'Batad Rice Terraces', desc: 'Амфитеатр рисовых террас Батад — самый живописный вид в Кордильерах', lat: 16.9200, lng: 121.1000, tier: 1, importance: 'large', type: 'nature' },
    { name: 'Sagada Hanging Coffins', desc: 'Висящие гробы Сагады — древний погребальный обычай горного народа', lat: 17.0850, lng: 121.0550, tier: 1, importance: 'large', type: 'historic' },
    { name: 'Mt. Pulag', desc: 'Гора Пулаг (2922 м) — третья по высоте вершина, море облаков на рассвете', lat: 16.5870, lng: 120.8890, tier: 1, importance: 'large', type: 'mountain' },
    { name: 'Vigan Heritage Village', desc: 'Виган — испанский колониальный город, наследие ЮНЕСКО', lat: 17.5747, lng: 120.3869, tier: 1, importance: 'large', type: 'historic' },
    { name: 'Bangui Windmills', desc: 'Ветряные мельницы Бангуи — культовый ряд ветрогенераторов на побережье', lat: 18.5350, lng: 120.7950, tier: 1, importance: 'large', type: 'landmark' },
    { name: 'Paoay Church', desc: 'Церковь Паоай — барочная церковь-крепость, ЮНЕСКО', lat: 18.0530, lng: 120.5180, tier: 1, importance: 'large', type: 'church' },

    // --- Metro Manila ---
    { name: 'Intramuros', desc: 'Интрамурос — историческая крепость и старый город Манилы', lat: 14.5896, lng: 120.9742, tier: 1, importance: 'large', type: 'historic' },
    { name: 'Rizal Park (Luneta)', desc: 'Парк Рисаль — главный парк Манилы, памятник национальному герою', lat: 14.5831, lng: 120.9794, tier: 1, importance: 'large', type: 'park' },
    { name: 'San Agustin Church Manila', desc: 'Церковь Сан-Агустин — старейшая каменная церковь Филиппин, ЮНЕСКО', lat: 14.5886, lng: 120.9751, tier: 1, importance: 'large', type: 'church' },

    // --- Batangas / Laguna ---
    { name: 'Taal Volcano', desc: 'Вулкан Таал — вулкан в озере на вулкане, один из самых маленьких в мире', lat: 14.0113, lng: 120.9980, tier: 1, importance: 'large', type: 'volcano' },
    { name: 'Pagsanjan Falls', desc: 'Водопад Пагсанхан — могучий водопад с лодочным сплавом через каньон', lat: 14.2340, lng: 121.4870, tier: 1, importance: 'large', type: 'waterfall' },

    // --- Bicol ---
    { name: 'Mayon Volcano', desc: 'Вулкан Майон — идеальный конус, самый красивый вулкан Филиппин', lat: 13.2570, lng: 123.6860, tier: 1, importance: 'large', type: 'volcano' },
    { name: 'Cagsawa Ruins', desc: 'Руины Кагсава — колокольня, погребённая извержением Майона в 1814', lat: 13.1890, lng: 123.6880, tier: 1, importance: 'large', type: 'historic' },

    // --- Palawan ---
    { name: 'Puerto Princesa Underground River', desc: 'Подземная река — 8 км судоходной пещерной реки, ЮНЕСКО', lat: 10.1733, lng: 118.9203, tier: 1, importance: 'large', type: 'cave' },
    { name: 'El Nido Big Lagoon', desc: 'Большая Лагуна Эль-Нидо — бирюзовая лагуна среди известняковых скал', lat: 11.1950, lng: 119.3350, tier: 1, importance: 'large', type: 'marine' },
    { name: 'Coron Kayangan Lake', desc: 'Озеро Каянган — кристально чистое озеро, «самое чистое на Филиппинах»', lat: 11.9940, lng: 120.2060, tier: 1, importance: 'large', type: 'nature' },
    { name: 'Tubbataha Reef', desc: 'Риф Туббатаха — морской заповедник мирового класса, ЮНЕСКО', lat: 8.9500, lng: 119.8300, tier: 1, importance: 'large', type: 'marine' },

    // --- Bohol ---
    { name: 'Chocolate Hills', desc: 'Шоколадные Холмы — 1268 конусообразных холмов, визитная карточка Бохола', lat: 9.7950, lng: 124.0670, tier: 1, importance: 'large', type: 'nature' },
    { name: 'Tarsier Sanctuary Bohol', desc: 'Заповедник долгопятов — самые маленькие приматы в мире', lat: 9.6930, lng: 124.0710, tier: 1, importance: 'large', type: 'nature' },

    // --- Cebu ---
    { name: 'Magellan\'s Cross', desc: 'Крест Магеллана — установлен в 1521, символ начала христианства', lat: 10.2936, lng: 123.9020, tier: 1, importance: 'large', type: 'historic' },
    { name: 'Kawasan Falls', desc: 'Водопад Кавасан — многоуровневый бирюзовый водопад, каньонинг', lat: 9.8120, lng: 123.3720, tier: 1, importance: 'large', type: 'waterfall' },

    // --- Boracay ---
    { name: 'Boracay White Beach', desc: 'Уайт Бич Боракай — 4 км белоснежного песка, топ пляж Азии', lat: 11.9660, lng: 121.9230, tier: 1, importance: 'large', type: 'island' },

    // --- Siargao ---
    { name: 'Cloud 9 Siargao', desc: 'Cloud 9 — легендарный серф-спот, столица сёрфинга Филиппин', lat: 9.8200, lng: 126.1200, tier: 1, importance: 'large', type: 'adventure' },

    // --- Camiguin ---
    { name: 'White Island Camiguin', desc: 'Белый остров — песчаная коса с видом на вулканы Камигуина', lat: 9.2200, lng: 124.6500, tier: 1, importance: 'large', type: 'island' },

    // --- Mindanao ---
    { name: 'Mt. Apo', desc: 'Гора Апо (2954 м) — высочайшая вершина Филиппин', lat: 7.0000, lng: 125.2710, tier: 1, importance: 'large', type: 'mountain' },
    { name: 'Philippine Eagle Center', desc: 'Центр филиппинского орла — крупнейший орёл в мире, эндемик', lat: 7.1460, lng: 125.5260, tier: 1, importance: 'large', type: 'nature' },
    { name: 'Enchanted River Surigao', desc: 'Зачарованная река — глубокая бирюзовая река с загадочным источником', lat: 8.9080, lng: 126.1580, tier: 1, importance: 'large', type: 'nature' },

    // --- Ilocos / Pangasinan ---
    { name: 'Hundred Islands', desc: 'Сто островов — национальный парк из 124 островов и островков', lat: 16.2100, lng: 119.9300, tier: 1, importance: 'large', type: 'island' },

    // ═══════════════════════════════════════════
    // TIER 2 — Региональные (zoom 9+)
    // ═══════════════════════════════════════════

    // --- Cordillera / North Luzon ---
    { name: 'Sumaguing Cave', desc: 'Пещера Сумагуинг — огромная известняковая пещера со сталактитами', lat: 17.0830, lng: 121.0580, tier: 2, importance: 'medium', type: 'cave' },
    { name: 'Echo Valley Sagada', desc: 'Долина Эхо — смотровая с видом на висящие гробы и рисовые поля', lat: 17.0870, lng: 121.0520, tier: 2, importance: 'medium', type: 'viewpoint' },
    { name: 'Kiltepan Viewpoint', desc: 'Смотровая Килтепан — лучший рассвет над морем облаков в Сагаде', lat: 17.0900, lng: 121.0700, tier: 2, importance: 'medium', type: 'viewpoint' },
    { name: 'Burnham Park Baguio', desc: 'Парк Бёрнхэм — центральный парк Багио с озером и лодками', lat: 16.4115, lng: 120.5960, tier: 2, importance: 'medium', type: 'park' },
    { name: 'Mines View Park', desc: 'Парк Майнс Вью — смотровая на горнодобывающие долины Бенгета', lat: 16.4150, lng: 120.6130, tier: 2, importance: 'medium', type: 'viewpoint' },
    { name: 'Tam-awan Village', desc: 'Деревня Там-аван — реконструкция традиционной горной деревни', lat: 16.4250, lng: 120.5810, tier: 2, importance: 'medium', type: 'historic' },
    { name: 'Kapurpurawan Rock Formation', desc: 'Белые скалы Капурпураван — причудливые формации из белого известняка', lat: 18.0870, lng: 120.5310, tier: 2, importance: 'medium', type: 'nature' },
    { name: 'Callao Cave', desc: 'Пещера Каллао — семикамерная пещера с часовней внутри', lat: 17.7280, lng: 121.8250, tier: 2, importance: 'medium', type: 'cave' },
    { name: 'Pagudpud Blue Lagoon', desc: 'Голубая лагуна Пагудпуд — бирюзовый пляж на северном побережье Лусона', lat: 18.5600, lng: 120.8500, tier: 2, importance: 'medium', type: 'island' },

    // --- Central Luzon ---
    { name: 'Mt. Pinatubo Crater Lake', desc: 'Кратерное озеро Пинатубо — бирюзовое озеро в кратере вулкана', lat: 15.1420, lng: 120.3500, tier: 2, importance: 'medium', type: 'volcano' },
    { name: 'Subic Bay', desc: 'Субик Бэй — бывшая военная база, дайвинг на затонувшие корабли', lat: 14.7940, lng: 120.2830, tier: 2, importance: 'medium', type: 'marine' },

    // --- Metro Manila ---
    { name: 'Fort Santiago', desc: 'Форт Сантьяго — цитадель в Интрамуросе, место заключения Хосе Рисаля', lat: 14.5955, lng: 120.9700, tier: 2, importance: 'medium', type: 'historic' },
    { name: 'Manila Ocean Park', desc: 'Оушен Парк — океанариум и морской тематический парк Манилы', lat: 14.5790, lng: 120.9840, tier: 2, importance: 'medium', type: 'park' },
    { name: 'National Museum of Fine Arts', desc: 'Национальный музей — коллекция филиппинского искусства, бесплатный вход', lat: 14.5850, lng: 120.9790, tier: 2, importance: 'medium', type: 'museum' },
    { name: 'Manila Cathedral', desc: 'Манильский кафедральный собор — главный католический храм страны', lat: 14.5919, lng: 120.9738, tier: 2, importance: 'medium', type: 'church' },
    { name: 'BGC Mind Museum', desc: 'Музей Разума — современный интерактивный научный музей', lat: 14.5515, lng: 121.0490, tier: 2, importance: 'medium', type: 'museum' },

    // --- Batangas / Laguna / Quezon ---
    { name: 'Masungi Georeserve', desc: 'Масунги — экотрейл по карстовым скалам с подвесными мостами', lat: 14.5580, lng: 121.3250, tier: 2, importance: 'medium', type: 'nature' },
    { name: 'Mt. Batulao', desc: 'Гора Батулао — популярный хайк с панорамным видом на Батангас', lat: 14.0540, lng: 120.7890, tier: 2, importance: 'medium', type: 'mountain' },
    { name: 'Daranak Falls', desc: 'Водопад Даранак — широкий водопад с природным бассейном для купания', lat: 14.5410, lng: 121.3690, tier: 2, importance: 'medium', type: 'waterfall' },
    { name: 'Villa Escudero', desc: 'Вилла Эскудеро — плантация-музей, обед у водопада', lat: 14.0730, lng: 121.3290, tier: 2, importance: 'medium', type: 'historic' },
    { name: 'Kamay ni Hesus', desc: 'Рука Иисуса — 15-метровая статуя Христа на холме в Лусене', lat: 13.9260, lng: 121.6170, tier: 2, importance: 'medium', type: 'monument' },

    // --- Bicol ---
    { name: 'Donsol Whale Sharks', desc: 'Донсоль — плавание с китовыми акулами в естественной среде', lat: 12.9080, lng: 123.5980, tier: 2, importance: 'medium', type: 'marine' },
    { name: 'Caramoan Islands', desc: 'Острова Карамоан — нетронутые пляжи и скалы, место съёмок Survivor', lat: 13.7700, lng: 123.9200, tier: 2, importance: 'medium', type: 'island' },
    { name: 'Quitinday Green Hills', desc: 'Зелёные холмы Китиндай — «шоколадные холмы Биколя»', lat: 13.2050, lng: 123.6600, tier: 2, importance: 'medium', type: 'nature' },

    // --- Palawan ---
    { name: 'Nacpan Beach El Nido', desc: 'Пляж Накпан — 4 км золотого песка, один из лучших в мире', lat: 11.2470, lng: 119.4120, tier: 2, importance: 'medium', type: 'island' },
    { name: 'Small Lagoon El Nido', desc: 'Малая Лагуна — уединённая лагуна, вход через скальную арку на каяке', lat: 11.1970, lng: 119.3360, tier: 2, importance: 'medium', type: 'marine' },
    { name: 'Twin Lagoon Coron', desc: 'Двойная Лагуна Корон — две лагуны, соединённые проходом в скале', lat: 11.9870, lng: 120.1990, tier: 2, importance: 'medium', type: 'marine' },
    { name: 'Barracuda Lake Coron', desc: 'Озеро Барракуда — уникальный термоклин, знаменитый дайв-сайт', lat: 11.9900, lng: 120.2050, tier: 2, importance: 'medium', type: 'marine' },
    { name: 'Honda Bay', desc: 'Бухта Хонда — island hopping, снорклинг на коралловых островах', lat: 9.8200, lng: 118.7800, tier: 2, importance: 'medium', type: 'marine' },
    { name: 'Tabon Caves', desc: 'Пещеры Табон — «колыбель филиппинской цивилизации», 30000 лет', lat: 9.3600, lng: 117.9300, tier: 2, importance: 'medium', type: 'cave' },

    // --- Cebu ---
    { name: 'Fort San Pedro Cebu', desc: 'Форт Сан-Педро — старейший испанский форт на Филиппинах (1565)', lat: 10.2924, lng: 123.9054, tier: 2, importance: 'medium', type: 'historic' },
    { name: 'Basilica del Santo Niño', desc: 'Базилика Санто-Ниньо — старейшая церковь Себу, святыня младенца Иисуса', lat: 10.2942, lng: 123.9029, tier: 2, importance: 'medium', type: 'church' },
    { name: 'Temple of Leah', desc: 'Храм Лии — «Тадж-Махал Себу», помпезный мемориал на холме', lat: 10.3430, lng: 123.8650, tier: 2, importance: 'medium', type: 'monument' },
    { name: 'Tops Lookout Cebu', desc: 'Смотровая Топс — панорама ночного Себу-Сити с высоты', lat: 10.3440, lng: 123.8530, tier: 2, importance: 'medium', type: 'viewpoint' },
    { name: 'Osmena Peak', desc: 'Пик Осменья — высшая точка Себу (1013 м), зубчатые скалы', lat: 9.8100, lng: 123.4360, tier: 2, importance: 'medium', type: 'mountain' },
    { name: 'Oslob Whale Sharks', desc: 'Китовые акулы Ослоба — утренний снорклинг с гигантами', lat: 9.4640, lng: 123.4380, tier: 2, importance: 'medium', type: 'marine' },
    { name: 'Tumalog Falls', desc: 'Водопад Тумалог — каскадный водопад-занавес возле Ослоба', lat: 9.4650, lng: 123.4350, tier: 2, importance: 'medium', type: 'waterfall' },
    { name: 'Moalboal Sardine Run', desc: 'Сардиновый шторм Моалбоала — миллионы сардин у берега', lat: 9.9380, lng: 123.3900, tier: 2, importance: 'medium', type: 'marine' },
    { name: 'Simala Shrine', desc: 'Храм Симала — огромный замок-церковь, место паломничества', lat: 10.0080, lng: 123.6120, tier: 2, importance: 'medium', type: 'church' },

    // --- Bohol ---
    { name: 'Loboc River Cruise', desc: 'Круиз по реке Лобок — обед на плавучем ресторане в джунглях', lat: 9.6330, lng: 124.0280, tier: 2, importance: 'medium', type: 'nature' },
    { name: 'Hinagdanan Cave', desc: 'Пещера Хинагданан — подземное озеро с естественным освещением', lat: 9.5760, lng: 123.7820, tier: 2, importance: 'medium', type: 'cave' },
    { name: 'Balicasag Island', desc: 'Остров Баликасаг — стена кораллов, дайвинг и черепахи', lat: 9.5170, lng: 123.6830, tier: 2, importance: 'medium', type: 'marine' },

    // --- Negros / Siquijor ---
    { name: 'Twin Lakes Negros', desc: 'Двойные озёра — Балинсасаяо и Данао в кратере вулкана', lat: 9.3580, lng: 123.1820, tier: 2, importance: 'medium', type: 'nature' },
    { name: 'Casaroro Falls', desc: 'Водопад Касароро — 30-метровый водопад в глубоком каньоне', lat: 9.2920, lng: 123.2350, tier: 2, importance: 'medium', type: 'waterfall' },
    { name: 'Apo Island', desc: 'Остров Апо — морской заповедник, лучший снорклинг Висайев', lat: 9.0720, lng: 123.2700, tier: 2, importance: 'medium', type: 'marine' },
    { name: 'Manjuyod Sandbar', desc: 'Песчаная коса Манхуйод — «Мальдивы Филиппин»', lat: 9.4960, lng: 123.1580, tier: 2, importance: 'medium', type: 'island' },
    { name: 'Cambugahay Falls', desc: 'Водопад Камбугахай — трёхуровневый бирюзовый водопад на Сикихоре', lat: 9.1870, lng: 123.5150, tier: 2, importance: 'medium', type: 'waterfall' },
    { name: 'Salagdoong Beach', desc: 'Пляж Салагдоонг — прыжки с утёсов в кристальную воду', lat: 9.2280, lng: 123.5750, tier: 2, importance: 'medium', type: 'island' },
    { name: 'Old Enchanted Balete Tree', desc: 'Заколдованное дерево баньян — 400-летний гигант с рыбным спа', lat: 9.2070, lng: 123.5680, tier: 2, importance: 'medium', type: 'nature' },

    // --- Western Visayas ---
    { name: 'Miagao Church', desc: 'Церковь Миагао — барочная крепость-церковь XVIII века, ЮНЕСКО', lat: 10.6440, lng: 122.2330, tier: 2, importance: 'medium', type: 'church' },
    { name: 'The Ruins Talisay', desc: 'Руины Талисай — «филиппинский Тадж-Махал», особняк начала XX века', lat: 10.7380, lng: 122.9650, tier: 2, importance: 'medium', type: 'historic' },
    { name: 'Mt. Kanlaon', desc: 'Вулкан Канлаон — высочайшая вершина Висайев (2465 м)', lat: 10.4120, lng: 123.1320, tier: 2, importance: 'medium', type: 'volcano' },
    { name: 'Islas de Gigantes', desc: 'Острова Гигантов — нетронутые пляжи, лагуны и свежие морепродукты', lat: 11.0580, lng: 123.1850, tier: 2, importance: 'medium', type: 'island' },
    { name: 'Guimaras Island', desc: 'Гимарас — остров лучших манго в мире и монастырь траппистов', lat: 10.5900, lng: 122.6000, tier: 2, importance: 'medium', type: 'island' },

    // --- Eastern Visayas ---
    { name: 'Sohoton Cove', desc: 'Бухта Сохотон — скрытая лагуна с медузами, пещеры и скалы', lat: 11.8500, lng: 124.9800, tier: 2, importance: 'medium', type: 'marine' },
    { name: 'San Juanico Bridge', desc: 'Мост Сан-Хуанико — самый длинный мост Филиппин (2.16 км)', lat: 11.2870, lng: 124.9500, tier: 2, importance: 'medium', type: 'landmark' },
    { name: 'Kalanggaman Island', desc: 'Остров Каланггаман — длинная песчаная коса, один из красивейших островов', lat: 11.2400, lng: 124.3200, tier: 2, importance: 'medium', type: 'island' },

    // --- Siargao ---
    { name: 'Sugba Lagoon', desc: 'Лагуна Сугба — изумрудная лагуна для каякинга и SUP', lat: 9.9500, lng: 126.0600, tier: 2, importance: 'medium', type: 'marine' },
    { name: 'Magpupungko Rock Pools', desc: 'Каменные бассейны Магпупунгко — природные бассейны при отливе', lat: 9.7400, lng: 126.1600, tier: 2, importance: 'medium', type: 'nature' },
    { name: 'Sohoton Cove Siargao', desc: 'Бухта Сохотон — лагуна с пещерами и нетронутыми мангровыми лесами', lat: 10.0200, lng: 125.9800, tier: 2, importance: 'medium', type: 'marine' },

    // --- Camiguin ---
    { name: 'Sunken Cemetery Camiguin', desc: 'Затонувшее кладбище — крест в море, памятник извержению 1871 года', lat: 9.1630, lng: 124.6750, tier: 2, importance: 'medium', type: 'historic' },
    { name: 'Katibawasan Falls', desc: 'Водопад Катибавасан — 76-метровый водопад в тропическом лесу', lat: 9.1900, lng: 124.7700, tier: 2, importance: 'medium', type: 'waterfall' },
    { name: 'Ardent Hot Springs', desc: 'Горячие источники Ардент — природные термальные бассейны у вулкана', lat: 9.2050, lng: 124.7200, tier: 2, importance: 'medium', type: 'hotspring' },

    // --- Mindanao ---
    { name: 'Tinuy-an Falls', desc: 'Водопад Тинуй-ан — «Ниагара Филиппин», широчайший водопад страны', lat: 8.6300, lng: 126.2400, tier: 2, importance: 'medium', type: 'waterfall' },
    { name: 'Dahilayan Adventure Park', desc: 'Парк Дахилаян — самый длинный зиплайн в Азии (840 м)', lat: 8.3500, lng: 124.5600, tier: 2, importance: 'medium', type: 'adventure' },
    { name: 'Lake Sebu', desc: 'Озеро Себу — священное озеро т\'боли, семь водопадов', lat: 6.2100, lng: 124.7200, tier: 2, importance: 'medium', type: 'nature' },
    { name: 'Samal Island', desc: 'Остров Самал — курортный остров с пещерами и пляжами возле Давао', lat: 7.0900, lng: 125.7100, tier: 2, importance: 'medium', type: 'island' },
    { name: 'Eden Nature Park', desc: 'Парк Эден — горный парк с зиплайном и рыбалкой над Давао', lat: 7.1550, lng: 125.4780, tier: 2, importance: 'medium', type: 'park' },
    { name: 'Siargao Coconut Road', desc: 'Кокосовая дорога — аллея пальм, самая инстаграмная дорога', lat: 9.8700, lng: 126.0500, tier: 2, importance: 'medium', type: 'nature' },

    // --- Zambales / La Union ---
    { name: 'Anawangin Cove', desc: 'Бухта Анаванжин — уединённая бухта с соснами на белом песке', lat: 14.8900, lng: 120.1400, tier: 2, importance: 'medium', type: 'island' },
    { name: 'San Juan Surf Beach', desc: 'Сёрф-пляж Сан-Хуан — столица сёрфинга Северного Лусона', lat: 16.6282, lng: 120.3587, tier: 2, importance: 'medium', type: 'adventure' },

    // ═══════════════════════════════════════════
    // TIER 3 — Локальные (zoom 12+)
    // ═══════════════════════════════════════════

    // --- North Luzon / Cordillera ---
    { name: 'Bomod-ok Falls', desc: 'Водопад Бомод-ок — самый большой водопад Сагады, хайк через рисовые поля', lat: 17.1000, lng: 121.0400, tier: 3, importance: 'small', type: 'waterfall' },
    { name: 'Lake Danum Sagada', desc: 'Озеро Данум — священное горное озеро на вершине', lat: 17.0770, lng: 121.0680, tier: 3, importance: 'small', type: 'nature' },
    { name: 'BenCab Museum', desc: 'Музей БенКаб — коллекция национального художника Бенедикто Кабрера', lat: 16.3930, lng: 120.5650, tier: 3, importance: 'small', type: 'museum' },
    { name: 'Camp John Hay', desc: 'Кэмп Джон Хэй — бывшая американская база, парк и сосновый лес', lat: 16.3870, lng: 120.6050, tier: 3, importance: 'small', type: 'park' },
    { name: 'Strawberry Farm La Trinidad', desc: 'Клубничная ферма — собери клубнику своими руками', lat: 16.4580, lng: 120.5870, tier: 3, importance: 'small', type: 'park' },
    { name: 'Marlboro Hills Batanes', desc: 'Холмы Мальборо — зелёные холмы Батанеса с видом на океан', lat: 20.4270, lng: 121.9670, tier: 3, importance: 'small', type: 'viewpoint' },
    { name: 'Valugan Boulder Beach', desc: 'Каменный пляж Валуган — огромные валуны, выброшенные тайфунами', lat: 20.4530, lng: 121.9850, tier: 3, importance: 'small', type: 'nature' },
    { name: 'Batanes Lighthouse', desc: 'Маяк Накануан — живописный маяк на самом северном острове', lat: 20.4550, lng: 121.9680, tier: 3, importance: 'small', type: 'landmark' },

    // --- Central Luzon ---
    { name: 'Mt. Samat Shrine', desc: 'Мемориал горы Самат — крест-памятник героям Батаана', lat: 14.6250, lng: 120.4780, tier: 3, importance: 'small', type: 'monument' },
    { name: 'Nayong Pilipino Clark', desc: 'Наёнг Пилипино — тематический парк культуры Филиппин', lat: 15.1900, lng: 120.5530, tier: 3, importance: 'small', type: 'park' },
    { name: 'Puning Hot Spring', desc: 'Горячие источники Пунинг — термальные ванны на склоне Пинатубо', lat: 15.1200, lng: 120.4200, tier: 3, importance: 'small', type: 'hotspring' },

    // --- Metro Manila area ---
    { name: 'Ayala Triangle Gardens', desc: 'Сады Аяла — зелёный оазис в деловом центре Макати', lat: 14.5567, lng: 121.0244, tier: 3, importance: 'small', type: 'park' },
    { name: 'Pinto Art Museum', desc: 'Музей Пинто — галерея современного искусства в белых зданиях', lat: 14.5880, lng: 121.1580, tier: 3, importance: 'small', type: 'museum' },
    { name: 'Las Casas Filipinas', desc: 'Лас-Касас — реконструкция испанского колониального поселения', lat: 14.5150, lng: 120.3230, tier: 3, importance: 'small', type: 'historic' },
    { name: 'Corregidor Island', desc: 'Остров Коррехидор — мемориал Второй мировой, руины крепости', lat: 14.3830, lng: 120.5710, tier: 3, importance: 'small', type: 'historic' },
    { name: 'Antipolo Cathedral', desc: 'Кафедральный собор Антиполо — главное место паломничества', lat: 14.5860, lng: 121.1760, tier: 3, importance: 'small', type: 'church' },

    // --- Batangas / Laguna ---
    { name: 'Taal Heritage Town', desc: 'Город Таал — колониальные дома, самая большая церковь Азии', lat: 13.8790, lng: 120.9260, tier: 3, importance: 'small', type: 'historic' },
    { name: 'Mt. Maculot', desc: 'Гора Макулот — хайк с видом на озеро и вулкан Таал', lat: 13.8530, lng: 121.0150, tier: 3, importance: 'small', type: 'mountain' },
    { name: 'Hulugan Falls', desc: 'Водопад Хулуган — 60-метровый водопад в Лагуне', lat: 14.3060, lng: 121.4680, tier: 3, importance: 'small', type: 'waterfall' },
    { name: 'Enchanted Kingdom', desc: 'Волшебное Королевство — главный парк аттракционов Филиппин', lat: 14.2710, lng: 121.0770, tier: 3, importance: 'small', type: 'park' },
    { name: 'Hot Spring Resort Pablo', desc: 'Горячие источники Лос-Баньос — термальные бассейны у горы Макилинг', lat: 14.1720, lng: 121.2250, tier: 3, importance: 'small', type: 'hotspring' },

    // --- Bicol ---
    { name: 'Bulusan Volcano Lake', desc: 'Озеро вулкана Булусан — горное озеро в кратере', lat: 12.7700, lng: 124.0560, tier: 3, importance: 'small', type: 'volcano' },
    { name: 'Misibis Bay', desc: 'Мисибис Бэй — премиальный курорт с видом на Майон', lat: 13.1700, lng: 124.0700, tier: 3, importance: 'small', type: 'island' },
    { name: 'Hoyop-Hoyopan Cave', desc: 'Пещера Хоёп-Хоёпан — археологическая пещера с доисторическими артефактами', lat: 13.1450, lng: 123.7700, tier: 3, importance: 'small', type: 'cave' },

    // --- Palawan ---
    { name: 'Nagtabon Beach', desc: 'Пляж Нагтабон — уединённый пляж для сёрфинга недалеко от города', lat: 9.7900, lng: 118.6800, tier: 3, importance: 'small', type: 'island' },
    { name: 'Iwahig Firefly Watching', desc: 'Светлячки Ивахиг — ночная прогулка на лодке среди мангровых', lat: 9.7180, lng: 118.7050, tier: 3, importance: 'small', type: 'nature' },
    { name: 'Baker\'s Hill', desc: 'Холм Бейкера — парк с садами, смотровыми и свежей выпечкой', lat: 9.7450, lng: 118.7150, tier: 3, importance: 'small', type: 'park' },
    { name: 'Sabang Mangrove Paddle', desc: 'Мангровый каякинг Сабанг — прогулка через мангровый лес', lat: 10.1650, lng: 118.9120, tier: 3, importance: 'small', type: 'nature' },
    { name: 'Matinloc Shrine', desc: 'Храм Матинлок — заброшенный храм на скале посреди моря', lat: 11.1250, lng: 119.3350, tier: 3, importance: 'small', type: 'historic' },
    { name: 'Helicopter Island', desc: 'Остров-вертолёт — скала в форме вертолёта, снорклинг', lat: 11.2050, lng: 119.3500, tier: 3, importance: 'small', type: 'island' },
    { name: 'Pass Island Coron', desc: 'Остров Пасс — маленький двуцветный остров с пляжем', lat: 11.9300, lng: 120.2700, tier: 3, importance: 'small', type: 'island' },
    { name: 'Malcapuya Island', desc: 'Остров Малкапуя — белоснежный необитаемый остров', lat: 11.9200, lng: 120.2900, tier: 3, importance: 'small', type: 'island' },

    // --- Cebu ---
    { name: 'Cebu Taoist Temple', desc: 'Даосский храм — цветной китайский храм на холме Беверли-Хиллс', lat: 10.3370, lng: 123.8820, tier: 3, importance: 'small', type: 'church' },
    { name: 'Sirao Flower Garden', desc: 'Цветочный сад Сирао — террасы цветов, «маленький Амстердам»', lat: 10.3680, lng: 123.8320, tier: 3, importance: 'small', type: 'park' },
    { name: '10000 Roses Cordova', desc: '10 000 Роз — инсталляция LED-роз на воде в Кордове', lat: 10.2580, lng: 123.9520, tier: 3, importance: 'small', type: 'landmark' },
    { name: 'Yap Sandiego Ancestral House', desc: 'Дом Яп-Сандиего — старейший жилой дом на Филиппинах (1675)', lat: 10.2930, lng: 123.9010, tier: 3, importance: 'small', type: 'historic' },
    { name: 'Carbon Market', desc: 'Рынок Карбон — старейший и крупнейший публичный рынок Себу', lat: 10.2910, lng: 123.8990, tier: 3, importance: 'small', type: 'historic' },
    { name: 'Aguinid Falls', desc: 'Водопад Агинид — многоуровневый каньонинг-водопад в Самботоане', lat: 9.8420, lng: 123.3650, tier: 3, importance: 'small', type: 'waterfall' },
    { name: 'Mantayupan Falls', desc: 'Водопад Мантаюпан — двойной водопад (98 м) в Барили', lat: 9.9150, lng: 123.5050, tier: 3, importance: 'small', type: 'waterfall' },
    { name: 'Dao Falls', desc: 'Водопад Дао — скрытый водопад-занавес в Самботоане', lat: 9.8350, lng: 123.3600, tier: 3, importance: 'small', type: 'waterfall' },
    { name: 'Bantayan Island Church', desc: 'Церковь Бантаяна — одна из старейших церквей Филиппин (1580)', lat: 11.1680, lng: 123.7270, tier: 3, importance: 'small', type: 'church' },
    { name: 'Malapascua Lighthouse', desc: 'Маяк Малапаскуа — старый маяк с панорамным видом', lat: 11.3290, lng: 124.1120, tier: 3, importance: 'small', type: 'landmark' },

    // --- Bohol ---
    { name: 'Bohol Bee Farm', desc: 'Пчелиная ферма Бохол — органическое хозяйство и ресторан у обрыва', lat: 9.5860, lng: 123.7530, tier: 3, importance: 'small', type: 'park' },
    { name: 'Blood Compact Shrine', desc: 'Монумент Кровного договора — памятник дружбе Легаспи и Сикатуны', lat: 9.6340, lng: 123.8750, tier: 3, importance: 'small', type: 'monument' },
    { name: 'Baclayon Church', desc: 'Церковь Баклайон — вторая старейшая каменная церковь (1596)', lat: 9.6230, lng: 123.8870, tier: 3, importance: 'small', type: 'church' },
    { name: 'Man-Made Forest Bohol', desc: 'Рукотворный лес — аллея красного дерева в два ряда', lat: 9.7240, lng: 124.0200, tier: 3, importance: 'small', type: 'nature' },
    { name: 'Dimiao Twin Falls', desc: 'Двойной водопад Димиао — два потока в тропическом лесу', lat: 9.5860, lng: 124.0650, tier: 3, importance: 'small', type: 'waterfall' },
    { name: 'Anda Quinale Beach', desc: 'Пляж Кинале — тихий белый пляж на восточном побережье Бохола', lat: 9.7350, lng: 124.2850, tier: 3, importance: 'small', type: 'island' },
    { name: 'Cabagnow Cave Pool', desc: 'Пещерный бассейн Кабагноу — подземный бассейн с голубой водой', lat: 9.7410, lng: 124.2730, tier: 3, importance: 'small', type: 'cave' },

    // --- Negros ---
    { name: 'Pulang Bato Falls', desc: 'Красный водопад — водопад среди красных вулканических скал', lat: 9.2750, lng: 123.2480, tier: 3, importance: 'small', type: 'waterfall' },
    { name: 'Mag-aso Falls', desc: 'Водопад Маг-асо — живописный двойной водопад с бассейном', lat: 9.6670, lng: 123.8890, tier: 3, importance: 'small', type: 'waterfall' },
    { name: 'Silay Heritage Houses', desc: 'Дома-наследие Силая — «Париж Негроса», колониальные особняки', lat: 10.8120, lng: 122.9700, tier: 3, importance: 'small', type: 'historic' },
    { name: 'Danjugan Island', desc: 'Остров Данхуган — морской заповедник, экотуризм и дайвинг', lat: 9.0780, lng: 122.5730, tier: 3, importance: 'small', type: 'marine' },

    // --- Siquijor ---
    { name: 'Paliton Beach Siquijor', desc: 'Пляж Палитон — закатный пляж с пальмами', lat: 9.1850, lng: 123.4680, tier: 3, importance: 'small', type: 'island' },
    { name: 'Cantabon Cave', desc: 'Пещера Кантабон — спелео-тур через подземную реку', lat: 9.2150, lng: 123.5300, tier: 3, importance: 'small', type: 'cave' },
    { name: 'San Isidro Labrador Church', desc: 'Церковь Ларена — старейшая на Сикихоре, конвент-крепость', lat: 9.2370, lng: 123.5780, tier: 3, importance: 'small', type: 'church' },

    // --- Western Visayas ---
    { name: 'Jaro Cathedral', desc: 'Кафедральный собор Харо — единственная базилика западных Висайев', lat: 10.7200, lng: 122.5640, tier: 3, importance: 'small', type: 'church' },
    { name: 'Molo Church', desc: 'Церковь Моло — готическая коралловая церковь XIX века', lat: 10.6940, lng: 122.5480, tier: 3, importance: 'small', type: 'church' },
    { name: 'Kawa Hot Bath Tibiao', desc: 'Купание в котле — горячая ванна в огромном чугунном котле в Тибиао', lat: 11.2800, lng: 122.0500, tier: 3, importance: 'small', type: 'hotspring' },
    { name: 'Bugang River Eco Trail', desc: 'Экотрейл Буганг — каякинг и хайкинг вдоль реки', lat: 11.3000, lng: 122.0300, tier: 3, importance: 'small', type: 'adventure' },
    { name: 'Puka Beach Boracay', desc: 'Пука-бич — дикий пляж на северной оконечности Боракая', lat: 11.9830, lng: 121.9250, tier: 3, importance: 'small', type: 'island' },
    { name: 'Crystal Cove Boracay', desc: 'Кристальная бухта — маленький остров с двумя пещерами', lat: 11.9560, lng: 121.9100, tier: 3, importance: 'small', type: 'island' },
    { name: 'Ariel\'s Point Boracay', desc: 'Мыс Ариэля — клифф-дайвинг с высоты 3-15 метров', lat: 11.9200, lng: 121.8650, tier: 3, importance: 'small', type: 'adventure' },

    // --- Eastern Visayas ---
    { name: 'Leyte Landing Memorial', desc: 'Мемориал высадки Лейте — памятник возвращению Макартура в 1944', lat: 11.1750, lng: 125.0270, tier: 3, importance: 'small', type: 'monument' },
    { name: 'Lake Danao Leyte', desc: 'Озеро Данао — скрипкообразное горное озеро', lat: 11.1800, lng: 124.7000, tier: 3, importance: 'small', type: 'nature' },
    { name: 'Biri Rock Formations', desc: 'Скалы Бири — гигантские скальные образования от океанских волн', lat: 12.6700, lng: 124.6200, tier: 3, importance: 'small', type: 'nature' },

    // --- Siargao ---
    { name: 'Daku Island', desc: 'Остров Даку — большой остров с пляжем и кокосовыми пальмами', lat: 9.8400, lng: 126.0900, tier: 3, importance: 'small', type: 'island' },
    { name: 'Guyam Island', desc: 'Остров Гуям — крохотный круглый остров с одной пальмой', lat: 9.8300, lng: 126.1200, tier: 3, importance: 'small', type: 'island' },
    { name: 'Naked Island', desc: 'Голый остров — песчаная коса без единого дерева', lat: 9.8350, lng: 126.1100, tier: 3, importance: 'small', type: 'island' },
    { name: 'Tayangban Cave Pool', desc: 'Пещерный бассейн Таянгбан — плавание в подземной реке', lat: 9.8600, lng: 126.0400, tier: 3, importance: 'small', type: 'cave' },
    { name: 'Pacifico Beach', desc: 'Пляж Пасифико — уединённый серф-спот на севере Сиаргао', lat: 9.9500, lng: 126.1400, tier: 3, importance: 'small', type: 'adventure' },

    // --- Camiguin ---
    { name: 'Mantigue Island', desc: 'Остров Мантиге — маленький остров с белым пляжем и снорклингом', lat: 9.1400, lng: 124.8100, tier: 3, importance: 'small', type: 'island' },
    { name: 'Sto. Niño Cold Spring', desc: 'Холодный источник Санто-Ниньо — природный бассейн с ледяной водой', lat: 9.1850, lng: 124.7500, tier: 3, importance: 'small', type: 'hotspring' },
    { name: 'Old Volcano Trail Camiguin', desc: 'Тропа Старого Вулкана — хайк через руины к кратеру', lat: 9.2050, lng: 124.6900, tier: 3, importance: 'small', type: 'mountain' },

    // --- Mindanao ---
    { name: 'Crocodile Park Davao', desc: 'Крокодиловый парк — зоопарк с крокодилами, орлами и бабочками', lat: 7.0510, lng: 125.5570, tier: 3, importance: 'small', type: 'park' },
    { name: 'Jack\'s Ridge Davao', desc: 'Холм Джека — ресторан-смотровая с видом на город и залив', lat: 7.0780, lng: 125.5850, tier: 3, importance: 'small', type: 'viewpoint' },
    { name: 'People\'s Park Davao', desc: 'Народный парк — городской парк со скульптурами племён', lat: 7.0680, lng: 125.6100, tier: 3, importance: 'small', type: 'park' },
    { name: 'Monfort Bat Sanctuary', desc: 'Пещера летучих мышей — 1.8 млн мышей, мировой рекорд', lat: 7.0850, lng: 125.7600, tier: 3, importance: 'small', type: 'cave' },
    { name: 'Hagimit Falls Samal', desc: 'Водопад Хагимит — каскадный водопад на острове Самал', lat: 7.0600, lng: 125.7300, tier: 3, importance: 'small', type: 'waterfall' },
    { name: 'Asik-Asik Falls', desc: 'Водопад Асик-Асик — стена воды, стекающая из скалы', lat: 7.3100, lng: 124.6800, tier: 3, importance: 'small', type: 'waterfall' },
    { name: 'Mapawa Nature Park', desc: 'Парк Мапава — каньонинг и зиплайн у Кагаян-де-Оро', lat: 8.4950, lng: 124.5800, tier: 3, importance: 'small', type: 'adventure' },
    { name: 'Macahambus Cave', desc: 'Пещера Макахамбус — историческая пещера, битва с американцами 1900', lat: 8.4650, lng: 124.6500, tier: 3, importance: 'small', type: 'cave' },
    { name: 'Seven Falls Lake Sebu', desc: 'Семь водопадов — зиплайн над каскадом водопадов', lat: 6.1950, lng: 124.7300, tier: 3, importance: 'small', type: 'waterfall' },
    { name: 'T\'nalak Weaving Center', desc: 'Центр ткачества — традиционное ткачество народа т\'боли', lat: 6.2000, lng: 124.7150, tier: 3, importance: 'small', type: 'historic' },
    { name: 'General Santos Fish Port', desc: 'Рыбный порт — крупнейший тунцовый порт, «столица тунца»', lat: 6.0900, lng: 125.1600, tier: 3, importance: 'small', type: 'landmark' },
    { name: 'Mt. Hamiguitan', desc: 'Гора Хамигуитан — карликовый лес, наследие ЮНЕСКО', lat: 6.7200, lng: 126.1700, tier: 3, importance: 'small', type: 'mountain' },

    // --- Zambales / Bataan ---
    { name: 'Nagsasa Cove', desc: 'Бухта Нагсаса — дикий пляж с лавовыми формациями', lat: 14.8700, lng: 120.1200, tier: 3, importance: 'small', type: 'island' },
    { name: 'Talisayen Cove', desc: 'Бухта Талисаен — уединённая бухта между Нагсаса и Анаванжин', lat: 14.8800, lng: 120.1300, tier: 3, importance: 'small', type: 'island' },
    { name: 'Capones Island', desc: 'Остров Капонес — заброшенный маяк и белый пляж', lat: 14.9380, lng: 120.0700, tier: 3, importance: 'small', type: 'island' },

    // --- La Union / Pangasinan ---
    { name: 'Tangadan Falls', desc: 'Водопад Тангадан — двойной водопад с клифф-дайвингом', lat: 16.5800, lng: 120.3900, tier: 3, importance: 'small', type: 'waterfall' },
    { name: 'Poro Point Lighthouse', desc: 'Маяк Поро Поинт — маяк на утёсе с видом на Южно-Китайское море', lat: 16.6350, lng: 120.3100, tier: 3, importance: 'small', type: 'landmark' },
    { name: 'Minor Basilica Manaoag', desc: 'Базилика Манаоаг — главное место паломничества в Пангасинане', lat: 16.0420, lng: 120.4870, tier: 3, importance: 'small', type: 'church' },

    // --- Bukidnon / CDO ---
    { name: 'Del Monte Pineapple Plantation', desc: 'Плантация Дель Монте — огромная ананасная плантация с туром', lat: 8.2500, lng: 124.5300, tier: 3, importance: 'small', type: 'park' },
    { name: 'Lake Apo Bukidnon', desc: 'Озеро Апо — горное озеро с палаточным кемпингом', lat: 7.8700, lng: 125.0300, tier: 3, importance: 'small', type: 'nature' },

    // --- Zamboanga ---
    { name: 'Fort Pilar Zamboanga', desc: 'Форт Пилар — испанский форт XVII века, святыня Богородицы', lat: 6.9050, lng: 122.0730, tier: 3, importance: 'small', type: 'historic' },
    { name: 'Great Santa Cruz Island', desc: 'Остров Санта-Крус — розовый пляж из измельчённых кораллов', lat: 6.8600, lng: 122.0300, tier: 3, importance: 'small', type: 'island' },
    { name: 'Merloquet Falls', desc: 'Водопад Мерлокет — широкий водопад-занавес в Замбоанге', lat: 7.1200, lng: 122.1800, tier: 3, importance: 'small', type: 'waterfall' },
];
