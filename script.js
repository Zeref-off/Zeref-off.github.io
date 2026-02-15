/* ==========================================
   FATUM AMANTIS – CINE PREMIUM SECUENCIAL
========================================== */
const screenHeart = document.getElementById("screenHeart");
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
   AUDIO SECUENCIAL
========================================== */

// Escena 1
const audioInicio = new Audio("inicio.mp3");

// Escena 2
const audioPoemas = new Audio("poemas.mp3");

// Escena 3 (playlist)
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

    // Escribir
    intervaloEscritura = setInterval(()=>{
        subtitulos.innerHTML += texto[i];
        i++;

        if(i >= texto.length){
            clearInterval(intervaloEscritura);

            // Pausa antes de borrar
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

    // Canción 5 o fuera de rango → ocultar
    if(indice >= subtitulosCanciones.length){
        subtitulos.style.opacity = 0;
        return;
    }

    const lineas = subtitulosCanciones[indice];
    indiceLinea = 0;

    function siguiente(){

        // Seguridad: si cambió de canción, detener
        if(indiceOceano !== indice) return;

        if(indiceLinea >= lineas.length) return;

        escribirLineaSubtitulo(lineas[indiceLinea], ()=>{
            indiceLinea++;
            siguiente();
        });
    }

    siguiente();
}


// Playlist en bucle
audioOceano.addEventListener("ended", () => {

    indiceOceano++;

    // Si terminó la última canción → mostrar corazón
    if(indiceOceano >= playlistOceano.length){
        mostrarEscenaCorazon();
        return;
    }

    audioOceano.src = playlistOceano[indiceOceano];
    audioOceano.play();

    iniciarSubtitulosCancion(indiceOceano);
});


// Transiciones automáticas
audioInicio.addEventListener("ended", pasarAPoemas);
audioPoemas.addEventListener("ended", pasarAFinal);

/* ==========================================
   ESTADOS
========================================== */

let estado = "inicio"; // inicio → poemas → final

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

    // Oculta solo el botón
    startBox.style.display = "none";

    // Reproducir música de la primera escena
    audioInicio.currentTime = 0;
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

    audioPoemas.currentTime = 0;
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
        drawCielo();
        drawOcean();
    }
}

/* ==========================================
   ESCENA FINAL – CORAZÓN
========================================== */

function mostrarEscenaCorazon(){

    estado = "heart";

    // Ocultar escena del océano
    screenScene.classList.remove("active");

    // Mostrar nueva pantalla
    if(screenHeart){
        screenHeart.classList.add("active");
    }

    // Ocultar subtítulos
    if(subtitulos){
        subtitulos.style.opacity = 0;
    }

    // Detener audio
    audioOceano.pause();
}









