// ===== CASCADA REAL =====
const cascade = document.getElementById("cascade");

function createColumn(){
    const col = document.createElement("div");
    col.className="column";
    col.innerHTML="T<br>E<br>A<br>M<br>O";
    col.style.animationDuration = (6 + Math.random()*6) + "s";
    col.style.animationDelay = Math.random()*5 + "s";
    cascade.appendChild(col);
}

for(let i=0;i<30;i++){
    createColumn();
}

// ===== INICIAR =====
const startBox = document.getElementById("startBox");
const singularity = document.getElementById("singularity");

startBox.onclick = ()=>{
    startBox.style.display="none";
    cascade.style.transition="transform 1s";
    cascade.style.transform="scale(0)";
    
    singularity.style.display="block";
    
    setTimeout(dropAnimation,1200);
};

// ===== GOTA =====
function dropAnimation(){
    singularity.style.transition="all 2s ease";
    singularity.style.top="85%";
    singularity.style.width="12px";
    singularity.style.height="18px";
    singularity.style.borderRadius="50% 50% 60% 60%";
    
    setTimeout(afterDrop,2000);
}

// ===== DESPUES DEL IMPACTO =====
function afterDrop(){
    document.getElementById("water").style.opacity=1;
    
    // Ondas
    document.querySelectorAll(".ripple").forEach((r,i)=>{
        r.style.animationDelay = i*0.5 + "s";
        r.style.opacity=1;
    });
    
    setTimeout(growTree,3000);
}

// ===== CRECIMIENTO DEL ARBOL =====
function growTree(){
    const trunk = document.getElementById("trunk");
    trunk.style.height="400px";
    
    // ramas simuladas
    for(let i=0;i<40;i++){
        const leaf = document.createElement("div");
        leaf.className="leaf";
        leaf.style.left = (Math.random()*200-100) + "px";
        leaf.style.top = (Math.random()*400) + "px";
        leaf.style.animationDelay = Math.random()*6 + "s";
        document.getElementById("tree").appendChild(leaf);
    }
    
    setTimeout(showPoems,4000);
}

// ===== POEMAS =====
const poem1 = `Eres la calma en mi tormenta,
la luz en mi oscuridad.
Cada momento contigo
se convierte en eternidad.`;

const poem2 = `Si el tiempo se detuviera,
solo pediría una cosa:
seguir mirándote,
mi amor, mi vida hermosa.`;

function typeText(element,text,callback){
    let i=0;
    element.style.opacity=1;
    const interval = setInterval(()=>{
        element.innerHTML += text[i];
        i++;
        if(i>=text.length){
            clearInterval(interval);
            if(callback) callback();
        }
    },40);
}

function showPoems(){
    const left = document.getElementById("poemLeft");
    const right = document.getElementById("poemRight");
    const counter = document.getElementById("counter");
    
    typeText(left,poem1,()=>{
        typeText(right,poem2,()=>{
            counter.style.opacity=1;
            accelerateCounter();
        });
    });
}

// ===== CONTADOR =====
let days=30, hours=14, minutes=5, seconds=10;
const timeEl = document.getElementById("time");

function updateTime(){
    seconds--;
    if(seconds<0){seconds=59;minutes--;}
    if(minutes<0){minutes=59;hours--;}
    if(hours<0){hours=23;days--;}
    if(days<0){days=0;hours=0;minutes=0;seconds=0;}
    
    timeEl.textContent=`${days} días ${hours} horas ${minutes} minutos ${seconds} segundos`;
}

setInterval(updateTime,1000);

// Aceleración final
function accelerateCounter(){
    const fast = setInterval(()=>{
        seconds-=5;
        if(seconds<=0){
            days=0;hours=0;minutes=0;seconds=0;
            updateTime();
            clearInterval(fast);
        }
    },100);
}


