import Buffs from "./Buffs.js"

export default class BuffsController {

    isSpawned = false;
    newBuff = false;

    constructor(canvas, player) {
        this.canvas = canvas;
        this.player = player;

        this.enemyDeathSound = new Audio("../public/assets/sounds/enemy-death.wav");
        this.enemyDeathSound.volume = 0.1;

        var buff = new Buffs(0,0);
    }

    draw(player, x, y) {
        console.log("p");
        if(!this.newBuff){
            this.createBuff(x,y);
            this.newBuff = true;
        }
        this.collisionDetection(player);
        this.buff.draw();
      }

    createBuff(x,y){
        this.buff.setX(x);
        this.buff.setY(y);
        this.buff.setType();
        this.buff.setImage();
    }

    collisionDetection(player){
        if(this.buff.collideWith(player)){
            this.enemyDeathSound.currentTime = 0;
            this.enemyDeathSound.play();
            this.isSpawned = false;
            if(this.buff.type == "pshield"){
                this.player.setShield();
            }
        }
    }

    spawnBuff(){
        this.isSpawned = true;
    }
}