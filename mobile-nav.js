// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function () {
      // Toggle active class on hamburger button
      mobileToggle.classList.toggle('active');

      // Toggle active class on nav menu
      navMenu.classList.toggle('active');

      // Prevent body scroll when menu is open
      body.classList.toggle('menu-open');
    });

    // Close menu when clicking on nav links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });
  }
});
