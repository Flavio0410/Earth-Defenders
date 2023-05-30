<?php

    $usernamesignup = $_POST['usernamesignup']; // prende l'username dalla form
    $namesignup = $_POST['namesignup']; // prende il nome dalla form
    $surnamesignup = $_POST['surnamesignup']; // prende il cognome dalla form
    $emailsignup = $_POST['emailsignup']; // prende l'email dalla form
    $passwordsignup = $_POST['passwordsignup']; // prende la password dalla form
    $dateRecord = date("Y-m-d"); // data del record
    $score = 0; // punteggio iniziale

    // dettagli del database
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "earthdefendersdb";


    // crea la connessione al database
    $con = new mysqli($host, $username, $password, $dbname);

    // controlla la connessione
    if ($con->connect_error)
    {
        die("Connection failed!" . mysqli_connect_error()); // mostra errore se la connessione non è avvenuta
    }
    //altrimenti se lo username è già stato preso rimanda alla pagina di login con un errore
    else if ($con->query("SELECT * FROM user WHERE username = '$usernamesignup'")->num_rows > 0) {
        header("Location: index.php?error=2");
        die();
    }
    //altrimenti se l'email è già stata presa rimanda alla pagina di login con un errore
    else if ($con->query("SELECT * FROM user WHERE email = '$emailsignup'")->num_rows > 0) {
        header("Location: index.php?error=3");
        die();
    }

    else {
        $stmt = $con->prepare("INSERT INTO user (username, name, surname, email, password) VALUES (?, ?, ?, ?, ?)"); // prepara la query
        $stmt->bind_param("sssss", $usernamesignup, $namesignup, $surnamesignup, $emailsignup, $passwordsignup); // bind dei parametri
        $stmt->execute(); // esegue la query
        $stmt->close(); // chiude lo statement
        $stmt = $con->prepare("INSERT INTO record (username, data, score) VALUES (?, ?, ?)"); // prepara la query
        $stmt->bind_param("ssi", $usernamesignup, $dateRecord, $score); // bind dei parametri
        $stmt->execute(); // esegue la query
        $stmt->close(); // chiude lo statement
        $con->close(); // chiude la connessione

    }

    header("Location: index.php?newuser=1"); // reindirizza alla pagina di login

?>