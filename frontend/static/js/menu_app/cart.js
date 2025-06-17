let cart = [];
let totalAmount = 0;

// Функция для добавления блюда в корзину
function addToCart(title, price, imageUrl) {
    const item = { title, price, imageUrl }; // Добавляем imageUrl
    cart.push(item);
    totalAmount += price;
    updateCartDisplay();
    updateCartIcon();
}

// Обработка нажатий на кнопки "Добавить в корзину"
document.querySelectorAll(".menu-items-card-button").forEach(button => {
    button.onclick = function() {
        const card = button.closest(".card");
        const title = card.querySelector(".card-title").innerText;
        const priceText = card.querySelector(".price").innerText;
        const price = parseFloat(priceText.replace(/\s*руб\.?/, '').replace(',', '.')); // Извлекаем цену и преобразуем её в число
        const imageUrl = card.querySelector("img").src; // Получаем URL изображения
        addToCart(title, price, imageUrl); // Передаем URL изображения в функцию
    };
});

// Функция для обновления отображения корзины
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // Очищаем контейнер

    cart.forEach((item, index) => {
        // Создаем контейнер для элемента
        const itemContainer = document.createElement("div");
        itemContainer.style.display = "flex"; // Используем flexbox для выравнивания
        itemContainer.style.alignItems = "center"; // Центрируем элементы по вертикали
        itemContainer.style.marginBottom = "10px"; // Отступ между элементами

        // Создаем элемент для изображения
        const imageElement = document.createElement("img");
        imageElement.src = item.imageUrl; // Используем imageUrl из объекта
        imageElement.alt = item.title; // Альтернативный текст для изображения
        imageElement.style.width = "150px"; // Устанавливаем ширину изображения
        imageElement.style.height = "150px"; // Устанавливаем высоту изображения
        imageElement.style.marginRight = "10px"; // Отступ справа от изображения

        // Создаем элемент для текста
        const itemText = document.createElement("span");
        itemText.innerHTML = `${item.title} - ${item.price} руб. <button class="remove-button" onclick="removeFromCart(${index})">Удалить</button>`;

        // Добавляем изображение и текст в контейнер
        itemContainer.appendChild(imageElement);
        itemContainer.appendChild(itemText);

        // Добавляем линию разделителя
        const separator = document.createElement("div");
        separator.style.borderBottom = "1px solid #e1c68a"; // Устанавливаем цвет и стиль линии
        separator.style.margin = "10px 0"; // Добавляем отступы для визуального разделения

        cartItemsContainer.appendChild(itemContainer);
        cartItemsContainer.appendChild(separator); // Добавляем разделитель после элемента
    });

    document.getElementById("total-amount").innerText = totalAmount;
}

// Функция для удаления блюда из корзины
function removeFromCart(index) {
    totalAmount -= cart[index].price;
    cart.splice(index, 1);
    updateCartDisplay();
    updateCartIcon();
}

// Функция для очистки корзины
function clearCart() {
    cart = [];
    totalAmount = 0;
    updateCartDisplay();
    updateCartIcon();
}

// Функция для обновления иконки корзины
function updateCartIcon() {
    const cartIcon = document.querySelector(".cart-button");
    const itemCount = cart.length;

    // Находим элемент для отображения количества
    const countSpan = cartIcon.querySelector(".item-count");

    if (itemCount > 0) {
        cartIcon.style.borderColor = "#562f2e";
        cartIcon.style.color = "#562f2e"; // Изменяем цвет иконки
        countSpan.innerText = itemCount; // Устанавливаем количество
        countSpan.style.display = 'block'; // Показываем элемент
    } else {
        cartIcon.style.borderColor = "#fdecaa"; // Возвращаем оригинальный цвет
        cartIcon.style.color = "#fdecaa"; // Возвращаем оригинальный цвет
        countSpan.style.display = 'none'; // Скрываем элемент
    }
}

// Открытие модального окна при нажатии на кнопку корзины
document.querySelector(".cart-button").onclick = function(event) {
    event.preventDefault();
    document.getElementById("cart-modal").style.display = "block";
}

// Закрытие модального окна
document.getElementsByClassName("close-button")[0].onclick = function() {
    document.getElementById("cart-modal").style.display = "none";
}

// Закрытие модального окна при клике вне его содержимого
window.onclick = function(event) {
    if (event.target == document.getElementById("cart-modal")) {
        document.getElementById("cart-modal").style.display = "none";
    }
}

// Обработка нажатия на кнопку "Очистить корзину"
document.getElementById("clear-button").onclick = function() {
    clearCart();
};
