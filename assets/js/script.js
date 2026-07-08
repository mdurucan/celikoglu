// Header scroll
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu
function toggleMenu() {
  const m = document.getElementById('mobileMenu');
  m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
}
function closeMenu() {
  document.getElementById('mobileMenu').style.display = 'none';
}

// Quick quote
function sendQuickQuote() {
  const date = document.getElementById('qfDate').value;
  const kisi = document.getElementById('qfKisi').value;
  const tur  = document.getElementById('qfTur').value;
  const lang = document.documentElement.lang;
  let msg = lang === 'en'
    ? 'Hello! I would like to get information about a boat tour.'
    : 'Merhaba! Tekne turu hakkında bilgi almak istiyorum.';
  if (date) msg += (lang === 'en' ? '\nDate: ' : '\nTarih: ') + date;
  if (kisi) msg += (lang === 'en' ? '\nPeople: ' : '\nKişi Sayısı: ') + kisi;
  if (tur)  msg += (lang === 'en' ? '\nTour Type: ' : '\nTur Tipi: ') + tur;
  window.open('https://wa.me/905376513674?text=' + encodeURIComponent(msg), '_blank');
}

// FAQ accordion
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Lightbox
const lbImagesTR = [
  { src: 'assets/images/gallery/celikogluboat-01.jpg', label: 'Bodrum Koyları' },
  { src: 'assets/images/gallery/celikogluboat-02.jpg', label: 'Özel Yat' },
  { src: 'assets/images/gallery/celikogluboat-03.jpg', label: 'Yüzme Molası' },
  { src: 'assets/images/gallery/celikogluboat-04.jpg', label: 'Gün Batımı' },
  { src: 'assets/images/gallery/celikogluboat-05.jpg', label: "Ege'nin Mavisi" },
  { src: 'assets/images/gallery/celikogluboat-06.jpg', label: 'Tekne Keyfi' },
  { src: 'assets/images/gallery/01-tr.jpeg', label: 'Çelikoğlu Boat' },
  { src: 'assets/images/gallery/03-tr.jpeg', label: 'Çelikoğlu Boat' },
];
const lbImagesEN = [
  { src: 'assets/images/gallery/celikogluboat-01.jpg', label: 'Bodrum Bays' },
  { src: 'assets/images/gallery/celikogluboat-02.jpg', label: 'Private Yacht' },
  { src: 'assets/images/gallery/celikogluboat-03.jpg', label: 'Swimming Stop' },
  { src: 'assets/images/gallery/celikogluboat-04.jpg', label: 'Sunset' },
  { src: 'assets/images/gallery/celikogluboat-05.jpg', label: 'Aegean Blue' },
  { src: 'assets/images/gallery/celikogluboat-06.jpg', label: 'Boat Fun' },
  { src: 'assets/images/gallery/01-en.jpeg', label: 'Çelikoğlu Boat' },
  { src: 'assets/images/gallery/02-en.jpeg', label: 'Çelikoğlu Boat' },
  { src: 'assets/images/gallery/03-en.jpeg', label: 'Çelikoğlu Boat' },
  { src: 'assets/images/gallery/04-en.jpeg', label: 'Çelikoğlu Boat' },
  { src: 'assets/images/gallery/05-en.jpeg', label: 'Çelikoğlu Boat' },
  { src: 'assets/images/gallery/06-en.jpeg', label: 'Çelikoğlu Boat' },
  { src: 'assets/images/gallery/07-en.jpeg', label: 'Çelikoğlu Boat' },
];
function currentGalleryImages() {
  return document.documentElement.lang === 'en' ? lbImagesEN : lbImagesTR;
}
function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  const images = currentGalleryImages();
  grid.innerHTML = images.map((img, i) =>
    `<div class="gal-item" onclick="openLightbox(${i})"><img src="${img.src}" alt="Çelikoğlu Boat" loading="lazy"><div class="gal-overlay"><span class="gal-label">${img.label}</span></div></div>`
  ).join('');
}
let lbCurrent = 0;
function openLightbox(i) {
  lbCurrent = i;
  const images = currentGalleryImages();
  document.getElementById('lbImg').src = images[i].src;
  document.getElementById('lbCaption').textContent = (i+1) + ' / ' + images.length + ' — ' + images[i].label;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(e) {
  if (e.target === document.getElementById('lightbox')) closeLightboxBtn();
}
function closeLightboxBtn() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}
function lbNav(dir) {
  const images = currentGalleryImages();
  lbCurrent = (lbCurrent + dir + images.length) % images.length;
  openLightbox(lbCurrent);
}
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('active')) return;
  if (e.key === 'ArrowLeft') lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'Escape') closeLightboxBtn();
});

