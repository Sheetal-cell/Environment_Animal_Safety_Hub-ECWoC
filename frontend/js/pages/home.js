/**
 * Home Page JavaScript
 * Implements parallax scroll effect for hero background
 */

document.addEventListener('DOMContentLoaded', function() {
  initHeroParallax();
});

/**
 * Initialize parallax effect for hero background
 * The background moves slower than the scroll, creating depth
 */
function initHeroParallax() {
  const heroSection = document.querySelector('.hero-section');
  const heroBgElements = document.querySelector('.hero-bg-elements');
  
  // Exit if elements don't exist
  if (!heroSection || !heroBgElements) {
    return;
  }
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return;
  }
  
  // Add parallax-active class
  heroBgElements.classList.add('parallax-active');
  
  // Parallax speed factor (0.3 = 30% of scroll speed)
  const parallaxSpeed = 0.3;
  
  // Throttle scroll events for performance
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroRect = heroSection.getBoundingClientRect();
    
    // Only apply parallax when hero is visible
    if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
      const offset = scrolled * parallaxSpeed;
      heroBgElements.style.setProperty('--parallax-offset', `${offset}px`);
    }
    
    ticking = false;
  }
  
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  // Add scroll listener
  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Initial call to set position
  updateParallax();
}
