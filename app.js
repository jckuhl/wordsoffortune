import Board from './board.js';
import phrases from './phrases.js';
import random from './random.js';

function displayBoard() {
    const phrase = phrases[random(0, phrases.length)];
    const gameArea = document.getElementById('app');
    const message = document.getElementById('message');
    const board = new Board(phrase.phrase);
    const usedLetters = new Set();
    const letters = [];

    document.getElementById('hint').innerText = phrase.hint;

    gameArea.innerHTML = '';

    function checkWin() {
        let phrase = '';
        letters.forEach(letter=> {
            phrase += letter.value;
        });
        if(phrase === board.answer) {
            alert(board.phrase);
            displayBoard();
        }
    }

    function addLetterToUsed(val) {
        if(usedLetters.has(val)) {
            message.innerHTML = 'You\'ve already guessed that letter!';
        } else {
            usedLetters.add(val);
        }
        let used = 'These letters are incorrect: ';
        usedLetters.forEach(letter=> {
            used += letter + ' ';
        });
        document.getElementById('used').innerText = used;
    }

    function findLetter(val) {
        return letters.filter(letter=> letter.dataset.letter === val);
    }
    
    function isLetterInPuzzle(val) {
        return findLetter(val).length === 0;
    }

    function checkLetter() {
        let val = this.value.toLowerCase()
        if(this.dataset.letter === val) {
            findLetter(val).forEach(letter=> {
                letter.value = val;
                letter.disabled = true;
            });
            checkWin();
        } else {
            if(isLetterInPuzzle(val)) {
                message.innerText = 'Sorry, that letter is not in the puzzle';
                addLetterToUsed(val);
            } else {
                message.innerText = 'Sorry, that letter is not in that position';
            }
            setTimeout(()=> this.value = '', 1000);
        }
    }

    board.letters.forEach(letter=> {
        if(letter != ' ') {
            const input = document.createElement('input');
            input.dataset.letter = letter.toLowerCase();
            input.maxLength = 1;
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