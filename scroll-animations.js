// Scroll Animation System
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -30px 0px',
    };

    // Throttle animation initialization to prevent performance issues
    this.isInitializing = false;
    this.init();
  }

  init() {
    // Performance optimization: track scroll speed
    this.lastScrollTop = 0;
    this.isScrolling = false;
    this.scrollTimeout = null;

    // Create Intersection Observer
    this.observer = new IntersectionObserver(entries => {
      // Skip animations if user is scrolling too fast
      if (this.isScrolling) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, this.observerOptions);

    // Add scroll performance monitoring
    this.initScrollOptimization();

    // Setup animations after DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () =>
        this.setupAnimations()
      );
    } else {
      this.setupAnimations();
    }
  }

  initScrollOptimization() {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          const scrollDelta = Math.abs(scrollTop - this.lastScrollTop);

          // If scrolling fast (more than 50px), temporarily disable animations
          if (scrollDelta > 50) {
            this.isScrolling = true;
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
              this.isScrolling = false;
            }, 150);
          }

          this.lastScrollTop = scrollTop;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  setupAnimations() {
    if (this.isInitializing) return;
    this.isInitializing = true;

    // Ensure mobile navigation is not affected
    this.protectMobileNavigation();

    // Use requestAnimationFrame to prevent blocking
    requestAnimationFrame(() => {
      // Add animation classes to elements
      this.addAnimationClasses();

      // Start observing elements
      this.observeElements();

      // Mark animations as initialized
      document.body.classList.add('scroll-animations-initialized');
      this.isInitializing = false;
    });
  }

  protectMobileNavigation() {
    // Ensure mobile navigation elements are never affected by scroll animations
    const mobileNav = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const header = document.querySelector('.header');

    if (mobileNav) {
      mobileNav.style.willChange = 'auto';
      mobileNav.style.backfaceVisibility = 'visible';
    }

    if (mobileToggle) {
      mobileToggle.style.willChange = 'auto';
      mobileToggle.style.backfaceVisibility = 'visible';
    }

    if (header) {
      header.style.willChange = 'auto';
      header.style.backfaceVisibility = 'visible';
    }
  }

  addAnimationClasses() {
    // Hero Section
    const heroContent = document.querySelector('.hero-left');
    const heroImage = document.querySelector('.hero-right');
    if (heroContent)
      heroContent.classList.add('scroll-animation', 'hero-content');
    if (heroImage) heroImage.classList.add('scroll-animation', 'hero-image');

    // Section titles (exclude header titles)
    const sectionTitles = document.querySelectorAll(
      'h2:not(.header h2), .section-title'
    );
    sectionTitles.forEach(title => {
      if (
        !title.classList.contains('scroll-animation') &&
        !title.closest('.header')
      ) {
        title.classList.add('scroll-animation', 'section-title');
      }
    });

    // Stats Section - add specific handling
    const statsImage = document.querySelector('.stats-image');
    const statsText = document.querySelector('.stats-text');
    if (statsImage) {
      statsImage.classList.add('scroll-animation');
    }
    if (statsText) {
      statsText.classList.add('scroll-animation');
    }

    // Feature cards specifically
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
      card.classList.add('scroll-animation', 'fade-in', 'stagger-animation');
    });

    // Service cards - tìm các thẻ div có class chứa "service" hoặc "card"
    const serviceElements = document.querySelectorAll(
      '.service, .card:not(.feature-card), .feature:not(.feature-card), .item'
    );
    serviceElements.forEach((element, index) => {
      element.classList.add(
        'scroll-animation',
        'service-card',
        'stagger-animation'
      );
    });

    // Price table
    const priceTable = document.querySelector('table');
    if (priceTable) {
      priceTable.classList.add('scroll-animation', 'fade-in');
    }

    // Only animate main images (reduce performance impact)
    const mainImages = document.querySelectorAll(
      '.stats-img, .why-zstep-img, section img[style*="width: 100%"]'
    );
    mainImages.forEach((img, index) => {
      if (index % 2 === 0) {
        img.classList.add('scroll-animation', 'fade-in-left');
      } else {
        img.classList.add('scroll-animation', 'fade-in-right');
      }
    });

    // Contact section - only animate main containers
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form-section');
    if (contactInfo) {
      contactInfo.classList.add('scroll-animation');
    }
    if (contactForm) {
      contactForm.classList.add('scroll-animation');
    }

    // Footer - only animate main columns to reduce load
    const footerColumns = document.querySelectorAll('.footer-column');
    footerColumns.forEach((column, index) => {
      column.classList.add('scroll-animation', 'fade-in', 'stagger-animation');
    });

    // Only animate important text sections to improve performance
    const importantText = document.querySelectorAll(
      '.stats-description, .conversion-description, .retention-description'
    );
    importantText.forEach(text => {
      if (!text.classList.contains('scroll-animation')) {
        text.classList.add('scroll-animation', 'fade-in');
      }
    });

    // Only animate main feature lists (not all lists)
    const featureLists = document.querySelectorAll(
      '.stats-features, .pricing-features'
    );
    featureLists.forEach(list => {
      list.classList.add('scroll-animation', 'slide-up');
    });
  }

  observeElements() {
    // Observe all elements with scroll-animation class
    const animatedElements = document.querySelectorAll('.scroll-animation');
    animatedElements.forEach(element => {
      // Check if element is already in viewport
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport) {
        // If already visible, animate immediately
        element.classList.add('animate');
      } else {
        // Only mark for hiding if not in viewport
        element.classList.add('animation-ready');
        this.observer.observe(element);
      }
    });
  }

  animateElement(element) {
    // Add animate class to trigger animation
    element.classList.add('animate');

    // Stop observing this element after animation
    this.observer.unobserve(element);
  }

  // Method to manually trigger animations (useful for debugging)
  triggerAnimation(selector) {
    const element = document.querySelector(selector);
    if (element) {
      this.animateElement(element);
    }
  }

  // Method to reset animations (useful for testing)
  resetAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animation');
    animatedElements.forEach(element => {
      element.classList.remove('animate');
      this.observer.observe(element);
    });
  }

  // Method to add animation to specific elements manually
  addAnimationToElement(selector, animationType = 'fade-in') {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.add('scroll-animation', animationType);
      this.observer.observe(element);
    });
  }

  // Method to force show all content immediately (emergency fallback)
  showAllContent() {
    const allAnimationElements = document.querySelectorAll('.scroll-animation');
    allAnimationElements.forEach(element => {
      element.classList.add('animate');
      element.classList.remove('animation-ready');
    });
  }
}

