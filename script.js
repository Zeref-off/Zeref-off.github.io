/* ===========================
CONFIGURACIÓN GENERAL
=========================== */
const scene = document.getElementById("scene");
const ctx = scene.getContext("2d");
scene.width = window.innerWidth;
scene.height = window.innerHeight;
let W = scene.width;
let H = scene.height;

/* ===========================
MATRIX INICIAL (vertical grande)
=========================== */
const matrixCanvas = document.getElementById("matrixCanvas");
const mtx = matrixCanvas.getContext("2d");
matrixCanvas.width=W;
matrixCanvas.height=H;

let text="FATUMAMANTIS".split("");
let size=32;
let columns=Math.floor(W/size);
let drops=new Array(columns).fill(0);

function matrix(){
mtx.fillStyle="rgba(0,0,0,0.08)";
mtx.fillRect(0,0,W,H);

```
mtx.fillStyle="#ff4d4d";
mtx.font=size+"px monospace";

for(let i=0;i<columns;i++){
    let letter=text[Math.floor(Math.random()*text.length)];
    mtx.fillText(letter,i*size,drops[i]*size);

    if(drops[i]*size>H && Math.random()>0.97) drops[i]=0;
    drops[i]++;
}
```

}
setInterval(matrix,45);

/* ===========================
INICIO
=========================== */
document.getElementById("btnInicio").onclick=()=>{
document.getElementById("inicio").classList.add("hidden");
document.getElementById("escena").classList.remove("hidden");
fase="espiral";
};

/* ===========================
ESTADOS
=========================== */
let fase="inicio";
let particles=[];
let ramas=[];
let tiempo=30*86400+10*3600+5*60+39;
let contador=document.getElementById("tiempo");

/* ===========================
ESPIRAL ABSORCIÓN
=========================== */
function espiral(){
for(let i=0;i<50;i++){
particles.push({
x:Math.random()*W,
y:Math.random()*H,
angle:Math.random()*Math.PI*2,
radius:Math.random()*Math.max(W,H),
type:"espiral"
});
}

```
particles.forEach(p=>{
    p.angle+=0.05;
    p.radius*=0.96;
    p.x=W/2+Math.cos(p.angle)*p.radius;
    p.y=H/2+Math.sin(p.angle)*p.radius;
    ctx.fillStyle="white";
    ctx.fillRect(p.x,p.y,2,2);
});

if(particles.length>2000){
    particles=[];
    fase="gota";
    gota={x:W/2,y:0,vy:2};
}
```

}

/* ===========================
GOTA
=========================== */
let gota=null;

function dibujarGota(){
gota.y+=gota.vy;
gota.vy+=0.05;

```
ctx.fillStyle="red";
ctx.beginPath();
ctx.arc(gota.x,gota.y,6,0,Math.PI*2);
ctx.fill();

if(gota.y>H*0.8){
    fase="onda";
    ondas.push({r:10});
}
```

}

/* ===========================
ONDAS
=========================== */
let ondas=[];

function dibujarOndas(){
ondas.forEach(o=>{
ctx.strokeStyle="rgba(0,0,0,0.6)";
ctx.beginPath();
ctx.arc(W/2,H*0.8,o.r,0,Math.PI*2);
ctx.stroke();
o.r+=3;
});

```
if(ondas[0].r>120){
    fase="arbol";
    ramas.push({x:W/2,y:H*0.8,angle:-Math.PI/2,len:140,depth:11});
}
```

}

/* ===========================
ARBOL PIXELART FRONDOSO
=========================== */
function crecerArbol(){
ctx.strokeStyle="#6b3e26";
ctx.lineWidth=16;

```
let nuevas=[];
ramas.forEach(r=>{
    let x2=r.x+Math.cos(r.angle)*r.len;
    let y2=r.y+Math.sin(r.angle)*r.len;

    ctx.beginPath();
    ctx.moveTo(r.x,r.y);
    ctx.lineTo(x2,y2);
    ctx.stroke();

    if(r.depth>0){
        nuevas.push({x:x2,y:y2,angle:r.angle+0.25,len:r.len*0.75,depth:r.depth-1});
        nuevas.push({x:x2,y:y2,angle:r.angle-0.25,len:r.len*0.75,depth:r.depth-1});
    }else{
        for(let i=0;i<8;i++){
            particles.push({
                x:x2+Math.random()*20-10,
                y:y2+Math.random()*20-10,
                vy:Math.random()*0.5,
                type:"hoja"
            });
        }
    }
});
ramas=nuevas;

if(ramas.length===0){
    fase="nieve";
    mostrarPoemaIzq();
    iniciarContador();
}
```

}

