function getRandomInt(max) {
    return Math.floor(Math.random() * (Math.floor(max) + 1));
}

function refreshColors() {
    const squares = document.querySelectorAll('.square');
    const banner = document.querySelector('.banner');
    squares.forEach((el) => {
        el.style.backgroundColor = 'rgb(' + getRandomInt(255) + ', ' + getRandomInt(255) + ', ' + getRandomInt(255);
    });
    banner.style.backgroundColor = 'transparent';
}

function pickColor() {
    const squares = document.querySelectorAll('.square');
    const i = getRandomInt(5);
    const pickedColor = squares[i].style.backgroundColor;
    const colorDisplay = document.getElementById('colorDisplay');
    colorDisplay.textContent = pickedColor;
}

function changeColors(color) {
    const squares = document.querySelectorAll('.square');
    const banner = document.querySelector('.banner');
    squares.forEach((el) => {
        el.style.backgroundColor = color;
    });
    banner.style.backgroundColor = color;
}

function handleColorClick(e) {
    const clickedSquare = e.target;
    const clickedColor = clickedSquare.style.backgroundColor;
    const colorDisplay = document.getElementById('colorDisplay');
    const pickedColor = colorDisplay.textContent;
    const result = document.querySelector('.result');
    if (clickedColor === pickedColor) {
        changeColors(clickedColor);
        result.textContent = 'Correct!';
    } else {
        clickedSquare.style.backgroundColor = '#232323';
        result.textContent = 'Try again!';
    }
}

function bindClickHandler() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((el) => {
        el.addEventListener('click', handleColorClick);
    });
}

function bindNewColors() {
    const newColors = document.querySelector('.newColors');
    newColors.addEventListener('click', () => {
        refreshColors();
        pickColor();
    });
}

function bindEasy() {
    const easy = document.querySelector('.level .easy');
    easy.addEventListener('click', () => {

    })
}

function bindHard() {
    const hard = document.querySelector('.level .hard');
    hard.addEventListener('click', () => {
        refreshColors();
        pickColor();
    })
}

function _init() {
    refreshColors();
    pickColor();
    bindClickHandler();
    bindNewColors();
}

_init();