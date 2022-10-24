// Declare all variables used in the script
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


/**
 * Modal Box for Instructions - found on https://www.w3schools.com/howto/howto_css_modals.asp
 */
let modal = document.getElementById("instructions");
let instructionsBtn = document.getElementById("instructionsBtn");
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
instructionsBtn.onclick = function () {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

/** 
 * startGame function will hide the Disney logo, start button and username input,
 * and will show the answer buttons, quiz container and shuffle the questions from myQuestions array 
 */
function startGame() {
    instructionsBtn.classList.add('hide');
    startButton.classList.add('hide');
    document.getElementById('logo').style.display = "none";
    counter.style.display = "flex";
    form.style.display = "none";
    answerBtns.style.display = "grid";

    currentQuestion = 0;

    // Shuffle code taken from https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    // I tried to use The Fisher-Yates algorithim but couldn't get it to work. See Bug section in README.md
    shuffleQuestions = myQuestions.sort(() => Math.random() - 0.5);

    quizSection.classList.remove('hide');
    nextQuestion();
}

/**
 * Validate username.
 * Removes whitespace from input and throws errors if the username is too long or too short.
 * Run startGame
 */
function handleSubmit(event) {
    event.preventDefault();

    // Validate username
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

// Event listeners for control buttons
startButton.addEventListener('click', handleSubmit);
nextBtn.addEventListener('click', () => {
    currentQuestion++;
    nextQuestion();
});
resultsBtn.addEventListener('click', results);
restartBtn.addEventListener('click', restart);

/**
 * Pull the image path from myQuestions array and display on page.
 * Create buttons for each answer in myQuestions array and sets a highlight for the one clicked.
 * Append buttons to index.html
 */
function showQuestion(myQuestions) {
    questionSection.innerHTML = `<img src=${myQuestions.question} id="quiz-image">`;

    //create a button for each answer, add text to each from array
    myQuestions.answers.forEach(answer => {

        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add('btn', 'btn-hover');
        button.onclick = highlight;

        // when a button is clicked, highlight which was chosen with a border
        function highlight() {
            button.style.borderColor = '#B6C7FB';
            button.style.borderStyle = 'inset';
        }

        // If answer is correct, give the button the dataset correct and corresponding color in styles.css
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);
        answerBtns.appendChild(button);
    });
}

/**
 * When the Next button is pressed, update the progress bar by 10% width
 * Show the shuffled question and answers from myQuestion array
 * Clear the previous buttons
 */
function nextQuestion() {
    width += 10;
    progressText.innerText = `Question ${currentQuestion + 1}/${maxQuestions}`;
    progressBarFull.style.width = `${width}%`;
    resetForNextQuestion();
    showQuestion(shuffleQuestions[currentQuestion]);
}

/**
 * Clear the correct and incorrect class colors from buttons
 * Reset buttons for next question generation
 */
function resetForNextQuestion() {
    clearStatusClass(document.body);
    nextBtn.classList.add('hide');

    //remove buttons
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

/**
 * When an answer is selected, add 1 to the score for every correct answer,
 * add the correct and incorrect class to buttons for each answer and disable buttons.
 * Show Next Button until the array ends, then show results
 * Adapted from code-along tutorial (https://www.youtube.com/watch?v=riDzcEQbX6k)
 */
function selectAnswer(event) {
    const selectedAnswer = event.target;
    const correctAnswer = selectedAnswer.dataset.correct;

    if (correctAnswer) {
        score += 1;
    }

    // when a button is selected, add a color, disable them, remove hover effect
    Array.from(answerBtns.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true;
        button.classList.remove('btn-hover');
    });

    // add the next button as long as there is another question in array
    // when array of questions ends, show the results div and restart button
    if (shuffleQuestions.length > currentQuestion + 1) {
        nextBtn.classList.remove('hide');
    } else {
        nextBtn.innerText = 'Results';
        counter.style.display = "none";
        restartBtn.classList.remove('hide');
        results();
    }
}

/**
 * Create a div to hold the result text
 * Shows 3 different variations, depending on the user's score
 */
function results() {
    answerBtns.style.display = "none";

    if (score < 3) {
        questionSection.innerHTML = `<div id="results-div"><img src="assets/images/mickey-outline.png" alt="Mickey Mouse Head Outline" /><p id="result-text">Sorry ${user.value}, you scored ${score} out of ${maxQuestions}.<br>Please try again!</p></div>`;
    } else if (score < 10) {
        questionSection.innerHTML = `<div id="results-div"><img src="assets/images/mickey-outline.png" alt="Mickey Mouse Head Outline" /><p id="result-text">Not bad ${user.value}, you scored ${score} out of ${maxQuestions}!<br>Please try again!</p></div>`;
    } else {
        questionSection.innerHTML = `<div id="results-div"><img src="assets/images/mickey-outline.png" alt="Mickey Mouse Head Outline" /><p id="result-text">Well done ${user.value}, you scored ${score} out of ${maxQuestions}!<br>Disney Master!</p></div>`;
    }

}

/**
 * Reload the window to restart the quiz
 * called when the Restart button is clicked
 */
function restart() {
    window.location.reload(true);
}

/**
 * Add the class "correct" or "incorrect" to the buttons when selected
 * Adapted from code-along tutorial (https://www.youtube.com/watch?v=riDzcEQbX6k)
 */
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

/**
 * Clear class "correct" or "incorrect" on the buttons
 * Adapted from code-along tutorial (https://www.youtube.com/watch?v=riDzcEQbX6k)
 */
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

// Question array
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