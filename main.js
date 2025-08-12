// JavaScript cho Landing Page Lái Xe Hộ 365
// Sử dụng màu chủ đạo #2596be

document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS with custom settings
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 0,
      anchorPlacement: 'top-bottom',
    });
  }

  // Mobile Menu Toggle
  initializeMobileMenu();

  // Smooth Scrolling
  initializeSmoothScrolling();

  // Header Background on Scroll
  initializeHeaderScroll();

  // Scroll Progress Indicator
  initializeScrollIndicator();

  // Contact Form Validation (if exists)
  initializeContactForm();

  // Pricing Calculator
  initializePricingCalculator();

  // Lazy Loading for Images
  initializeLazyLoading();

  // Performance Monitoring
  initializePerformanceMonitoring();

  // Accessibility Enhancements
  initializeAccessibility();
});

// Mobile Menu Functionality
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      const isHidden = mobileMenu.classList.contains('hidden');

      // Toggle menu visibility
      mobileMenu.classList.toggle('hidden');

      // Update button icon
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (isHidden) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }

      // Add animation class
      if (!isHidden) {
        mobileMenu.classList.add('mobile-menu-slide');
      } else {
        mobileMenu.classList.remove('mobile-menu-slide');
      }
    });

    // Close menu when clicking on links
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
      if (
        !mobileMenuBtn.contains(event.target) &&
        !mobileMenu.contains(event.target)
      ) {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // Update URL without triggering scroll
        history.pushState(null, null, targetId);
      }
    });
  });
}

// Header Background Change on Scroll
function initializeHeaderScroll() {
  const header = document.querySelector('header');

  if (header) {
    let isScrolled = false;

    window.addEventListener('scroll', function () {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 100 && !isScrolled) {
        header.classList.add('header-glass');
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
        isScrolled = true;
      } else if (scrollTop <= 100 && isScrolled) {
        header.classList.remove('header-glass');
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        isScrolled = false;
      }
    });
  }
}

// Scroll Progress Indicator
function initializeScrollIndicator() {
  let indicator = document.getElementById('scroll-indicator');

  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'scroll-indicator';
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
  }

  function updateScrollIndicator() {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;

    indicator.style.width = Math.min(scrolled, 100) + '%';
  }

  window.addEventListener('scroll', updateScrollIndicator);
  updateScrollIndicator(); // Initial call
}

// Contact Form Validation
function initializeContactForm() {
  const contactForms = document.querySelectorAll('form');

  contactForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (validateForm(data)) {
        submitForm(data);
      }
    });
  });
}

function validateForm(data) {
  let isValid = true;
  const errors = [];

  // Phone validation
  if (data.phone && !/^[0-9+\-\s()]{10,}$/.test(data.phone)) {
    errors.push('Số điện thoại không hợp lệ');
    isValid = false;
  }

  // Email validation
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Email không hợp lệ');
    isValid = false;
  }

  if (!isValid) {
    showNotification(errors.join(', '), 'error');
  }

  return isValid;
}

async function submitForm(data) {
  try {
    showNotification('Đang gửi yêu cầu...', 'info');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    showNotification('Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.', 'success');

    // Track conversion
    trackConversion('form_submit', data);
  } catch (error) {
    console.error('Form submission error:', error);
    showNotification('Có lỗi xảy ra. Vui lòng thử lại.', 'error');
  }
}

// Pricing Calculator
function initializePricingCalculator() {
  const calculatorButton = document.getElementById('pricing-calculator-btn');

  if (calculatorButton) {
    calculatorButton.addEventListener('click', function () {
      showPricingModal();
    });
  }
}

function showPricingModal() {
  const modal = createPricingModal();
  document.body.appendChild(modal);

  // Animate modal in
  requestAnimationFrame(() => {
    modal.classList.add('opacity-100');
    modal.querySelector('.modal-content').classList.add('scale-100');
  });
}

