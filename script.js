const questions = [
    {
        question: "Which in HTML tag is used to create a hyperlink?",
        options: ["link tag", "a tag", "href tag", "url tag"],
        correct: 1
    },
    {
        question: "Which attribute is used to specify an image?",
        options: ["link", "scr", "alt", "href"],
        correct: 1
    },
    {
        question: "What does CSS stands for?",
        options: ["Computer Style Sheests", "Creative Style System", "Cascading Style Sheets", "Colorful Style Sheets"],
        correct: 2
    },
    {
        question: "How do you declare a Javascript variable?",
        options: ["variable x", "var x", "v x", "declare x"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let quizCompleted = false;

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const questionElement = document.querySelector('.question');
const optionsContainer = document.querySelector('.options');
const nextButton = document.querySelector('.next-btn');
const questionNumberElement = document.querySelector('.question-number');
const scoreElement = document.querySelector('.score');
const finalScoreElement = document.querySelector('.percentage');
const restartButton = document.querySelector('.restart-btn');

function loadQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    questionNumberElement.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.innerHTML = `
            <span>${option}</span>
            <svg class="feedback-icon correct" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#22c55e" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <svg class="feedback-icon wrong" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#ef4444" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `;
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });

    nextButton.style.display = 'none';
}

function selectAnswer(index) {
    const options = document.querySelectorAll('.option');
    const correct = questions[currentQuestion].correct;

    options.forEach(option => {
        option.classList.add('disabled');
    });

    if (index === correct) {
        options[index].classList.add('correct');
        score++;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        options[index].classList.add('wrong');
        options[correct].classList.add('correct');
    }

    nextButton.style.display = 'block';
}

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    const percentage = Math.round((score / questions.length) * 100);
    finalScoreElement.textContent = `${percentage}%`;
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    quizCompleted = false;
    scoreElement.textContent = 'Score: 0';
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    loadQuestion();
}

nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

restartButton.addEventListener('click', resetQuiz);

// Start the quiz
loadQuestion();