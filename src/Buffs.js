export default class Buffs {

    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 40;
      this.height = 44;
      
      this.enemyDeathSound = new Audio("../public/assets/sounds/enemy-death.wav");
      this.enemyDeathSound.volume = 0.1;

      this.image = new Image();
      this.type = '';
    }

    setImage(){
      this.image.src = "../public/assets/images/" + this.type + ".png";
      // var randomNum = Math.random();

      // if (randomNum < 0.5) {
      //   this.image.src = "../public/assets/images/pshield.png";
      // } else if (randomNum < 0.75) {
      //   this.image.src = "../public/assets/images/pspeed.png";
      // } else {
      //   this.image.src = "../public/assets/images/enemy2.png";
      // }
    }

    setType(){
      var randomNum = Math.random();

      if (randomNum < 0.5) {
        this.type = "pshield";
      } else if (randomNum < 0.75) {
        this.type = "pspeed";
      } else {
        this.type = "enemy2";
      }
    }

    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      this.moveDown();
      // this.collisionDetection(player);
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

    collisionDetection(player){
      if (this.collideWith(player)){
        this.enemyDeathSound.currentTime = 0;
        this.enemyDeathSound.play();
        this.image.src = '';
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