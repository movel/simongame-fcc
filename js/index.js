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
let strict = document.getElementById('mode');
let countCls = document.querySelector('.count');

let strictMode = false;

let gameArr = new Array();
let guess = 0;

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

function getNextAudio(index) {
    if (index < count - 1) {
        setTimeout(() => {
            setLightBkgColor(gameArr[index]);
            loadSong(index);
        }, 1000);
        index++;
    };
}

function loadSong(index) {
    let audio = snd[gameArr[index]];
    audio.load();
    audio.play();
    setLightBkgColor(gameArr[index]);
    audio.addEventListener('ended', getNextAudio(index), false);
}

function loadSongBtn(index) {

    // if (index === 0) { id0.removeEventListener('mousedown', () => loadSongBtn(0)); }
    // if (index === 1) { id1.removeEventListener('mousedown', () => loadSongBtn(1)); }
    // if (index === 2) { id2.removeEventListener('mousedown', () => loadSongBtn(2)); }
    // if (index === 3) { id3.removeEventListener('mousedown', () => loadSongBtn(3)); }

    let audio = snd[index];
    audio.load();

    // OMException: The play() request was interrupted
    // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted#error
    // 

    let playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
                // Automatic playback started!
                // Show playing UI.
                // We can now safely pause video...
                audio.play();
            })
            .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
            });
    }

    setLightBkgColor(index);

    if (index === gameArr[guess]) {
        if (guess === gameArr.length - 1) {
            if (guess === 20) {
                alert('VICTORY !!!');
                resetCount();
                guess = 0;
            } else setTimeout(() => startGame(), 1000);
        };
        guess++;
    } else {
        if (startGame) resumeCount();
        else {
            resetCount();
            guess = 0;
        }
    }

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

function resetCount() {
    count = 0;
    countCls.innerHTML = '--';
}

function resumeCount() {
    setTimeout(() => countCls.innerHTML = '!!', 500);
    setTimeout(() => resumeCountHint(), 1000);
}

function resumeCountHint() {
    if (count < 10) countCls.innerHTML = '0' + count;
    else countCls.innerHTML = '' + count;
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
    resetCount();
}

function addModeGameListener() {
    strict.addEventListener('mousedown', gameMode);
}

function removeModeGameListener() {
    strict.removeEventListener('mousedown', gameMode);
}

function gameMode() {
    if (!strictMode) {
        strictMode = true;
    } else {
        strictMode = false;
    }
    strictModeLed(strictMode);
}

function strictModeLed(on) {
    let ledClass = document.getElementsByClassName('led');
    let cls = "led-on";
    if (!on) ledClass[0].classList.remove(cls);
    else ledClass[0].classList.add(cls);
}

function startGame() {
    // Game is Starting!!!
    let gameOver = false;
    count++;
    guess = 0;

    resumeCountHint();
    gameArr = getRandomArray(count);

    loadSong(0);

}

function toggle() {
    if (!toggled) {
        toggled = true;
        buttonAddListener();
        addStartGameListener();
        addModeGameListener();
    } else {
        toggled = false;
        removeStartGameListener();
        removeModeGameListener();
    }
    toggleLed(toggled);
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