const cascada = document.getElementById("cascada");
const columnas = 15;
const palabra = ["S","A","G","A","P","O"];

for(let i = 0; i < columnas; i++){
    let col = document.createElement("div");
    col.classList.add("columna");

    // Velocidad más lenta (entre 10 y 18 segundos)
    col.style.animationDuration = (10 + Math.random() * 8) + "s";

    // Repetir la palabra varias veces en la columna
    for(let j = 0; j < 12; j++){
        palabra.forEach(letra => {
            let span = document.createElement("span");
            span.classList.add("letra");
            span.textContent = letra;
            span.style.animationDelay = (Math.random() * 4) + "s";
            col.appendChild(span);
        });
    }

    cascada.appendChild(col);
}

// Evento INICIAR
document.getElementById("cuadro-iniciar").addEventListener("click", function(){
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("segunda-pantalla").style.display = "flex";
});


