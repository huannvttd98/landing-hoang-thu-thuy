// Image Slideshow functionality for testimonials section
class ImageSlideshow {
  constructor() {
    this.container = document.querySelector('.testimonial-image-container');
    this.images = document.querySelectorAll('.testimonial-img');
    this.prevBtn = document.querySelector('.nav-prev');
    this.nextBtn = document.querySelector('.nav-next');
    this.currentIndex = 0;
    this.isTransitioning = false;

    this.init();
  }

  init() {
    if (!this.container || this.images.length === 0) return;

    // Add event listeners
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.previousImage());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextImage());
    }

    // Set initial state
    this.updateImages();

    // Auto-play (optional)
    this.startAutoplay();
  }

  previousImage() {
    if (this.isTransitioning) return;

    this.currentIndex =
      this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    this.updateImages('prev');
  }

  nextImage() {
    if (this.isTransitioning) return;

    this.currentIndex =
      this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
    this.updateImages('next');
  }

  updateImages(direction = 'next') {
    this.isTransitioning = true;

    // Remove all classes first
    this.images.forEach((img, index) => {
      img.classList.remove('active', 'prev', 'next');

      if (index === this.currentIndex) {
        img.classList.add('active');
      } else if (direction === 'prev') {
        img.classList.add(index < this.currentIndex ? 'prev' : 'next');
      } else {
        img.classList.add(index < this.currentIndex ? 'prev' : 'next');
      }
    });

    // Reset transition flag after animation completes
    setTimeout(() => {
      this.isTransitioning = false;
    }, 800);
  }

  startAutoplay() {
    setInterval(() => {
      if (!this.isTransitioning) {
        this.nextImage();
      }
    }, 5000); // Change image every 5 seconds
  }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Wait a bit to ensure all elements are rendered
  setTimeout(() => {
    new ImageSlideshow();
  }, 100);
});

// Also initialize if the script is loaded after DOM is ready
if (
  document.readyState === 'complete' ||
  document.readyState === 'interactive'
) {
  setTimeout(() => {
    new ImageSlideshow();
  }, 100);
}