// Initialize scroll animations when DOM is ready
function initializeScrollAnimations() {
  try {
    const scrollAnimations = new ScrollAnimations();
    // Make it available globally for debugging
    window.scrollAnimations = scrollAnimations;
  } catch (error) {
    console.warn('Scroll animations failed to initialize:', error);
    // Fallback: ensure content is visible if animations fail
    document.body.classList.add('scroll-animations-initialized');
    const allAnimationElements = document.querySelectorAll('.scroll-animation');
    allAnimationElements.forEach(el => el.classList.add('animate'));
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Wait a bit for other scripts to load
  setTimeout(initializeScrollAnimations, 100);
});

// Alternative initialization if DOMContentLoaded already fired
if (document.readyState !== 'loading') {
  setTimeout(initializeScrollAnimations, 100);
}

// Fallback: If animations haven't been initialized after 1 second, force visibility
setTimeout(() => {
  if (!document.body.classList.contains('scroll-animations-initialized')) {
    console.warn(
      'Scroll animations initialization timeout - forcing visibility'
    );
    document.body.classList.add('scroll-animations-initialized');
    const allAnimationElements = document.querySelectorAll('.scroll-animation');
    allAnimationElements.forEach(el => {
      el.classList.add('animate');
      el.classList.remove('animation-ready');
    });
  }
}, 1000);

// Additional emergency fallback - show all content after 3 seconds regardless
setTimeout(() => {
  const hiddenElements = document.querySelectorAll(
    '.scroll-animation:not(.animate)'
  );
  if (hiddenElements.length > 0) {
    console.warn('Emergency fallback: Showing all hidden content');
    hiddenElements.forEach(el => {
      el.classList.add('animate');
      el.classList.remove('animation-ready');
    });
  }
}, 3000);
