/* =====================================================
   1. MATRIX "Fatum Amantis" VERTICAL
===================================================== */
const matrixCanvas = document.getElementById("matrixCanvas");
const mtx = matrixCanvas.getContext("2d");

matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;

const letters = "FATUM AMANTIS";
const fontSize = 16;
const columns = Math.floor(matrixCanvas.width / fontSize);
let drops = [];

for(let i=0;i<columns;i++) drops[i]=Math.random()*matrixCanvas.height;

function drawMatrix(){
    mtx.fillStyle = "rgba(0,0,0,0.08)";
    mtx.fillRect(0,0,matrixCanvas.width,matrixCanvas.height);

    mtx.fillStyle = "#ff3366";
    mtx.font = fontSize+"px monospace";

    for(let i=0;i<drops.length;i++){
        const char = letters[Math.floor(Math.random()*letters.length)];
        mtx.fillText(char,i*fontSize,drops[i]);
        drops[i]+=fontSize*0.5;

        if(drops[i]>matrixCanvas.height && Math.random()>0.97)
            drops[i]=0;
    }
}
setInterval(drawMatrix,50);

/* =====================================================
   2. INICIAR
===================================================== */
document.getElementById("startBox").onclick = ()=>{
    document.getElementById("startScreen").style.display="none";
    document.getElementById("scene").classList.remove("hidden");
    startMainScene();
};

/* =====================================================
   3. ESCENA PRINCIPAL
===================================================== */
function startMainScene(){

const treeCanvas = document.getElementById("treeCanvas");
const ctx = treeCanvas.getContext("2d");

const snowCanvas = document.getElementById("snowCanvas");
const snowCtx = snowCanvas.getContext("2d");

treeCanvas.width = snowCanvas.width = window.innerWidth;
treeCanvas.height = snowCanvas.height = window.innerHeight;

let W = treeCanvas.width;
let H = treeCanvas.height;

/* ---------- Árbol frondoso ---------- */
function branch(x,y,len,angle,depth){
    if(depth===0) return;

    const x2 = x + len*Math.cos(angle);
    const y2 = y - len*Math.sin(angle);

    ctx.strokeStyle="#3b2314";
    ctx.lineWidth = depth/1.8;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x2,y2);
    ctx.stroke();

    // muchos pétalos
    if(depth<4){
        for(let i=0;i<6;i++){
            ctx.fillStyle="rgba(255,150,180,0.9)";
            ctx.beginPath();
            ctx.arc(x2+Math.random()*6-3,y2+Math.random()*6-3,2,0,Math.PI*2);
            ctx.fill();
        }
    }

    branch(x2,y2,len*0.75,angle+0.35,depth-1);
    branch(x2,y2,len*0.75,angle-0.35,depth-1);
}

branch(W/2,H,200,Math.PI/2,10); // más alto y frondoso

/* ---------- Nieve ---------- */
let snow=[];
for(let i=0;i<150;i++){
    snow.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2+1});
}

function snowAnim(){
    snowCtx.clearRect(0,0,W,H);
    snowCtx.fillStyle="white";
    snow.forEach(s=>{
        s.y+=0.7;
        if(s.y>H) s.y=0;
        snowCtx.beginPath();
        snowCtx.arc(s.x,s.y,s.r,0,Math.PI*2);
        snowCtx.fill();
    });
    requestAnimationFrame(snowAnim);
}
snowAnim();

/* ---------- Poemas ---------- */
const poemLeft = document.getElementById("poemLeft");
const poemRight = document.getElementById("poemRight");

const text1 = `
Desde el instante en que llegaste,
mi mundo cambió de dirección.
Las horas comenzaron a tener sentido,
y el silencio dejó de ser vacío.

En tu mirada encontré un hogar,
en tu voz, la calma del alma.
Y desde entonces cada día
es una promesa de eternidad.
`;

const text2 = `
Si el destino escribió tu nombre en mi vida,
fue porque sabía que eras mi paz.
No busco un final para esta historia,
porque amarte es un comienzo eterno.

Y si el tiempo algún día se detiene,
que nos encuentre así:
mirándonos,
eligiéndonos,
amándonos.
`;

function showPoem(el,text,delay){
    setTimeout(()=>{
        el.innerText=text;
        el.style.opacity=1;
    },delay);
}

showPoem(poemLeft,text1,3000);
showPoem(poemRight,text2,9000);

/* ---------- Contador ---------- */
let time={d:30,h:10,m:5,s:39};
const counter=document.getElementById("counter");
let fast=false;

function update(){
    if(!fast){
        time.s--;
        if(time.s<0){time.s=59;time.m--;}
        if(time.m<0){time.m=59;time.h--;}
        if(time.h<0){time.h=23;time.d--;}
    }else{
        time.s-=5;
        if(time.s<=0){time.s=0;time.m-=2;}
        if(time.m<=0){time.m=0;time.h--;}
        if(time.h<=0){time.h=0;time.d--;}
        if(time.d<=0){time.d=0;disintegrate();}
    }

    counter.innerText =
    `${time.d} días ${time.h} horas ${time.m} minutos ${time.s} segundos`;

    if(time.d<2) counter.style.color="red";
}
setInterval(update,1000);

setTimeout(()=>{ fast=true; },12000);

/* =====================================================
   4. DESINTEGRACIÓN SUAVE
===================================================== */
function disintegrate(){
    const scene = document.getElementById("scene");
    scene.classList.add("fadeOut");

    setTimeout(()=>{
        scene.innerHTML="";
        createParticles();
    },5000);
}

/* Partículas flotantes */
function createParticles(){
    const canvas=document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    const c=canvas.getContext("2d");

    let particles=[];
    for(let i=0;i<300;i++){
        particles.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,
            vx:(Math.random()-0.5),
            vy:(Math.random()-0.5),
            r:Math.random()*2+1
        });
    }

    function anim(){
        c.clearRect(0,0,canvas.width,canvas.height);
        c.fillStyle="white";
        particles.forEach(p=>{
            p.x+=p.vx;
            p.y+=p.vy;
            c.beginPath();
            c.arc(p.x,p.y,p.r,0,Math.PI*2);
            c.fill();
        });
        requestAnimationFrame(anim);
    }
    anim();
}

}

