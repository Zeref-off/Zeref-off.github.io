/* ==========================================
   FATUM AMANTIS – CINE PREMIUM
========================================== */

const screenInicio = document.getElementById("screenInicio");
const screenScene = document.getElementById("screenScene");

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
   AUDIO AMBIENTAL (olas)
========================================== */

const audioOlas = new Audio(
"https://cdn.pixabay.com/download/audio/2022/03/15/audio_8f1a3e7c42.mp3?filename=ocean-waves-ambient-110624.mp3"
);
audioOlas.loop = true;
audioOlas.volume = 0.35;

/* ==========================================
   ESTADOS
========================================== */

let estado = "inicio"; // inicio → poemas → fade → final
let fadeAlpha = 0;
let fadeOut = false;

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

const texto1 =
`Eres el instante donde el tiempo respira,
la pausa entre mis latidos,
el destino que llegó sin avisar
y decidió quedarse.`;

const texto2 =
`Y si el mundo terminara mañana,
volvería a encontrarte,
porque mi universo
comienza y termina en ti.`;

function escribirPoema(el, texto, velocidad, callback){
    el.style.opacity = 1;
    el.innerHTML = "";
    let i = 0;

    let inter = setInterval(()=>{
        el.innerHTML += texto[i];
        i++;

        if(i >= texto.length){
            clearInterval(inter);

            setTimeout(()=>{
                el.style.opacity = 0;
                if(callback) callback();
            },900);
        }
    }, velocidad);
}

/* ==========================================
   CONTADOR RÁPIDO
========================================== */

let tiempoTotal = 12000;
let contadorActivo = false;

function iniciarContador(){
    contadorActivo = true;
}

function actualizarContador(){
    if(!contadorActivo || estado === "final") return;

    tiempoTotal -= 180;

    if(tiempoTotal <= 0){
        tiempoTotal = 0;
        contadorActivo = false;
        iniciarFadeFinal();
    }

    let s = Math.floor(tiempoTotal/1000);
    let m = Math.floor(s/60);
    let h = Math.floor(m/60);
    let d = Math.floor(h/24);

    timeEl.innerText = `${d}d ${h%24}h ${m%60}m ${s%60}s`;
}

/* ==========================================
   INICIAR
========================================== */

function iniciar(){
    screenInicio.classList.remove("active");
    screenScene.classList.add("active");

    estado = "poemas";

    initSnow();
    crearOceano();

    escribirPoema(poemaLeft, texto1, 16, ()=>{
        escribirPoema(poemaRight, texto2, 16, ()=>{
            iniciarContador();
        });
    });

    animar();
}
window.iniciar = iniciar;

/* ==========================================
   FADE CINEMATOGRAFICO
========================================== */

function iniciarFadeFinal(){
    fadeOut = true;
}

function drawFade(){
    if(!fadeOut) return;

    fadeAlpha += 0.01;

    ctx.fillStyle = `rgba(0,0,0,${fadeAlpha})`;
    ctx.fillRect(0,0,W,H);

    if(fadeAlpha >= 1){
        estado = "final";
        fadeOut = false;
        fadeAlpha = 0;

        poemaLeft.style.display="none";
        poemaRight.style.display="none";
        contadorEl.style.display="none";

        audioOlas.play();
    }
}

/* ==========================================
   OCEANO PREMIUM (más partículas)
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
        let cantidad = 500 + c * 250; // muy denso

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
    grad.addColorStop(0,"#000814");
    grad.addColorStop(1,"#00111f");
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);

    let moonX = W * 0.8;
    let moonY = H * 0.15;
    let r = 40;

    // ===== HALO EXTERIOR (atmósfera) =====
    let haloGrande = ctx.createRadialGradient(
        moonX, moonY, r*0.5,
        moonX, moonY, r*6
    );
    haloGrande.addColorStop(0, "rgba(255,255,220,0.15)");
    haloGrande.addColorStop(1, "rgba(255,255,220,0)");

    ctx.beginPath();
    ctx.arc(moonX, moonY, r*6, 0, Math.PI*2);
    ctx.fillStyle = haloGrande;
    ctx.fill();

    // ===== HALO MEDIO =====
    let haloMedio = ctx.createRadialGradient(
        moonX, moonY, r*0.2,
        moonX, moonY, r*2.5
    );
    haloMedio.addColorStop(0, "rgba(255,255,240,0.35)");
    haloMedio.addColorStop(1, "rgba(255,255,240,0)");

    ctx.beginPath();
    ctx.arc(moonX, moonY, r*2.5, 0, Math.PI*2);
    ctx.fillStyle = haloMedio;
    ctx.fill();

    // ===== CUERPO DE LA LUNA (gradiente) =====
    let moonGrad = ctx.createRadialGradient(
        moonX - r*0.3, moonY - r*0.3, r*0.2,
        moonX, moonY, r
    );
    moonGrad.addColorStop(0, "#ffffff");
    moonGrad.addColorStop(1, "#fff2b0");

    ctx.beginPath();
    ctx.arc(moonX, moonY, r, 0, Math.PI*2);
    ctx.fillStyle = moonGrad;
    ctx.fill();

    // ===== PUNTO DE BRILLO =====
    ctx.beginPath();
    ctx.arc(moonX - r*0.3, moonY - r*0.3, r*0.25, 0, Math.PI*2);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
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
        actualizarContador();
    }

    if(estado === "final"){
        drawCielo();
        drawOcean();
    }

    drawFade();
}


