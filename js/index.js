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
        setTimeout(() => {
            setLightBkgColor(cnt);
            loadSong(cnt);
        }, 1000);
        cnt++;
    };
}

function loadSong(index) {
    snd[index].load();
    snd[index].play();
    setLightBkgColor(index);
    console.log('index: ' + index);
    // if needs delay
    if (arguments[1] !== true) {
        setLightBkgColor(index);
        snd[index].addEventListener('ended', getNextAudio(index), false);
    };
}

function setLightBkgColor(index) {
    let cls = "light";
    let idClass;
    if (index === 0) {
        idClass = document.getElementsByClassName('quarterCircleTopLeft');
    }
    if (index === 1) {
        idClass = document.getElementsByClassName('quarterCircleTopRight');
    }
    if (index === 2) {
        idClass = document.getElementsByClassName('quarterCircleBottomRight');
    }
    if (index === 3) {
        idClass = document.getElementsByClassName('quarterCircleBottomLeft');
    }
    idClass[0].classList.add(cls);
    setTimeout(() => idClass[0].classList.remove(cls), 500);
}

function resetLightBkgColor(index) {
    let cls = "light";
    if (index === 0) {
        let idClass = document.getElementsByClassName('quarterCircleTopLeft');
        idClass[0].classList.remove(cls);
    }
    if (index === 1) {
        let idClass = document.getElementsByClassName('quarterCircleTopRight');
        idClass[0].classList.remove(cls);
    }
    if (index === 2) {
        let idClass = document.getElementsByClassName('quarterCircleBottomRight');
        idClass[0].classList.remove(cls);
    }
    if (index === 3) {
        let idClass = document.getElementsByClassName('quarterCircleBottomLeft');
        idClass[0].classList.remove(cls);
    }
}

function buttonAddListener() {
    id0.addEventListener('mousedown', () => loadSong(0, true));
    id1.addEventListener('mousedown', () => loadSong(1, true));
    id2.addEventListener('mousedown', () => loadSong(2, true));
    id3.addEventListener('mousedown', () => loadSong(3, true));

    id0.addEventListener('mouseup', () => resetLightBkgColor(0));
    id1.addEventListener('mouseup', () => resetLightBkgColor(1));
    id2.addEventListener('mouseup', () => resetLightBkgColor(2));
    id3.addEventListener('mouseup', () => resetLightBkgColor(3));
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