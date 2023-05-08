export default class Enemy {

  constructor(x, y, imageNumber, life) {
    this.x = x + 70;
    this.y = y + 70;
    this.width = 44;
    this.height = 32;
    this.life = life;

    this.image = new Image();
    this.image.src = `../public/assets/images/penemy${imageNumber}.png`;
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
}