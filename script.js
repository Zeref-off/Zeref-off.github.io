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

/* =========================
MATRIX INICIO
========================= */

const text = "Fatum Amantis";
const fontSize = 22;
const cols = Math.floor(matrixCanvas.width / fontSize);
let drops = Array(cols).fill(0);

function drawMatrix(){
mCtx.fillStyle = "rgba(0,0,0,0.08)";
mCtx.fillRect(0,0,matrixCanvas.width,matrixCanvas.height);

mCtx.fillStyle = "#ff4d6d";
mCtx.font = fontSize + "px monospace";

for(let i=0;i<drops.length;i++){
let char = text[Math.floor(Math.random()*text.length)];
mCtx.fillText(char, i*fontSize, drops[i]*fontSize);

if(drops[i]*fontSize > matrixCanvas.height && Math.random()>0.96){
drops[i]=0;
}
drops[i]++;
}
}
setInterval(drawMatrix,100);

/* =========================
TRANSICIÓN
========================= */

let phase="idle";
let spiralParticles=[];
let dropY=0;

function iniciar(){
document.getElementById("screenInicio").classList.remove("active");
document.getElementById("screenScene").classList.add("active");

for(let i=0;i<2500;i++){
spiralParticles.push({
angle:Math.random()*Math.PI*2,
radius:Math.random()*sceneCanvas.width
});
}
phase="spiral";
animar();
}

/* =========================
VARIABLES
========================= */

let waves=[];
let treeProgress=0;
let snow=[];
let ocean=[];
let timeTotal = 30*86400 + 10*3600 + 5*60 + 39;

for(let i=0;i<300;i++){
snow.push({
x:Math.random()*sceneCanvas.width,
y:Math.random()*sceneCanvas.height,
s:Math.random()*2
});
}

/* =========================
LOOP
========================= */

function animar(){
ctx.clearRect(0,0,sceneCanvas.width,sceneCanvas.height);

if(phase==="spiral"){
ctx.fillStyle="rgba(255,0,80,0.5)";
spiralParticles.forEach(p=>{
p.radius*=0.965;
p.angle+=0.15;
let x=sceneCanvas.width/2 + Math.cos(p.angle)*p.radius;
let y=sceneCanvas.height/2 + Math.sin(p.angle)*p.radius;
ctx.fillRect(x,y,2,2);
});
if(spiralParticles[0].radius<2){
phase="drop";
}
}

else if(phase==="drop"){
dropY+=3;
ctx.fillStyle="red";
ctx.beginPath();
ctx.arc(sceneCanvas.width/2,dropY,6,0,Math.PI*2);
ctx.fill();

if(dropY>sceneCanvas.height-70){
for(let i=0;i<6;i++) waves.push({r:0});
phase="wave";
}
}

else if(phase==="wave"){
waves.forEach(w=>{
ctx.strokeStyle="rgba(0,160,255,0.6)";
ctx.beginPath();
ctx.arc(sceneCanvas.width/2,sceneCanvas.height-70,w.r,0,Math.PI*2);
ctx.stroke();
w.r+=3;
});
if(waves[0].r>240) phase="tree";
}

else if(phase==="tree"){
treeProgress+=0.0025;
drawTree(sceneCanvas.width/2,sceneCanvas.height-70,-90,220*treeProgress);
drawSnow();

if(treeProgress>=1){
phase="poems";
iniciarPoemas();
}
}

else if(phase==="poems"){
drawTree(sceneCanvas.width/2,sceneCanvas.height-70,-90,220);
drawSnow();
}

else if(phase==="ocean"){
drawOcean();
}

requestAnimationFrame(animar);
}

/* =========================
ÁRBOL
========================= */

function drawTree(x,y,angle,length){
if(length<6) return;

let x2=x+Math.cos(angle*Math.PI/180)*length;
let y2=y+Math.sin(angle*Math.PI/180)*length;

ctx.strokeStyle="#5b3a29";
ctx.lineWidth=2;
ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x2,y2);
ctx.stroke();

drawTree(x2,y2,angle-15,length*0.75);
drawTree(x2,y2,angle+15,length*0.75);
drawTree(x2,y2,angle,length*0.72);

if(length<14){
ctx.fillStyle="#ff8fab";
ctx.fillRect(x2,y2,3,3);
}
}

/* =========================
NIEVE
========================= */

function drawSnow(){
ctx.fillStyle="white";
snow.forEach(s=>{
ctx.fillRect(s.x,s.y,s.s,s.s);
s.y+=1;
if(s.y>sceneCanvas.height) s.y=0;
});
}

/* =========================
POEMAS (SUBEN Y DESAPARECEN)
========================= */

const poema1 = `Eres el destino que no busqué,
pero que mi alma reconoció.
Cada latido tuyo
es el hogar de mi tiempo.
Si el mundo se apagara,
seguiría viviendo
en la luz de tu mirada.`;

const poema2 = `Si el universo volviera a empezar,
volvería a encontrarte.
Porque no existe estrella
ni infinito
que brille más que tu presencia.
Mi amor por ti
pertenece al destino.`;


function animarPoema(elemento, texto, lado, callback){
elemento.innerText = texto;
elemento.style.opacity = 1;
elemento.style.top = "65%";
elemento.style.transition = "none";

if(lado==="left") elemento.style.left="5%";
if(lado==="right") elemento.style.right="5%";

let pos = 65;
let op = 1;

let anim = setInterval(()=>{
pos -= 0.5;
op -= 0.01;

elemento.style.top = pos + "%";
elemento.style.opacity = op;

if(op <= 0){
clearInterval(anim);
callback();
}
},20);
}

function iniciarPoemas(){
let left = document.getElementById("poemaLeft");
let right = document.getElementById("poemaRight");

animarPoema(left, poema1, "left", ()=>{
animarPoema(right, poema2, "right", ()=>{
iniciarCuentaFinal();
});
});
}

/* =========================
CONTADOR
========================= */

const timeEl = document.getElementById("time");

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

/* reducción abrupta */
function iniciarCuentaFinal(){
let fast = setInterval(()=>{
timeTotal -= 10000;
if(timeTotal <= 0){
timeTotal = 0;
clearInterval(fast);
crearOcean();
phase="ocean";
}
},10);
}

/* =========================
OCÉANO ESPECTACULAR
========================= */

function crearOcean(){
ocean=[];
for(let i=0;i<5000;i++){
ocean.push({
x:Math.random()*sceneCanvas.width,
y:sceneCanvas.height/2 + Math.random()*sceneCanvas.height/2,
baseY:Math.random()*sceneCanvas.height/2,
speed:Math.random()*0.5+0.2,
color:Math.random()>0.8 ? "rgba(255,255,255,0.9)" : "rgba(0,150,255,0.8)"
});
}
}

function drawOcean(){
let time = Date.now()*0.002;

ocean.forEach(p=>{
p.y = sceneCanvas.height/2 + p.baseY + Math.sin(time + p.x*0.01)*20;
ctx.fillStyle = p.color;
ctx.fillRect(p.x,p.y,2,2);
});
}



