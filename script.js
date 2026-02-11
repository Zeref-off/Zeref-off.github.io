const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const W = canvas.width;
const H = canvas.height;

/* =====================================================
   PIXEL ART TREE
===================================================== */

let treePixels = [];

function drawPixel(x,y,color){
    ctx.fillStyle=color;
    ctx.fillRect(x,y,4,4);
}

function addBranch(x,y,len,dx,dy){
    for(let i=0;i<len;i++){
        treePixels.push({x:x+i*dx, y:y+i*dy, color:"#5b3a1a"});
    }
}

function generateTree(){

    const baseX = Math.floor(W/2);
    const baseY = H;

    let height = Math.floor(H*0.7);

    // Tronco principal
    for(let i=0;i<height;i++){
        for(let w=-2;w<=2;w++){
            treePixels.push({
                x:baseX+w*4,
                y:baseY-i*4,
                color:"#5b3a1a"
            });
        }

        // Ramificaciones
        if(i%20===0 && i>40){
            addBranch(baseX,baseY-i*4,20,1,-1);
            addBranch(baseX,baseY-i*4,20,-1,-1);
        }
    }

    // Hojas pixel
    treePixels.forEach(p=>{
        if(Math.random()>0.85){
            treePixels.push({
                x:p.x + Math.random()*20-10,
                y:p.y + Math.random()*20-10,
                color:"#ff9acb"
            });
        }
    });
}

generateTree();

/* =====================================================
   NIEVE
===================================================== */

let snow=[];
for(let i=0;i<150;i++){
    snow.push({
        x:Math.random()*W,
        y:Math.random()*H,
        r:Math.random()*2+1
    });
}

function drawSnow(){
    ctx.fillStyle="white";
    snow.forEach(s=>{
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fill();
        s.y+=0.5;
        if(s.y>H) s.y=0;
    });
}

/* =====================================================
   CONTADOR
===================================================== */

let time={d:0,h:0,m:0,s:15};
let oceanMode=false;

const counter = document.getElementById("counter");

function updateCounter(){

    if(time.s>0){
        time.s--;
    }else{
        startOcean();
        clearInterval(counterInterval);
    }

    counter.innerText =
    `${time.d} días ${time.h} horas ${time.m} minutos ${time.s} segundos`;
}

const counterInterval = setInterval(updateCounter,1000);

/* =====================================================
   OCEAN PARTICLES
===================================================== */

let oceanParticles=[];
let heartParticles=[];
let phase="tree";

function startOcean(){
    phase="ocean";

    treePixels.forEach(p=>{
        oceanParticles.push({
            x:p.x,
            y:p.y,
            vx:(Math.random()-0.5)*2,
            vy:Math.random()*2,
            size:Math.random()*3+1
        });
    });

    setTimeout(startHeart,10000);
}

/* =====================================================
   HEART FORMATION
===================================================== */

function startHeart(){
    phase="heart";

    const centerX=W/2;
    const centerY=H/2;

    for(let t=0;t<Math.PI*2;t+=0.02){
        let x = 16*Math.pow(Math.sin(t),3);
        let y = -(13*Math.cos(t) -5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));

        heartParticles.push({
            x:centerX + x*10,
            y:centerY + y*10,
            angle:Math.random()*Math.PI*2
        });
    }
}

/* =====================================================
   MAIN LOOP
===================================================== */

function animate(){

    ctx.clearRect(0,0,W,H);

    if(phase==="tree"){
        treePixels.forEach(p=>{
            drawPixel(p.x,p.y,p.color);
        });
        drawSnow();
    }

    if(phase==="ocean"){
        oceanParticles.forEach(p=>{
            p.y += Math.sin(Date.now()*0.002 + p.x*0.01);
            ctx.fillStyle="rgba(0,150,255,0.7)";
            ctx.fillRect(p.x,p.y,p.size,p.size);
        });
    }

    if(phase==="heart"){
        heartParticles.forEach(p=>{
            p.angle += 0.01;
            let x = p.x + Math.cos(p.angle)*2;
            let y = p.y + Math.sin(p.angle)*2;

            ctx.fillStyle="#00bfff";
            ctx.fillRect(x,y,2,2);
        });
    }

    requestAnimationFrame(animate);
}

animate();


