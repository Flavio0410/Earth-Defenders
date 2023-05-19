<?php
$usernamesignup = $_POST['usernamesignup']; //get the username from the form
$namesignup = $_POST['namesignup'];
$surnamesignup = $_POST['surnamesignup'];
$emailsignup = $_POST['emailsignup'];
$passwordsignup = $_POST['passwordsignup'];

$conn = new mysqli("localhost", "root", "", "earthdefendersdb");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else{
    $sql = "INSERT INTO users (username, name, surname, email, password) VALUES ('$usernamesignup', '$namesignup', '$surnamesignup', '$emailsignup', '$passwordsignup')";
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    }
    else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
