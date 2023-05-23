import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
import BuffsController from "./BuffsController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const background = new Image();
background.src = "../../public/assets/images/bg.jpg";

let playerBullets = 5;
const playerBulletController = new BulletController(canvas, playerBullets, true, "player");
const enemyBulletController = new BulletController(canvas, 10, false, "enemy");
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 3, playerBulletController);
const buffsController = new BuffsController(canvas, player, enemyController);

let isGameOver = false;

let is2X = false;

let music = false;

let gamePaused = false;
let pauseButton = document.getElementById("pauseButton");
pauseButton.addEventListener("click", () => {
  if(!gamePaused){
    gamePaused = true;
    pauseButton.innerHTML = "Resume";
  }
  else{
    gamePaused = false;
    pauseButton.innerHTML = "Pause";
  }
});

let backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
  window.location.href = "../php/index.php";
});

let restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", () => {
  window.location.href = "../php/game.html";
});

// pause the game when the tab loses focus
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    gamePaused = true;
    pauseButton.innerHTML = "Resume";
  } else {
    gamePaused = false;
    pauseButton.innerHTML = "Pause";
  }
});

//Game Over
let gameOver = document.getElementById("gameOverID");

function game() {
  // if(!music){
  //   playSound();
  //   music = true;
  // }
  if(!gamePaused){
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayPoints();
    displayLevel();
    displayGameOver();
    displayEnemyLife();
    displayHearts();
    if (!isGameOver) {
      enemyController.draw(ctx);
      player.draw(ctx);
      playerBulletController.draw(ctx);
      enemyBulletController.draw(ctx);
      if (enemyController.buffSpawned()) {
        buffsController.draw(ctx, player, enemyController.buffX(), enemyController.buffY());
      }
      if (player.speedUp) {
        playerBulletController.setMaxBulletsAtATime(20);
        setTimeout(() => {
          player.speedUp = false;
          playerBulletController.setMaxBulletsAtATime(playerBullets);
          clearTimeout();
        }, 10000);
      }
      if (enemyController.buffParams.multiplier == 2) {
        is2X = true;
        setTimeout(() => {
          is2X = false;
          enemyController.buffMultiplier(false);
          clearTimeout();
        }, 5000);
      }
    }
  }
}

function reGame() {
  playerBulletController.clearBullets();
  enemyController.levelUp();
  // if (playerBullets < 15) {
  //   playerBullets += 1;
  //   playerBulletController.setMaxBulletsAtATime(playerBullets);
  // }
}

function displayGameOver() {
  if (isGameOver) {
    gameOver.style.display = "visible";
  }
}

function displayPoints() {
  var score = document.getElementById('scoreSpanID');

  while (score.firstChild) {
    score.removeChild(score.firstChild);
  }
  score.appendChild(document.createTextNode(enemyController.getPoints()));

  if (is2X) {
    score.style.color = "red";
  }
  else {
    score.style.color = "white";
  }


}

function displayEnemyLife() {
  var lives1 = document.getElementById('lifeSpan1ID');
  var lives2 = document.getElementById('lifeSpan2ID');
  var lives3 = document.getElementById('lifeSpan3ID');

  while (lives1.firstChild) {
    lives1.removeChild(lives1.firstChild);
  }
  lives1.appendChild(document.createTextNode(enemyController.getEnemy1Lives()));

  while (lives2.firstChild) {
    lives2.removeChild(lives2.firstChild);
  }
  lives2.appendChild(document.createTextNode(enemyController.getEnemy2Lives()));

  while (lives3.firstChild) {
    lives3.removeChild(lives3.firstChild);
  }
  lives3.appendChild(document.createTextNode(enemyController.getEnemy3Lives()));
}

function displayHearts() {
  var hearth1 = document.getElementById('heart1');
  var hearth2 = document.getElementById('heart2');
  var hearth3 = document.getElementById('heart3');

  if (player.getLife() == 2) {
    hearth3.src = "../../public/assets/images/pixel_emptyheart.png";
  } else if (player.getLife() == 1) {
    hearth2.src = "../../public/assets/images/pixel_emptyheart.png";
  } else if (player.getLife() == 0) {
    hearth1.src = "../../public/assets/images/pixel_emptyheart.png";
  }

}

function displayLevel() {
  var level = document.getElementById('levelSpanID');

  while (level.firstChild) {
    level.removeChild(level.firstChild);
  }
  level.appendChild(document.createTextNode(enemyController.getLevel()));
}


function checkGameOver() {
  if (isGameOver) {
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    player.hit();
    if (player.getLife() == 0) {
      isGameOver = true;
    }
  }

  if (enemyController.collideWith(player)) {
    player.hit();
    if (player.getLife() == 0) {
      isGameOver = true;
    }
  }

  if (enemyController.enemyRows.length === 0) {
    reGame();
  }
}


function onwindowresize() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
}

window.addEventListener("resize", onwindowresize);

function playSound() {
  var audio = new Audio("../../public/assets/sounds/bgmusic.mp3");
  audio.volume = 0.1;
  audio.play();
}

function setRecord(){
  var xhr = new XMLHttpRequest();
  var score = document.getElementById('scoreSpanID');

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var risposta = xhr.responseText;
      // Gestisci la risposta qui
      console.log(risposta); // Stampa la risposta nella console
    }
  };

  xhr.open("POST", "setRecord.php", true);
  xhr.send();
  xhr.send("score=" + encodeURIComponent(scoreValue));
}

setInterval(game, 1000 / 60);