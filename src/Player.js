
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
      this.y = this.canvas.height - this.canvas.height/3;
      // this.width = 100;
      // this.height = 80;
      this.width = this.calculateWidhtPlayer(100);
      this.height = this.calculateHeightPlayer(80);
      this.image = new Image();
      // this.image.src = "../public/assets/images/pspaceship.png";
      this.setImage();
      this.isMobileDevice();

      this.lifeLoseSound = new Audio("../public/assets/sounds/life-lose.wav");
      this.lifeLoseSound.volume = 0.1;

      this.lastLiveSound = new Audio("../public/assets/sounds/player-death-sound.wav");
      this.lastLiveSound.volume = 0.1;

      this.shieldLoseSound = new Audio("../public/assets/sounds/shield-break.wav");
      this.shieldLoseSound.volume = 0.1;

      this.buttonWidth = 50;
      this.buttonHeight = 50;
      this.buttonX = this.canvas.width / 2 - this.buttonWidth / 2;
      this.buttonY = this.canvas.height / 2 - this.buttonHeight / 2;
  
      document.addEventListener("keydown", this.keydown);
      document.addEventListener("keyup", this.keyup);
      document.addEventListener("touchstart", this.handleTouchMove);
      document.addEventListener("touchend", this.handleTouchMove);
      document.addEventListener("touchmove", this.handleTouchMove);

      window.addEventListener("resize", () => {
        if(window.innerWidth > 900)
        {
          this.width = 100*(window.innerWidth/1920);
          this.height = 80*(window.innerHeight/1080);
        }
      });
    }
  
    draw(ctx) {
      if (this.shootPressed) {
        this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
      }
      this.move();
      this.collideWithWalls();
      this.setImage();
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  
    collideWithWalls() {
      //left
      if (this.x < 0) {
        this.x = 0;
      }
  
      //right
      if (this.x > this.canvas.width - this.width) {
        this.x = this.canvas.width - this.width;
      }
    }
  
    move() {
      if (this.rightPressed) {
        this.x += this.velocity;
      } else if (this.leftPressed) {
        this.x += -this.velocity;
      }
    }
  
    keydown = (event) => {
      if (event.code == "ArrowRight") {
        this.rightPressed = true;
      }
      if (event.code == "ArrowLeft") {
        this.leftPressed = true;
      }
      if (event.code == "KeyD") {
        this.rightPressed = true;
      }
      if (event.code == "KeyA") {
        this.leftPressed = true;
      }
      if (event.code == "Space") {
        this.shootPressed = true;
      }
    };
  
    keyup = (event) => {
      if (event.code == "ArrowRight") {
        this.rightPressed = false;
      }
      if (event.code == "ArrowLeft") {
        this.leftPressed = false;
      }
      if (event.code == "KeyD") {
        this.rightPressed = false;
      }
      if (event.code == "KeyA") {
        this.leftPressed = false;
      }
      if (event.code == "Space") {
        this.shootPressed = false;
      }
    };

    setImage(){
      if(this.shield && this.speedUp){
        this.image.src = "../public/assets/images/shieldspeedspaceship.png";
      } else if(this.shield){
        this.image.src = "../public/assets/images/shieldstarship.png";
      } else if(this.speedUp){
        this.image.src = "../public/assets/images/speedstarship.png";
      } else {
        this.image.src = "../public/assets/images/pspaceship.png";
      }
    }

    getLife(){
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

    setShield(){
      this.shield = true;
    }

    setSpeedUp(){
      this.speedUp = true;
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
    handleTouchMove = (event) => {
      const touch = event.touches[0];
      
       if (event.type === 'touchstart') {
          this.startPosX = touch.pageX;
        } else if (event.type === 'touchmove') {
          const currentPosX = touch.pageX;
          
          if (currentPosX > this.startPosX) {
            this.rightPressed = true;
            this.leftPressed = false;
          } else {
            this.leftPressed = true;
            this.rightPressed = false;
          }
        } else if (event.type === 'touchend') {
          this.rightPressed = false;
          this.leftPressed = false;
        }
      }

      handleTouchShoot = (event) => {
        if (event.type === 'touchstart'){
          this.shootPressed = true;
        } else if (event.type === 'touchend'){
          this.shootPressed = false;
        }
      }

      calculateWidhtPlayer(initWidth){
    
        if(window.innerWidth > 900)
        {
          return initWidth*(window.innerWidth/1920);
        }
        else
        {
          return 50;
        }
      }
    
    
    
      calculateHeightPlayer(initHeight){
        if(window.innerWidth > 900)
        {
          return initHeight*(window.innerHeight/1080);
        }
        else
        {
          return 40;
        }
    
      }
    
  }