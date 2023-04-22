import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class EnemyController {
  /*enemyMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ];*/

  defaultParams = {
    columns: 5,
    rows: 5,
    //formationAnimInterval: 1500, //1500 is good start value
    //formationAnimSpeed: 0.2,
    fireRate: 100, // Avg bullets per second
    alien1Lives: 0,
    alien2Lives: 0,
    alien3Lives: 0
  }

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
    this.collisionDetection();
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

  happy = () => {};

  createEnemies() {
    this.enemyMap.forEach((row, rowIndex) => {
      this.enemyRows[rowIndex] = [];
      row.forEach((enemyNumber, enemyIndex) => {
        if (enemyNumber > 0) {
          this.enemyRows[rowIndex].push(
            new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber)
          );
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
          //this.table.push(Math.floor(Math.random() * 3) + 1);
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

    return levelParams;

  }

  levelUp(){
    this.level += 1;
    this.fireBulletTimerDefault -= 25;
    this.enemyMap = [];
    let params = this.setEnemiesForLevel(this.level += 1);
    this.buildFormation(params.columns, params.rows);
    this.createEnemies();
  }

}

/*levelFormationAlgorithm() {
    let levelParams = this.defaultParams;

    // Alien grid gets bigger each level up to a max size
    const maxColumns = 10;
    const maxRows = 6;
    levelParams.columns = this.defaultParams.columns + State.level - 1;
    levelParams.rows = this.defaultParams.rows + State.level - 1;
    if (levelParams.columns > maxColumns) levelParams.columns = maxColumns;
    if (levelParams.rows > maxRows) levelParams.rows = maxRows;

    // Fire rate increases every level by a multiple;
    const fireRateIncreaseMultiple = 1.2;
    levelParams.fireRate = this.defaultParams.fireRate * Math.pow(fireRateIncreaseMultiple, State.level - 1);

    // Increase the number of barriers;
    // Additional barrier every 2 levels
    // up to a maximum
    const maxBarriers = 6;
    levelParams.numBarriers = Math.floor(this.defaultParams.numBarriers + (State.level / 2) - 0.5);
    if (levelParams.numBarriers > maxBarriers) levelParams.numBarriers = maxBarriers;

    // Give aliens lives, so they take more than one hit to die.
    // From Level 4 Alien1 gets 1 life increasing by 1 every 3 levels.
    // From Level 6 Alien2 gets 1 life increasing by 1 every 3 levels.
    const maxAlienLives = 3;
    if (State.level > 3) {
      levelParams.alien1Lives = 1 + Math.floor((State.level / 3) - 1);
      if (levelParams.alien1Lives > maxAlienLives) levelParams.alien1Lives = maxAlienLives;
    }
    if (State.level > 5) {
      levelParams.alien2Lives = 1 + Math.floor((State.level / 3) - 2);
      if (levelParams.alien2Lives > maxAlienLives) levelParams.alien2Lives = maxAlienLives;
    }

    // Motherships spawn faster at higher levels.
    this.motherShip.interval = spaceinvadersConfig.motherShip.interval - (State.level / 2);
    this.motherShip.fireRate = 2 + (State.level / 3);

    return levelParams
  }*/