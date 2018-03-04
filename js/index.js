"use strict";

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomArray(length) {
    let rndArray = new Array(length);
    for (let i = 0; i < length; i++) {
        rndArray[i] = getRandomInt(length);
    }

    return rndArray;
}

let sliderClass = document.querySelector('.slider');

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

let selector = '.slider';
let slider_toggle = document.querySelector(selector);
slider_toggle.addEventListener('mousedown', toggle);

let start = document.getElementById('start');

let toggled = false;

function addStartGameListener() {
    start.addEventListener('mousedown', startGame);
}

function removeStartGameListener() {
    start.removeEventListener('mousedown', startGame);
}

function startGame() {
    // console.log('Game is Starting!!!');
}

function toggle() {
    if (!toggled) {
        toggled = true;
        addStartGameListener();
    } else {
        toggled = false;
        removeStartGameListener();
    }

}