/* ---------- CASCADA TE AMO ---------- */

const cascada = document.getElementById("cascada");
const letras = ["T","E","A","M","O"];

for(let i=0;i<18;i++){
    let col=document.createElement("div");
    col.className="columna";
    col.style.animationDuration=(10+Math.random()*6)+"s";

    for(let j=0;j<12;j++){
        letras.forEach(l=>{
            let s=document.createElement("span");
            s.className="letra";
            s.textContent=l;
            col.appendChild(s);
        });
    }
    cascada.appendChild(col);
}

/* ---------- INICIAR (AGUJERO NEGRO) ---------- */

document.getElementById("cuadro-iniciar").onclick=()=>{

    const inicio=document.getElementById("pantalla-inicio");
    inicio.style.transform="scale(0)";
    inicio.style.opacity="0";

    setTimeout(()=>{
        inicio.style.display="none";
        document.getElementById("escena").style.display="block";
        iniciarGota();
    },1200);
};

/* ---------- GOTA ---------- */

function iniciarGota(){
    const gota=document.getElementById("gota");
    gota.style.display="block";

    setTimeout(()=>{
        gota.classList.add("caer");
    },100);

    setTimeout(crearOndas,2600);
}

/* ---------- ONDAS ---------- */

function crearOndas(){
    const canvas=document.getElementById("ondas");
    const ctx=canvas.getContext("2d");

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    let r=0;
    const x=canvas.width/2;
    const y=canvas.height*0.85;

    function anim(){
        ctx.clearRect(0,0,canvas.width,canvas.height);

        ctx.strokeStyle="rgba(200,200,255,0.5)";
        ctx.lineWidth=2;

        for(let i=0;i<4;i++){
            ctx.beginPath();
            ctx.arc(x,y,r-i*30,0,Math.PI*2);
            ctx.stroke();
        }

        r+=2;

        if(r<180){
            requestAnimationFrame(anim);
        }else{
            setTimeout(iniciarArbol,500);
        }
    }

    anim();
}

/* ---------- ARBOL ---------- */

function iniciarArbol(){
    const canvas=document.getElementById("arbolCanvas");
    const ctx=canvas.getContext("2d");

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    function rama(x,y,l,a,g){
        if(l<8) return;

        const x2=x+Math.cos(a)*l;
        const y2=y+Math.sin(a)*l;

        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x2,y2);
        ctx.lineWidth=g;
        ctx.strokeStyle="#3b1f0f";
        ctx.stroke();

        if(l<25){
            ctx.beginPath();
            ctx.arc(x2,y2,3,0,Math.PI*2);
            ctx.fillStyle="#ffb6c1";
            ctx.fill();
        }

        rama(x2,y2,l*0.7,a-0.4,g*0.7);
        rama(x2,y2,l*0.7,a+0.4,g*0.7);
    }

    rama(canvas.width/2,canvas.height*0.85,130,-Math.PI/2,8);

    mostrarPoemaIzq();
}

/* ---------- POEMAS ---------- */

const poema1=`Desde que llegaste a mi vida,
todo empezó a tener sentido.
Mi mundo cambió sin avisar,
y mi corazón te hizo su destino.
`;

const poema2=`No importa el tiempo ni la distancia,
ni los días que vendrán.
Si tengo tu amor conmigo,
lo tengo todo en realidad.
`;

function escribir(el,texto,vel,cb){
    el.style.opacity=1;
    let i=0;
    function t(){
        if(i<texto.length){
            el.innerHTML+=texto[i++];
            setTimeout(t,vel);
        }else if(cb) cb();
    }
    t();
}

function mostrarPoemaIzq(){
    escribir(document.getElementById("poema-izq"),poema1,30,mostrarPoemaDer);
}

function mostrarPoemaDer(){
    escribir(document.getElementById("poema-der"),poema2,30,iniciarContador);
}

/* ---------- CONTADOR ---------- */

let total=30*86400+14*3600+5*60+10;
const tiempoEl=document.getElementById("tiempo");

function iniciarContador(){
    document.getElementById("contador").style.opacity=1;

    let normal=true;

    const int=setInterval(()=>{
        total-=normal?1:50;
        if(total<0) total=0;

        let d=Math.floor(total/86400);
        let h=Math.floor((total%86400)/3600);
        let m=Math.floor((total%3600)/60);
        let s=total%60;

        tiempoEl.textContent=`${d} días ${h} horas ${m} minutos ${s} segundos`;

        if(total<2000) normal=false;

        if(total===0){
            clearInterval(int);
            setTimeout(()=>{
                document.getElementById("escena").style.display="none";
                document.getElementById("final").style.display="flex";
            },1500);
        }

    },1000);
}


