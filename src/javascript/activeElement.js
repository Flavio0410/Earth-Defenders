const actualwindow = window.location.pathname; //Salvo il path della pagina attuale

if(actualwindow.toString().split("/").pop() == "index.php" || actualwindow.toString().split("/").pop() == "welcome.php"){ //Se il path della pagina attuale è index.php o welcome.php allora aggiungo la classe active all'elemento con id homenavitem
    document.getElementById("homenavitem").classList.add("active");
}
else if(actualwindow.toString().split("/").pop() == "record.php"){ //Se il path della pagina attuale è record.html allora aggiungo la classe active all'elemento con id recordnavitem
    document.getElementById("recordnavitem").classList.add("active");
}
else if(actualwindow.toString().split("/").pop() == "regolamento.php"){ //Se il path della pagina attuale è regolamento.html allora aggiungo la classe active all'elemento con id regolamentonavitem
    document.getElementById("regolamentonavitem").classList.add("active");
}
