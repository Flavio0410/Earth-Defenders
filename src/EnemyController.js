import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class EnemyController {

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
  fireBulletTimerDefault = this.defaultParams.fireRate;
  fireBulletTimer = this.actualParams.fireRate;

  // Funzione che viene chiamata quando il gioco viene avviato
  constructor(canvas, enemyBulletController, playerBulletController) {
    this.canvas = canvas; // Prende il canvas
    this.enemyBulletController = enemyBulletController; // Prende il controller dei proiettili del nemico
    this.playerBulletController = playerBulletController; // Prende il controller dei proiettili del giocatore

    // Suono della morte del nemico
    this.enemyDeathSound = new Audio("../public/assets/sounds/enemy-death.wav"); // Carica il suono della morte del nemico
    this.enemyDeathSound.volume = 0.1; // Imposta il volume del suono

    this.setEnemiesForLevel(this.level); // Imposta i parametri per il livello
    this.buildFormation(this.actualParams.columns, this.actualParams.rows); // Costruisce la formazione
    this.createEnemies(1, 1, 1); // Crea i nemici
  }

 // Funzione che viene chiamata ad ogni frame
  draw(ctx) {
    this.decrementMoveDownTimer(); // Decrementa il timer di movimento verso il basso
    this.updateVelocityAndDirection(); // Aggiorna la velocità e la direzione
    this.collisionDetectionMine(); // Controlla le collisioni 
    this.drawEnemies(ctx); // Disegna i nemici
    this.resetMoveDownTimer(); // Resetta il timer di movimento verso il basso
    this.fireBullet(); // Fa sparare i nemici
  }

  // Funzione che fa sparare i nemici
  fireBullet() {
    this.fireBulletTimer--; // Decrementa il timer di sparo
    if (this.fireBulletTimer <= 0) { // Se il timer è scaduto
      this.fireBulletTimer = this.fireBulletTimerDefault; /// Resetta il timer
      const allEnemies = this.enemyRows.flat(); // Prende tutti i nemici
      const enemyIndex = Math.floor(Math.random() * allEnemies.length); // Sceglie un nemico a caso
      const enemy = allEnemies[enemyIndex]; // Prende il nemico scelto
      this.enemyBulletController.shoot(enemy.x + enemy.width / 2, enemy.y, -3); // Fa sparare il nemico
    }
  }

  // Funzione che resetta il timer di movimento verso il basso
  resetMoveDownTimer() {
    if (this.moveDownTimer <= 0) { // Se il timer è scaduto
      this.moveDownTimer = this.moveDownTimerDefault; // Resetta il timer
    }
  }

  // Funzione che decrementa il timer di movimento verso il basso
  decrementMoveDownTimer() {
    if (
      this.currentDirection === MovingDirection.downLeft ||
      this.currentDirection === MovingDirection.downRight
    ) { // Se il nemico si sta muovendo verso il basso
      this.moveDownTimer--; // Decrementa il timer
    }
  }

  // Funzione che aggiorna la velocità e la direzione
  updateVelocityAndDirection() {
    for (const enemyRow of this.enemyRows) { // Per ogni riga di nemici
      if (this.currentDirection == MovingDirection.right) { // Se il nemico si sta muovendo verso destra
        this.xVelocity = this.defaultXVelocity; // Imposta la velocità sull'asse x
        this.yVelocity = 0; // Imposta la velocità sull'asse y
        const rightMostEnemy = enemyRow[enemyRow.length - 1]; // Prende il nemico più a destra
        if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) { // Se il nemico più a destra ha raggiunto il bordo destro
          this.currentDirection = MovingDirection.downLeft; // Imposta la direzione verso il basso a sinistra
          break; // Interrompe il ciclo
        } 
      } else if (this.currentDirection === MovingDirection.downLeft) { // Se il nemico si sta muovendo verso il basso a sinistra
        if (this.moveDown(MovingDirection.left)) { // Se il nemico si è mosso verso il basso a sinistra
          break; // Interrompe il ciclo
        }
      } else if (this.currentDirection === MovingDirection.left) { // Se il nemico si sta muovendo verso sinistra
        this.xVelocity = -this.defaultXVelocity; // Imposta la velocità sull'asse x
        this.yVelocity = 0; // Imposta la velocità sull'asse y
        const leftMostEnemy = enemyRow[0]; // Prende il nemico più a sinistra
        if (leftMostEnemy.x <= 0) { // Se il nemico più a sinistra ha raggiunto il bordo sinistro
          this.currentDirection = MovingDirection.downRight; // Imposta la direzione verso il basso a destra
          break; // Interrompe il ciclo
        }
      } else if (this.currentDirection === MovingDirection.downRight) { // Se il nemico si sta muovendo verso il basso a destra
        if (this.moveDown(MovingDirection.right)) { // Se il nemico si è mosso verso il basso a destra
          break; // Interrompe il ciclo
        }
      }
    }
  }

  // Funzione che muove i nemici verso il basso
  moveDown(newDirection) {
    this.xVelocity = 0; // Imposta la velocità sull'asse x
    this.yVelocity = this.defaultYVelocity; // Imposta la velocità sull'asse y
    if (this.moveDownTimer <= 0) { // Se il timer è scaduto
      this.currentDirection = newDirection; // Imposta la nuova direzione
      return true; // Restituisce true
    }
    return false; // Restituisce false
  }

  // Funzione che disegna i nemici
  drawEnemies(ctx) { 
    this.enemyRows.flat().forEach((enemy) => { // Per ogni nemico
      enemy.move(this.xVelocity, this.yVelocity); // Muove il nemico
      enemy.draw(ctx); // Disegna il nemico
    });
  }

  // Funzione che crea i nemici
  createEnemies(live1, live2, live3) {
    this.enemyMap.forEach((row, rowIndex) => { // Per ogni riga di nemici
      this.enemyRows[rowIndex] = []; // Crea un array vuoto
      row.forEach((enemyNumber, enemyIndex) => { // Per ogni nemico
        if (enemyNumber > 0) { // Se il nemico esiste
          if (enemyNumber == 1){ // Se il nemico è di tipo 1
            this.enemyRows[rowIndex].push(
              new Enemy(enemyIndex * 35, rowIndex * 30, enemyNumber, live1)
            ); // Crea un nemico di tipo 1
          } else if (enemyNumber == 2){ // Se il nemico è di tipo 2
            this.enemyRows[rowIndex].push(
              new Enemy(enemyIndex * 35, rowIndex * 30, enemyNumber, live2)
            ); // Crea un nemico di tipo 2
          } else if (enemyNumber == 3){ // Se il nemico è di tipo 3
            this.enemyRows[rowIndex].push(
              new Enemy(enemyIndex * 35, rowIndex * 30, enemyNumber, live3)
            ); // Crea un nemico di tipo 3
          }
        }
      });
    });
  }

  // Funzione che controlla le collisioni tra i nemici e un oggetto sprite
  collideWith(sprite) {
    return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite)); // Restituisce true se c'è una collisione
  }

  // Funzione che costruisce la formazione dei nemici
  buildFormation(columns, rows){ 
    this.table = []; // Crea un array vuoto
      for (let i = 0; i < rows; i++){ // Per ogni riga
        for (let j = 0; j < columns; j++) { // Per ogni colonna
          if (i < 2){ // Se la riga è inferiore a 2
            this.table.push(1); // Aggiunge un nemico di tipo 1
          } else if (i < 4){ // Se la riga è inferiore a 4
            this.table.push(2); // Aggiunge un nemico di tipo 2
          } else { // Se la riga è superiore a 4
            this.table.push(3); // Aggiunge un nemico di tipo 3
          }
        }
        this.enemyMap.push(this.table); // Aggiunge la riga alla formazione
        this.table = []; // Resetta l'array
      }
  }

  // Funzione che imposta i parametri per il livello successivo
  setEnemiesForLevel(level){
    // impostare il numero massimo di colonne e di righe in base alla dimensione dello schermo
    const maxColumns = Math.floor(this.canvas.width / 40) - 1; // Numero massimo di colonne
    const maxRows = 6; // Numero massimo di righe
    console.log("maxColumns: " + maxColumns);
    console.log("maxRows: " + maxRows);

    this.actualParams.columns = this.defaultParams.columns + level - 1; // Imposta il numero di colonne
    this.actualParams.rows = this.defaultParams.rows + this.level; // Imposta il numero di righe

    if (this.actualParams.columns > maxColumns) this.actualParams.columns = maxColumns; // Se il numero di colonne supera il massimo, imposta il massimo
    if (this.actualParams.rows > maxRows) this.actualParams.rows = maxRows; // Se il numero di righe supera il massimo, imposta il massimo

    if (this.level > 3) { // Se il livello è superiore a 3
      this.actualParams.alien3Lives = 1 + Math.floor((this.level / 3) - 1); // Imposta il numero di vite dei nemici di tipo 3
    }
    if (this.level > 5) { // Se il livello è superiore a 5
      this.actualParams.alien2Lives = 1 + Math.floor((this.level / 3) - 2); // Imposta il numero di vite dei nemici di tipo 2
    }
    if (this.level > 7) { // Se il livello è superiore a 7
      this.actualParams.alien1Lives = 1 + Math.floor((this.level / 3) - 3); // Imposta il numero di vite dei nemici di tipo 1
    }

    const minFireRate = 30; // Numero minimo di millisecondi tra un proiettile e l'altro

    this.actualParams.fireRate = this.actualParams.fireRate * 0.9; // Imposta il tempo di sparo
    if (this.actualParams.fireRate < minFireRate) this.actualParams.fireRate = minFireRate; // Se il tempo di sparo è inferiore al minimo, imposta il minimo

  }

  // Funzione che viene chiamata quando il giocatore passa di livello
  // Aumenta il livello, resetta la direzione, il timer di sparo e la mappa dei nemici
  // Imposta i parametri per il livello successivo
  // Costruisce la formazione e crea i nemici
  // Aumenta i punti in base al livello e al moltiplicatore del buff
  levelUp(){
    this.currentDirection = MovingDirection.right; // Imposta la direzione verso destra
    this.enemyMap = []; // Resetta la mappa dei nemici
    this.setEnemiesForLevel(this.level += 1); // Imposta i parametri per il livello successivo
    this.fireBulletTimerDefault = this.actualParams.fireRate; // Imposta il timer di sparo
    this.buildFormation(this.actualParams.columns, this.actualParams.rows); // Costruisce la formazione
    this.createEnemies(this.actualParams.alien1Lives, this.actualParams.alien2Lives, this.actualParams.alien3Lives); // Crea i nemici
  }

  // Collision detection personalizzata per il buff
  collisionDetectionMine() {
    this.enemyRows.forEach((enemyRow) => { // Per ogni riga di nemici
      enemyRow.forEach((enemy, enemyIndex) => { // Per ogni nemico
        if (this.playerBulletController.collideWith(enemy)) { // Se il proiettile del giocatore collide con il nemico
          enemyRow[enemyIndex].hit(); // Il nemico viene colpito
          if (enemyRow[enemyIndex].getLife() <= 0){ // Se il nemico è morto
            this.enemyDeathSound.currentTime = 0; // Imposta il suono della morte del nemico all'inizio
            this.enemyDeathSound.play(); // Riproduce il suono della morte del nemico
            if (this.calculateProbability() && this.buffParams.spawned == false){ // Se il buff non è spawnato e la probabilità è stata soddisfatta
              this.buffParams.x = enemyRow[enemyIndex].getX(); // Imposta la posizione del buff
              this.buffParams.y = enemyRow[enemyIndex].getY(); // Imposta la posizione del buff
              this.buffParams.spawned = true; // Imposta il buff come spawnato
              console.log("Buff spawnato"); 
            }
            enemyRow.splice(enemyIndex, 1); // Rimuove il nemico
            this.points += 100*this.level*this.buffParams.multiplier; // Aumenta i punti in base al livello e al moltiplicatore del buff
          }
        }
      });
    });

    this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0); // Rimuove le righe vuote
  }

  // Funzione che calcola la probabilità di spawn del buff
  calculateProbability() {
    const randomNum = Math.floor(Math.random() * 10) + 1; // Genera un numero casuale tra 1 e 10
    
    return randomNum <= 1; // Restituisce true se il numero è minore o uguale a 1
  }

  // Funzione che viene chiamata quando il buff viene raccolto
  getPoints(){
    return this.points; // Restituisce i punti
  }

  // Funzione che viene chiamata quando il buff viene raccolto
  getLevel(){
    return this.level; // Restituisce il livello
  }


  buffSpawned(){
    return this.buffParams.spawned; // Restituisce true se il buff è spawnato
  }

  buffX(){
    return this.buffParams.x; // Restituisce la posizione x del buff
  }

  buffY(){
    return this.buffParams.y; // Restituisce la posizione y del buff
  }

  // Se bool è true, il buff è stato raccolto e il moltiplicatore viene impostato a 2
  buffMultiplier(bool){
    if(bool){
      this.buffParams.multiplier = 2;
    } else {
      this.buffParams.multiplier = 1;
    }
  }

  resetBuffSpawn(){
    this.buffParams.spawned = false; // Imposta il buff come non spawnato
  }

  getEnemy1Lives(){
    return this.actualParams.alien1Lives; // Restituisce il numero di vite dei nemici di tipo 1
  }

  getEnemy2Lives(){
    return this.actualParams.alien2Lives; // Restituisce il numero di vite dei nemici di tipo 2
  }

  getEnemy3Lives(){
    return this.actualParams.alien3Lives; // Restituisce il numero di vite dei nemici di tipo 3
  }

  // calcolare la posizione dei nemici in base alla dimensione dello schermo partendo da 50 e riducendola
  // in base alla dimensione dello schermo
  calculateWidhtEnemy(width){
    if(window.innerWidth > 900)
    {
      return width*(window.innerWidth/1920);
    }
    else
    {
      return width;
    }
  }

  // calcolare la posizione dei nemici in base alla dimensione dello schermo partendo da 35 e riducendola
  // in base alla dimensione dello schermo
  calculateHeightEnemy(height){
    if(window.innerWidth > 900)
    {
      return height*(window.innerHeight/1080);
    }
    else
    {
      return height;
    }
  }

}