const gameContainer = document.querySelector('.game-container');
const scoreElement = document.getElementById('score');
const gridWidth = 20;
const gridSize = gridWidth * gridWidth;
const cellSize = 20;
const startSpeed = 200;
let speed = startSpeed;
let direction = 'down';
let snake = [1, 0, 1];
let foodIndex = 0;
let score = 0;
let snakeLength = 3; 
let growing = 0; 

function createGrid() {
  for (let i = 0; i < gridSize; i++) {
    const cell = document.createElement('div');
    gameContainer.appendChild(cell);
  }
}

function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}

function removeFood() {
  const food = document.querySelector('.food');
  if (food) {
    food.remove();
  }
}

function updateSnake() {
  const head = snake[0];
  let newHead;

  switch (direction) {
    case 'right':
      newHead = head + 1;
      break;
    case 'left':
      newHead = head - 1;
      break;
    case 'up':
      newHead = head - gridWidth;
      break;
    case 'down':
      newHead = head + gridWidth;
      break;
  }

  if (newHead >= 0 && newHead < gridSize) {
    if (!snake.includes(newHead)) {
      snake.unshift(newHead);

      if (snake[0] === foodIndex) {
        score++;
        updateScore();
        removeFood(); 
        generateFood();
        growing += 1; 
        speed = Math.max(startSpeed - score * 5, 50);
      }

      if (growing === 0) {
        snake.pop();
      } else {
        growing--;
        snakeLength++; 
      }

    
      const snakeSegments = document.querySelectorAll('.snake');
      snakeSegments.forEach(segment => segment.remove());

  
      for (let i = 0; i < snake.length; i++) {
        const leftPercent = (snake[i] % gridWidth) / gridWidth * 100;
        const topPercent = Math.floor(snake[i] / gridWidth) / gridWidth * 100; 
        const segment = document.createElement('div');
        segment.style.left = `${leftPercent}%`;
        segment.style.top = `${topPercent}%`;
        segment.classList.add('snake');
        gameContainer.appendChild(segment);
      }
    } else {
      gameOver();
      return;
    }
  } else {
    gameOver();
    return;
  }

  setTimeout(updateSnake, speed);
}

function generateFood() {
  foodIndex = Math.floor(Math.random() * gridSize);
  const leftPercent = (foodIndex % gridWidth) / gridWidth * 100; 
  const topPercent = Math.floor(foodIndex / gridWidth) / gridWidth * 100; 
  const foodElement = document.createElement('div');
  foodElement.style.left = `${leftPercent}%`;
  foodElement.style.top = `${topPercent}%`;
  foodElement.classList.add('food');
  removeFood();
  gameContainer.appendChild(foodElement);
}

function gameOver() {
  alert(`Game Over! Your score: ${score}`);
  location.reload();
}

document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
  }
});

createGrid();
updateSnake();
generateFood();
updateScore();
