<?php 
    session_start(); // inizia la sessione
    $sessionid = $_SESSION['username']; // prende l'username dalla sessione
    $version=time(); // Serve per aggiornare la cache del browser

    if(!isset($_SESSION['username'])) { // se non è stato impostato l'username nella sessione
        header("Location: index.php"); // reindirizza alla pagina di login
    }
?>