<?php
    /**
     * Questo file contiene il codice per la validazione dei dati inseriti dall'utente nel form
     * di login e di registrazione e per la gestione degli errori
     */

    if (isset($_GET['error']) && $_GET['error'] == 1) {  // Se è stato passato un parametro error e questo è uguale a 1 allora mostra un messaggio di errore di credenziali errate
        echo '<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Credenziali errate!</strong>  Username o password inseriti non sono corretti.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>';
        }

        if (isset($_GET['error']) && $_GET['error'] == 2) { // Se è stato passato un parametro error e questo è uguale a 2 allora mostra un messaggio di errore di username già in uso
        echo '<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Username già in uso!</strong> Lo username che hai inserito per la registrazione è già stato scelto, scegline un altro.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>';
        }

        if (isset($_GET['error']) && $_GET['error'] == 3) { // Se è stato passato un parametro error e questo è uguale a 3 allora mostra un messaggio di errore di email già in uso
        echo '<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Email già in uso!</strong>  Esiste già un account registrato con questa email.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>';
        } 
        if (isset($_GET['newuser']) && $_GET['newuser'] == 1) { // Se è stato passato un parametro newuser e questo è uguale a 1 allora mostra un messaggio di successo di registrazione avvenuta
        echo '<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Registrazione avvenuta con successo!</strong>  Ora puoi effettuare il login.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>';
        } 
?>