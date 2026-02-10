/* ================= MATRIX FATUM AMANTIS ================= */

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const text = "Fatum Amantis";
const letters = text.split("");
const fontSize = 18;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);

function drawMatrix(){
    ctx.fillStyle="rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#ff4d7a";
    ctx.font=fontSize+"px monospace";

    for(let i=0;i<drops.length;i++){
        const char = letters[Math.floor(Math.random()*letters.length)];
        ctx.fillText(char, i*fontSize, drops[i]*fontSize);

        if(drops[i]*fontSize > canvas.height && Math.random()>0.99){
            drops[i]=0;
        }

        drops[i]+=0.3; // más lento
    }
}

let matrixInterval = setInterval(drawMatrix,40);


/* ================= INICIO ================= */

const startBox = document.getElementById("startBox");
const singularity = document.getElementById("singularity");
const counter = document.getElementById("counter");

let started=false;

startBox.onclick = ()=>{
    if(started) return;
    started=true;

    startBox.style.display="none";
    counter.style.opacity=1;

    clearInterval(matrixInterval);

    smoothSpiral();
};


/* ================= ESPIRAL SUAVE ================= */

function smoothSpiral(){
    let scale=1;
    let rotate=0;

    function animate(){
        scale *= 0.97;
        rotate += 4;

        canvas.style.transform=`scale(${scale}) rotate(${rotate}deg)`;

        if(scale > 0.05){
            requestAnimationFrame(animate);
        }else{
            canvas.style.display="none";
            createDrop();
        }
    }

    animate();
}


/* ================= GOTA ================= */

function createDrop(){
    singularity.style.display="block";
    singularity.style.position="fixed";
    singularity.style.width="12px";
    singularity.style.height="18px";
    singularity.style.background="#ff2e63";
    singularity.style.borderRadius="50% 50% 60% 60%";
    singularity.style.top="50%";
    singularity.style.left="50%";
    singularity.style.transform="translate(-50%,-50%)";

    singularity.animate([
        {top:"50%"},
        {top:"80%"}
    ],{duration:2500, easing:"ease-in"});

    setTimeout(startTree,2500);
}


/* ================= CONTADOR ================= */

let d=30,h=10,m=5,s=39;
const timeEl=document.getElementById("time");

function updateTime(){
    s--;
    if(s<0){s=59;m--;}
    if(m<0){m=59;h--;}
    if(h<0){h=23;d--;}
    if(d<0)d=0;

    timeEl.textContent=`${d} días ${h} horas ${m} minutos ${s} segundos`;
}

setInterval(updateTime,1000);


/* ================= ÁRBOL ================= */

const treeCanvas=document.getElementById("treeCanvas");
const tctx=treeCanvas.getContext("2d");
treeCanvas.width=window.innerWidth;
treeCanvas.height=window.innerHeight;

let branchPoints=[];

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

    if(depth<3) branchPoints.push({x:x2,y:y2});

    setTimeout(()=>{
        drawBranch(x2,y2,len*0.75,angle-0.4,depth-1);
        drawBranch(x2,y2,len*0.75,angle+0.4,depth-1);
    },200);
}

function startTree(){
    drawBranch(treeCanvas.width/2,treeCanvas.height*0.8,120,Math.PI/2,10);

    setTimeout(addFlowers,4000);
}


/* ================= FLORES ================= */

function addFlowers(){
    branchPoints.forEach(p=>{
        tctx.fillStyle="pink";
        tctx.beginPath();
        tctx.arc(p.x,p.y,3,0,Math.PI*2);
        tctx.fill();
    });

    startPetals();
    setTimeout(showPoemLeft,1000);
}


/* ================= PÉTALOS SIN RASTRO ================= */

let petals=[];

function startPetals(){
    setInterval(()=>{
        petals.push({
            x:treeCanvas.width/2 + (Math.random()*200-100),
            y:200,
            vx:(Math.random()<0.5?-1:1)*0.5,
            vy:1+Math.random()
        });
    },400);

    animatePetals();
}

function animatePetals(){
    tctx.clearRect(0,0,treeCanvas.width,treeCanvas.height);
    branchPoints.forEach(p=>{
        tctx.fillStyle="pink";
        tctx.fillRect(p.x,p.y,2,2);
    });

    petals.forEach(p=>{
        p.x+=p.vx*Math.sin(Date.now()/1000);
        p.y+=p.vy;

        tctx.fillStyle="rgba(255,182,193,0.8)";
        tctx.fillRect(p.x,p.y,2,2);
    });

    petals=petals.filter(p=>p.y<treeCanvas.height);

    requestAnimationFrame(animatePetals);
}


/* ================= POEMAS DESPLAZAMIENTO ================= */

const poem1 = `Poema largo de prueba...
Este texto irá subiendo lentamente
mientras el anterior desaparece
creando una lectura cinematográfica
que fluye como el tiempo y el recuerdo.`;

const poem2 = `Segundo poema de prueba...
Aparece después del primero
con el mismo efecto de desplazamiento
y al finalizar activará
la aceleración del tiempo.`;


function scrollPoem(el,text,callback){
    el.innerHTML=text;
    el.style.opacity=1;

    let pos=50;

    const interval=setInterval(()=>{
        pos-=0.05;
        el.style.transform=`translateY(-${pos}%)`;

        if(pos<=0){
            clearInterval(interval);
            el.style.opacity=0;
            if(callback) callback();
        }
    },30);
}

function showPoemLeft(){
    scrollPoem(document.getElementById("poemLeft"),poem1,showPoemRight);
}

function showPoemRight(){
    scrollPoem(document.getElementById("poemRight"),poem2,accelerateTime);
}


/* ================= ACELERACIÓN FINAL ================= */

function accelerateTime(){
    const fast=setInterval(()=>{
        s-=5;
        if(s<=0){
            d=0;h=0;m=0;s=0;
            updateTime();
            clearInterval(fast);

            setTimeout(()=>{
                window.location.href="final.html";
            },5000);
        }
    },80);
}

