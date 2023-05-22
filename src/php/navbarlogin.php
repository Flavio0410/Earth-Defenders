<!--Navbar-->
<?php include 'config.php';?>
<nav class="navbar navbar-inverse navbar-dark navbar-expand-lg fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="index.php">
        <img src="../../public/assets/images/logo.svg" alt="Logo" width="130" height="" class="d-inline-block align-text-top">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="bi bi-list "></span>
        </button>
        <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header justify-content-end">
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
                <a class="nav-link" id="homenavitem" aria-current="page" href="welcome.php">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="recordnavitem" href="record.php">Record</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" id="regolamentonavitem" href="regolamento.php">Regolamento</a>
            </li>

            <button type="button" class="btn btn-outline-light"  data-bs-toggle="modal" data-bs-target="#loginModal"">Esci</button>
            
            </ul>
        </div>
        </div>
    </div>
</nav>

<script src="../javascript/formValidation.js?v=<?=$version?>"></script>

<script src="../javascript/activeElement.js?v=<?=$version?>"></script>