import Buffs from "./Buffs.js"

export default class BuffsController {

    isSpawned = false;
    newBuff = false;

    constructor(canvas, player, enemyController) {
        this.canvas = canvas;
        this.player = player;
        this.enemyController = enemyController;

        this.enemyDeathSound = new Audio("../public/assets/sounds/enemy-death.wav");
        this.enemyDeathSound.volume = 0.1;

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
            this.enemyDeathSound.currentTime = 0;
            this.enemyDeathSound.play();
            this.isSpawned = false;
            this.newBuff = false;
            this.enemyController.resetBuffSpawn();
            if(this.buff.type == "pshield"){
                this.player.setShield();
            } else if (this.buff.type == "pspeed"){
                this.player.setSpeedUp();
            }
        }
    }

    spawnBuff(){
        this.isSpawned = true;
    }
}