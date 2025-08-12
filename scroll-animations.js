// Scroll Animation System
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    this.init();
  }

  init() {
    // Create Intersection Observer
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, this.observerOptions);

    // Setup animations after DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () =>
        this.setupAnimations()
      );
    } else {
      this.setupAnimations();
    }
  }

  setupAnimations() {
    console.log('Setting up scroll animations...');
    // Add animation classes to elements
    this.addAnimationClasses();

    // Start observing elements
    this.observeElements();
  }

  addAnimationClasses() {
    // Hero Section
    const heroContent = document.querySelector('.hero-left');
    const heroImage = document.querySelector('.hero-right');
    if (heroContent)
      heroContent.classList.add('scroll-animation', 'hero-content');
    if (heroImage) heroImage.classList.add('scroll-animation', 'hero-image');

    // Section titles
    const sectionTitles = document.querySelectorAll('h2, .section-title');
    sectionTitles.forEach(title => {
      if (!title.classList.contains('scroll-animation')) {
        title.classList.add('scroll-animation', 'section-title');
      }
    });

    // Stats Section - add specific handling
    const statsImage = document.querySelector('.stats-image');
    const statsText = document.querySelector('.stats-text');
    console.log('Stats elements found:', { statsImage, statsText });
    if (statsImage) {
      statsImage.classList.add('scroll-animation');
    }
    if (statsText) {
      statsText.classList.add('scroll-animation');
    }

    // Feature cards specifically
    const featureCards = document.querySelectorAll('.feature-card');
    console.log('Feature cards found:', featureCards.length);
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

    // Images in content
    const contentImages = document.querySelectorAll('img:not(.hero img)');
    contentImages.forEach((img, index) => {
      if (index % 2 === 0) {
        img.classList.add('scroll-animation', 'fade-in-left');
      } else {
        img.classList.add('scroll-animation', 'fade-in-right');
      }
    });

    // Contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      const contactElements = contactSection.querySelectorAll('div, p');
      contactElements.forEach((element, index) => {
        if (index % 2 === 0) {
          element.classList.add('scroll-animation', 'fade-in-left');
        } else {
          element.classList.add('scroll-animation', 'fade-in-right');
        }
      });
    }

    // Footer elements
    const footerElements = document.querySelectorAll('footer div, footer p');
    footerElements.forEach((element, index) => {
      element.classList.add('scroll-animation', 'fade-in', 'stagger-animation');
    });

    // Generic elements with common classes
    const genericElements = document.querySelectorAll(
      '.box, .container > div, .content, .info'
    );
    genericElements.forEach((element, index) => {
      if (!element.classList.contains('scroll-animation')) {
        element.classList.add(
          'scroll-animation',
          'fade-in',
          'stagger-animation'
        );
      }
    });

    // Text blocks
    const textBlocks = document.querySelectorAll('p');
    textBlocks.forEach((p, index) => {
      if (
        p.textContent.length > 50 &&
        !p.classList.contains('scroll-animation')
      ) {
        p.classList.add('scroll-animation', 'fade-in');
      }
    });

    // Lists
    const lists = document.querySelectorAll('ul, ol');
    lists.forEach(list => {
      list.classList.add('scroll-animation', 'slide-up');
      const listItems = list.querySelectorAll('li');
      listItems.forEach((li, index) => {
        li.classList.add('scroll-animation', 'fade-in', 'stagger-animation');
      });
    });
  }

  observeElements() {
    // Observe all elements with scroll-animation class
    const animatedElements = document.querySelectorAll('.scroll-animation');
    console.log('Total elements to animate:', animatedElements.length);
    animatedElements.forEach(element => {
      this.observer.observe(element);
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
}

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // Wait a bit for other scripts to load
  setTimeout(() => {
    const scrollAnimations = new ScrollAnimations();

    // Make it available globally for debugging
    window.scrollAnimations = scrollAnimations;
  }, 100);
});

// Alternative initialization if DOMContentLoaded already fired
if (document.readyState !== 'loading') {
  setTimeout(() => {
    const scrollAnimations = new ScrollAnimations();
    window.scrollAnimations = scrollAnimations;
  }, 100);
}