function createPricingModal() {
  const modal = document.createElement('div');
  modal.className =
    'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300';

  modal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform scale-95 transition-transform duration-300 modal-content">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-gray-800">Tính toán giá cước</h3>
                <button class="close-modal text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>

            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Khoảng cách (km)</label>
                    <input type="number" id="distance" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" min="1" value="5">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Thời gian</label>
                    <select id="time-period" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="day">Trước 22h</option>
                        <option value="evening">22h - 24h</option>
                        <option value="night">Sau 24h</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Thời gian chờ (phút)</label>
                    <input type="number" id="wait-time" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" min="0" value="0">
                </div>

                <div class="flex items-center">
                    <input type="checkbox" id="rain" class="mr-2">
                    <label for="rain" class="text-sm text-gray-700">Trời mưa (+30k)</label>
                </div>

                <button id="calculate-price" class="w-full btn-primary text-white py-3 rounded-lg font-semibold">
                    Tính giá
                </button>

                <div id="price-result" class="hidden bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <p class="text-lg font-bold text-blue-800">Giá ước tính: <span id="estimated-price"></span> VNĐ</p>
                </div>
            </div>
        </div>
    `;

  // Event listeners
  modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.classList.remove('opacity-100');
    modal.querySelector('.modal-content').classList.remove('scale-100');
    setTimeout(() => modal.remove(), 300);
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('opacity-100');
      modal.querySelector('.modal-content').classList.remove('scale-100');
      setTimeout(() => modal.remove(), 300);
    }
  });

  modal
    .querySelector('#calculate-price')
    .addEventListener('click', calculatePrice);

  return modal;
}

function calculatePrice() {
  const distance = parseFloat(document.getElementById('distance').value) || 0;
  const timePeriod = document.getElementById('time-period').value;
  const waitTime = parseFloat(document.getElementById('wait-time').value) || 0;
  const isRain = document.getElementById('rain').checked;

  let basePrice = 0;
  let extraKmPrice = 0;
  let waitPrice = 0;

  // Base prices based on time period
  switch (timePeriod) {
    case 'day':
      basePrice = 250000;
      extraKmPrice = distance > 10 ? 15000 : 20000;
      waitPrice = Math.ceil(waitTime / 30) * 30000;
      break;
    case 'evening':
      basePrice = 270000;
      extraKmPrice = distance > 10 ? 20000 : 25000;
      waitPrice = Math.ceil(waitTime / 30) * 50000;
      break;
    case 'night':
      basePrice = 299000;
      extraKmPrice = distance > 10 ? 20000 : 25000;
      waitPrice = Math.ceil(waitTime / 30) * 70000;
      break;
  }

  let totalPrice = basePrice;

  // Calculate extra distance price
  if (distance > 5) {
    const extraKm = distance - 5;
    if (distance <= 10) {
      totalPrice += extraKm * (timePeriod === 'day' ? 20000 : 25000);
    } else {
      totalPrice += 5 * (timePeriod === 'day' ? 20000 : 25000); // First 5 extra km
      totalPrice += (extraKm - 5) * (timePeriod === 'day' ? 15000 : 20000); // Remaining km
    }
  }

  // Add wait time
  totalPrice += waitPrice;

  // Add rain surcharge
  if (isRain) {
    totalPrice += 30000;
  }

  // Display result
  const resultDiv = document.getElementById('price-result');
  const priceSpan = document.getElementById('estimated-price');

  priceSpan.textContent = new Intl.NumberFormat('vi-VN').format(totalPrice);
  resultDiv.classList.remove('hidden');

  // Track pricing calculation
  trackEvent('pricing_calculated', {
    distance: distance,
    time_period: timePeriod,
    wait_time: waitTime,
    rain: isRain,
    estimated_price: totalPrice,
  });
}

// Lazy Loading for Images
function initializeLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

// Performance Monitoring
function initializePerformanceMonitoring() {
  // Monitor Core Web Vitals
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    new PerformanceObserver(entryList => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      trackEvent('performance_lcp', { value: lastEntry.startTime });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver(entryList => {
      const entries = entryList.getEntries();
      const firstEntry = entries[0];
      trackEvent('performance_fid', {
        value: firstEntry.processingStart - firstEntry.startTime,
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    new PerformanceObserver(entryList => {
      let clsValue = 0;
      entryList.getEntries().forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      trackEvent('performance_cls', { value: clsValue });
    }).observe({ entryTypes: ['layout-shift'] });
  }
}

// Accessibility Enhancements
function initializeAccessibility() {
  // Keyboard navigation for mobile menu
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  }

  // Focus management for modals
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const modal = document.querySelector('.modal-content');
      if (modal) {
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) closeBtn.click();
      }
    }
  });

  // Announce page changes to screen readers
  announcePageSection();
}

function announcePageSection() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionTitle = entry.target.querySelector('h2');
          if (sectionTitle) {
            announceToScreenReader(sectionTitle.textContent);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  const sections = document.querySelectorAll('section');
  sections.forEach(section => observer.observe(section));
}

function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.textContent = message;

  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
}

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg text-white font-semibold max-w-sm transform transition-all duration-300 translate-x-full`;

  // Set color based on type
  switch (type) {
    case 'success':
      notification.classList.add('bg-green-500');
      break;
    case 'error':
      notification.classList.add('bg-red-500');
      break;
    case 'warning':
      notification.classList.add('bg-yellow-500');
      break;
    default:
      notification.classList.add('bg-blue-500');
  }

  notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  document.body.appendChild(notification);

  // Animate in
  requestAnimationFrame(() => {
    notification.classList.remove('translate-x-full');
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => notification.remove(), 300);
  }, 5000);

  // Manual close
  notification.querySelector('button').addEventListener('click', () => {
    notification.classList.add('translate-x-full');
    setTimeout(() => notification.remove(), 300);
  });
}

// Analytics and Tracking
function trackEvent(eventName, parameters = {}) {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters);
  }

  // Facebook Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', eventName, parameters);
  }

  // Console log for development
  console.log('Event tracked:', eventName, parameters);
}

function trackConversion(type, data) {
  trackEvent('conversion', {
    conversion_type: type,
    value: 1,
    currency: 'VND',
    ...data,
  });
}

// Phone number formatting
function formatPhoneNumber(input) {
  const phoneNumber = input.replace(/\D/g, '');
  if (phoneNumber.length === 10) {
    return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
  }
  return phoneNumber;
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Export functions for external use
window.LaiXeHo365 = {
  showNotification,
  trackEvent,
  trackConversion,
  formatPhoneNumber,
  calculatePrice,
};
