function getRandomInt(max) {
    return Math.floor(Math.random() * (Math.floor(max) + 1));
}

function refreshColors(squareNum) {
    const squares = document.querySelectorAll('.square');
    const banner = document.querySelector('.banner');
    banner.style.backgroundColor = 'transparent';
    for (let i = 0; i < squareNum; i++) {
        const squareShow = squares[i];
        squareShow.classList.toggle('active', true);
        squareShow.classList.toggle('inactive', false);
        squareShow.style.backgroundColor = 'rgb(' + getRandomInt(255) + ', ' + getRandomInt(255) + ', ' + getRandomInt(255);
    }
    for (let j = squareNum; j < squares.length; j++) {
        const squareHide = squares[j];
        squareHide.classList.toggle('inactive', true);
        squareHide.classList.toggle('active', false);
    }
}

function pickColor(squareNum) {
    const squares = document.querySelectorAll('.square');
    const i = getRandomInt(squareNum - 1);
    const pickedColor = squares[i].style.backgroundColor;
    const colorDisplay = document.getElementById('colorDisplay');
    colorDisplay.textContent = pickedColor;
}

function changeAllColors(squares, banner, color) {
    squares.forEach((el) => {
        el.style.backgroundColor = color;
        el.classList.toggle('active', false);
        el.classList.toggle('inactive', false);
    });
    banner.style.backgroundColor = color;
}

function checkChancesLeft(message, newColors) {
    const activeSquares = document.querySelectorAll('.square.active');
    if (activeSquares.length === 2) {
        message.textContent = 'Last chance!';
    } else if (activeSquares.length === 1) {
        activeSquares[0].classList.replace('active', 'inactive');
        message.textContent = 'You failed!';
        newColors.textContent = 'Play again?'
    }
}

function triggerAnimation(el) {
    el.classList.add('animated');
    el.addEventListener('animationend', () => {
        el.classList.remove('animated');
    });
}

function handleColorClick(e) {
    const clickedSquare = e.target;
    const clickedColor = clickedSquare.style.backgroundColor;
    const colorDisplay = document.getElementById('colorDisplay');
    const pickedColor = colorDisplay.textContent;
    const squares = document.querySelectorAll('.square');
    const banner = document.querySelector('.banner');
    const message = document.querySelector('.message');
    const newColors = document.querySelector('.newColors');
    if (clickedColor === pickedColor) {
        changeAllColors(squares, banner, pickedColor);
        message.textContent = 'WELL DONE!';
        newColors.textContent = 'Play again?';
    } else {
        clickedSquare.classList.replace('active', 'inactive');
        message.textContent = 'Try again!';
        checkChancesLeft(message, newColors);
    }
    triggerAnimation(message);
}

function bindColorClick() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((el) => {
        el.addEventListener('click', handleColorClick);
    });
}

function reset(squareNum) {
    refreshColors(squareNum);
    pickColor(squareNum);
    message.textContent = '';
    if (newColors.textContent !== 'NEW COLORS') {
        newColors.textContent = 'NEW COLORS';
    }
}

function bindNewColors() {
    const newColors = document.querySelector('.newColors');
    const message = document.querySelector('.message');
    const hard = document.querySelector('.level .hard');
    let squareNum = 0;
    newColors.addEventListener('click', () => {
        if (hard.classList.contains('selected')) {
            squareNum = 9;
        } else {
            squareNum = 3;
        }
        reset(squareNum);
    });
}

function bindEasy() {
    const hard = document.querySelector('.level .hard');
    const easy = document.querySelector('.level .easy');
    easy.addEventListener('click', () => {
        if (!easy.classList.contains('selected')) {
            refreshColors(3);
            pickColor(3);
            easy.classList.add('selected');
            hard.classList.remove('selected');
        }
    })
}

function bindHard() {
    const hard = document.querySelector('.level .hard');
    const easy = document.querySelector('.level .easy');
    hard.addEventListener('click', () => {
        if (!hard.classList.contains('selected')) {
            refreshColors(9);
            pickColor(9);
            hard.classList.add('selected');
            easy.classList.remove('selected');
        }
    })
}

function _main() {
    refreshColors(9);
    pickColor(9);
    bindColorClick();
    bindNewColors();
    bindEasy();
    bindHard();
}

_main();