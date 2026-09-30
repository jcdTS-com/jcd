window.addEventListener('DOMContentLoaded', () => {
  const topShadow = document.querySelector('.scroll-shadow-top');
  const bottomShadow = document.querySelector('.scroll-shadow-bottom');
  const maxOpacity = 1;
  const scrollThreshold = 300; // Distance for maximum opacity

  function updateScrollShadows() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollBottom = scrollHeight - (scrollTop + clientHeight);

    // Calculate opacities based on scroll position
    const topOpacity = Math.min(scrollTop / scrollThreshold, 1) * maxOpacity;
    const bottomOpacity = Math.min(scrollBottom / scrollThreshold, 1) * maxOpacity;

    // Apply opacities
    topShadow.style.opacity = topOpacity;
    bottomShadow.style.opacity = bottomOpacity;
  }

  window.addEventListener('scroll', updateScrollShadows);
  window.addEventListener('resize', updateScrollShadows);
  updateScrollShadows();
});
