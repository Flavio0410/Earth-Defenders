export default class Bullet {

    constructor(canvas, x, y, velocity, type) {
      this.canvas = canvas;
      this.x = x;
      this.y = y;
      this.velocity = velocity;
      this.type = type;
      this.img = new Image();
      this.setImage();
  
      this.width = 10;
      this.height = 25;
    }
  
    draw(ctx) { // disegno il bullet
      this.y -= this.velocity; // faccio muovere il bullet
      // ctx.fillStyle = this.bulletColor;
      // ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // disegno il bullet
    }
  
    collideWith(sprite) { // controllo se il bullet collide con un altro sprite
      if ( // se collide
        this.x + this.width > sprite.x && 
        this.x < sprite.x + sprite.width &&
        this.y + this.height > sprite.y &&
        this.y < sprite.y + sprite.height
      ) { 
        return true; // ritorno true
      } else {
        return false; // ritorno false
      }
    }

    setImage(){ // setto l'immagine del bullet
      if (this.type == "player"){ // se è un bullet del player
        this.img.src = "../../public/assets/images/bullet.png"; // setto l'immagine
      } else if (this.type == "enemy"){ // se è un bullet del nemico
        this.img.src = "../../public/assets/images/enemybullet.png"; // setto l'immagine
      }
    }
  }