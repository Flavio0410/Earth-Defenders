
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
                <a class="nav-link" id="homenavitem" aria-current="page" href="index.php">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="recordnavitem" href="record.php">Record</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" id="regolamentonavitem" href="regolamento.php">Regolamento</a>
            </li>


            <button type="button" class="btn btn-outline-light"  data-bs-toggle="modal" data-bs-target="#loginModal"">Accedi</button>

            <button type="button" class="btn btn-outline-light"  data-bs-toggle="modal" data-bs-target="#signUpModal"">Registrati</button>
            
            <!-- <?php
            session_start();
                if(!isset($_SESSION['username'])){
                    echo '<button type="button" class="btn btn-outline-light"  data-bs-toggle="modal" data-bs-target="#loginModal"">Accedi</button>

                    <button type="button" class="btn btn-outline-light"  data-bs-toggle="modal" data-bs-target="#signUpModal"">Registrati</button>';
                }
                else {
                    echo '<a href="out.php" class="btn btn-outline-light"  data-bs-toggle="modal" role="button" ">Esci</a>';
                }
            ?> -->

            </ul>
        </div>
        </div>
    </div>
</nav>

<!--Modal Login-->
<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="loginModalLabel">Accedi</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body justify-content-center">
            <form id="loginForm" method="post" action="../php/signin.php">
            
            <div class="input-group mb-4 mt-3">
                <span class="input-group-text" id="usernameLoginAO">@</span>
                <input type="text" name="usernamelogin" class="form-control" id="usernameLogIn" placeholder="Username" aria-label="Username" aria-describedby="usernameLoginAO" required>
            </div>


            <div class="input-group mb-3">
                <span class="input-group-text" id="passwordLoginAO"><i class="bi bi-key"></i></span>
                <input type="password" name="passwordlogin" class="form-control" id="passwordLogIn" placeholder="Password" aria-label="Password" aria-describedby="passwordLoginAO" required>
            </div>

            <button type="submit" class="btn btn-login">Accedi</button>
            </form>
        </div>
        <div class="modal-footer justify-content-center">
            <div class="text-center">
            <p>Non hai un account? <a id="registeranchor" data-bs-target="#signUpModal" data-bs-toggle="modal">Registati</a></p>
            </div>
        </div>
        </div>
    </div>
</div>

<!--Modal Sign up-->
<div class="modal fade" id="signUpModal" aria-hidden="true" aria-labelledby="signUpModalLabel" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="signUpModalLabel">Registrati</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form id="registerForm" method="post" action="../php/signup.php">
            <div class="row mb-3 mt-2">
                <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input type="text" id="usernamesignup" name="usernamesignup" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" required>
                </div>

                <div class="col-sm-6 mb-3">
                <input type="text" id="namesignup" name="namesignup" class="form-control" id="nameSignUpForm" placeholder="Nome" required>
                </div>
                
                <div class="col-sm-6 mb-3">
                <input type="text" id="surnamesignup" name="surnamesignup" class="form-control" placeholder="Cognome" required>
                </div>

                <div class="mb-3">
                <input type="email" id="emailsignup" name="emailsignup" class="form-control" id="emailSignUpForm" placeholder="Email" required>
                </div>

                <div class="mb-3">
                <input type="password" id="passwordsignup" name="passwordsignup" class="form-control" id="passwordsignup" placeholder="Password" required>
                </div>

                <div class="mb-3">
                <input type="password" name="confirmpasswordsignup" class="form-control" id="confirmpasswordsignup" placeholder="Conferma Password" required>
                </div>
                
                <div class="mb-2 mt-1">
                <button type="submit" class="btn btn-register" id="submit">Registati</button>
                </div>

            </div>
            </form>
        </div>
        <div class="modal-footer justify-content-center">
            <div class="text-center">
            <p>Sei già registrato? <a id="registeranchor" data-bs-target="#loginModal" data-bs-toggle="modal">Accedi</a></p>
            </div>
        </div>
        </div>
    </div>
</div>

<script src="../javascript/formValidation.js?v=<?=$version?>"></script>

<script src="../javascript/activeElement.js?v=<?=$version?>"></script>