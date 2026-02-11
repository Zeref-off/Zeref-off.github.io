/* =====================================================
   MATRIX SINCRONIZADO → LUEGO EFECTO MATRIX
===================================================== */

const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const text = "FATUM AMANTIS";
const size = 16;
const cols = Math.floor(canvas.width/size);

let drops = new Array(cols).fill(0);
let syncPhase = true;

function matrix(){
    ctx.fillStyle="rgba(0,0,0,0.08)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#ff3366";
    ctx.font=size+"px monospace";

    for(let i=0;i<drops.length;i++){
        const char = text[Math.floor(Math.random()*text.length)];
        ctx.fillText(char,i*size,drops[i]);

        if(syncPhase){
            drops[i]+=size;
        }else{
            drops[i]+=size*(Math.random()*0.5+0.5);
        }

        if(drops[i]>canvas.height){
            if(syncPhase){
                syncPhase=false; // al llegar al fondo inicia modo Matrix
            }
            if(Math.random()>0.975) drops[i]=0;
        }
    }
}

setInterval(matrix,50);

/* =====================================================
   INICIAR
===================================================== */

document.getElementById("startBox").onclick = ()=>{
    document.getElementById("startScreen").style.display="none";
    document.getElementById("scene").classList.remove("hidden");
    startScene();
};

/* =====================================================
   ESCENA PRINCIPAL
===================================================== */

function startScene(){

const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let W = canvas.width;
let H = canvas.height;

/* ---------- GOTA ---------- */

let dropY = -50;

function animateDrop(){
    ctx.clearRect(0,0,W,H);

    ctx.fillStyle="red";
    ctx.beginPath();
    ctx.arc(W/2,dropY,10,0,Math.PI*2);
    ctx.fill();

    dropY += 4;

    if(dropY < H-40){
        requestAnimationFrame(animateDrop);
    }else{
        ripple();
    }
}

animateDrop();

/* ---------- ONDAS ---------- */

let rippleRadius = 0;

function ripple(){
    function anim(){
        ctx.clearRect(0,0,W,H);

        ctx.strokeStyle="rgba(255,0,0,"+(1-rippleRadius/100)+")";
        ctx.beginPath();
        ctx.arc(W/2,H-30,rippleRadius,0,Math.PI*2);
        ctx.stroke();

        rippleRadius+=2;

        if(rippleRadius<100){
            requestAnimationFrame(anim);
        }else{
            growTree();
        }
    }
    anim();
}

/* ---------- ÁRBOL CRECIENDO ---------- */

let growth = 0;

function branch(x,y,len,angle,depth){
    if(depth===0 || len<2) return;

    const x2 = x + len*Math.cos(angle);
    const y2 = y - len*Math.sin(angle);

    ctx.strokeStyle="#3b2314";
    ctx.lineWidth=depth/2;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x2,y2);
    ctx.stroke();

    // hojas
    if(depth<3){
        ctx.fillStyle="pink";
        ctx.beginPath();
        ctx.arc(x2,y2,2,0,Math.PI*2);
        ctx.fill();
    }

    branch(x2,y2,len*0.7,angle+0.35,depth-1);
    branch(x2,y2,len*0.7,angle-0.35,depth-1);
}

function growTree(){
    function anim(){
        ctx.clearRect(0,0,W,H);
        branch(W/2,H, growth, Math.PI/2, 8);
        growth += 2;

        if(growth < 160){
            requestAnimationFrame(anim);
        }else{
            afterTree();
        }
    }
    anim();
}

/* =====================================================
   DESPUÉS DEL ÁRBOL
===================================================== */

function afterTree(){
    document.getElementById("counterBox").classList.remove("hidden");
    showPoemLeft();
}

/* ---------- POEMAS ---------- */

const poem1 = `
Eres el silencio que calma mis días,
la luz que despierta mi alma.
Desde que llegaste,
el tiempo aprendió a sonreír.
`;

const poem2 = `
Si el destino me dio una razón,
esa razón eres tú.
Porque amarte no es un momento,
es mi eternidad.
`;

function scrollPoem(element,text,callback){
    element.innerText=text;
    element.style.opacity=1;
    let pos = 50;

    function anim(){
        pos -= 0.2;
        element.style.transform=`translateY(${pos}%)`;

        if(pos > -150){
            requestAnimationFrame(anim);
        }else{
            element.style.opacity=0;
            if(callback) callback();
        }
    }
    anim();
}

function showPoemLeft(){
    scrollPoem(document.getElementById("poemLeft"),poem1,showPoemRight);
}

function showPoemRight(){
    scrollPoem(document.getElementById("poemRight"),poem2,startBomb);
}

/* =====================================================
   CONTADOR BOMBA
===================================================== */

let time={d:30,h:10,m:5,s:39};
let fast=false;

const counter = document.getElementById("counter");

function update(){
    if(!fast){
        time.s--;
        if(time.s<0){time.s=59;time.m--;}
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

function startBomb(){
    fast=true;
}

/* =====================================================
   DESINTEGRACIÓN SUAVE
===================================================== */

function disintegrate(){

    const particles=[];
    for(let i=0;i<400;i++){
        particles.push({
            x:Math.random()*W,
            y:Math.random()*H,
            vx:(Math.random()-0.5)*0.5,
            vy:(Math.random()-0.5)*0.5,
            r:Math.random()*2
        });
    }

    function anim(){
        ctx.clearRect(0,0,W,H);
        ctx.fillStyle="rgba(255,255,255,0.7)";

        particles.forEach(p=>{
            p.x+=p.vx;
            p.y+=p.vy;
            ctx.beginPath();
            ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
            ctx.fill();
        });

        requestAnimationFrame(anim);
    }

    anim();
}

}

