const quizData = [
  {
    question: 'How many bits make a byte?',
    options: ['16 bits ', '8 bits', '24 bits', '12 bits'],
    answer: '8 bits',
  },
  {
    question: 'The first search engine on the internet is',
    options: ['Archie', 'Google', 'Bing', 'Yahoo'],
    answer: 'Archie',
  },
  {
    question: 'The number of bits used by IPv6 address is',
    options: ['16', '32', '128', '64'],
    answer: '128',
  },
  {
    question: 'The first web browser invented in 1990 was',
    options: ['World Wide Web', 'Internet Explorer', 'Mosaic', 'Nexus'],
    answer: 'World Wide Web',
  },
  {
    question: 'Which technology is used to record cryptocurrency transactions?',
    options: [
      'Mining',
      'Digital Wallet',
      'Block Chain Technology',
      'Token',
    ],
    answer: 'Block Chain Technology',
  },
  {
    question: 'What is the chemical symbol for gold?',
    options: ['Au', 'Ag', 'Cu', 'Fe'],
    answer: 'Au',
  },
  {
    question: 'One of the advantages of information technology is',
    options: [
      'Streamline Communication',
      'Easy to Handle',
      'Above Two',
      'None',
    ],
    answer: 'Streamline Communication',
  },
  {
    question: 'The first computer virus was known as',
    options: ['Rabbit', 'Elk Cloner', 'SCA Virus', 'Creeper Program'],
    answer: 'Creeper Program',
  },
  {
    question: 'What technology is used to make telephone calls over the Internet possible?',
    options: [
      'Bluetooth',
      'VoIP',
      'Ethernet',
      'All Of The Above'
    ],
    answer: 'VoIP',
  },
  {
    question: 'What is the full form of (CPU)?',
    options: ['Central Processing Unit', 'Critical Processing Unit', 'Crucial Processing Unit', 'Central Printing Unit'],
    answer: 'Central Processing Unit',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
