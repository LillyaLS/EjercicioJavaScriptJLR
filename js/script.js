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
