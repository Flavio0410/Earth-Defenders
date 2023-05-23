<?php include 'config.php';?>

<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Earth Defenders - Regolamento</title>

    <link rel="apple-touch-icon" sizes="180x180" href="../../public/icon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../../public/icon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../../public/icon/favicon-16x16.png">
    <link rel="manifest" href="../../public/icon/site.webmanifest">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>

    <link rel="stylesheet" type="text/css" href="../../style/navbar.css?v=<?=$version?>" />
    <link rel="stylesheet" type="text/css" href="../../style/spinner.css?v=<?=$version?>" />
    <link rel="stylesheet" type="text/css" href="../../style/style.css?v=<?=$version?>" />

    <script src="https://code.jquery.com/jquery-3.1.1.js" integrity="sha256-16cdPddA6VdVInumRGo6IbivbERE8p7CQR3HzTBuELA=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.min.js"></script>
</head>
<body>
  <div class="spiner-wrapper">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <script src="../javascript/spinnerLoader.js?v=<?=$version?>"></script>
  <div id="navigationbar"></div>
    <script> 
      $(function(){
        $("#navigationbar").load("navbar.php"); 
      });
    </script>



  <audio id="songID" autoplay loop>
    <source src="../../public/assets/sounds/Dreamcatcher.mp3" type="audio/mp3">
  </audio>
  <script>
    var audio = document.getElementById("songID");
    audio.volume = 0.01;
  </script>

  <div id="mainContain" class="containAll">
    <script type="module" src="../javascript/Starspace.js?v=<?=$version?>"></script>
  </div>

  <div class="containeroverlaybg">
    <h1 class="pagetitle">Regolamento</h1>
    <h3 class="descriptionrules">Earth Defenders è un coinvolgente gioco d'azione e strategia in cui i giocatori si trovano a difendere il pianeta Terra dall'invasione aliena. L'obiettivo principale del gioco è proteggere il nostro pianeta da ondate di nemici provenienti da diverse parti dello spazio.</h3>
    <div class="container text-center">
      <div class="row gx-5">
        <div class="col">
          <div class="titlerulespage">Potenziamenti</div>
          <div class="row enemyrow">
            <div class="col-sm-2">
              <img src="../../public/assets/images/pspeed.png" class="img-fluid" alt="Power up Speed" style="max-width: 48px; max-height: 58px; margin-top: -3px">
            </div>
            <div class="col-sm-10">"Colpi Rapidi" consente al giocatore di sparare proiettili ad alta velocità in rapida successione, aumentando significativamente la cadenza di fuoco della loro navicella spaziale. La durata del potenziamento è di 10 secondi</div>
          </div>

          <div class="row enemyrow">
            <div class="col-sm-2">
              <img src="../../public/assets/images/2xbuff.png" class="img-fluid" alt="Point Double" style="max-width: 48px; max-height: 58px; margin-top: -3px">
            </div>
            <div class="col-sm-10">Il potenziamento "Punti Doppi" è un'opzione entusiasmante che se raccolta ti offre l'opportunità di guadagnare il doppio dei punti ad ogni nemico eliminato. La durata del potenziamento è di 5 secondi</div>
          </div>

          <div class="row enemyrow">
            <div class="col-sm-2">
              <img src="../../public/assets/images/pshield.png" class="img-fluid" alt="Shield" style="max-width: 48px; max-height: 58px; margin-top: -3px">
            </div>
            <div class="col-sm-10">Attivando il potenziamento "Scudo", una barriera energetica protettiva circonda la navicella spaziale del giocatore, una volta colpiti lo scudo si distrugge. Non ha limiti di tempo e non sono cumulabili più scudi.</div>
          </div>
        </div>

        <div class="col">
          <div class="titlerulespage">Nemici</div>
          
          <div class="row enemyrow">
            <div class="col-sm-2">
              <img src="../../public/assets/images/penemy1.png" class="img-fluid" alt="Enemy1">
            </div>
            <div class="col-sm-10">"Grindy" è una creatura aliena insidiosa e astuta che rappresenta una minaccia unica per la difesa della Terra. Il Grindy è caratterizzato da un aspetto sinistro e meccanico, con un corpo sottile e arti affusolati.</div>
          </div>

          <div class="row enemyrow">
            <div class="col-sm-2">
              <img src="../../public/assets/images/penemy2.png" class="img-fluid" alt="Enemy2">
            </div>
            <div class="col-sm-10">"TrakTrak" si erge come una minaccia formidabile per la sopravvivenza del nostro pianeta. Il TrakTrak è una creatura aliena di dimensioni imponenti e dal design biomeccanico, che lo rende un avversario spaventoso da affrontare.</div>
          </div>

          <div class="row enemyrow">
            <div class="col-sm-2">
              <img src="../../public/assets/images/penemy3.png" class="img-fluid" alt="Enemy3">
            </div>
            <div class="col-sm-10">"Bruto" è una formidabile creatura aliena che rappresenta una delle principali minacce per il pianeta Terra. Il Bruto è un'enorme e potente entità con un aspetto imponente e terrificante.</div>
          </div>
        </div>
      </div>
    </div>

  </div>
    
</body>
</html>