// i18n
const translations = {
  tr: {
    // nav
    nav_tours:    '→ Turlar', nav_routes: '→ Rotalar', nav_boat: '→ Tekne',
    nav_gallery:  '→ Galeri', nav_reviews: '→ Yorumlar',
    // hero
    hero_badge:   '2026 Sezonu · Özel Tekne Turu · WhatsApp Rezervasyon',
    hero_h1:      'Bodrum Tekne Turu <span class="accent">Çelikoğlu Boat</span> ile Denizde Özel Bir Gün',
    hero_desc:    'Günlük tekne turları, özel kutlamalar, gün batımı organizasyonları ve VIP yat kiralama',
    btn_wa_reserve: 'WhatsApp Rezervasyon', btn_explore: 'Turları İncele ▾',
    // quick form
    qf_title: 'Hızlı Teklif Al', qf_sub: 'WhatsApp üzerinden anında dönüş',
    qf_date: 'Tarih Seçin', qf_people: 'Kişi Sayısı', qf_type: 'Tur Tipi',
    qf_select: 'Seçin...', qf_btn: "WhatsApp'tan Teklif Al",
    qf_note: 'Ücretsiz &nbsp;·&nbsp; Anında Dönüş &nbsp;·&nbsp; Komisyon Yok',
    // stats
    stat1_label: 'Google Puanı',   stat1_sub: 'Müşteri değerlendirmesi',
    stat2_label: '5 Yıldızlı Yorum', stat2_sub: 'Doğrulanmış müşteriler',
    stat3_val: '&lt;1 Saat', stat3_label: 'WhatsApp Dönüşü', stat3_sub: 'Hızlı yanıt garantisi',
    stat4_val: 'Sınırsız', stat4_label: 'Özel Rota', stat4_sub: 'Kendi rotanı belirle',
    // tours
    tours_tag: 'Tur Seçenekleri', tours_title: 'Size Özel Bodrum Denizi',
    tours_desc: 'Her bütçeye ve zevke uygun tur paketleri. WhatsApp üzerinden anında fiyat alın.',
    tour1_popular: 'En Popüler Seçim', tour1_badge: 'En Çok Tercih',
    tour1_title: 'Günlük Tekne Turu', tour1_dur: '4–8 Saat',
    tour1_desc: "Bodrum'un kristal berraklığındaki koylarında yüzme molaları, aile ve grup düzeni ile gün boyu rahat deniz rotası.",
    tour1_f1: 'Birden fazla yüzme molası', tour1_f2: 'Aile & grup düzeni',
    tour1_f3: 'Gün boyu rahat rota', tour1_f4: 'İkram dahil',
    tour2_title: 'Özel Yat Kiralama', tour2_dur: 'Esnek Saat',
    tour2_desc: 'Tamamen size özel yat deneyimi. Kendi rotanızı belirleyin, özel ikram seçenekleriyle lüks bir gün geçirin.',
    tour2_f1: 'Özel rota belirleme', tour2_f2: 'VIP ikram seçenekleri',
    tour2_f3: 'Müzik sistemi', tour2_f4: 'Tam mahremiyet',
    tour3_badge: 'Romantik', tour3_title: 'Gün Batımı Turu', tour3_dur: '2–3 Saat',
    tour3_desc: "Bodrum'un muhteşem gün batımını denizden izleyin. Doğum günü, evlilik teklifi ve fotoğraf odaklı özel organizasyonlar.",
    tour3_f1: 'Gün batımı rotası', tour3_f2: 'Fotoğraf odaklı',
    tour3_f3: 'Özel organizasyon', tour3_f4: 'Evlilik teklifi paketi',
    tour4_badge: 'Grup', tour4_title: 'Kutlama & Organizasyon', tour4_dur: 'Teklif Bazlı',
    tour4_desc: 'Bekarlığa veda, doğum günü, şirket etkinliği ve özel kutlamalar için tam kapsamlı organizasyon hizmeti.',
    tour4_f1: 'Bekarlığa veda', tour4_f2: 'Doğum günü partisi',
    tour4_f3: 'Şirket etkinliği', tour4_f4: 'Dekorasyon dahil',
    btn_get_price: "WhatsApp'tan Fiyat Al", btn_quote: 'Teklif Al',
    btn_book: 'Rezervasyon Yap', btn_avail: 'Müsaitlik Sor',
    // route
    route_tag: 'Günlük Program', route_title: 'Rota Deneyimi',
    route_desc: "Bodrum'un en güzel koylarını keşfederken size özel hazırlanmış rota deneyimi yaşayın.",
    step1_title: 'Kalkış & Karşılama',
    step1_desc: "Bodrum Kumbahçe Limanı'ndan hareket. Ekibimiz sizi karşılar, güvenlik brifingini yapar ve tekneyi tanıtır.",
    step2_title: 'İlk Yüzme Molası',
    step2_desc: "Bodrum'un en berrak koylarından birinde demirliyoruz. Snorkel, can yeleği ve yüzme ekipmanları hazır.",
    step3_title: 'Öğle & İkram Molası',
    step3_desc: 'Gölgeli bir koyda öğle molası. Hafif ikramlar ve serinletici içecekler eşliğinde dinlenme zamanı.',
    step4_title: 'İkinci Koy & Serbest Zaman',
    step4_desc: 'Bir sonraki koyta serbest yüzme, güneşlenme veya sadece denizin keyfini çıkarma zamanı.',
    step5_title: 'Dönüş & Gün Batımı',
    step5_desc: "Gün batımına eşlik eden muhteşem manzara ile limana dönüş. Unutulmaz anılar ve harika fotoğraflarla dolu bir gün.",
    route_note: "Program hava koşullarına göre değişebilir. Özel rota talepleriniz için <a href='https://wa.me/905376513674' target='_blank'>WhatsApp</a>'tan iletişime geçin.",
    // boat
    boat_tag: 'Tekne Bilgileri',
    boat_title: 'Çelikoğlu Boat ile <span class="accent">Premium Deniz Deneyimi</span>',
    boat_sub: "Bodrum'un mavi sularında yılların deneyimiyle hizmet veren Çelikoğlu Boat, konfor ve güvenliği bir arada sunuyor.",
    bd1_label: 'Kapasite', bd1_val: 'Max 10 Kişi',
    bd2_label: 'Kalkış Noktası', bd2_val: 'Kumbahçe Limanı',
    bd3_label: 'Rota Seçenekleri', bd3_val: 'Özel / Hazır Rota',
    bd4_label: 'İkram & Müzik', bd4_val: 'Dahil Edilebilir',
    bd5_label: 'Özel Gün', bd5_val: 'Organizasyon Yapılır',
    bd6_label: 'Hızlı Teklif', bd6_val: 'WhatsApp ile',
    btn_info: 'WhatsApp ile Bilgi Al',
    // pricing
    pricing_tag: 'Fiyatlandırma', pricing_title: 'Paketlerimiz',
    pricing_desc: 'Tüm paketlerde WhatsApp üzerinden anında fiyat alabilirsiniz. Gizli ücret yok.',
    feat_included: 'Dahil Olanlar', feat_excluded: 'Dahil Değil',
    p1_name: 'Standart Günlük Tur', p1_amount: 'WhatsApp Fiyat', p1_note: 'Kişi sayısına göre değişir',
    p1_f1: '4-8 saatlik tur', p1_f2: 'Bodrum koyları rotası', p1_f3: 'Yüzme molaları',
    p1_f4: 'Müzik sistemi', p1_f5: 'Can yeleği & ekipman', p1_f6: 'Kaptan & ekip',
    p1_x1: 'Özel ikram', p1_x2: 'Dekorasyon',
    p2_name: 'Özel Yat Kiralama', p2_amount: 'Teklif Al', p2_note: 'Tam özel kiralama',
    p2_f1: 'Esnek süre', p2_f2: 'Özel rota belirleme', p2_f3: 'VIP ikram paketi',
    p2_f4: 'Premium müzik sistemi', p2_f5: 'Fotoğrafçı (isteğe bağlı)',
    p2_f6: 'Özel dekorasyon', p2_f7: '7/24 kaptan hizmeti',
    p3_name: 'Gün Batımı / Kutlama', p3_amount: 'Müsaitlik Sor', p3_note: 'Özel organizasyon dahil',
    p3_f1: '2-3 saatlik gün batımı turu', p3_f2: 'Romantik ortam',
    p3_f3: 'Kutlama dekorasyonu', p3_f4: 'Fotoğraf çekimi',
    p3_f5: 'Bekarlığa veda paketi', p3_f6: 'Doğum günü organizasyonu',
    p3_x1: 'Yüzme molası',
    pricing_note: 'Tüm fiyatlar kişi sayısı ve tarihe göre değişir. WhatsApp ile anında teklif alın.',
    // gallery
    gallery_tag: 'Galeri', gallery_title: 'Anılar & Anlar',
    gallery_desc: "Bodrum'un eşsiz güzelliklerini teknemizden keşfedin.",
    // reviews
    reviews_tag: 'Müşteri Yorumları', reviews_title: 'Deneyimleri Okuyun',
    reviews_count: '/ 9 değerlendirme', reviews_verified: "Google'da doğrulanmış müşteri yorumları",
    // faq
    faq_tag: 'Sık Sorulan Sorular', faq_title: 'Merak Ettikleriniz',
    faq_desc: "Cevabını bulamadıysanız WhatsApp'tan bize yazın.",
    faq1_q: 'Tur süresi ne kadar?',
    faq1_a: 'Günlük tekne turlarımız 4 ila 8 saat sürmektedir. Özel yat kiralama ve kutlama organizasyonlarında süre tamamen size özel olarak belirlenir. Gün batımı turları 2-3 saat sürer.',
    faq2_q: 'Rotayı kendimiz belirleyebilir miyiz?',
    faq2_a: 'Evet, kesinlikle! Özel yat kiralama paketimizde rotayı tamamen siz belirleyebilirsiniz. Standart tur paketimizde de tercihlerinizi bildirmeniz durumunda elimizden geldiğince uyum sağlarız.',
    faq3_q: 'Maksimum kaç kişi binebilir?',
    faq3_a: 'Teknemiz maksimum 10 kişi kapasitesine sahiptir. 10 kişiden fazla grubunuz varsa birden fazla tur planlayabiliriz. Detaylar için WhatsApp\'tan iletişime geçin.',
    faq4_q: 'Ödeme nasıl yapılıyor?',
    faq4_a: 'Rezervasyon için kaparo almaktayız. Kalan ödeme tur günü nakit veya havale ile yapılabilir. WhatsApp üzerinden detayları konuşabilirsiniz.',
    faq5_q: 'Hava koşulları kötü olursa ne olur?',
    faq5_a: 'Güvenliğiniz bizim önceliğimizdir. Olumsuz hava koşullarında turu erteliyor veya iade yapıyoruz. Bu konuda tamamen müşteri memnuniyeti odaklı çalışıyoruz.',
    faq6_q: 'Özel gün organizasyonu yapabiliyor musunuz?',
    faq6_a: 'Evet! Doğum günü, nişan, evlilik teklifi, bekarlığa veda ve şirket etkinlikleri için özel organizasyon yapıyoruz. Dekorasyon, pasta ve fotoğrafçı gibi ekstra hizmetler de sağlayabiliriz.',
    faq7_q: "WhatsApp'tan nasıl rezervasyon yapabilirim?",
    faq7_a: "Sayfamızdaki WhatsApp butonlarından birine tıklayarak doğrudan mesaj atabilirsiniz. Tarih, kişi sayısı ve tur tipini belirtmeniz yeterli. 1 saat içinde dönüş garantisi veriyoruz.",
    faq_cta_q: 'Başka sorunuz mu var?', faq_cta_btn: "WhatsApp'tan Sorun",
    // footer
    footer_cta_h2: "Bodrum'da Unutulmaz Bir Gün Sizi Bekliyor",
    footer_cta_p: 'Hemen WhatsApp\'tan yazın, 1 saat içinde dönüş garantisi.',
    footer_cta_btn: 'WhatsApp ile Rezervasyon Yap',
    footer_about: "Bodrum'un en güzel koylarında günlük tekne turları, özel yat kiralama ve organizasyon hizmetleri.",
    footer_links_h: 'Hızlı Linkler', footer_contact_h: 'İletişim',
    footer_address: 'Berk Balık karşısı, Kumbahçe<br>Bodrum / Muğla',
    footer_wa_link: 'WhatsApp Rezervasyon',
    footer_hours: 'Her gün 08:00 – 20:00<br><span style="font-size:.75rem;color:rgba(255,255,255,.4)">Sezon boyunca açık</span>',
    footer_season: 'Sezon boyunca açık',
    footer_copy: '© 2026 Çelikoğlu Boat. Tüm hakları saklıdır. · <a href="https://labdorado.com" target="_blank" class="powered-by">Powered by LabDorado</a>',
    footer_tags: 'Bodrum Tekne Turu · Özel Yat Kiralama · Gün Batımı Turu',
  },
  en: {
    // nav
    nav_tours: '→ Tours', nav_routes: '→ Routes', nav_boat: '→ Boat',
    nav_gallery: '→ Gallery', nav_reviews: '→ Reviews',
    // hero
    hero_badge: '2026 Season · Private Boat Tour · WhatsApp Reservation',
    hero_h1: 'A Special Day at Sea with <span class="accent">Çelikoğlu Boat</span> in Bodrum',
    hero_desc: 'Daily boat tours, private celebrations, sunset cruises and VIP yacht rental',
    btn_wa_reserve: 'Reserve via WhatsApp', btn_explore: 'Explore Tours ▾',
    // quick form
    qf_title: 'Get a Quick Quote', qf_sub: 'Instant reply via WhatsApp',
    qf_date: 'Select Date', qf_people: 'Number of People', qf_type: 'Tour Type',
    qf_select: 'Select...', qf_btn: 'Get Quote on WhatsApp',
    qf_note: 'Free &nbsp;·&nbsp; Instant Reply &nbsp;·&nbsp; No Commission',
    // stats
    stat1_label: 'Google Rating',   stat1_sub: 'Customer reviews',
    stat2_label: '5-Star Reviews',  stat2_sub: 'Verified customers',
    stat3_val: '&lt;1 Hour', stat3_label: 'WhatsApp Reply',  stat3_sub: 'Fast response guarantee',
    stat4_val: 'Unlimited', stat4_label: 'Custom Route', stat4_sub: 'Set your own route',
    // tours
    tours_tag: 'Tour Options', tours_title: 'Bodrum Sea, Just for You',
    tours_desc: 'Tour packages for every budget and taste. Get an instant price via WhatsApp.',
    tour1_popular: 'Most Popular Choice', tour1_badge: 'Top Choice',
    tour1_title: 'Daily Boat Tour', tour1_dur: '4–8 Hours',
    tour1_desc: 'Swimming stops in crystal-clear Bodrum bays, family & group layout for a relaxed full-day sea route.',
    tour1_f1: 'Multiple swimming stops', tour1_f2: 'Family & group layout',
    tour1_f3: 'Relaxed all-day route', tour1_f4: 'Refreshments included',
    tour2_title: 'Private Yacht Charter', tour2_dur: 'Flexible Hours',
    tour2_desc: 'An entirely private yacht experience. Set your own route and enjoy a luxury day with premium catering options.',
    tour2_f1: 'Custom route planning', tour2_f2: 'VIP catering options',
    tour2_f3: 'Music system', tour2_f4: 'Full privacy',
    tour3_badge: 'Romantic', tour3_title: 'Sunset Cruise', tour3_dur: '2–3 Hours',
    tour3_desc: "Watch Bodrum's stunning sunset from the sea. Special arrangements for birthdays, proposals and photo shoots.",
    tour3_f1: 'Sunset route', tour3_f2: 'Photo-focused',
    tour3_f3: 'Special arrangement', tour3_f4: 'Proposal package',
    tour4_badge: 'Group', tour4_title: 'Celebration & Event', tour4_dur: 'Quote Based',
    tour4_desc: 'Full-service event management for bachelor parties, birthdays, corporate events and special celebrations.',
    tour4_f1: 'Bachelor party', tour4_f2: 'Birthday party',
    tour4_f3: 'Corporate event', tour4_f4: 'Decoration included',
    btn_get_price: 'Get Price on WhatsApp', btn_quote: 'Get a Quote',
    btn_book: 'Book Now', btn_avail: 'Check Availability',
    // route
    route_tag: 'Daily Schedule', route_title: 'Route Experience',
    route_desc: 'Discover the most beautiful bays of Bodrum with a specially crafted route experience.',
    step1_title: 'Departure & Welcome',
    step1_desc: 'Departure from Bodrum Kumbahçe Marina. Our crew welcomes you, gives the safety briefing and introduces the boat.',
    step2_title: 'First Swimming Stop',
    step2_desc: 'We anchor in one of the clearest bays of Bodrum. Snorkel, life jackets and swimming equipment are ready.',
    step3_title: 'Lunch & Refreshment Break',
    step3_desc: 'Lunch break in a shaded bay. Relaxation time with light snacks and refreshing drinks.',
    step4_title: 'Second Bay & Free Time',
    step4_desc: 'Free swimming, sunbathing, or simply enjoying the sea at the next bay.',
    step5_title: 'Return & Sunset',
    step5_desc: 'Return to the marina accompanied by a magnificent sunset view. A day full of unforgettable memories and great photos.',
    route_note: "The schedule may change due to weather conditions. For custom route requests, contact us via <a href='https://wa.me/905376513674' target='_blank'>WhatsApp</a>.",
    // boat
    boat_tag: 'Boat Details',
    boat_title: 'Premium Sea Experience with <span class="accent">Çelikoğlu Boat</span>',
    boat_sub: 'Çelikoğlu Boat has been serving in the blue waters of Bodrum for years, offering comfort and safety together.',
    bd1_label: 'Capacity', bd1_val: 'Max 10 People',
    bd2_label: 'Departure Point', bd2_val: 'Kumbahçe Marina',
    bd3_label: 'Route Options', bd3_val: 'Custom / Ready Route',
    bd4_label: 'Catering & Music', bd4_val: 'Can Be Included',
    bd5_label: 'Special Day', bd5_val: 'Event Arranged',
    bd6_label: 'Quick Quote', bd6_val: 'Via WhatsApp',
    btn_info: 'Get Info on WhatsApp',
    // pricing
    pricing_tag: 'Pricing', pricing_title: 'Our Packages',
    pricing_desc: 'Get an instant price via WhatsApp for all packages. No hidden fees.',
    feat_included: 'Included', feat_excluded: 'Not Included',
    p1_name: 'Standard Daily Tour', p1_amount: 'WhatsApp Price', p1_note: 'Varies by group size',
    p1_f1: '4-8 hour tour', p1_f2: 'Bodrum bays route', p1_f3: 'Swimming stops',
    p1_f4: 'Music system', p1_f5: 'Life jacket & equipment', p1_f6: 'Captain & crew',
    p1_x1: 'Private catering', p1_x2: 'Decoration',
    p2_name: 'Private Yacht Charter', p2_amount: 'Get a Quote', p2_note: 'Fully private charter',
    p2_f1: 'Flexible duration', p2_f2: 'Custom route planning', p2_f3: 'VIP catering package',
    p2_f4: 'Premium music system', p2_f5: 'Photographer (optional)',
    p2_f6: 'Special decoration', p2_f7: '24/7 captain service',
    p3_name: 'Sunset / Celebration', p3_amount: 'Check Availability', p3_note: 'Special event included',
    p3_f1: '2-3 hour sunset cruise', p3_f2: 'Romantic atmosphere',
    p3_f3: 'Celebration decoration', p3_f4: 'Photo shoot',
    p3_f5: 'Bachelor party package', p3_f6: 'Birthday arrangement',
    p3_x1: 'Swimming stop',
    pricing_note: 'All prices vary by group size and date. Get an instant quote via WhatsApp.',
    // gallery
    gallery_tag: 'Gallery', gallery_title: 'Memories & Moments',
    gallery_desc: 'Discover the unique beauty of Bodrum from our boat.',
    // reviews
    reviews_tag: 'Customer Reviews', reviews_title: 'Read the Experiences',
    reviews_count: '/ 9 reviews', reviews_verified: 'Verified customer reviews on Google',
    // faq
    faq_tag: 'FAQ', faq_title: 'Frequently Asked Questions',
    faq_desc: "If you can't find an answer, message us on WhatsApp.",
    faq1_q: 'How long is the tour?',
    faq1_a: 'Our daily boat tours last 4 to 8 hours. For private yacht charters and events, the duration is set entirely around you. Sunset cruises last 2-3 hours.',
    faq2_q: 'Can we set our own route?',
    faq2_a: 'Absolutely! With our private yacht charter, you can set the route entirely. For the standard tour, we accommodate your preferences as much as possible.',
    faq3_q: 'What is the maximum capacity?',
    faq3_a: 'Our boat has a maximum capacity of 10 people. For groups larger than 10, we can plan multiple tours. Contact us via WhatsApp for details.',
    faq4_q: 'How does payment work?',
    faq4_a: 'We collect a deposit for the reservation. The remaining balance can be paid on tour day by cash or bank transfer. Contact us via WhatsApp for details.',
    faq5_q: 'What happens if the weather is bad?',
    faq5_a: 'Your safety is our priority. In adverse weather conditions, we postpone the tour or issue a full refund. We are entirely customer satisfaction focused.',
    faq6_q: 'Can you arrange special day events?',
    faq6_a: 'Yes! We organize birthdays, proposals, engagements, bachelor parties and corporate events. We can also provide decoration, cake and photographer services.',
    faq7_q: 'How do I make a reservation via WhatsApp?',
    faq7_a: 'Click any WhatsApp button on the page to message us directly. Just mention the date, number of people and tour type. We guarantee a reply within 1 hour.',
    faq_cta_q: 'Have more questions?', faq_cta_btn: 'Ask on WhatsApp',
    // footer
    footer_cta_h2: 'An Unforgettable Day in Bodrum Awaits You',
    footer_cta_p: 'Message us on WhatsApp now — reply guaranteed within 1 hour.',
    footer_cta_btn: 'Reserve via WhatsApp',
    footer_about: 'Daily boat tours, private yacht rental and event services in the most beautiful bays of Bodrum.',
    footer_links_h: 'Quick Links', footer_contact_h: 'Contact',
    footer_address: 'Next to Berk Balık, Kumbahçe<br>Bodrum / Muğla',
    footer_wa_link: 'WhatsApp Reservation',
    footer_hours: 'Every day 08:00 – 20:00<br><span style="font-size:.75rem;color:rgba(255,255,255,.4)">Open throughout the season</span>',
    footer_season: 'Open throughout the season',
    footer_copy: '© 2026 Çelikoğlu Boat. All rights reserved. · <a href="https://labdorado.com" target="_blank" class="powered-by">Powered by LabDorado</a>',
    footer_tags: 'Bodrum Boat Tour · Private Yacht Charter · Sunset Cruise',
  }
};

function applyLang(lang) {
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.documentElement.lang = lang;
  renderGallery();
  document.querySelectorAll('.lang-toggle').forEach(el => {
    el.textContent = lang === 'tr' ? 'EN' : 'TR';
  });
  document.title = lang === 'en'
    ? 'Çelikoğlu Boat | Bodrum Boat Tour & Yacht Charter'
    : 'Çelikoğlu Boat | Bodrum Tekne Turu & Yat Kiralama';
  try { localStorage.setItem('lang', lang); } catch(e) {}
}

function toggleLang() {
  const current = document.documentElement.lang || 'tr';
  applyLang(current === 'tr' ? 'en' : 'tr');
}

// Init: restore saved language
(function() {
  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch(e) {}
  if (saved && saved !== 'tr') applyLang(saved);
  else renderGallery();
})();
