/* ==========================================
   FATUM AMANTIS – CINE PREMIUM SECUENCIAL
========================================== */

const screenInicio = document.getElementById("screenInicio");
const screenScene = document.getElementById("screenScene");
const startBox = document.getElementById("startBox");

const matrixCanvas = document.getElementById("matrixCanvas");
const mtx = matrixCanvas.getContext("2d");

const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");

const poemaLeft = document.getElementById("poemaLeft");
const poemaRight = document.getElementById("poemaRight");
const contadorEl = document.getElementById("contador");
const timeEl = document.getElementById("time");

/* ==========================================
   SIZE
========================================== */

let W, H;
function resize(){
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    matrixCanvas.width = W;
    matrixCanvas.height = H;
}
window.addEventListener("resize", resize);
resize();

/* ==========================================
   AUDIO SECUENCIAL
========================================== */

// Escena 1
const audioInicio = new Audio("inicio.mp3");

// Escena 2
const audioPoemas = new Audio("poemas.mp3");

// Escena 3 (playlist)
const playlistOceano = [
    "oceano1.mp3",
    "oceano2.mp3",
    "oceano3.mp3",
    "oceano4.mp3",
    "oceano5.mp3"
];

let indiceOceano = 0;
const audioOceano = new Audio(playlistOceano[indiceOceano]);

// Playlist en bucle
audioOceano.addEventListener("ended", () => {
    indiceOceano++;
    if(indiceOceano >= playlistOceano.length) indiceOceano = 0;
    audioOceano.src = playlistOceano[indiceOceano];
    audioOceano.play();
});

// Transición automática
audioInicio.addEventListener("ended", () => {
    pasarAPoemas();
});

audioPoemas.addEventListener("ended", () => {
    pasarAFinal();
});

/* ==========================================
   ESTADOS
========================================== */

let estado = "inicio"; // inicio → poemas → final

/* ==========================================
   MATRIX
========================================== */

const matrixText = "Fatum Amantis";
const fontSize = 22;
let cols = Math.floor(W / fontSize);
let drops = Array(cols).fill(0);

function drawMatrix(){
    if(estado !== "inicio") return;

    mtx.fillStyle = "rgba(0,0,0,0.08)";
    mtx.fillRect(0,0,W,H);

    mtx.fillStyle = "#ff4d6d";
    mtx.font = fontSize + "px monospace";

    for(let i=0;i<drops.length;i++){
        let char = matrixText[Math.floor(Math.random()*matrixText.length)];
        mtx.fillText(char, i*fontSize, drops[i]*fontSize);

        if(drops[i]*fontSize > H && Math.random()>0.96){
            drops[i]=0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 60);

/* ==========================================
   NIEVE
========================================== */

let snow = [];

function initSnow(){
    snow = [];
    for(let i=0;i<240;i++){
        snow.push({
            x: Math.random()*W,
            y: Math.random()*H,
            r: Math.random()*2+1,
            s: Math.random()*1+0.5
        });
    }
}

function drawSnow(){
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

const texto1 = `AMO ELEGIRTE
Tantas almas magicas en este mundo,
pero es la tuya la unica que quiero...`;

const texto2 = `Me enamore de ti desde aquel instante
en que llegaste a mi vida sin previo aviso...`;

function escribirPoema(el, texto, velocidad, callback){
    el.style.opacity = 1;
    el.innerHTML = "";
    let i = 0;

    let inter = setInterval(()=>{
        el.innerHTML += texto[i];
        i++;

        if(i >= texto.length){
            clearInterval(inter);
            if(callback) callback();
        }
    }, velocidad);
}

/* ==========================================
   INICIAR (BOTÓN)
========================================== */

function iniciar(){

    // Oculta solo el botón
    startBox.style.display = "none";

    // Reproducir música de la primera escena
    audioInicio.currentTime = 0;
    audioInicio.volume = 0.6;
    audioInicio.play();

}
window.iniciar = iniciar;

/* ==========================================
   TRANSICIONES
========================================== */

function pasarAPoemas(){

    estado = "poemas";

    screenInicio.classList.remove("active");
    screenScene.classList.add("active");

    audioPoemas.currentTime = 0;
    audioPoemas.volume = 0.6;
    audioPoemas.play();

    initSnow();
    crearOceano();

    escribirPoema(poemaLeft, texto1, 60, ()=>{
        escribirPoema(poemaRight, texto2, 60);
    });

    animar();
}

function pasarAFinal(){

    estado = "final";

    // Ocultar elementos de poemas
    poemaLeft.style.display = "none";
    poemaRight.style.display = "none";
    contadorEl.style.display = "none";

    // Activar fondo océano
    screenScene.classList.add("final");

    // Iniciar playlist
    indiceOceano = 0;
    audioOceano.src = playlistOceano[indiceOceano];
    audioOceano.volume = 0.6;
    audioOceano.play();
}

/* ==========================================
   OCEANO
========================================== */

let particulas = [];
let tiempo = 0;

function crearOceano(){
    particulas = [];
    for(let i=0;i<1500;i++){
        particulas.push({
            x: Math.random()*W,
            y: Math.random()*H,
            size: Math.random()*2
        });
    }
}

function drawOcean(){
    for(let p of particulas){
        ctx.fillStyle = "rgba(0,150,255,0.3)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();

        p.y += 0.3;
        if(p.y > H) p.y = 0;
    }
}

/* ==========================================
   LOOP
========================================== */

function animar(){
    requestAnimationFrame(animar);
    ctx.clearRect(0,0,W,H);

    if(estado === "poemas"){
        drawSnow();
    }

    if(estado === "final"){
        drawOcean();
    }
}


