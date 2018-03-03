"use strict";

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let sliderClass = document.querySelector('.slider');

// computerClass.className += " border";
// document.querySelector('.x').className += " border";

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

let selector = '.slider';
let slider_toggle = document.querySelector(selector);
slider_toggle.addEventListener('mousedown', toggle);

let toggled = false;

function toggle() {
    if (!toggled) {
        toggled = true;
    } else {
        toggled = false;
    }
}