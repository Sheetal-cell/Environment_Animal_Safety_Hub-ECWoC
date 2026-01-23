/**
 * Scroll Controls Module
 * Handles scroll-to-top and scroll-to-bottom button functionality
 */

class ScrollControls {
  constructor() {
    this.elements = {
      scrollToBottomBtn: document.getElementById("scrollToBottom"),
      backToTopBtn: document.getElementById("backToTop")
    };

    this.thresholds = {
      showBackToTop: 300,
      hideScrollToBottom: 200
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.handleScroll(); // Initial check
  }

  bindEvents() {
    // Scroll event listener
    window.addEventListener("scroll", () => {
      this.handleScroll();
    });

    // Scroll to bottom button
    if (this.elements.scrollToBottomBtn) {
      this.elements.scrollToBottomBtn.addEventListener("click", () => {
        this.scrollToBottom();
      });
    }

    // Back to top button
    if (this.elements.backToTopBtn) {
      this.elements.backToTopBtn.addEventListener("click", () => {
        this.scrollToTop();
      });
    }
  }

  handleScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    this.toggleBackToTopButton(scrollTop);
    this.toggleScrollToBottomButton(scrollTop, docHeight, winHeight);
  }

  toggleBackToTopButton(scrollTop) {
    if (!this.elements.backToTopBtn) return;

    if (scrollTop > this.thresholds.showBackToTop) {
      this.elements.backToTopBtn.style.display = "flex";
      this.elements.backToTopBtn.classList.add("visible");
    } else {
      this.elements.backToTopBtn.style.display = "none";
      this.elements.backToTopBtn.classList.remove("visible");
    }
  }

  toggleScrollToBottomButton(scrollTop, docHeight, winHeight) {
    if (!this.elements.scrollToBottomBtn) return;

    if (scrollTop < docHeight - winHeight - this.thresholds.hideScrollToBottom) {
      this.elements.scrollToBottomBtn.style.display = "flex";
    } else {
      this.elements.scrollToBottomBtn.style.display = "none";
    }
  }

  scrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });

    // Add clicked animation
    if (this.elements.scrollToBottomBtn) {
      this.elements.scrollToBottomBtn.classList.add("clicked");
      setTimeout(() => {
        this.elements.scrollToBottomBtn.classList.remove("clicked");
      }, 300);
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // Add clicked animation
    if (this.elements.backToTopBtn) {
      this.elements.backToTopBtn.classList.add("clicked");
      setTimeout(() => {
        this.elements.backToTopBtn.classList.remove("clicked");
      }, 300);
    }
  }

  // Utility methods
  scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  }

  // Get current scroll percentage
  getScrollPercentage() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    return (scrollTop / (docHeight - winHeight)) * 100;
  }

  // Check if element is in viewport
  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

// Initialize scroll controls when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.scrollControls = new ScrollControls();
});

export default ScrollControls;