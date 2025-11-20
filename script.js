let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const dots = document.querySelectorAll('.dot');

// Función para mostrar una diapositiva específica
function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[n].classList.add('active');
    dots[n].classList.add('active');
    
    currentSlide = n;
}

// Función para ir a la siguiente diapositiva
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Función para ir a la diapositiva anterior
function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Función para ir a una diapositiva específica
function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
}

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        previousSlide();
    }
});

// Auto-advance cada 10 segundos (opcional)
setInterval(() => {
    // Descomenta la siguiente línea si quieres que cambien automáticamente
    // nextSlide();
}, 10000);

// Inicializar la primera diapositiva
showSlide(0);

// Efectos de sonido adicionales (opcional)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency, duration) {
    try {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
        // El navegador podría bloquear el sonido
    }
}

// Sonido al cambiar de diapositiva
const navButtons = document.querySelectorAll('.nav-btn');
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        try {
            playSound(440, 0.1);
        } catch (e) {
            // Sonido no soportado
        }
    });
});

// Animaciones personalizadas al cambiar slides
document.querySelectorAll('.slide').forEach((slide, index) => {
    slide.addEventListener('transitionend', () => {
        if (slide.classList.contains('active')) {
            // Reiniciar animaciones
            const animatedElements = slide.querySelectorAll('.animate-in, .birthday-title, .birthday-message, .birthday-name');
            animatedElements.forEach(el => {
                el.style.animation = 'none';
                setTimeout(() => {
                    el.style.animation = '';
                }, 10);
            });
        }
    });
});

// Soporte para touch/swipe en móviles
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
        nextSlide();
    }
    if (touchEndX - touchStartX > 50) {
        previousSlide();
    }
}

// Mensajes personalizados por consola
console.log('🎂 ¡Feliz Cumpleaños Emilsen Maria Salgado Duran! 🎂');
console.log('✨ Esta página fue creada con mucho amor para ti ✨');
console.log('💖 Usa las flechas del teclado para navegar o haz clic en los botones');
