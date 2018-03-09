"use strict";

// window.addEventListener('mousedown', playAudio);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomArray(length) {
    let rndArray = new Array(length);
    for (let i = 0; i < length; i++) {
        rndArray[i] = getRandomInt(4);
    }

    return rndArray;
}

let selector = '.slider';
let slider_toggle = document.querySelector(selector);
slider_toggle.addEventListener('mousedown', toggle);

let start = document.getElementById('start');

let toggled = false;

function buttonAddListener() {
    let id0 = document.getElementById('0');
    id0.addEventListener('mousedown', playSnd1);
    let id1 = document.getElementById('1');
    id1.addEventListener('mousedown', playSnd2);
    let id2 = document.getElementById('2');
    id2.addEventListener('mousedown', playSnd3);
    let id3 = document.getElementById('3');
    id3.addEventListener('mousedown', playSnd4);
}

function playSnd1() {
    let snd1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    snd1.play();
}

function playSnd2() {
    let snd2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    snd2.play();
}

function playSnd3() {
    let snd3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    snd3.play();
}

function playSnd4() {
    let snd4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
    snd4.play();
}

function playSnd(index) {
    let snd1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    let snd2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    let snd3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    let snd4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

    let snd = new Audio();

    if (index === 1) snd = snd1;
    if (index === 2) snd = snd2;
    if (index === 3) snd = snd3;
    if (index === 4) snd = snd4;

    snd.play();
}

let arrAudio;
let cnt = 0;
let count = 4;

function playAudio() {
    arrAudio = getRandomArray(count);
    let _player = new Audio();
    _player.addEventListener('ended', getNextAudio);
}

function getNextAudio() {

    if (cnt <= count) {
        setTimeout(playSnd(arrAudio[cnt]), 1000);
        cnt++;
    }
}

function getRndSnd(length) {
    // let length = 7;
    let arr = getRandomArray(length);
    for (let i = 0; i < length; i++) {
        let timerId = setTimeout(playSnd(i + 1), 3000);
    }
}

function addStartGameListener() {
    start.addEventListener('mousedown', startGame);
}

function removeStartGameListener() {
    start.removeEventListener('mousedown', startGame);
}

function startGame() {
    // Game is Starting!!!
    buttonAddListener();
    getRndSnd(4);
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

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}