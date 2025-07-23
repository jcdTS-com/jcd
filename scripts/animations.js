document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  // Set initial stagger delays
  fadeElements.forEach((el, index) => {
    el.style.setProperty('--delay', `${0.2 + index * 0.1}s`);
  });

  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  // Observe all fade elements
  fadeElements.forEach(el => observer.observe(el));
});

function toggleBio() {
  const bioDropdown = document.querySelector('.bio-dropdown');
  const arrow = document.querySelector('.dropdown-arrow');
  bioDropdown.classList.toggle('active');
  arrow.classList.toggle('active');
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  const offset = 80; // Adjust if needed
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}
