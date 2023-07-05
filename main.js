// Const and var

const options = [
    "rock",
    "paper",
    "scissors"
]

const beats = [
    "scissors",
    "rock",
    "paper"
]

var game = {
    score: 0,
    highScore: 0,
    input: "",
    rivalInput: "",
    result: ""
}

const rivalChoices = []; // Used for making AI more humanlike

// This is so inelegant, but trying to loop addEventListeners was causing all manner of errors
const ROCKBUTTON = document.getElementById("rock");
const PAPERBUTTON = document.getElementById("paper");
const SCISSORSBUTTON = document.getElementById("scissors");

function chooseRock() {startGame("rock")};
function choosePaper() {startGame("paper")};
function chooseScissors() {startGame("scissors")};

function activateButtons() {
    ROCKBUTTON.addEventListener("click", chooseRock);
    PAPERBUTTON.addEventListener("click", choosePaper);
    SCISSORSBUTTON.addEventListener("click", chooseScissors);
    ROCKBUTTON.style.backgroundColor = "white";
    PAPERBUTTON.style.backgroundColor = "white";
    SCISSORSBUTTON.style.backgroundColor = "white";
}

function deactivateButtons() {
    ROCKBUTTON.removeEventListener("click", chooseRock);
    PAPERBUTTON.removeEventListener("click", choosePaper);
    SCISSORSBUTTON.removeEventListener("click", chooseScissors);
    ROCKBUTTON.style.backgroundColor = "grey";
    PAPERBUTTON.style.backgroundColor = "grey";
    SCISSORSBUTTON.style.backgroundColor = "grey";
}

// Gets items for animation - adds a class to the hands which holds the animation, which can then be removed on reset
const LEFTHAND = document.getElementById("lefthand");
const RIGHTHAND = document.getElementById("righthand");

// Animations handled by adding classes that contain the animation details in css
function animateHands() {
    LEFTHAND.classList.add("animated");
    RIGHTHAND.classList.add("animated");
    if (game.result === "Winner") {
        LEFTHAND.classList.add("winner");
        RIGHTHAND.classList.add("loser");
    } else if (game.result === "Loser") {
        LEFTHAND.classList.add("loser");
        RIGHTHAND.classList.add("winner");
    } else { }
    // Can I create a time-delayed call of a function here which then updates the score to avoid giving it away?
}

function unAnimateHands () {
    LEFTHAND.classList.remove("animated", "winner", "loser");
    RIGHTHAND.classList.remove("animated", "winner", "loser");
}

function startGame(x) {
    // Stops player changing their answer
    deactivateButtons();
    
    // Registers player choice
    game.input = x;

    // Starts animation
    animateHands();

    // Runs function for computer to randomly choose
    rivalChoose();
    
    if (game.input === game.rivalInput) {
        game.result = "Draw";
    } else if (options.indexOf(game.input) === beats.indexOf(game.rivalInput)) {
        game.result = "Winner";
        game.score += 1
    } else {
        game.result = "Loser";
        game.score = 0;
    }

    // Updates high score
    if (game.score > game.highScore) game.highScore = game.score;

    // DEV TOOLS
    console.log(game.input);
    console.log(game.rivalInput);
    console.log(game.result);
    console.log(game.score);
    console.log(game.highScore)
    console.log(rivalChoices);
}

// Weights the options so it isn't purely random, based on human behaviour
function weightRand(spec) {
    var i, sum=0, r=Math.random();
    for (i in spec) {
        sum += spec[i];
        if (r <= sum) return i;
    }
}
// Function for randomly choosing the rival's input
function rivalChoose() {
    //game.rivalInput = options[Math.floor(Math.random() * options.length)];
    game.rivalInput = options[weightedRand({0:0.35, 1:0.3, 2:0.35})]; // This weights the options according to https://www.psychologytoday.com/gb/blog/the-blame-game/201504/the-surprising-psychology-rock-paper-scissors
    rivalChoices.push(game.rivalInput); // Tracks computer choices in case we want to alter behaviour based on sequencing
}

function resetGame() {
    activateButtons();
    unAnimateHands();
    game.input = "";
    game.rivalInput = "";
    game.result = "";
}


