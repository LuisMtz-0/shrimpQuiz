const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "javascript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];
const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
const scoreEl = document.getElementById("score")
const timeEl = document.getElementById("timer")
const btnScore = document.getElementById("btnScore")
let currentQuiz = 0
let score = 0
let time = 180

displayTime(time);

const countDown = setInterval(() => {
  time--;
  displayTime(time);
  if (time == 0 || time < 1) {
    timeEnd()
    clearInterval(countDown);
  }
}, 1000);

function displayTime(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timeEl.innerHTML = `
  ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
  `;
}

loadQuiz()
function loadQuiz() {
  deselectAnswers()
  const currentQuizData = quizData[currentQuiz]
  questionEl.innerText = currentQuizData.question
  a_text.innerText = currentQuizData.a
  b_text.innerText = currentQuizData.b
  c_text.innerText = currentQuizData.c
  d_text.innerText = currentQuizData.d
}
function deselectAnswers() {
  answerEls.forEach(answerEl => answerEl.checked = false)
}
function getSelected() {
  let answer
  answerEls.forEach(answerEl => {
    if (answerEl.checked) {
      answer = answerEl.id
    }
  })
  return answer
}
submitBtn.addEventListener('click', () => {
  const answer = getSelected()
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++
      scoreEl.innerText = score
    }
    currentQuiz++
    console.log("This Works")
    if (currentQuiz < quizData.length) {
      loadQuiz()
    } else {
      quiz.innerHTML = `
         <h2 class="text-black text-3xl text-bold text-center m-0 p-4 underline">You answered <span class="text-black hover:text-rose-600"> ${score}/${quizData.length} </span>questions correctly</h2>
         <button class="items-center text-center w-full bg-sky-200 hover:bg-rose-400 h-8 rounded-xl text-3xl cursor-pointer focus:bg-sky-500" onclick="window.location.href='board.html';" >LeaderBoard</button>
         <button class="text-center w-full bg-sky-400 hover:bg-rose-400 h-20 rounded-b-xl text-3xl cursor-pointer focus:bg-green-500" onclick="location.reload()">Reload</button>
         `
      
    }
  }
})

function timeEnd() {
  quiz.innerHTML =
    `
  <h2 class="text-black text-bold text-3xl text-rose-900 text-center m-5"> Time is over! You have answered ${score}/${quizData.length} questions.</h2>
  <button class="text-center w-full bg-sky-400 hover:bg-rose-400 h-20 rounded-b-xl text-3xl cursor-pointer focus:bg-green-500" onclick="location.reload()">Reload</button>
  `
}

