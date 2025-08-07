// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// DOM Elements
const header = document.getElementById('header');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
    backToTopBtn.classList.add('visible');
  } else {
    header.classList.remove('scrolled');
    backToTopBtn.classList.remove('visible');
  }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  navMenu.classList.toggle('mobile-open');
  document.body.style.overflow = navMenu.classList.contains('mobile-open')
    ? 'hidden'
    : 'auto';
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuToggle.classList.remove('active');
    navMenu.classList.remove('mobile-open');
    document.body.style.overflow = 'auto';
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - header.offsetHeight - 100;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

// Back to top button functionality
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Testimonials horizontal slider functionality
class TestimonialsSlider {
  constructor() {
    this.currentIndex = 0;
    this.track = document.getElementById('testimonials-track');
    this.cards = document.querySelectorAll('.testimonial-card');
    this.dots = document.querySelectorAll('.pagination-dot');
    this.prevBtn = document.getElementById('prev-testimonial');
    this.nextBtn = document.getElementById('next-testimonial');
    this.visibleCards = this.getVisibleCards();
    this.maxIndex = Math.max(
      0,
      Math.ceil(this.cards.length / this.visibleCards) - 1
    );
    this.autoplayInterval = null;

    this.init();
  }

  init() {
    if (!this.track || this.cards.length === 0) return;

    // Set initial transform
    this.updateSlider();

    // Add click events to navigation arrows
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.goToPrev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.goToNext());
    }

    // Add click event to pagination dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
      });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      this.visibleCards = this.getVisibleCards();
      console.log('Visible cards:', this.visibleCards);
      // Recalculate max index based on visible cards
      this.maxIndex = Math.max(
        0,
        Math.ceil(this.cards.length / this.visibleCards) - 1
      );
      this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
      this.updateSlider();
    });

    // Start autoplay
    this.startAutoplay();

    // Pause autoplay on hover
    const sliderContainer = document.querySelector('.testimonials__slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => this.stopAutoplay());
      sliderContainer.addEventListener('mouseleave', () =>
        this.startAutoplay()
      );
    }

    // Touch/swipe support
    this.initTouchSupport();
  }

  getVisibleCards() {
    const containerWidth = window.innerWidth;
    if (containerWidth < 768) return 1;
    if (containerWidth < 1200) return 2;
    return 3;
  }

  updateSlider() {
    if (!this.track) return;

    // Calculate percentage-based transform for responsive design
    const cardPercentage = 100 / this.visibleCards;
    const translateX = -(this.currentIndex * cardPercentage);
    this.track.style.transform = `translateX(${translateX}%)`;

    // Update pagination dots - only show active dots based on total pages
    const totalPages = Math.ceil(this.cards.length / this.visibleCards);
    this.dots.forEach((dot, index) => {
      if (index < totalPages) {
        dot.style.display = 'block';
        dot.classList.toggle('active', index === this.currentIndex);
      } else {
        dot.style.display = 'none';
      }
    });

    // Update navigation buttons
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex === 0;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
    }
  }

  goToSlide(index) {
    this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
    this.updateSlider();
  }

  goToPrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlider();
    }
  }

  goToNext() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
      this.updateSlider();
    }
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      if (this.currentIndex >= this.maxIndex) {
        this.goToSlide(0); // Reset to beginning
      } else {
        this.goToNext();
      }
    }, 4000); // Change slide every 4 seconds
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  initTouchSupport() {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const handleStart = e => {
      isDragging = true;
      startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
      this.track.style.transition = 'none';
    };

    const handleMove = e => {
      if (!isDragging) return;
      e.preventDefault();
      currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
      const diffX = currentX - startX;
      const cardPercentage = 100 / this.visibleCards;
      const baseTranslateX = -(this.currentIndex * cardPercentage);
      const dragOffset = (diffX / this.track.offsetWidth) * 100;
      const translateX = baseTranslateX + dragOffset;
      this.track.style.transform = `translateX(${translateX}%)`;
    };

    const handleEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      this.track.style.transition = 'transform 0.5s ease';

      const diffX = currentX - startX;
      const threshold = 50;

      if (Math.abs(diffX) > threshold) {
        if (diffX > 0 && this.currentIndex > 0) {
          this.goToPrev();
        } else if (diffX < 0 && this.currentIndex < this.maxIndex) {
          this.goToNext();
        } else {
          this.updateSlider();
        }
      } else {
        this.updateSlider();
      }
    };

    // Mouse events
    this.track.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);

    // Touch events
    this.track.addEventListener('touchstart', handleStart, { passive: false });
    this.track.addEventListener('touchmove', handleMove, { passive: false });
    this.track.addEventListener('touchend', handleEnd);
  }
}

