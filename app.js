import Board from './board.js';

function displayBoard() {
    const gameArea = document.getElementById('app');
    gameArea.innerHTML = '';
    const board = new Board('She sells seashells by the seashore');
    const usedLetters = new Set();
    const letters = [];

    function checkWin() {
        let phrase = '';
        letters.forEach(letter=> {
            phrase += letter.value;
        });
        if(phrase === board.answer) {
            alert("Winner Winner Chicken Dinner");
        }
    }

    function checkLetter() {
        let val = this.value.toLowerCase()
        if(this.dataset.letter === val) {
            letters.filter(letter=> letter.dataset.letter === val).forEach(letter=> {
                letter.value = val;
                letter.disabled = true;
            });
            checkWin();
        } else {
            console.log('Womp womp');
        }
        usedLetters.add(this.value);
    }

    board.letters.forEach(letter=> {
        if(letter != ' ') {
            const input = document.createElement('input');
            input.dataset.letter = letter.toLowerCase();
            input.addEventListener('change', checkLetter);
            letters.push(input);
            gameArea.appendChild(input);
        } else {
            const spacer = document.createElement('div');
            spacer.classList.add('spacer');
            gameArea.appendChild(spacer);
        }
    });
}

displayBoard();