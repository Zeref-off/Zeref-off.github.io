/* ==========================================
   FATUM AMANTIS – CINE PREMIUM SECUENCIAL
========================================== */

const subtitulos = document.getElementById("subtitulos");
const screenInicio = document.getElementById("screenInicio");
const screenScene = document.getElementById("screenScene");
const startBox = document.getElementById("startBox");

const matrixCanvas = document.getElementById("matrixCanvas");
const mtx = matrixCanvas.getContext("2d");

const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");

const poemaLeft = document.getElementById("poemaLeft");
const poemaRight = document.getElementById("poemaRight");
const contadorEl = document.getElementById("contador");

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
   AUDIO
========================================== */

const audioInicio = new Audio("inicio.mp3");
const audioPoemas = new Audio("poemas.mp3");

const playlistOceano = [
    "oceano1.mp3",
    "oceano2.mp3",
    "oceano3.mp3",
    "oceano4.mp3",
    "oceano5.mp3"
];

let indiceOceano = 0;
const audioOceano = new Audio(playlistOceano[indiceOceano]);

/* ==========================================
   SUBTÍTULOS POR CANCIÓN
   (Canción 5 sin subtítulos)
========================================== */

const subtitulosCanciones = [
    [
       "Quiero se tu canción desde el principio al fin,",
       "quiero rozarme en tus labios y ser tu carmín",
       "Ser el jabón que te suaviza, el baño que te baña,",
       "la toalla que deslizas por tu piel mojada",
       "Yo quiero ser tu almohada, tu edredón de seda,",
       "besarte mientras sueñas y verte dormir",
       "Yo quiero ser el sol que entra y da sobre tu cama,",
       "despertarte poco a poco, hacerte sonreír",
       "Quiero estar en el más suave toque de tus dedos,",
       "entrar en lo más intimo de tus secretos",
       "Quiero ser la cosa buena,",
       "liberada o prohibida, ser todo en tu vida",
       "Todo lo que me quieras dar,",
       "quiero que me lo des",
       "Yo te doy todo lo que un hombre",
       "entrega a una mujer",
       "Y más allá de ese cariño que siempre me das, me"
       "imagino tantas cosas, quiero siempre más",
       "Tu eres mi dulce desayuno, mi pastel perfecto,",
       "mi bebida preferida, el plato predilecto",
       "Yo como y bebo de lo bueno y no tengo hora fija,",
       "de mañana, tarde o noche, no hago dieta",
       "Y ese amor que alimenta a mi fantasía,",
       "es mi sueño, es mi fiesta, es mi alegría",
       "La comida más sabrosa, mi perfume,",
       "mi bebida, es todo en mi vida",
       "Todo hombre que sabe querer,",
       "sabe dar y pedir a la mujer",
       "Lo mejor y hacer de ese amor",
       "lo que come, que bebe, que da, que recíbe",
       "El hombre que sabe querer,",
       "y se apasiona por una mujer",
       "Convierte su amor en su vida,",
       "su comida y bebida en la justa medida",
       "El hombre que sabe querer,",
       "sabe dar y pedir a la mujer",
       "Lo mejor y hacer de ese amor",
       "lo qu come, que bebe, que da, que recibe",
       "Pero el hombre que sabe querer",
       "y se apasiona por una mujer",
       "Convierte su amor en su vida,",
       "su comida y bebida en la justa medida",
       "Pero el hombre que sabe querer",
       "y se apasiona por una mujer",
       "Convierte su amor en su vida,",
       "su comida y bebida en la justa medida..."
    ],
    [
        "¿Cuándo dejaras de romper mi corazón?",
        "No quiero ser otro más",
        "Pagando por las cosas que nunca hice",
        "No dejes ir",
        "No dejes ir a mi amor",
        "",
        "",
        "",
        "",
        "¿Puedo llegar a tu alma?",
        "¿Puedes llegar a mis pensamientos?",
        "¿Podemos prometer que no lo dejaremos ir?",
        "Todas las cosas que necesito",
        "Todas las cosas que tu necesitas",
        "Puedes hacer que se sienta tan real",
        "Porque no puedes negar",
        "Has explotado mi mente",
        "Cuando toco tu cuerpo",
        "Siento que estoy perdiendo el control",
        "Porque no puedes negar",
        "Has explotado mi mente",
        "Cuando te veo cariño",
        "Simplemente no quiero dejarlo ir",
        "",
        "",
        "",
        "",
        "",
        "Odio verte llorar",
        "Tu sonrisa es una hermosa mentira",
        "",
        "",
        "",
        "Odio verte llorar",
        "Mi amor esta muriendo por dentro",
        "Yo puedo arreglar todas esas mentiras",
        "Oh cariño, cariño, corro",
        "Pero estoy corriendo hacia ti",
        "No me verás llorar",
        "Me estoy escondiendo por dentro",
        "Mi corazón duele, pero estoy conriendo para ti",
        "¿Puedo llegar a tu alma?",
        "¿Puedes llegar a mis pensamientos?",
        "¿Podemos prometer que no lo dejaremos ir?",
        "Todas las cosas que necesito",
        "Todas las cosas que tu necesitas",
        "Puedes hacer que se sienta tan real",
        "Porque no puedes negar",
        "Has explotado mi mente",
        "Cuando toco tu cuerpo",
        "Siento que estoy perdiendo el control",
        "Porque no puedes negar",
        "Has explotado mi mente",
        "Cuando te veo cariño",
        "Simplemente no quiero dejarlo ir",
        "",
        "",
        "",
        "¿Cuándo dejaras de romper mi corazón?",
        "No dejes ir",
        "No dejes ir a mi amor",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Odio verte llorar",
        "Tu sonrisa es una hermosa mentira",
        "Odio verte llorar",
        "Mi amor esta muriendo por dentro",
        "Odio verte llorar",
        "Mi amor esta muriendo por dentro",
        "",
        "",
        "",
        "",
        "",
        "",
        "Odio verte llorar",
        "Tu sonrisa es una hermosa mentira",
        "Yo puedo arreglar todas esas mentiras",
        "Tu sonrisa es una hermosa mentira",
        "Oh cariño, cariño, corro",
        "Pero estoy corriendo hacia ti",
        "No me verás llorar",
        "Me estoy escondiendo por dentro",
        "Mi corazon duele, pero estoy sonriendo para ti",
        "Oh cariño intentare hacer las cosas bien",
        "te necesito mas que el aire cuando no estoy contigo",
        "Por favor no me preguntes por que",
        "Solo besame esta vez",
        "Mi unico sueño es sobre tu y yo"
    ],
    [
        "Texto línea 1 canción 3...",
        "Texto línea 2 canción 3...",
        "Texto línea 3 canción 3..."
    ],
    [
        "Texto línea 1 canción 4...",
        "Texto línea 2 canción 4...",
        "Texto línea 3 canción 4..."
    ]
    // Canción 5 → sin subtítulos
];

