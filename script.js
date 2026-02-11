const inicio = document.getElementById("inicio");
const escena = document.getElementById("escena");
const btnInicio = document.getElementById("btnInicio");

const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let width = canvas.width;
let height = canvas.height;

/* =====================
MATRIX INICIO
===================== */
const matrixCanvas = document.getElementById("matrixCanvas");
const mtx = matrixCanvas.getContext("2d");
matrixCanvas.width = width;
matrixCanvas.height = height;

let letters = "FATUMAMANTIS";
letters = letters.split("");

let fontSize = 22;
let columns = width / fontSize;
let drops = [];

for(let i=0;i<columns;i++) drops[i]=1;

function drawMatrix(){
mtx.fillStyle="rgba(0,0,0,0.05)";
mtx.fillRect(0,0,width,height);
mtx.fillStyle="#ff4d4d";
mtx.font = fontSize+"px monospace";

```
for(let i=0;i<drops.length;i++){
    let text = letters[Math.floor(Math.random()*letters.length)];
    mtx.fillText(text,i*fontSize,drops[i]*fontSize);

    if(drops[i]*fontSize>height && Math.random()>0.95)
        drops[i]=0;

    drops[i]++;
}
```

}
setInterval(drawMatrix,40);

/* =====================
INICIO
===================== */
btnInicio.onclick=()=>{
inicio.classList.add("hidden");
escena.classList.remove("hidden");
iniciarHistoria();
};

/* =====================
VARIABLES
===================== */
let particles=[];
let modo="arbol";
let tiempoRestante=30*86400+10*3600+5*60+39;
let contador=document.getElementById("tiempo");

let poema1 = `Eres el susurro del destino,
la calma en mi universo,
la razón por la que el tiempo
aprendió a detenerse en tu nombre.`;

let poema2 = `Si el mundo terminara hoy,
mis recuerdos serían tu sonrisa,
y en cada latido quedaría escrito:
Fatum Amantis.`;

/* =====================
HISTORIA
===================== */
function iniciarHistoria(){
crecerArbol();
setTimeout(mostrarPoemaIzq,6000);
}

/* =====================
ARBOL PIXELART
===================== */
let ramas=[];

function crecerArbol(){
ramas.push({x:width/2,y:height,angle:-Math.PI/2,len:120,depth:10});
}

function dibujarArbol(){
ctx.strokeStyle="#8B4513";
ctx.lineWidth=14;

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
        nuevas.push({x:x2,y:y2,angle:r.angle+0.3,len:r.len*0.7,depth:r.depth-1});
        nuevas.push({x:x2,y:y2,angle:r.angle-0.3,len:r.len*0.7,depth:r.depth-1});
    }else{
        for(let i=0;i<5;i++){
            particles.push({
                x:x2+Math.random()*10,
                y:y2+Math.random()*10,
                color:"#ff9ecb",
                type:"hoja"
            });
        }
    }
});
ramas=nuevas;
```

}

/* =====================
NIEVE
===================== */
function nieve(){
particles.push({
x:Math.random()*width,
y:0,
vy:Math.random()*1+0.5,
color:"#ffffff",
type:"nieve"
});
}

/* =====================
POEMAS
===================== */
function mostrarPoemaIzq(){
let p=document.getElementById("poemaIzq");
p.innerText=poema1;
p.classList.add("visible");

```
setTimeout(()=>{
    p.classList.remove("visible");
    setTimeout(mostrarPoemaDer,4000);
},8000);
```

}

function mostrarPoemaDer(){
let p=document.getElementById("poemaDer");
p.innerText=poema2;
p.classList.add("visible");

```
setTimeout(()=>{
    p.classList.remove("visible");
    iniciarCuentaRapida();
},8000);
```

}

/* =====================
CONTADOR RAPIDO
===================== */
function iniciarCuentaRapida(){
let int=setInterval(()=>{
tiempoRestante-=500;
if(tiempoRestante<=0){
tiempoRestante=0;
clearInterval(int);
iniciarOceano();
}
actualizarContador();
},30);
}

function actualizarContador(){
let d=Math.floor(tiempoRestante/86400);
let h=Math.floor((tiempoRestante%86400)/3600);
let m=Math.floor((tiempoRestante%3600)/60);
let s=tiempoRestante%60;
contador.innerText=`${d}d ${h}h ${m}m ${s}s`;
}

/* =====================
OCEANO
===================== */
function iniciarOceano(){
modo="oceano";
for(let i=0;i<3000;i++){
particles.push({
x:Math.random()*width,
y:Math.random()*height,
vy:Math.random()*2,
color:Math.random()>0.5?"#4fc3f7":"#ffffff",
type:"agua"
});
}

```
setTimeout(formarCorazon,10000);
```

}

/* =====================
CORAZON 3D
===================== */
function formarCorazon(){
modo="corazon";
particles.forEach((p,i)=>{
let t=(i/particles.length)*Math.PI*2;
let x=16*Math.pow(Math.sin(t),3);
let y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));

```
    p.tx=width/2+x*12;
    p.ty=height/2+y*12;
    p.z=Math.random()*200;
});
```

}

/* =====================
ANIMACION
===================== */
function animar(){
ctx.clearRect(0,0,width,height);

```
if(modo==="arbol"){
    dibujarArbol();
    nieve();
}

particles.forEach(p=>{
    if(p.type==="nieve") p.y+=p.vy;

    if(modo==="oceano"){
        p.y+=Math.sin(Date.now()*0.002+p.x*0.01);
    }

    if(modo==="corazon"){
        p.x+=(p.tx-p.x)*0.03;
        p.y+=(p.ty-p.y)*0.03;

        let angle=Date.now()*0.001;
        let dx=p.x-width/2;
        let dz=p.z;

        let rx=dx*Math.cos(angle)-dz*Math.sin(angle);
        let rz=dx*Math.sin(angle)+dz*Math.cos(angle);

        let scale=300/(300+rz);

        ctx.fillStyle=p.color;
        ctx.fillRect(width/2+rx*scale,p.y,2*scale,2*scale);
        return;
    }

    ctx.fillStyle=p.color;
    ctx.fillRect(p.x,p.y,2,2);
});

requestAnimationFrame(animar);
```

}
animar();


