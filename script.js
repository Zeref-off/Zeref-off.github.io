window.onload = function(){

let oceanParticles = [];
let heartParticles = [];
let oceanPhase = "ocean"; // ocean → rise → heart
let cameraOffset = 0;

  
/* ================= CANVAS ================= */

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

/* ================= MATRIX ================= */

const text = "Fatum Amantis";
const fontSize = 26;
let cols = Math.floor(matrixCanvas.width / fontSize);
let drops = Array(cols).fill(0);

function drawMatrix(){
mCtx.fillStyle = "rgba(0,0,0,0.08)";
mCtx.fillRect(0,0,matrixCanvas.width,matrixCanvas.height);

mCtx.fillStyle = "#ff4d6d";
mCtx.font = fontSize + "px monospace";

for(let i=0;i<drops.length;i++){
let char = text[Math.floor(Math.random()*text.length)];
mCtx.fillText(char, i*fontSize, drops[i]*fontSize);

if(drops[i]*fontSize > matrixCanvas.height && Math.random()>0.975){
drops[i]=0;
}
drops[i]++;
}
}
setInterval(drawMatrix, 80);

/* ================= NIEVE ================= */

let snow=[];
for(let i=0;i<250;i++){
snow.push({
x:Math.random()*sceneCanvas.width,
y:Math.random()*sceneCanvas.height,
s:Math.random()*2+1
});
}

function drawSnow(){
ctx.fillStyle="white";
snow.forEach(s=>{
ctx.fillRect(s.x,s.y,s.s,s.s);
s.y+=1;
if(s.y>sceneCanvas.height) s.y=0;
});
}

/* ================= INICIAR ================= */

window.iniciar = function(){
document.getElementById("screenInicio").classList.remove("active");
document.getElementById("screenScene").classList.add("active");

mostrarPoemas();
animarScene();
}

/* ================= ESCENA ================= */

function animarScene(){
ctx.clearRect(0,0,sceneCanvas.width,sceneCanvas.height);
drawSnow();
requestAnimationFrame(animarScene);
}

/* ================= POEMAS ================= */

const poema1 = `En el silencio del tiempo te encontré,
como la calma que sigue a la tormenta.
Tu mirada se volvió mi destino,
y tu presencia, mi hogar eterno.

Si el mundo desapareciera hoy,
aún existiría tu luz en mi interior,
porque amarte
es la forma en que mi alma respira.`;

const poema2 = `Si el universo volviera a empezar,
buscaría tu esencia entre las estrellas.
Porque no hay infinito,
ni eternidad,
que supere lo que siento por ti.

Mi amor por ti no mide el tiempo,
lo trasciende,
lo transforma,
lo vuelve eterno.`;

function mostrarPoemas(){
let left = document.getElementById("poemaLeft");
let right = document.getElementById("poemaRight");

left.innerText = poema1;
left.style.opacity = 1;

setTimeout(()=>{
left.style.opacity = 0;

setTimeout(()=>{
right.innerText = poema2;
right.style.opacity = 1;

setTimeout(()=>{
right.style.opacity = 0;
iniciarCuentaFinal();
},4000);

},800);

},4000);
}

/* ================= CONTADOR ================= */

let timeTotal = 30*86400 + 10*3600 + 5*60 + 39;
const timeEl = document.getElementById("time");

setInterval(()=>{
if(timeTotal>0){
timeTotal--;
timeEl.innerText = formatTime(timeTotal);
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

function iniciarCuentaFinal(){
let fast = setInterval(()=>{
timeTotal -= 3000;

if(timeTotal <= 0){
timeTotal = 0;
clearInterval(fast);

document.getElementById("poemaLeft").style.display="none";
document.getElementById("poemaRight").style.display="none";
document.getElementById("contador").style.display="none";

drawOcean();
}
},30);
}

/* ================= OCEANO DE PARTICULAS (PROFUNDO) ================= */

function drawOcean(){

let W = sceneCanvas.width;
let H = sceneCanvas.height;

oceanParticles = [];

for(let i=0;i<2500;i++){
oceanParticles.push({
x:Math.random()*W,
y:Math.random()*H,
layer:Math.floor(Math.random()*3)
});
}

let t=0;
let phaseTime = 0;

function animarOcean(){

ctx.clearRect(0,0,W,H);

t += 0.02;
phaseTime += 1;

/* ===== TRANSICIÓN DE CÁMARA ===== */
if(phaseTime > 300 && cameraOffset < 80){
cameraOffset += 0.2; // sensación de alejamiento
}

/* ===== FONDO OSCURO AZUL ===== */
ctx.fillStyle = "rgba(0,10,30,0.4)";
ctx.fillRect(0,0,W,H);

/* ===== LUNA ===== */
if(phaseTime > 400){
let moonY = 120 - cameraOffset;
let grad = ctx.createRadialGradient(W/2, moonY, 10, W/2, moonY, 80);
grad.addColorStop(0,"rgba(220,240,255,0.9)");
grad.addColorStop(1,"rgba(220,240,255,0)");
ctx.fillStyle = grad;
ctx.beginPath();
ctx.arc(W/2, moonY, 60, 0, Math.PI*2);
ctx.fill();
}

/* ===== OCEANO ===== */
oceanParticles.forEach(p=>{

let depth = (p.layer+1)/3;

let wave =
Math.sin(p.x*0.004 + t)*40*depth +
Math.sin(p.x*0.01 + t*1.6)*18*depth;

let base = H*0.45 + p.layer*40 + cameraOffset;
p.y += (base + wave - p.y)*0.05;

let crest = wave;

let color;
if(crest > 28){
color = "rgba(220,240,255,0.9)"; // espuma
}else{
let blue = 120 + p.layer*40;
color = `rgba(0,${blue},255,0.8)`;
}

ctx.fillStyle=color;
ctx.fillRect(p.x,p.y,2,2);

/* ===== TRANSICIÓN A CORAZÓN ===== */
if(phaseTime > 700){
p.y -= (p.y - H/2)*0.002;
p.x -= (p.x - W/2)*0.002;
}

});

/* ===== CREAR CORAZÓN ===== */
if(phaseTime === 900){
crearHeart();
oceanPhase = "heart";
}

if(oceanPhase === "heart"){
drawHeart();
}

requestAnimationFrame(animarOcean);
}

animarOcean();
}

  function crearHeart(){
heartParticles = [];

for(let t=0; t<Math.PI*2; t+=0.02){
for(let z=-60; z<60; z+=4){

let x = 16*Math.pow(Math.sin(t),3);
let y = -(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));

heartParticles.push({
x:x*12,
y:y*12,
z:z
});
}
}
}

function drawHeart(){

let time = Date.now()*0.001;

ctx.fillStyle="rgba(0,180,255,0.9)";

heartParticles.forEach(p=>{

let rx = p.x*Math.cos(time) - p.z*Math.sin(time);
let rz = p.x*Math.sin(time) + p.z*Math.cos(time);

let scale = 400/(400+rz);

ctx.fillRect(
sceneCanvas.width/2 + rx*scale,
sceneCanvas.height/2 + p.y*scale,
2,2
);
});
}

};






