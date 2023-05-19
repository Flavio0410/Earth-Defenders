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
      if (this.type == "player"){
        this.img.src = "../public/assets/images/bullet.png";
      } else if (this.type == "enemy"){
        this.img.src = "../public/assets/images/enemybullet.png";
      }
    }
  }