let indiceLinea = 0;
let intervaloEscritura = null;
let intervaloBorrado = null;

/* Mostrar línea con efecto escribir + borrar */
function mostrarLinea(texto, callback){

    if(!texto || texto.trim() === ""){
        setTimeout(callback, 400);
        return;
    }

    subtitulos.style.opacity = 1;
    subtitulos.innerHTML = "";

    let i = 0;

    clearInterval(intervaloEscritura);
    clearInterval(intervaloBorrado);

    intervaloEscritura = setInterval(()=>{
        subtitulos.innerHTML += texto[i];
        i++;

        if(i >= texto.length){
            clearInterval(intervaloEscritura);

            setTimeout(()=>{

                let contenido = subtitulos.innerHTML;

                intervaloBorrado = setInterval(()=>{
                    contenido = contenido.slice(0, -1);
                    subtitulos.innerHTML = contenido;

                    if(contenido.length === 0){
                        clearInterval(intervaloBorrado);
                        if(callback) callback();
                    }

                }, 18);

            }, 1600);
        }

    }, 32);
}

/* Iniciar subtítulos por canción */
function iniciarSubtitulosCancion(indiceCancion){

    clearInterval(intervaloEscritura);
    clearInterval(intervaloBorrado);

    if(indiceCancion >= subtitulosCanciones.length){
        subtitulos.innerHTML = "";
        subtitulos.style.opacity = 0;
        return;
    }

    const lineas = subtitulosCanciones[indiceCancion];
    indiceLinea = 0;

    function siguienteLinea(){

        if(indiceOceano !== indiceCancion) return;
        if(indiceLinea >= lineas.length) return;

        mostrarLinea(lineas[indiceLinea], ()=>{
            indiceLinea++;
            siguienteLinea();
        });
    }

    siguienteLinea();
}

/* Cambio automático de canciones */
audioOceano.addEventListener("ended", () => {

    indiceOceano++;

    if(indiceOceano >= playlistOceano.length){
        indiceOceano = 0;
    }

    audioOceano.src = playlistOceano[indiceOceano];
    audioOceano.play().catch(()=>{});

    iniciarSubtitulosCancion(indiceOceano);
});

/* Transiciones automáticas */
audioInicio.addEventListener("ended", pasarAPoemas);
audioPoemas.addEventListener("ended", pasarAFinal);

/* ==========================================
   ESTADOS
========================================== */

let estado = "inicio";

/* ==========================================
   MATRIX
========================================== */

const matrixText = "Fatum Amantis";
const fontSize = 22;
let cols = Math.floor(window.innerWidth / fontSize);
let drops = Array(cols).fill(0);

