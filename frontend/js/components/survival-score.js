/**
 * Survival Score Module
 * Handles Earth's survival metrics: air quality, water, biodiversity
 */

class SurvivalScore {
  constructor() {
    this.scores = {
      air: 0,
      water: 0,
      biodiversity: 0
    };

    this.elements = {
      airBar: document.getElementById("airBar"),
      waterBar: document.getElementById("waterBar"),
      bioBar: document.getElementById("bioBar"),
      finalScore: document.getElementById("finalScore"),
      scoreMessage: document.getElementById("scoreMessage")
    };

    this.messages = {
      critical: "🚨 Critical! Earth needs immediate action!",
      poor: "😰 Poor conditions. We must act now!",
      fair: "😐 Fair. There's room for improvement.",
      good: "😊 Good progress! Keep it up!",
      excellent: "🌟 Excellent! Earth is thriving!"
    };

    this.init();
  }

  init() {
    if (!this.elements.airBar) return;
    
    // Start with random initial values for demo
    this.updateScores({
      air: Math.random() * 60 + 20,
      water: Math.random() * 70 + 15,
      biodiversity: Math.random() * 50 + 25
    });
  }

  updateScores(newScores) {
    // Update individual scores
    Object.keys(newScores).forEach(key => {
      if (this.scores.hasOwnProperty(key)) {
        this.scores[key] = Math.max(0, Math.min(100, newScores[key]));
      }
    });

    // Animate the bars
    this.animateBars();
    
    // Calculate and display final score
    this.calculateFinalScore();
  }

  animateBars() {
    const bars = [
      { element: this.elements.airBar, value: this.scores.air },
      { element: this.elements.waterBar, value: this.scores.water },
      { element: this.elements.bioBar, value: this.scores.biodiversity }
    ];

    bars.forEach(({ element, value }, index) => {
      if (!element) return;
      
      setTimeout(() => {
        element.style.width = value + '%';
        element.textContent = Math.round(value) + '%';
        
        // Color coding based on score
        if (value < 30) {
          element.style.background = '#ef4444';
        } else if (value < 50) {
          element.style.background = '#f59e0b';
        } else if (value < 70) {
          element.style.background = '#eab308';
        } else {
          element.style.background = 'var(--primary-color)';
        }
      }, index * 200);
    });
  }

  calculateFinalScore() {
    const totalScore = (this.scores.air + this.scores.water + this.scores.biodiversity) / 3;
    
    setTimeout(() => {
      if (this.elements.finalScore) {
        this.elements.finalScore.textContent = `Survival Score: ${Math.round(totalScore)}%`;
      }
      
      if (this.elements.scoreMessage) {
        this.elements.scoreMessage.textContent = this.getScoreMessage(totalScore);
      }
    }, 600);

    return totalScore;
  }

  getScoreMessage(score) {
    if (score < 20) return this.messages.critical;
    if (score < 40) return this.messages.poor;
    if (score < 60) return this.messages.fair;
    if (score < 80) return this.messages.good;
    return this.messages.excellent;
  }

  // Public methods for external interaction
  improveAirQuality(amount = 10) {
    this.updateScores({ air: this.scores.air + amount });
  }

  improveWaterQuality(amount = 10) {
    this.updateScores({ water: this.scores.water + amount });
  }

  improveBiodiversity(amount = 10) {
    this.updateScores({ biodiversity: this.scores.biodiversity + amount });
  }

  // Simulate environmental actions
  simulateAction(action) {
    switch (action) {
      case 'plant-tree':
        this.updateScores({
          air: this.scores.air + 5,
          biodiversity: this.scores.biodiversity + 8
        });
        break;
      case 'clean-water':
        this.updateScores({
          water: this.scores.water + 10
        });
        break;
      case 'reduce-pollution':
        this.updateScores({
          air: this.scores.air + 8,
          water: this.scores.water + 5
        });
        break;
      case 'protect-wildlife':
        this.updateScores({
          biodiversity: this.scores.biodiversity + 12
        });
        break;
      case 'renewable-energy':
        this.updateScores({
          air: this.scores.air + 15,
          water: this.scores.water + 3
        });
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  // Reset scores
  reset() {
    this.updateScores({
      air: 0,
      water: 0,
      biodiversity: 0
    });
  }

  // Get current state
  getCurrentScores() {
    return { ...this.scores };
  }

  // Auto-improve for demo
  startAutoImprovement(interval = 3000) {
    const actions = ['plant-tree', 'clean-water', 'reduce-pollution', 'protect-wildlife', 'renewable-energy'];
    
    this.autoInterval = setInterval(() => {
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      this.simulateAction(randomAction);
    }, interval);
  }

  stopAutoImprovement() {
    if (this.autoInterval) {
      clearInterval(this.autoInterval);
      this.autoInterval = null;
    }
  }
}

// Initialize survival score when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.survivalScore = new SurvivalScore();
});

export default SurvivalScore;