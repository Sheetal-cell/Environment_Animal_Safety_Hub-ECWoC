/**
 * Environmental Effects Module
 * Handles background animations: birds, rain, leaves, sunlight
 */

class EnvironmentalEffects {
  constructor() {
    this.elements = {
      birdsLayer: document.querySelector('.birds-layer'),
      rainLayer: document.querySelector('.rain-layer'),
      leavesLayer: document.querySelector('.leaves-layer'),
      sunGlow: document.querySelector('.sun-glow')
    };

    this.intervals = {
      birds: null,
      rain: null,
      leaves: null
    };

    this.init();
  }

  init() {
    this.enableSunlight();
    this.startLeaves(25);
    this.startBirdSpawning();
  }

  // Bird spawning functionality
  spawnBirds() {
    if (!this.elements.birdsLayer) return;
    
    const bird = document.createElement('div');
    bird.className = 'bird';
    bird.textContent = '🕊️';
    bird.style.top = Math.random() * 50 + '%';
    
    this.elements.birdsLayer.appendChild(bird);
    
    // Remove bird after animation completes
    setTimeout(() => {
      if (bird.parentNode) {
        bird.remove();
      }
    }, 15000);
  }

  startBirdSpawning(interval = 8000) {
    this.stopBirdSpawning();
    this.intervals.birds = setInterval(() => {
      this.spawnBirds();
    }, interval);
  }

  stopBirdSpawning() {
    if (this.intervals.birds) {
      clearInterval(this.intervals.birds);
      this.intervals.birds = null;
    }
  }

  // Rain functionality
  startRain(intensity = 80) {
    if (!this.elements.rainLayer) return;
    
    this.elements.rainLayer.innerHTML = '';
    
    for (let i = 0; i < intensity; i++) {
      const drop = document.createElement('div');
      drop.className = 'rain-drop';
      drop.style.left = Math.random() * 100 + 'vw';
      drop.style.animationDelay = Math.random() + 's';
      this.elements.rainLayer.appendChild(drop);
    }
  }

  stopRain() {
    if (this.elements.rainLayer) {
      this.elements.rainLayer.innerHTML = '';
    }
  }

  // Leaves functionality
  startLeaves(count = 20) {
    if (!this.elements.leavesLayer) return;
    
    this.elements.leavesLayer.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      leaf.textContent = '🍃';
      leaf.style.left = Math.random() * 100 + 'vw';
      leaf.style.animationDelay = Math.random() * 10 + 's';
      this.elements.leavesLayer.appendChild(leaf);
    }
  }

  stopLeaves() {
    if (this.elements.leavesLayer) {
      this.elements.leavesLayer.innerHTML = '';
    }
  }

  // Sunlight functionality
  enableSunlight() {
    if (this.elements.sunGlow) {
      this.elements.sunGlow.classList.add('active');
    }
  }

  disableSunlight() {
    if (this.elements.sunGlow) {
      this.elements.sunGlow.classList.remove('active');
    }
  }

  // Weather control methods
  setWeather(type) {
    switch (type) {
      case 'sunny':
        this.stopRain();
        this.enableSunlight();
        this.startLeaves(15);
        this.startBirdSpawning(6000);
        break;
      case 'rainy':
        this.disableSunlight();
        this.startRain(100);
        this.stopLeaves();
        this.stopBirdSpawning();
        break;
      case 'cloudy':
        this.disableSunlight();
        this.stopRain();
        this.startLeaves(30);
        this.startBirdSpawning(12000);
        break;
      default:
        this.enableSunlight();
        this.startLeaves(25);
        this.startBirdSpawning();
    }
  }

  // Cleanup method
  destroy() {
    this.stopBirdSpawning();
    this.stopRain();
    this.stopLeaves();
    this.disableSunlight();
  }
}

// Initialize environmental effects when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.environmentalEffects = new EnvironmentalEffects();
});

export default EnvironmentalEffects;