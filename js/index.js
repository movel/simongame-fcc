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

let id0 = document.getElementById('0');
let id1 = document.getElementById('1');
let id2 = document.getElementById('2');
let id3 = document.getElementById('3');

let toggled = false;

let cnt = 0;
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

function getNextAudio(cnt) {
    if (cnt < count - 1) {
        setTimeout(() => loadSong(cnt), 1000);
        cnt++;
    };
}

function loadSong(index) {
    console.log('loadSong index: ' + index)
    snd[index].load();
    snd[index].play();
    snd[index].addEventListener('ended', getNextAudio(index), false);
}

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
    // let snd1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    snd1.load();
    snd1.play();
}

function playSnd2() {
    // let snd2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    snd2.load();
    snd2.play();
}

function playSnd3() {
    // let snd3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    snd3.load();
    snd3.play();
}

function playSnd4() {
    // let snd4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
    snd4.load();
    snd4.play();
}

function playSnd(index_snd) {
    let snd = new Audio(index_snd);
    snd.play();
    console.log('arrAudio(): ' + snd);
}

function playAudio() {
    arrAudio = getRandomArray(count);
    let _player = new Audio();
    _player.addEventListener('ended', getNextAudio);
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
    loadSong(cnt);
    buttonAddListener();
    // getRndSnd(4);
    // playAudio();
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