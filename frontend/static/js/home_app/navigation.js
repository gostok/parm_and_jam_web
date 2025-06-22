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

document.addEventListener('DOMContentLoaded', function() {
    const btnBurger = document.getElementById('btn-burger');
    const nav = document.querySelector('nav');
    const menu = document.getElementById('main-menu');

    btnBurger.addEventListener('click', function() {
        const expanded = btnBurger.getAttribute('aria-expanded') === 'true' || false;
        btnBurger.setAttribute('aria-expanded', !expanded);
        nav.classList.toggle('open');
    });

    // Закрытие меню при клике вне меню (опционально)
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && nav.classList.contains('open')) {
            nav.classList.remove('open');
            btnBurger.setAttribute('aria-expanded', false);
        }
    });
});
