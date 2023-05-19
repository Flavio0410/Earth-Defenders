<?php

    $usernamesignin = $_POST['usernamelogin']; //get the username from the form
    $passwordsignin = $_POST['passwordlogin'];

    // database details
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "earthdefendersdb";


    // creating a connection
    $con = new mysqli($host, $username, $password, $dbname);

    // to ensure that the connection is made
    if ($con->connect_error)
    {
        die("Connection failed!" . mysqli_connect_error());
    } else {
        $stmt = $con->prepare("SELECT * FROM user WHERE username = ? AND password = ?");
        $stmt->bind_param("ss", $usernamesignin, $passwordsignin);
        $stmt->execute();
        echo "Utente loggato!";
        $stmt->close();
        $con->close();
    }

    // //ritorna alla pagina html index.html
    // header("Location: ../html/index.html");
?>