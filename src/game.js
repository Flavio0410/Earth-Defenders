import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
import BuffsController from "./BuffsController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const background = new Image();
background.src = "../public/assets/images/spacebg.jpg";

let playerBullets = 5;
const playerBulletController = new BulletController(canvas, playerBullets, "white", true);
const enemyBulletController = new BulletController(canvas, 10, "red", false);
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 3, playerBulletController);
const buffsController = new BuffsController(canvas, player, enemyController);

let isGameOver = false;

let is2X = false;

function game() {
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
      }, 10000);
    }
    if (enemyController.buffParams.multiplier == 2) {
      is2X = true;
      setTimeout(() => {
        is2X = false;
        enemyController.buffMultiplier(false);
      }, 5000);
    }
  }
}

function reGame() {
  enemyController.levelUp();
  if (playerBullets < 15) {
    playerBullets += 1;
    playerBulletController.setMaxBulletsAtATime(playerBullets);
  }
}

function displayGameOver() {
  if (isGameOver) {
    let text = "Game Over";

    ctx.fillStyle = "white";
    ctx.font = "70px Arial";
    ctx.fillText(text, (canvas.width / 3) + 70, canvas.height / 2);
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
    hearth3.src = "../public/assets/images/pixel_emptyheart.png";
  } else if (player.getLife() == 1) {
    hearth2.src = "../public/assets/images/pixel_emptyheart.png";
  } else if (player.getLife() == 0) {
    hearth1.src = "../public/assets/images/pixel_emptyheart.png";
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

setInterval(game, 1000 / 60);