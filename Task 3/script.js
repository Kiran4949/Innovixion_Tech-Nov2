const quizData = [
    {
        question: 'Which animal is known as the King of the Jungle?',
        options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
        answer: 'Lion',
    },
    {
        question: 'What is the largest planet in our solar system?',
        options: ['Mars', 'Saturn', 'Jupiter', 'Neptune'],
        answer: 'Jupiter',
    },
    {
        question: 'Which is the largest ocean on Earth?',
        options: ['Pacific Ocean', 'Indian Ocean', 'Atlantic Ocean', 'Arctic Ocean'],
        answer: 'Pacific Ocean',
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
        answer: 'Mars',
    },
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      answer: 'Paris',
    },
  ];
  
  const quizHeaderElement = document.getElementById('quiz-header');
  const startButton = document.getElementById('startButton');
  const quizQuestionElement = document.getElementById('quiz-question');
  const quizOptionsElement = document.getElementById('quiz-options');
  const quizButtonContainer = document.getElementById('quiz-button-container');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  const quizResultElement = document.getElementById('quiz-result');
  
  let currentQuestion = 0;
  let score = 0;
  const userAnswers = [];
  
  function startQuiz() {
    startButton.classList.add('hide');
    quizQuestionElement.classList.remove('hide');
    quizOptionsElement.classList.remove('hide');
    quizButtonContainer.classList.remove('hide');
    displayQuestion();
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    quizHeaderElement.textContent = `Question ${currentQuestion + 1}`;
    quizQuestionElement.textContent = questionData.question;
    quizOptionsElement.innerHTML = '';
  
    questionData.options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.className = 'quiz-option';
      optionElement.textContent = option;
      optionElement.setAttribute('data-index', index);
      optionElement.addEventListener('click', handleOptionClick);
      quizOptionsElement.appendChild(optionElement);
    });
  }
  
  function handleOptionClick(event) {
    const selectedOptionIndex = event.target.getAttribute('data-index');
    const selectedOption = quizData[currentQuestion].options[selectedOptionIndex];
  
    userAnswers[currentQuestion] = selectedOption;
  
    if (selectedOption === quizData[currentQuestion].answer) {
      score++;
    }
  
    currentQuestion++;
  
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
  
  function displayResult() {
    quizQuestionElement.classList.add('hide'); // Hide the question element
    quizOptionsElement.innerHTML = '';
    retryButton.classList.remove('hide');
    showAnswerButton.classList.remove('hide');
    quizResultElement.classList.remove('hide');
    quizResultElement.textContent = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers.length = 0; // Clear user's answers
    quizQuestionElement.classList.remove('hide'); // Show the question element
    retryButton.classList.add('hide');
    showAnswerButton.classList.add('hide');
    quizResultElement.classList.add('hide');
    displayQuestion();
  }
  
  function showAnswer() {
    quizQuestionElement.classList.add('hide');
    quizOptionsElement.innerHTML = '';
  
    let answersHtml = '';
  
    for (let i = 0; i < quizData.length; i++) {
      const userAnswer = i < userAnswers.length ? 'Your Answer: ' + (userAnswers[i] || 'Not answered') : '';
      answersHtml += `
        <p>
          <strong>Question:</strong> ${quizData[i].question}<br>
          <strong>Correct Answer:</strong> ${quizData[i].answer}<br>
          ${userAnswer}
        </p>
      `;
    }
  
    quizResultElement.innerHTML = `
      <p>Answers:</p>
      ${answersHtml}
    `;
  
    retryButton.classList.remove('hide');
    showAnswerButton.classList.add('hide');
    quizResultElement.classList.remove('hide');
  }
  
  startButton.addEventListener('click', startQuiz);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  