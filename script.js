/* ==========================================
   FATUM AMANTIS – CINE PREMIUM SECUENCIAL
   + CUARTA SECCIÓN: CORAZÓN NEÓN
========================================== */
const screenInicio = document.getElementById("screenInicio");
const screenScene = document.getElementById("screenScene");
const screenHeartNeon = document.getElementById("screenHeartNeon");
const startBox = document.getElementById("startBox");

const matrixCanvas = document.getElementById("matrixCanvas");
const mtx = matrixCanvas.getContext("2d");

const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");

const poemaLeft = document.getElementById("poemaLeft");
const poemaRight = document.getElementById("poemaRight");
const contadorEl = document.getElementById("contador");
const subtitulos = document.getElementById("subtitulos");

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
    
    // Redimensionar canvas del corazón neón si existe
    const heartCanvas = document.getElementById("heartNeonCanvas");
    if(heartCanvas){
        heartCanvas.width = W;
        heartCanvas.height = H;
    }
}
window.addEventListener("resize", resize);
resize();

/* ==========================================
   AUDIO SECUENCIAL
========================================== */
const audioInicio = new Audio("inicio.mp3");
const audioPoemas = new Audio("poemas.mp3");

// Playlist océano
const playlistOceano = [
    "oceano1.mp3",
    "oceano2.mp3",
    "oceano3.mp3",
    "oceano4.mp3",
    "oceano5.mp3"
];

let indiceOceano = 0;
const audioOceano = new Audio(playlistOceano[indiceOceano]);

// Audio para la cuarta sección - se reproduce UNA SOLA VEZ
const audioHeartNeon = new Audio("corazon_neon.mp3"); // Cambia este nombre por tu archivo
audioHeartNeon.loop = false; // Aseguramos que no se repita

