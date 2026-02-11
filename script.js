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
MATRIX INICIO (LETRAS GRANDES)
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
VARIABLES ESCENA
========================= */

let waves=[];
let treeProgress=0;
let snow=[];
let ocean=[];
let heart=[];
let treeParticles=[];
let timeTotal = 30*86400 + 10*3600 + 5*60 + 39;

/* nieve */
for(let i=0;i<300;i++){
snow.push({
x:Math.random()*sceneCanvas.width,
y:Math.random()*sceneCanvas.height,
s:Math.random()*2
});
}

/* =========================
LOOP GENERAL
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

/* GOTA */
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

/* ONDAS */
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

/* ARBOL */
else if(phase==="tree"){
treeProgress+=0.0025;
drawTree(sceneCanvas.width/2,sceneCanvas.height-70,-90,220*treeProgress);
drawSnow();

if(treeProgress>=1){
mostrarPoemas();
phase="poems";
}
}

/* ARBOL ESTÁTICO MIENTRAS POEMAS */
else if(phase==="poems"){
drawTree(sceneCanvas.width/2,sceneCanvas.height-70,-90,220);
drawSnow();
}

/* DESINTEGRACIÓN */
else if(phase==="disintegrate"){
drawOcean();
}

/* CORAZÓN */
else if(phase==="heart"){
drawHeart();
}

requestAnimationFrame(animar);
}

/* =========================
ÁRBOL MUY FRONDOSO
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

/* más ramas */
drawTree(x2,y2,angle-15,length*0.75);
drawTree(x2,y2,angle+15,length*0.75);
drawTree(x2,y2,angle,length*0.72);

/* hojas rosadas densas */
if(length<14){
ctx.fillStyle="#ff8fab";
ctx.fillRect(x2,y2,3,3);
if(Math.random()>0.6){
ctx.fillRect(x2+2,y2,2,2);
}
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
POEMAS
========================= */

const poema1=`Eres el destino que no busqué,
pero que mi alma reconoció.
En cada latido tuyo
mi mundo encontró su lugar.

Si el tiempo se detuviera,
seguiría viviendo en tu mirada,
porque en ella
descubrí lo eterno.`;

const poema2=`Si el universo volviera a nacer,
volvería a elegir tu camino.
Porque no hay estrella,
ni luz, ni infinito
que brille más que tu presencia.

Mi amor por ti
no pertenece al tiempo,
pertenece al destino.`;

function mostrarPoemas(){
let left=document.getElementById("poemaLeft");
let right=document.getElementById("poemaRight");

left.innerText=poema1;
left.style.opacity=1;

setTimeout(()=>{
left.style.opacity=0;
right.innerText=poema2;
right.style.opacity=1;

setTimeout(()=>{
right.style.opacity=0;
iniciarCuentaFinal();
},9000);

},9000);
}

/* =========================
CONTADOR
========================= */

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

/* aceleración final */
function iniciarCuentaFinal(){
let fast=setInterval(()=>{
timeTotal-=500;
if(timeTotal<=0){
timeTotal=0;
clearInterval(fast);
crearOceanDesdeArbol();
phase="disintegrate";

setTimeout(()=>{
crearHeart();
phase="heart";
},10000);
}
},30);
}

/* =========================
ARBOL → OCEANO
========================= */

function crearOceanDesdeArbol(){
for(let i=0;i<3500;i++){
ocean.push({
x:sceneCanvas.width/2 + (Math.random()-0.5)*200,
y:sceneCanvas.height/2,
vy:Math.random()*2+1,
color:Math.random()>0.5 ? "rgba(0,180,255,0.8)" : "rgba(255,255,255,0.8)"
});
}
}

function drawOcean(){
ocean.forEach(p=>{
p.y+=p.vy;
p.y+=Math.sin(Date.now()*0.002+p.x)*0.5;
ctx.fillStyle=p.color;
ctx.fillRect(p.x,p.y,2,2);
});
}

/* =========================
CORAZÓN 3D RELLENO
========================= */

function crearHeart(){
heart=[];
for(let t=0;t<Math.PI*2;t+=0.02){
for(let z=-80;z<80;z+=3){
let x=16*Math.pow(Math.sin(t),3);
let y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));
heart.push({x:x*10,y:y*10,z});
}
}
}

function drawHeart(){
let time=Date.now()*0.001;
ctx.fillStyle="rgba(0,200,255,0.9)";
heart.forEach(p=>{
let rx=p.x*Math.cos(time)-p.z*Math.sin(time);
let rz=p.x*Math.sin(time)+p.z*Math.cos(time);
let scale=400/(400+rz);
ctx.fillRect(
sceneCanvas.width/2+rx*scale,
sceneCanvas.height/2+p.y*scale,
2,2
);
});
}



