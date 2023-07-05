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

// This is so inelegant, but trying to group addEventListeners was causing all manner of errors
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

function animateHands() {
    LEFTHAND.classList.add("animated");
    RIGHTHAND.classList.add("animated");
}

function unAnimateHands () {
    LEFTHAND.classList.remove("animated");
    RIGHTHAND.classList.remove("animated");
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
        game.result = "Win";
        game.score += 1
    } else {
        game.result = "Lose";
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


// Function for randomly choosing the rival's input
// Could try and make this more human-like with bias ??? For later
function rivalChoose() {
    game.rivalInput = options[Math.floor(Math.random() * options.length)];
    rivalChoices.push(game.rivalInput);
}

function resetGame() {
    activateButtons();
    unAnimateHands();
    game.input = "";
    game.rivalInput = "";
}


