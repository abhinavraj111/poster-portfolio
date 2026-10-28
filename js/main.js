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
});
