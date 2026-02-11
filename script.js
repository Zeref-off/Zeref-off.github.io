// Esperar a que todo cargue
window.onload = function () {

const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const scene = document.getElementById("scene");

const poemLeft = document.querySelector(".left");
const poemRight = document.querySelector(".right");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const treeCanvas = document.getElementById("treeCanvas");
const tctx = treeCanvas.getContext("2d");

const particleCanvas = document.getElementById("particleCanvas");
const pctx = particleCanvas.getContext("2d");

treeCanvas.width = window.innerWidth;
treeCanvas.height = window.innerHeight;
particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

let countdownInterval;
let particles = [];
let phase = "tree";

startBtn.onclick = () => {
intro.style.display = "none";
scene.classList.remove("hidden");

```
drawTree();

// Mostrar poemas
setTimeout(() => poemLeft.classList.add("showPoem"), 500);
setTimeout(() => poemRight.classList.add("showPoem"), 1500);

// Ocultarlos
setTimeout(() => poemLeft.classList.add("hidePoem"), 7000);
setTimeout(() => {
    poemRight.classList.add("hidePoem");
    startCountdownFast();
}, 9000);
```

};

// Árbol frondoso y tronco grueso
function drawTree() {
const w = treeCanvas.width / 2;
const h = treeCanvas.height;

```
tctx.clearRect(0, 0, treeCanvas.width, treeCanvas.height);

function branch(x, y, len, angle, width) {
    if (len < 10) {
        // hojas (más densas)
        for (let i = 0; i < 3; i++) {
            tctx.fillStyle = "rgba(0,150,0,0.8)";
            tctx.beginPath();
            tctx.arc(x, y, 6, 0, Math.PI * 2);
            tctx.fill();
        }
        return;
    }

    tctx.lineWidth = width;
    tctx.strokeStyle = "#5a3b1a";
    tctx.beginPath();
    tctx.moveTo(x, y);

    const x2 = x + len * Math.cos(angle);
    const y2 = y - len * Math.sin(angle);

    tctx.lineTo(x2, y2);
    tctx.stroke();

    branch(x2, y2, len * 0.75, angle - 0.3, width * 0.7);
    branch(x2, y2, len * 0.75, angle + 0.3, width * 0.7);
}

// Tronco grueso
branch(w, h, 120, Math.PI / 2, 22);
```

}

// Contador rápido
function startCountdownFast() {
let totalSeconds = 10; // cuenta corta para efecto

```
countdownInterval = setInterval(() => {
    totalSeconds--;

    let d = Math.floor(totalSeconds / 86400);
    let h = Math.floor((totalSeconds % 86400) / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;

    daysEl.textContent = d;
    hoursEl.textContent = h;
    minutesEl.textContent = m;
    secondsEl.textContent = s;

    if (totalSeconds <= 0) {
        clearInterval(countdownInterval);
        phase = "ocean";
        createParticles();
        animateParticles();
    }
}, 200); // rápido
```

}

// Crear partículas desde el árbol
function createParticles() {
for (let i = 0; i < 800; i++) {
particles.push({
x: treeCanvas.width / 2,
y: treeCanvas.height / 2,
vx: (Math.random() - 0.5) * 6,
vy: Math.random() * 4,
size: Math.random() * 2 + 1
});
}
}

// Animación partículas: océano → corazón
let startTime = null;

function animateParticles(timestamp) {
if (!startTime) startTime = timestamp;
const elapsed = (timestamp - startTime) / 1000;

```
pctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

particles.forEach(p => {

    if (phase === "ocean") {
        p.vy += 0.02;
        p.x += p.vx;
        p.y += p.vy;

        // simular olas
        p.y += Math.sin(p.x * 0.02 + elapsed * 3) * 0.5;

        if (elapsed > 10) {
            phase = "heart";
        }
    }

    if (phase === "heart") {
        // atraer al centro formando corazón
        let t = Math.atan2(p.y - particleCanvas.height/2, p.x - particleCanvas.width/2);
        let hx = 16 * Math.pow(Math.sin(t),3);
        let hy = -(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));

        hx = hx * 10 + particleCanvas.width/2;
        hy = hy * 10 + particleCanvas.height/2;

        p.x += (hx - p.x) * 0.02;
        p.y += (hy - p.y) * 0.02;
    }

    pctx.fillStyle = "rgba(150,200,255,0.8)";
    pctx.fillRect(p.x, p.y, p.size, p.size);
});

requestAnimationFrame(animateParticles);
```

}
};

