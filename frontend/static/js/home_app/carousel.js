const slides = document.querySelectorAll('#carousel .slide');
let currentSlide = 0;
let intervalId = null;
let isPlaying = true;

const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
const playPauseBtn = document.getElementById('play-pause');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');

const transitionDuration = 1000; // ms, должно совпадать с CSS transition

function showSlide(nextIndex) {
    if (nextIndex === currentSlide) return;

    const current = slides[currentSlide];
    const next = slides[nextIndex];

    // Помечаем следующий слайд активным (он появится сверху)
    next.classList.add('active');
    next.setAttribute('aria-hidden', 'false');

    // Текущий слайд плавно исчезает
    current.classList.add('fade-out');
    current.setAttribute('aria-hidden', 'true');

    // Через время перехода убираем классы у старого слайда
    setTimeout(() => {
        current.classList.remove('active', 'fade-out');
        current.style.zIndex = ''; // сбросим z-index если нужно
    }, transitionDuration);

    currentSlide = nextIndex;
}

function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
}

function prevSlideFunc() {
    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

function playCarousel() {
    if (!intervalId) {
        intervalId = setInterval(nextSlide, 4000);
        isPlaying = true;
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        playPauseBtn.setAttribute('aria-label', 'Пауза');
        playPauseBtn.title = 'Pause';
    }
}

function pauseCarousel() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        playPauseBtn.setAttribute('aria-label', 'Воспроизведение');
        playPauseBtn.title = 'Play';
    }
}

prevBtn.addEventListener('click', () => {
    prevSlideFunc();
    if (isPlaying) {
        pauseCarousel();
    }
});
nextBtn.addEventListener('click', () => {
    nextSlide();
    if (isPlaying) {
        pauseCarousel();
    }
});
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseCarousel();
    } else {
        playCarousel();
    }
});

// Автостарт
playCarousel();
