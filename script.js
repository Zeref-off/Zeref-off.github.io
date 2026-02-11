/* =====================================================
CONFIGURACIÓN GENERAL
===================================================== */
const W = window.innerWidth;
const H = window.innerHeight;

/* =====================================================
MATRIX INICIAL (Fatum Amantis vertical)
===================================================== */
const matrixCanvas = document.getElementById("matrixCanvas");
const mtx = matrixCanvas.getContext("2d");
matrixCanvas.width = W;
matrixCanvas.height = H;

const letters = "FATUMAMANTIS";
const size = 34;
const columns = Math.floor(W / size);
const drops = Array(columns).fill(0);

function matrix(){
mtx.fillStyle = "rgba(0,0,0,0.08)";
mtx.fillRect(0,0,W,H);

```
mtx.fillStyle = "#ff4d6d";
mtx.font = size + "px monospace";

for(let i=0;i<columns;i++){
    const letter = letters[Math.floor(Math.random()*letters.length)];
    mtx.fillText(letter, i*size, drops[i]*size);

    if(drops[i]*size > H && Math.random()>0.975){
        drops[i] = 0;
    }
    drops[i]++;
}
```

}

setInterval(matrix, 50);

/* =====================================================
CAMBIO A ESCENA
===================================================== */
document.getElementById("btnInicio").onclick = ()=>{
document.getElementById("inicio").classList.add("hidden");
document.getElementById("escena").classList.remove("hidden");
fase = "espiral";
};

/* =====================================================
CANVAS PRINCIPAL
===================================================== */
const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");
canvas.width = W;
canvas.height = H;

let fase = "inicio";
let particles = [];
let ramas = [];
let gota = null;
let ondas = [];

/* =====================================================
ESPIRAL DE ABSORCIÓN
===================================================== */
function espiral(){
for(let i=0;i<40;i++){
particles.push({
angle:Math.random()*Math.PI*2,
radius:Math.random()*Math.max(W,H)
});
}

```
particles.forEach(p=>{
    p.angle += 0.06;
    p.radius *= 0.95;
    const x = W/2 + Math.cos(p.angle)*p.radius;
    const y = H/2 + Math.sin(p.angle)*p.radius;
    ctx.fillStyle="white";
    ctx.fillRect(x,y,2,2);
});

if(particles.length>1800){
    particles=[];
    fase="gota";
    gota={x:W/2,y:0,vy:2};
}
```

}

/* =====================================================
GOTA ROJA
===================================================== */
function dibujarGota(){
gota.y += gota.vy;
gota.vy += 0.05;

```
ctx.fillStyle="red";
ctx.beginPath();
ctx.arc(gota.x, gota.y, 6, 0, Math.PI*2);
ctx.fill();

if(gota.y > H*0.8){
    fase="onda";
    ondas.push({r:10});
}
```

}

/* =====================================================
ONDAS
===================================================== */
function dibujarOndas(){
ondas.forEach(o=>{
ctx.strokeStyle="rgba(0,0,0,0.7)";
ctx.beginPath();
ctx.arc(W/2,H*0.8,o.r,0,Math.PI*2);
ctx.stroke();
o.r+=3;
});

```
if(ondas[0].r>120){
    fase="arbol";
    ramas.push({x:W/2,y:H*0.8,angle:-Math.PI/2,len:160,depth:11});
}
```

}

/* =====================================================
ARBOL FRONDOSO (tronco grueso)
===================================================== */
function crecerArbol(){
ctx.strokeStyle="#5a341f";
ctx.lineWidth=18;

```
let nuevas=[];
ramas.forEach(r=>{
    const x2=r.x+Math.cos(r.angle)*r.len;
    const y2=r.y+Math.sin(r.angle)*r.len;

    ctx.beginPath();
    ctx.moveTo(r.x,r.y);
    ctx.lineTo(x2,y2);
    ctx.stroke();

    if(r.depth>0){
        nuevas.push({x:x2,y:y2,angle:r.angle+0.28,len:r.len*0.75,depth:r.depth-1});
        nuevas.push({x:x2,y:y2,angle:r.angle-0.28,len:r.len*0.75,depth:r.depth-1});
    }else{
        for(let i=0;i<10;i++){
            particles.push({
                x:x2+Math.random()*20-10,
                y:y2+Math.random()*20-10,
                vy:Math.random()*0.3,
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

/* =====================================================
NIEVE
===================================================== */
function nieve(){
particles.push({
x:Math.random()*W,
y:0,
vy:Math.random()*1+0.5,
type:"nieve"
});
}

/* =====================================================
POEMAS
===================================================== */
const poema1 = `Eres el destino que llegó sin aviso,
la calma en medio del ruido del mundo,
el instante donde el tiempo decide quedarse.

Si la eternidad tuviera un rostro,
sería tu mirada encontrando la mía.`;

const poema2 = `Si el universo volviera a comenzar,
volvería a buscarte entre millones de estrellas.

Porque lo nuestro no es coincidencia,
es destino…
Fatum Amantis.`;

function mostrarPoemaIzq(){
const p=document.getElementById("poemaIzq");
p.innerText=poema1;
p.classList.add("visible");

```
setTimeout(()=>{
    p.classList.remove("visible");
    setTimeout(mostrarPoemaDer,4000);
},9000);
```

}

function mostrarPoemaDer(){
const p=document.getElementById("poemaDer");
p.innerText=poema2;
p.classList.add("visible");

```
setTimeout(()=>{
    p.classList.remove("visible");
    cuentaRapida();
},9000);
```

}

/* =====================================================
CONTADOR
===================================================== */
let tiempo = 30*86400 + 10*3600 + 5*60 + 39;
const contador = document.getElementById("tiempo");

function iniciarContador(){
setInterval(actualizarTiempo,1000);
}

function cuentaRapida(){
const fast=setInterval(()=>{
tiempo-=400;
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

/* =====================================================
OCEANO DE PARTICULAS
===================================================== */
function crearOceano(){
particles=[];
for(let i=0;i<3500;i++){
particles.push({
x:Math.random()*W,
y:H*0.6+Math.random()*H*0.4,
color:Math.random()>0.5?"#4fc3f7":"#ffffff",
type:"agua"
});
}

```
setTimeout(formarCorazon,10000);
```

}

/* =====================================================
CORAZON 3D
===================================================== */
function formarCorazon(){
fase="corazon";

```
particles.forEach((p,i)=>{
    let t=(i/particles.length)*Math.PI*2;
    let x=16*Math.pow(Math.sin(t),3);
    let y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));

    p.tx=W/2+x*15;
    p.ty=H/2+y*15;
    p.z=Math.random()*200;
});
```

}

/* =====================================================
LOOP PRINCIPAL
===================================================== */
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

