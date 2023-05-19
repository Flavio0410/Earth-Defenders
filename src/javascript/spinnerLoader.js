var loader = document.querySelector('.spiner-wrapper'); 



window.addEventListener("load", function() //Dopo che la pagina è stata caricata completamente rimuovo il loader e faccio apparire il contenuto della pagina
    {
        setTimeout(function()
            {
            loader.style.opacity = "0";
            }, 1000)

    });

    setTimeout(function()
    {
        loader.style.display = "none";
    }, 1700);
