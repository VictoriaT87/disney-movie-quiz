const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const quizSection = document.getElementById('quiz');
const questionSection = document.getElementById('question');
const answerBtns = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const counter = document.getElementById('counter');
const progressText = document.getElementById('progress-text');
const progressBarFull = document.getElementById('progress-bar-full');

let score = 0;
let currentQuestion = 0;
let max_questions = 10;
let availableQuestions = [];


startButton.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);

function startGame() {
    startButton.classList.add('hide');
    document.getElementById("logo").style.display = "none";
    counter.style.visibility="visible";

    shuffleQuestions = myQuestions.sort(() => Math.random() - 0.5);

    quizSection.classList.remove('hide');
    nextQuestion();   
}

function nextQuestion() {
    score = 0;
    currentQuestion++;
    availableQuestions = [myQuestions.question];
    progressText.innerText = `Question ${currentQuestion}/${max_questions}`;
    progressBarFull.style.width = `${(currentQuestion/max_questions) * 100}%`;
    reset();
    showQuestion(shuffleQuestions[currentQuestion]);
}

function showQuestion(question) {
    questionSection.innerHTML = `<img src=${question.question} class="image">`

    question.answers.forEach(answer => {

        const button = document.createElement("button");
        button.innerText = answer.text
        button.className = "btn";

        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerBtns.appendChild(button);
    })

}

function reset() {
    clearStatusClass(document.body);
    nextBtn.classList.add('hide');
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild)
    }
}


function selectAnswer(event) {
    const selectedAnswer = event.target;
    const correctAnswer = selectedAnswer.dataset.correct;

    setStatusClass(document.body, correctAnswer);

    Array.from(answerBtns.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestion + 1) {
        nextBtn.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('incorrect')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}

const myQuestions = [{
        question: 'assets/images/frozen.jpg',
        answers: [{
                text: 'Frozen',
                correct: true
            },
            {
                text: 'Mulan',
                correct: false
            },
            {
                text: 'Dumbo',
                correct: false
            },
            {
                text: 'Pinocchio',
                correct: false
            }
        ]
    },
    {
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
        question: 'assets/images/moana.jpg',
        answers: [{
                text: 'The Little Mermaid',
                correct: false
            },
            {
                text: 'Moana',
                correct: true
            },
            {
                text: 'The Jungle Book',
                correct: false
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
        question: 'assets/images/big-hero-6.jpg',
        answers: [{
                text: 'Big Hero 6',
                correct: true
            },
            {
                text: 'Wall-E',
                correct: false
            },
            {
                text: 'Monsters Inc.',
                correct: true
            },
            {
                text: 'Encanto',
                correct: false
            }
        ]
    },
    {
        question: 'assets/images/wall-e.jpg',
        answers: [{
                text: 'Brave',
                correct: false
            },
            {
                text: 'Turning Red',
                correct: false
            },
            {
                text: 'Cars',
                correct: true
            },
            {
                text: 'Wall-E',
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
                correct: true
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
                correct: true
            },
            {
                text: 'Emperors New Groove',
                correct: true
            }
        ]
    },

];