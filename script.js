window.addEventListener("DOMContentLoaded", function(){

const matrix = document.getElementById("matrix");
const startBox = document.getElementById("startBox");
const intro = document.getElementById("intro");
const scene = document.getElementById("scene");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const counter = document.getElementById("counter");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ======================
   MATRIX VERTICAL REAL
====================== */

const phrase = ["F","A","T","U","M"," ","A","M","A","N","T","I","S"];

function createColumn(){
    const col = document.createElement("div");
    col.className = "column";
    col.style.animationDuration = (8 + Math.random()*6) + "s";

    for(let i=0;i<30;i++){
        const span = document.createElement("span");
        span.textContent = phrase[i % phrase.length];
        col.appendChild(span);
    }

    matrix.appendChild(col);
}

/* crear varias columnas */
for(let i=0;i<14;i++){
    createColumn();
}

/* ======================
   INICIAR
====================== */

startBox.onclick = function(){
    intro.style.display = "none";
    scene.style.display = "block";
    startScene();
};

/* ======================
   ESCENA BÁSICA (para confirmar funcionamiento)
====================== */

let totalSeconds = 30*86400 + 10*3600 + 5*60 + 39;

function startScene(){
    drawTree();
    startCounter();
}

/* Árbol simple base */
function drawTree(){
    function branch(x,y,len,angle,width){
        if(len<8){
            ctx.fillStyle="pink";
            ctx.fillRect(x,y,3,3);
            return;
        }

        ctx.strokeStyle="#5a3b1a";
        ctx.lineWidth=width;
        ctx.beginPath();
        ctx.moveTo(x,y);

        let x2 = x + len*Math.cos(angle);
        let y2 = y - len*Math.sin(angle);

        ctx.lineTo(x2,y2);
        ctx.stroke();

        branch(x2,y2,len*0.7,angle-0.3,width*0.7);
        branch(x2,y2,len*0.7,angle+0.3,width*0.7);
    }

    branch(canvas.width/2, canvas.height, 160, Math.PI/2, 24);
}

/* Contador */
function startCounter(){
    setInterval(()=>{
        totalSeconds -= 5;
        if(totalSeconds < 0) totalSeconds = 0;
        updateCounter();
    },100);
}

function updateCounter(){
    let s = totalSeconds;

    let d = Math.floor(s/86400);
    s%=86400;
    let h = Math.floor(s/3600);
    s%=3600;
    let m = Math.floor(s/60);
    let sec = s%60;

    counter.textContent =
        d+" días "+h+" horas "+m+" minutos "+sec+" segundos";
}

});

