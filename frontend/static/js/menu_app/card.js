const categoryInfo = {
    specials: {
        title: "Seasonal Specials",
        description: "Available from 12am-10pm"
    },
    hot_sandwiches: {
        title: "Hot Sandwiches",
        description: "Available from 12am-10pm"
    },
    cold_sandwiches: {
        title: "Cold Sandwiches",
        description: "Available from 12am-10pm"
    },
    plates: {
        title: "Plates",
        description: "Available from 12am-10pm"
    },
    sides: {
        title: "Sides",
        description: "Available from 12am-10pm"
    },
    breakfast: {
        title: "Breakfast",
        description: "Available from 10am-4pm"
    }
};

function showCategory(category) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Обновляем заголовок и текст в зависимости от категории
    document.getElementById('category-title').innerText = categoryInfo[category].title;
    document.getElementById('category-description').innerText = categoryInfo[category].description;

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