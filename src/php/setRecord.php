<?php
    session_start();
    $sessionUsername = $_SESSION['username'];
    if(isset($_POST['score'])){
        $score = $_POST['score'];
    }

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
        $stmt = $con->prepare("UPDATE `record` SET `score` = ? WHERE `username` = ?");
        $stmt->bind_param("ss", $score, $sessionUsername);
        $stmt->execute();
        $stmt->close();
        $con->close();
    }
?>