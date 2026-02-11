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

/* ================= MATRIX FATUM ================= */

const text = "Fatum Amantis";
const cols = Math.floor(matrixCanvas.width/18);
let drops = Array(cols).fill(0);

function drawMatrix(){
mCtx.fillStyle="rgba(0,0,0,0.08)";
mCtx.fillRect(0,0,matrixCanvas.width,matrixCanvas.height);
mCtx.fillStyle="#ff4d6d";
mCtx.font="14px monospace";

for(let i=0;i<drops.length;i++){
let char=text[Math.floor(Math.random()*text.length)];
mCtx.fillText(char,i*18,drops[i]*18);
if(drops[i]*18>matrixCanvas.height && Math.random()>0.97) drops[i]=0;
drops[i]++;
}
}
setInterval(drawMatrix,90);

/* ================= TRANSICION ================= */

let phase="idle";
let spiralParticles=[];
let dropY=0;

function iniciar(){
document.getElementById("screenInicio").classList.remove("active");
document.getElementById("screenScene").classList.add("active");

for(let i=0;i<2000;i++){
spiralParticles.push({
angle:Math.random()*Math.PI*2,
radius:Math.random()*sceneCanvas.width,
});
}
phase="spiral";
animar();
}

/* ================= ESCENA ================= */

let waves=[];
let treeProgress=0;
let snow=[];
let ocean=[];
let heart=[];
let timeTotal = 30*86400 + 10*3600 + 5*60 + 39;

for(let i=0;i<300;i++){
snow.push({x:Math.random()*sceneCanvas.width,y:Math.random()*sceneCanvas.height,s:Math.random()*2});
}

function animar(){
ctx.clearRect(0,0,sceneCanvas.width,sceneCanvas.height);

if(phase==="spiral"){
ctx.fillStyle="rgba(255,0,60,0.5)";
spiralParticles.forEach(p=>{
p.radius*=0.96;
p.angle+=0.2;
let x=sceneCanvas.width/2 + Math.cos(p.angle)*p.radius;
let y=sceneCanvas.height/2 + Math.sin(p.angle)*p.radius;
ctx.fillRect(x,y,2,2);
});
if(spiralParticles[0].radius<2){
phase="drop";
}
}

else if(phase==="drop"){
dropY+=4;
ctx.fillStyle="red";
ctx.beginPath();
ctx.moveTo(sceneCanvas.width/2,dropY);
ctx.arc(sceneCanvas.width/2,dropY,6,0,Math.PI*2);
ctx.fill();

if(dropY>sceneCanvas.height-60){
for(let i=0;i<6;i++) waves.push({r:0});
phase="wave";
}
}

else if(phase==="wave"){
waves.forEach(w=>{
ctx.strokeStyle="rgba(0,150,255,0.5)";
ctx.beginPath();
ctx.arc(sceneCanvas.width/2,sceneCanvas.height-60,w.r,0,Math.PI*2);
ctx.stroke();
w.r+=3;
});
if(waves[0].r>220) phase="tree";
}

else if(phase==="tree"){
treeProgress+=0.003;
drawTree(sceneCanvas.width/2,sceneCanvas.height-60,-90,160*treeProgress);
drawSnow();

if(treeProgress>=1){
mostrarPoemas();
phase="poems";
}
}

else if(phase==="ocean"){
drawOcean();
}

else if(phase==="heart"){
drawHeart();
}

requestAnimationFrame(animar);
}

/* ================= ARBOL PIXEL ================= */

function drawTree(x,y,angle,length){
if(length<4) return;

let x2=x+Math.cos(angle*Math.PI/180)*length;
let y2=y+Math.sin(angle*Math.PI/180)*length;

ctx.strokeStyle="#5b3a29";
ctx.lineWidth=2;
ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x2,y2);
ctx.stroke();

drawTree(x2,y2,angle-18,length*0.72);
drawTree(x2,y2,angle+18,length*0.72);

if(length<12){
ctx.fillStyle="#ff8fab";
ctx.fillRect(x2,y2,2,2);
}
}

/* ================= NIEVE ================= */

function drawSnow(){
ctx.fillStyle="white";
snow.forEach(s=>{
ctx.fillRect(s.x,s.y,s.s,s.s);
s.y+=1;
if(s.y>sceneCanvas.height) s.y=0;
});
}

/* ================= POEMAS ================= */

const poema1=`Eres el instante donde el tiempo descansa,
la calma dentro de mi universo inquieto,
el latido que aprendió mi alma
antes incluso de conocerte.

Si el destino tiene un nombre,
si el amor tiene un hogar,
entonces todo camino que existe
siempre me llevará a ti.`;

const poema2=`Y si el mundo se apagara mañana,
si las estrellas olvidaran brillar,
mi corazón seguiría iluminado
porque aprendió a vivir en tu mirada.

No importa el tiempo,
no importa la distancia,
mi amor por ti
ya eligió ser eterno.`;

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

/* ================= CONTADOR ================= */

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

function iniciarCuentaFinal(){
let fast=setInterval(()=>{
timeTotal-=400;
if(timeTotal<=0){
timeTotal=0;
clearInterval(fast);
crearOcean();
phase="ocean";
setTimeout(()=>{
crearHeart();
phase="heart";
},10000);
}
},30);
}

/* ================= OCEANO ================= */

function crearOcean(){
for(let i=0;i<3000;i++){
ocean.push({
x:Math.random()*sceneCanvas.width,
y:sceneCanvas.height/2+Math.random()*200
});
}
}

function drawOcean(){
ctx.fillStyle="rgba(0,180,255,0.7)";
ocean.forEach(p=>{
p.y+=Math.sin(Date.now()*0.002+p.x)*0.6;
ctx.fillRect(p.x,p.y,2,2);
});
}

/* ================= CORAZON 3D ================= */

function crearHeart(){
for(let t=0;t<Math.PI*2;t+=0.02){
for(let z=-80;z<80;z+=4){
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
ctx.fillRect(sceneCanvas.width/2+rx*scale,sceneCanvas.height/2+p.y*scale,2,2);
});
}



