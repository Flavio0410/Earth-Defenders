/**
 * @class BuffsController
 * @classdesc Classe che gestisce i buff che possono essere raccolti dal giocatore per ottenere dei potenziamenti temporanei o permanenti
 * @param {HTMLCanvasElement} canvas - Canvas su cui disegnare i buff
 * @param {Player} player - Oggetto che rappresenta il giocatore
 * @param {EnemyController} enemyController - Oggetto che gestisce i nemici
 * @exports BuffsController
 * @requires Buffs
 * @version 1.0.0
 * @author Matteo Zacchino
 */

import Buffs from "./Buffs.js"

export default class BuffsController {

    isSpawned = false;
    newBuff = false;

    constructor(canvas, player, enemyController) {
        this.canvas = canvas;
        this.player = player;
        this.enemyController = enemyController;

        this.powerUpSound = new Audio("../../public/assets/sounds/powerUp.mp3");
        this.powerUpSound.volume = 0.1;

        this.buff = new Buffs(0,0);
    }

    draw(ctx, player, x, y) { //x e y sono le coordinate del nemico che ha spawnato il buff
        if(!this.newBuff){ // se non è stato creato un nuovo buff
            this.createBuff(x,y); // creo un nuovo buff
            this.newBuff = true; // setto il flag a true
            this.isSpawned = true; // setto il flag a true
        }
        this.collisionDetection(player); // controllo se il buff è stato preso
        this.buff.draw(ctx); // disegno il buff
      }

    createBuff(x,y){ // creo un nuovo buff
        this.buff.setX(x); // setto la x del buff
        this.buff.setY(y); // setto la y del buff
        this.buff.setType(); // setto il tipo del buff
        this.buff.setImage(); // setto l'immagine del buff
    }

    collisionDetection(player){ // controllo se il buff è stato preso
        if(this.buff.collideWith(player) && this.isSpawned){ // se il buff collide con il player e il buff è spawnato
            this.powerUpSound.currentTime = 0; // resetto il tempo dell'audio
            this.powerUpSound.play(); // faccio partire l'audio
            this.isSpawned = false; // setto il flag a false
            this.newBuff = false; // setto il flag a false
            this.enemyController.resetBuffSpawn(); // resetto il timer per il prossimo spawn 
            if(this.buff.type == "shieldbuff"){ // se il buff è uno shieldbuff
                this.player.setShield(); // setto lo shield del player
            } else if (this.buff.type == "pspeed"){ // se il buff è uno pspeed
                this.player.setSpeedUp(); // setto la velocità del player
            } else {
                this.enemyController.buffMultiplier(true); // setto il moltiplicatore dei nemici
            }
        } else if (this.buff.getY() > this.canvas.height && this.isSpawned){ // se il buff è spawnato ma non è stato preso
            this.isSpawned = false; // setto il flag a false
            this.newBuff = false; // setto il flag a false
            this.enemyController.resetBuffSpawn(); // resetto il timer per il prossimo spawn
        }
    }

    spawnBuff(){ // funzione che spawna il buff
        this.isSpawned = true; // setto il flag a true
    }
}