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
        }
    })
})

$(function(){
    $("#registerForm").validate({
        rules:{
            usernamesignup:{
                required:true
            },

            namesignup:{
                required:true,
            },

            surnamesignup:{
                required:true,
            },

            emailsignup:{
                required:true,
                email:true
            },

            passwordsignup:{
                required:true,
                rangelength: [8, 20]
            },

            confirmpasswordsignup:{
                required:true,
                equalTo: "#passwordsignup"
            },

        },
        messages:{
            usernamesignup:{
                required: "Inserisci il tuo username",
            },


            namesignup:{
                required: "Inserisci il tuo nome",
            },

            surnamesignup:{
                required: "Inserisci il tuo cognome",
            },

            emailsignup:{
                required: "Inserisci la tua email",
                email: "Inserisci una email valida"
            },

            passwordsignup:{
                required: "Inserisci la tua password",
                rangelength: "La password deve essere lunga minimo 8 e massimo 20 caratteri"
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
        }
    })
})