/**
 * @class Player
 * @classdesc Classe che gestisce il giocatore e i suoi bullet sparati
 * @param {HTMLCanvasElement} canvas - Canvas su cui disegnare il giocatore
 * @param {number} velocity - Velocità del giocatore
 * @param {BulletController} bulletController - Controller dei bullet
 * @exports Player
 * @version 1.0.0
 * @author Matteo Zacchino
 */
export default class Player {
    rightPressed = false;
    leftPressed = false;
    shootPressed = false;
    life = 3;
    points = 0;
    shield = false;
    speedUp = false;
    startPosX;
    mobileMovement;
    isMobile;
  
    constructor(canvas, velocity, bulletController) {
      this.canvas = canvas;
      this.velocity = velocity;
      this.bulletController = bulletController;
  
      this.x = this.canvas.width / 2;
      // this.y = this.canvas.height - this.canvas.height/3;
      
      //imposta la posizione del giocatore in base alla dimensione dello schermo
      if(window.innerWidth > 900)
      {
        this.y = this.canvas.height - this.canvas.height/3;
      }
      else
      {
        this.y = this.canvas.height - this.canvas.height/4;
      }

      // this.width = 100;
      // this.height = 80;
      this.width = this.calculateWidhtPlayer(100);
      this.height = this.calculateHeightPlayer(80);
      this.image = new Image();
      // this.image.src = "../public/assets/images/pspaceship.png";
      this.setImage();
      this.isMobileDevice();

      this.lifeLoseSound = new Audio("../../public/assets/sounds/life-lose.wav");
      this.lifeLoseSound.volume = 0.1;

      this.lastLiveSound = new Audio("../../public/assets/sounds/player-death-sound.wav");
      this.lastLiveSound.volume = 0.1;

      this.shieldLoseSound = new Audio("../../public/assets/sounds/shield-break.wav");
      this.shieldLoseSound.volume = 0.1;

      document.addEventListener("keydown", this.keydown);
      document.addEventListener("keyup", this.keyup);

      this.divscroll = document.getElementById("scrollercontainerID");
      this.divscroll.addEventListener("touchstart", this.handleTouchMove);
      this.divscroll.addEventListener("touchend", this.handleTouchMove);
      this.divscroll.addEventListener("touchmove", this.handleTouchMove);
      
      this.divshoot = document.getElementById("shotcontainerID");
      this.divshoot.addEventListener("touchstart", this.handleTouchShoot);
      this.divshoot.addEventListener("touchend", this.handleTouchShoot);

      window.addEventListener("resize", () => {
        if(window.innerWidth > 900)
        {
          this.width = 100*(window.innerWidth/1920);
          this.height = 80*(window.innerHeight/1080);
        }
      });
    }
  
