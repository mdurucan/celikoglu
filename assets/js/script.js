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
  let msg = 'Merhaba! Tekne turu hakkında bilgi almak istiyorum.';
  if (date) msg += '\nTarih: ' + date;
  if (kisi) msg += '\nKişi Sayısı: ' + kisi;
  if (tur)  msg += '\nTur Tipi: ' + tur;
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
const lbImages = [
  { src: 'assets/images/gallery/celikogluboat-01.jpg', label: 'Bodrum Koyları' },
  { src: 'assets/images/gallery/celikogluboat-02.jpg', label: 'Özel Yat' },
  { src: 'assets/images/gallery/celikogluboat-03.jpg', label: 'Yüzme Molası' },
  { src: 'assets/images/gallery/celikogluboat-04.jpg', label: 'Gün Batımı' },
  { src: 'assets/images/gallery/celikogluboat-05.jpg', label: "Ege'nin Mavisi" },
  { src: 'assets/images/gallery/celikogluboat-06.jpg', label: 'Tekne Keyfi' },
];
let lbCurrent = 0;
function openLightbox(i) {
  lbCurrent = i;
  document.getElementById('lbImg').src = lbImages[i].src;
  document.getElementById('lbCaption').textContent = (i+1) + ' / ' + lbImages.length + ' — ' + lbImages[i].label;
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
  lbCurrent = (lbCurrent + dir + lbImages.length) % lbImages.length;
  openLightbox(lbCurrent);
}
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('active')) return;
  if (e.key === 'ArrowLeft') lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'Escape') closeLightboxBtn();
});
