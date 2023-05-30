/**
 * Questo file contiene il codice javascript per la gestione del cursore personalizzato del sito web
 * @version  1.0.0
 * @author Flavio Gezzi
 */


const cursor = document.querySelector('.cursor');
const offset= 1;

const isMobile = navigator.userAgentData.mobile; //controllo se l'utente sta usando un dispositivo mobile o un pc

if(isMobile){ //se l'utente sta usando un dispositivo mobile
    cursor.style.display = "none"; //nascondo il cursore
}
else{ //se l'utente sta usando un pc
    document.addEventListener('mousemove', e => {

        cursor.setAttribute("style", "top: "+(e.pageY-offset)+"px; left: "+(e.pageX-offset)+"px;"); //aggiorno la posizione del cursore in base alla posizione del mouse
    });
}




