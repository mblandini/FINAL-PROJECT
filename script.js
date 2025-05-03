document.addEventListener("DOMContentLoaded", function() {
    // Get the current page's path
    const currentPage = window.location.pathname;

    // If NOT on index.html or the root ("/"), add the button
    if (!(currentPage === "/" || currentPage.endsWith("homepage.html"))) {
        const button = document.createElement("button");
        button.id = "backButton";
        button.textContent = "BACK";
        button.onclick = function() {
            window.history.back();
        };

        document.body.insertBefore(button, document.body.firstChild); // Adds button at the top
    }
});

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const playIcon = document.getElementById("play-icon");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const songTitle = document.getElementById("song-title");
const timeDisplay = document.getElementById("time");

const playlist = [
  { title: "🎵 Song One", src: "song1.mp3" },
  { title: "🎶 Song Two", src: "song2.mp3" },
  { title: "🎧 Song Three", src: "song3.mp3" }
];

let currentSong = 0;

const playSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0f0" viewBox="0 0 24 24">
  <path d="M8 5v14l11-7z"/>
</svg>`;

const pauseSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0f0" viewBox="0 0 24 24">
  <path d="M6 5h4v14H6zm8 0h4v14h-4z"/>
</svg>`;

function loadSong(index) {
  const song = playlist[index];
  audio.src = song.src;
  songTitle.textContent = song.title;
  audio.load();
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playIcon.innerHTML = pauseSVG;
  } else {
    audio.pause();
    playIcon.innerHTML = playSVG;
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % playlist.length;
  loadSong(currentSong);
  audio.play();
  playIcon.innerHTML = pauseSVG;
}

function prevSong() {
  currentSong = (currentSong - 1 + playlist.length) % playlist.length;
  loadSong(currentSong);
  audio.play();
  playIcon.innerHTML = pauseSVG;
}

playBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", () => {
  let minutes = Math.floor(audio.currentTime / 60);
  let seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
  timeDisplay.textContent = `${minutes}:${seconds}`;
});


audio.addEventListener("ended", nextSong);

loadSong(currentSong);



