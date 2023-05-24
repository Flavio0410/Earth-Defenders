import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
import BuffsController from "./BuffsController.js";


let isGameOver = false; // variabile che indica se il gioco è finito

let is2X = false; // variabile che indica se il punteggio è moltiplicato per 2

let music = false; // variabile che indica se la musica è già stata avviata

let gamePaused = false; // variabile che indica se il gioco è in pausa

const canvas = document.getElementById("game"); // prendo il canvas dal DOM
const ctx = canvas.getContext("2d"); // prendo il contesto 2d del canvas

canvas.width = document.body.clientWidth; // setto la larghezza del canvas
canvas.height = document.body.clientHeight; // setto l'altezza del canvas

const background = new Image(); // creo un'immagine
background.src = "../../public/assets/images/bg.jpg"; // setto il path dell'immagine




let playerBullets = 5; // numero di proiettili del player all'inizio del gioco (aumenta con il livello)
const playerBulletController = new BulletController(canvas, playerBullets, true, "player"); // creo il controller dei proiettili del player (canvas, numero di proiettili, player, tipo di proiettile)
const enemyBulletController = new BulletController(canvas, 10, false, "enemy"); // creo il controller dei proiettili dei nemici (canvas, numero di proiettili, nemico, tipo di proiettile) 
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 3, playerBulletController); // creo il player (canvas, vite, controller dei proiettili del player)
const buffsController = new BuffsController(canvas, player, enemyController); // creo il controller dei buff (canvas, player, controller dei nemici)


let pauseButton = document.getElementById("pauseButton"); // prendo il bottone di pausa dal DOM
pauseButton.addEventListener("click", () => { // aggiungo un listener al bottone di pausa
  if(!gamePaused){ // se il gioco non è in pausa
    gamePaused = true; // metto il gioco in pausa
    pauseButton.innerHTML = "Resume"; // cambio il testo del bottone
  }
  else{
    gamePaused = false;
    pauseButton.innerHTML = "Pause";
  }
});



let backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
  gamePaused = true;
  let rsmbtn = document.getElementById("resumegamebtn");
  rsmbtn.addEventListener("click", () => {
    gamePaused = false;
  }
  );

  let extbtn = document.getElementById("extgamebtn");
  extbtn.addEventListener("click", () => {
    window.location.href = "../php/welcome.php";
  });

});

let restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", () => {
  window.location.href = "../php/game.php";
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
    setRecord();
    gamePaused = true;
    document.getElementById("containerGameOverID").style.display = "block";
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

// function setRecord(){
//   var xhr = new XMLHttpRequest();
//   var score = document.getElementById('scoreSpanID');

//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       var risposta = xhr.responseText;
//       // Gestisci la risposta qui
//       console.log(risposta); // Stampa la risposta nella console
//     }
//   };

//   xhr.open("POST", "setRecord.php", true);
//   xhr.send();
//   xhr.send("score=" + encodeURIComponent(score));
// }

function setRecord(){
  var score = enemyController.getPoints();
  // Creazione di un oggetto FormData per inviare i dati
  var formData = new FormData();
  formData.append('score', score);

  // Creazione di una richiesta XMLHTTP
  var request = new XMLHttpRequest();
  request.open('POST', 'setRecord.php', true);

  // Gestione della risposta
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Successo
      var response = request.responseText;
      console.log(response);
    } else {
      // Errore
      console.error('Errore nella richiesta.');
    }
  };

  // Invio dei dati
  request.send(formData);
}

setInterval(game, 1000 / 60);