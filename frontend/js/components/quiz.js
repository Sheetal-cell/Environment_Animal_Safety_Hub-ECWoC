/**
 * Quiz Module - Climate Quiz Battle
 * Handles quiz functionality, scoring, and AI interaction
 */

class QuizModule {
  constructor() {
    this.quizData = [
      {
        q: "Which gas causes global warming the most?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: 1
      },
      {
        q: "Which is a renewable energy source?",
        options: ["Coal", "Solar", "Oil", "Gas"],
        answer: 1
      },
      {
        q: "Main cause of deforestation?",
        options: ["Recycling", "Tree planting", "Agriculture", "Rain"],
        answer: 2
      }
    ];

    this.index = 0;
    this.score = 0;
    this.combo = 0;
    this.time = 10;
    this.timer = null;

    this.elements = {
      question: document.getElementById("question"),
      options: document.querySelectorAll(".option"),
      scoreEl: document.getElementById("score"),
      comboEl: document.getElementById("combo"),
      timerEl: document.getElementById("timer"),
      aiResult: document.getElementById("ai-result"),
      nextBtn: document.getElementById("nextBtn")
    };

    this.init();
  }

  init() {
    if (!this.elements.question) return;
    
    this.bindEvents();
    this.loadQuestion();
  }

  bindEvents() {
    if (this.elements.nextBtn) {
      this.elements.nextBtn.onclick = () => this.nextQuestion();
    }
  }

  loadQuestion() {
    this.clearTimer();
    this.time = 10;
    this.elements.timerEl.textContent = this.time;

    const q = this.quizData[this.index];
    this.elements.question.textContent = q.q;

    this.elements.options.forEach((btn, i) => {
      btn.textContent = q.options[i];
      btn.className = "option";
      btn.onclick = () => this.selectAnswer(i);
    });

    if (this.elements.aiResult) {
      this.elements.aiResult.textContent = "Thinking...";
    }
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.time--;
      if (this.elements.timerEl) {
        this.elements.timerEl.textContent = this.time;
      }
      if (this.time === 0) {
        this.clearTimer();
        this.combo = 0;
        if (this.elements.comboEl) {
          this.elements.comboEl.textContent = this.combo;
        }
        this.aiTurn();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  selectAnswer(i) {
    this.clearTimer();
    const correct = this.quizData[this.index].answer;

    if (i === correct) {
      this.elements.options[i].classList.add("correct");
      this.score += 10 + this.combo * 5;
      this.combo++;
    } else {
      this.elements.options[i].classList.add("wrong");
      this.elements.options[correct].classList.add("correct");
      this.combo = 0;
    }

    if (this.elements.scoreEl) {
      this.elements.scoreEl.textContent = this.score;
    }
    if (this.elements.comboEl) {
      this.elements.comboEl.textContent = this.combo;
    }
    this.aiTurn();
  }

  aiTurn() {
    if (this.elements.aiResult) {
      this.elements.aiResult.textContent = Math.random() > 0.5
        ? "AI answered correctly 🤖✔️"
        : "AI answered wrong 🤖❌";
    }
  }

  nextQuestion() {
    this.index = (this.index + 1) % this.quizData.length;
    this.loadQuestion();
  }
}

// Initialize quiz when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new QuizModule();
});

export default QuizModule;