/* ==========================================
   SUBTÍTULOS OCEANO (SECUENCIALES)
========================================== */
const subtitulosCanciones = [
    // Canción 1
    [
        "",
        "",
        "",
        "",
        "",
        "",
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
        "",
        "",
        "",
        "Todo lo que me quieras dar,",
        "quiero que me lo des",
        "Yo te doy todo lo que un hombre",
        "entrega a una mujer",
        "Y más allá de ese cariño que siempre me das, me",
        "imagino tantas cosas, quiero siempre más",
        "Tu eres mi dulce desayuno, mi pastel perfecto,",
        "mi bebida preferida, el plato predilecto",
        "Yo como y bebo de lo bueno y no tengo hora fija,",
        "de mañana, tarde o noche, no hago díeta",
        "Y ese amor que alimenta a mi fantasía,",
        "es mi sueño, es mi fiesta, es mi alegría",
        "La comida más sabrosa, mi perfume,",
        "mi bebida, es todo en mi vida",
        "",
        "",
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
        "lo que come, que bebe, que da, que recibe",
        "Pero el hombre que sabe querer",
        "y se apasiona por una mujer",
        "Convierte su amor en su vida,",
        "su comida y bebida en la justa medida",
        "Pero el hombre que sabe querer",
        "y se apasiona por una mujer",
        "Convierte su amor en su vida,",
        "su comida y bebida en la justa medida..."
    ],
    // Canción 2
    [
        "",
        "",
        "",
        "¿Cuándo dejaras de romper mi corazón?",
        "",
        "No quiero ser otro más",
        "Pagando por las cosas que nunca hice",
        "No dejes ir",
        "No dejes ir a mi amor",
        "",
        "",
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
        "",
        "Odio verte llorar",
        "Tu sonrisa es una hermosa mentira",
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
        "¿Cuándo dejaras de romper mi corazón?",
        "",
        "No dejes ir",
        "No dejes ir a mi amor",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Odio verte llorar",
        "Tu sonrisa es una hermosa mentira",
        "",
        "Odio verte llorar",
        "Mi amor esta muriendo por dentro",
        "",
        "",
        "Odio verte llorar",
        "Mi amor esta muriendo por dentro",
        "",
        "",
        "Odio verte llorar",
        "Tu sonrisa es una hermosa mentira",
        "Yo puedo arreglar todas esas mentiras",
        "Oh cariño, cariño, corro",
        "Pero estoy corriendo hacia ti",
        "No me verás llorar",
        "Me estoy escondiendo por dentro",
        "Mi corazon duele, pero estoy sonriendo para ti",
        "Oh cariño intentare hacer las cosas bien",
        "Te necesito mas que el aire cuando no estoy contigo",
        "Por favor no me preguntes por que",
        "Solo besame esta vez",
        "Mi unico sueño es sobre tu y yo",
        ""
    ],
    // Canción 3
    [
        "Dije ooh-ooh",
        "Vamos amor, apaga las luces",
        "",
        "Ooh-ooh",
        "Porque ya se esta haciendo tarde",
        "",
        "Dije ooh-ooh",
        "Sé que vas a intentar aguantar",
        "",
        "Ooh-ooh",
        "No deberías dudar",
        "Yo tenia amor para quemar",
        "Tú tenias el corazón herido",
        "",
        "Miradas que se cruzan en una habitación llena",
        "",
        "¿Dejamos que esto comience?",
        "",
        "Dije ooh-ooh",
        "Vamos amor, apaga las luces",
        "",
        "Ooh-ooh",
        "Porque ya se esta haciendo tarde",
        "",
        "Dije ooh-ooh",
        "Sé que vas a intentar aguantar",
        "",
        "Ooh-ooh",
        "No deberías dudar",
        "",
        "Yo tenia amor para quemar",
        "Tú tenias el corazón herido",
        "",
        "Miradas que se cruzan en una habitación llena",
        "",
        "¿Dejamos que esto comience?",
        "",
        "Dije ooh-ooh",
        "Vamos amor, apaga las luces",
        "",
        "Ooh-ooh",
        "Porque ya se esta haciendo tarde",
        "",
        "Dije ooh-ooh",
        "Sé que vas a intentar aguantar",
        "",
        "Ooh-ooh",
        "No deberías dudar",
        "",
        "Dije ooh-ooh",
        "Vamos amor, apaga las luces",
        "",
        "Ooh-ooh",
        "Porque ya se esta haciendo tarde",
        "",
        "Dije ooh-ooh",
        "Sé que vas a intentar aguantar",
        "",
        "Ooh-ooh",
        "No deberías dudar",
        "",
        ""
    ],
    // Canción 4
    [
        "",
        "",
        "Cuando estamos en",
        "una multitud riendo fuerte",
        "y nadie sabe por qué",
        "",
        "",
        "Cuando nos perdemos en",
        "el club emborrachándonos",
        "y me das esa sonrisa",
        "",
        "Volviendo a casa en",
        "la parte trasera de coche",
        "y tu mano toca con ma mía",
        "",
        "Cuando terminemos",
        "de hacer el amor",
        "y miras hacia arriba",
        "y me das esos ojos",
        "",
        "",
        "Porque todas las",
        "pequeñas cosas que haces",
        "Es lo que me recuerda",
        "porque me enamore de ti",
        "Y cuando estemos",
        "separados y te extrañe",
        "cierro los ojos y",
        "todo lo que veo es a ti",
        "y las pequeñas cosas que haces",
        "",
        "",
        "",
        "",
        "Cuando me llamas por la noche",
        "Mientras estas hablando",
        "con tus amigos",
        "",
        "Cada hola",
        "Cada adiós",
        "Cada te amo que has dicho",
        "",
        "",
        "Porque todas las",
        "pequeñas cosas que haces",
        "Es lo que me recuerda",
        "porque me enamore de ti",
        "Y cuando estemos",
        "separados y te extrañe",
        "",
        "cierro los ojos y",
        "todo lo que veo es a ti",
        "y las pequeñas cosas que haces",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Cuando terminemos",
        "de hacer el amor",
        "y miras hacia arriba",
        "y me das esos ojos",
        "",
        "Porque todas las",
        "pequeñas cosas que haces",
        "Es lo que me recuerda",
        "porque me enamore de ti",
        "Y cuando estemos",
        "separados y te extrañe",
        "cierro los ojos y",
        "todo lo que veo es a ti",
        "y las pequeñas cosas que haces",
        "",
        "",
        "",
        "",
        "y las pequeñas cosas que haces",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ]
    // Canción 5 → sin subtítulos
];

