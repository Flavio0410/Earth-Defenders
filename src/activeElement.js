const actualwindow = window.location.pathname;

if(actualwindow.toString().split("/").pop() == "index.html"){
    document.getElementById("homenavitem").classList.add("active");
}
else if(actualwindow.toString().split("/").pop() == "record.html"){
    document.getElementById("recordnavitem").classList.add("active");
}
else if(actualwindow.toString().split("/").pop() == "regolamento.html"){
    document.getElementById("regolamentonavitem").classList.add("active");
}
