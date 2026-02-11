window.onload = function () {

const matrixContainer = document.getElementById("matrix");
const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const scene = document.getElementById("scene");
const counter = document.getElementById("counter");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ======================
   MATRIX "Fatum Amantis"
====================== */
const text = "FATUMAMANTIS";
for (let i = 0; i < 12; i++) {
    const col = document.createElement("div");
    col.className = "column";
    col.style.animationDuration = (6 + Math.random() * 6) + "s";

    for (let j = 0; j < 20; j++) {
        const span = document.createElement("span");
        span.textContent = text[Math.floor(Math.random() * text.length)];
        col.appendChild(span);
    }

    matrixContainer.appendChild(col);
}

/* ======================
   BOTÓN INICIAR
====================== */
startBtn.onclick = () => {
    intro.style.display = "none";
    scene.classList.remove("hidden");
    drawTree();
    startCounter();
};

/* ======================
   ÁRBOL (base visual)
====================== */
function drawTree() {
    function branch(x, y, length, angle, width) {
        if (length < 8) {
            ctx.fillStyle = "pink";
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
            return;
        }

        ctx.strokeStyle = "#5a3b1a";
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(x, y);

        const x2 = x + length * Math.cos(angle);
        const y2 = y - length * Math.sin(angle);

        ctx.lineTo(x2, y2);
        ctx.stroke();

        branch(x2, y2, length * 0.7, angle - 0.3, width * 0.7);
        branch(x2, y2, length * 0.7, angle + 0.3, width * 0.7);
    }

    branch(canvas.width / 2, canvas.height, 160, Math.PI / 2, 24);
}

/* ======================
   CONTADOR
====================== */
let totalSeconds = 30 * 24 * 3600 + 10 * 3600 + 5 * 60 + 39;

function startCounter() {
    updateCounter();

    const interval = setInterval(() => {
        totalSeconds -= 5; // velocidad acelerada
        updateCounter();

        if (totalSeconds <= 0) {
            clearInterval(interval);
            disintegrate();
        }
    }, 50);
}

function updateCounter() {
    let s = totalSeconds;

    const days = Math.floor(s / 86400);
    s %= 86400;
    const hours = Math.floor(s / 3600);
    s %= 3600;
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;

    counter.textContent =
        days + " días " +
        hours + " horas " +
        minutes + " minutos " +
        seconds + " segundos";
}

/* ======================
   DESINTEGRACIÓN / PARTÍCULAS
====================== */
let particles = [];

function disintegrate() {
    for (let i = 0; i < 800; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 2,
            color: Math.random() > 0.5 ? "#66ccff" : "#ffffff"
        });
    }

    animateParticles();
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y > canvas.height) p.y = canvas.height;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 2, 2);
    });

    requestAnimationFrame(animateParticles);
}

};

