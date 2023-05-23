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
        // query per verificare che l'utente esista
        $stmt = $con->prepare("SELECT * FROM user WHERE username = ? AND password = ?");
        $stmt->bind_param("ss", $usernamesignin, $passwordsignin);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            session_start();
            // $_SESSION['id'] = $result->fetch_assoc()['id'];
            $_SESSION['username'] = $usernamesignin;
            header("Location: welcome.php");
            die();
        } else {
            header("Location: ../html/index.php");
            die();
        }
        $stmt->close();
        $con->close();
    }
?>