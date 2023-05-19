export default class Buffs {

    constructor(x, y) { 
      this.x = x;
      this.y = y;
      this.width = 40;
      this.height = 44;
      
      this.enemyDeathSound = new Audio("../../public/assets/sounds/enemy-death.wav");
      this.enemyDeathSound.volume = 0.1;

      this.image = new Image();
      this.type;
    }

    setImage(){
      this.image.src = "../../public/assets/images/" + this.type + ".png";
    }

    // Imposta il tipo di buff
    setType(){
      var randomNum = Math.random(); // Genera un numero casuale tra 0 e 1

      if (randomNum < 0.5) { // Se il numero è minore di 0.5, il buff sarà un buff di scudo
        this.type = "shieldbuff"; // Imposta il tipo di buff
      } else if (randomNum < 0.75) { // Se il numero è minore di 0.75, il buff sarà un buff di velocità di sparo
        this.type = "pspeed"; // Imposta il tipo di buff
      } else { // Se il numero è maggiore di 0.75, il buff sarà un buff di punti
        this.type = "2xbuff"; // Imposta il tipo di buff
      }
    }

    // Funzione che 
    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height); // Disegna il buff
      this.moveDown(); // Muove il buff verso il basso
    }
  
    // Funzione che 
    move(xVelocity, yVelocity) {
      this.x += xVelocity; // Muove il buff verso destra
      this.y += yVelocity; // Muove il buff verso il basso
    }

    // Funzione che muove il buff verso il basso
    moveDown(){
      this.y += 2; // Muove il buff verso il basso
    }
  
    // Funzione che controlla se il buff collide con un altro sprite
    collideWith(sprite) {
      if (
        this.x + this.width > sprite.x &&
        this.x < sprite.x + sprite.width &&
        this.y + this.height > sprite.y &&
        this.y < sprite.y + sprite.height
      ) { // Se il buff collide con un altro sprite
        return true; // Restituisce true
      } else {
        return false; // Altrimenti restituisce false
      }
    }

    // Funzione che 
    setX(newX){
      this.x = newX; // Imposta la nuova coordinata x del buff
    }

    setY(newY){
      this.y = newY; // Imposta la nuova coordinata y del buff
    }

    getY(){
      return this.y; // Restituisce la coordinata y del buff
    }

  }