// --- Навигация - дропдауны ---
const btnShop = document.getElementById('btn-shop');
const dropdownShop = document.getElementById('dropdown-shop');
const btnAbout = document.getElementById('btn-about');
const dropdownAbout = document.getElementById('dropdown-about');

function closeDropdowns() {
dropdownShop.classList.remove('show');
btnShop.setAttribute('aria-expanded', 'false');
dropdownAbout.classList.remove('show');
btnAbout.setAttribute('aria-expanded', 'false');
}

btnShop.addEventListener('click', (e) => {
e.stopPropagation();
const isShown = dropdownShop.classList.contains('show');
closeDropdowns();
if (!isShown) {
    dropdownShop.classList.add('show');
    btnShop.setAttribute('aria-expanded', 'true');
}
});

btnAbout.addEventListener('click', (e) => {
e.stopPropagation();
const isShown = dropdownAbout.classList.contains('show');
closeDropdowns();
if (!isShown) {
    dropdownAbout.classList.add('show');
    btnAbout.setAttribute('aria-expanded', 'true');
}
});

// Закрывать дропдауны при клике вне
document.body.addEventListener('click', () => {
closeDropdowns();
});

// Закрывать дропдауны при нажатии Escape
document.body.addEventListener('keydown', (e) => {
if (e.key === 'Escape') {
    closeDropdowns();
}
});