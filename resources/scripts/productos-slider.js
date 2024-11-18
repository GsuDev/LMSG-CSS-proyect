const track = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const images = Array.from(track.children);

let currentIndex = 0;
const intervalTime = 3000; // Tiempo en milisegundos entre cada movimiento
let autoSlide; // Variable para controlar el intervalo

// Función para actualizar la posición del carrusel
function updateCarousel() {
  const offset = -currentIndex * images[0].getBoundingClientRect().width;
  track.style.transform = `translateX(${offset}px)`;
}

// Función para avanzar automáticamente
function moveToNextSlide() {
  currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
  updateCarousel();
}

// Función para iniciar el carrusel automático
function startAutoSlide() {
  autoSlide = setInterval(moveToNextSlide, intervalTime);
}

// Función para detener el carrusel automático
function stopAutoSlide() {
  clearInterval(autoSlide);
}

// Evento para el botón "siguiente"
nextButton.addEventListener('click', () => {
  stopAutoSlide();
  moveToNextSlide();
  startAutoSlide(); // Reinicia el automático
});

// Evento para el botón "anterior"
prevButton.addEventListener('click', () => {
  stopAutoSlide();
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
  updateCarousel();
  startAutoSlide(); // Reinicia el automático
});

// Inicia el carrusel automáticamente
startAutoSlide();
