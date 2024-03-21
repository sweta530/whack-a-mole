const container = document.getElementById('container');
const scoreDisplay = document.getElementById('score');

for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    hole.innerHTML = `<img src="assets/hole.png" alt="hole">`;
    container.appendChild(hole);
}
let timerInterval;
let timeLeft = 60; 
let score = 0;
let moleInterval;

function setUpGame() {
    const startBtn = document.getElementById('startBtn');
    const newGameBtn = document.createElement('button');
    newGameBtn.textContent = 'New Game';
    newGameBtn.style.display = 'none'; 
    startBtn.style.display = 'none'; 
    document.querySelector('.game-details').appendChild(newGameBtn);

    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = timeLeft;

    const gameDetails = document.querySelector('.game-details');
    gameDetails.style.display = 'flex'; 

    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            endGame(newGameBtn);
        } else {
            timerDisplay.textContent = timeLeft;
        }
    }, 1000);

    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = score;

    const holes = document.querySelectorAll('.hole');
    holes.forEach(hole => {
        hole.addEventListener('click', bonk);
    });

    moleInterval = setInterval(randomMole, 1000);
    setTimeout(() => { 
        clearInterval(timerInterval);
        endGame(newGameBtn);
    }, 60000);
}

function endGame(newGameBtn) {
    clearInterval(moleInterval);
    newGameBtn.style.display = 'inline-block';
    newGameBtn.addEventListener('click', () => {
        resetGame(newGameBtn);
        setUpGame();
    });
    document.querySelectorAll('.hole').forEach(hole => {
        hole.innerHTML = `<img src="assets/hole.png" alt="hole">`;
    });
}

function resetGame(newGameBtn) {
    timeLeft = 60;
    document.getElementById('timer').textContent = timeLeft;
    score = 0;
    document.getElementById('score').textContent = score;
    newGameBtn.style.display = 'none';
}

function randomMole() {
    const holes = document.querySelectorAll('.hole');
    const randomIndex = Math.floor(Math.random() * holes.length);
    const hole = holes[randomIndex];

    const previousMole = document.querySelector('.mole');
    if (previousMole) {
        previousMole.parentNode.removeChild(previousMole);
    }

    const mole = document.createElement('div');
    mole.classList.add('mole');
    mole.innerHTML = '<img src="assets/mole.png" alt="mole">';
    hole.appendChild(mole);

    mole.style.display = 'block';

    setTimeout(() => {
        mole.style.display = 'none';
    }, 800); 
}

function bonk() {
    score++;
    this.classList.remove('mole'); 
    this.innerHTML = `<img src="assets/hole.png" alt="hole">`; 
    scoreDisplay.textContent = score;
}

