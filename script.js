const treeCanvas = document.getElementById("treeCanvas");
const ctx = treeCanvas.getContext("2d");

const snowCanvas = document.getElementById("snowCanvas");
const snowCtx = snowCanvas.getContext("2d");

treeCanvas.width = snowCanvas.width = window.innerWidth;
treeCanvas.height = snowCanvas.height = window.innerHeight;

let W = treeCanvas.width;
let H = treeCanvas.height;

/* ======================
   ÁRBOL GRANDE CON RAMAS
====================== */

function drawBranch(x,y,len,angle,depth){
    if(depth === 0) return;

    const x2 = x + len*Math.cos(angle);
    const y2 = y - len*Math.sin(angle);

    ctx.strokeStyle = "#4b2e1f";
    ctx.lineWidth = depth/2;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x2,y2);
    ctx.stroke();

    // pétalos rosados en ramas finales
    if(depth < 3){
        for(let i=0;i<3;i++){
            ctx.fillStyle="pink";
            ctx.beginPath();
            ctx.arc(x2+Math.random()*4, y2+Math.random()*4, 2, 0, Math.PI*2);
            ctx.fill();
        }
    }

    drawBranch(x2,y2,len*0.75,angle+0.4,depth-1);
    drawBranch(x2,y2,len*0.75,angle-0.4,depth-1);
}

function growTree(){
    ctx.clearRect(0,0,W,H);
    drawBranch(W/2,H,180,Math.PI/2,9); // árbol grande (doble altura)
}

/* ======================
   NIEVE
====================== */

let snow = [];

function createSnow(){
    for(let i=0;i<120;i++){
        snow.push({
            x:Math.random()*W,
            y:Math.random()*H,
            r:Math.random()*2+1,
            speed:Math.random()*1+0.5
        });
    }
}

function animateSnow(){
    snowCtx.clearRect(0,0,W,H);
    snowCtx.fillStyle="white";

    snow.forEach(s=>{
        s.y += s.speed;
        if(s.y > H) s.y = 0;

        snowCtx.beginPath();
        snowCtx.arc(s.x,s.y,s.r,0,Math.PI*2);
        snowCtx.fill();
    });

    requestAnimationFrame(animateSnow);
}

/* ======================
   POEMAS
====================== */

const poem1 = `
Eres la luz que encontró mi destino
cuando el mundo era sombra y silencio.
Eres el susurro que calma mi mente,
la paz que no sabía que buscaba.

En tus ojos descubrí un universo,
en tu risa aprendí lo que es vivir.
Y en cada latido que nace por ti,
mi alma confirma que te elegí.

Si el tiempo intentara separarnos,
lo detendría con mis manos.
Porque mi amor no conoce distancia,
ni dudas, ni final.
`;

const poem2 = `
Si algún día la noche te asusta,
recuerda que soy tu amanecer.
Si el mundo pesa demasiado,
mi abrazo será tu hogar.

No prometo perfección,
pero sí eternidad en cada intento.
No prometo un camino fácil,
pero sí caminarlo contigo.

Porque amarte
no es un momento…
es mi destino.
`;

function showPoem(element,text,duration){
    element.innerText = text;
    element.style.opacity = 1;
    element.style.height = "0px";

    let totalHeight = element.scrollHeight;
    let current = 0;

    let interval = setInterval(()=>{
        current += 2;
        element.style.height = current + "px";

        if(current >= totalHeight){
            clearInterval(interval);
            setTimeout(()=>{
                element.style.opacity = 0;
            }, duration);
        }
    },40);
}

/* ======================
   CONTADOR
====================== */

let time = {
    d:30,
    h:10,
    m:5,
    s:39
};

const counter = document.getElementById("counter");

let fastMode = false;
let phase = 0;

function updateCounter(){
    if(!fastMode){
        time.s--;
        if(time.s<0){time.s=59; time.m--;}
        if(time.m<0){time.m=59; time.h--;}
        if(time.h<0){time.h=23; time.d--;}
    }else{
        if(phase===0){ time.s-=5; if(time.s<=0){time.s=0; phase=1;} }
        else if(phase===1){ time.m-=2; if(time.m<=0){time.m=0; phase=2;} }
        else if(phase===2){ time.h--; if(time.h<=0){time.h=0; phase=3;} }
        else if(phase===3){ time.d--; if(time.d<=0){time.d=0; explodeScene();} }
    }

    counter.innerText =
    `${time.d} días ${time.h} horas ${time.m} minutos ${time.s} segundos`;

    let total = time.d+time.h+time.m+time.s;
    if(total < 50) counter.style.color="red";
}

setInterval(updateCounter,1000);

/* ======================
   EXPLOSIÓN FINAL
====================== */

function explodeScene(){
    setTimeout(()=>{
        document.body.innerHTML="";
        let canvas=document.createElement("canvas");
        document.body.appendChild(canvas);
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
        let c=canvas.getContext("2d");

        let particles=[];
        for(let i=0;i<400;i++){
            particles.push({
                x:canvas.width/2,
                y:canvas.height/2,
                vx:(Math.random()-0.5)*6,
                vy:(Math.random()-0.5)*6,
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
    },5000);
}

/* ======================
   SECUENCIA
====================== */

growTree();
createSnow();
animateSnow();

setTimeout(()=>{
    showPoem(document.getElementById("poemLeft"),poem1,4000);
},3000);

setTimeout(()=>{
    showPoem(document.getElementById("poemRight"),poem2,4000);
    fastMode = true;
},12000);

