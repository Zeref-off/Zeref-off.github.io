/* =====================================================
   FATUM AMANTIS – VERSION CINE PROFESIONAL
   Océano cinematográfico por partículas
===================================================== */

const screenInicio = document.getElementById("screenInicio");
const screenScene = document.getElementById("screenScene");
const startBox = document.getElementById("startBox");

const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");

let W, H;
function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ===============================
   CONTROL DE ESCENAS
=============================== */

function iniciar(){
    screenInicio.classList.remove("active");
    screenScene.classList.add("active");

    crearOceano();
    animar();
}

/* ===============================
   CONFIGURACION DE TIEMPO FINAL
   (cuando llegue a cero = solo océano)
=============================== */

let duracion = 60000; // 1 minuto (ajusta si deseas)
let inicioTiempo = Date.now();
let modoFinal = false;

/* ===============================
   OCEANO CINEMATOGRAFICO
=============================== */

let particulas = [];
let tiempo = 0;

function crearOceano(){

    particulas = [];

    const capas = 5;            // profundidad
    const densidadBase = 160;   // cantidad de partículas

    for(let c = 0; c < capas; c++){

        let profundidad = c / capas;
        let cantidad = densidadBase + c * 80;

        for(let i=0; i<cantidad; i++){

            particulas.push({
                x: Math.random() * W,
                yBase: H * (0.45 + profundidad * 0.5),
                y: 0,
                profundidad: profundidad,

                amp: 20 + profundidad * 80,       // altura de ola
                freq: 0.002 + Math.random()*0.002,
                speed: 0.5 + profundidad * 1.5,
                size: 1 + profundidad * 3,

                fase: Math.random() * Math.PI * 2
            });
        }
    }
}

/* ===============================
   FUNCION DE OLA PROFESIONAL
   combina varias ondas para realismo
=============================== */

function calcularOla(p, t){

    let ola1 = Math.sin((p.x * p.freq) + t * p.speed + p.fase);
    let ola2 = Math.sin((p.x * p.freq * 0.5) + t * p.speed * 0.7);
    let ola3 = Math.sin((p.x * p.freq * 2) + t * p.speed * 1.3);

    let mezcla = (ola1 + ola2*0.6 + ola3*0.3);

    return p.yBase + mezcla * p.amp;
}

/* ===============================
   DIBUJAR OCEANO
=============================== */

function drawOcean(){

    // Fondo profundo (degradado)
    let grad = ctx.createLinearGradient(0, H*0.3, 0, H);
    grad.addColorStop(0, "#041a2b");
    grad.addColorStop(0.5, "#062c45");
    grad.addColorStop(1, "#020d16");

    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);

    // Dibujar partículas por profundidad
    for(let p of particulas){

        p.y = calcularOla(p, tiempo);

        // Movimiento horizontal lento (corriente)
        p.x += p.profundidad * 0.3;
        if(p.x > W) p.x = 0;

        // Color según profundidad
        let azul = 120 + p.profundidad * 100;
        let alpha = 0.3 + p.profundidad * 0.6;

        ctx.fillStyle = `rgba(0, ${azul}, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();

        // =============================
        // ESPUMA EN CRESTAS (cine)
        // =============================
        let cresta = Math.sin((p.x * p.freq) + tiempo * p.speed + p.fase);

        if(cresta > 0.92 && p.profundidad > 0.6){

            ctx.fillStyle = `rgba(255,255,255,${(cresta-0.9)*5})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y - p.size*2, p.size*0.9, 0, Math.PI*2);
            ctx.fill();
        }
    }
}

/* ===============================
   ANIMACION
=============================== */

function animar(){

    requestAnimationFrame(animar);

    tiempo += 0.01;

    // Verificar contador
    if(!modoFinal && Date.now() - inicioTiempo > duracion){
        modoFinal = true;

        // Ocultar textos y todo lo demás
        document.getElementById("poemaLeft").style.display = "none";
        document.getElementById("poemaRight").style.display = "none";
        document.getElementById("contador").style.display = "none";
    }

    drawOcean();
}

/* ===============================
   BOTON
=============================== */

window.iniciar = iniciar;






