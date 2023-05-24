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



let pauseButton = document.getElementById("pauseButton"); // prendo il bottone di pausa
pauseButton.addEventListener("click", () => { // aggiungo un listener al bottone di pausa
  gamePaused = true; // metto il gioco in pausa
  document.getElementById("containerPauseID").style.display = "block"; // mostro il container di pausa
  
  let rsmbtn = document.getElementById("resumeButtonID"); // prendo il bottone di resume
  rsmbtn.addEventListener("click", () => { // aggiungo un listener al bottone di resume
    document.getElementById("containerPauseID").style.display = "none"; // nascondo il container di pausa
    gamePaused = false; // tolgo il gioco dalla pausa
  }
  );
});




let backButton = document.getElementById("backButton"); // prendo il bottone di back
backButton.addEventListener("click", () => { // aggiungo un listener al bottone di back
  gamePaused = true; // metto il gioco in pausa
  let rsmbtn = document.getElementById("resumegamebtn"); // prendo il bottone di resume
  rsmbtn.addEventListener("click", () => {  // aggiungo un listener al bottone di resume
    gamePaused = false; // tolgo il gioco dalla pausa
  }
  );

  let extbtn = document.getElementById("extgamebtn"); // prendo il bottone di exit
  extbtn.addEventListener("click", () => { // aggiungo un listener al bottone di exit
    window.location.href = "../php/welcome.php"; // torno alla pagina di welcome
  }); 

});

let restartButton = document.getElementById("restartButton"); // prendo il bottone di restart
restartButton.addEventListener("click", () => { // aggiungo un listener al bottone di restart
  window.location.href = "../php/game.php"; // ricarico la pagina
});

let endReturnHome = document.getElementById("returnHomeButton"); // prendo il bottone di return home
endReturnHome.addEventListener("click", () => { // aggiungo un listener al bottone di return home
  window.location.href = "../php/welcome.php"; // torno alla pagina di welcome
});

function game() {
  if(!music){ // se la musica non è ancora stata avviata
    playSound(); // avvio la musica
    music = true; // setto la variabile a true
  }
  if(!gamePaused){ // se il gioco non è in pausa
    checkGameOver(); // controllo se il gioco è finito
    displayGameOver(); // mostro il game over
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // disegno lo sfondo
    displayPoints(); // mostro i punti
    displayLevel(); // mostro il livello
    displayEnemyLife(); // mostro le vite dei nemici
    displayHearts(); // mostro le vite del player
    if (!isGameOver) { // se il gioco non è finito
      enemyController.draw(ctx); // disegno i nemici
      player.draw(ctx); // disegno il player
      playerBulletController.draw(ctx); // disegno i proiettili del player
      enemyBulletController.draw(ctx); // disegno i proiettili dei nemici
      if (enemyController.buffSpawned()) { // se il buff è spawnato
        buffsController.draw(ctx, player, enemyController.buffX(), enemyController.buffY()); // disegno il buff
      }
      if (player.speedUp) { // se il player ha il buff di velocità
        playerBulletController.setMaxBulletsAtATime(20); // aumento il numero di proiettili del player
        setTimeout(() => { // dopo 10 secondi
          player.speedUp = false; // tolgo il buff di velocità
          playerBulletController.setMaxBulletsAtATime(playerBullets); // resetto il numero di proiettili del player
          clearTimeout(); // cancello il timeout
        }, 10000);
      }
      if (enemyController.buffParams.multiplier == 2) { // se il buff è di moltiplicazione
        is2X = true; // setto la variabile a true
        setTimeout(() => { // dopo 5 secondi
          is2X = false; // setto la variabile a false
          enemyController.buffMultiplier(false); // tolgo il buff di moltiplicazione
          clearTimeout(); // cancello il timeout
        }, 5000);
      }
    }
  }
}

function reGame() { // funzione che resetta il gioco
  playerBulletController.clearBullets(); // cancello i proiettili del player
  enemyController.levelUp(); // aumento il livello
}

function displayGameOver() { // funzione che mostra il game over
  if (isGameOver) { // se il gioco è finito
    setRecord(); // setto il record
    gamePaused = true; // metto il gioco in pausa
    document.getElementById("containerGameOverID").style.display = "block"; // mostro il container del game over
  }
}

