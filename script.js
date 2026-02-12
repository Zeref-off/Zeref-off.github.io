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

function drawSnow(){
ctx.fillStyle="rgba(255,255,255,0.9)";
snow.forEach(s=>{
ctx.fillRect(s.x,s.y,s.s,s.s);
s.y+=s.v;
s.x+=Math.sin(Date.now()*0.001+s.y)*0.2;

if(s.y>sceneCanvas.height){
s.y=0;
s.x=Math.random()*sceneCanvas.width;
}
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

    function draw(){

        tiempo += 0.03;

        /* ===== FONDO PROFUNDO (GRADIENTE OCEANO) ===== */

        let grad = ctx.createLinearGradient(0, profundidad, 0, H);
        grad.addColorStop(0, "#0a2a4a"); // azul profundo
        grad.addColorStop(0.5, "#0f4c75");
        grad.addColorStop(1, "#1ca3c7"); // turquesa orilla

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        /* ===== OLA PRINCIPAL (forma de playa) ===== */

        ctx.beginPath();

        for(let x=0; x<=W; x+=2){

            // múltiples ondas combinadas = realismo
            let y =
                profundidad +
                Math.sin(x*0.01 + tiempo)*20 +
                Math.sin(x*0.02 + tiempo*1.5)*10 +
                Math.sin(x*0.005 + tiempo*0.5)*15;

            // crecimiento al acercarse a la orilla
            let factor = (x / W);
            y += factor * 80;

            // zona de rompiente
            if(y > orilla){
                crearEspuma(x, orilla);
                y = orilla;
            }

            if(x===0) ctx.moveTo(x,y);
            else ctx.lineTo(x,y);
        }

        ctx.lineTo(W,H);
        ctx.lineTo(0,H);
        ctx.closePath();

        ctx.fillStyle = "rgba(0,120,180,0.8)";
        ctx.fill();

        /* ===== CAPA SUPERIOR DE OLA (cresta) ===== */

        ctx.beginPath();

        for(let x=0; x<=W; x+=4){

            let y =
                profundidad +
                Math.sin(x*0.01 + tiempo)*18 +
                Math.sin(x*0.02 + tiempo*1.5)*8 +
                Math.sin(x*0.005 + tiempo*0.5)*12;

            let factor = (x / W);
            y += factor * 70;

            if(y > orilla){
                y = orilla;
            }

            if(x===0) ctx.moveTo(x,y);
            else ctx.lineTo(x,y);
        }

        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.lineWidth = 2;
        ctx.stroke();

        /* ===== ESPUMA (PARTICULAS BLANCAS) ===== */

        for(let i=espuma.length-1;i>=0;i--){
            let p = espuma[i];

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.03;
            p.vida--;

            ctx.fillStyle = "rgba(255,255,255,"+(p.vida/60)+")";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI*2);
            ctx.fill();

            if(p.vida <= 0){
                espuma.splice(i,1);
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
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