let intervaloEscritura;
let intervaloBorrado;
let indiceLinea = 0;

function escribirLineaSubtitulo(texto, callback){
    clearInterval(intervaloEscritura);
    clearInterval(intervaloBorrado);

    subtitulos.innerHTML = "";
    subtitulos.style.opacity = 1;

    let i = 0;

    intervaloEscritura = setInterval(()=>{
        subtitulos.innerHTML += texto[i];
        i++;

        if(i >= texto.length){
            clearInterval(intervaloEscritura);

            setTimeout(()=>{
                let contenido = subtitulos.innerHTML;

                intervaloBorrado = setInterval(()=>{
                    contenido = contenido.slice(0,-1);
                    subtitulos.innerHTML = contenido;

                    if(contenido.length === 0){
                        clearInterval(intervaloBorrado);
                        if(callback) callback();
                    }
                }, 18);
            }, 2200);
        }
    }, 50);
}

function iniciarSubtitulosCancion(indice){
    if(indice >= subtitulosCanciones.length){
        subtitulos.style.opacity = 0;
        return;
    }

    const lineas = subtitulosCanciones[indice];
    indiceLinea = 0;

    function siguiente(){
        if(indiceOceano !== indice) return;
        if(indiceLinea >= lineas.length) return;

        escribirLineaSubtitulo(lineas[indiceLinea], ()=>{
            indiceLinea++;
            siguiente();
        });
    }
    siguiente();
}

// Playlist - CORREGIDO para pasar a la cuarta sección después de la quinta canción
audioOceano.addEventListener("ended", () => {
    // Si estamos en la última canción (índice 4 = quinta canción)
    if(indiceOceano === 4) {
        // Pasar directamente al corazón neón sin reproducir más canciones
        pasarACorazonNeon();
        return;
    }
    
    // Si no es la última canción, avanzar a la siguiente
    indiceOceano++;
    audioOceano.src = playlistOceano[indiceOceano];
    audioOceano.play();
    iniciarSubtitulosCancion(indiceOceano);
});

/* ==========================================
   TRANSICIONES
========================================== */
let estado = "inicio"; // inicio → poemas → final → heartneon

/* ==========================================
   MATRIX
========================================== */
const matrixText = "Fatum Amantis";
const fontSize = 22;
let cols = Math.floor(W / fontSize);
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
            drops[i]=0;
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
const texto1 = `​El día que el destino se detuvo 
​Me rendí al silencio justo el día en que llegaste,
pensando que serías un rostro más entre la gente,
una historia fugaz que el tiempo borraría.
Pero el destino, cansado de verme andar a oscuras
bajo la lluvia de mis días más tristes,
decidió encender todas sus luces para guiarme a ti.
​Aquellas noches de desvelo no eran falta de sueño,
eran la falta de tu risa, de tu voz y de tu vida.
Desde entonces, mis sombras se volvieron amaneceres
porque tú eres la luz que me sostiene en la frustración,
el faro que me guía cuando el camino se pierde.
​Aprendí que mi corazón no late, sino que te nombra,
y que estos momentos, tan fugaces y a la vez eternos,
son la melodía que se quedó grabada en mi alma.
Hoy te amo con una intensidad que no entiende de distancias,
y te amaría con la misma fuerza en cada vida,
en cada reencuentro que el universo nos conceda.`;

const texto2 = `O es contigo, o con nadie 
​Si alguna vez olvidas lo magnifica que eres,
te prestaré mis ojos para que veas lo que yo veo:
una mujer que inspira mi versión más noble,
el sueño que se hizo realidad por fin. 
​Mi amor por ti no depende del tiempo ni del espacio,
es un sentimiento libre, eterno y profundamente tuyo.
Me niego a buscarte en otros rostros o en otras vidas,
pues ya no sé caminar si no es hacia tu encuentro.
Lo tengo claro: o es contigo, o prefiero la soledad,
porque nadie más tiene el idioma de tu alma.
​Gracias por enseñarme que amar es también entrega,
por sostenerme los sueños con la misma fe que yo.
Contigo aprendí que lo imposible no existe
siempre y cuando sea tu mano la que sostenga la mía.
Te amo hoy, y te amaré en cada latido que me quede`;

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
   INICIAR (BOTÓN)
