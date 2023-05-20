<?php include 'config.php';?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Earth Defenders - Record</title>

        <link rel="apple-touch-icon" sizes="180x180" href="../../public/icon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="../../public/icon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="../../public/icon/favicon-16x16.png">
        <link rel="manifest" href="../../public/icon/site.webmanifest">

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>

        <script src="https://code.jquery.com/jquery-3.1.1.js" integrity="sha256-16cdPddA6VdVInumRGo6IbivbERE8p7CQR3HzTBuELA=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.min.js"></script>


        <link rel="stylesheet" type="text/css" href="../../style/navbar.css?v=<?=$version?>" />
        <link rel="stylesheet" type="text/css" href="../../style/style.css?v=<?=$version?>" />
        <link rel="stylesheet" type="text/css" href="../../style/spinner.css?v=<?=$version?>" />
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

            <h1 class="pagetitle">Record</h1>

            <div class="recordtablecontainer" id="tablecontainerID">
                <table class="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Record</th>
                    <th scope="col">Data</th>
                </tr>
                </thead>
                <tbody class="table-group-divider">
                <tr>
                    <th scope="row">1</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <th scope="row">4</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <th scope="row">5</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <th scope="row">6</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <th scope="row">7</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <th scope="row">8</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <th scope="row">9</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <th scope="row">10</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
                </table>
            </div>
        </div>
    </body>
</html>