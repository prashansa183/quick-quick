const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [ {
  "question": "Which of the following is the correct extension of the Python file?",
  "choice1": ".python",
  "choice2": ".pl",
  "choice3": ".py",
  "choice4": ".p",
  "answer": 3
},
{
  "question": "What do we use to define a block of code in Python language?",
  "choice1": "Key",
  "choice2": "Brackets",
  "choice3": "Indentation",
  "choice4": "None of these",
  "answer": 3
},
{
  "question": "Which character is used in Python to make a single line comment?",
  "choice1": "/",
  "choice2": "//",
  "choice3": "#",
  "choice4": "!",
  "answer": 3
},
{
  "question": "Which of the following functions is a built-in function in Python?",
  "choice1": "val()",
  "choice2": "print()",
  "choice3": "factorial()",
  "choice4": "sqrt()",
  "answer": 2
},
{
  "question": "What is the output of print(2**3)?",
  "choice1": "6",
  "choice2": "8",
  "choice3": "9",
  "choice4": "12",
  "answer": 2
},
{
  "question": "Which of the following is used to create an object in Python?",
  "choice1": "A class",
  "choice2": "An instance",
  "choice3": "A constructor",
  "choice4": "All of the above",
  "answer": 4
},
{
  "question": "Which of the following is the correct way to declare a variable in Python?",
  "choice1": "int x = 10",
  "choice2": "x = 10",
  "choice3": "x: int = 10",
  "choice4": "declare x = 10",
  "answer": 2
},
{
  "question": "What will be the output of the following code: print('hello'.upper())?",
  "choice1": "Hello",
  "choice2": "HELLO",
  "choice3": "hello",
  "choice4": "HeLLo",
  "answer": 2
},
{
  "question": "Which of the following methods can be used to add an element to a list in Python?",
  "choice1": "append()",
  "choice2": "add()",
  "choice3": "insert()",
  "choice4": "Both append() and insert()",
  "answer": 4
},
{
  "question": "How do you start writing a function in Python?",
  "choice1": "function myFunction():",
  "choice2": "def myFunction():",
  "choice3": "define myFunction():",
  "choice4": "def myFunction[]:",
  "answer": 2
}
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();