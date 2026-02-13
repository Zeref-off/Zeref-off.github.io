/* ==========================================
   FATUM AMANTIS – VERSION CINE EXTREMO
   Flujo completo restaurado
========================================== */

const screenInicio = document.getElementById("screenInicio");
const screenScene = document.getElementById("screenScene");

const matrixCanvas = document.getElementById("matrixCanvas");
const mtx = matrixCanvas.getContext("2d");

const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");

const poemaLeft = document.getElementById("poemaLeft");
const poemaRight = document.getElementById("poemaRight");
const contadorEl = document.getElementById("contador");
const timeEl = document.getElementById("time");

/* ==========================================
   SIZE
========================================== */

let W, H;
function resize(){
    W = window.innerWidth;
    H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;

    matrixCanvas.width = W;
    matrixCanvas.height = H;
}
window.addEventListener("resize", resize);
resize();

/* ==========================================
   MATRIX INICIO
========================================== */

let matrixCols;
let matrixDrops;

function initMatrix(){
    matrixCols = Math.floor(W / 20);
    matrixDrops = Array(matrixCols).fill(1);
}

function drawMatrix(){
    mtx.fillStyle = "rgba(0,0,0,0.05)";
    mtx.fillRect(0,0,W,H);

    mtx.fillStyle = "#ff0040";
    mtx.font = "16px monospace";

    for(let i=0;i<matrixDrops.length;i++){
        let text = Math.random() > 0.5 ? "0" : "1";
        mtx.fillText(text, i*20, matrixDrops[i]*20);

        if(matrixDrops[i]*20 > H && Math.random()>0.975){
            matrixDrops[i]=0;
        }
        matrixDrops[i]++;
    }
}

/* ==========================================
   NIEVE
========================================== */

let snow = [];

function initSnow(){
    snow = [];
    for(let i=0;i<150;i++){
        snow.push({
            x: Math.random()*W,
            y: Math.random()*H,
            r: Math.random()*2+1,
            s: Math.random()*1+0.5
        });
    }
}

function drawSnow(){
    ctx.fillStyle = "white";
    for(let p of snow){
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();

        p.y += p.s;
        if(p.y>H){
            p.y=0;
            p.x=Math.random()*W;
        }
    }
}

/* ==========================================
   POEMAS
========================================== */

const poema1 = `
Eres el instante
donde el tiempo respira,
la calma entre mis latidos.
`;

const poema2 = `
Y si el mundo termina,
que sea contigo,
mirando el mar infinito.
`;

function mostrarPoema(el, texto, velocidad, callback){
    el.style.opacity = 1;
    let i=0;
    el.innerHTML="";
    let interval = setInterval(()=>{
        el.innerHTML += texto[i];
        i++;
        if(i>=texto.length){
            clearInterval(interval);
            setTimeout(()=>{
                el.style.opacity = 0;
                if(callback) callback();
            },1500);
        }
    }, velocidad);
}

/* ==========================================
   CONTADOR
========================================== */

let tiempoRestante = 15000;
let contadorActivo = false;

function iniciarContador(){
    contadorActivo = true;
}

function actualizarContador(){
    if(!contadorActivo) return;

    tiempoRestante -= 40;
    if(tiempoRestante < 0) tiempoRestante = 0;

    let s = Math.floor(tiempoRestante/1000);
    let m = Math.floor(s/60);
    let h = Math.floor(m/60);
    let d = Math.floor(h/24);

    timeEl.innerText = `${d}d ${h%24}h ${m%60}m ${s%60}s`;

    if(tiempoRestante === 0){
        modoFinal = true;
        poemaLeft.style.display="none";
        poemaRight.style.display="none";
        contadorEl.style.display="none";
    }
}

/* ==========================================
   OCEANO CINEMATOGRAFICO
========================================== */

let particulas=[];
let tiempo=0;
let modoFinal=false;

function crearOceano(){
    particulas=[];
    for(let i=0;i<900;i++){
        particulas.push({
            x:Math.random()*W,
            baseY:H*0.5 + Math.random()*H*0.5,
            amp:20+Math.random()*120,
            freq:0.002+Math.random()*0.003,
            speed:0.5+Math.random()*1.5,
            size:1+Math.random()*3,
            fase:Math.random()*Math.PI*2
        });
    }
}

function drawCielo(){
    let g=ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,"#000814");
    g.addColorStop(1,"#001d3d");
    ctx.fillStyle=g;
    ctx.fillRect(0,0,W,H);

    // luna
    ctx.fillStyle="#fff8cc";
    ctx.beginPath();
    ctx.arc(W*0.8,H*0.15,40,0,Math.PI*2);
    ctx.fill();
}

function drawOcean(){
    for(let p of particulas){
        let y = p.baseY + Math.sin(p.x*p.freq + tiempo*p.speed + p.fase)*p.amp;

        p.x += 0.2;
        if(p.x>W) p.x=0;

        ctx.fillStyle=`rgba(0,120,255,0.4)`;
        ctx.beginPath();
        ctx.arc(p.x,y,p.size,0,Math.PI*2);
        ctx.fill();

        // espuma
        let crest = Math.sin(p.x*p.freq + tiempo*p.speed + p.fase);
        if(crest>0.9){
            ctx.fillStyle="rgba(255,255,255,0.8)";
            ctx.beginPath();
            ctx.arc(p.x,y-p.size*2,p.size,0,Math.PI*2);
            ctx.fill();
        }
    }
}

/* ==========================================
   CONTROL INICIO
========================================== */

function iniciar(){
    screenInicio.classList.remove("active");
    screenScene.classList.add("active");

    initSnow();
    crearOceano();

    mostrarPoema(poemaLeft, poema1, 20, ()=>{
        mostrarPoema(poemaRight, poema2, 20, ()=>{
            iniciarContador();
        });
    });
}

window.iniciar = iniciar;

/* ==========================================
   LOOP
========================================== */

function loop(){
    requestAnimationFrame(loop);

    if(screenInicio.classList.contains("active")){
        drawMatrix();
        return;
    }

    ctx.clearRect(0,0,W,H);

    if(!modoFinal){
        drawSnow();
        actualizarContador();
    }else{
        drawCielo();
        drawOcean();
        tiempo += 0.02;
    }
}

initMatrix();
loop();


