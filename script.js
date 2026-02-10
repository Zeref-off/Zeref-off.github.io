/* ========= MATRIX TE AMO ========= */

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = ["T","E","A","M","O"];
const fontSize = 18;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);

function drawMatrix(){
    ctx.fillStyle="rgba(0,0,0,0.07)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#ff4d7a";
    ctx.font=fontSize+"px monospace";

    for(let i=0;i<drops.length;i++){
        const text = letters[Math.floor(Math.random()*letters.length)];
        ctx.fillText(text, i*fontSize, drops[i]*fontSize);

        if(drops[i]*fontSize > canvas.height && Math.random()>0.97){
            drops[i]=0;
        }
        drops[i]+=0.6;
    }
}

let matrixInterval = setInterval(drawMatrix,30);


/* ========= INICIO ========= */

const startBox = document.getElementById("startBox");
const singularity = document.getElementById("singularity");
const music = document.getElementById("music");

startBox.onclick = ()=>{
    startBox.style.display="none";
    music.volume = 0.5;
    music.play().catch(()=>{});

    clearInterval(matrixInterval);

    let scale=1;
    let rotate=0;

    const spiral=setInterval(()=>{
        scale-=0.02;
        rotate+=12;
        canvas.style.transform=`scale(${scale}) rotate(${rotate}deg)`;

        if(scale<=0.05){
            clearInterval(spiral);
            canvas.style.display="none";
            createDrop();
        }
    },30);
};


/* ========= GOTA ========= */

function createDrop(){
    singularity.style.display="block";
    singularity.style.transition="all 2s ease";
    singularity.style.width="12px";
    singularity.style.height="18px";
    singularity.style.borderRadius="50% 50% 60% 60%";
    singularity.style.top="80%";

    setTimeout(startWater,2000);
}


/* ========= AGUA CINEMÁTICA ========= */

const waterCanvas=document.getElementById("waterCanvas");
const wctx=waterCanvas.getContext("2d");

waterCanvas.width=window.innerWidth;
waterCanvas.height=window.innerHeight*0.4;

let ripples=[];

function startWater(){
    waterCanvas.style.opacity=1;
    ripples.push({x:waterCanvas.width/2,y:50,r:10,alpha:1});
    animateWater();
    setTimeout(growTree,2000);
}

function animateWater(){
    wctx.clearRect(0,0,waterCanvas.width,waterCanvas.height);
    ripples.forEach(r=>{
        wctx.beginPath();
        wctx.arc(r.x,r.y,r.r,0,Math.PI*2);
        wctx.strokeStyle=`rgba(255,80,120,${r.alpha})`;
        wctx.stroke();
        r.r+=2;
        r.alpha-=0.01;
    });
    ripples=ripples.filter(r=>r.alpha>0);
    requestAnimationFrame(animateWater);
}


/* ========= ÁRBOL SAKURA ========= */

const treeCanvas=document.getElementById("treeCanvas");
const tctx=treeCanvas.getContext("2d");
treeCanvas.width=window.innerWidth;
treeCanvas.height=window.innerHeight;

function drawBranch(x,y,len,angle,depth){
    if(depth===0) return;

    const x2=x+Math.cos(angle)*len;
    const y2=y-Math.sin(angle)*len;

    tctx.beginPath();
    tctx.moveTo(x,y);
    tctx.lineTo(x2,y2);
    tctx.strokeStyle="#4a2c2c";
    tctx.lineWidth=depth;
    tctx.stroke();

    setTimeout(()=>{
        drawBranch(x2,y2,len*0.75,angle-0.4,depth-1);
        drawBranch(x2,y2,len*0.75,angle+0.4,depth-1);
        if(depth<3) createPetal(x2,y2);
    },300);
}

function growTree(){
    drawBranch(treeCanvas.width/2,treeCanvas.height*0.8,120,Math.PI/2,10);
    setTimeout(startPetalFall,4000);
    setTimeout(showPoemLeft,5000);
}


/* ========= PÉTALOS CON VIENTO ========= */

let petals=[];

function createPetal(x,y){
    petals.push({x,y,vy:1,vx:Math.random()*2-1});
}

function startPetalFall(){
    setInterval(()=>{
        petals.forEach(p=>{
            p.y+=p.vy;
            p.x+=Math.sin(Date.now()/500)*0.5;
            tctx.fillStyle="pink";
            tctx.fillRect(p.x,p.y,4,4);
        });
    },30);
}


/* ========= POEMAS ========= */

const poem1=`Desde el instante en que apareciste,
mi mundo cambió sin aviso...
(extendido romántico largo)
Porque amarte
se volvió mi forma favorita de existir.`;

const poem2=`Si el destino tuviera voz,
diría tu nombre...
(otro poema largo)
Y en cada vida,
volvería a encontrarte.`;

function typeText(el,text,callback){
    el.style.opacity=1;
    let i=0;
    const interval=setInterval(()=>{
        el.innerHTML+=text[i];
        i++;
        if(i>=text.length){
            clearInterval(interval);
            setTimeout(()=>{
                el.style.opacity=0;
                el.innerHTML="";
                callback();
            },4000);
        }
    },30);
}

function showPoemLeft(){
    typeText(document.getElementById("poemLeft"),poem1,showPoemRight);
}

function showPoemRight(){
    typeText(document.getElementById("poemRight"),poem2,startCounter);
}


/* ========= CONTADOR ========= */

let d=30,h=14,m=5,s=10;
const timeEl=document.getElementById("time");
const counter=document.getElementById("counter");

function update(){
    s--;
    if(s<0){s=59;m--;}
    if(m<0){m=59;h--;}
    if(h<0){h=23;d--;}
    if(d<0){d=0;}
    timeEl.textContent=`${d} días ${h} horas ${m} minutos ${s} segundos`;
}
setInterval(update,1000);

function startCounter(){
    counter.style.opacity=1;
    const fast=setInterval(()=>{
        s-=5;
        if(s<=0){
            d=0;h=0;m=0;s=0;
            update();
            clearInterval(fast);
            setTimeout(()=>{
                window.location.href="final.html";
            },5000);
        }
    },100);
}

