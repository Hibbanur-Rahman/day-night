const items = [
    { src: "Images/day1.jpg", isDay: true },
    { src: "Images/night1.jpg", isDay: false },
    { src: "Images/day2.jpg", isDay: true },
    { src: "Images/night2.jpg", isDay: false },
    { src: "Images/day1.jpg", isDay: true },
    { src: "Images/night2.jpg", isDay: false },
    
];

const game = document.querySelector("#game");
const itemImg = document.querySelector("#item");
const dayBtn = document.querySelector("#day");
const nightBtn = document.querySelector("#night");
const startBtn = document.querySelector("#start");
const scoreDisplay = document.querySelector("#score");

let score = 0;
let itemIndex = 0;


function startGame() {
    document.getElementById("new-btn").style.display = "none";
    startBtn.style.display = "none";
    game.style.display = "block";
    score = 0;
    itemIndex = 0;
    showItem();
    updateScore();
    startTimer();
}

function showItem() {
    const item = items[itemIndex];
    itemImg.src = item.src;
}

function updateScore() {
    scoreDisplay.textContent = "Score: " + score;
}

function finalScore(){
    scoreDisplay.textContent = "Game Over! Your final score is " + score+ " out of "+items.length;
    endGame()
}

function showCorrectImage() {
    var clapping = document.getElementById('correctImage');
    document.getElementById("correctImage").style.display = "block"; 
    clapping.style.display = 'block';
    setTimeout(function () {
        clapping.style.display = 'none';
    }, 2000);
}
function showinCorrectImage() {
    var clapping = document.getElementById('incorrectImage');
    document.getElementById("incorrectImage").style.display = "block";
    clapping.style.display = 'block';
    setTimeout(function () {
        clapping.style.display = 'none';
    }, 2000);
}

function startTimer() {
    let timeLimit = 30    ; // seconds
    let timeLeft = timeLimit;
    timerId = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            finalScore();
        }
        updateTimer(timeLeft);
    }, 1000);
}

function updateTimer(timeLeft) {
    const timerDisplay = document.querySelector("#timer");
    timerDisplay.textContent = "Time Left: " + timeLeft+ " seconds";
}

function endGame() {
    clearInterval(timerId);
    game.style.display = "none";
    startBtn.style.display = "block";
    document.getElementById("start").style.display = "none";
    document.getElementById("new-btn").style.display = "block";
    
    // alert("Game Over! Your score is: " + score + " out of " + items.length);
    
}

function handleAnswer(isDay) {
    if (items[itemIndex].isDay === isDay) {
        score+=1;
        updateScore();
        var audio = new Audio('clapping.mp3');
        audio.play();
        setTimeout(function () {
            audio.pause();
        }, 2000);
        showCorrectImage();
    }
    else{
        var audio = new Audio('Incorrect.mp3');
        audio.play();
        setTimeout(function () {
            audio.pause();
        }, 2000);
        showinCorrectImage();
    }
    itemIndex++;
    
    if (itemIndex < items.length) {
        showItem();
    } else {
        finalScore();
    }
}