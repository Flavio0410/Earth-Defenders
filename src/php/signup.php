<?php

    $usernamesignup = $_POST['usernamesignup']; //get the username from the form
    $namesignup = $_POST['namesignup'];
    $surnamesignup = $_POST['surnamesignup'];
    $emailsignup = $_POST['emailsignup'];
    $passwordsignup = $_POST['passwordsignup'];
    $dateRecord = date("Y-m-d");
    $score = 0;

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
        $stmt = $con->prepare("INSERT INTO user (username, name, surname, email, password) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $usernamesignup, $namesignup, $surnamesignup, $emailsignup, $passwordsignup);
        $stmt->execute();
        $stmt->close();
        $stmt = $con->prepare("INSERT INTO record (username, data, score) VALUES (?, ?, ?)");
        $stmt->bind_param("ssi", $usernamesignup, $dateRecord, $score);
        $stmt->execute();
        $stmt->close();
        $con->close();
    }

    //ritorna alla pagina html index.html
    header("Location: ../html/index.php");
?>