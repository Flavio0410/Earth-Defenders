<?php
    session_start(); // inizia la sessione
    unset($_SESSION['username']); // elimina l'username dalla sessione

    header("Location: index.php"); // reindirizza alla pagina di login
?>