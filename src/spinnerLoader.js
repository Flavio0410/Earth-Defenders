var loader = document.querySelector('.spiner-wrapper');



window.addEventListener("load", function()
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
