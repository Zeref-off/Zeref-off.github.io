const cascade = document.getElementById("cascade");

/* ===== CASCADA REAL POR VENTANA ===== */

function createColumn(){
    const col = document.createElement("div");
    col.className="column";
    col.innerHTML="T<br>E<br>A<br>M<br>O<br>".repeat(10);

    const windowDiv = document.createElement("div");
    windowDiv.className="window";
    windowDiv.appendChild(col);

    cascade.appendChild(windowDiv);

    let pos = Math.random()*window.innerHeight;

    const speed = 0.3 + Math.random()*0.5;

    setInterval(()=>{
        pos += speed;
        if(pos > window.innerHeight) pos = -150;
        windowDiv.style.top = pos+"px";
    },20);
}

for(let i=0;i<30;i++){
    createColumn();
}

/* ===== TRANSICIÓN ===== */

const startBox = document.getElementById("startBox");
const page = document.getElementById("page");
const singularity = document.getElementById("singularity");

startBox.onclick = ()=>{
    startBox.style.display="none";

    page.style.transition="transform 1s ease";
    page.style.transform="scale(0)";

    singularity.style.display="block";

    setTimeout(drop,1200);
};

/* ===== GOTA ===== */

function drop(){
    singularity.style.transition="all 2s ease";
    singularity.style.width="12px";
    singularity.style.height="18px";
    singularity.style.borderRadius="50% 50% 60% 60%";
    singularity.style.top="85%";

    setTimeout(afterImpact,2000);
}

/* ===== IMPACTO ===== */

function afterImpact(){
    const water = document.getElementById("water");
    water.style.opacity=1;

    for(let i=0;i<3;i++){
        const r = document.createElement("div");
        r.className="ripple";
        r.style.animationDelay = (i*0.5)+"s";
        document.body.appendChild(r);
    }

    setTimeout(growTree,3000);
}

/* ===== ÁRBOL ===== */

function growTree(){
    const trunk = document.getElementById("trunk");
    trunk.style.height="400px";

    const tree = document.getElementById("tree");

    for(let i=0;i<50;i++){
        const leaf = document.createElement("div");
        leaf.className="leaf";
        leaf.style.left = (Math.random()*200-100)+"px";
        leaf.style.top = (Math.random()*400)+"px";
        leaf.style.animationDelay = Math.random()*8+"s";
        tree.appendChild(leaf);
    }

    setTimeout(showPoems,4000);
}

/* ===== POEMAS ===== */

const poem1 = `Eres la calma en mi tormenta,
la luz en mi oscuridad.
Cada momento contigo
se vuelve eternidad.`;

const poem2 = `Si el tiempo se detuviera,
solo pediría una cosa:
seguir a tu lado,
mi vida hermosa.`;

function typeText(el,text,callback){
    let i=0;
    el.style.opacity=1;
    const interval=setInterval(()=>{
        el.innerHTML+=text[i];
        i++;
        if(i>=text.length){
            clearInterval(interval);
            if(callback) callback();
        }
    },40);
}

function showPoems(){
    const left=document.getElementById("poemLeft");
    const right=document.getElementById("poemRight");
    const counter=document.getElementById("counter");

    typeText(left,poem1,()=>{
        typeText(right,poem2,()=>{
            counter.style.opacity=1;
        });
    });
}

/* ===== CONTADOR ===== */

let d=30,h=14,m=5,s=10;
const time=document.getElementById("time");

function update(){
    s--;
    if(s<0){s=59;m--;}
    if(m<0){m=59;h--;}
    if(h<0){h=23;d--;}
    if(d<0){d=0;}

    time.textContent=`${d} días ${h} horas ${m} minutos ${s} segundos`;
}

setInterval(update,1000);
update();


