const board = document.getElementById('board');
const rows = 5;
const cols = 6;
const totalLights = 10;

// Crear el tablero
for (let i = 0; i < rows * cols; i++) {
  const button = document.createElement('button');
  button.classList.add('btn');
  board.appendChild(button);
}

const buttons = document.querySelectorAll('.btn');

// Encender luces aleatorias
for (let i = 0; i < totalLights; i++) {
  let randomIndex = Math.floor(Math.random() * (rows * cols));
  buttons[randomIndex].classList.add('active');
}

// Manejar el clic en el botón
function handleButtonClick(event) {
  const button = event.target;
  const index = Array.from(buttons).indexOf(button);
  
  toggleButton(button);
  toggleButton(buttons[index - 1]); // Izquierda
  toggleButton(buttons[index + 1]); // Derecha
  toggleButton(buttons[index - cols]); // Arriba
  toggleButton(buttons[index + cols]); // Abajo
}

// Alternar el estado del botón
function toggleButton(button) {
  if (button) {
    button.classList.toggle('active');
  }
}

// Agregar evento de clic a cada botón
buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

// ... (código previo)

const difficultyRadios = document.querySelectorAll('input[name="difficulty"]');
const customOptions = document.getElementById('customOptions');

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

// Resto del código
