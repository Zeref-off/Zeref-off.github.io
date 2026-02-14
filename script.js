/* ==========================================
   FATUM AMANTIS – CINE PREMIUM SECUENCIAL
========================================== */
const subtitulos = document.getElementById("subtitulos");
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

// Transiciones automáticas
audioInicio.addEventListener("ended", pasarAPoemas);
audioPoemas.addEventListener("ended", pasarAFinal);

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
pero es la tuya la unica que quiero,
es tu sonrisa la que acelera mis
latidos y es tu mano la que siempre
deseo sujetar.
Es a tu lado donde siento que todo
tiene sentido y se tambien que eres
tu mi mas bonita decision.`;

const texto2 = `Me enamore de ti desde 
aquel instante en que llegaste a mi vida 
sin previo aviso cuando ni siquiera 
imaginaba que alguien tan especial como 
tu apareceria y es que contigo aprendi 
que el amor no se busca simplemente llega
y te transforma, desde el primer dia supe 
que habia algo distinto en ti, algo que te
hacia brillar mas que a las demas, algo
que me atrapo y me hizo sentir que eras
tu lo que siempre habia estado esperando`;

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
    audioInicio.play().catch(()=>{});
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
    audioPoemas.play().catch(()=>{});

    initSnow();
    crearOceano();

    escribirPoema(poemaLeft, texto1, 60, ()=>{
        escribirPoema(poemaRight, texto2, 60);
    });

    animar();
}

function pasarAFinal(){

    estado = "final";

    poemaLeft.style.display = "none";
    poemaRight.style.display = "none";
    contadorEl.style.display = "none";

    screenScene.classList.add("final");

    indiceOceano = 0;
    audioOceano.src = playlistOceano[indiceOceano];
    audioOceano.volume = 0.6;
    audioOceano.play().catch(()=>{});

    subtitulos.style.opacity = 1;
    subtitulos.innerText = "Aquí aparecerá la letra de la canción, Aquí aparecerá la letra de la canciónAquí aparecerá la letra de la canciónAquí aparecerá la letra de la canciónAquí aparecerá la letra de la canción";
}

/* ==========================================
   OCEANO CINEMATOGRÁFICO ORIGINAL
========================================== */

let particulas = [];
let tiempo = 0;
let camX = 0;
let camY = 0;

function crearOceano(){
    particulas = [];

    const capas = 7;

    for(let c = 0; c < capas; c++){

        let profundidad = c / capas;
        let cantidad = 500 + c * 250;

        for(let i=0;i<cantidad;i++){
            particulas.push({
                x: Math.random()*W,
                baseY: H*(0.45 + profundidad*0.55),
                profundidad: profundidad,
                amp: 40 + profundidad*140,
                freq: 0.0015 + Math.random()*0.002,
                speed: 0.4 + profundidad*2,
                size: 1 + profundidad*3,
                fase: Math.random()*Math.PI*2
            });
        }
    }
}

function ola(p, t){
    let w1 = Math.sin(p.x*p.freq + t*p.speed + p.fase);
    let w2 = Math.sin(p.x*p.freq*0.5 + t*p.speed*0.7);
    let w3 = Math.sin(p.x*p.freq*2 + t*p.speed*1.2);
    return p.baseY + (w1 + w2*0.6 + w3*0.3)*p.amp;
}

function drawCielo(){

    let grad = ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,"rgba(0,8,20,0.6)");
    grad.addColorStop(1,"rgba(0,17,31,0.8)");

    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);

    let moonX = W * 0.8;
    let moonY = H * 0.15;

    let glow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 140);
    glow.addColorStop(0,"rgba(255,255,220,0.8)");
    glow.addColorStop(0.4,"rgba(255,255,220,0.4)");
    glow.addColorStop(1,"rgba(255,255,220,0)");

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 140, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle="#fff8cc";
    ctx.beginPath();
    ctx.arc(moonX, moonY, 40, 0, Math.PI*2);
    ctx.fill();
}

function drawOcean(){

    camX = Math.sin(tiempo*0.15)*18;
    camY = Math.sin(tiempo*0.12)*8;

    ctx.save();
    ctx.translate(camX, camY);

    for(let p of particulas){

        let y = ola(p, tiempo);

        p.x += p.profundidad*0.4;
        if(p.x > W) p.x = 0;

        let blue = 100 + p.profundidad*130;
        let alpha = 0.25 + p.profundidad*0.7;

        ctx.fillStyle = `rgba(0,${blue},255,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x,y,p.size,0,Math.PI*2);
        ctx.fill();

        let crest = Math.sin(p.x*p.freq + tiempo*p.speed + p.fase);
        if(crest>0.94 && p.profundidad>0.6){
            ctx.fillStyle="rgba(255,255,255,0.9)";
            ctx.beginPath();
            ctx.arc(p.x,y-p.size*2,p.size*1.2,0,Math.PI*2);
            ctx.fill();
        }
    }

    ctx.restore();
}

/* ==========================================
   LOOP
========================================== */

function animar(){
    requestAnimationFrame(animar);
    tiempo += 0.01;

    ctx.clearRect(0,0,W,H);

    if(estado === "poemas"){
        drawSnow();
    }

    if(estado === "final"){
        drawCielo();
        drawOcean();
    }
}



