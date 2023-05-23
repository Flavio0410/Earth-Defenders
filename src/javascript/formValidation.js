$(function(){
    $("#loginForm").validate({
        rules:{
            usernamelogin:{
                required:true,
            },
            passwordlogin:{
                required:true,
                rangelength: [8, 20]
            }
        },
        messages:{
            usernamelogin:{
                required:"Insersci il tuo username",
            },
            passwordlogin:{
                required: "Inserisci la tua password",
                rangelength: "La password deve essere lunga minimo 8 e massimo 20 caratteri",
                
            }
        },
        submitHandler:function(form){
            form.submit();
        },

        success: function(label, element) {
            $(element).addClass('is-valid');
        },

        highlight: function(element, errorClass, validClass) {
            $(element).removeClass(validClass).addClass(errorClass);
            $(element).closest('.form-control').removeClass('is-valid').addClass('is-invalid');
        },

        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
            $(element).closest('.form-control').removeClass('is-invalid').addClass('is-valid');
        }
    })
})

$(function(){
    $("#registerForm").validate({
        rules:{
            usernamesignup:{
                required:true,
                rangelength: [2, 20],
                pattern: /^[a-zA-Z0-9_.]+$/
            },

            namesignup:{
                required:true,
                lettersonly:true,
                rangelength: [2, 20]
            },

            surnamesignup:{
                required:true,
                lettersonly:true,
                rangelength: [2, 20]
            },

            emailsignup:{
                required:true,
                email:true,
                rangelength: [3, 50]
            },

            passwordsignup:{
                required:true,
                rangelength: [8, 20],
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
            },

            confirmpasswordsignup:{
                required:true,
                equalTo: "#passwordsignup"
            },

        },
        messages:{
            usernamesignup:{
                required: "Inserisci il tuo username",
                rangelength: "Lo username deve essere lungo minimo 2 e massimo 20 caratteri",
                pattern: "Lo username deve contenere solo lettere, numeri, punti e underscore"
            },


            namesignup:{
                required: "Inserisci il tuo nome",
                lettersonly: "Il nome deve contenere solo lettere",
                rangelength: "Il nome deve essere lungo minimo 2 e massimo 20 caratteri"
            },

            surnamesignup:{
                required: "Inserisci il tuo cognome",
                lettersonly: "Il cognome deve contenere solo lettere",
                rangelength: "Il cognome deve essere lungo minimo 2 e massimo 20 caratteri"
            },

            emailsignup:{
                required: "Inserisci la tua email",
                email: "Inserisci una email valida",
                rangelength: "L'email deve essere lunga massimo 50 caratteri"
            },

            passwordsignup:{
                required: "Inserisci la tua password",
                rangelength: "La password deve essere lunga minimo 8 e massimo 20 caratteri",
                pattern: "La password deve contenere almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale"
            },
            confirmpasswordsignup:{
                required: "Inserisci la tua password",
                equalTo: "Le due password non coincidono"
            },

        },
        submitHandler:function(form){
            form.submit();
        },

        success: function(label, element) {
            $(element).addClass('is-valid');
        },

        highlight: function(element, errorClass, validClass) {
            $(element).removeClass(validClass).addClass(errorClass);
            $(element).closest('.form-control').removeClass('is-valid').addClass('is-invalid');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
            $(element).closest('.form-control').removeClass('is-invalid').addClass('is-valid');
        }


    })
})