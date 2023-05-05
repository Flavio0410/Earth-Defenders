export default class Player {
    rightPressed = false;
    leftPressed = false;
    shootPressed = false;
    life = 3;
    points = 0;
  
    constructor(canvas, velocity, bulletController) {
      this.canvas = canvas;
      this.velocity = velocity;
      this.bulletController = bulletController;
  
      this.x = this.canvas.width / 2;
      this.y = this.canvas.height - this.canvas.height/6;
      this.width = 100;
      this.height = 100;
      this.image = new Image();
      this.image.src = "../public/assets/images/navicella1.png";
  
      document.addEventListener("keydown", this.keydown);
      document.addEventListener("keyup", this.keyup);
      window.addEventListener("resize", () => this.onWindowResize());
    }
  
    draw(ctx) {
      if (this.shootPressed) {
        this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
      }
      this.move();
      this.collideWithWalls();
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

    getLife(){
      return this.life;
    }

    hit(){
      if (this.life > 0){
        this.life -= 1;
      }
    }

<<<<<<< HEAD
=======
    //forse si possono toglie ste due sotto
    getPoints(){
      return this.points;
    }

    addPoints(points){
      this.points += points;
    }

    onWindowResize(){
      this.x = this.canvas.width / 2;
      this.y = this.canvas.height - this.canvas.height/6;
    }

>>>>>>> dcaa3879d0e0e3a5ffdee4829099d594c929b1c1
  }