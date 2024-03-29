'use strict';

function getRandomInt(max) {
    return Math.floor(Math.random() * (Math.floor(max) + 1));
}

//check current difficulty level and return corresponding number of squares
function getSquareNum() {
    const hard = document.querySelector('.level .hard');
    let squareNum = 0;
    if (hard.classList.contains('selected')) {
        squareNum = 9;
    } else {
        squareNum = 3;
    }
    return squareNum;
}

function refreshColors() {
    const squareNum = getSquareNum();
    const banner = document.querySelector('.banner');
    const squares = document.querySelectorAll('.square');
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

function pickColor() {
    const squareNum = getSquareNum();
    const squares = document.querySelectorAll('.square');
    const i = getRandomInt(squareNum - 1);
    const pickedColor = squares[i].style.backgroundColor;
    const colorDisplay = document.getElementById('colorDisplay');
    colorDisplay.textContent = pickedColor;
}

function changeAllColors(squares, banner, color) {
    const squareNum = getSquareNum();
    for (let i = 0; i < squareNum; i++) {
        const el = squares[i];
        el.style.backgroundColor = color;
        el.classList.toggle('active', false);
        el.classList.toggle('inactive', false);
    }
    banner.style.backgroundColor = color;
}

function toggleEmoji(b) {
    const emoji = document.getElementById('emoji');
    if (b === 'on') {
        emoji.classList.toggle('hidden', false);
    } else if (b === 'off') {
        emoji.classList.toggle('hidden', true);
    }
}

function checkChancesLeft(message, newColors) {
    const activeSquares = document.querySelectorAll('.square.active');
    if (activeSquares.length === 2) {
        message.textContent = 'Last try!';
    } else if (activeSquares.length === 1) {
        activeSquares[0].classList.replace('active', 'inactive');
        activeSquares[0].removeEventListener('click', handleColorClick);
        message.textContent = 'You failed!';
        newColors.textContent = 'Play again?';
        toggleEmoji('on');
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
        message.textContent = 'Well done!';
        newColors.textContent = 'Play again?';
    } else {
        clickedSquare.classList.replace('active', 'inactive');
        clickedSquare.removeEventListener('click', handleColorClick);
        message.textContent = 'Try again!';
        checkChancesLeft(message, newColors);
    }
    triggerAnimation(message);
}

//Initialize clicking color square
function bindColorClick() {
    const squareNum = getSquareNum();
    const squares = document.querySelectorAll('.square');
    for (let i = 0; i < squareNum; i++) {
        const elShow = squares[i];
        elShow.addEventListener('click', handleColorClick);
    }
    for (let j = squareNum; j < squares.length; j++) {
        const elHide = squares[j];
        elHide.removeEventListener('click', handleColorClick);
    }
}

function reset() {
    const message = document.querySelector('.message');
    const newColors = document.querySelector('.newColors');
    refreshColors();
    pickColor();
    bindColorClick();
    toggleEmoji('off');
    message.textContent = '';
    newColors.textContent = 'New Colors';
}

//Initialize game reset
function bindNewColors() {
    const newColors = document.querySelector('.newColors');
    newColors.addEventListener('click', reset);
}

//Initialize choosing difficulty level
function bindLevels() {
    const levels = document.querySelectorAll('.level span');
    levels.forEach((el) => {
        el.addEventListener('click', () => {
            if (!el.classList.contains('selected')) {
                const elSelected = document.querySelector('.selected');
                el.classList.add('selected');
                elSelected.classList.remove('selected');
                reset();
            }
        });
    });
}

function _init() {
    refreshColors();
    pickColor();
    bindColorClick();
    bindNewColors();
    bindLevels();
}

_init();