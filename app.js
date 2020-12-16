document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));

    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#startButton');
    const colors = ['red', 'green', 'blue', 'purple', 'black'];

    const width = 10;
    let nextRandom = 0;
    let timerId;
    let score = 0;

    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];

    //Tetrominoes
    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width * 2 + 1, width + 2],
        [width, width + 1, width + 2, width * 2 + 1],
        [width, 1, width + 1, width * 2 + 1]
    ];

    const zTetromino = [
        [width, width + 1, width * 2 + 1, width * 2 + 2],
        [width, width * 2, 1, width + 1],
        [width * 2, width * 2 + 1, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 2]
    ];

    const tetrominoes = [oTetromino, iTetromino, tTetromino, zTetromino, lTetromino];

    let currentPosition = 7;

    let randomRotation = 0;
    let randomShape = Math.floor(Math.random() * tetrominoes.length);
    let currentTetromino = tetrominoes[randomShape][randomRotation];

    function draw() {
        currentTetromino.forEach((index) => {
            squares[index + currentPosition].classList.add('tetromino');
            squares[index + currentPosition].style.backgroundColor = colors[randomShape];
        });
    }

    function undraw() {
        currentTetromino.forEach((index) => {
            squares[index + currentPosition].classList.remove('tetromino');
            squares[index + currentPosition].style.backgroundColor = '';
        });
    }

    //assign functions to keyActions
    function control(event) {
        if (event.keyCode === 37) moveLeft();
        else if (event.keyCode === 38)
            rotate();
        else if (event.keyCode === 39)
            moveRight();
        else if (event.keyCode === 40)
            moveDown();
    }

    document.addEventListener('keyup', control);

    //moving the tetrominos down
    //timerId = setInterval(moveDown, 500 );

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
        //addScore();
    }

    function freeze() {
        if (currentTetromino.some(index =>
                squares[currentPosition + index + width].classList.contains("taken"))) {
            currentTetromino.forEach(index =>
                squares[currentPosition + index].classList.add("taken"));

            //start a new tetromino
            randomShape = nextRandom;
            nextRandom = Math.floor(Math.random() * tetrominoes.length);
            currentTetromino = tetrominoes[randomShape][randomRotation];
            currentPosition = 4;
            draw();
            displayMiniGrid();
            addScore();
            gameOver();
        }
    }

    function moveLeft() {
        undraw();

        //if not on edge then moveLeft
        const isAtLeftEdge = currentTetromino.some(index => (currentPosition + index) % width === 0);

        if (!isAtLeftEdge)
            currentPosition -= 1;

        //if after moving, if the new tetromino contains taken then undo the effect
        if (currentTetromino.some(index =>
                squares[index + currentPosition].classList.contains('taken'))) {
            currentPosition += 1;
        }

        draw();
    }

    function moveRight() {
        undraw();


        const isAtRightEdge = currentTetromino.some(index => (currentPosition + index) % width === width - 1);

        if (!isAtRightEdge) currentPosition += 1;

        if (currentTetromino.some(index =>
                squares[index + currentPosition].classList.contains('taken'))) {
            currentPosition -= 1;
        }

        draw();

    }

    function rotate() {
        undraw();
        randomRotation++;
        if (randomRotation === currentTetromino.length)
            randomRotation = 0;
        currentTetromino = tetrominoes[randomShape][randomRotation];
        draw();
    }


    const miniSquares = document.querySelectorAll('.mini-grid div');
    const miniWidth = 4;
    let miniIndex = 0;

    const upNextTetrominoes = [
        [0, 1, miniWidth, miniWidth + 1],
        [0, 1, 2, 3],
        [1, miniWidth, miniWidth + 1, miniWidth + 2],
        [0, miniWidth, miniWidth + 1, miniWidth * 2 + 1],
        [1, miniWidth + 1, miniWidth * 2 + 1, 2]
    ];

    function displayMiniGrid() {
        miniSquares.forEach(square => {
            square.classList.remove('tetromino');
            square.style.backgroundColor = '';
        });

        upNextTetrominoes[nextRandom].forEach(index => {
            miniSquares[miniIndex + index].classList.add('tetromino');
            miniSquares[miniIndex + index].style.backgroundColor = colors[nextRandom];
        });
    };


    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 500);
            nextRandom = Math.floor(Math.random() * tetrominoes.length);
            displayMiniGrid();
        }
    });

    function addScore() {

        for (let i = 0; i < 199; i += width) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10;
                scoreDisplay.innerHTML = score;

                row.forEach(index => {
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                    squares[index].style.backgroundColor = '';
                });

                const removedSquares = squares.splice(i, width);
                squares = removedSquares.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));
            }
        }
    }

    function gameOver() {
        if (currentTetromino.some(index =>
                squares[index + currentPosition].classList.contains('taken'))) {
            scoreDisplay.innerHTML = " Game Over ";
            clearInterval(timerId);
        }
    }






















})