function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

console.log(getRandomInt(3));
// expected output: 0, 1 or 2

console.log(getRandomInt(5));
// expected output: 0, 1, 2, 3, 4