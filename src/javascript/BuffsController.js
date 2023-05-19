import Buffs from "./Buffs.js"

export default class BuffsController {

    isSpawned = false;
    newBuff = false;

    constructor(canvas, player, enemyController) {
        this.canvas = canvas;
        this.player = player;
        this.enemyController = enemyController;

        this.powerUpSound = new Audio("../public/assets/sounds/powerUp.mp3");
        this.powerUpSound.volume = 0.1;

        this.buff = new Buffs(0,0);
    }

    draw(ctx, player, x, y) {
        if(!this.newBuff){
            this.createBuff(x,y);
            this.newBuff = true;
            this.isSpawned = true;
        }
        this.collisionDetection(player);
        this.buff.draw(ctx);
      }

    createBuff(x,y){
        this.buff.setX(x);
        this.buff.setY(y);
        this.buff.setType();
        this.buff.setImage();
    }

    collisionDetection(player){
        if(this.buff.collideWith(player) && this.isSpawned){
            this.powerUpSound.currentTime = 0;
            this.powerUpSound.play();
            this.isSpawned = false;
            this.newBuff = false;
            this.enemyController.resetBuffSpawn();
            if(this.buff.type == "shieldbuff"){
                this.player.setShield();
            } else if (this.buff.type == "pspeed"){
                this.player.setSpeedUp();
            } else {
                this.enemyController.buffMultiplier(true);
            }
        } else if (this.buff.getY() > this.canvas.height && this.isSpawned){
            console.log("buff non preso");
            this.isSpawned = false;
            this.newBuff = false;
            this.enemyController.resetBuffSpawn();
        }
    }

    spawnBuff(){
        this.isSpawned = true;
    }
}