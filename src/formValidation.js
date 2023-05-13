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