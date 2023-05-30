<?php

    $usernamesignin = $_POST['usernamelogin']; // prende lo username dalla form
    $passwordsignin = $_POST['passwordlogin']; // prende la password dalla form

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
    //altrimenti se lo username non esiste o la password è sbagliata rimanda alla pagina di login con un errore
    else if ($con->query("SELECT * FROM user WHERE username = '$usernamesignin' AND password = '$passwordsignin'")->num_rows == 0) {
        header("Location: index.php?error=1");
        die();
    }
    else {
        // query per verificare che l'utente esista
        $stmt = $con->prepare("SELECT * FROM user WHERE username = ? AND password = ?"); 
        $stmt->bind_param("ss", $usernamesignin, $passwordsignin); // bind dei parametri
        $stmt->execute(); // esegue la query
        $result = $stmt->get_result(); // prende il risultato della query
        if ($result->num_rows > 0) { // se il risultato ha più di 0 righe
            session_start(); // inizia la sessione
            $_SESSION['username'] = $usernamesignin; // imposta lo username nella sessione
            header("Location: welcome.php"); // reindirizza alla pagina di benvenuto
            die(); // termina lo script
    } 

    $stmt->close(); // chiude lo statement
    $con->close(); // chiude la connessione
    }
?>