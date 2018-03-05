"use strict";

let sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
let sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
let sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
let sound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

let sounds = new Array(4);
sounds[0] = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
sounds[1] = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
sounds[2] = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
sounds[3] = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

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

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

// let x = document.getElementsByClassName('sound1');
// console.log(x);

function playAudio() {
    sounds[0].play();
    // console.log(sound1);
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
    playAudio();
}

function toggle() {
    if (!toggled) {
        toggled = true;
        toggleLed(true);
        addStartGameListener();
    } else {
        toggled = false;
        toggleLed(false);
        removeStartGameListener();
    }

}

function toggleLed(on) {
    let countClass = document.getElementsByClassName('count');
    let cls = "led-off";
    if (on) countClass[0].classList.remove(cls);
    else countClass[0].classList.add(cls);
}