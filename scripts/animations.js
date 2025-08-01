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

function toggleFlip() {
  const container = document.querySelector('.profile-container');
  container.classList.toggle('flipped');
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

function toggleReview(reviewId) {
  const truncated = document.getElementById(`truncated-${reviewId}`);
  const full = document.getElementById(`full-${reviewId}`);
  const button = document.getElementById(`read-more-${reviewId}`);
  
  if (full.classList.contains('active')) {
    full.classList.remove('active');
    truncated.style.display = 'block';
    button.textContent = 'Read more...';
  } else {
    full.classList.add('active');
    truncated.style.display = 'none';
    button.textContent = 'Read less';
  }
}

// Drag to scroll functionality for reviews
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('#reviews');
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.style.cursor = 'grabbing';
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.style.cursor = 'grab';
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.style.cursor = 'grab';
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const reviewsContainer = document.querySelector('#reviews-container');
  const originalReviews = document.querySelectorAll('#reviews-container .main-preview');
  
  // Clone reviews for seamless loop
  originalReviews.forEach(review => {
    const clone = review.cloneNode(true);
    reviewsContainer.appendChild(clone);
  });

  // Pause animation on user interaction
  reviewsContainer.addEventListener('mousedown', () => {
    reviewsContainer.style.animationPlayState = 'paused';
  });

  reviewsContainer.addEventListener('mouseup', () => {
    reviewsContainer.style.animationPlayState = 'running';
  });

  reviewsContainer.addEventListener('mouseleave', () => {
    reviewsContainer.style.animationPlayState = 'running';
  });
});
