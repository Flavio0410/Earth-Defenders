<?php
    // getting all values from the HTML form
    if(isset($_POST['submit']))
    {
        $fusername = $_POST['usernamesignup'];
        $fname = $_POST['namesignup'];
        $fsurname = $_POST['surnamesignup'];
        $femail = $_POST['emailsignup'];
        $fpassword = $_POST['passwordsignup'];
    }

    // database details
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "earthdefendersdb";

    // creating a connection
    $con = new mysqli($host, $username, $password, $dbname, 3307);

    // to ensure that the connection is made
    if ($con->connect_error)
    {
        die("Connection failed!" . mysqli_connect_error());
    } else {
        $stmt = $con->prepare("INSERT INTO user (fusername, fname, fsurname, femail, fpassword) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $fusername, $fname, $fsurname, $femail, $fpassword);
        $stmt->execute();
        echo "Entries added!";
        $stmt->close();
        $con->close();
    }

?>