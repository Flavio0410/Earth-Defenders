/**
 * @fileoverview Contiene le funzioni per la validazione dei form di registrazione e login utilizzando il plugin jQuery Validation, 
 * le lunghezza massima per ogni campo coincide con la lunghezza massima impostata nel database
 * @version  1.0.0
 * @author Flavio Gezzi
 */
$(function(){
    $("#loginForm").validate({ //Inizializzo il plugin jQuery Validation sul form di login con le regole di validazione e i messaggi di errore personalizzati
        rules:{ //Regole di validazione
            usernamelogin:{
                required:true, //Il campo è obbligatorio
            },
            passwordlogin:{
                required:true, //Il campo è obbligatorio
                rangelength: [8, 20] //La password deve essere lunga minimo 8 e massimo 20 caratteri
            }
        },
        messages:{ //Messaggi di errore
            usernamelogin:{
                required:"Insersci il tuo username", //Messaggio di errore se il campo è vuoto
            },
            passwordlogin:{
                required: "Inserisci la tua password", //Messaggio di errore se il campo è vuoto
                rangelength: "La password deve essere lunga minimo 8 e massimo 20 caratteri", //Messaggio di errore se la password non è lunga minimo 8 e massimo 20 caratteri
                
            }
        },
        submitHandler:function(form){ //Se il form è valido lo invio 
            form.submit(); 
        },

        success: function(label, element) { //Se il campo è valido aggiungo la classe is-valid
            $(element).addClass('is-valid');
        },

        highlight: function(element, errorClass, validClass) { //Se il campo non è valido aggiungo la classe is-invalid e rimuovo la classe is-valid
            $(element).removeClass(validClass).addClass(errorClass);
            $(element).closest('.form-control').removeClass('is-valid').addClass('is-invalid');
        },

        unhighlight: function(element, errorClass, validClass) { //Se il campo è valido aggiungo la classe is-valid e rimuovo la classe is-invalid
            $(element).removeClass(errorClass).addClass(validClass);
            $(element).closest('.form-control').removeClass('is-invalid').addClass('is-valid');
        }
    })
})

$(function(){ //Inizializzo il plugin jQuery Validation sul form di registrazione con le regole di validazione e i messaggi di errore personalizzati
    $("#registerForm").validate({ 
        rules:{ 
            usernamesignup:{
                required:true, //Il campo è obbligatorio
                rangelength: [2, 20], //Lo username deve essere lungo minimo 2 e massimo 20 caratteri
                pattern: /^[a-zA-Z0-9_.]+$/ //Lo username deve contenere solo lettere, numeri, punti e underscore
            },

            namesignup:{
                required:true, //Il campo è obbligatorio
                lettersonly:true, //Il campo deve contenere solo lettere
                rangelength: [2, 20] //Il nome deve essere lungo minimo 2 e massimo 20 caratteri
            },

            surnamesignup:{
                required:true, //Il campo è obbligatorio
                lettersonly:true, //Il campo deve contenere solo lettere
                rangelength: [2, 20] //Il cognome deve essere lungo minimo 2 e massimo 20 caratteri
            },

            emailsignup:{
                required:true, //Il campo è obbligatorio
                email:true, //Il campo deve contenere una email valida
                rangelength: [3, 50] //L'email deve essere lunga massimo 50 caratteri
            },

            passwordsignup:{
                required:true, //Il campo è obbligatorio
                rangelength: [8, 20], //La password deve essere lunga minimo 8 e massimo 20 caratteri
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
            },

            confirmpasswordsignup:{
                required:true, //Il campo è obbligatorio
                equalTo: "#passwordsignup" //Il campo deve essere uguale al campo passwordsignup
            },

        },
        messages:{ //Messaggi di errore
            usernamesignup:{
                required: "Inserisci il tuo username", //Messaggio di errore se il campo è vuoto
                rangelength: "Lo username deve essere lungo minimo 2 e massimo 20 caratteri", //Messaggio di errore se lo username non è lungo minimo 2 e massimo 20 caratteri
                pattern: "Lo username deve contenere solo lettere, numeri, punti e underscore" //Messaggio di errore se lo username contiene caratteri non validi
            },


            namesignup:{ 
                required: "Inserisci il tuo nome", //Messaggio di errore se il campo è vuoto
                lettersonly: "Il nome deve contenere solo lettere", //Messaggio di errore se il nome contiene caratteri non validi
                rangelength: "Il nome deve essere lungo minimo 2 e massimo 20 caratteri" //Messaggio di errore se il nome non è lungo minimo 2 e massimo 20 caratteri
            },

            surnamesignup:{
                required: "Inserisci il tuo cognome", //Messaggio di errore se il campo è vuoto
                lettersonly: "Il cognome deve contenere solo lettere", //Messaggio di errore se il cognome contiene caratteri non validi
                rangelength: "Il cognome deve essere lungo minimo 2 e massimo 20 caratteri" //Messaggio di errore se il cognome non è lungo minimo 2 e massimo 20 caratteri
            },

            emailsignup:{
                required: "Inserisci la tua email", //Messaggio di errore se il campo è vuoto
                email: "Inserisci una email valida", //Messaggio di errore se il campo non contiene una email valida
                rangelength: "L'email deve essere lunga massimo 50 caratteri" //Messaggio di errore se l'email non è lunga massimo 50 caratteri
            },

            passwordsignup:{
                required: "Inserisci la tua password", //Messaggio di errore se il campo è vuoto
                rangelength: "La password deve essere lunga minimo 8 e massimo 20 caratteri", //Messaggio di errore se la password non è lunga minimo 8 e massimo 20 caratteri
                pattern: "La password deve contenere almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale" //Messaggio di errore se la password non contiene almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale
            },
            confirmpasswordsignup:{
                required: "Inserisci la tua password", //Messaggio di errore se il campo è vuoto
                equalTo: "Le due password non coincidono" //Messaggio di errore se il campo non è uguale al campo passwordsignup
            },

        },
        submitHandler:function(form){ //Se il form è valido lo invio
            form.submit();
        },

        success: function(label, element) { //Se il campo è valido aggiungo la classe is-valid
            $(element).addClass('is-valid');
        },

        highlight: function(element, errorClass, validClass) { //Se il campo non è valido aggiungo la classe is-invalid e rimuovo la classe is-valid
            $(element).removeClass(validClass).addClass(errorClass);
            $(element).closest('.form-control').removeClass('is-valid').addClass('is-invalid');
        },
        unhighlight: function(element, errorClass, validClass) { //Se il campo è valido aggiungo la classe is-valid e rimuovo la classe is-invalid
            $(element).removeClass(errorClass).addClass(validClass);
            $(element).closest('.form-control').removeClass('is-invalid').addClass('is-valid');
        }


    })
})