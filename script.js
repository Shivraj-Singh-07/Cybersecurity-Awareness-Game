const questions = [{
        question: "Which of these passwords is the strongest?",
        answers: [
            { text: "password123", correct: false },
            { text: "Q2r$7v@Xz!", correct: true },
            { text: "myname2020", correct: false },
            { text: "abcdef", correct: false }
        ]
    },
    {
        question: "You receive an email saying your bank account is locked. It asks for your password. What should you do?",
        answers: [
            { text: "Reply with my password", correct: false },
            { text: "Click the link immediately", correct: false },
            { text: "Ignore the email or call the bank directly", correct: true },
            { text: "Forward it to my friends", correct: false }
        ]
    },
    {
        question: "What is Two-Factor Authentication (2FA)?",
        answers: [
            { text: "Using two different passwords", correct: false },
            { text: "Verification using password + extra code", correct: true },
            { text: "Changing password twice a day", correct: false },
            { text: "Logging in from two devices", correct: false }
        ]
    },
    {
        question: "Which website URL is likely safe?",
        answers: [
            { text: "http://bank-login.com", correct: false },
            { text: "https://yourbank.com", correct: true },
            { text: "http://secure-youraccount.com", correct: false },
            { text: "https://freemoney123.com", correct: false }
        ]
    }
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
        selectedButton.style.backgroundColor = '#00ff00'; // green
        score++;
    } else {
        selectedButton.style.backgroundColor = '#ff0000'; // red
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.style.backgroundColor = '#00ff00';
        }
    });

    scoreElement.innerText = `Score: ${score}`;
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerText = `Game Over! You scored ${score} out of ${questions.length}.`;
    nextButton.innerText = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startGame();
    }
});

startGame();