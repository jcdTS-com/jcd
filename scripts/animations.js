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
