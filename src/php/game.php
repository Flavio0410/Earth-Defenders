<?php
  session_start();
  if(!isset($_SESSION['username'])){
    header("Location: index.php");
    die();
  }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <title>Earth Defender - Play</title>
    <link rel="shortcut icon" href="#" />
    <link rel="stylesheet" href="../../style/game.css"/>

  </head>
  <body>

    <div class="container-fluid" style="padding: 0;">
      <div class="infoGame text-center">
        <div class="row">
          <div class="col-2">
            <button type="button" class="btn btn-outline-light" id="backButton"> Back </button>
          </div>
          <div class="col">
            <p>Livello: <span class="levelSpan" id="levelSpanID">1</span></p>
          </div>
          <div class="col">
            <p>Punteggio: <span class="scoreSpan" id="scoreSpanID">0</span></p>
          </div>
          <div class="col">
            <button type="button" class="btn btn-outline-light" id="pauseButton"> Pause </button>
          </div>
      </div>

      <div class="row">
        <div class="col">
          Vite:
            <img id="heart1" src="../../public/assets/images/pixel_heart.png" width="20px" height="20px">
            <img id="heart2" src="../../public/assets/images/pixel_heart.png" width="20px" height="20px">
            <img id="heart3" src="../../public/assets/images/pixel_heart.png" width="20px" height="20px">
          </span>
        </div>
        <div class="col">
          Enemy Life:
          <img id="enemy1" src="../../public/assets/images/penemy1.png" width="20px" height="20px">
          <span class="lifeSpan1" id="lifeSpan1ID"></span>
          <img id="enemy2" src="../../public/assets/images/penemy2.png" width="20px" height="20px">
          <span class="lifeSpan2" id="lifeSpan2ID"></span>
          <img id="enemy3" src="../../public/assets/images/penemy3.png" width="20px" height="20px">
          <span class="lifeSpan3" id="lifeSpan3ID"></span>
        </div>
      </div>
      </div>
        <canvas id="game"></canvas>
        <script type="module" src="../javascript/game.js"></script>
      </div>
    </div>
      <!-- Game Over
      <div class="gameOver" id="gameOverID" style="visibility: visible; poisition: fixed; top: 0; left:0; width: 100vh; height: 100vh; z-index: 100; ">
        <h1>Game Over</h1>
        <button type="button" class="btn btn-danger" id="restartButton" style="visibility: hidden;"> Restart </button>
      </div> -->
  </body>
</html>