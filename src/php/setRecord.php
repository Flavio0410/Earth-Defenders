<?php
    session_start(); // inizia la sessione
    $sessionUsername = $_SESSION['username']; // prende l'username dalla sessione
    if(isset($_POST['score'])){ // se è stato inviato un punteggio
        $score = $_POST['score']; // prende il punteggio
    }

    // dettagli del database
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "earthdefendersdb"; 


    // connessione al database
    $con = new mysqli($host, $username, $password, $dbname);

    // controllo della connessione
    if ($con->connect_error)
    {
        die("Connection failed!" . mysqli_connect_error()); // mostra errore se la connessione non è avvenuta
    } else {
        $stmt = $con->prepare("UPDATE `record` SET `score` = ? WHERE `username` = ?"); // prepara la query
        $stmt->bind_param("ss", $score, $sessionUsername); // bind dei parametri
        $stmt->execute(); // esegue la query
        $stmt->close(); // chiude lo statement
        $con->close(); // chiude la connessione
    }
?>