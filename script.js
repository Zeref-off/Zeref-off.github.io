const videoInput = document.getElementById("videoInput");
const videoPlayer = document.getElementById("videoPlayer");

videoInput.addEventListener("change", function() {
    const file = this.files[0];
    
    if (file) {
        const videoURL = URL.createObjectURL(file);
        videoPlayer.src = videoURL;
        videoPlayer.style.display = "block";
    }
});