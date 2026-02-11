window.addEventListener("DOMContentLoaded", function(){

/* ===== MATRIX ===== */
const matrix = document.getElementById("matrix");
const startBox = document.getElementById("startBox");
const intro = document.getElementById("intro");
const scene = document.getElementById("scene");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const poemLeft = document.getElementById("poemLeft");
const poemRight = document.getElementById("poemRight");
const counter = document.getElementById("counter");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* Texto Matrix */
const text = "FATUMAMANTIS";

for(let i=0;i<12;i++){
    let col = document.createElement("div");
    col.className="column";
    col.style.animationDuration = (8 + Math.random()*6)+"s";

    for(let j=0;j<20;j++){
        let span=document.createElement("span");
        span.textContent=text[Math.floor(Math.random()*text.length)];
        col.appendChild(span);
    }
    matrix.appendChild(col);
}

/* ===== BOTÓN ===== */
startBox.onclick = ()=>{
    intro.style.display="none";
    scene.classList.remove("hidden");

    growTree();
};

/* ===== ÁRBOL PIXEL ===== */
function growTree(){
    let branches = [];

    function branch(x,y,len,angle,width){
        if(len<6){
            ctx.fillStyle="pink";
            ctx.fillRect(x,y,3,3);
            return;
        }

        ctx.strokeStyle="#5a3b1a";
        ctx.lineWidth=width;
        ctx.beginPath();
        ctx.moveTo(x,y);

        let x2 = x + len*Math.cos(angle);
        let y2 = y - len*Math.sin(angle);

        ctx.lineTo(x2,y2);
        ctx.stroke();

        branch(x2,y2,len*0.72,angle-0.3,width*0.7);
        branch(x2,y2,len*0.72,angle+0.3,width*0.7);
    }

    branch(canvas.width/2, canvas.height, 180, Math.PI/2, 26);

    setTimeout(showLeftPoem,1500);
}

/* ===== POEMAS ===== */
poemLeft.innerText =
"En el silencio del tiempo te encontré,\ncomo un susurro eterno del destino.\nDesde entonces cada instante tiene tu nombre,\ny cada latido camina contigo.";

poemRight.innerText =
"Si el universo volviera a empezar,\nte buscaría en cada vida, en cada historia.\nPorque amarte no es un momento,\nes la eternidad viviendo en mi memoria.";

function showLeftPoem(){
    poemLeft.classList.add("showPoem");

    setTimeout(()=>{
        poemLeft.classList.remove("showPoem");
        showRightPoem();
    },12000);
}

function showRightPoem(){
    poemRight.classList.add("showPoem");

    setTimeout(()=>{
        poemRight.classList.remove("showPoem");
        startCounter();
    },12000);
}

/* ===== CONTADOR ACELERADO ===== */
let totalSeconds = 30*86400 + 10*3600 + 5*60 + 39;

function startCounter(){
    let interval = setInterval(()=>{
        totalSeconds -= 200;

        if(totalSeconds<=0){
            totalSeconds=0;
            clearInterval(interval);
            disintegrateTree();
        }

        updateCounter();

    },40);
}

function updateCounter(){
    let s = totalSeconds;

    let d = Math.floor(s/86400);
    s%=86400;
    let h = Math.floor(s/3600);
    s%=3600;
    let m = Math.floor(s/60);
    let sec = s%60;

    counter.textContent = 
    d+" días "+h+" horas "+m+" minutos "+sec+" segundos";

    if(d<5) counter.style.color="red";
}

/* ===== DESINTEGRACIÓN A OCÉANO ===== */
let particles=[];

function disintegrateTree(){
    for(let i=0;i<1200;i++){
        particles.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,
            vx:(Math.random()-0.5)*2,
            vy:Math.random()*2,
            color:Math.random()>0.5?"#66ccff":"#ffffff"
        });
    }
    animateOcean();
}

function animateOcean(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
        p.x+=p.vx;
        p.y+=p.vy;

        if(p.y>canvas.height) p.y=canvas.height;

        ctx.fillStyle=p.color;
        ctx.fillRect(p.x,p.y,2,2);
    });

    requestAnimationFrame(animateOcean);
}

});


