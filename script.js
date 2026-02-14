document.addEventListener("DOMContentLoaded", () => {

/* ==========================================
   ELEMENTOS (SEGUROS)
========================================== */

const subtitulos = document.getElementById("subtitulos");
const screenInicio = document.getElementById("screenInicio");
const screenScene = document.getElementById("screenScene");
const startBox = document.getElementById("startBox");

const matrixCanvas = document.getElementById("matrixCanvas");
const canvas = document.getElementById("sceneCanvas");

const poemaLeft = document.getElementById("poemaLeft");
const poemaRight = document.getElementById("poemaRight");
const contadorEl = document.getElementById("contador");

const mtx = matrixCanvas ? matrixCanvas.getContext("2d") : null;
const ctx = canvas ? canvas.getContext("2d") : null;

/* ==========================================
   SIZE
========================================== */

let W = window.innerWidth;
let H = window.innerHeight;

function resize(){
    W = window.innerWidth;
    H = window.innerHeight;

    if(canvas){
        canvas.width = W;
        canvas.height = H;
    }

    if(matrixCanvas){
        matrixCanvas.width = W;
        matrixCanvas.height = H;
    }
}

window.addEventListener("resize", resize);
resize();

/* ==========================================
   AUDIO
========================================== */

const audioInicio = new Audio("inicio.mp3");
const audioPoemas = new Audio("poemas.mp3");

const playlistOceano = [
    "oceano1.mp3",
    "oceano2.mp3",
    "oceano3.mp3",
    "oceano4.mp3",
    "oceano5.mp3"
];

let indiceOceano = 0;
const audioOceano = new Audio(playlistOceano[0]);

/* ==========================================
   SUBTÍTULOS
========================================== */

const subtitulosCanciones = [
    [
        "Quiero ser tu canción desde el principio al fin",
        "Quiero rozarme en tus labios y ser tu carmín",
        "Ser la luz que acompaña tu despertar",
        "Y el silencio donde puedas descansar"
    ],
    [
        "¿Puedo llegar a tu alma?",
        "No quiero dejarte ir",
        "Mi único sueño es tú y yo"
    ],
    [
        "Texto canción 3...",
        "Más texto canción 3..."
    ],
    [
        "Texto canción 4...",
        "Más texto canción 4..."
    ]
];

let intervaloEscritura;
let intervaloBorrado;
let indiceLinea = 0;

function mostrarLinea(texto, callback){

    if(!subtitulos) return;

    subtitulos.innerHTML = "";
    subtitulos.style.opacity = 1;

    let i = 0;

    clearInterval(intervaloEscritura);
    clearInterval(intervaloBorrado);

    intervaloEscritura = setInterval(()=>{
        subtitulos.innerHTML += texto[i];
        i++;

        if(i >= texto.length){
            clearInterval(intervaloEscritura);

            setTimeout(()=>{

                let contenido = subtitulos.innerHTML;

                intervaloBorrado = setInterval(()=>{
                    contenido = contenido.slice(0,-1);
                    subtitulos.innerHTML = contenido;

                    if(contenido.length === 0){
                        clearInterval(intervaloBorrado);
                        if(callback) callback();
                    }
                }, 15);

            }, 1500);
        }

    }, 30);
}

function iniciarSubtitulosCancion(indice){

    if(!subtitulos) return;

    clearInterval(intervaloEscritura);
    clearInterval(intervaloBorrado);

    if(indice >= subtitulosCanciones.length){
        subtitulos.style.opacity = 0;
        return;
    }

    const lineas = subtitulosCanciones[indice];
    indiceLinea = 0;

    function siguiente(){

        if(indiceOceano !== indice) return;
        if(indiceLinea >= lineas.length) return;

        mostrarLinea(lineas[indiceLinea], ()=>{
            indiceLinea++;
            siguiente();
        });
    }

    siguiente();
}

audioOceano.addEventListener("ended", () => {

    indiceOceano++;
    if(indiceOceano >= playlistOceano.length) indiceOceano = 0;

    audioOceano.src = playlistOceano[indiceOceano];
    audioOceano.play().catch(()=>{});

    iniciarSubtitulosCancion(indiceOceano);
});

/* ==========================================
   ESTADOS
========================================== */

let estado = "inicio";

/* ==========================================
   MATRIX (SEGURO)
========================================== */

function drawMatrix(){

    if(!mtx || estado !== "inicio") return;

    mtx.fillStyle = "rgba(0,0,0,0.08)";
    mtx.fillRect(0,0,W,H);

    mtx.fillStyle = "#ff4d6d";
    mtx.font = "20px monospace";

    for(let i=0;i<50;i++){
        mtx.fillText("F", Math.random()*W, Math.random()*H);
    }
}

setInterval(drawMatrix, 60);

/* ==========================================
   NIEVE / OCEANO
========================================== */

let snow = [];

function initSnow(){
    snow = [];
    for(let i=0;i<200;i++){
        snow.push({
            x: Math.random()*W,
            y: Math.random()*H,
            r: Math.random()*2+1,
            s: Math.random()*1+0.5
        });
    }
}

function drawSnow(){
    if(!ctx) return;

    ctx.fillStyle="white";
    for(let s of snow){
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fill();

        s.y += s.s;
        if(s.y > H){
            s.y = 0;
            s.x = Math.random()*W;
        }
    }
}

/* ==========================================
   POEMAS
========================================== */

function escribirPoema(el, texto, velocidad){
    if(!el) return;

    el.innerHTML = "";
    let i = 0;

    let inter = setInterval(()=>{
        el.innerHTML += texto[i];
        i++;
        if(i >= texto.length) clearInterval(inter);
    }, velocidad);
}

/* ==========================================
   TRANSICIONES
========================================== */

function iniciar(){

    if(startBox) startBox.style.display = "none";

    audioInicio.volume = 0.6;
    audioInicio.play().catch(()=>{});
}
window.iniciar = iniciar;

audioInicio.addEventListener("ended", pasarAPoemas);
audioPoemas.addEventListener("ended", pasarAFinal);

function pasarAPoemas(){

    estado = "poemas";

    if(screenInicio) screenInicio.classList.remove("active");
    if(screenScene) screenScene.classList.add("active");

    audioPoemas.play().catch(()=>{});

    initSnow();
    animar();
}

function pasarAFinal(){

    estado = "final";

    if(poemaLeft) poemaLeft.style.display = "none";
    if(poemaRight) poemaRight.style.display = "none";
    if(contadorEl) contadorEl.style.display = "none";

    indiceOceano = 0;
    audioOceano.src = playlistOceano[0];
    audioOceano.play().catch(()=>{});

    if(subtitulos){
        subtitulos.style.display = "block";
        iniciarSubtitulosCancion(0);
    }
}

/* ==========================================
   LOOP
========================================== */

function animar(){

    requestAnimationFrame(animar);

    if(!ctx) return;

    ctx.clearRect(0,0,W,H);

    if(estado === "poemas"){
        drawSnow();
    }
}

});

