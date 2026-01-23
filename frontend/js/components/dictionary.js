/**
 * Dictionary Module - Environmental Terms Dictionary
 * Handles dictionary search, display, and filtering
 */

class DictionaryModule {
  constructor() {
    this.dictionary = [
      { term: "Biodiversity", definition: "The variety of plant and animal life in the world or in a particular habitat.", category: "Environment" },
      { term: "Conservation", definition: "The protection and preservation of the natural environment and wildlife.", category: "Environment" },
      { term: "Endangered Species", definition: "Species at risk of extinction due to human activity or habitat loss.", category: "Wildlife" },
      { term: "Deforestation", definition: "The clearing or thinning of forests by humans.", category: "Environment" },
      { term: "Reforestation", definition: "The process of replanting trees in deforested areas.", category: "Environment" },
      { term: "Poaching", definition: "Illegal hunting or capturing of animals.", category: "Wildlife" },
      { term: "Sustainability", definition: "Meeting present needs without compromising future generations.", category: "Environment" },
      { term: "Ecosystem", definition: "A biological community of interacting organisms and their environment.", category: "Environment" },
      { term: "Wildlife Sanctuary", definition: "A protected area where wild animals live safely.", category: "Wildlife" },
      { term: "Endemic Species", definition: "Species native to a specific place and found nowhere else.", category: "Wildlife" },
      { term: "Climate Change", definition: "Long-term change in Earth's climate due to human or natural factors.", category: "Environment" },
      { term: "Pollution", definition: "Introduction of harmful substances into the environment.", category: "Environment" },
      { term: "Carbon Footprint", definition: "The total amount of greenhouse gases produced by human activities.", category: "Environment" },
      { term: "Habitat Fragmentation", definition: "The process where large habitats are broken into smaller isolated patches.", category: "Environment" },
      { term: "Overfishing", definition: "Catching too many fish from a body of water, reducing population.", category: "Wildlife" },
      { term: "Organic Farming", definition: "Farming without synthetic pesticides or fertilizers.", category: "Environment" },
      { term: "Urbanization", definition: "The increase of human populations in cities and towns.", category: "Environment" },
      { term: "Extinction", definition: "The permanent loss of a species from Earth.", category: "Wildlife" },
      { term: "Renewable Energy", definition: "Energy generated from natural resources that can be replenished.", category: "Environment" },
      { term: "Wildlife Corridor", definition: "Protected pathways connecting fragmented habitats.", category: "Wildlife" }
    ];

    this.elements = {
      grid: document.getElementById("dictionaryGrid"),
      searchInput: document.getElementById("searchInput"),
      noResults: document.getElementById("noResults")
    };

    this.init();
  }

  init() {
    if (!this.elements.grid) return;
    
    this.displayDictionary(this.dictionary);
    this.bindEvents();
  }

  bindEvents() {
    if (this.elements.searchInput) {
      this.elements.searchInput.addEventListener("input", (e) => {
        this.handleSearch(e.target.value);
      });
    }
  }

  displayDictionary(list) {
    this.elements.grid.innerHTML = "";
    
    if (list.length === 0) {
      if (this.elements.noResults) {
        this.elements.noResults.style.display = "block";
      }
      return;
    }
    
    if (this.elements.noResults) {
      this.elements.noResults.style.display = "none";
    }

    list.forEach((item, index) => {
      const card = this.createDictionaryCard(item, index);
      this.elements.grid.appendChild(card);
    });
  }

  createDictionaryCard(item, index) {
    const card = document.createElement("div");
    card.className = "dict-card";
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
      <h3>${item.term}</h3>
      <p>${item.definition}</p>
      <span class="category-tag">${item.category}</span>
    `;
    return card;
  }

  handleSearch(query) {
    const searchTerm = query.toLowerCase();
    const filtered = this.dictionary.filter(item => {
      return item.term.toLowerCase().includes(searchTerm) || 
             item.definition.toLowerCase().includes(searchTerm);
    });
    this.displayDictionary(filtered);
  }

  // Public method to add new terms
  addTerm(term, definition, category) {
    this.dictionary.push({ term, definition, category });
    this.displayDictionary(this.dictionary);
  }

  // Public method to filter by category
  filterByCategory(category) {
    const filtered = this.dictionary.filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    );
    this.displayDictionary(filtered);
  }
}

// Initialize dictionary when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.dictionaryModule = new DictionaryModule();
});

export default DictionaryModule;