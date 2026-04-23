const video = document.getElementById("videoPlayer");

// Lista de tus videos (ordénalos como quieras)
const playlist = [
    "LAS_RATAS_DE_MASON1.mp4",
    "LAS_RATAS_DE_MASON2.mp4",
    "LAS_RATAS_DE_MASON3.mp4",
    "LAS_RATAS_DE_MASON4.mp4",
    "LAS_RATAS_DE_MASON5.mp4",
    "LAS_RATAS_DE_MASON6.mp4",
    "LAS_RATAS_DE_MASON7.mp4",
    "LAS_RATAS_DE_MASON8.mp4",
    "LAS_RATAS_DE_MASON9.mp4",
    "LAS_RATAS_DE_MASON10.mp4",
    "LAS_RATAS_DE_MASON11.mp4",
    "LAS_RATAS_DE_MASON12.mp4",
    "LAS_RATAS_DE_MASON13.mp4",
    "LAS_RATAS_DE_MASON14.mp4",
    "LAS_RATAS_DE_MASON15.mp4",
    "LAS_RATAS_DE_MASON16.mp4",
    "LAS_RATAS_DE_MASON17.mp4",
    "LAS_RATAS_DE_MASON18.mp4",
    "LAS_RATAS_DE_MASON19.mp4"
];

let index = 0;

// Cuando termina un video
video.addEventListener("ended", () => {
    index++;

    if (index < playlist.length) {
        video.src = playlist[index];
        video.load();
        video.play();
    }
});