function displayPoints() { // funzione che mostra i punti
  var score = document.getElementById('scoreSpanID'); // prendo lo span dei punti

  while (score.firstChild) { // finchè lo span ha un figlio
    score.removeChild(score.firstChild); // rimuovo il figlio
  }
  score.appendChild(document.createTextNode(enemyController.getPoints())); // aggiungo il punteggio

  if (is2X) { // se il punteggio è moltiplicato per 2
    score.style.color = "red"; // setto il colore a rosso
  }
  else { // altrimenti
    score.style.color = "white"; // setto il colore a bianco
  }


}

function displayEnemyLife() { // funzione che mostra le vite dei nemici
  var lives1 = document.getElementById('lifeSpan1ID'); // prendo lo span delle vite del nemico 1
  var lives2 = document.getElementById('lifeSpan2ID'); // prendo lo span delle vite del nemico 2
  var lives3 = document.getElementById('lifeSpan3ID'); // prendo lo span delle vite del nemico 3

  while (lives1.firstChild) { // finchè lo span ha un figlio
    lives1.removeChild(lives1.firstChild); // rimuovo il figlio
  }
  lives1.appendChild(document.createTextNode(enemyController.getEnemy1Lives())); // aggiungo le vite del nemico 1

  while (lives2.firstChild) { // finchè lo span ha un figlio
    lives2.removeChild(lives2.firstChild); // rimuovo il figlio
  }
  lives2.appendChild(document.createTextNode(enemyController.getEnemy2Lives())); // aggiungo le vite del nemico 2

  while (lives3.firstChild) { // finchè lo span ha un figlio
    lives3.removeChild(lives3.firstChild); // rimuovo il figlio
  }
  lives3.appendChild(document.createTextNode(enemyController.getEnemy3Lives())); // aggiungo le vite del nemico 3
}

function displayHearts() { // funzione che mostra le vite del player
  var hearth1 = document.getElementById('heart1'); // prendo l'immagine della vita 1
  var hearth2 = document.getElementById('heart2'); // prendo l'immagine della vita 2
  var hearth3 = document.getElementById('heart3'); // prendo l'immagine della vita 3

  if (player.getLife() == 2) { // se il player ha 2 vite
    hearth3.src = "../../public/assets/images/pixel_emptyheart.png"; // setto l'immagine della vita 3 a vuota
  } else if (player.getLife() == 1) { // se il player ha 1 vita
    hearth2.src = "../../public/assets/images/pixel_emptyheart.png"; // setto l'immagine della vita 2 a vuota
  } else if (player.getLife() == 0) { // se il player ha 0 vite
    hearth1.src = "../../public/assets/images/pixel_emptyheart.png"; // setto l'immagine della vita 1 a vuota
  }

}

function displayLevel() { // funzione che mostra il livello
  var level = document.getElementById('levelSpanID'); // prendo lo span del livello

  while (level.firstChild) { // finchè lo span ha un figlio
    level.removeChild(level.firstChild); // rimuovo il figlio
  }
  level.appendChild(document.createTextNode(enemyController.getLevel())); // aggiungo il livello
}


function checkGameOver() { // funzione che controlla se il gioco è finito
  if (isGameOver) { // se il gioco è finito
    return;
  }

  if (enemyBulletController.collideWith(player)) { // se un proiettile nemico collide con il player
    player.hit(); // il player viene colpito
    if (player.getLife() == 0) { // se il player ha 0 vite
      isGameOver = true; // il gioco è finito
    }
  }

  if (enemyController.collideWith(player)) { // se un nemico collide con il player
    player.hit(); // il player viene colpito
    if (player.getLife() == 0) { // se il player ha 0 vite
      isGameOver = true;
    }
  }

  if (enemyController.enemyRows.length === 0) { // se non ci sono più nemici
    reGame(); // resetto il gioco
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
      console.log('Successo nella richiesta.');
    } else {
      // Errore
      console.error('Errore nella richiesta.');
    }
  };

  // Invio dei dati
  request.send(formData);
}

setInterval(game, 1000 / 60); // richiamo la funzione game 60 volte al secondo