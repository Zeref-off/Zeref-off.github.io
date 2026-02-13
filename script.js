/* ==========================================
   FATUM AMANTIS – CINE EXTREMO
   Océano cinematográfico profesional
========================================== */

const screenInicio = document.getElementById("screenInicio");
const screenScene = document.getElementById("screenScene");

const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");

let W, H;
function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ==========================================
   CONTROL DE ESCENA
========================================== */

function iniciar(){
    screenInicio.classList.remove("active");
    screenScene.classList.add("active");

    crearOceano();
    animar();
}

window.iniciar = iniciar;

/* ==========================================
   CONTADOR → MODO FINAL
========================================== */

let duracion = 60000; // ajusta si deseas
let inicioTiempo = Date.now();
let modoFinal = false;

/* ==========================================
   CONFIGURACION OCEANO
========================================== */

let particulas = [];
let tiempo = 0;

// cámara flotante (sensación barco)
let camX = 0;
let camY = 0;

function crearOceano(){

    particulas = [];

    const capas = 6;

    for(let c = 0; c < capas; c++){

        let profundidad = c / capas;
        let cantidad = 180 + c * 100;

        for(let i=0; i<cantidad; i++){

            particulas.push({
                x: Math.random() * W,
                baseY: H * (0.45 + profundidad * 0.55),

                profundidad: profundidad,

                amp: 30 + profundidad * 120,
                freq: 0.0015 + Math.random()*0.002,
                speed: 0.4 + profundidad * 1.8,
                size: 1 + profundidad * 3,

                fase: Math.random() * Math.PI * 2
            });
        }
    }
}

/* ==========================================
   FUNCION DE OLAS (MULTIONDA)
========================================== */

function ola(p, t){

    let w1 = Math.sin(p.x * p.freq + t * p.speed + p.fase);
    let w2 = Math.sin(p.x * p.freq * 0.5 + t * p.speed * 0.7);
    let w3 = Math.sin(p.x * p.freq * 2 + t * p.speed * 1.2);

    return p.baseY + (w1 + w2*0.6 + w3*0.3) * p.amp;
}

/* ==========================================
   FONDO NOCTURNO + LUNA
========================================== */

function drawCielo(){

    let grad = ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,"#000814");
    grad.addColorStop(0.5,"#001d3d");
    grad.addColorStop(1,"#00111f");

    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);

    // Luna
    let moonX = W * 0.8;
    let moonY = H * 0.15;
    let radius = 40;

    let glow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 120);
    glow.addColorStop(0,"rgba(255,255,220,0.8)");
    glow.addColorStop(1,"rgba(255,255,220,0)");

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 120, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle = "#fff8cc";
    ctx.beginPath();
    ctx.arc(moonX, moonY, radius, 0, Math.PI*2);
    ctx.fill();
}

/* ==========================================
   OCEANO CINEMATOGRAFICO
========================================== */

function drawOcean(){

    // movimiento de cámara (flotando)
    camX = Math.sin(tiempo * 0.2) * 20;
    camY = Math.sin(tiempo * 0.15) * 10;

    ctx.save();
    ctx.translate(camX, camY);

    for(let p of particulas){

        let y = ola(p, tiempo);

        // corriente horizontal
        p.x += p.profundidad * 0.4;
        if(p.x > W) p.x = 0;

        // color oceánico profundo
        let blue = 100 + p.profundidad * 120;
        let alpha = 0.25 + p.profundidad * 0.6;

        ctx.fillStyle = `rgba(0, ${blue}, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, y, p.size, 0, Math.PI*2);
        ctx.fill();

        // ESPUMA en crestas
        let crest = Math.sin(p.x * p.freq + tiempo * p.speed + p.fase);

        if(crest > 0.93 && p.profundidad > 0.6){
            ctx.fillStyle = `rgba(255,255,255,${(crest-0.9)*6})`;
            ctx.beginPath();
            ctx.arc(p.x, y - p.size*2, p.size*1.2, 0, Math.PI*2);
            ctx.fill();
        }

        // reflejo lunar
        let moonReflectionZone = W * 0.7;
        if(p.x > moonReflectionZone && p.profundidad > 0.5){
            ctx.fillStyle = "rgba(255,255,200,0.05)";
            ctx.beginPath();
            ctx.arc(p.x, y, p.size*1.5, 0, Math.PI*2);
            ctx.fill();
        }
    }

    ctx.restore();
}

/* ==========================================
   NIEBLA ATMOSFERICA
========================================== */

function drawFog(){
    let fog = ctx.createLinearGradient(0, H*0.5, 0, H);
    fog.addColorStop(0,"rgba(0,0,0,0)");
    fog.addColorStop(1,"rgba(0,0,0,0.6)");

    ctx.fillStyle = fog;
    ctx.fillRect(0,0,W,H);
}

/* ==========================================
   LOOP PRINCIPAL
========================================== */

function animar(){

    requestAnimationFrame(animar);

    tiempo += 0.01;

    // verificar final
    if(!modoFinal && Date.now() - inicioTiempo > duracion){
        modoFinal = true;

        document.getElementById("poemaLeft").style.display = "none";
        document.getElementById("poemaRight").style.display = "none";
        document.getElementById("contador").style.display = "none";
    }

    drawCielo();
    drawOcean();
    drawFog();
}



