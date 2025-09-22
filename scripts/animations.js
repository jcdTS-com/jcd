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
  // Special offset for reviews section to prevent title cutoff
  const offset = sectionId === 'reviews' ? 200 : 50;
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

// Reviews carousel functionality
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#reviews-container');
  const reviews = document.querySelectorAll('#reviews .main-preview');
  let currentIndex = 0;
  let autoPlayInterval;

  // Add navigation buttons
  const reviewsSection = document.querySelector('#reviews');
  reviewsSection.insertAdjacentHTML('beforeend', `
    <button class="review-nav-button prev" onclick="previousReview()">❮</button>
    <button class="review-nav-button next" onclick="nextReview()">❯</button>
  `);

  // Initialize first review
  reviews[currentIndex].classList.add('active');

  function showReview(index) {
    reviews.forEach(review => review.classList.remove('active'));
    reviews[index].classList.add('active');
    
    // Calculate offset based on screen width
    let reviewWidth = 400;
    let gap = 60;
    
    if (window.innerWidth <= 1024) {
      reviewWidth = 350;
      gap = 50;
    }
    if (window.innerWidth <= 768) {
      reviewWidth = 300;
      gap = 40;
    }
    if (window.innerWidth <= 480) {
      reviewWidth = 280;
      gap = 30;
    }
    
    const offset = -index * (reviewWidth + gap);
    container.style.transform = `translateX(${offset}px)`;
  }

  window.nextReview = () => {
    currentIndex = (currentIndex + 1) % reviews.length;
    showReview(currentIndex);
    resetAutoPlay();
  };

  window.previousReview = () => {
    currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    showReview(currentIndex);
    resetAutoPlay();
  };

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => nextReview(), 5000);
  }

  // Start autoplay
  resetAutoPlay();
});