/* ===========================
NIEVE
=========================== */
function nieve(){
particles.push({
x:Math.random()*W,
y:0,
vy:Math.random()*1+0.5,
type:"nieve"
});
}

/* ===========================
POEMAS
=========================== */
const poema1=`Eres el destino que no sabía que esperaba,
la calma después de cada tormenta,
la razón por la que el tiempo
decidió detenerse en tu nombre.

Si el universo tuviera memoria,
guardaría tu sonrisa como su mayor milagro.`;

const poema2=`Si todo desapareciera mañana,
aún existiría tu luz en mí.

Porque amarte no fue una casualidad,
fue el susurro del destino diciendo:
Fatum Amantis.`;

function mostrarPoemaIzq(){
let p=document.getElementById("poemaIzq");
p.innerText=poema1;
p.classList.add("visible");
setTimeout(()=>{
p.classList.remove("visible");
setTimeout(mostrarPoemaDer,5000);
},9000);
}

function mostrarPoemaDer(){
let p=document.getElementById("poemaDer");
p.innerText=poema2;
p.classList.add("visible");
setTimeout(()=>{
p.classList.remove("visible");
cuentaRapida();
},9000);
}

/* ===========================
CONTADOR
=========================== */
function iniciarContador(){
setInterval(()=>{
actualizarTiempo();
},1000);
}

function cuentaRapida(){
let fast=setInterval(()=>{
tiempo-=500;
if(tiempo<=0){
tiempo=0;
clearInterval(fast);
fase="oceano";
crearOceano();
}
actualizarTiempo();
},30);
}

function actualizarTiempo(){
let d=Math.floor(tiempo/86400);
let h=Math.floor((tiempo%86400)/3600);
let m=Math.floor((tiempo%3600)/60);
let s=tiempo%60;
contador.innerText=`${d}d ${h}h ${m}m ${s}s`;
}

/* ===========================
OCEANO DE PARTICULAS
=========================== */
function crearOceano(){
particles=[];
for(let i=0;i<4000;i++){
particles.push({
x:Math.random()*W,
y:H*0.6+Math.random()*H*0.4,
vy:Math.random()*2,
color:Math.random()>0.5?"#4fc3f7":"#ffffff",
type:"agua"
});
}

```
setTimeout(formarCorazon,10000);
```

}

/* ===========================
CORAZON 3D
=========================== */
function formarCorazon(){
fase="corazon";
particles.forEach((p,i)=>{
let t=(i/particles.length)*Math.PI*2;
let x=16*Math.pow(Math.sin(t),3);
let y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));

```
    p.tx=W/2+x*14;
    p.ty=H/2+y*14;
    p.z=Math.random()*200;
});
```

}

/* ===========================
ANIMACION
=========================== */
function animar(){
ctx.clearRect(0,0,W,H);

```
if(fase==="espiral") espiral();
if(fase==="gota") dibujarGota();
if(fase==="onda") dibujarOndas();
if(fase==="arbol") crecerArbol();
if(fase==="nieve") nieve();

particles.forEach(p=>{
    if(p.type==="nieve"||p.type==="hoja"){
        p.y+=p.vy;
        ctx.fillStyle=p.type==="hoja"?"#ff9ecb":"#ffffff";
        ctx.fillRect(p.x,p.y,2,2);
    }

    if(p.type==="agua"){
        p.y+=Math.sin(Date.now()*0.002+p.x*0.01);
        ctx.fillStyle=p.color;
        ctx.fillRect(p.x,p.y,2,2);
    }

    if(fase==="corazon"){
        p.x+=(p.tx-p.x)*0.04;
        p.y+=(p.ty-p.y)*0.04;

        let angle=Date.now()*0.001;
        let dx=p.x-W/2;
        let dz=p.z;

        let rx=dx*Math.cos(angle)-dz*Math.sin(angle);
        let rz=dx*Math.sin(angle)+dz*Math.cos(angle);

        let scale=300/(300+rz);
        ctx.fillStyle=p.color;
        ctx.fillRect(W/2+rx*scale,p.y,2*scale,2*scale);
    }
});

requestAnimationFrame(animar);
```

}
animar();


