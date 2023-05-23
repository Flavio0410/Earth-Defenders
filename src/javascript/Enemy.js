export default class Enemy {

  constructor(x, y, imageNumber, life) {
    this.x = x;
    this.y = y + 10;
    this.width = this.calculateWidhtEnemy(42);
    this.height = this.calculateHeightEnemy(42);
    this.life = life;

    this.image = new Image();
    this.image.src = `../../public/assets/images/penemy${imageNumber}.png`;
    
    window.addEventListener("resize", () => {
      this.x = x;
      this.y = y + 10;
      if(window.innerWidth > 900)
      {
        this.width = 42*(window.innerWidth/1920);
        this.height = 42*(window.innerHeight/1080);
      }
    });
    

  }

  draw(ctx) { // disegno il nemico
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height); 
  }

  move(xVelocity, yVelocity) { // muovo il nemico
    this.x += xVelocity; 
    this.y += yVelocity;
  }

  collideWith(sprite) { // controllo se il nemico collide con un altro sprite
    if (
      this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height
    ) { // se collide
      return true; // ritorno true
    } else {
      return false; // ritorno false
    }
  }

  getLife(){ // ritorno la vita del nemico
    return this.life;
  }

  hit(){ // il nemico viene colpito
    this.life -= 1; // decremento la vita
  }

  getX(){ // ritorno la x del nemico
    return this.x;
  }

  getY(){ // ritorno la y del nemico
    return this.y;
  }

  calculateWidhtEnemy(initWidth){ // calcolo la larghezza del nemico
    
    if(window.innerWidth > 900) // se la larghezza della finestra è maggiore di 900
    {
      return initWidth*(window.innerWidth/1920); // calcolo la larghezza del nemico
    }
    else
    {
      return 26; // altrimenti ritorno 26
    }
  }

  calculateHeightEnemy(initHeight){ // calcolo l'altezza del nemico
    if(window.innerWidth > 900) // se la larghezza della finestra è maggiore di 900
    {
      return initHeight*(window.innerHeight/1080); // calcolo l'altezza del nemico
    }
    else
    {
      return 26; // altrimenti ritorno 26
    }

  }

}