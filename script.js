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

function drawOcean(){

let time = Date.now()*0.0008;

/* Fondo oscuro profundo */
let gradient = ctx.createLinearGradient(0, sceneCanvas.height*0.5, 0, sceneCanvas.height);
gradient.addColorStop(0, "#020a18");
gradient.addColorStop(0.5, "#041a3a");
gradient.addColorStop(1, "#062a5c");
ctx.fillStyle = gradient;
ctx.fillRect(0, sceneCanvas.height*0.5, sceneCanvas.width, sceneCanvas.height);

/* Capas de olas (interferencia) */
for(let layer=0; layer<4; layer++){

ctx.beginPath();
ctx.moveTo(0, sceneCanvas.height);

for(let x=0; x<sceneCanvas.width; x+=6){

let y =
sceneCanvas.height*0.65

* Math.sin(x*0.008 + time*(1+layer*0.3))*20
* Math.sin(x*0.015 + time*(1.5+layer*0.2))*10
* layer*12;

ctx.lineTo(x,y);
}

ctx.lineTo(sceneCanvas.width, sceneCanvas.height);
ctx.closePath();

/* color por profundidad */
ctx.fillStyle = `rgba(0,120,255,${0.25 + layer*0.1})`;
ctx.fill();
}

/* ========================
ESPUMA DE OLAS
======================== */

ctx.fillStyle="rgba(255,255,255,0.9)";

foam.forEach(f=>{

/* superficie dinámica */
let surface =
sceneCanvas.height*0.65

* Math.sin(f.x*0.008 + time)*20
* Math.sin(f.x*0.015 + time*1.5)*10;

f.y += (surface - f.y)*0.05;
f.x += Math.sin(time + f.y)*0.3;
f.life--;

ctx.fillRect(f.x,f.y,2,2);

/* regenerar */
if(f.life<=0){
f.x=Math.random()*sceneCanvas.width;
f.y=sceneCanvas.height*0.65;
f.life=80+Math.random()*60;
}

});
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







