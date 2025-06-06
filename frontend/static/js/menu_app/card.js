
function showCategory(category) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Обновляем активную кнопку
    const buttons = document.querySelectorAll('.menu-button');
    buttons.forEach(button => {
        if (button.getAttribute('onclick').includes(category)) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// При загрузке страницы показываем первую категорию, например, specials
document.addEventListener('DOMContentLoaded', () => {
    showCategory('specials');
});