function drawMatrix(){

    if(estado !== "inicio") return;

    mtx.fillStyle = "rgba(0,0,0,0.08)";
    mtx.fillRect(0,0,W,H);

    mtx.fillStyle = "#ff4d6d";
    mtx.font = fontSize + "px monospace";

    for(let i=0;i<drops.length;i++){

        let char = matrixText[Math.floor(Math.random()*matrixText.length)];
        mtx.fillText(char, i*fontSize, drops[i]*fontSize);

        if(drops[i]*fontSize > H && Math.random()>0.96){
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix, 60);

/* ==========================================
   NIEVE
========================================== */

let snow = [];

function initSnow(){
    snow = [];
    for(let i=0;i<240;i++){
        snow.push({
            x: Math.random()*W,
            y: Math.random()*H,
            r: Math.random()*2+1,
            s: Math.random()*1+0.5
        });
    }
}

function drawSnow(){
    ctx.fillStyle="white";
    for(let s of snow){
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fill();

        s.y += s.s;
        if(s.y > H){
            s.y = 0;
            s.x = Math.random()*W;
        }
    }
}

/* ==========================================
   POEMAS
========================================== */

const texto1 = `AMO ELEGIRTE
Tantas almas magicas en este mundo,
pero es la tuya la unica que quiero,
es tu sonrisa la que acelera mis
latidos y es tu mano la que siempre
deseo sujetar.
Es a tu lado donde siento que todo
tiene sentido y se tambien que eres
tu mi mas bonita decision.`;

const texto2 = `Me enamore de ti desde 
aquel instante en que llegaste a mi vida 
sin previo aviso cuando ni siquiera 
imaginaba que alguien tan especial como 
tu apareceria y es que contigo aprendi 
que el amor no se busca simplemente llega
y te transforma, desde el primer dia supe 
que habia algo distinto en ti, algo que te
hacia brillar mas que a las demas, algo
que me atrapo y me hizo sentir que eras
tu lo que siempre habia estado esperando.`;

function escribirPoema(el, texto, velocidad, callback){

    el.style.opacity = 1;
    el.innerHTML = "";
    let i = 0;

    let inter = setInterval(()=>{
        el.innerHTML += texto[i];
        i++;

        if(i >= texto.length){
            clearInterval(inter);
            if(callback) callback();
        }
    }, velocidad);
}

/* ==========================================
   INICIAR
========================================== */

function iniciar(){
    startBox.style.display = "none";
    audioInicio.volume = 0.6;
    audioInicio.play().catch(()=>{});
}
window.iniciar = iniciar;

/* ==========================================
   TRANSICIONES
========================================== */

function pasarAPoemas(){

    estado = "poemas";

    screenInicio.classList.remove("active");
    screenScene.classList.add("active");

    audioPoemas.volume = 0.6;
    audioPoemas.play().catch(()=>{});

    initSnow();
    crearOceano();

    escribirPoema(poemaLeft, texto1, 60, ()=>{
        escribirPoema(poemaRight, texto2, 60);
    });

    animar();
}

function pasarAFinal(){

    estado = "final";

    poemaLeft.style.display = "none";
    poemaRight.style.display = "none";
    contadorEl.style.display = "none";

    screenScene.classList.add("final");

    indiceOceano = 0;
    audioOceano.src = playlistOceano[indiceOceano];
    audioOceano.volume = 0.6;
    audioOceano.play().catch(()=>{});

    subtitulos.style.display = "block";
    iniciarSubtitulosCancion(indiceOceano);
}

/* ==========================================
   OCEANO
========================================== */

let particulas = [];
let tiempo = 0;

function crearOceano(){

    particulas = [];
    const capas = 7;

    for(let c = 0; c < capas; c++){

        let profundidad = c / capas;
        let cantidad = 400 + c * 200;

        for(let i=0;i<cantidad;i++){
            particulas.push({
                x: Math.random()*W,
                baseY: H*(0.45 + profundidad*0.55),
                profundidad: profundidad,
                amp: 40 + profundidad*120,
                freq: 0.002 + Math.random()*0.002,
                speed: 0.5 + profundidad*2,
                size: 1 + profundidad*3,
                fase: Math.random()*Math.PI*2
            });
        }
    }
}

function drawOcean(){

    for(let p of particulas){

        let y = p.baseY +
            Math.sin(p.x*p.freq + tiempo*p.speed + p.fase)*p.amp;

        p.x += p.profundidad*0.5;
        if(p.x > W) p.x = 0;

        let blue = 120 + p.profundidad*120;
        let alpha = 0.3 + p.profundidad*0.6;

        ctx.fillStyle = `rgba(0,${blue},255,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x,y,p.size,0,Math.PI*2);
        ctx.fill();
    }
}

/* ==========================================
   LOOP
========================================== */

function animar(){

    requestAnimationFrame(animar);
    tiempo += 0.01;

    ctx.clearRect(0,0,W,H);

    if(estado === "poemas"){
        drawSnow();
    }

    if(estado === "final"){
        drawOcean();
    }
}


