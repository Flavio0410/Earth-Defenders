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
        }
    })
})

$(function(){
    $("#registerForm").validate({
        rules:{
            usernamesignup:{
                required:true,
            },
            passwordsignup:{
                required:true,
                rangelength: [8, 20]
            },
            confirmpasswordsignup:{
                required:true,
                equalTo: "#passwordsignup"
            },
            emailsignup:{
                required:true,
                email:true
            },
            namesignup:{
                required:true,
            },
            surnamesignup:{
                required:true,
            },
        },
        messages:{
            username:{
                required:"Inserisci il tuo username",

            },
            passwordsignup:{
                required: "Inserisci la tua password",
                rangelength: "La password deve essere lunga minimo 8 e massimo 20 caratteri"
            },
            confirmpasswordsignup:{
                required: "Inserisci la tua password",
                equalTo: "Le due password non coincidono"
            },
            emailsignup:{
                required: "Inserisci la tua email",
                email: "Inserisci una email valida"
            }
        },
        submitHandler:function(form){
            form.submit();
        }
    })
})