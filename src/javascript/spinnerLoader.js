/**
 * @fileoverview  Contiene le funzioni per la gestione del loader della pagina web
 * @version  1.0.0
 * @author Flavio Gezzi
 */

var loader = document.querySelector('.spiner-wrapper'); 

window.addEventListener("load", function() //Dopo che la pagina è stata caricata completamente rimuovo il loader e faccio apparire il contenuto della pagina
    {
        setTimeout(function() //Dopo 1 secondo (sommato al caricamento effettivo della pagina) faccio scomparire il loader
            {
            loader.style.opacity = "0";
            }, 1000)

    });

    setTimeout(function()
    {
        loader.style.display = "none";
    }, 1700);
