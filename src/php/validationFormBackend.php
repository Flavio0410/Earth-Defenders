<?php
        if (isset($_GET['error']) && $_GET['error'] == 1) {
          echo '<div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Credenziali errate!</strong>  Username o password inseriti non sono corretti.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>';
        }

        if (isset($_GET['error']) && $_GET['error'] == 2) {
          echo '<div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Username già in uso!</strong> Lo username che hai inserito per la registrazione è già stato scelto, scegline un altro.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>';
        }

        if (isset($_GET['error']) && $_GET['error'] == 3) {
          echo '<div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Email già in uso!</strong>  Esiste già un account registrato con questa email.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>';
        }

        
?>