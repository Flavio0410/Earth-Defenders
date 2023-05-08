export default class Enemy {

    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 40;
      this.height = 44;
  
      this.image = new Image();
    }

    setImage(){
      var randomNum = Math.random();

      if (randomNum < 0.5) {
        this.image.src = "../public/assets/images/pshield.png";
      } else if (randomNum < 0.75) {
        this.image.src = "../public/assets/images/enemy1.png";
      } else {
        this.image.src = "../public/assets/images/enemy2.png";
      }
    }

    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      this.moveDown();
    }
  
    move(xVelocity, yVelocity) {
      this.x += xVelocity;
      this.y += yVelocity;
    }

    moveDown(){
      this.y += 1;
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
  
    getX(){
      return this.x;
    }
  
    getY(){
      return this.y;
    }

    setX(newX){
      this.x = newX;
    }

    setY(newY){
      this.y = newY;
    }

    setIsVisible(boolean){
      this.isVisible = boolean;
    }
  }