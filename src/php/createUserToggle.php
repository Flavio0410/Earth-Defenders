<?php

    /**
     * Questo file PHP viene incluso in index.php e out.php per generare un colore casuale per lo sfondo del bottone di logout e per ottenere l'iniziale dell'username dell'utente loggato
     */
    session_start(); // Assicurati di avviare la sessione se non è già stata avviata

    // Funzione per generare colori luminosi e accesi
    function generateBrightColor() {
        $brightness = 200; // Imposta la luminosità desiderata (0-255)

        // Genera un colore casuale con la luminosità desiderata
        $red = mt_rand(0, $brightness);
        $green = mt_rand(0, $brightness);
        $blue = mt_rand(0, $brightness);

        // Formatta i componenti RGB come stringhe esadecimali
        $color = sprintf("#%02x%02x%02x", $red, $green, $blue);

        return $color;
    }

    // Ottieni l'username dalla variabile di sessione PHP
    $username = $_SESSION["username"];

    // Genera un colore casuale per lo sfondo
    $randomColor = generateBrightColor();

    // Ottieni l'iniziale dell'username
    $initial = strtoupper(substr($username, 0, 1));
?>