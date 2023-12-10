const board = document.getElementById('board');
const rows = 5;
const cols = 6;
const totalLights = 10;
const difficultyRadios = document.querySelectorAll('input[name="difficulty"]');
const customOptions = document.getElementById('customOptions');
const clickCounter = document.getElementById('clickCounter');
const timerDisplay = document.getElementById('timer');



let clickCount = 0;
let timerInterval;
let timerRunning = false;
let seconds = 0;

function startTimer() {
	timerRunning = true;
	timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
	seconds++;
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	timerDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function handleButtonClick(event) {
	if (!timerRunning) {
		startTimer();
	}
	const button = event.target;
	const index = Array.from(buttons).indexOf(button);
	
	toggleButton(button);
	toggleButton(buttons[index - 1]);
	toggleButton(buttons[index + 1]);
	toggleButton(buttons[index - cols]);
	toggleButton(buttons[index + cols]);

	clickCount++;
	clickCounter.textContent = clickCount;
}

for (let i = 0; i < rows * cols; i++) {
	const button = document.createElement('button');
	button.classList.add('btn');
	board.appendChild(button);
}

const buttons = document.querySelectorAll('.btn');

for (let i = 0; i < totalLights; i++) {
  	let randomIndex = Math.floor(Math.random() * (rows * cols));
	buttons[randomIndex].classList.add('active');
}

function handleButtonClick(event) {
	const button = event.target;
	const index = Array.from(buttons).indexOf(button);
	
	toggleButton(button);
	toggleButton(buttons[index - 1]);
	toggleButton(buttons[index + 1]);
	toggleButton(buttons[index - cols]);
	toggleButton(buttons[index + cols]); 
	}

function toggleButton(button) {
	if (button) {
		button.classList.toggle('active');
	}
}

buttons.forEach(button => {
	button.addEventListener('click', handleButtonClick);
});

difficultyRadios.forEach(radio => {
	radio.addEventListener('change', function() {
    	customOptions.style.display = this.value === 'custom' ? 'block' : 'none';
    	if (this.value !== 'custom') {
    		setDifficulty(this.value);
    	}
	});
});

document.getElementById('applyCustom').addEventListener('click', function() {
	const rows = parseInt(document.getElementById('customRows').value);
	const cols = parseInt(document.getElementById('customCols').value);
	const lights = parseInt(document.getElementById('customLights').value);

  	if (rows > 0 && cols > 0 && lights > 0 && lights < rows * cols) {
    	setDifficulty('custom', rows, cols, lights);
	} else {
    	alert('Ingrese valores válidos para filas, columnas y luces.');
	}
});

function setDifficulty(difficulty, rows, cols, lights) {
	resetBoard();

	switch (difficulty) {
    case 'easy':
    	createBoard(5, 6, 10);
    	break;
    case 'medium':
    	createBoard(6, 6, 6);
    	break;
    case 'hard':
    	createBoard(10, 10, 20);
    	break;
    case 'custom':
    	createBoard(rows, cols, lights);
    	break;
    default:
    	break;
}
}

function resetBoard() {
	const board = document.getElementById('board');
	board.innerHTML = '';
	}

function createBoard(rows, cols, totalLights) {
	const board = document.getElementById('board');
	board.style.gridTemplateColumns = `repeat(${cols}, 50px)`;

  	for (let i = 0; i < rows * cols; i++) {
		const button = document.createElement('button');
		button.classList.add('btn');
		board.appendChild(button);
}

	const buttons = document.querySelectorAll('.btn');

	for (let i = 0; i < totalLights; i++) {
    	let randomIndex = Math.floor(Math.random() * (rows * cols));
    	buttons[randomIndex].classList.add('active');
	}

	buttons.forEach(button => {
    	button.addEventListener('click', handleButtonClick);
	});
}

