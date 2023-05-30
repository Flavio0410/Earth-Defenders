/**
 * @class BulletController
 * @classdesc Classe che gestisce i bullet sparati dal giocatore e dai nemici
 * @author Matteo Zacchino
 * @param {HTMLCanvasElement} canvas - Canvas su cui disegnare i bullet
 * @param {number} maxBulletsAtATime - Numero massimo di bullet che possono essere presenti nel canvas
 * @param {boolean} soundEnabled - Flag che indica se i suoni sono attivi
 * @param {string} type - Tipo di bullet (player o enemy)
 * @exports BulletController
 * @requires Bullet
 * @version 1.0.0
 */

import Bullet from "./Bullet.js";

export default class BulletController {
  bullets = [];
  timeTillNextBulletAllowed = 0;

  constructor(canvas, maxBulletsAtATime, soundEnabled, type) {
    this.canvas = canvas;
    this.maxBulletsAtATime = maxBulletsAtATime;
    this.soundEnabled = soundEnabled;
    this.type = type;

    this.shootSound = new Audio("../../public/assets/sounds/shoot.wav");
    this.shootSound.volume = 0.1;
  }

  draw(ctx) { // disegno i bullet
    this.bullets = this.bullets.filter( // filtro i bullet
      (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height // se il bullet è ancora nel canvas
    ); 

    this.bullets.forEach((bullet) => bullet.draw(ctx)); // disegno i bullet
    if (this.timeTillNextBulletAllowed > 0) { // se il timer è maggiore di 0
      this.timeTillNextBulletAllowed--;  // decremento il timer
    }
  }

  collideWith(sprite) { // controllo se un bullet collide con un altro sprite
    const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) => // trovo il bullet che collide
      bullet.collideWith(sprite) // ritorno true se collide
    );

    if (bulletThatHitSpriteIndex >= 0) { // se il bullet collide
      this.bullets.splice(bulletThatHitSpriteIndex, 1); // rimuovo il bullet
      return true; // ritorno true
    }

    return false; // ritorno false
  }

  shoot(x, y, velocity, timeTillNextBulletAllowed = 0) { // funzione che spara il bullet
    if (
      this.timeTillNextBulletAllowed <= 0 &&
      this.bullets.length < this.maxBulletsAtATime
    ) { // se il timer è minore o uguale a 0 e il numero di bullet è minore del numero massimo di bullet
      const bullet = new Bullet(this.canvas, x, y, velocity, this.type); // creo un nuovo bullet
      this.bullets.push(bullet); // aggiungo il bullet all'array
      if (this.soundEnabled) { // se il suono è abilitato
        this.shootSound.currentTime = 0; // resetto il tempo dell'audio
        this.shootSound.play(); // faccio partire l'audio
      } 
      this.timeTillNextBulletAllowed = timeTillNextBulletAllowed; // setto il timer
    }
  }

  setMaxBulletsAtATime(bullets){ // setto il numero massimo di bullet
    this.maxBulletsAtATime = bullets; 
  }

  clearBullets(){ // funzione che rimuove tutti i bullet
    this.bullets = []; 
  }
}