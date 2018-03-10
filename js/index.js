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

let arrAudio;
let cnt = 1;
let count = 4;
let snd = new Array();

let snd1 = document.querySelector('.audio_1');
let snd2 = document.querySelector('.audio_2');
let snd3 = document.querySelector('.audio_3');
let snd4 = document.querySelector('.audio_4');

snd.push(snd1);
snd.push(snd2);
snd.push(snd3);
snd.push(snd4);


function loadSong(index) {
    snd[index].play();
}

let timer = setTimeout(() => loadSong(2), 3000);

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
    snd.add(snd1);
    playSnd(snd[0]);
}

function playSnd2() {
    let snd2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    playSnd(snd2);
}

function playSnd3() {
    let snd3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    playSnd(snd3);
}

function playSnd4() {
    let snd4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
    playSnd(snd4);
}

function playSnd(index_snd) {
    let snd = new Audio(index_snd);
    snd.play();
    snd.addEventListener("ended", console.log("ended"));
    console.log('arrAudio(): ' + arrAudio);
}

function playAudio() {
    arrAudio = getRandomArray(count);
    let _player = new Audio();
    _player.addEventListener('ended', getNextAudio);
}

function getNextAudio() {
    if (cnt <= count) {
        cnt++;
    };
    console.log('arrAudio(): ' + arrAudio);
    playSnd(arrAudio[cnt]);
}

function getRndSnd(length) {
    arrAudio = getRandomArray(length);
    let timer = setTimeout(playSnd(1), 1000);
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