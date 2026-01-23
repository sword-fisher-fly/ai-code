let gameState = {
    board: Array(8).fill().map(() => Array(8).fill(0)),
    score: 0,
    won: false,
    over: false,
    canMove: true
};

const gameBoardElement = document.getElementById('gameBoard');
const scoreElement = document.getElementById('score');
const newGameButton = document.getElementById('newGame');
const gameMessageElement = document.getElementById('gameMessage');

function init() {
    createBoard();
    bindEvents();
    newGame();
}

function createBoard() {
    gameBoardElement.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell empty';
            cell.id = `cell-${i}-${j}`;
            gameBoardElement.appendChild(cell);
        }
    }
}

function updateBoard() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            const value = gameState.board[i][j];

            cell.textContent = value === 0 ? '' : value;

            cell.className = 'cell';
            if (value === 0) {
                cell.classList.add('empty');
            } else {
                cell.classList.add(`cell-${value}`);
            }
        }
    }

    scoreElement.textContent = gameState.score;

    if (gameState.won) {
        showMessage('恭喜！你达到了2024！', true);
    } else if (gameState.over) {
        showMessage('游戏结束！没有更多移动了。', false);
    } else {
        hideMessage();
    }
}

function showMessage(text, isWin) {
    gameMessageElement.innerHTML = `
        <h2>${isWin ? '🎉 恭喜！' : '💔 游戏结束'}</h2>
        <p>${text}</p>
        <p>最终分数: ${gameState.score}</p>
        <button onclick="newGame()" class="btn btn-primary">再玩一次</button>
    `;
    gameMessageElement.classList.remove('hidden');
}

function hideMessage() {
    gameMessageElement.classList.add('hidden');
}

function newGame() {
    if (typeof startNewGame === 'function') {
        startNewGame().then(() => {
            getGameState();
        });
    } else {
        console.log('Starting new game...');
        getGameState();
    }
}

function getGameState() {
    if (typeof window.getGameState === 'function') {
        window.getGameState();
    }
    fetchGameState();
}

function fetchGameState() {
    fetch('/api/game')
        .then(response => response.json())
        .then(data => {
            gameState = data;
            updateBoard();
        })
        .catch(error => {
            console.log('Game running in embedded mode');
        });
}

function makeMove(direction) {
    if (gameState.over || !gameState.canMove) {
        return;
    }

    fetch(`/api/move?direction=${direction}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        gameState = data;
        updateBoard();
    })
    .catch(error => {
        console.log('Making move via binding:', direction);
        if (typeof window.makeMove === 'function') {
            window.makeMove(direction);
        }
        setTimeout(fetchGameState, 100);
    });
}

function bindEvents() {
    newGameButton.addEventListener('click', newGame);

    document.addEventListener('keydown', (e) => {
        let direction = null;

        switch(e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                direction = 'up';
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                direction = 'down';
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                direction = 'left';
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                direction = 'right';
                break;
        }

        if (direction) {
            e.preventDefault();
            makeMove(direction);
        }
    });

    if (typeof window !== 'undefined') {
        window.addEventListener('gameStateUpdate', (event) => {
            gameState = event.detail;
            updateBoard();
        });
    }
}

init();
