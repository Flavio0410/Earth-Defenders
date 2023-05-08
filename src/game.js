import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
import Buffs from "./Buffs.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const background = new Image();
background.src = "../public/assets/images/space.png";

let playerBullets = 5;
const playerBulletController = new BulletController(canvas, playerBullets, "white", true);
const enemyBulletController = new BulletController(canvas, 10, "red", false);
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 3, playerBulletController);
const buffs = new Buffs(0,0);
buffs.setImage();

let isGameOver = false;
let newBuff = false;

function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayPoints();
  displayLevel();
  displayRecord();
  displayGameOver();
  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
    if(enemyController.buffSpawned()){
      if(!this.newBuff){
        buffs.setX(enemyController.buffX());
        buffs.setY(enemyController.buffY());
        this.newBuff = true;
      }
      buffs.draw(ctx);
    }
  }
}

function reGame(){
  enemyController.levelUp();
  if(playerBullets < 15){
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
    //isGameOver = false;
  }
}

function displayPoints() {
    let text = "Punti: " + enemyController.getPoints();
    
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(text, (canvas.width / 2) - 20, 45);
}

function displayLevel() {
  let text = "Livello: " + enemyController.getLevel();
  
  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText(text, 20, 45);
}

function displayRecord() {
  let text = "Record: " + enemyController.getLevel();
  
  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText(text, canvas.width - 200, 45);
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    player.hit();
    if (player.getLife() == 0){
      isGameOver = true;
    }
  }

  if (enemyController.collideWith(player)) {
    player.hit();
    if (player.getLife() == 0){
      isGameOver = true;
    }
  }

  if (enemyController.enemyRows.length === 0) {
    //isGameOver = true;
    reGame();
  }
}

function onwindowresize() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
}

window.addEventListener("resize", onwindowresize);

setInterval(game, 1000 / 60);