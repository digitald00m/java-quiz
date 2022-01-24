// Create quiz
var startEl = document.querySelector("#start");
var startBtn = document.querySelector("#start-btn");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var restartEl = document.querySelector("#resart")
var scoreEl = document.querySelector("#score"); 
var answerEl = document.querySelector("#the-answer");
var testEl = document.querySelector("test")

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
    testEl.setAttribute("class", "test")
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

// used to reset the game html after playing
function restartQuiz(){
    testEl.setAttribute("class", "hidden");
    startEl.setAttribute("class", "start");
    answerEl.setAttribute("class", "hidden")
    clearInterval(gameTime);
    timerEl.textContent = 60;
    
}

// Var to pull playerscore from storage. Just wanted it closer so you can see it.
var playerScore = localStorage.getItem('playerScore');
var highScore = localStorage.getItem('highScore')

//Set high score but i cant get timeStart function to call setHighScore
function setHighScore(){
 if(counter > localStorage.getItem('highScore') ){
    localStorage.setItem('highScore', counter);
    var highScoreName = window.prompt("New High Score! Please enter your name");
    localStorage.setItem('highScoreName', [highScoreName]);
    highEl.textContent = localStorage.getItem('highScore')
    highNameEl.textContent = localStorage.getItem('highScoreName')
  }else{    
    console.log('why is it not?')
}   
}

//pulls question and displays it
function itterateQuestion(){
if(currentQ < QnA.length){
    questionEl.textContent = QnA[currentQ].question;
    for(i=0;i<optionsEl.length;i++){
        optionsEl[i].textContent = QnA[currentQ].options[i]
    }
}
currentQ++;
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
startBtn.addEventListener("click", startBtn)
optionsEl.forEach(element=>{
    element.addEventListener("click", checkAndItterate);
})
restartEl.addEventListener("click", restartQuiz)
