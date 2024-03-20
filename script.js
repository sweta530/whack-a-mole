const container = document.getElementById('container');
const scoreDisplay = document.getElementById('score');
let score = 0;

for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    hole.innerHTML = `<img src="assets/hole.png" alt="hole">`;
    container.appendChild(hole);
}