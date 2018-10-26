import phrases from './phrases.js';
import random from './random.js';

export default class Board {
    constructor(selector, message, hint) {
        this.phraseBucket = new Set();
        this.phraseIndex = random(0, phrases.length)
        this.phrase = phrases[this.phraseIndex];
        this.phraseBucket.add(this.phraseIndex);
        this.words = this.phrase.phrase.toLowerCase().split(' ');
        this.answer = this.phrase.phrase.toLowerCase().split(' ').join('');
        this.hint = document.querySelector(hint);
        this.board = document.querySelector(selector);
        this.message = document.querySelector(message)
        this.letters = [];
        this.usedLetters = new Set();
        this.tries = 5;
    }

    getPhraseIndex() {
        if(this.phraseBucket.size !== phrases.length) {
            do {
                var index = random(0, phrases.length);
                // ha! a use case for var!
            } while(this.phraseBucket.has(index));
            this.phraseBucket.add(index);
            return index;
        } else {
            this.phraseBucket.clear();
            return random(0, phrases.length);
        }
    }

    reset() {
        this.board.innerHTML = '';
        this.phrase = phrases[this.getPhraseIndex()];
        this.hint.innerText = this.phrase.hint;
        this.words = this.phrase.phrase.toLowerCase().split(' ');
        this.answer = this.phrase.phrase.toLowerCase().split(' ').join('');
        this.letters = [];
        this.usedLetters = new Set();
        this.tries = 5;
        this.createBoard();
        this.showHearts();
        this.showUsedLetters();
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
        return this.letters.reduce((phrase, letter) => phrase + letter.value, '') === this.answer;
    }

    findLetters(eventLetter) {
        const foundLetters = this.letters.filter(letter=> letter.dataset.letter === eventLetter);
        if(foundLetters.length !== 0) {
            foundLetters.forEach(letter=> {
                letter.value = letter.dataset.letter;
                letter.classList.remove('unused');
            });
            this.message.innerText = 'You found a letter!';
            if(this.checkWin()) {
                this.message.innerText = 'You won!  New Game in 3 Seconds';
                setTimeout(()=> {
                    this.reset();
                    this.message.innerText = 'Pick a letter by pressing a key!';
                }, 3000);
            }
        } else {
            this.message.innerText = 'That letter is not in the puzzle';
            this.tries -= 1;
            if(this.tries <= 0) {
                this.message.innerText = 'You lost!  New Game in 3 Seconds';
                setTimeout(()=> {
                    this.reset();
                    this.message.innerText = 'Pick a letter by pressing a key!';
                }, 3000);
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
        this.hint.innerText = this.phrase.hint;
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
                    input.classList.add('unused');
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