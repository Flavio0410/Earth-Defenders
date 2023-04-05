import Enemy from "./Enemy.js";
export default class EnemyContoller {

    enemyMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      ];
      enemyRows = [];

    constructor(canvas) {
        this.canvas = canvas;
        this.createEnemies();
    }

    draw(ctx){
        this.drawEnemies(ctx);
    }
    

    drawEnemies(ctx) {
        this.enemyRows.flat().forEach((enemy) => {
          enemy.draw(ctx);
        });
      }

    createEnemies() {
        this.enemyMap.forEach((row, rowIndex) => {
          this.enemyRows[rowIndex] = [];
          row.forEach((enemyNubmer, enemyIndex) => {
            if (enemyNubmer > 0) {
              this.enemyRows[rowIndex].push(
                new Enemy(enemyIndex * 50, rowIndex * 35, enemyNubmer)
              );
            }
          });
        });
      }
}