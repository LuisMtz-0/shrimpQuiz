const quizData = [
  {
    question: "What is the correct JavaScript syntax to write 'Hello World'? ",
    a: "response.write(Hello World)",
    b:"Hello World",
    c:"document.write(Hello World)",
    d:"(Hello World)",
    correct: "c" 
  },
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "javascript",
    correct: "d",
  },
  {
    question: "Inside which HTML element do we put the javascript?",
    a: "<javascript>",
    b: "<js>",
    c: "<script>",
    d: "<scripting>",
    correct: "c"
  },
  {
    question: "An external JavaScript must contain the <script> tag",
    a: "True",
    b: "False",
    correct: "b"
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
    question: "How do you write a conditional statement for executing some statements only if 'i' is NOT equal to 5?",
    a: "if (i != 5)",
    b: "if =! 5 then",
    c: "if (i <> 5)",
    d: "if <>5",
    correct: "a",
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
  {
    question: "What Javascript element is used to get the value of an object and give the only the value?",
    a: "toString",
    b: "Value",
    c: "toBoolean",
    d: "toStringify",
    correct: "b"
  }
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
const leaderBtn = document.getElementById("leaderBtn")

let currentQuiz = 0
let score = 0
let time = 80
const points = document.getElementById("points")
let playerInfo = JSON.parse(localStorage.getItem("userInfo"))
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
      time+=10
      scoreEl.innerText = score
    } else{
      time-=10
    }
    currentQuiz++
    console.log("This Works")
    if (currentQuiz < quizData.length) {
      loadQuiz()
    } else {
      console.log(score)
      name = window.prompt("Enter a User name!!")
      let User= {
        name,
       score,  
     }
      localStorage.setItem("userInfo",JSON.stringify(User) )
      quiz.innerHTML = `
         <h2 class="text-black text-3xl text-bold text-center m-0 p-4 underline">You answered <span class="text-black hover:text-rose-600"> ${score}/${quizData.length} </span>questions correctly</h2>
         <button class="items-center text-center w-full bg-sky-200 hover:bg-rose-400 h-8 rounded-xl text-3xl cursor-pointer focus:bg-sky-500" onclick='leaderBoardEl(score, name)' id="boardEl">LeaderBoard</button>
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
function leaderBoardEl() {
  console.log(playerInfo);
  // let name = window.prompt("Enter a User name!!")

  // let User= {
  //    name,
  //   score,  
  // }
    
    

  // localStorage.setItem("userInfo",JSON.stringify(User) )
  quiz.innerHTML = 
  ` <div class="bg-gray-600 rounded-xl ">
  <header class="bg-slate-900 text-white text-center text-xl h-10">LeaderBoard</header>
  <div id="containerEl" class=" ">
    <div class="bg-slate-900 text-l text-red-400 flex justify-between border-2 border-sky-900 rounded-xl m-1 h-12">
      <div class="ml-4" id="player">${playerInfo.name}</div>
      <div class="mr-4" id="playerScore">${playerInfo.score}<span id="points"></span></div>
    </div>

    <div class="bg-slate-900 text-l text-red-400 flex justify-between border-2 border-sky-900 rounded-xl m-1 h-12">
      <div class="ml-4" id="player">${name}</div>
      <div class="mr-4" id="playerScore">${score} <span id="p1"></span></div>
    </div>

  <button class="text-center w-full bg-sky-400 hover:bg-rose-400 h-10 rounded-b-xl text-3xl cursor-pointer focus:bg-green-500" onclick="window.location.href='index.html';">Test</button>

</div>`
}

leaderBtn.addEventListener('click', leaderBoardEl)

