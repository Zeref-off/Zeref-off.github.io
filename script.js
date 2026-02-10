/* ===== MATRIX TE AMO (vertical tipo Matrix) ===== */

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = ["T","E","A","M","O"];
const fontSize = 18;
const columns = canvas.width / fontSize;
const drops = [];

for(let i=0;i<columns;i++){
    drops[i] = Math.random()*canvas.height;
}

function drawMatrix(){
    ctx.fillStyle="rgba(0,0,0,0.08)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#ff4d7a";
    ctx.font=fontSize+"px monospace";

    for(let i=0;i<drops.length;i++){
        const text = letters[Math.floor(Math.random()*letters.length)];
        ctx.fillText(text, i*fontSize, drops[i]*fontSize);

        if(drops[i]*fontSize > canvas.height && Math.random()>0.975){
            drops[i]=0;
        }

        drops[i]+=0.6;
    }
}

let matrixInterval = setInterval(drawMatrix,33);


/* ===== ESPIRAL DE ABSORCIÓN ===== */

const startBox = document.getElementById("startBox");
const page = document.getElementById("page");
const singularity = document.getElementById("singularity");

startBox.onclick = ()=>{
    startBox.style.display="none";
    clearInterval(matrixInterval);

    let scale = 1;
    let rotate = 0;

    const spiral = setInterval(()=>{
        scale -= 0.02;
        rotate += 10;
        page.style.transform = `scale(${scale}) rotate(${rotate}deg)`;

        if(scale <= 0.05){
            clearInterval(spiral);
            page.style.display="none";
            createDrop();
        }
    },30);
};


/* ===== GOTA ===== */

function createDrop(){
    singularity.style.display="block";
    singularity.style.transition="all 2s ease";
    singularity.style.width="12px";
    singularity.style.height="18px";
    singularity.style.borderRadius="50% 50% 60% 60%";
    singularity.style.top="85%";

    setTimeout(afterImpact,2000);
}


/* ===== IMPACTO ===== */

function afterImpact(){
    document.getElementById("water").style.opacity=1;
    growTree();
}


/* ===== ÁRBOL CON RAMAS ===== */

function createBranch(x,y,length,angle,depth){
    if(depth===0) return;

    const branch = document.createElement("div");
    branch.className="branch";
    branch.style.height = length+"px";
    branch.style.width = "6px";
    branch.style.left = x+"px";
    branch.style.bottom = y+"px";
    branch.style.transform = `rotate(${angle}deg)`;
    document.getElementById("tree").appendChild(branch);

    setTimeout(()=>{
        const rad = angle*Math.PI/180;
        const nx = x + Math.sin(rad)*length;
        const ny = y + Math.cos(rad)*length;

        createBranch(nx,ny,length*0.7,angle-25,depth-1);
        createBranch(nx,ny,length*0.7,angle+25,depth-1);

        if(depth===1){
            createLeaf(nx,ny);
        }
    },500);
}

function growTree(){
    createBranch(0,0,200,0,6);

    setTimeout(startLeaves,6000);
    setTimeout(showPoemLeft,7000);
}

function createLeaf(x,y){
    const leaf = document.createElement("div");
    leaf.className="leaf";
    leaf.style.left=x+"px";
    leaf.style.bottom=y+"px";
    document.getElementById("tree").appendChild(leaf);
}

function startLeaves(){
    for(let i=0;i<40;i++){
        const leaf = document.createElement("div");
        leaf.className="leaf";
        leaf.style.left=(Math.random()*200-100)+"px";
        leaf.style.bottom="400px";
        leaf.style.animationDelay=Math.random()*8+"s";
        document.getElementById("tree").appendChild(leaf);
    }
}


/* ===== POEMAS LARGOS ===== */

const poem1 = `Desde el instante en que llegaste a mi vida,
el mundo cambió su forma de girar.
Las horas comenzaron a tener tu nombre,
y el tiempo aprendió a esperarte.

Tu sonrisa se volvió mi refugio,
tu voz, la calma de mis días,
y en cada latido descubrí
que el amor no era un sueño,
sino una realidad que respiraba en ti.

Si el destino existe,
sé que escribió tu nombre
mucho antes de que yo pudiera pronunciarlo.`;

const poem2 = `Hoy entiendo que amarte
no es solo sentir,
es elegirte cada día
en cada pensamiento y en cada silencio.

Porque en tus ojos encontré hogar,
en tus abrazos, mi lugar,
y en tu presencia
la certeza de que la vida
puede ser tan hermosa
como siempre la imaginé.

Y si el tiempo intentara separarnos,
volvería a buscarte,
una y otra vez,
en cada vida que me toque vivir.`;


function typeText(el,text,callback){
    el.style.opacity=1;
    let i=0;
    const interval=setInterval(()=>{
        el.innerHTML += text[i];
        i++;
        if(i>=text.length){
            clearInterval(interval);
            setTimeout(()=>{
                el.style.opacity=0;
                el.innerHTML="";
                if(callback) callback();
            },4000);
        }
    },35);
}

function showPoemLeft(){
    typeText(document.getElementById("poemLeft"),poem1,showPoemRight);
}

function showPoemRight(){
    typeText(document.getElementById("poemRight"),poem2,startCounter);
}


/* ===== CONTADOR ===== */

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


