const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileSize = canvas.width / gridSize;

let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let dx = 0;
let dy = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    snake.forEach(drawSnakePart);
    drawFood();
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'green';
    ctx.fillRect(snakePart.x * tileSize, snakePart.y * tileSize, tileSize, tileSize);
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function move() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * gridSize);
    food.y = Math.floor(Math.random() * gridSize);
}

function checkCollision() {
    if (
        snake[0].x < 0 || 
        snake[0].x >= gridSize || 
        snake[0].y < 0 || 
        snake[0].y >= gridSize ||
        snake.slice(1).some(part => part.x === snake[0].x && part.y === snake[0].y)
    ) {
        clearInterval(gameLoop);
        alert('Game Over!');
        document.location.href = document.location.href
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'ArrowUp' && dy !== 1) {
        dx = 0;
        dy = -1;
    } else if (key === 'ArrowDown' && dy !== -1) {
        dx = 0;
        dy = 1;
    } else if (key === 'ArrowLeft' && dx !== 1) {
        dx = -1;
        dy = 0;
    } else if (key === 'ArrowRight' && dx !== -1) {
        dx = 1;
        dy = 0;
    }
});

let gameLoop = setInterval(() => {
    move();
    checkCollision();
    draw();
}, 100);