    draw(ctx) { // disegno il giocatore
      if (this.shootPressed) { // se il flag è true
        this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10); // sparo
      }
      this.move(); // muovo il giocatore
      this.collideWithWalls(); // controllo se il giocatore collide con i muri
      this.setImage(); // setto l'immagine del giocatore
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height); // disegno il giocatore
    }
  
    collideWithWalls() { // funzione che gestisce le collisioni con i muri
      //left
      if (this.x < 0) { // se la x è minore di 0
        this.x = 0; // setto la x a 0
      }
  
      //right
      if (this.x > this.canvas.width - this.width) { // se la x è maggiore della larghezza del canvas - la larghezza del giocatore
        this.x = this.canvas.width - this.width; // setto la x alla larghezza del canvas - la larghezza del giocatore
      }
    }
  
    move() { // funzione che muove il giocatore
      if (this.rightPressed) { // se il flag è true
        this.x += this.velocity; // muovo il giocatore a destra
      } else if (this.leftPressed) {  // se il flag è true
        this.x += -this.velocity; // muovo il giocatore a sinistra
      }
    }
   
    keydown = (event) => { // funzione che gestisce la pressione dei tasti
      if (event.code == "ArrowRight") { // se il tasto premuto è la freccia destra
        this.rightPressed = true; // setto il flag a true
      }
      if (event.code == "ArrowLeft") { // se il tasto premuto è la freccia sinistra
        this.leftPressed = true; // setto il flag a true
      }
      if (event.code == "KeyD") { // se il tasto premuto è la D
        this.rightPressed = true; // setto il flag a true
      }
      if (event.code == "KeyA") { // se il tasto premuto è la A
        this.leftPressed = true; // setto il flag a true
      }
      if (event.code == "Space") { // se il tasto premuto è la Space
        this.shootPressed = true; // setto il flag a true
      }
    };
  
    keyup = (event) => { // funzione che gestisce il rilascio dei tasti
      if (event.code == "ArrowRight") { // se il tasto rilasciato è la freccia destra
        this.rightPressed = false; // setto il flag a false
      }
      if (event.code == "ArrowLeft") { // se il tasto rilasciato è la freccia sinistra
        this.leftPressed = false; // setto il flag a false
      }
      if (event.code == "KeyD") { // se il tasto rilasciato è la D
        this.rightPressed = false; // setto il flag a false
      }
      if (event.code == "KeyA") { // se il tasto rilasciato è la A
        this.leftPressed = false; // setto il flag a false
      }
      if (event.code == "Space") { // se il tasto rilasciato è la Space
        this.shootPressed = false; // setto il flag a false
      }
    };

    setImage(){ // setto l'immagine del giocatore
      if(this.shield && this.speedUp){ // se lo scudo e la velocità sono attivi
        this.image.src = "../../public/assets/images/shieldspeedspaceship.png"; // setto l'immagine dello scudo e della velocità
      } else if(this.shield){ // se lo scudo è attivo
        this.image.src = "../../public/assets/images/shieldstarship.png"; // setto l'immagine dello scudo
      } else if(this.speedUp){ // se la velocità è attiva
        this.image.src = "../../public/assets/images/speedstarship.png"; // setto l'immagine della velocità
      } else { // altrimenti
        this.image.src = "../../public/assets/images/pspaceship.png"; // setto l'immagine di default
      }
    }

    getLife(){ // ritorno la vita del giocatore
      return this.life; 
    }

    hit(){ 
      if (this.shield){ // Se lo scudo è attivo
        this.shieldLoseSound.currentTime = 0; // Imposta il suono al tempo 0
        this.shieldLoseSound.play(); // Riproduce il suono
        this.shield = false; // Disattiva lo scudo
      }
      else{ // Altrimenti
        if(this.life == 1){ // Se la vita del giocatore è 1
          this.lastLiveSound.currentTime = 0; // Imposta il suono al tempo 0
          this.lastLiveSound.play(); // Riproduce il suono
          this.life -= 1; // Diminuisce la vita del giocatore
        }
        else{ // Altrimenti
        this.lifeLoseSound.currentTime = 0; // Imposta il suono al tempo 0
        this.lifeLoseSound.play(); // Riproduce il suono
        this.life -= 1; // Diminuisce la vita del giocatore
        }
      }
    }

    setShield(){ // Attiva lo scudo
      this.shield = true; // Attiva lo scudo
    }
 
    setSpeedUp(){ // Attiva la velocità
      this.speedUp = true; // Attiva la velocità
    }

    isMobileDevice(){
      if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i) ||
        window.innerWidth < 768) {
        // si sta utilizzando un browser mobile
        return this.isMobile = true;

      } else {
        // si sta utilizzando un browser desktop
        return this.isMobile = false;

      }
    }

    // Comandi mobile
    handleTouchMove = (event) => { // funzione che gestisce il touch per muoversi
      const touch = event.touches[0]; // prendo il primo tocco
      
      
       if (event.type === 'touchstart') { // se il touch è iniziato
          this.startPosX = touch.pageX; // setto la posizione iniziale
        } else if (event.type === 'touchmove') { // se il touch è in movimento
          const currentPosX = touch.pageX; // prendo la posizione attuale
          
          if (currentPosX > this.startPosX) { // se la posizione attuale è maggiore di quella iniziale
            this.rightPressed = true; // setto il flag a true
            this.leftPressed = false; // setto il flag a false
          } else {
            this.leftPressed = true; // setto il flag a true
            this.rightPressed = false; // setto il flag a false
          }
        } else if (event.type === 'touchend') { // se il touch è finito
          this.rightPressed = false; // setto il flag a false
          this.leftPressed = false; // setto il flag a false
        }
      }

      handleTouchShoot = (event) => { // funzione che gestisce il touch per sparare
        if (event.type === 'touchstart'){ // se il touch è iniziato
          this.shootPressed = true; // setto il flag a true
        } else if (event.type === 'touchend'){ // se il touch è finito
          this.shootPressed = false;  // setto il flag a false
        }
      }

      calculateWidhtPlayer(initWidth){ // calcolo la larghezza del player
    
        if(window.innerWidth > 900) // se la larghezza dello schermo è maggiore di 900
        {
          return initWidth*(window.innerWidth/1920); // calcolo la larghezza
        }
        else
        {
          return 50; // altrimenti ritorno 50
        } 
      }
    
    
    
      calculateHeightPlayer(initHeight){ // calcolo l'altezza del player
        if(window.innerWidth > 900) // se la larghezza dello schermo è maggiore di 900
        {
          return initHeight*(window.innerHeight/1080); // calcolo l'altezza
        }
        else
        {
          return 40; // altrimenti ritorno 40
        }
    
      }
    
  }