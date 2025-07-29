const quizData = {
  easy: [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: 1, hint: "It's even.", explainer: "2 + 2 equals 4." },
    { question: "Capital of India?", options: ["Mumbai", "Delhi", "Chennai", "Kolkata"], correctAnswer: 1, hint: "Starts with D.", explainer: "Delhi is the capital." },
    { question: "Color of the sky?", options: ["Red", "Blue", "Green", "Yellow"], correctAnswer: 1, hint: "Think day-time.", explainer: "The sky is blue due to Rayleigh scattering." },
    { question: "What comes after 5?", options: ["4", "6", "7", "3"], correctAnswer: 1, hint: "Basic counting.", explainer: "5 is followed by 6." },
    { question: "Which is a fruit?", options: ["Potato", "Carrot", "Banana", "Spinach"], correctAnswer: 2, hint: "Yellow fruit.", explainer: "Banana is a fruit." },
    { question: "Which animal barks?", options: ["Cat", "Dog", "Cow", "Tiger"], correctAnswer: 1, hint: "Pet animal.", explainer: "Dogs bark." },
    { question: "How many days in a week?", options: ["5", "6", "7", "8"], correctAnswer: 2, hint: "More than 6.", explainer: "There are 7 days in a week." },
    { question: "What do plants need to grow?", options: ["Water", "Music", "Plastic", "Gold"], correctAnswer: 0, hint: "Essential liquid.", explainer: "Plants need water." },
    { question: "Sun rises in the?", options: ["West", "North", "East", "South"], correctAnswer: 2, hint: "Opposite of west.", explainer: "Sun rises in the East." },
    { question: "What is H2O?", options: ["Oxygen", "Hydrogen", "Water", "Salt"], correctAnswer: 2, hint: "Life's need.", explainer: "H2O is the chemical formula for water." }
  ],

  medium: [
    { question: "Square root of 64?", options: ["6", "8", "10", "7"], correctAnswer: 1, hint: "Even number.", explainer: "8 * 8 = 64." },
    { question: "Language for browsers?", options: ["Java", "C", "Python", "JavaScript"], correctAnswer: 3, hint: "It's not Java.", explainer: "JavaScript runs in browsers." },
    { question: "Planet known as Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], correctAnswer: 2, hint: "Not Earth.", explainer: "Mars is called the Red Planet." },
    { question: "HTML stands for?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperTabular Markup Language", "None"], correctAnswer: 0, hint: "Starts with HyperText.", explainer: "HTML = HyperText Markup Language." },
    { question: "5 + 3 * 2 = ?", options: ["11", "16", "13", "10"], correctAnswer: 0, hint: "BODMAS rule.", explainer: "3*2 = 6, 6+5 = 11." },
    { question: "Fastest land animal?", options: ["Tiger", "Lion", "Cheetah", "Leopard"], correctAnswer: 2, hint: "Starts with C.", explainer: "Cheetah is the fastest." },
    { question: "CSS used for?", options: ["Structure", "Styling", "Logic", "Data"], correctAnswer: 1, hint: "Cascading...", explainer: "CSS styles HTML." },
    { question: "RAM is?", options: ["Permanent", "Temporary", "Read-only", "Slow"], correctAnswer: 1, hint: "Volatile memory.", explainer: "RAM is temporary memory." },
    { question: "Largest ocean?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], correctAnswer: 1, hint: "Starts with P.", explainer: "Pacific Ocean is the largest." },
    { question: "Convert binary 1010 to decimal:", options: ["10", "11", "8", "9"], correctAnswer: 0, hint: "Think base-2.", explainer: "1010 in binary = 10 in decimal." }
  ],

  hard: [
    { question: "Time complexity of quicksort worst case?", options: ["O(n)", "O(log n)", "O(n log n)", "O(n^2)"], correctAnswer: 3, hint: "Not good.", explainer: "Worst case is O(n^2) when pivot is worst." },
    { question: "CPU stands for?", options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Performance Unit"], correctAnswer: 1, hint: "Think 'Processing'.", explainer: "CPU = Central Processing Unit." },
    { question: "What is React?", options: ["Framework", "Library", "Language", "Tool"], correctAnswer: 1, hint: "Library by Facebook.", explainer: "React is a JS library." },
    { question: "Heaviest element?", options: ["Uranium", "Hydrogen", "Gold", "Iron"], correctAnswer: 0, hint: "Atomic bomb...", explainer: "Uranium is heavy." },
    { question: "HTTPS means?", options: ["HyperText Transfer Secure", "HighText Secure Protocol", "HTML Transfer Protocol Secure", "None"], correctAnswer: 0, hint: "Secure HTTP.", explainer: "HTTPS = HTTP + SSL." },
    { question: "What is recursion?", options: ["Loop", "Self-calling function", "Class", "Condition"], correctAnswer: 1, hint: "Function in itself.", explainer: "Recursion is when a function calls itself." },
    { question: "Git command to clone repo?", options: ["git push", "git pull", "git clone", "git init"], correctAnswer: 2, hint: "C-l-o-n-e", explainer: "`git clone` clones a repo." },
    { question: "Largest prime under 20?", options: ["13", "17", "19", "15"], correctAnswer: 2, hint: "Last one.", explainer: "19 is the largest prime under 20." },
    { question: "Newton's 2nd Law?", options: ["F=ma", "E=mc²", "a²+b²=c²", "V=IR"], correctAnswer: 0, hint: "Force = mass x acceleration.", explainer: "F = ma is Newton's 2nd law." },
    { question: "Which is not OOP concept?", options: ["Inheritance", "Encapsulation", "Abstraction", "Compilation"], correctAnswer: 3, hint: "It's about execution.", explainer: "Compilation is not an OOP concept." }
  ]
};

let userName = '';
let selectedDifficulty = 'easy';
let questionCount = 5;
let currentQuestionIndex = 0;
let selectedQuestions = [];
let score = 0;
let timer;
let totalTime = 30;
let timeRemaining = totalTime;

// Start the quiz
function startQuiz() {
  userName = document.getElementById('userName').value.trim();
  selectedDifficulty = document.getElementById('difficulty').value;
  questionCount = parseInt(document.getElementById('questionCount').value);

  if (!userName || isNaN(questionCount) || questionCount < 1 || questionCount > 10) {
    alert("Please enter valid name and question count (1–10)");
    return;
  }

  selectedQuestions = quizData[selectedDifficulty]
    .sort(() => 0.5 - Math.random())
    .slice(0, questionCount);

  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  currentQuestionIndex = 0;
  score = 0;

  loadQuestion();
  startTimer();
}

// Load question into DOM
function loadQuestion() {
  const question = selectedQuestions[currentQuestionIndex];

  document.getElementById('question-box').innerHTML = `
    <h2>Q${currentQuestionIndex + 1}: ${question.question}</h2>
    ${question.image ? `<img src="${question.image}" style="max-width:200px;" />` : ''}
    ${question.hint ? `<p class="hint">💡 Hint: ${question.hint}</p>` : ''}
  `;

  document.getElementById('options-box').innerHTML = question.options.map((opt, i) =>
    `<label><input type="radio" name="option" value="${i}"> ${opt}</label><br>`
  ).join('');
}

// Submit selected answer
function submitAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');

  if (!selectedOption) {
    alert("Select an option!");
    return;
  }

  const answer = parseInt(selectedOption.value);
  if (answer === selectedQuestions[currentQuestionIndex].correctAnswer) score++;
  stopTimer();

  if (currentQuestionIndex < selectedQuestions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
    resetTimer();
    startTimer();
  } else {
    showResult();
  }
}