========================================== */
function iniciar(){
    startBox.style.display = "none";
    audioInicio.currentTime = 0;
    audioInicio.volume = 0.6;
    audioInicio.play().catch(()=>{});
}
window.iniciar = iniciar;

/* ==========================================
   TRANSICIÓN A POEMAS
========================================== */
function pasarAPoemas(){
    estado = "poemas";
    screenInicio.classList.remove("active");
    screenScene.classList.add("active");

    audioPoemas.currentTime = 0;
    audioPoemas.volume = 0.6;
    audioPoemas.play().catch(()=>{});

    initSnow();
    crearOceano();

    escribirPoema(poemaLeft, texto1, 60, ()=>{
        escribirPoema(poemaRight, texto2, 60, ()=>{
            setTimeout(()=>{
                pasarAFinal();
            }, 5000);
        });
    });

    animar();
}

audioInicio.addEventListener("ended", pasarAPoemas);

/* ==========================================
   TRANSICIÓN A FINAL (OCÉANO)
========================================== */
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
   TRANSICIÓN A CORAZÓN NEÓN (CUARTA SECCIÓN)
========================================== */
function pasarACorazonNeon(){
    estado = "heartneon";
    
    // Detener audio del océano
    audioOceano.pause();
    audioOceano.currentTime = 0;
    
    // Ocultar pantalla del océano y mostrar corazón neón
    screenScene.classList.remove("active");
    screenHeartNeon.classList.add("active");
    
    // Reproducir audio del corazón neón (UNA SOLA VEZ)
    if(audioHeartNeon){
        audioHeartNeon.pause();
        audioHeartNeon.currentTime = 0;
        audioHeartNeon.volume = 0.6;
        audioHeartNeon.play().catch(()=>{
            console.log("No se pudo reproducir el audio de la cuarta sección");
        });
    }
    
    // Inicializar la animación del corazón neón
    initHeartNeon();
}

/* ==========================================
   OCEANO CINEMATOGRÁFICO ORIGINAL
========================================== */
let particulas = [];
let tiempo = 0;
let camX = 0;
let camY = 0;

function crearOceano(){
    particulas = [];

    const capas = 7;

    for(let c = 0; c < capas; c++){
        let profundidad = c / capas;
        let cantidad = 500 + c * 250;

        for(let i=0;i<cantidad;i++){
            particulas.push({
                x: Math.random()*W,
                baseY: H*(0.45 + profundidad*0.55),
                profundidad: profundidad,
                amp: 40 + profundidad*140,
                freq: 0.0015 + Math.random()*0.002,
                speed: 0.4 + profundidad*2,
                size: 1 + profundidad*3,
                fase: Math.random()*Math.PI*2
            });
        }
    }
}

function ola(p, t){
    let w1 = Math.sin(p.x*p.freq + t*p.speed + p.fase);
    let w2 = Math.sin(p.x*p.freq*0.5 + t*p.speed*0.7);
    let w3 = Math.sin(p.x*p.freq*2 + t*p.speed*1.2);
    return p.baseY + (w1 + w2*0.6 + w3*0.3)*p.amp;
}

function drawCielo(){
    let grad = ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,"rgba(0,8,20,0.6)");
    grad.addColorStop(1,"rgba(0,17,31,0.8)");

    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);

    let moonX = W * 0.8;
    let moonY = H * 0.15;

    let glow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 140);
    glow.addColorStop(0,"rgba(255,255,220,0.8)");
    glow.addColorStop(0.4,"rgba(255,255,220,0.4)");
    glow.addColorStop(1,"rgba(255,255,220,0)");

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 140, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle="#fff8cc";
    ctx.beginPath();
    ctx.arc(moonX, moonY, 40, 0, Math.PI*2);
    ctx.fill();
}

