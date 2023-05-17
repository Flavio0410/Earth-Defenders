export default class Bullet {
  playerBullet = false;
  enemyBullet = false;

    constructor(canvas, x, y, velocity, bulletColor) {
      this.canvas = canvas;
      this.x = x;
      this.y = y;
      this.velocity = velocity;
      this.bulletColor = bulletColor;
      this.img = new Image();
      this.img.src = "../public/assets/images/bullet.png";
  
      this.width = 5;
      this.height = 20;
    }
  
    draw(ctx) {
      this.y -= this.velocity;
      // ctx.fillStyle = this.bulletColor;
      // ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

    setImage(){
      if (this.playerBullet){
        this.img.src = "../public/assets/images/bullet.png";
      } else if (this.enemyBullet){
        this.img.src = "../public/assets/images/enemybullet.png";
      }
    }
  }