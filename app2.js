import Board from './board.js';
import phrases from './phrases.js';
import random from './random.js';

function displayBoard() {
    const phrase = phrases[random(0, phrases.length)];
    const board = new Board(phrase.phrase)
    const gameArea = document.getElementById('app');
    const message = document.getElementById('message');
    const letters = [];
    const usedLetters = new Set();
    let tries = 5;

    gameArea.innerHTML = '';

    document.getElementById('hint').innerText = phrase.hint;

    function setHearts() {
        const sparkleheart = '&#x1F496;';
        const brokeheart = '&#x1F494;';
        const wrong = 5 - tries;
        let heartString = '';
        for(let i = 0; i < 5; i++) {
            if(i < wrong) heartString += brokeheart;
            else heartString += sparkleheart;
        }
        document.getElementById('hearts').innerHTML = heartString;
        console.log(heartString);
    }

    function showUsedLetters() {
        const used = document.getElementById('used');
        used.innerText = 'Used Letters: ';
        usedLetters.forEach(letter=> {
            used.innerText += letter + ' ';
        });
    }

    function checkWin() {
        let phrase = '';
        letters.forEach(letter=> {
            phrase += letter.value;
        });
        return phrase === board.answer;
    }

    function findLetters(eventLetter) {
        const foundLetters = letters.filter(letter=> letter.dataset.letter === eventLetter);
        if(foundLetters.length !== 0) {
            foundLetters.forEach(letter=> letter.value = letter.dataset.letter);
            message.innerText = 'You found a letter!';
            if(checkWin()) {
                alert('you won');
            }
        } else {
            message.innerText = 'That letter is not in the puzzle';
            tries -= 1;
            if(tries <= 0) {
                alert('You Lost!');
            }
        }
    }

    function checkLetter() {
        if(tries > 0) {
            if(!"abcdefghijklmnopqrstuvwxyz".includes(event.key)) return;
            if(usedLetters.has(event.key)) {
                message.innerText = 'You\'ve already guessed that letter!';
            } else {
                usedLetters.add(event.key);
                showUsedLetters();
                findLetters(event.key);
                setHearts();
            }
        }
    }

    board.words.forEach(word=> {
        word += ' ';
        setHearts();
        const $word = document.createElement('div');
        $word.classList.add('word');
        gameArea.appendChild($word);
        word.split('').forEach(letter=> {
            if(letter != ' ') {
                const input = document.createElement('input');
                input.dataset.letter = letter;
                input.disabled = true;
                letters.push(input);
                $word.appendChild(input);
            } else {
                const spacer = document.createElement('div');
                spacer.classList.add('spacer');
                $word.appendChild(spacer);
            }
        });
    });

    document.addEventListener('keyup', checkLetter);
}

displayBoard();