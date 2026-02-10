// ===== CASCADA INICIAL =====
const cascada = document.getElementById("cascada");
const palabra = ["","F","A","T","U","M","","A","M","A","N","T","I","S",""];

for(let i=0;i<15;i++){
    let col=document.createElement("div");
    col.className="columna";
    col.style.animationDuration=(15+Math.random()*6)+"s";

    for(let j=0;j<12;j++){
        palabra.forEach(l=>{
            let span=document.createElement("span");
            span.className="letra";
            span.textContent=l;
            col.appendChild(span);
        });
    }
    cascada.appendChild(col);
}

// ===== INICIAR =====
document.getElementById("cuadro-iniciar").onclick=()=>{
    document.getElementById("pantalla-inicio").style.transform="scale(0)";
    document.getElementById("pantalla-inicio").style.opacity="0";

    setTimeout(()=>{
        document.getElementById("pantalla-inicio").style.display="none";
        document.getElementById("escena").style.display="block";
        iniciarGota();
    },1200);
};

// ===== GOTA =====
function iniciarGota(){
    const gota=document.getElementById("gota");
    gota.style.display="block";
    setTimeout(()=>gota.classList.add("caer"),100);

    setTimeout(crearOndas,2600);
}

// ===== ONDAS =====
function crearOndas(){
    const canvas=document.getElementById("ondas");
    const ctx=canvas.getContext("2d");
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    const x=canvas.width/2;
    const y=canvas.height*0.85;
    let r=0;

    function anim(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.strokeStyle="rgba(150,150,180,0.4)";
        ctx.lineWidth=2;

        for(let i=0;i<3;i++){
            ctx.beginPath();
            ctx.arc(x,y,r-i*40,0,Math.PI*2);
            ctx.stroke();
        }

        r+=1.5;
        if(r<200) requestAnimationFrame(anim);
        else setTimeout(dibujarArbol,500);
    }
    anim();
}

// ===== ÁRBOL + PÉTALOS =====
function dibujarArbol(){
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

    iniciarPetalos(canvas,ctx);
    mostrarPoemaIzq();
}

// pétalos
function iniciarPetalos(canvas,ctx){
    let petalos=[];
    for(let i=0;i<40;i++){
        petalos.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,
            s:Math.random()*3+2,
            vy:Math.random()*1+0.5,
            vx:Math.random()*0.6-0.3
        });
    }

    let viento=0.3;

    setInterval(()=>{
        viento = (Math.random()>0.5?1:-1)*(Math.random()*0.5);
    },4000);

    function anim(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        dibujarArbolBase(ctx,canvas);

        petalos.forEach(p=>{
            p.y+=p.vy;
            p.x+=viento;

            if(p.y>canvas.height){
                p.y=-10;
                p.x=Math.random()*canvas.width;
            }

            ctx.beginPath();
            ctx.arc(p.x,p.y,p.s,0,Math.PI*2);
            ctx.fillStyle="#ffc0cb";
            ctx.fill();
        });

        requestAnimationFrame(anim);
    }
    anim();
}

function dibujarArbolBase(ctx,canvas){
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
}

// ===== POEMAS =====
const poemaIzq=`Desde el día en que llegaste a mi vida,
todo empezó a tener sentido.
Las horas dejaron de ser vacías,
y mi mundo comenzó a latir contigo.

Eres calma en mis tormentas,
luz en mis días grises,
y en cada latido que llevo dentro,
tu nombre siempre existe.
`;

const poemaDer=`No sé cuánto dure la vida,
ni cuántos caminos vendrán,
pero sí sé algo con certeza:
siempre te volvería a elegir.

Porque entre millones de destinos,
entre el ruido del mundo y el tiempo,
mi lugar favorito siempre será
a tu lado.
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
    escribir(document.getElementById("poema-izq"),poemaIzq,25,mostrarPoemaDer);
}

function mostrarPoemaDer(){
    escribir(document.getElementById("poema-der"),poemaDer,25,iniciarContador);
}

// ===== CONTADOR =====
let tiempoTotal = 30*24*3600 + 14*3600 + 5*60 + 10;
const tiempoEl = document.getElementById("tiempo");
document.getElementById("contador").style.opacity=1;

function iniciarContador(){
    document.getElementById("contador").style.opacity=1;

    let normal=true;

    const intervalo=setInterval(()=>{
        tiempoTotal -= normal?1:50;

        if(tiempoTotal<0) tiempoTotal=0;

        let d=Math.floor(tiempoTotal/86400);
        let h=Math.floor((tiempoTotal%86400)/3600);
        let m=Math.floor((tiempoTotal%3600)/60);
        let s=tiempoTotal%60;

        tiempoEl.textContent=`${d} días ${h} horas ${m} minutos ${s} segundos`;

        if(tiempoTotal<2000) normal=false;

        if(tiempoTotal===0){
            clearInterval(intervalo);
            setTimeout(()=>{
                document.getElementById("escena").style.display="none";
                document.getElementById("final").style.display="flex";
            },1500);
        }

    },1000);
}



