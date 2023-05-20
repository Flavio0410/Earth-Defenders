const cursor = document.querySelector('.cursor');
const offset=10;

document.addEventListener('mousemove', e => {

    cursor.setAttribute("style", "top: "+(e.pageY-offset)+"px; left: "+(e.pageX-offset)+"px;");
});

