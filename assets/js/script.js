const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const quizSection = document.getElementById('quiz');
const question = document.getElementById('question');
const answerBtns = document.getElementsByClassName('btns');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');


startButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide');

    document.getElementById("logo").style.visibility = "hidden";

    shuffleQuestions = myQuestions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    quizSection.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {

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
];