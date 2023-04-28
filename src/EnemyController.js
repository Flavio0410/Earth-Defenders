import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";
import Player from "./Player.js";

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
    alien1Lives: 0,
    alien2Lives: 0,
    alien3Lives: 0
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

    let params = this.setEnemiesForLevel(this.level);
    this.buildFormation(params.columns, params.rows);
    this.createEnemies();
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
              new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber, 0)
            );
          } else if (enemyNumber == 2){
            this.enemyRows[rowIndex].push(
              new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber, 0)
            );
          } else if (enemyNumber == 3){
            this.enemyRows[rowIndex].push(
              new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber, 0)
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
    let levelParams = this.defaultParams;
    const maxColumns = 10;
    const maxRows = 6;

    levelParams.columns = this.defaultParams.columns + level - 1; 
    levelParams.rows = this.defaultParams.rows + this.level;

    if (levelParams.columns > maxColumns) levelParams.columns = maxColumns;
    if (levelParams.rows > maxRows) levelParams.rows = maxRows;

    const maxAlienLives = 3;
    if (this.level > 3) {
      levelParams.alien3Lives = 1 + Math.floor((this.level / 3) - 1);
      if (levelParams.alien3Lives > maxAlienLives) levelParams.alien3Lives = maxAlienLives;
    }
    if (this.level > 5) {
      levelParams.alien2Lives = 1 + Math.floor((this.level / 3) - 2);
      if (levelParams.alien2Lives > maxAlienLives) levelParams.alien2Lives = maxAlienLives;
    }

    return levelParams;

  }

  levelUp(){
    this.fireBulletTimerDefault = this.fireBulletTimerDefault*0.8;
    this.enemyMap = [];
    let params = this.setEnemiesForLevel(this.level += 1);
    this.buildFormation(params.columns, params.rows);
    this.createEnemies(params.alien1Lives, params.alien2Lives, params.alien3Lives);
  }

  collisionDetectionMine() {
    this.enemyRows.forEach((enemyRow) => {
      enemyRow.forEach((enemy, enemyIndex) => {
        if (this.playerBulletController.collideWith(enemy)) {
          enemyRow[enemyIndex].hit();
          if (enemyRow[enemyIndex].getLife() < 0){
            this.enemyDeathSound.currentTime = 0;
            this.enemyDeathSound.play();
            enemyRow.splice(enemyIndex, 1);
            this.points += 100*this.level;
          }
        }
      });
    });

    this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
  }

  getPoints(){
    return this.points;
  }

  getLevel(){
    return this.level;
  }

}