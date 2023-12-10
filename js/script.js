let clickCount = 0;
let timerStarted = false;
let timerInterval;
let seconds = 0;
let minutes = 0;
let boardSize = { rows: 5, cols: 6 };
let lightsCount = 10;

const clickCountElement = document.getElementById('clickCount');
const timerElement = document.getElementById('timer');
const board = document.getElementById('board');

function startGame() {
  const level = document.getElementById('level').value;
  if (level === 'easy') {
    boardSize = { rows: 5, cols: 6 };
    lightsCount = 10;
  } else if (level === 'medium') {
    boardSize = { rows: 6, cols: 6 };
    lightsCount = 6;
  } else if (level === 'hard') {
    boardSize = { rows: 10, cols: 10 };
    lightsCount = 20;
  } else if (level === 'custom') {
    const customRows = parseInt(prompt('Introduce el número de filas:', '5'), 10);
    const customCols = parseInt(prompt('Introduce el número de columnas:', '6'), 10);
    lightsCount = parseInt(prompt('Introduce el número de luces:', '10'), 10);

    if (Number.isInteger(customRows) && Number.isInteger(customCols) && Number.isInteger(lightsCount)
        && customRows > 0 && customCols > 0 && lightsCount < customRows * customCols) {
      boardSize = { rows: customRows, cols: customCols };
    } else {
      alert('Por favor, introduce valores válidos.');
      return;
    }
  }

  clickCount = 0;
  clickCountElement.textContent = clickCount;
  seconds = 0;
  minutes = 0;
  timerElement.textContent = '00:00';
  clearInterval(timerInterval);
  timerStarted = false;

  generateBoard();
}

function generateBoard() {
  board.innerHTML = '';
  const totalButtons = boardSize.rows * boardSize.cols;

  for (let i = 0; i < totalButtons; i++) {
    const button = document.createElement('button');
    button.classList.add('btn');
    if (i < lightsCount) {
      button.classList.add('active');
    }
    button.addEventListener('click', handleButtonClick);
    board.appendChild(button);
  }
}

function handleButtonClick(event) {
  if (!timerStarted) {
    startTimer();
  }

  const button = event.target;
  const buttons = document.querySelectorAll('.btn');
  const index = Array.from(buttons).indexOf(button);

  toggleButton(button);
  toggleButton(buttons[index - 1]); // Left
  toggleButton(buttons[index + 1]); // Right
  toggleButton(buttons[index - boardSize.cols]); // Up
  toggleButton(buttons[index + boardSize.cols]); // Down

  clickCount++;
  clickCountElement.textContent = clickCount;
}

function toggleButton(button) {
  if (button) {
    button.classList.toggle('active');
  }
}

function startTimer() {
  timerStarted = true;
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  seconds++;

  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }

  timerElement.textContent = `${padTime(minutes)}:${padTime(seconds)}`;
}

function padTime(time) {
  return time < 10 ? `0${time}` : time;
}
