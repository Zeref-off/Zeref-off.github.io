// ========================
// CANVAS
// ========================

const matrixCanvas = document.getElementById("matrixCanvas");
const sceneCanvas = document.getElementById("sceneCanvas");
const mCtx = matrixCanvas.getContext("2d");
const ctx = sceneCanvas.getContext("2d");

function resize(){
matrixCanvas.width = sceneCanvas.width = window.innerWidth;
matrixCanvas.height = sceneCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// ========================
// MATRIX INICIO
// ========================

const text = "Fatum Amantis";
const fontSize = 26;
let cols = Math.floor(matrixCanvas.width / fontSize);
let drops = Array(cols).fill(0);

function drawMatrix(){
mCtx.fillStyle = "rgba(0,0,0,0.07)";
mCtx.fillRect(0,0,matrixCanvas.width,matrixCanvas.height);

mCtx.fillStyle = "#ff4d6d";
mCtx.font = fontSize + "px monospace";

for(let i=0;i<drops.length;i++){
let char = text[Math.floor(Math.random()*text.length)];
mCtx.fillText(char, i*fontSize, drops[i]*fontSize);

if(drops[i]*fontSize > matrixCanvas.height && Math.random()>0.97){
drops[i]=0;
}
drops[i]++;
}
}
setInterval(drawMatrix,90);

// ========================
// FASES
// ========================

let phase="idle";

function iniciar(){
document.getElementById("screenInicio").classList.remove("active");
document.getElementById("screenScene").classList.add("active");

phase="poems";
animar();
iniciarPoemas();
}

// ========================
// NIEVE (SIEMPRE ACTIVA)
// ========================

let snow=[];

for(let i=0;i<400;i++){
snow.push({
x:Math.random()*sceneCanvas.width,
y:Math.random()*sceneCanvas.height,
s:Math.random()*2+1,
v:Math.random()*1+0.5
});
}

// ========================
// POEMAS
// ========================

const poema1 = `En el silencio del tiempo te encontré,
como el mar encuentra la orilla cada día.
No te busqué…
pero mi alma ya sabía tu nombre.

Desde entonces,
cada latido tiene tu forma,
cada instante tu luz,
y cada sueño tu presencia.`;

const poema2 = `Si el destino volviera a comenzar,
te elegiría en cada universo,
en cada vida,
en cada historia posible.

Porque amarte no es un momento…
es una eternidad
que decidió quedarse conmigo.`;

function iniciarPoemas(){
let left=document.getElementById("poemaLeft");
let right=document.getElementById("poemaRight");

animarPoema(left,poema1,"left",()=>{
animarPoema(right,poema2,"right",()=>{
iniciarCuentaFinal();
});
});
}

// Aparición desde abajo y desaparición mientras sube
function animarPoema(elemento,texto,lado,callback){
elemento.innerText=texto;
elemento.style.opacity=1;
elemento.style.top="65%";

if(lado==="left"){
elemento.style.left="5%";
elemento.style.right="";
}
if(lado==="right"){
elemento.style.right="5%";
elemento.style.left="";
}

let pos=65;
let op=1;

let anim=setInterval(()=>{
pos-=0.15;
op-=0.002;

elemento.style.top=pos+"%";
elemento.style.opacity=op;

if(op<=0){
clearInterval(anim);
callback();
}
},30);
}

// ========================
// CONTADOR
// ========================

let timeTotal = 30*86400 + 10*3600 + 5*60 + 39;
const timeEl=document.getElementById("time");

setInterval(()=>{
if(timeTotal>0){
timeTotal--;
timeEl.innerText=formatTime(timeTotal);
}
},1000);

function formatTime(t){
let d=Math.floor(t/86400);
t%=86400;
let h=Math.floor(t/3600);
t%=3600;
let m=Math.floor(t/60);
let s=t%60;
return `${d}d ${h}h ${m}m ${s}s`;
}

// Cuenta regresiva rápida al final
function iniciarCuentaFinal(){
let fast=setInterval(()=>{
timeTotal-=30000;

if(timeTotal<=0){
timeTotal=0;
timeEl.innerText=formatTime(timeTotal);
clearInterval(fast);

/* Ocultar textos */
document.getElementById("poemaLeft").style.display="none";
document.getElementById("poemaRight").style.display="none";
document.getElementById("contador").style.display="none";

/* Activar océano */
phase="ocean";
}
},20);
}


/* ========================
OCEANO REALISTA CINEMATOGRÁFICO
======================== */

let foam=[];

/* partículas de espuma */
for(let i=0;i<800;i++){
foam.push({
x:Math.random()*sceneCanvas.width,
y:sceneCanvas.height,
life:Math.random()*100
});
}

/* ========================
OCEANO CINEMATOGRÁFICO REALISTA
======================== */

function drawOcean(){

    document.getElementById("screenScene").classList.remove("active");

    let oceanScreen = document.createElement("div");
    oceanScreen.className = "screen active";
    document.body.appendChild(oceanScreen);

    let canvas = document.createElement("canvas");
    oceanScreen.appendChild(canvas);
    let ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let W = canvas.width;
    let H = canvas.height;

    /* ===== PARAMETROS ===== */

    let profundidad = H * 0.55;   // inicio del agua profunda
    let orilla = H * 0.85;        // zona donde rompen olas
    let tiempo = 0;

    let espuma = [];

    function crearEspuma(x, y){
        for(let i=0;i<6;i++){
            espuma.push({
                x: x + (Math.random()*20-10),
                y: y,
                vx: Math.random()*1.5 - 0.75,
                vy: -Math.random()*1.5,
                vida: 40 + Math.random()*20
            });
        }
    }

function drawOcean(){

    const canvas = document.getElementById("sceneCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const W = canvas.width;
    const H = canvas.height;

    /* =========================
       SISTEMA DE PARTÍCULAS OCEANO
    ========================= */

    let particles = [];
    let tiempo = 0;

    const capas = 3;            // profundidad (3 niveles)
    const densidad = 1800;      // cantidad total

    for(let c=0; c<capas; c++){

        for(let i=0; i<densidad/capas; i++){

            particles.push({
                x: Math.random()*W,
                y: Math.random()*H,
                capa: c,
                size: 1 + c,
                speed: 0.2 + c*0.2
            });
        }
    }

    /* =========================
       ANIMACIÓN
    ========================= */

    function animar(){

        tiempo += 0.02;

        ctx.clearRect(0,0,W,H);

        particles.forEach(p=>{

            /* ===== PROFUNDIDAD ===== */
            let profundidadFactor = (p.capa+1)/capas;

            /* ===== OLA PRINCIPAL (swell del océano abierto) ===== */
            let wave1 = Math.sin((p.x*0.003) + tiempo*0.8) * 30 * profundidadFactor;
            let wave2 = Math.sin((p.x*0.008) + tiempo*1.6) * 15 * profundidadFactor;
            let wave3 = Math.sin((p.x*0.015) + tiempo*2.5) * 6 * profundidadFactor;

            /* altura base según capa */
            let baseY = H*0.4 + p.capa*40;

            let yWave = baseY + wave1 + wave2 + wave3;

            /* movimiento vertical suave */
            p.y += (yWave - p.y) * 0.05;

            /* deriva horizontal (corriente) */
            p.x += Math.sin(tiempo*0.3 + p.capa) * 0.3;

            if(p.x > W) p.x = 0;
            if(p.x < 0) p.x = W;

            /* ===== CRESTA (rompimiento de ola) ===== */
            let crest = wave1 + wave2;

            let brillo = 0.4 + profundidadFactor*0.6;
            let color;

            if(crest > 25){  
                // espuma blanca en rompimiento
                color = "rgba(200,230,255,0.9)";
            }else{
                // tonos azul profundo según profundidad
                let blue = 150 + p.capa*40;
                color = `rgba(0, ${blue}, 255, ${brillo})`;
            }

            ctx.fillStyle = color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        });

        requestAnimationFrame(animar);
    }

    animar();
}


// ========================
// LOOP GENERAL
// ========================

function animar(){
ctx.clearRect(0,0,sceneCanvas.width,sceneCanvas.height);

drawSnow();

if(phase==="ocean"){
drawOcean();
}

requestAnimationFrame(animar);
}











