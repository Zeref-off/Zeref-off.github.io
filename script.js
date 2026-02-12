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
pos-=0.6;
op-=0.015;

elemento.style.top=pos+"%";
elemento.style.opacity=op;

if(op<=0){
clearInterval(anim);
callback();
}
},20);
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
timeTotal-=20000;

if(timeTotal<=0){
timeTotal=0;
timeEl.innerText=formatTime(timeTotal);
clearInterval(fast);
phase="ocean";
}
},10);
}

// ========================
// OCEANO CINEMATOGRÁFICO
// ========================

let oceanParticles=[];

for(let i=0;i<5000;i++){
oceanParticles.push({
x:Math.random()*sceneCanvas.width,
y:sceneCanvas.height*0.6 + Math.random()*sceneCanvas.height*0.4,
color: Math.random()>0.8 ? "white" : "rgba(0,120,255,0.8)"
});
}

function drawOcean(){
let time=Date.now()*0.002;

oceanParticles.forEach(p=>{
let wave1=Math.sin(p.x*0.01 + time)*6;
let wave2=Math.sin(p.x*0.02 + time*1.5)*4;

p.y += (wave1+wave2)*0.02;

ctx.fillStyle=p.color;
ctx.fillRect(p.x,p.y,2,2);
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





