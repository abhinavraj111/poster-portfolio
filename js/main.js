document.addEventListener('DOMContentLoaded', () => {
const loadMoreBtn = document.getElementById('loadMoreBtn');
let loaded = 0;
const STEP = 3;

const cards = Array.from(document.querySelectorAll('.grid .card'));
const total = cards.length;
const hidden = cards.slice(STEP);

hidden.forEach((c, i) => {
  c.style.display = 'none';
  requestAnimationFrame(() => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(12px)';
  });
});

loadMoreBtn.style.display = total > STEP ? 'block' : 'none';

loadMoreBtn.addEventListener('click', () => {
  const remaining = hidden.slice(loaded);
  if (remaining.length === 0) {
    loadMoreBtn.textContent = 'Nothing more to load';
    loadMoreBtn.disabled = true;
    return;
  }
  const toShow = remaining.slice(0, STEP);
  toShow.forEach((c, i) => {
    c.style.display = 'block';
    requestAnimationFrame(() => {
      c.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      c.style.opacity = '1';
      c.style.transform = 'translateY(0)';
    });
  });
  loaded += STEP;
  loadMoreBtn.textContent = loaded + STEP >= total ? 'All loaded' : 'Load more';
  if (loaded + STEP >= total) loadMoreBtn.disabled = true;
});

// ---- Lightbox ----
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('.lightbox--img');
const lbIdx = lightbox.querySelector('.lightbox--idx');
const lbTitle = lightbox.querySelector('.lightbox--title');
const lbArtist = lightbox.querySelector('.lightbox--artist');
const lbStyle = lightbox.querySelector('.lightbox--style');
const lbClose = lightbox.querySelector('.lightbox--close');

const lbPosters = [
  { title: 'Neon Horizon', artist: 'Kaito Tanaka', year: '2025', style: 'Synthwave', url: 'img/poster_1.svg' },
  { title: 'Matte & Rust', artist: 'Elara Vane', year: '2025', style: 'Analog Horror', url: 'img/poster_2.svg' },
  { title: 'Cinder & Steel', artist: 'Marcus Reeve', year: '2024', style: 'Industrial', url: 'img/poster_3.svg' },
  { title: 'Glass Orchard', artist: 'Saoirse Lin', year: '2024', style: 'Surreal', url: 'img/poster_4.svg' },
  { title: 'Static Bloom', artist: 'Yuki Hashimoto', year: '2025', style: 'Cyberpunk', url: 'img/poster_5.svg' },
  { title: 'Frost Wire', artist: 'Tomas Berg', year: '2023', style: 'Minimal', url: 'img/poster_6.svg' },
];

let lbCurrent = 0;

function openLightbox(index) {
  lbCurrent = index;
  const p = lbPosters[index];
  lbImg.src = p.url;
  lbImg.alt = p.title;
  lbIdx.textContent = `${index + 1} / ${lbPosters.length}`;
  lbTitle.textContent = p.title;
  lbArtist.textContent = `by ${p.artist} — ${p.year}`;
  lbStyle.textContent = p.style;
  lightbox.hidden = false;
  lbImg.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  document.addEventListener('keydown', onKeydown);
}

function closeLightbox() {
  lightbox.hidden = true;
  document.removeEventListener('keydown', onKeydown);
}

function onKeydown(e) {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') goNext();
  if (e.key === 'ArrowLeft') goPrev();
}

function goNext() {
  lbCurrent = (lbCurrent + 1) % lbPosters.length;
  const p = lbPosters[lbCurrent];
  lbImg.src = p.url;
  lbImg.alt = p.title;
  lbIdx.textContent = `${lbCurrent + 1} / ${lbPosters.length}`;
  lbTitle.textContent = p.title;
  lbArtist.textContent = `by ${p.artist} — ${p.year}`;
  lbStyle.textContent = p.style;
}

function goPrev() {
  lbCurrent = (lbCurrent - 1 + lbPosters.length) % lbPosters.length;
  const p = lbPosters[lbCurrent];
  lbImg.src = p.url;
  lbImg.alt = p.title;
  lbIdx.textContent = `${lbCurrent + 1} / ${lbPosters.length}`;
  lbTitle.textContent = p.title;
  lbArtist.textContent = `by ${p.artist} — ${p.year}`;
  lbStyle.textContent = p.style;
}

// Open lightbox on card click
document.querySelectorAll('.card--link').forEach((link, i) => {
  link.addEventListener('click', (e) => {
    // don't open the lightbox when clicking the "view full-size" link itself
    if (e.target.closest('.card--link')) return;
  });
});

// Open lightbox when clicking the image area of a card
document.querySelectorAll('.card--img').forEach((img, i) => {
  img.addEventListener('click', () => openLightbox(i));
});

// Close on backdrop click
lightbox.querySelector('.lightbox--backdrop').addEventListener('click', closeLightbox);

// Close on close button
lbClose.addEventListener('click', closeLightbox);

// Prev/next buttons
lightbox.querySelector('.lightbox--prev')?.addEventListener('click', goPrev);
lightbox.querySelector('.lightbox--next')?.addEventListener('click', goNext);

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') goNext();
  if (e.key === 'ArrowLeft') goPrev();
});
});
