/**
 * Garden Game Module
 * Handles the interactive plant dragging game and oxygen meter
 */

class GardenGame {
  constructor() {
    this.oxygenLevel = 0;
    this.maxOxygen = 100;
    this.plantCount = 0;

    this.elements = {
      gardenPlot: document.getElementById("garden-plot"),
      oxygenFill: document.getElementById("oxygen-fill"),
      plants: document.querySelectorAll(".plant[draggable='true']")
    };

    this.init();
  }

  init() {
    if (!this.elements.gardenPlot) return;
    
    this.setupDragAndDrop();
    this.updateOxygenMeter();
  }

  setupDragAndDrop() {
    // Setup draggable plants
    this.elements.plants.forEach(plant => {
      plant.addEventListener('dragstart', (e) => {
        this.handleDragStart(e);
      });
    });

    // Setup drop zone
    this.elements.gardenPlot.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.elements.gardenPlot.classList.add('drag-over');
    });

    this.elements.gardenPlot.addEventListener('dragleave', (e) => {
      if (!this.elements.gardenPlot.contains(e.relatedTarget)) {
        this.elements.gardenPlot.classList.remove('drag-over');
      }
    });

    this.elements.gardenPlot.addEventListener('drop', (e) => {
      e.preventDefault();
      this.handleDrop(e);
      this.elements.gardenPlot.classList.remove('drag-over');
    });
  }

  handleDragStart(e) {
    const plantData = {
      emoji: e.target.textContent,
      oxygen: parseInt(e.target.dataset.oxygen) || 5
    };
    e.dataTransfer.setData('text/plain', JSON.stringify(plantData));
  }

  handleDrop(e) {
    try {
      const plantData = JSON.parse(e.dataTransfer.getData('text/plain'));
      this.addPlantToGarden(plantData);
    } catch (error) {
      console.error('Error parsing plant data:', error);
    }
  }

  addPlantToGarden(plantData) {
    // Create new plant element
    const newPlant = document.createElement('div');
    newPlant.className = 'plant planted';
    newPlant.textContent = plantData.emoji;
    newPlant.title = `Oxygen: +${plantData.oxygen}`;

    // Add click to remove functionality
    newPlant.addEventListener('click', () => {
      this.removePlantFromGarden(newPlant, plantData.oxygen);
    });

    // Add to garden
    this.elements.gardenPlot.appendChild(newPlant);
    
    // Update oxygen level
    this.oxygenLevel = Math.min(this.oxygenLevel + plantData.oxygen, this.maxOxygen);
    this.plantCount++;
    
    // Update display
    this.updateOxygenMeter();
    this.updateGardenMessage();
    
    // Add growth animation
    newPlant.style.animation = 'grow 0.5s ease forwards';
  }

  removePlantFromGarden(plantElement, oxygenValue) {
    // Remove plant with animation
    plantElement.style.animation = 'fadeOut 0.3s ease forwards';
    
    setTimeout(() => {
      plantElement.remove();
      this.oxygenLevel = Math.max(this.oxygenLevel - oxygenValue, 0);
      this.plantCount--;
      this.updateOxygenMeter();
      this.updateGardenMessage();
    }, 300);
  }

  updateOxygenMeter() {
    if (!this.elements.oxygenFill) return;
    
    const percentage = (this.oxygenLevel / this.maxOxygen) * 100;
    this.elements.oxygenFill.style.width = percentage + '%';
    this.elements.oxygenFill.textContent = Math.round(percentage) + '%';
    
    // Update color based on level
    if (percentage < 30) {
      this.elements.oxygenFill.style.background = '#ef4444';
    } else if (percentage < 70) {
      this.elements.oxygenFill.style.background = '#f59e0b';
    } else {
      this.elements.oxygenFill.style.background = 'var(--primary-color)';
    }
  }

  updateGardenMessage() {
    const messageElement = this.elements.gardenPlot.querySelector('p');
    if (!messageElement) return;

    if (this.plantCount === 0) {
      messageElement.textContent = 'Drop plants here 🌼';
    } else if (this.plantCount < 5) {
      messageElement.textContent = `Great start! ${this.plantCount} plants growing 🌱`;
    } else if (this.plantCount < 10) {
      messageElement.textContent = `Beautiful garden! ${this.plantCount} plants 🌸`;
    } else {
      messageElement.textContent = `Amazing ecosystem! ${this.plantCount} plants 🌳`;
    }
  }

  // Public methods for external control
  clearGarden() {
    const plantedElements = this.elements.gardenPlot.querySelectorAll('.plant.planted');
    plantedElements.forEach(plant => plant.remove());
    this.oxygenLevel = 0;
    this.plantCount = 0;
    this.updateOxygenMeter();
    this.updateGardenMessage();
  }

  getGardenStats() {
    return {
      oxygenLevel: this.oxygenLevel,
      plantCount: this.plantCount,
      oxygenPercentage: (this.oxygenLevel / this.maxOxygen) * 100
    };
  }

  // Auto-plant for demo
  autoPlant(count = 5) {
    const plantTypes = [
      { emoji: '🌷', oxygen: 5 },
      { emoji: '🌳', oxygen: 10 },
      { emoji: '🌻', oxygen: 7 },
      { emoji: '🌵', oxygen: 3 },
      { emoji: '🍀', oxygen: 8 }
    ];

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const randomPlant = plantTypes[Math.floor(Math.random() * plantTypes.length)];
        this.addPlantToGarden(randomPlant);
      }, i * 500);
    }
  }
}

// Initialize garden game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.gardenGame = new GardenGame();
});

export default GardenGame;