// Show final result
function showResult() {
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('result-screen').style.display = 'block';

  document.getElementById('result-screen').innerHTML = `
    <h2>Thank you, ${userName}!</h2>
    <p>Your Score: ${score}/${selectedQuestions.length}</p>
    <ul>${selectedQuestions.map((q, i) =>
      `<li>${i + 1}. ${q.question}<br><strong>Correct:</strong> ${q.options[q.correctAnswer]}<br>${q.explainer ? '<em>Explanation:</em> ' + q.explainer : ''}</li>`
    ).join('')}</ul>
    <button onclick="location.reload()">Restart</button>
  `;
}

// Timer Functions
function startTimer() {
  timeRemaining = totalTime;
  updateProgressBar();
  timer = setInterval(() => {
    timeRemaining--;
    updateProgressBar();
    if (timeRemaining <= 0) {
      clearInterval(timer);
      alert("Time's up!");
      submitAnswer();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeRemaining = totalTime;
  updateProgressBar();
}

function stopTimer() {
  clearInterval(timer);
}

function updateProgressBar() {
  const bar = document.getElementById("progress-bar");
  const percent = (timeRemaining / totalTime) * 100;
  bar.style.width = percent + "%";
  bar.style.backgroundColor = percent < 30 ? "red" : percent < 60 ? "orange" : "green";
}
