// ================= VARIABLES GENERALES =================

const screenInicio = document.getElementById("screenInicio");
const screenScene = document.getElementById("screenScene");

const matrixCanvas = document.getElementById("matrixCanvas");
const sceneCanvas = document.getElementById("sceneCanvas");

const poemaLeft = document.getElementById("poemaLeft");
const poemaRight = document.getElementById("poemaRight");
const timeText = document.getElementById("time");

let sceneCtx = sceneCanvas.getContext("2d");

// Ajustar canvas
function resizeCanvas(){
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    sceneCanvas.width = window.innerWidth;
    sceneCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();


// ================= PANTALLA INICIO (MATRIX) =================

const mCtx = matrixCanvas.getContext("2d");
const letters = "01";
const fontSize = 16;
let columns = matrixCanvas.width / fontSize;
let drops = [];

for(let i=0;i<columns;i++) drops[i]=1;

function drawMatrix(){
    mCtx.fillStyle = "rgba(0,0,0,0.05)";
    mCtx.fillRect(0,0,matrixCanvas.width,matrixCanvas.height);

    mCtx.fillStyle = "#0f0";
    mCtx.font = fontSize + "px monospace";

    for(let i=0;i<drops.length;i++){
        const text = letters[Math.floor(Math.random()*letters.length)];
        mCtx.fillText(text, i*fontSize, drops[i]*fontSize);

        if(drops[i]*fontSize > matrixCanvas.height && Math.random()>0.975)
            drops[i]=0;

        drops[i]++;
    }
}
setInterval(drawMatrix, 33);


// ================= INICIO =================

function iniciar(){
    screenInicio.classList.remove("active");
    screenScene.classList.add("active");
    startScene();
}


// ================= ESCENA PRINCIPAL =================

const poema1 = [
"Desde el instante en que te vi,",
"el tiempo cambió su curso,",
"cada segundo contigo,",
"se volvió eterno."
];

const poema2 = [
"Y si el destino insiste,",
"en medir lo imposible,",
"que cuente los latidos,",
"que llevan tu nombre."
];

function mostrarPoema(texto, elemento, velocidad, callback){
    elemento.innerHTML = "";
    let i = 0;

    function escribir(){
        if(i < texto.length){
            elemento.innerHTML += texto[i] + "<br>";
            i++;
            setTimeout(escribir, velocidad);
        }else{
            setTimeout(()=>{
                elemento.style.opacity = 0;
                setTimeout(callback, 1000);
            }, 1500);
        }
    }

    elemento.style.opacity = 1;
    escribir();
}


// ================= CONTADOR =================

let tiempoTotal = 10; // segundos iniciales
let acelerando = false;

function actualizarContador(){
    if(tiempoTotal <= 0){
        iniciarOceanoFinal();
        return;
    }

    tiempoTotal--;

    let s = tiempoTotal % 60;
    let m = Math.floor(tiempoTotal/60);

    timeText.innerText = `0d 0h ${m}m ${s}s`;

    let velocidad = acelerando ? 30 : 1000;
    setTimeout(actualizarContador, velocidad);
}


// ================= NIEVE =================

let snowflakes = [];
for(let i=0;i<200;i++){
    snowflakes.push({
        x: Math.random()*window.innerWidth,
        y: Math.random()*window.innerHeight,
        r: Math.random()*3,
        speed: Math.random()*1+0.5
    });
}

function drawSnow(){
    sceneCtx.fillStyle = "white";
    snowflakes.forEach(f=>{
        sceneCtx.beginPath();
        sceneCtx.arc(f.x,f.y,f.r,0,Math.PI*2);
        sceneCtx.fill();

        f.y += f.speed;
        if(f.y > window.innerHeight){
            f.y = 0;
            f.x = Math.random()*window.innerWidth;
        }
    });
}


// ================= OCEANO FINAL =================

let oceanParticles = [];
let waveTime = 0;

for(let i=0;i<1200;i++){
    oceanParticles.push({
        x: Math.random(),
        y: Math.random(),
        depth: Math.random()
    });
}


// ===== LUNA CINEMATOGRÁFICA =====

function drawMoon(ctx, x, y, r){

    // Halo grande
    let halo1 = ctx.createRadialGradient(x,y,r*0.5,x,y,r*6);
    halo1.addColorStop(0,"rgba(255,255,255,0.15)");
    halo1.addColorStop(1,"rgba(255,255,255,0)");
    ctx.beginPath();
    ctx.arc(x,y,r*6,0,Math.PI*2);
    ctx.fillStyle = halo1;
    ctx.fill();

    // Halo medio
    let halo2 = ctx.createRadialGradient(x,y,r*0.2,x,y,r*2.5);
    halo2.addColorStop(0,"rgba(255,255,255,0.4)");
    halo2.addColorStop(1,"rgba(255,255,255,0)");
    ctx.beginPath();
    ctx.arc(x,y,r*2.5,0,Math.PI*2);
    ctx.fillStyle = halo2;
    ctx.fill();

    // Cuerpo luna
    let grad = ctx.createRadialGradient(
        x-r*0.3,y-r*0.3,r*0.2,
        x,y,r
    );
    grad.addColorStop(0,"#ffffff");
    grad.addColorStop(1,"#dfe8ff");

    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Núcleo brillante
    ctx.beginPath();
    ctx.arc(x-r*0.3,y-r*0.3,r*0.25,0,Math.PI*2);
    ctx.fillStyle="rgba(255,255,255,0.8)";
    ctx.fill();
}


function drawOcean(){
    const w = sceneCanvas.width;
    const h = sceneCanvas.height;

    sceneCtx.fillStyle = "#020b1a";
    sceneCtx.fillRect(0,0,w,h);

    waveTime += 0.02;

    oceanParticles.forEach(p=>{
        let wave =
            Math.sin((p.x*10)+waveTime) +
            Math.sin((p.x*20)+waveTime*1.5) +
            Math.sin((p.x*30)+waveTime*0.7);

        let y = h*0.5 + wave*20 + p.depth*150;

        let x = p.x*w;

        let blue = 150 + p.depth*80;

        sceneCtx.fillStyle = `rgb(0,${blue},255)`;
        sceneCtx.fillRect(x,y,2,2);
    });

    // Luna
    drawMoon(sceneCtx, w*0.8, h*0.2, 40);

    requestAnimationFrame(drawOcean);
}

function iniciarOceanoFinal(){
    screenScene.innerHTML = `<canvas id="sceneCanvas"></canvas>`;
    const canvas = document.getElementById("sceneCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    sceneCanvas.width = canvas.width;
    sceneCanvas.height = canvas.height;
    sceneCtx = canvas.getContext("2d");

    drawOcean();
}


// ================= FLUJO PRINCIPAL =================

function startScene(){

    function animarEscena(){
        sceneCtx.clearRect(0,0,sceneCanvas.width,sceneCanvas.height);
        drawSnow();
        requestAnimationFrame(animarEscena);
    }
    animarEscena();

    mostrarPoema(poema1, poemaLeft, 300, ()=>{
        mostrarPoema(poema2, poemaRight, 300, ()=>{
            acelerando = true;
            actualizarContador();
        });
    });
}


