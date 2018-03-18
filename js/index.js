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

let gameArr = new Array();

let id0 = document.getElementById('0');
let id1 = document.getElementById('1');
let id2 = document.getElementById('2');
let id3 = document.getElementById('3');

let toggled = false;

let cnt = 0;
let count = 0;
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
        setTimeout(() => {
            setLightBkgColor(gameArr[cnt]);
            loadSong(cnt);
        }, 1000);
        cnt++;
    };
}

function loadSong(index) {
    snd[gameArr[index]].load();
    snd[gameArr[index]].play();
    setLightBkgColor(gameArr[index]);
    snd[gameArr[index]].addEventListener('ended', getNextAudio(index), false);
}

function loadSongBtn(index) {
    snd[gameArr[index]].load();
    snd[gameArr[index]].play();
    setLightBkgColor(gameArr[index]);
}

function setLightBkgColor(index) {
    let cls = "light";
    let idClass;
    if (index === 0) {
        idClass = document.getElementsByClassName('quarterCircleTopLeft');
        console.log('index 0: ', index);
    }
    if (index === 1) {
        idClass = document.getElementsByClassName('quarterCircleTopRight');
        console.log('index 1: ', index);
    }
    if (index === 2) {
        idClass = document.getElementsByClassName('quarterCircleBottomRight');
        console.log('index 2: ', index);
    }
    if (index === 3) {
        idClass = document.getElementsByClassName('quarterCircleBottomLeft');
        console.log('index 3: ', index);
    }

    idClass[0].classList.add(cls);
    setTimeout(() => idClass[0].classList.remove(cls), 500);
}

function buttonAddListener() {
    id0.addEventListener('mousedown', () => loadSongBtn(0));
    id1.addEventListener('mousedown', () => loadSongBtn(1));
    id2.addEventListener('mousedown', () => loadSongBtn(2));
    id3.addEventListener('mousedown', () => loadSongBtn(3));
}

function addStartGameListener() {
    start.addEventListener('mousedown', startGame);
}

function removeStartGameListener() {
    start.removeEventListener('mousedown', startGame);
    count = 0;
    let countCls = document.querySelector('.count');
    countCls.innerHTML = '--';
}

function startGame() {
    // Game is Starting!!!
    buttonAddListener();
    let gameOver = false;
    count++;

    let countCls = document.querySelector('.count');
    if (count < 10) countCls.innerHTML = '0' + count;
    else countCls.innerHTML = '' + count;
    gameArr = getRandomArray(count);

    console.log('startGame + gameArr: ', gameArr);
    loadSong(0);

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