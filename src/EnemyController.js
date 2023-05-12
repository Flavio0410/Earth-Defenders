import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class EnemyController {
  // enemyMap = [
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
  //   [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  // ];

  defaultParams = {
    columns: 5,
    rows: 5,
    fireRate: 100,
    alien1Lives: 1,
    alien2Lives: 1,
    alien3Lives: 1
  }

  actualParams = {
    columns: 5,
    rows: 5,
    fireRate: 100,
    alien1Lives: 1,
    alien2Lives: 1,
    alien3Lives: 1
  }

  buffParams  = {
    x: 0,
    y: 0,
    multiplier: 1,
    spawned: false
  }

  points = 0;
  enemyMap = [];
  enemyRows = [];
  table = [];
  level = 1;

  currentDirection = MovingDirection.right;
  xVelocity = 0;
  yVelocity = 0;
  defaultXVelocity = 1;
  defaultYVelocity = 1;
  moveDownTimerDefault = 30;
  moveDownTimer = this.moveDownTimerDefault;
  fireBulletTimerDefault = 100;
  fireBulletTimer = this.fireBulletTimerDefault;

  constructor(canvas, enemyBulletController, playerBulletController) {
    this.canvas = canvas;
    this.enemyBulletController = enemyBulletController;
    this.playerBulletController = playerBulletController;

    this.enemyDeathSound = new Audio("../public/assets/sounds/enemy-death.wav");
    this.enemyDeathSound.volume = 0.1;

    this.setEnemiesForLevel(this.level);
    this.buildFormation(this.actualParams.columns, this.actualParams.rows);
    this.createEnemies(1, 1, 1);
  }

  draw(ctx) {
    this.decrementMoveDownTimer();
    this.updateVelocityAndDirection();
    this.collisionDetectionMine();
    //this.collisionDetection();
    this.drawEnemies(ctx);
    this.resetMoveDownTimer();
    this.fireBullet();
  }

  collisionDetection() {
    this.enemyRows.forEach((enemyRow) => {
      enemyRow.forEach((enemy, enemyIndex) => {
        if (this.playerBulletController.collideWith(enemy)) {
          this.enemyDeathSound.currentTime = 0;
          this.enemyDeathSound.play();
          enemyRow.splice(enemyIndex, 1);
        }
      });
    });

    this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
  }

  fireBullet() {
    this.fireBulletTimer--;
    if (this.fireBulletTimer <= 0) {
      this.fireBulletTimer = this.fireBulletTimerDefault;
      const allEnemies = this.enemyRows.flat();
      const enemyIndex = Math.floor(Math.random() * allEnemies.length);
      const enemy = allEnemies[enemyIndex];
      this.enemyBulletController.shoot(enemy.x + enemy.width / 2, enemy.y, -3);
    }
  }

  resetMoveDownTimer() {
    if (this.moveDownTimer <= 0) {
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }

  decrementMoveDownTimer() {
    if (
      this.currentDirection === MovingDirection.downLeft ||
      this.currentDirection === MovingDirection.downRight
    ) {
      this.moveDownTimer--;
    }
  }

  updateVelocityAndDirection() {
    for (const enemyRow of this.enemyRows) {
      if (this.currentDirection == MovingDirection.right) {
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = 0;
        const rightMostEnemy = enemyRow[enemyRow.length - 1];
        if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
          this.currentDirection = MovingDirection.downLeft;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downLeft) {
        if (this.moveDown(MovingDirection.left)) {
          break;
        }
      } else if (this.currentDirection === MovingDirection.left) {
        this.xVelocity = -this.defaultXVelocity;
        this.yVelocity = 0;
        const leftMostEnemy = enemyRow[0];
        if (leftMostEnemy.x <= 0) {
          this.currentDirection = MovingDirection.downRight;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downRight) {
        if (this.moveDown(MovingDirection.right)) {
          break;
        }
      }
    }
  }

  moveDown(newDirection) {
    this.xVelocity = 0;
    this.yVelocity = this.defaultYVelocity;
    if (this.moveDownTimer <= 0) {
      this.currentDirection = newDirection;
      return true;
    }
    return false;
  }

  drawEnemies(ctx) {
    this.enemyRows.flat().forEach((enemy) => {
      enemy.move(this.xVelocity, this.yVelocity);
      enemy.draw(ctx);
    });
  }

  createEnemies(a, b, c) {
    this.enemyMap.forEach((row, rowIndex) => {
      this.enemyRows[rowIndex] = [];
      row.forEach((enemyNumber, enemyIndex) => {
        if (enemyNumber > 0) {
          if (enemyNumber == 1){
            this.enemyRows[rowIndex].push(
              new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber, a)
            );
          } else if (enemyNumber == 2){
            this.enemyRows[rowIndex].push(
              new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber, b)
            );
          } else if (enemyNumber == 3){
            this.enemyRows[rowIndex].push(
              new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber, c)
            );
          }
        }
      });
    });
  }

  collideWith(sprite) {
    return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
  }

  buildFormation(columns, rows){
    this.table = [];
      for (let i = 0; i < rows; i++){
        for (let j = 0; j < columns; j++) {
          if (i < 2){
            this.table.push(1);
          } else if (i < 4){
            this.table.push(2);
          } else {
            this.table.push(3);
          }
        }
        this.enemyMap.push(this.table);
        this.table = [];
      }
  }

  setEnemiesForLevel(level){
    const maxColumns = 10;
    const maxRows = 6;

    this.actualParams.columns = this.defaultParams.columns + level - 1; 
    this.actualParams.rows = this.defaultParams.rows + this.level;

    if (this.actualParams.columns > maxColumns) this.actualParams.columns = maxColumns;
    if (this.actualParams.rows > maxRows) this.actualParams.rows = maxRows;

    const maxAlienLives = 3;
    if (this.level > 3) {
      this.actualParams.alien3Lives = 1 + Math.floor((this.level / 3) - 1);
      if (this.actualParams.alien3Lives > maxAlienLives) this.actualParams.alien3Lives = maxAlienLives;
    }
    if (this.level > 5) {
      this.actualParams.alien2Lives = 1 + Math.floor((this.level / 3) - 2);
      if (this.actualParams.alien2Lives > maxAlienLives) this.actualParams.alien2Lives = maxAlienLives;
    }

    const minFireRate = 50;

    this.actualParams.fireRate = this.actualParams.fireRate * 0.9;
    if (this.actualParams.fireRate < minFireRate) this.actualParams.fireRate = minFireRate;
  }

  levelUp(){
    this.currentDirection = MovingDirection.right;
    this.enemyMap = [];
    this.setEnemiesForLevel(this.level += 1);
    this.fireBulletTimerDefault = this.actualParams.fireRate;
    this.buildFormation(this.actualParams.columns, this.actualParams.rows);
    this.createEnemies(this.actualParams.alien1Lives, this.actualParams.alien2Lives, this.actualParams.alien3Lives);
  }

  collisionDetectionMine() {
    this.enemyRows.forEach((enemyRow) => {
      enemyRow.forEach((enemy, enemyIndex) => {
        if (this.playerBulletController.collideWith(enemy)) {
          enemyRow[enemyIndex].hit();
          if (enemyRow[enemyIndex].getLife() <= 0){
            this.enemyDeathSound.currentTime = 0;
            this.enemyDeathSound.play();
            if (this.calculateProbability() && this.buffParams.spawned == false){
              this.buffParams.x = enemyRow[enemyIndex].getX();
              this.buffParams.y = enemyRow[enemyIndex].getY();
              this.buffParams.spawned = true;
              console.log("Buff spawnato");
            }
            enemyRow.splice(enemyIndex, 1);
            this.points += 100*this.level*this.buffParams.multiplier;
          }
        }
      });
    });

    this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
  }

  calculateProbability() {
    // Genera un numero casuale tra 1 e 10
    const randomNum = Math.floor(Math.random() * 10) + 1;
    
    // Restituisce true se il numero casuale è uguale o inferiore a 1
    return randomNum <= 1;
  }

  getPoints(){
    return this.points;
  }

  getLevel(){
    return this.level;
  }

  buffSpawned(){
    return this.buffParams.spawned;
  }

  buffX(){
    return this.buffParams.x;
  }

  buffY(){
    return this.buffParams.y;
  }

  buffMultiplier(bool){
    if(bool){
      this.buffParams.multiplier = 2;
    } else {
      this.buffParams.multiplier = 1;
    }
  }

  resetBuffSpawn(){
    this.buffParams.spawned = false;
  }

  getEnemy1Lives(){
    return this.actualParams.alien1Lives;
  }

  getEnemy2Lives(){
    return this.actualParams.alien2Lives;
  }

  getEnemy3Lives(){
    return this.actualParams.alien3Lives;
  }

}