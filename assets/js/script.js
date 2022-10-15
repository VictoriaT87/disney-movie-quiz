const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const quizSection = document.getElementById('quiz');
const questionSection = document.getElementById('question');
const answerBtns = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const counter = document.getElementById('counter');
const progressText = document.getElementById('progress-text');
const progressBarFull = document.getElementById('progress-bar-full');
const form = document.getElementById('user-form');
const resultsBtn = document.getElementById('results-btn');
const restartBtn = document.getElementById('restart-btn');

let user = document.getElementById("username");

let score = 0;
let currentQuestion = 0;
let max_questions = 10;
let availableQuestions = [];

function handleSubmit(event) {
    event.preventDefault();

    username = document.getElementById('username').value;

    if (username == '') {
        let errorDiv = document.getElementById('errors');
        errorDiv.innerHTML = "<p>Please enter a username!</p>";
    } else {
        startGame();
    }
}

startButton.addEventListener('click', handleSubmit);
nextBtn.addEventListener('click', () => {
    currentQuestion++;
    nextQuestion();
});
resultsBtn.addEventListener('click', results);
restartBtn.addEventListener('click', restart);

function startGame() {
    startButton.classList.add('hide');
    document.getElementById('logo').style.display = "none";
    counter.style.display = "flex";
    form.style.display = "none";

    currentQuestion = 0;

    shuffleQuestions = myQuestions.sort(() => Math.random() - 0.5);

    quizSection.classList.remove('hide');
    nextQuestion();
}

function showQuestion(myQuestions) {
    questionSection.innerHTML = `<img src=${myQuestions.question} id="quiz-image">`;

    myQuestions.answers.forEach(answer => {

        const button = document.createElement("button");
        button.innerText = answer.text;
        button.className = "btn";

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer)
        answerBtns.appendChild(button);
    });

}

function nextQuestion() {
    availableQuestions = [myQuestions.question];
    width = 10
    progressText.innerText = `Question ${currentQuestion+1}/${max_questions}`;
    progressBarFull.style.width = `${(currentQuestion/max_questions) * 100}%`;
    resetForNextQuestion();
    showQuestion(shuffleQuestions[currentQuestion]);
}

function resetForNextQuestion() {
    clearStatusClass(document.body);
    nextBtn.classList.add('hide');
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(event) {
    const selectedAnswer = event.target;
    const correctAnswer = selectedAnswer.dataset.correct;

    if (selectedAnswer.dataset.correct) {
        score += 1;
    }

    Array.from(answerBtns.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });

    if (shuffleQuestions.length > currentQuestion + 1) {
        nextBtn.classList.remove('hide');
    } else {
        nextBtn.innerText = 'Results';
        counter.style.display = "none";
        restartBtn.classList.remove('hide');
        results();
    }
}

function results() {
    answerBtns.style.display = "none";

    if (score < 3) {
        questionSection.innerHTML = `<div id="results-div"><p id="result-text">Sorry ${user.value}, you scored ${score} out of ${max_questions}.<br>Please try again!</p></div>`;
    } else if (score < 6) {
        questionSection.innerHTML = `<div id="results-div"><p id="result-text">Not bad ${user.value}, you scored ${score} out of ${max_questions}!<br>Please try again!</p></div>`;
    }  else {
        questionSection.innerHTML = `<div id="results-div"><p id="result-text">Well done ${user.value}, you scored ${score} out of ${max_questions}!<br>Disney Master!</p></div>`;
    }
    
}

function restart() {
    currentQuestion = 0;
    score = 0;
    location.reload(true);
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');

    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

const myQuestions = [{
        question: 'assets/images/mulan.jpg',
        answers: [{
                text: 'Aladdin',
                correct: false
            },
            {
                text: 'Zootopia',
                correct: false
            },
            {
                text: 'Mulan',
                correct: true
            },
            {
                text: 'Moana',
                correct: false
            }
        ]
    },
    {
        question: 'assets/images/princessfrog.jpg',
        answers: [{
                text: 'Tangled',
                correct: false
            },
            {
                text: 'The Princess and the Frog',
                correct: true
            },
            {
                text: 'Pocahontas',
                correct: false
            },
            {
                text: 'Bambi',
                correct: false
            }
        ]
    },
    {
        question: 'assets/images/batb.jpg',
        answers: [{
                text: 'The Little Mermaid',
                correct: false
            },
            {
                text: 'Moana',
                correct: false
            },
            {
                text: 'Beauty and the Beast',
                correct: true
            },
            {
                text: 'The Lion King',
                correct: false
            }
        ]
    },
    {
        question: 'assets/images/hercules.jpg',
        answers: [{
                text: 'Ratatouille',
                correct: false
            },
            {
                text: 'Big Hero 6',
                correct: false
            },
            {
                text: 'Moana',
                correct: false
            },
            {
                text: 'Hercules',
                correct: true
            }
        ]
    },
    {
        question: 'assets/images/tangled.jpg',
        answers: [{
                text: 'Tangled',
                correct: true
            },
            {
                text: 'Wall-E',
                correct: false
            },
            {
                text: 'Monsters Inc.',
                correct: false
            },
            {
                text: 'Encanto',
                correct: false
            }
        ]
    },
    {
        question: 'assets/images/lilo.jpg',
        answers: [{
                text: 'Brave',
                correct: false
            },
            {
                text: 'Turning Red',
                correct: false
            },
            {
                text: 'Monsters University',
                correct: false
            },
            {
                text: 'Lilo and Stitch',
                correct: true
            }
        ]
    },
    {
        question: 'assets/images/toy-story.jpg',
        answers: [{
                text: 'Toy Story',
                correct: true
            },
            {
                text: 'The Incredibles',
                correct: false
            },
            {
                text: 'Wreck-It Ralph',
                correct: false
            },
            {
                text: 'The Good Dinosaur',
                correct: false
            }
        ]
    },
    {
        question: 'assets/images/aladdin.jpg',
        answers: [{
                text: '101 Dalmations',
                correct: false
            },
            {
                text: 'Zootopia',
                correct: false
            },
            {
                text: 'Aladdin',
                correct: true
            },
            {
                text: 'The Jungle Book',
                correct: false
            }
        ]
    },
    {
        question: 'assets/images/emperors-new-groove.jpg',
        answers: [{
                text: 'Tarzan',
                correct: false
            },
            {
                text: 'Lilo and Stitch',
                correct: false
            },
            {
                text: 'Hercules',
                correct: false
            },
            {
                text: 'Emperors New Groove',
                correct: true
            }
        ]
    },
    {
        question: 'assets/images/lionking.jpg',
        answers: [{
                text: 'The Lion King',
                correct: true
            },
            {
                text: 'The Jungle Book',
                correct: false
            },
            {
                text: 'Zootopia',
                correct: false
            },
            {
                text: 'Brother Bear',
                correct: false
            }
        ]
    },

];