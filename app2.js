import Board from './board.js';

(function displayBoard() {
    const board = new Board('#app', '#message', '#hint');

    board.showHearts();
    board.showUsedLetters();
    board.createBoard();

    document.addEventListener('keyup', board.checkLetter.bind(board));
})();