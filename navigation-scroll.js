// Navigation scroll highlight functionality
document.addEventListener('DOMContentLoaded', function () {
  // Get all navigation links and sections
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  const sections = [];

  // Collect all sections that have corresponding nav links
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const sectionId = href.substring(1); // Remove the # symbol
    const section = document.getElementById(sectionId);
    if (section) {
      sections.push({
        id: sectionId,
        element: section,
        link: link,
      });
    }
  });

  // Function to update active navigation link
  function updateActiveNav() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;

    // Find the current active section
    let activeSection = null;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.element.offsetTop - headerHeight - 50;
      const sectionBottom = sectionTop + section.element.offsetHeight;

      // Check if section is in viewport
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSection = section;
        break;
      }
    }

    // If no section is active, check if we're at the top
    if (!activeSection && scrollPosition < 100) {
      // Remove all active states when at top
      navLinks.forEach(link => link.classList.remove('active'));
      return;
    }

    // If still no active section, find the closest one
    if (!activeSection) {
      let closestSection = null;
      let minDistance = Infinity;

      sections.forEach(section => {
        const sectionTop = section.element.offsetTop - headerHeight - 50;
        const distance = Math.abs(scrollPosition - sectionTop);

        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section;
        }
      });

      activeSection = closestSection;
    }

    // Update active states
    navLinks.forEach(link => link.classList.remove('active'));
    if (activeSection) {
      activeSection.link.classList.add('active');
    }
  }

  // Add scroll event listener with throttling for better performance
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateActiveNav);
      ticking = true;
      setTimeout(() => {
        ticking = false;
      }, 10);
    }
  }

  window.addEventListener('scroll', requestTick);

  // Initial check
  updateActiveNav();

  // Also update when hash changes
  window.addEventListener('hashchange', updateActiveNav);

  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerHeight =
          document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // Update URL hash
        history.pushState(null, null, `#${targetId}`);
      }
    });
  });
});
