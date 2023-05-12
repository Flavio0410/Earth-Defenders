export default class Enemy {

  constructor(x, y, imageNumber, life) {
    this.x = x;
    this.y = y;
    this.width = this.calculateWidhtEnemy(42);
    this.height = this.calculateHeightEnemy(42);
    this.life = life;

    this.image = new Image();
    this.image.src = `../public/assets/images/penemy${imageNumber}.png`;
    
    window.addEventListener("resize", () => {
      this.x = x;
      this.y = y;
      if(window.innerWidth > 900)
      {
        this.width = 42*(window.innerWidth/1920);
        this.height = 42*(window.innerHeight/1080);
      }
    });
    

  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move(xVelocity, yVelocity) {
    this.x += xVelocity;
    this.y += yVelocity;
  }

  collideWith(sprite) {
    if (
      this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height
    ) {
      return true;
    } else {
      return false;
    }
  }

  getLife(){
    return this.life;
  }

  hit(){
    this.life -= 1;
  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }

  calculateWidhtEnemy(initWidth){
    
    if(window.innerWidth > 900)
    {
      return initWidth*(window.innerWidth/1920);
    }
    else
    {
      return 26;
    }
  }



  calculateHeightEnemy(initHeight){
    if(window.innerWidth > 900)
    {
      return initHeight*(window.innerHeight/1080);
    }
    else
    {
      return 26;
    }

  }

}