function drawOcean(){
    camX = Math.sin(tiempo*0.15)*18;
    camY = Math.sin(tiempo*0.12)*8;

    ctx.save();
    ctx.translate(camX, camY);

    for(let p of particulas){
        let y = ola(p, tiempo);

        p.x += p.profundidad*0.4;
        if(p.x > W) p.x = 0;

        let blue = 100 + p.profundidad*130;
        let alpha = 0.25 + p.profundidad*0.7;

        ctx.fillStyle = `rgba(0,${blue},255,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x,y,p.size,0,Math.PI*2);
        ctx.fill();

        let crest = Math.sin(p.x*p.freq + tiempo*p.speed + p.fase);
        if(crest>0.94 && p.profundidad>0.6){
            ctx.fillStyle="rgba(255,255,255,0.9)";
            ctx.beginPath();
            ctx.arc(p.x,y-p.size*2,p.size*1.2,0,Math.PI*2);
            ctx.fill();
        }
    }

    ctx.restore();
}

/* ==========================================
   CUARTA SECCIÓN - CORAZÓN NEÓN (PROYECTO 2)
========================================== */
let heartNeon = {
    particles: [],
    sparks: [],
    heartPath: [],
    phase: "float",
    pathIndex: 0,
    releaseIndex: 0,
    hue: 0,
    holdTimer: 0,
    floatTimer: 0,
    FLOAT_COUNT: 900,
    FLOAT_DELAY: 240,
    textoVisible: false,
    textoOpacity: 0
};

let heartCtx;
let heartCanvas;
let heartNeonAnimationFrame;

// Texto para mostrar en el centro
const textoCorazon = `Este no es el final, ven y dejame enseñarte: no solo 
representas a quien por tanto tiempo espere. Eres la pieza faltante que, sin 
previo aviso, llego a mi vida para completar mi ecuacion de Dirac.
Ahora, sin importar la distancia o el espacio que nos separe, sé que estamos 
entrelazados; que mi alma siempre vibrará en tu misma frecuencia y que, 
incluso en el silencio, seguiremos siendo uno solo.`;

function initHeartNeon(){
    heartCanvas = document.getElementById("heartNeonCanvas");
    if(!heartCanvas) return;
    
    heartCtx = heartCanvas.getContext("2d");
    heartCanvas.width = W;
    heartCanvas.height = H;
    
    // Reiniciar estado completamente
    heartNeon = {
        particles: [],
        sparks: [],
        heartPath: [],
        phase: "float",
        pathIndex: 0,
        releaseIndex: 0,
        hue: 0,
        holdTimer: 0,
        floatTimer: 0,
        FLOAT_COUNT: 900,
        FLOAT_DELAY: 240,
        textoVisible: false,
        textoOpacity: 0
    };
    
    createHeartNeonParticles();
    createHeartNeonPath();
    
    // Cancelar cualquier animación anterior
    if(heartNeonAnimationFrame) {
        cancelAnimationFrame(heartNeonAnimationFrame);
    }
    
    // Iniciar la animación
    animateHeartNeon();
}

function createHeartNeonParticles(){
    for(let i = 0; i < heartNeon.FLOAT_COUNT; i++){
        heartNeon.particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: 2 + Math.random() * 2,
            locked: false,
            assigned: false
        });
    }
}

function createHeartNeonPath(){
    heartNeon.heartPath = [];
    const scale = Math.min(W, H) / 40;
    const cx = W / 2;
    const cy = H / 2;

    for(let t = 0; t < Math.PI * 2; t += 0.01){
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

        heartNeon.heartPath.push({
            x: cx + x * scale,
            y: cy + y * scale,
            particle: null
        });
    }

    // Encontrar el punto más alto para comenzar desde ahí
    let topIndex = 0;
    for(let i = 1; i < heartNeon.heartPath.length; i++){
        if(heartNeon.heartPath[i].y < heartNeon.heartPath[topIndex].y){
            topIndex = i;
        }
    }

    heartNeon.heartPath = heartNeon.heartPath.slice(topIndex).concat(heartNeon.heartPath.slice(0, topIndex));
}

function drawHeartNeonShape(x, y, size, color, glow = 1){
    if(!heartCtx) return;
    
    heartCtx.save();
    heartCtx.translate(x, y);
    heartCtx.scale(size / 5, size / 5);

    heartCtx.beginPath();
    heartCtx.moveTo(0, 0);
    heartCtx.bezierCurveTo(0, -3, -5, -3, -5, 0);
    heartCtx.bezierCurveTo(-5, 3, 0, 5, 0, 8);
    heartCtx.bezierCurveTo(0, 5, 5, 3, 5, 0);
    heartCtx.bezierCurveTo(5, -3, 0, -3, 0, 0);

    heartCtx.shadowBlur = 15 * glow;
    heartCtx.shadowColor = color;
    heartCtx.fillStyle = color;
    heartCtx.fill();
    heartCtx.restore();
}

function getFreeHeartNeonParticle(x, y){
    let minDist = 999999;
    let chosen = null;

    heartNeon.particles.forEach(p => {
        if(!p.assigned){
            let dx = p.x - x;
            let dy = p.y - y;
            let d = dx * dx + dy * dy;
            if(d < minDist){
                minDist = d;
                chosen = p;
            }
        }
    });

    if(chosen){
        chosen.assigned = true;
        chosen.locked = true;
    }

    return chosen;
}

function createHeartNeonSpark(x, y, color){
    heartNeon.sparks.push({
        x, y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 1) * 2,
        life: 1,
        color
    });
}

function updateHeartNeonSparks(){
    for(let i = heartNeon.sparks.length - 1; i >= 0; i--){
        let s = heartNeon.sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05;
        s.life -= 0.02;
        if(s.life <= 0) heartNeon.sparks.splice(i, 1);
    }
}

function updateHeartNeon(){
    if(!heartNeon) return;
    
    heartNeon.hue += 0.5;
    if(heartNeon.hue > 360) heartNeon.hue = 0;
    const color = `hsl(${heartNeon.hue},100%,60%)`;

    // Movimiento flotante
    heartNeon.particles.forEach(p => {
        if(!p.locked){
            p.x += p.vx;
            p.y += p.vy;

            if(p.x < 0 || p.x > W) p.vx *= -1;
            if(p.y < 0 || p.y > H) p.vy *= -1;
        }
    });

    // FASE FLOAT
    if(heartNeon.phase === "float"){
        heartNeon.floatTimer++;
        heartNeon.textoVisible = false;
        heartNeon.textoOpacity = 0;

        if(heartNeon.floatTimer > heartNeon.FLOAT_DELAY){
            heartNeon.floatTimer = 0;
            heartNeon.pathIndex = 0;
            heartNeon.phase = "forming";
        }
    }

    // FORMACIÓN
    if(heartNeon.phase === "forming"){
        heartNeon.pathIndex += 2;
        heartNeon.textoVisible = false;
        heartNeon.textoOpacity = 0;

        if(heartNeon.pathIndex < heartNeon.heartPath.length){
            let point = heartNeon.heartPath[Math.floor(heartNeon.pathIndex)];

            if(!point.particle){
                point.particle = getFreeHeartNeonParticle(point.x, point.y);
            }

            createHeartNeonSpark(point.x, point.y, color);
        }
        else{
            heartNeon.phase = "hold";
            heartNeon.holdTimer = 0;
        }
    }

    // HOLD - El texto aparece cuando el corazón está completo
    if(heartNeon.phase === "hold"){
        heartNeon.holdTimer++;
        heartNeon.textoVisible = true;
        if(heartNeon.textoOpacity < 1) {
            heartNeon.textoOpacity += 0.01;
        }

        if(heartNeon.holdTimer > 120){
            heartNeon.phase = "releasing";
            heartNeon.releaseIndex = 0;
        }
    }

    // DESINTEGRACIÓN - El texto permanece visible
    if(heartNeon.phase === "releasing"){
        heartNeon.releaseIndex += 2;
        heartNeon.textoVisible = true;
        heartNeon.textoOpacity = 1;

        if(heartNeon.releaseIndex < heartNeon.heartPath.length){
            let point = heartNeon.heartPath[Math.floor(heartNeon.releaseIndex)];

            if(point.particle){
                let p = point.particle;
                p.locked = false;
                p.assigned = false;
                p.vx = (Math.random() - 0.5) * 1.2;
                p.vy = (Math.random() - 0.5) * 1.2;
                point.particle = null;
                createHeartNeonSpark(point.x, point.y, color);
            }
        }
        else{
            heartNeon.textoVisible = false;
            heartNeon.textoOpacity = 0;
            heartNeon.phase = "float";
        }
    }

    // Mover partículas asignadas
    heartNeon.heartPath.forEach(point => {
        if(point.particle){
            let p = point.particle;
            p.x += (point.x - p.x) * 0.12;
            p.y += (point.y - p.y) * 0.12;
        }
    });

    updateHeartNeonSparks();
}

function drawHeartNeon(){
    if(!heartCtx || !heartNeon) return;
    
    heartCtx.clearRect(0, 0, W, H);
    const color = `hsl(${heartNeon.hue},100%,60%)`;

    // Dibujar partículas
    heartNeon.particles.forEach(p => {
        drawHeartNeonShape(p.x, p.y, p.size, color, 1);
    });

    // Dibujar chispas
    heartNeon.sparks.forEach(s => {
        heartCtx.globalAlpha = s.life;
        heartCtx.shadowBlur = 10;
        heartCtx.shadowColor = s.color;
        heartCtx.fillStyle = s.color;
        heartCtx.fillRect(s.x, s.y, 2, 2);
    });
    heartCtx.globalAlpha = 1;

    // Esfera sincronizada - forming
    if(heartNeon.phase === "forming"){
        let point = heartNeon.heartPath[Math.floor(heartNeon.pathIndex)];
        if(point){
            heartCtx.beginPath();
            heartCtx.arc(point.x, point.y, 4, 0, Math.PI * 2);
            heartCtx.fillStyle = color;
            heartCtx.shadowBlur = 25;
            heartCtx.shadowColor = color;
            heartCtx.fill();
        }
    }

    // Esfera sincronizada - releasing
    if(heartNeon.phase === "releasing"){
        let point = heartNeon.heartPath[Math.floor(heartNeon.releaseIndex)];
        if(point){
            heartCtx.beginPath();
            heartCtx.arc(point.x, point.y, 4, 0, Math.PI * 2);
            heartCtx.fillStyle = color;
            heartCtx.shadowBlur = 25;
            heartCtx.shadowColor = color;
            heartCtx.fill();
        }
    }

    // Dibujar texto
    if(heartNeon.textoVisible || heartNeon.textoOpacity > 0) {
        heartCtx.save();
        heartCtx.font = 'bold 16px "Arial", "Helvetica", sans-serif';
        heartCtx.textAlign = 'center';
        heartCtx.textBaseline = 'middle';
        heartCtx.fillStyle = `hsla(${heartNeon.hue}, 100%, 70%, ${heartNeon.textoOpacity})`;
        heartCtx.shadowBlur = 20;
        heartCtx.shadowColor = `hsl(${heartNeon.hue}, 100%, 60%)`;
        
        const lineas = textoCorazon.split('\n');
        const centroX = W / 2;
        const centroY = H / 2;
        const lineHeight = 24;
        const startY = centroY - (lineas.length * lineHeight) / 2;
        
        lineas.forEach((linea, index) => {
            heartCtx.fillText(linea, centroX, startY + index * lineHeight);
        });
        
        heartCtx.restore();
    }
}

function animateHeartNeon(){
    if(estado !== "heartneon") return;
    
    updateHeartNeon();
    drawHeartNeon();
    
    heartNeonAnimationFrame = requestAnimationFrame(animateHeartNeon);
}

/* ==========================================
   LOOP PRINCIPAL (para escenas 1-3)
========================================== */
function animar(){
    requestAnimationFrame(animar);
    tiempo += 0.01;

    ctx.clearRect(0,0,W,H);

    if(estado === "poemas"){
        drawSnow();
    }

    if(estado === "final"){
        drawCielo();
        drawOcean();
    }
}


