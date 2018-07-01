import Board from './board.js';

(function displayBoard() {
    const board = new Board('#app', '#message');

    board.showHearts();
    board.showUsedLetters();
    board.createBoard();

    document.getElementById('hint').innerText = board.phrase.hint;

    document.addEventListener('keyup', board.checkLetter.bind(board));
})();