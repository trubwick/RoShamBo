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
    rivalScore: 0,
    input: "",
    rivalInput: "",
    result: "",
    options: [
        "rock",
        "paper",
        "scissors"
    ],
    imagesLeft: [
        "rock.svg",
        "paper.svg",
        "scissors.svg"
    ],
    imagesRight: [
        "rockRight.svg",
        "paperRight.svg",
        "scissorsRight.svg"
    ],
    resultOptions: [
        "Draw",
        "Win",
        "Lose"
    ]
}

const rivalChoices = []; // Used for making AI more humanlike
const timeOut = 2000; // Used to control delay to allow animation to play out in ms

// This is so inelegant, but trying to loop addEventListeners was causing all manner of errors
const ROCKBUTTON = document.getElementById("rock");
const PAPERBUTTON = document.getElementById("paper");
const SCISSORSBUTTON = document.getElementById("scissors");
const STARTBUTTON = document.getElementById("button"); // Note that this is the whole button script, not the button itself

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
    STARTBUTTON.innerHTML = '<button onclick="resetGame()" id="start-button">Next Round</button>'
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
}

function unAnimateHands () {
    LEFTHAND.classList.remove("animated", "winner", "loser");
    RIGHTHAND.classList.remove("animated", "winner", "loser");
}

// Updates score and the result message
function updateScore() {
    // Update score
    document.getElementById("score1").innerHTML = game.score;
    document.getElementById("score2").innerHTML = game.rivalScore;
    if (game.score > game.highScore) game.highScore = game.score;
    // Update result message info
    document.getElementById("result-message").innerHTML = game.result;
    
   // Update arena images
    var leftResultImg = "images/" + game.imagesLeft[options.indexOf(game.input)];
    var rightResultImg = "images/" + game.imagesRight[options.indexOf(game.rivalInput)];
    document.getElementById("lefthand").src = leftResultImg;
    document.getElementById("righthand").src = rightResultImg;
    // Open up 'Next Round' Button
    document.getElementById("start-button").disabled = false;
    // Reanimate hands
    LEFTHAND.classList.remove("animated");
    RIGHTHAND.classList.remove("animated");
    if (game.result === "Winner") {
        LEFTHAND.classList.add("winner"); 
        RIGHTHAND.classList.add("loser");
    } else if (game.result === "Loser") {
        LEFTHAND.classList.add("loser"); 
        RIGHTHAND.classList.add("winner");
    } else {
        LEFTHAND.classList.add("loser"); 
        RIGHTHAND.classList.add("loser");
    }
}


function startGame(x) {
    // Stops player changing their answer
    deactivateButtons();
    
    // Registers player choice
    game.input = x;

    // Starts animation
    

    // Runs function for computer to randomly choose
    rivalChoose();
    
    if (game.input === game.rivalInput) {
        game.result = "Draw";
    } else if (options.indexOf(game.input) === beats.indexOf(game.rivalInput)) {
        game.result = "Winner";
        game.score += 1
    } else {
        game.result = "Loser";
        game.rivalScore += 1;
    }


    //Delays the score update and winner message until animation has run
    animateHands();
    setTimeout(updateScore, timeOut);
    
    
    // DEV TOOLS
    console.log(game.input);
    console.log(game.rivalInput);
    console.log(game.result);
    console.log(game.score);
    console.log(game.highScore)
    console.log(rivalChoices);
}

// Weights the options so it isn't purely random, based on human behaviour - BROKEN
/* function weightedRand(spec) {
    var i, sum=0, r=Math.random();
    for (i in spec) {
        sum += spec[i];
        if (r <= sum) return i;
    }
}*/

// Function for randomly choosing the rival's input
function rivalChoose() {
    game.rivalInput = options[Math.floor(Math.random() * options.length)];
    //game.rivalInput = options[Math.floor(Math.random() * options.length)]; // This weights the options according to https://www.psychologytoday.com/gb/blog/the-blame-game/201504/the-surprising-psychology-rock-paper-scissors
    rivalChoices.push(game.rivalInput); // Tracks computer choices in case we want to alter behaviour based on sequencing
}

function resetGame() {
    document.getElementById("start-button").disabled = true;
    activateButtons();
    unAnimateHands();
    game.input = "";
    game.rivalInput = "";
    game.result = "";
    document.getElementById("lefthand").src = "images/fist.svg";
    document.getElementById("righthand").src = "images/fistRight.svg";
}
