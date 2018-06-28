var appNode = document.getElementById('app');
var playButton = document.getElementById('play-pause-button');
var resetButton = document.getElementById('reset');
var scoreContainer = document.getElementById('score');
var highScoresContainer = document.getElementById('highscores');
var livesNode = document.getElementById('lives');
var timer = document.getElementById('timer');
var difficulties = {
    easy: 1500,
    normal: 1000,
    hard: 500
};
var maxTime = {
    easy: 20000,
    normal: 10000,
    hard: 5000
};
var lives = 3;
var highScores = [];
var moleNode;
var score;
var intervalId;
var counter;
var secs;

clearBoard();

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);

function play() {
    clearInterval(intervalId);
    clearInterval(counter);
    score = 0;
    lives = 3;
    displayLives();
    scoreContainer.value = score;
    clearBoard();
    countDown();
    var selectedDifficulty = document.getElementById('difficulty').value;
    var speed = difficulties[selectedDifficulty];
    intervalId = setInterval(moleAppear, speed);
}

function countDown() {
    secs = 0;
    var selectedDifficulty = document.getElementById('difficulty').value;
    var time = maxTime[selectedDifficulty];
    counter = setInterval(function() {
        if (secs*1000 < time) {
            secs += 1;
            timer.innerHTML = secs;
        } else {
            gameOver();
        }
    }, 1000)
}

function reset() {
    clearInterval(intervalId);
    clearInterval(counter);
    clearBoard();
    score = '';
    scoreContainer.value = score;
    secs = 0;
    timer.innerHTML = secs;
}

function gameOver() {
    score += lives*50;
    highScores.push(score);
    alert('GAME OVER');
    var node = document.createElement('p');
    node.innerText = score;
    highScoresContainer.prepend(node);
    reset();
}

function displayLives() {
    var heartNode;
    livesNode.querySelectorAll('span').forEach(function (life) {
        livesNode.removeChild(life);
    });
    for (var i=0; i<lives; i++) {
        heartNode = document.createElement('span');
        heartNode.innerHTML = '&hearts;';
        livesNode.appendChild(heartNode);
    }
    if (lives === 0) {
        setTimeout(gameOver, 0);
    }
}

function clearBoard() {
    appNode.innerHTML = '';
    var emptyHoles;
    for (var i=0; i<10; i++) {
        moleNode = document.createElement('div');
        moleNode.classList.add('mole');
        appNode.appendChild(moleNode);
        moleNode.classList.add(`mole${i}`);
    }
}

function moleAppear() {
    clearBoard();
    var blackMole = document.querySelector(`.mole${Math.floor(Math.random()*10)}`);
    blackMole.classList.add('black');
    blackMole.addEventListener('click', function () {
        score = score + 10;
        scoreContainer.value = score;
    });
    emptyHoles = appNode.querySelectorAll('.mole:not(.black)');
    emptyHoles.forEach(function (hole) {
        hole.addEventListener('click', function () {
            lives -= 1;
            displayLives();
            console.log(lives)
        })
    })
}