// Initialize testimonials slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.testimonials__slider')) {
    window.testimonialsSliderInstance = new TestimonialsSlider();
  }
});

// Contact form handling
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    // Get form data
    const data = {
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      service: document.getElementById('service').value,
      message: document.getElementById('message').value,
    };

    // Validate form
    if (!validateForm(data)) {
      return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Đang gửi...';
    submitBtn.disabled = true;
    contactForm.classList.add('loading');

    try {
      // Simulate form submission (replace with actual API call)
      await simulateFormSubmission(data);

      // Show success message
      showNotification(
        'Cảm ơn bạn! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.',
        'success'
      );

      // Reset form
      contactForm.reset();
    } catch (error) {
      // Show error message
      console.error('Form submission error:', error);
      showNotification('Có lỗi xảy ra. Vui lòng thử lại sau.', 'error');
    } finally {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      contactForm.classList.remove('loading');
    }
  });
}

// Form validation
function validateForm(data) {
  const errors = [];

  if (!data.name.trim()) {
    errors.push('Vui lòng nhập họ và tên');
  }

  if (!data.phone.trim()) {
    errors.push('Vui lòng nhập số điện thoại');
  } else if (!/^[0-9+\-\s]+$/.test(data.phone)) {
    errors.push('Số điện thoại không hợp lệ');
  }

  if (!data.service) {
    errors.push('Vui lòng chọn dịch vụ');
  }

  if (errors.length > 0) {
    showNotification(errors.join('<br>'), 'error');
    return false;
  }

  return true;
}

// Simulate form submission
function simulateFormSubmission(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random success/failure for demo
      if (Math.random() > 0.1) {
        // 90% success rate
        resolve(data);
      } else {
        reject(new Error('Network error'));
      }
    }, 2000);
  });
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideInFromRight 0.3s ease-out;
        font-family: inherit;
        font-size: 14px;
        line-height: 1.5;
    `;

  // Set colors based on type
  const colors = {
    success: { bg: '#d4edda', text: '#155724', border: '#c3e6cb' },
    error: { bg: '#f8d7da', text: '#721c24', border: '#f5c6cb' },
    info: { bg: '#d1ecf1', text: '#0c5460', border: '#bee5eb' },
  };

  const color = colors[type];
  notification.style.backgroundColor = color.bg;
  notification.style.color = color.text;
  notification.style.border = `1px solid ${color.border}`;

  // Add close functionality
  const closeBtn = notification.querySelector('.notification__close');
  closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
        color: inherit;
        opacity: 0.7;
    `;

  closeBtn.addEventListener('click', () => {
    notification.style.animation = 'slideOutToRight 0.3s ease-in forwards';
    setTimeout(() => notification.remove(), 300);
  });

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOutToRight 0.3s ease-in forwards';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutToRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }

    .notification__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;
document.head.appendChild(notificationStyles);

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Pricing calculator (optional enhancement)
class PricingCalculator {
  constructor() {
    this.rates = {
      gio: 100000,
      chuyen: 500000,
      'yeu-cau': 0, // Custom pricing
      'doanh-nghiep': 200000,
      'su-kien': 0, // Custom pricing
    };

    this.init();
  }

  init() {
    // This could be expanded to create an interactive pricing calculator
    // For now, it's just a placeholder for future enhancement
  }

  calculatePrice(serviceType, hours = 1, distance = 0) {
    const baseRate = this.rates[serviceType] || 0;

    if (serviceType === 'gio') {
      return baseRate * hours;
    } else if (serviceType === 'chuyen') {
      return baseRate + distance * 10000; // 10k per km
    }

    return baseRate;
  }
}

