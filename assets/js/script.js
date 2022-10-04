const startButton = document.getElementById('start-btn');

startButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide');

    document.getElementById("logo").style.visibility = "hidden";

    shuffleQuestions = myQuestions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
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