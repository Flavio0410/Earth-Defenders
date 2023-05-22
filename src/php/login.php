<?php 
    session_start();
    $sessionid = $_SESSION['username'];
    $version=time(); // This is to force the browser to reload the css and js files when they are changed

    if(!isset($_SESSION['username'])) {
        header("Location: index.php");
    }
?>