const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

// Функция для переключения слайдов
function showNextSlide() {
    // Удаляем класс активного у текущего
    slides[currentSlide].classList.remove('active');

    // Вычисляем следующий индекс
    currentSlide = (currentSlide +1) % slides.length;

    // Добавляем класс активного следующему
    slides[currentSlide].classList.add('active');
}

// Запускаем автоматическую смену каждые несколько секунд
setInterval(showNextSlide,3000);