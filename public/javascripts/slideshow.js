let currentSlide = 0;
const slides = document.querySelectorAll(".slide"); 

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add("active"); 
      slide.style.opacity = 1; 
    } else {
      slide.classList.remove("active"); 
      slide.style.opacity = 0;
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

showSlide(currentSlide);
