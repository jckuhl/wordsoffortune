import phrases from './phrases.js';
import random from './random.js';

export default class Board {
    constructor(selector, message) {
        this.phrase = phrases[random(0, phrases.length)];
        this.words = this.phrase.phrase.toLowerCase().split(' ');
        this.answer = this.phrase.phrase.toLowerCase().split(' ').join('');
        this.board = document.querySelector(selector);
        this.message = document.querySelector(message)
        this.letters = [];
        this.usedLetters = new Set();
        this.tries = 5;
    }

    showHearts() {
        const sparkleheart = '&#x1F496;';
        const brokeheart = '&#x1F494;';
        const wrong = 5 - this.tries;
        let heartString = '';
        for(let i = 0; i < 5; i++) {
            if(i < wrong) heartString += brokeheart;
            else heartString += sparkleheart;
        }
        document.getElementById('hearts').innerHTML = heartString;
    }

    showUsedLetters() {
        const used = document.getElementById('used');
        used.innerText = 'Used Letters: ';
        this.usedLetters.forEach(letter=> {
            used.innerText += letter + ' ';
        });
    }

    checkWin() {
        let phrase = '';
        this.letters.forEach(letter=> {
            phrase += letter.value;
        });
        return phrase === this.answer;
    }

    findLetters(eventLetter) {
        const foundLetters = this.letters.filter(letter=> letter.dataset.letter === eventLetter);
        if(foundLetters.length !== 0) {
            foundLetters.forEach(letter=> letter.value = letter.dataset.letter);
            this.message.innerText = 'You found a letter!';
            if(this.checkWin()) {
                alert('you won');
                displayBoard()
                this.tries = 5;
            }
        } else {
            this.message.innerText = 'That letter is not in the puzzle';
            this.tries -= 1;
            if(this.tries <= 0) {
                alert('You Lost!');
                displayBoard();
                this.tries = 5;
            }
        }
    }

    checkLetter() {
        if(this.tries > 0) {
            if(!"abcdefghijklmnopqrstuvwxyz".includes(event.key)) return;
            if(this.usedLetters.has(event.key)) {
                this.message.innerText = 'You\'ve already guessed that letter!';
            } else {
                this.usedLetters.add(event.key);
                this.showUsedLetters();
                this.findLetters(event.key);
                this.showHearts();
            }
        }
    }

    createBoard() {
        this.words.forEach(word=> {
            word += ' ';
            const $word = document.createElement('div');
            $word.classList.add('word');
            this.board.appendChild($word);
            word.split('').forEach(letter=> {
                if(letter != ' ') {
                    const input = document.createElement('input');
                    input.dataset.letter = letter;
                    input.disabled = true;
                    this.letters.push(input);
                    $word.appendChild(input);
                } else {
                    const spacer = document.createElement('div');
                    spacer.classList.add('spacer');
                    $word.appendChild(spacer);
                }
            });
        });
    }
}