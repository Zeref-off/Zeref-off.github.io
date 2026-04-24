const homeScreen = document.getElementById("homeScreen");
const playerScreen = document.getElementById("playerScreen");
const video = document.getElementById("videoPlayer");
const background = document.getElementById("background");

// Películas
const movies = {
    pelicula1: ["PELI1/LAS_RATAS_DE_MASON1.mp4", "PELI1/LAS_RATAS_DE_MASON2.mp4", "PELI1/LAS_RATAS_DE_MASON3.mp4", "PELI1/LAS_RATAS_DE_MASON4.mp4", "PELI1/LAS_RATAS_DE_MASON5.mp4", "PELI1/LAS_RATAS_DE_MASON6.mp4", "PELI1/LAS_RATAS_DE_MASON7.mp4","PELI1/LAS_RATAS_DE_MASON8.mp4", "PELI1/LAS_RATAS_DE_MASON9.mp4", "PELI1/LAS_RATAS_DE_MASON10.mp4", "PELI1/LAS_RATAS_DE_MASON11.mp4", "PELI1/LAS_RATAS_DE_MASON12.mp4", "PELI1/LAS_RATAS_DE_MASON13.mp4", "PELI1/LAS_RATAS_DE_MASON14.mp4", "PELI1/LAS_RATAS_DE_MASON15.mp4", "PELI1/LAS_RATAS_DE_MASON16.mp4", "PELI1/LAS_RATAS_DE_MASON17.mp4", "PELI1/LAS_RATAS_DE_MASON18.mp4", "PELI1/LAS_RATAS_DE_MASON19.mp4", "PELI1/LAS_RATAS_DE_MASON20.mp4"],
    pelicula2: ["PELI2/PESCA_DE_NOCHE1.mp4", "PELI2/PESCA_DE_NOCHE2.mp4", "PELI2/PESCA_DE_NOCHE3.mp4", "PELI2/PESCA_DE_NOCHE4.mp4", "PELI2/PESCA_DE_NOCHE5.mp4", "PELI2/PESCA_DE_NOCHE6.mp4", "PELI2/PESCA_DE_NOCHE7.mp4", "PELI2/PESCA_DE_NOCHE8.mp4", "PELI2/PESCA_DE_NOCHE9.mp4", "PELI2/PESCA_DE_NOCHE10.mp4", "PELI2/PESCA_DE_NOCHE11.mp4", "PELI2/PESCA_DE_NOCHE12.mp4", "PELI2/PESCA_DE_NOCHE13.mp4", "PELI2/PESCA_DE_NOCHE14.mp4", "PELI2/PESCA_DE_NOCHE15.mp4", "PELI2/PESCA_DE_NOCHE16.mp4", "PELI2/PESCA_DE_NOCHE17.mp4", "PELI2/PESCA_DE_NOCHE18.mp4", "PELI2/PESCA_DE_NOCHE19.mp4", "PELI2/PESCA_DE_NOCHE20.mp4", "PELI2/PESCA_DE_NOCHE21.mp4", "PELI2/PESCA_DE_NOCHE22.mp4", "PELI2/PESCA_DE_NOCHE23.mp4", "PELI2/PESCA_DE_NOCHE24.mp4", "PELI2/PESCA_DE_NOCHE25.mp4", "PELI2/PESCA_DE_NOCHE26.mp4", "PELI2/PESCA_DE_NOCHE27.mp4", "PELI2/PESCA_DE_NOCHE28.mp4"],
    pelicula3: ["PELI3/SIBLUE1.mp4", "PELI3/SIBLUE2.mp4", "PELI3/SIBLUE3.mp4", "PELI3/SIBLUE4.mp4", "PELI3/SIBLUE5.mp4", "PELI3/SIBLUE6.mp4", "PELI3/SIBLUE7.mp4", "PELI3/SIBLUE8.mp4", "PELI3/SIBLUE9.mp4", "PELI3/SIBLUE10.mp4", "PELI3/SIBLUE11.mp4", "PELI3/SIBLUE12.mp4", "PELI3/SIBLUE13.mp4", "PELI3/SIBLUE14.mp4", "PELI3/SIBLUE15.mp4", "PELI3/SIBLUE16.mp4", "PELI3/SIBLUE17.mp4", "PELI3/SIBLUE18.mp4", "PELI3/SIBLUE19.mp4", "PELI3/SIBLUE20.mp4", "PELI3/SIBLUE21.mp4", "PELI3/SIBLUE22.mp4", "PELI3/SIBLUE23.mp4"]
};

let currentList = [];
let index = 0;

// CLICK EN PELÍCULA
document.querySelectorAll(".card img").forEach(imgEl => {
    imgEl.addEventListener("click", (e) => {
        const card = e.target.closest(".card");

        const movie = card.dataset.movie;
        const img = card.dataset.img;

        currentList = movies[movie];
        index = 0;

        background.src = img;

        homeScreen.classList.add("hidden");

        setTimeout(() => {
            homeScreen.classList.remove("active");
            playerScreen.classList.add("active");
            playVideo();
        }, 400);
    });
});

// REPRODUCIR VIDEO
function playVideo() {
    video.src = currentList[index];
    video.load();

    video.play().then(() => {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        }
    }).catch(() => {});
}

// SECUENCIA
video.addEventListener("ended", () => {
    index++;

    if (index < currentList.length) {
        playVideo();
    } else {
        // Salir de fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }

        // Limpiar video (evita pantalla negra)
        video.pause();
        video.src = "";
        video.load();

        // Volver al inicio SIN mover layout
        playerScreen.classList.remove("active");
        homeScreen.classList.add("active");

        setTimeout(() => {
            homeScreen.classList.remove("hidden");
        }, 50);
    }
});

