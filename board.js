export default class Board {
    constructor(phrase) {
        this.phrase = phrase;
        this.letters = phrase.toLowerCase().split('');
        this.words = phrase.toLowerCase().split(' ');
        this.answer = phrase.toLowerCase().split(' ').join('');
    }
}