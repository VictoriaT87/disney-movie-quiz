const startButton = document.getElementById('start-btn');
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

let user = document.getElementById('username');
let errorDiv = document.getElementById('errors');

let shuffleQuestions;
let score = 0;
let currentQuestion = 0;
let maxQuestions = 10;
let width = 0;


function startGame() {
    startButton.classList.add('hide');
    document.getElementById('logo').style.display = "none";
    counter.style.display = "flex";
    form.style.display = "none";
    answerBtns.style.display = "grid";

    currentQuestion = 0;

    shuffleQuestions = myQuestions.sort(() => Math.random() - 0.5);

    quizSection.classList.remove('hide');
    nextQuestion();
}

function handleSubmit(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;

    if (username.trim() === '') {
        errorDiv.innerHTML = "<p>Please enter a username!</p>";
    } else if (username.length <= Number(2)) {
        errorDiv.innerHTML = "<p>Username must have 3 or more characters</p>";
    } else if (username.length > Number(8)) {
        errorDiv.innerHTML = "<p>Username must have 8 or less characters</p>";
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


function showQuestion(myQuestions) {
    questionSection.innerHTML = `<img src=${myQuestions.question} id="quiz-image">`;

    myQuestions.answers.forEach(answer => {

        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add('btn', 'btn-hover');
        button.onclick = highlight;

        function highlight() {
            button.style.borderColor = '#B6C7FB';
            button.style.borderStyle = 'inset';
        }

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);
        answerBtns.appendChild(button);
    });
}

function nextQuestion() {
    width += 10;
    progressText.innerText = `Question ${currentQuestion+1}/${maxQuestions}`;
    progressBarFull.style.width = `${width}%`;
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

    if (correctAnswer) {
        score += 1;
    }

    Array.from(answerBtns.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true;
        button.classList.remove('btn-hover');
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
        questionSection.innerHTML = `<div id="results-div"><p id="result-text">Sorry ${user.value}, you scored ${score} out of ${maxQuestions}.<br>Please try again!</p></div>`;
    } else if (score < 6) {
        questionSection.innerHTML = `<div id="results-div"><p id="result-text">Not bad ${user.value}, you scored ${score} out of ${maxQuestions}!<br>Please try again!</p></div>`;
    } else {
        questionSection.innerHTML = `<div id="results-div"><p id="result-text">Well done ${user.value}, you scored ${score} out of ${maxQuestions}!<br>Disney Master!</p></div>`;
    }

}

function restart() {
    currentQuestion = 0;
    score = 0;
    window.location.reload(true);
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

/**
 * Remove all hover effects on mobile, found here:
 * https://stackoverflow.com/questions/23885255/how-to-remove-ignore-hover-css-style-on-touch-devices
 */
function watchForHover() {
    // lastTouchTime is used for ignoring emulated mousemove events
    let lastTouchTime = 0;

    function enableHover() {
        if (new Date() - lastTouchTime < 500) return;
        document.body.classList.add('hasHover');
    }

    function disableHover() {
        document.body.classList.remove('hasHover');
    }

    function updateLastTouchTime() {
        lastTouchTime = new Date();
    }

    document.addEventListener('touchstart', updateLastTouchTime, true);
    document.addEventListener('touchstart', disableHover, true);
    document.addEventListener('mousemove', enableHover, true);

    enableHover();
}

watchForHover();

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