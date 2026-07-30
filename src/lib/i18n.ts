// Multi-Language System — ALYAZOURI 2026
export type Lang = "ar" | "en" | "tr" | "ru" | "es";

export const LANGUAGES: { id: Lang; name: string; flag: string; dir: "rtl" | "ltr" }[] = [
  { id: "ar", name: "العربية", flag: "🇯🇴", dir: "rtl" },
  { id: "en", name: "English", flag: "🇬🇧", dir: "ltr" },
  { id: "tr", name: "Türkçe", flag: "🇹🇷", dir: "ltr" },
  { id: "ru", name: "Русский", flag: "🇷🇺", dir: "ltr" },
  { id: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
];

export const translations = {
  // ============ NAVBAR ============
  nav_generator: { ar: "المولد", en: "Generator", tr: "Üreteç", ru: "Генератор", es: "Generador" },
  nav_ping: { ar: "البنق", en: "Ping", tr: "Ping", ru: "Пинг", es: "Ping" },
  nav_weapons: { ar: "الأسلحة", en: "Weapons", tr: "Silahlar", ru: "Оружие", es: "Armas" },
  nav_pac: { ar: "PAC", en: "PAC", tr: "PAC", ru: "PAC", es: "PAC" },
  nav_about: { ar: "حول", en: "About", tr: "Hakkında", ru: "О нас", es: "Acerca" },
  nav_cta: { ar: "🎯 اصنع الآن", en: "🎯 Generate Now", tr: "🎯 Şimdi Oluştur", ru: "🎯 Создать", es: "🎯 Generar" },
  nav_language: { ar: "اللغة", en: "Language", tr: "Dil", ru: "Язык", es: "Idioma" },

  // ============ HERO ============
  hero_badge: { ar: "ALYAZOURI AI ENGINE 2026", en: "ALYAZOURI AI ENGINE 2026", tr: "ALYAZOURI AI ENGINE 2026", ru: "ALYAZOURI AI ENGINE 2026", es: "ALYAZOURI AI ENGINE 2026" },
  hero_title1: { ar: "محسّن الأردن 🇯🇴", en: "Jordan Optimizer 🇯🇴", tr: "Jordan Optimize Edici 🇯🇴", ru: "Оптимизатор Иордании 🇯🇴", es: "Optimizador Jordania 🇯🇴" },
  hero_title2: { ar: "PUBG Mobile", en: "PUBG Mobile", tr: "PUBG Mobile", ru: "PUBG Mobile", es: "PUBG Mobile" },
  hero_desc: {
    ar: "حساسية حقيقية مدعومة بالذكاء الاصطناعي — أقل بنق ممكن، فريق أردني، تجنيد سريع، وتغطية كاملة لـ",
    en: "Real AI-powered sensitivity — lowest ping possible, Jordanian team, fast recruitment, full coverage of",
    tr: "Gerçek AI destekli hassasiyet — en düşük ping, Ürdün ekibi, hızlı eşleştirme, tam kapsama",
    ru: "Реальная чувствительность на базе ИИ — минимальный пинг, иорданская команда, быстрый подбор",
    es: "Sensibilidad real con IA — ping más bajo, equipo jordano, reclutamiento rápido, cobertura total"
  },
  hero_devices: { ar: "77 جهاز", en: "77 devices", tr: "77 cihaz", ru: "77 устройств", es: "77 dispositivos" },
  hero_weapons: { ar: "44 سلاح", en: "44 weapons", tr: "44 silah", ru: "44 оружия", es: "44 armas" },
  hero_stats_devices: { ar: "أجهزة", en: "Devices", tr: "Cihazlar", ru: "Устройства", es: "Dispositivos" },
  hero_stats_weapons: { ar: "أسلحة", en: "Weapons", tr: "Silahlar", ru: "Оружие", es: "Armas" },
  hero_stats_servers: { ar: "سيرفرات", en: "Servers", tr: "Sunucular", ru: "Серверы", es: "Servidores" },
  hero_cta1: { ar: "🎯 اصنع حساسيتك الآن", en: "🎯 Generate Your Sensitivity", tr: "🎯 Hassasiyetini Oluştur", ru: "🎯 Создать чувствительность", es: "🎯 Genera tu sensibilidad" },
  hero_cta2: { ar: "📡 تسريع PAC Script", en: "📡 PAC Script Acceleration", tr: "📡 PAC Script Hızlandırma", ru: "📡 Ускорение PAC", es: "📡 Aceleración PAC" },
  hero_live_status: { ar: "LIVE STATUS", en: "LIVE STATUS", tr: "CANLI DURUM", ru: "СТАТУС", es: "EN VIVO" },
  hero_network: { ar: "📡 حالة الشبكة", en: "📡 Network Status", tr: "📡 Ağ Durumu", ru: "📡 Состояние сети", es: "📡 Estado de red" },
  hero_nearest: { ar: "أقرب سيرفر · 🇯🇴 الأردن", en: "Nearest Server · 🇯🇴 Jordan", tr: "En Yakın · 🇯🇴 Ürdün", ru: "Ближайший · 🇯🇴 Иордания", es: "Más cercano · 🇯🇴 Jordania" },
  hero_connected: { ar: "متصل", en: "Connected", tr: "Bağlı", ru: "Подключено", es: "Conectado" },
  hero_measuring: { ar: "جاري القياس", en: "Measuring", tr: "Ölçülüyor", ru: "Измерение", es: "Midiendo" },
  hero_excellent: { ar: "ممتاز", en: "Excellent", tr: "Mükemmel", ru: "Отлично", es: "Excelente" },
  hero_good: { ar: "جيد", en: "Good", tr: "İyi", ru: "Хорошо", es: "Bueno" },
  hero_medium: { ar: "متوسط", en: "Medium", tr: "Orta", ru: "Средне", es: "Medio" },
  hero_recruitment: { ar: "التجنيد", en: "Recruitment", tr: "Eşleştirme", ru: "Подбор", es: "Reclutamiento" },
  hero_isp: { ar: "مزود الخدمة", en: "ISP", tr: "ISS", ru: "Провайдер", es: "ISP" },
  hero_geolocation: { ar: "الموقع", en: "Location", tr: "Konum", ru: "Локация", es: "Ubicación" },
  hero_devices_sub: { ar: "مدعومة", en: "Supported", tr: "Desteklenen", ru: "Поддерж.", es: "Soportados" },
  hero_weapons_sub: { ar: "بروفايل", en: "Profiles", tr: "Profil", ru: "Профилей", es: "Perfiles" },
  hero_servers_sub: { ar: "عالمي", en: "Global", tr: "Küresel", ru: "Глобальных", es: "Globales" },
  hero_tiktok: { ar: "TikTok:", en: "TikTok:", tr: "TikTok:", ru: "TikTok:", es: "TikTok:" },
  hero_instagram: { ar: "Instagram:", en: "Instagram:", tr: "Instagram:", ru: "Instagram:", es: "Instagram:" },
  hero_pubg_id: { ar: "PUBG ID:", en: "PUBG ID:", tr: "PUBG ID:", ru: "PUBG ID:", es: "PUBG ID:" },
  hero_conqueror_build: { ar: "🏆 بناء الكونكر", en: "🏆 Conqueror Build", tr: "🏆 Conqueror Yapısı", ru: "🏆 Завоеватель", es: "🏆 Build Conquistador" },
  hero_fps_ready: { ar: "⚡ جاهز 120 FPS", en: "⚡ 120 FPS Ready", tr: "⚡ 120 FPS Hazır", ru: "⚡ 120 FPS Готово", es: "⚡ Listo 120 FPS" },

  // ============ SECTIONS ============
  sec_generator_eyebrow: { ar: "AI SENSITIVITY GENERATOR", en: "AI SENSITIVITY GENERATOR", tr: "AI HASSASİYET ÜRETECİ", ru: "ГЕНЕРАТОР ЧУВСТВИТЕЛЬНОСТИ", es: "GENERADOR DE SENSIBILIDAD" },
  sec_generator_title: { ar: "🎯 مولد الحساسية الاحترافي", en: "🎯 Professional Sensitivity Generator", tr: "🎯 Profesyonel Hassasiyet Üreteci", ru: "🎯 Профессиональный генератор", es: "🎯 Generador profesional" },
  sec_generator_sub: {
    ar: "اختر جهازك، عدد أصابعك، أسلوبك، وسلاحك — ستحصل على حساسية دقيقة مبنية على معادلات رياضية حقيقية.",
    en: "Choose your device, fingers, style, and weapon — get precise sensitivity based on real math equations.",
    tr: "Cihazını, parmak sayını, stilini ve silahını seç — gerçek matematik denklemlerine dayalı hassasiyet al.",
    ru: "Выберите устройство, пальцы, стиль и оружие — получите точную чувствительность.",
    es: "Elige tu dispositivo, dedos, estilo y arma — obtén sensibilidad precisa."
  },

  // ============ DEVICE ============
  device_select: { ar: "📱 اختر جهازك", en: "📱 Choose your device", tr: "📱 Cihazını seç", ru: "📱 Выберите устройство", es: "📱 Elige tu dispositivo" },
  device_selected: { ar: "المحدد: ", en: "Selected: ", tr: "Seçili: ", ru: "Выбрано: ", es: "Seleccionado: " },
  device_gyro_excellent: { ar: "جايرو: ممتاز", en: "Gyro: Excellent", tr: "Jiroskop: Mükemmel", ru: "Гиро: Отлично", es: "Giro: Excelente" },
  device_gyro_good: { ar: "جايرو: جيد", en: "Gyro: Good", tr: "Jiroskop: İyi", ru: "Гиро: Хорошо", es: "Giro: Bueno" },
  device_gyro_average: { ar: "جايرو: متوسط", en: "Gyro: Average", tr: "Jiroskop: Orta", ru: "Гиро: Средне", es: "Giro: Promedio" },

  // ============ FINGERS ============
  fingers_title: { ar: "🖐️ عدد الأصابع", en: "🖐️ Finger Count", tr: "🖐️ Parmak Sayısı", ru: "🖐️ Количество пальцев", es: "🖐️ Cantidad de dedos" },
  fingers_suffix: { ar: "أصابع", en: "fingers", tr: "parmak", ru: "пальцев", es: "dedos" },

  // ============ STYLE ============
  style_title: { ar: "🎮 أسلوب اللعب", en: "🎮 Play Style", tr: "🎮 Oyun Stili", ru: "🎮 Стиль игры", es: "🎮 Estilo de juego" },
  style_headshot: { ar: "هيدشوت", en: "Headshot", tr: "Headshot", ru: "Хедшот", es: "Headshot" },
  style_spray: { ar: "سبراي", en: "Spray", tr: "Spray", ru: "Спрей", es: "Spray" },
  style_competitive: { ar: "تنافسي", en: "Competitive", tr: "Rekabetçi", ru: "Соревн.", es: "Competitivo" },
  style_close: { ar: "قريب المدى", en: "Close Range", tr: "Yakın Mesafe", ru: "Ближний бой", es: "Corto alcance" },
  style_reflex: { ar: "ردود فعل", en: "Reflex", tr: "Refleks", ru: "Реакция", es: "Reflejo" },
  style_conqueror: { ar: "كونكر", en: "Conqueror", tr: "Conqueror", ru: "Завоеватель", es: "Conquistador" },

  // ============ GYRO ============
  gyro_title: { ar: "🔄 وضع الجيروسكوب", en: "🔄 Gyroscope Mode", tr: "🔄 Jiroskop Modu", ru: "🔄 Режим гироскопа", es: "🔄 Modo giroscopio" },
  gyro_off: { ar: "OFF", en: "OFF", tr: "KAPALI", ru: "ВЫКЛ", es: "APAGADO" },
  gyro_off_desc: { ar: "جايرو معطل", en: "Gyro disabled", tr: "Jiroskop kapalı", ru: "Гироскоп выкл.", es: "Giro desactivado" },
  gyro_scope: { ar: "Scope On", en: "Scope On", tr: "Dürbün Açık", ru: "С прицелом", es: "Con mira" },
  gyro_scope_desc: { ar: "فقط مع السكوب", en: "Only with scope", tr: "Sadece dürbünle", ru: "Только с прицелом", es: "Solo con mira" },
  gyro_always: { ar: "Always On", en: "Always On", tr: "Her Zaman", ru: "Всегда", es: "Siempre" },
  gyro_always_desc: { ar: "دائماً مفعّل", en: "Always active", tr: "Her zaman aktif", ru: "Всегда активен", es: "Siempre activo" },
  gyro_status_off: { ar: "معطل", en: "Disabled", tr: "Devre dışı", ru: "Отключен", es: "Desactivado" },
  gyro_status_scope: { ar: "مع السكوب", en: "With Scope", tr: "Dürbünle", ru: "С прицелом", es: "Con mira" },
  gyro_status_always: { ar: "دائماً", en: "Always", tr: "Her Zaman", ru: "Всегда", es: "Siempre" },
  gyro_msg_off: { ar: "🔕 الجايرو معطل — استخدم حساسية اللمس فقط.", en: "🔕 Gyro disabled — use touch sensitivity only.", tr: "🔕 Jiroskop kapalı — sadece dokunmatik hassasiyet kullanın.", ru: "🔕 Гироскоп выключен — используйте только касание.", es: "🔕 Giro apagado — usa solo sensibilidad táctil." },
  gyro_msg_scope: {
    ar: "🎯 الجايرو يعمل فقط عند فتح السكوب — الخيار الأفضل للتحكم في الارتداد بعيد المدى.",
    en: "🎯 Gyro works only when scoping — best for long-range recoil control.",
    tr: "🎯 Jiroskop sadece dürbünle çalışır — uzun mesafe geri tepme kontrolü için en iyisi.",
    ru: "🎯 Гиро работает только с прицелом — лучший контроль отдачи на дистанции.",
    es: "🎯 Giro solo al apuntar — mejor para control de retroceso a distancia."
  },
  gyro_msg_always: {
    ar: "🔄 الجايرو يعمل دائماً — الخيار الأفضل للهيدشوت والمواجهات القريبة.",
    en: "🔄 Gyro always active — best for headshots and close combat.",
    tr: "🔄 Jiroskop her zaman aktif — headshot ve yakın çatışma için en iyisi.",
    ru: "🔄 Гиро всегда активен — лучший для хедшотов и ближнего боя.",
    es: "🔄 Giro siempre activo — mejor para headshots y combate cercano."
  },
  gyro_disabled_title: { ar: "الجايرو معطل", en: "Gyro Disabled", tr: "Jiroskop Kapalı", ru: "Гиро выключен", es: "Giro desactivado" },
  gyro_disabled_msg: { ar: "فعّل الجايرو من الأعلى لرؤية الإعدادات", en: "Enable gyro above to see settings", tr: "Ayarları görmek için üstten jiroskop etkinleştirin", ru: "Включите гиро выше для настроек", es: "Activa el giro arriba para ver ajustes" },

  // ============ WEAPON ============
  weapon_title: { ar: "🔫 اختر السلاح", en: "🔫 Choose weapon", tr: "🔫 Silah seç", ru: "🔫 Выберите оружие", es: "🔫 Elige arma" },
  weapon_recoil: { ar: "الارتداد", en: "Recoil", tr: "Geri Tepme", ru: "Отдача", es: "Retroceso" },
  weapon_range: { ar: "المدى", en: "Range", tr: "Menzil", ru: "Дальность", es: "Alcance" },

  // ============ SAVE ============
  save_btn: { ar: "💾 حفظ هذا التشكيل (حتى 5 ملفات)", en: "💾 Save this build (up to 5 profiles)", tr: "💾 Bu yapıyı kaydet (5 profile kadar)", ru: "💾 Сохранить (до 5 профилей)", es: "💾 Guardar (hasta 5 perfiles)" },

  // ============ AI SCORE ============
  ai_score_label: { ar: "AI SCORE", en: "AI SCORE", tr: "AI SKOR", ru: "AI SCORE", es: "PUNTUACIÓN AI" },
  ai_score_title: { ar: "نقاط الذكاء الاصطناعي", en: "AI Score", tr: "AI Puanı", ru: "AI Оценка", es: "Puntuación IA" },
  ai_suffix: { ar: "أصابع", en: "fingers", tr: "parmak", ru: "пальцев", es: "dedos" },

  // ============ SENSITIVITY OUTPUT ============
  sens_camera: { ar: "📷 الكاميرا", en: "📷 Camera", tr: "📷 Kamera", ru: "📷 Камера", es: "📷 Cámara" },
  sens_ads: { ar: "🎯 التصويب", en: "🎯 ADS", tr: "🎯 ADS", ru: "🎯 Прицеливание", es: "🎯 Apuntar" },
  sens_gyro_cam: { ar: "🔄 جايرو الكاميرا", en: "🔄 Gyro Camera", tr: "🔄 Jiroskop Kamera", ru: "🔄 Гиро Камера", es: "🔄 Cámara Giro" },
  sens_gyro_ads: { ar: "🔄 جايرو التصويب", en: "🔄 Gyro ADS", tr: "🔄 Jiroskop ADS", ru: "🔄 Гиро Прицел", es: "🔄 Giro Apuntar" },
  sens_freelook: { ar: "👁️ الحركة الحرة", en: "👁️ Free Look", tr: "👁️ Serbest Bakış", ru: "👁️ Свободный взгляд", es: "👁️ Vista libre" },
  sens_freelook_cam: { ar: "كاميرا", en: "Camera", tr: "Kamera", ru: "Камера", es: "Cámara" },
  sens_freelook_para: { ar: "مظلة", en: "Parachute", tr: "Paraşüt", ru: "Парашют", es: "Paracaídas" },
  sens_freelook_vehicle: { ar: "مركبة", en: "Vehicle", tr: "Araç", ru: "Транспорт", es: "Vehículo" },

  // ============ FACTORS ============
  factors_title: { ar: "⚙️ عوامل الحساب", en: "⚙️ Calculation Factors", tr: "⚙️ Hesaplama Faktörleri", ru: "⚙️ Факторы расчёта", es: "⚙️ Factores de cálculo" },
  factors_device: { ar: "الجهاز", en: "Device", tr: "Cihaz", ru: "Устройство", es: "Dispositivo" },
  factors_finger: { ar: "الأصابع", en: "Fingers", tr: "Parmaklar", ru: "Пальцы", es: "Dedos" },
  factors_style: { ar: "الأسلوب", en: "Style", tr: "Stil", ru: "Стиль", es: "Estilo" },
  factors_weapon: { ar: "السلاح", en: "Weapon", tr: "Silah", ru: "Оружие", es: "Arma" },

  // ============ STABILITY ============
  stability_title: { ar: "📊 تحليل الاستقرارية", en: "📊 Stability Analysis", tr: "📊 Stabilite Analizi", ru: "📊 Анализ стабильности", es: "📊 Análisis de estabilidad" },
  stability_device: { ar: "عامل الجهاز", en: "Device Factor", tr: "Cihaz Faktörü", ru: "Фактор устройства", es: "Factor dispositivo" },
  stability_weapon: { ar: "عامل السلاح", en: "Weapon Factor", tr: "Silah Faktörü", ru: "Фактор оружия", es: "Factor arma" },
  stability_fingers: { ar: "عامل الأصابع", en: "Finger Factor", tr: "Parmak Faktörü", ru: "Фактор пальцев", es: "Factor dedos" },
  stability_style: { ar: "عامل الأسلوب", en: "Style Factor", tr: "Stil Faktörü", ru: "Фактор стиля", es: "Factor estilo" },

  // ============ COPY ============
  copy_btn: { ar: "📋 نسخ الحساسية", en: "📋 Copy Sensitivity", tr: "📋 Hassasiyeti Kopyala", ru: "📋 Копировать", es: "📋 Copiar sensibilidad" },
  copy_success: { ar: "✅ تم النسخ!", en: "✅ Copied!", tr: "✅ Kopyalandı!", ru: "✅ Скопировано!", es: "✅ ¡Copiado!" },

  // ============ HUD ============
  hud_title: { ar: "🎮 معاينة HUD", en: "🎮 HUD Preview", tr: "🎮 HUD Önizleme", ru: "🎮 Превью HUD", es: "🎮 Vista previa HUD" },
  hud_alive: { ar: "على قيد الحياة", en: "Alive", tr: "Hayatta", ru: "Живых", es: "Vivos" },
  hud_kills: { ar: "قتل", en: "Kills", tr: "Öldürme", ru: "Убийств", es: "Muertes" },
  hud_active: { ar: "نشط", en: "Active", tr: "Aktif", ru: "Активен", es: "Activo" },

  // ============ PING MONITOR ============
  ping_live: { ar: "LIVE PING", en: "LIVE PING", tr: "CANLI PING", ru: "ПИНГ В РЕАЛЬНОМ ВРЕМЕНИ", es: "PING EN VIVO" },
  ping_live_title: { ar: "📡 قياس البنق الحي", en: "📡 Live Ping Monitor", tr: "📡 Canlı Ping İzleyici", ru: "📡 Живой мониторинг пинга", es: "📡 Monitor de ping en vivo" },
  ping_live_desc: { ar: "قياس حقيقي للبنق لكل السيرفرات", en: "Real-time ping measurement for all servers", tr: "Tüm sunucular için gerçek zamanlı ping ölçümü", ru: "Измерение пинга в реальном времени для всех серверов", es: "Medición de ping en tiempo real para todos los servidores" },
  ping_btn_measuring: { ar: "جاري القياس...", en: "Measuring...", tr: "Ölçülüyor...", ru: "Измерение...", es: "Midiendo..." },
  ping_btn_remeasure: { ar: "🔄 إعادة القياس", en: "🔄 Remeasure", tr: "🔄 Yeniden Ölç", ru: "🔄 Перемерить", es: "🔄 Remedir" },
  ping_quality_excellent: { ar: "ممتاز", en: "Excellent", tr: "Mükemmel", ru: "Отлично", es: "Excelente" },
  ping_quality_good: { ar: "جيد", en: "Good", tr: "İyi", ru: "Хорошо", es: "Bueno" },
  ping_quality_medium: { ar: "متوسط", en: "Medium", tr: "Orta", ru: "Средне", es: "Medio" },
  ping_quality_poor: { ar: "ضعيف", en: "Poor", tr: "Zayıf", ru: "Плохо", es: "Pobre" },
  ping_best: { ar: "الأفضل", en: "BEST", tr: "EN İYİ", ru: "ЛУЧШИЙ", es: "MEJOR" },
  ping_ping: { ar: "بنق", en: "Ping", tr: "Ping", ru: "Пинг", es: "Ping" },
  ping_jitter: { ar: "جيتر", en: "Jitter", tr: "Jitter", ru: "Джиттер", es: "Jitter" },
  ping_loss: { ar: "فقدان", en: "Loss", tr: "Kayıp", ru: "Потери", es: "Pérdida" },

  // ============ PAC SECTION ============
  pac_eyebrow: { ar: "PAC SCRIPT", en: "PAC SCRIPT", tr: "PAC SCRIPT", ru: "PAC СКРИПТ", es: "PAC SCRIPT" },
  pac_title: { ar: "📡 تسريع سيرفر الأردن", en: "📡 Jordan Server Acceleration", tr: "📡 Ürdün Sunucu Hızlandırma", ru: "📡 Ускорение сервера Иордании", es: "📡 Aceleración servidor Jordania" },
  pac_sub: { ar: "استخدم PAC Script لتوجيه اتصالك لأقرب سيرفر وتقليل البنق", en: "Use PAC Script to route your connection to the nearest server and reduce ping", tr: "PAC Script kullanarak bağlantınızı en yakın sunucuya yönlendirin ve ping azaltın", ru: "Используйте PAC Script для направления соединения на ближайший сервер", es: "Usa PAC Script para enrutar tu conexión al servidor más cercano" },
  pac_status: { ar: "الحالة", en: "Status", tr: "Durum", ru: "Статус", es: "Estado" },
  pac_enabled: { ar: "مفعّل", en: "Enabled", tr: "Etkin", ru: "Включен", es: "Activado" },
  pac_disabled: { ar: "معطل", en: "Disabled", tr: "Devre Dışı", ru: "Отключен", es: "Desactivado" },
  pac_toggle_on: { ar: "ON", en: "ON", tr: "AÇIK", ru: "ВКЛ", es: "ON" },
  pac_toggle_off: { ar: "OFF", en: "OFF", tr: "KAPALI", ru: "ВЫКЛ", es: "OFF" },
  pac_ready: { ar: "جاهز", en: "READY", tr: "HAZIR", ru: "ГОТОВО", es: "LISTO" },
  pac_link_label: { ar: "رابط PAC Script", en: "PAC Script URL", tr: "PAC Script URL", ru: "Ссылка PAC Script", es: "URL PAC Script" },
  pac_copied: { ar: "✅ تم النسخ!", en: "✅ Copied!", tr: "✅ Kopyalandı!", ru: "✅ Скопировано!", es: "✅ ¡Copiado!" },
  pac_copy: { ar: "📋 نسخ الرابط", en: "📋 Copy Link", tr: "📋 Linki Kopyala", ru: "📋 Копировать ссылку", es: "📋 Copiar enlace" },
  pac_open: { ar: "🔗 فتح الرابط", en: "🔗 Open Link", tr: "🔗 Linki Aç", ru: "🔗 Открыть ссылку", es: "🔗 Abrir enlace" },
  pac_install_title: { ar: "تثبيت على ", en: "Install on ", tr: "Kurulum ", ru: "Установка на ", es: "Instalar en " },
  pac_install_sub: { ar: "اتبع الخطوات أدناه", en: "Follow the steps below", tr: "Aşağıdaki adımları izleyin", ru: "Следуйте инструкциям ниже", es: "Sigue los pasos a continuación" },
  pac_tip: { ar: "💡 نصيحة: تأكد من تفعيل الـ PAC قبل فتح اللعبة", en: "💡 Tip: Make sure PAC is enabled before opening the game", tr: "💡 İpucu: Oyunu açmadan önce PAC'ın etkin olduğundan emin olun", ru: "💡 Совет: Убедитесь что PAC включен перед запуском игры", es: "💡 Consejo: Asegúrate de que PAC esté activado antes de abrir el juego" },
  pac_restart_warn: { ar: "⚠️ مهم: أعد تشغيل الجهاز بعد تفعيل الـ PAC للحصول على أفضل النتائج", en: "⚠️ Important: Restart your device after enabling PAC for best results", tr: "⚠️ Önemli: En iyi sonuçlar için PAC'ı etkinleştirdikten sonra cihazınızı yeniden başlatın", ru: "⚠️ Важно: Перезагрузите устройство после включения PAC", es: "⚠️ Importante: Reinicia tu dispositivo después de activar PAC" },
  pac_disabled_title: { ar: "التسريع غير مفعّل", en: "Acceleration Disabled", tr: "Hızlandırma Devre Dışı", ru: "Ускорение отключено", es: "Aceleración desactivada" },
  pac_disabled_msg: { ar: "فعّل التسريع للحصول على أقل بنق ممكن", en: "Enable acceleration to get the lowest ping possible", tr: "En düşük ping için hızlandırmayı etkinleştirin", ru: "Включите ускорение для минимального пинга", es: "Activa la aceleración para obtener el ping más bajo" },
  pac_enable_btn: { ar: "🚀 تفعيل التسريع", en: "🚀 Enable Acceleration", tr: "🚀 Hızlandırmayı Etkinleştir", ru: "🚀 Включить ускорение", es: "🚀 Activar aceleración" },
  pac_location: { ar: "الموقع", en: "Location", tr: "Konum", ru: "Локация", es: "Ubicación" },
  pac_protocol: { ar: "البروتوكول", en: "Protocol", tr: "Protokol", ru: "Протокол", es: "Protocolo" },
  pac_coverage: { ar: "التغطية", en: "Coverage", tr: "Kapsam", ru: "Покрытие", es: "Cobertura" },
  pac_servers: { ar: "السيرفرات", en: "Servers", tr: "Sunucular", ru: "Серверы", es: "Servidores" },
  pac_step_android_1: { ar: "افتح الإعدادات → Wi-Fi", en: "Open Settings → Wi-Fi", tr: "Ayarlar → Wi-Fi'yi açın", ru: "Откройте Настройки → Wi-Fi", es: "Abre Ajustes → Wi-Fi" },
  pac_step_android_2: { ar: "اضغط طويلاً على شبكتك → تعديل", en: "Long press your network → Modify", tr: "Ağınıza uzun basın → Değiştir", ru: "Долгое нажатие на сеть → Изменить", es: "Mantén presionado tu red → Modificar" },
  pac_step_android_3: { ar: "Proxy → Auto → الصق الرابط", en: "Proxy → Auto → Paste the URL", tr: "Proxy → Otomatik → URL'yi yapıştırın", ru: "Прокси → Авто → Вставьте ссылку", es: "Proxy → Auto → Pega la URL" },
  pac_step_android_4: { ar: "احفظ وأعد تشغيل الجهاز", en: "Save and restart device", tr: "Kaydedin ve cihazı yeniden başlatın", ru: "Сохраните и перезагрузите устройство", es: "Guarda y reinicia el dispositivo" },
  pac_step_ios_1: { ar: "الإعدادات → Wi-Fi → اضغط على (i)", en: "Settings → Wi-Fi → Tap (i)", tr: "Ayarlar → Wi-Fi → (i)'ye dokunun", ru: "Настройки → Wi-Fi → Нажмите (i)", es: "Ajustes → Wi-Fi → Toca (i)" },
  pac_step_ios_2: { ar: "Configure Proxy → Automatic", en: "Configure Proxy → Automatic", tr: "Proxy Yapılandır → Otomatik", ru: "Настроить прокси → Автоматически", es: "Configurar proxy → Automático" },
  pac_step_ios_3: { ar: "الصق رابط الـ PAC", en: "Paste PAC URL", tr: "PAC URL'sini yapıştırın", ru: "Вставьте ссылку PAC", es: "Pega la URL PAC" },
  pac_step_ios_4: { ar: "احفظ وأعد تشغيل الجهاز", en: "Save and restart device", tr: "Kaydedin ve cihazı yeniden başlatın", ru: "Сохраните и перезагрузите", es: "Guarda y reinicia" },
  pac_step_windows_1: { ar: "الإعدادات → الشبكة → Proxy", en: "Settings → Network → Proxy", tr: "Ayarlar → Ağ → Proxy", ru: "Настройки → Сеть → Прокси", es: "Ajustes → Red → Proxy" },
  pac_step_windows_2: { ar: "فعّل 'Use setup script' والصق الرابط", en: "Enable 'Use setup script' and paste URL", tr: "'Kurulum betiği kullan'ı etkinleştirin ve URL yapıştırın", ru: "Включите 'Use setup script' и вставьте ссылку", es: "Activa 'Usar script de config' y pega la URL" },
  pac_step_windows_3: { ar: "احفظ وأعد تشغيل المتصفح", en: "Save and restart browser", tr: "Kaydedin ve tarayıcıyı yeniden başlatın", ru: "Сохраните и перезапустите браузер", es: "Guarda y reinicia el navegador" },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
  const entry = translations[key];
  return entry?.[lang] ?? entry?.en ?? key;
}