// Initialize pricing calculator
const pricingCalculator = new PricingCalculator();

// Performance optimization: Defer non-critical JavaScript
window.addEventListener('load', () => {
  // Initialize non-critical features after page load

  // Add fade-in effect to service cards on scroll
  const serviceCards = document.querySelectorAll('.service-card');
  const cardObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1 }
  );

  serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
  });
});

// Error handling for missing elements
window.addEventListener('error', e => {
  console.error('JavaScript error:', e.error);
  // In production, you might want to send this to an error tracking service
});

// Keyboard navigation support
document.addEventListener('keydown', e => {
  // ESC key closes mobile menu
  if (e.key === 'Escape' && navMenu.classList.contains('mobile-open')) {
    mobileMenuToggle.classList.remove('active');
    navMenu.classList.remove('mobile-open');
    document.body.style.overflow = 'auto';
  }
});

// Touch gesture support for testimonials slider (basic implementation)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
});

function handleSwipeGesture() {
  const slider = document.querySelector('.testimonials__slider');
  if (!slider) return;

  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    const testimonialsSlider = window.testimonialsSliderInstance;
    if (testimonialsSlider) {
      if (diff > 0) {
        // Swipe left - next slide
        testimonialsSlider.nextSlide();
      } else {
        // Swipe right - previous slide
        const prevIndex =
          testimonialsSlider.currentSlide === 0
            ? testimonialsSlider.slides.length - 1
            : testimonialsSlider.currentSlide - 1;
        testimonialsSlider.goToSlide(prevIndex);
      }
    }
  }
}

console.log('🚗 Landing page loaded successfully! Ready to serve customers.');

const constIsCheckScreenMobile =
  window.matchMedia('(max-width: 768px)').matches;

const runInit = () => {
  console.log('Running initialization for mobile screen');
  if (constIsCheckScreenMobile) {
    const listClass = document.querySelectorAll('.service-card');
    for (let i = 0; i < listClass.length; i++) {
      if (i == 0) {
        listClass[i].classList.add('show-on-mobile');
      } else {
        listClass[i].classList.add('hide-on-mobile');
      }
    }
  } else {
    console.log('Desktop screen detected, initializing desktop features...');
    // Add any desktop-specific initialization code here
  }
};
var indexSlider = 0;
runInit();

setInterval(() => {
  if (constIsCheckScreenMobile) {
    loopSlider();
  }
}, 4 * 1000);

const loopSlider = () => {
  console.log('Looping slider to index:', indexSlider);
  const listClass = document.querySelectorAll('.service-card');
  const listCheckBoxService = document.querySelectorAll(
    'input[name="service-slider"]'
  );
  console.log('List of service cards:', listCheckBoxService);
  indexSlider++;
  if (indexSlider >= listClass.length) {
    indexSlider = 0; // Reset to first item if index exceeds length
  }
  for (let i = 0; i < listClass.length; i++) {
    if (i == indexSlider) {
      listClass[i].classList.add('show-on-mobile');
      listClass[i].classList.remove('hide-on-mobile');
      listCheckBoxService[i].checked = true; // Check the corresponding radio button
    } else {
      listClass[i].classList.add('hide-on-mobile');
      listClass[i].classList.remove('show-on-mobile');
      listCheckBoxService[i].checked = false; // Uncheck the corresponding radio button
    }
  }
};
const radioCheckboxService = document.querySelectorAll(
  'input[name="service-slider"]'
);
radioCheckboxService.forEach((checkbox, index) => {
  checkbox.addEventListener('click', () => {
    const listClass = document.querySelectorAll('.service-card');
    const valueCheckbox = checkbox.value;
    for (let i = 0; i < listClass.length; i++) {
      if (i == valueCheckbox) {
        listClass[i].classList.add('show-on-mobile');
        listClass[i].classList.remove('hide-on-mobile');
      } else {
        listClass[i].classList.add('hide-on-mobile');
        listClass[i].classList.remove('show-on-mobile');
      }
    }
  });
});
