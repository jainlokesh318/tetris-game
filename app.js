document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    let squares = document.querySelectorAll('.grid div');

    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#startButton');

    const width = 10;

    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ];

    //Tetrominoes
    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ];

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ];

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width*2+1, width+2],
        [width, width+1, width+2, width*2+1],
        [width, 1, width+1, width*2+1]
    ];

    const zTetromino = [
        [width, width+1, width*2+1, width*2+2],
        [width, width*2, 1, width+1],
        [width*2, width*2+1, width+1, width+2],
        [1, width+1, width+2, width*2+2]
    ];

    const tetrominoes = [oTetromino, iTetromino, tTetromino, zTetromino, lTetromino];

    let currentPosition = 7;

    let randomRotation = Math.floor(Math.random()*(tetrominoes.length-1));
    let randomShape = Math.floor(Math.random()*tetrominoes.length);
    let currentTetromino = tetrominoes[randomShape][randomRotation];

    function draw() {
        currentTetromino.forEach((index) => {
            squares[index + currentPosition].classList.add('tetromino');
        });
    }

    function undraw() {
        currentTetromino.forEach((index) => {
            squares[index + currentPosition].classList.remove('tetromino');
        });
    }

    draw();
})

