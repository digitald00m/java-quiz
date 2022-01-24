// Create quiz
var startQuizEl = document.querySelector("#start-quiz-");
var startQuizBtnEl = document.querySelector("#start-quiz-btn");
var timerEl = document.querySelector("#timer");
var quizQuestionEl = document.querySelector("#quiz-questions");
var restartEl = document.querySelector("#resart")
var scoreEl = document.querySelector("#score"); 
var answerEl = document.querySelector("#the-answer");
var quizEl = document.querySelector("#quiz")

// Get High Score
var highNameEl = document.querySelector('#high-score-name')
var highEl = document.querySelector('#high-score')
highEl.textContent = JSON.parse(window.localStorage.getItem('highScore'));
highNameEl.textContent = localStorage.getItem('highScoreName');

var newScore;
var highScoreName;
var setHighScore;
var gameTime;
var setName;
var currentScore = gameTime
var currentQ;
var counter;

var QnA = [
    {
        question: " Who is Carti?",
        options: ["saveDisk.showItem", "localStorage.saveItem", "saveDisk.setItem", "localStorage.setItem"],
        correctA: "localStorage.setItem"
    },
    {
        question: "What symbols usally hold an Array?",
        options: ["  {   }  ", "  [  ]  ", "  (  )  ", "  |  |  "],
        correctA: "  [  ]  "
    },
    {
        question: "What does the debugger do to your code?",
        options: ["It removes the errors in the code", "It counts the number of errors in the code", "It pauses the code at that point", "It runs the code without errors"],
        correctA: "It pauses the code at that point"
    },
    {
        question: "What was JavaScript originally called?",
        options: ["Coffee", "Milk", "Sugar", "Mocha"],
        correctA: "Mocha"
    }
       
]

//Function start quiz
function beginQuiz() {
    counter = 60;
    currentQ = 0;
    displayMain()
    timeStart();
    itterateQuestion();
}

function displayMain() {
    startQuizEl.setAttribute("class", "hidden");
    quizEl.setAttribute("class", "quiz-questions")
}

var gameTime;
function timeStart() {
    gameTime = setInterval(function() {
        counter--;
        timerEl.textContent=counter;
        if(counter <=0 || currentQ > QnA.length){
            localStorage.setItem('playerScore', counter);
            newScore = scoreEl.textContent = localStorage.getItem('playerScore');
            highEl.textContent = JSON.parse(window.localStorage.getItem('highScore'));
            restartQuiz()
            clearInterval(gameTime)
            setHighScore()
        }
    },1000)
}

//checks to see if question was right or wrong
function checkAndItterate(){
    var prevA = this.textContent;
    if(prevA == QnA[currentQ-1].correctA){
        /// ADD 5 seconds/points if right and display correct. Remove 5 seconds/points if wrong
        counter = counter + 5;
        answerEl.textContent = 'Correct!';
    }else {
        counter = counter - 5;
        answerEl.textContent = 'Sorry :/';
    }
    itterateQuestion()
}

//Event listeners and Invocations
startQuizBtn.addEventListener("click", beginQuiz)
optionsEl.forEach(element=>{
    element.addEventListener("click", checkAndItterate);
})
restartEl.addEventListener("click", restartQuiz)
