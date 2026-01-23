/**
 * Utility Functions Module
 * Common utility functions for the application
 */

class UtilityFunctions {
  constructor() {
    this.elements = {
      pageViewCounter: document.getElementById("page-view-count"),
      liveClock: document.getElementById("clock-time"),
      searchForm: document.getElementById("searchForm"),
      searchInput: document.getElementById("searchInput")
    };

    this.init();
  }

  init() {
    this.initPageViewCounter();
    this.initLiveClock();
    this.initSearch();
  }

  // Page View Counter
  initPageViewCounter() {
    if (!this.elements.pageViewCounter) return;

    const storageKey = 'ecolife-page-views';
    let pageViews = parseInt(localStorage.getItem(storageKey)) || 0;
    
    pageViews++;
    localStorage.setItem(storageKey, pageViews.toString());
    
    this.animateCounter(this.elements.pageViewCounter, pageViews);
  }

  animateCounter(element, targetValue, duration = 2000) {
    const startValue = 0;
    const increment = targetValue / (duration / 16);
    let currentValue = startValue;

    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(timer);
      }
      element.textContent = Math.floor(currentValue).toLocaleString();
    }, 16);
  }

  // Live Clock
  initLiveClock() {
    if (!this.elements.liveClock) return;

    this.updateClock();
    setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    this.elements.liveClock.textContent = timeString;
  }

  // Search functionality
  initSearch() {
    if (!this.elements.searchForm) return;

    this.elements.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSearch();
    });

    if (this.elements.searchInput) {
      this.elements.searchInput.addEventListener('input', (e) => {
        this.handleSearchInput(e.target.value);
      });
    }
  }

  handleSearch() {
    const query = this.elements.searchInput.value.trim();
    if (!query) return;

    const searchMappings = {
      'quiz': 'pages/quizzes/quiz.html',
      'animal': 'pages/animal-safety/adoption.html',
      'plant': 'pages/plant-care.html',
      'waste': 'pages/games/waste-game.html',
      'carbon': 'pages/carbon-footprint-calculator.html',
      'report': 'pages/report/report.html',
      'game': 'pages/games/rescure-game.html'
    };

    const lowerQuery = query.toLowerCase();
    for (const [keyword, url] of Object.entries(searchMappings)) {
      if (lowerQuery.includes(keyword)) {
        window.location.href = url;
        return;
      }
    }

    alert(`No direct match found for "${query}". Try browsing our sections!`);
  }

  handleSearchInput(value) {
    if (value.length > 50) {
      this.elements.searchInput.value = value.substring(0, 50);
    }
  }

  static formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }

  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.utilityFunctions = new UtilityFunctions();
});

export default UtilityFunctions;