
const questions=[
 {q:"Where should vegetable peels go?",o:["Dry Waste","Wet Waste","Plastic","Glass"],a:1},
 {q:"Which item is recyclable?",o:["Food waste","Plastic bottle","Used tissue","Leaves"],a:1},
 {q:"Where does broken glass go?",o:["Wet","Dry","Hazardous","Plastic"],a:2},
 {q:"Best way to reduce waste?",o:["Burn it","Reuse items","Throw away","Ignore"],a:1},
 {q:"Which bin for paper?",o:["Wet","Dry","Hazardous","Medical"],a:1},
 {q:"Plastic bags harm because?",o:["They dissolve","They pollute","They help soil","They vanish"],a:1},
 {q:"What is composting?",o:["Burning waste","Recycling plastic","Turning waste to manure","Dumping trash"],a:2},
 {q:"Used batteries go to?",o:["Wet","Dry","Hazardous","Recycle bin"],a:2},
 {q:"Which helps environment?",o:["Littering","Segregation","Burning trash","Plastic use"],a:1},
 {q:"Wet waste mainly comes from?",o:["Kitchen","Bathroom","Road","Factory"],a:0}
];

let index=0,score=0,time=180,timer;
let answers = [];
let startTime = 0;
let questionTimestamps = [];
let paused = false;

// Progress Tracking
const PROGRESS_KEY = 'wasteManagementQuizProgress';

function saveProgress() {
    const progress = {
        currentIndex: index,
        answers: answers,
        score: score,
        remainingTime: time,
        timestamp: Date.now(),
        startTime: startTime,
        questionTimestamps: questionTimestamps,
        quizData: questions
    };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function loadProgress() {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) {
        const progress = JSON.parse(saved);
        index = progress.currentIndex || 0;
        answers = progress.answers || [];
        score = progress.score || 0;
        time = progress.remainingTime || 180;
        startTime = progress.startTime || Date.now();
        questionTimestamps = progress.questionTimestamps || [];
        return true;
    }
    return false;
}

function clearProgress() {
    localStorage.removeItem(PROGRESS_KEY);
}

function startQuiz(){
 answers = new Array(questions.length).fill(null);
 startTime = Date.now();
 questionTimestamps = [];
 paused = false;
 index = 0;
 score = 0;
 time = 180;
 startScreen.style.display="none";
 quizScreen.style.display="block";
 loadQuestion();
 startTimer();
}

function startTimer(){
 updateTime();
 timer=setInterval(()=>{
   time--;
   updateTime();
   if(time<=0){
     clearInterval(timer);
     showResult();
   }
 },1000);
}

function updateTime(){
 let m=Math.floor(time/60);
 let s=time%60;
 document.getElementById("time").textContent=`${m}:${s<10?'0':''}${s}`;
}

function loadQuestion(){
 let q=questions[index];
 question.textContent=`Q${index+1}. ${q.q}`;

 // Update progress bar
 const progressPercent = ((index + 1) / questions.length) * 100;
 document.getElementById('progressFill').style.width = `${progressPercent}%`;

 // Update metrics
 const timeSpent = Math.floor((Date.now() - startTime) / 1000);
 document.getElementById('timeSpent').textContent = `Time Spent: ${timeSpent}s`;
 document.getElementById('questionsCompleted').textContent = `Completed: ${index}/${questions.length}`;

 options.innerHTML="";
 q.o.forEach((opt,i)=>{
   let div=document.createElement("div");
   div.className="option";
   div.innerHTML=`<i class="fa-solid fa-trash"></i> ${opt}`;
   div.onclick=()=>selectOption(div,i);
   options.appendChild(div);
 });
}

function selectOption(el,i){
 document.querySelectorAll(".option").forEach(o=>o.classList.remove("selected"));
 el.classList.add("selected");
 el.dataset.correct=i===questions[index].a;
}

function nextQuestion(){
 let selected=document.querySelector(".option.selected");
 if(!selected) return alert("Please select an option 😊");
 if(selected.dataset.correct==="true") score++;

 // Record timestamp for this question
 questionTimestamps[index] = Date.now();

 // Save progress
 saveProgress();

 index++;
 if(index<questions.length) loadQuestion();
 else showResult();
}

function showResult(){
 clearInterval(timer);
 clearProgress();
 quizScreen.style.display="none";
 resultScreen.style.display="block";
 document.getElementById("score").textContent=`${score} / ${questions.length}`;
 remark.textContent =
   score>=8 ? "🌟 Waste Warrior!" :
   score>=5 ? "👍 Good Effort!" :
   "🌱 Keep Learning!";
}

function pauseQuiz() {
    if (paused) return;
    paused = true;
    clearInterval(timer);
    saveProgress();
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('resumeBtn').style.display = 'inline-block';
}

function resumeQuiz() {
    if (!paused) return;
    paused = false;
    startTimer();
    document.getElementById('pauseBtn').style.display = 'inline-block';
    document.getElementById('resumeBtn').style.display = 'none';
}
