// Generar columnas de "TE AMO"
const cascada = document.getElementById("cascada");
const columnas = 15;

for(let i = 0; i < columnas; i++){
    let col = document.createElement("div");
    col.classList.add("columna");

    // Velocidad diferente por columna
    col.style.animationDuration = (5 + Math.random() * 5) + "s";

    // Crear varios textos
    for(let j = 0; j < 20; j++){
        let texto = document.createElement("span");
        texto.textContent = "TE AMO";
        texto.style.animationDelay = (Math.random() * 3) + "s";
        col.appendChild(texto);
    }

    cascada.appendChild(col);
}

// Evento del botón INICIAR
document.getElementById("cuadro-iniciar").addEventListener("click", function(){
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("segunda-pantalla").style.display = "flex";
});


