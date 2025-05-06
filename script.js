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
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const songTitle = document.getElementById("song-title");
const timeDisplay = document.getElementById("time");

const playlist = [
  { title: "Escape The Dragon", src: "assets/Escape The Dragon.wav" },
  { title: "Shrek's Home", src: "assets/Shrek's Home.wav"},
  { title: "The Little Match Girl", src: "assets/The Little Match Girl (Audio Demo).wav"},
];

let currentSong = 0;

// Load the song into the audio player
function loadSong(index) {
  const song = playlist[index];
  console.log("Loading song:", song.title);  // Debugging log
  audio.src = song.src;
  songTitle.textContent = song.title;
  audio.load();
}

// Play/Pause functionality
function playPause() {
  const playIconPath = document.getElementById("play-icon-path");
  const pauseIconPath = document.getElementById("pause-icon-path");
  
  if (audio.paused) {
    audio.play().catch(error => {
      console.error("Error playing audio:", error);
    });
    // Switch to Pause Icon
    playIconPath.style.display = "none";
    pauseIconPath.style.display = "block";
  } else {
    audio.pause();
    // Switch to Play Icon
    playIconPath.style.display = "block";
    pauseIconPath.style.display = "none";
  }
}

// Play the next song
function nextSong() {
  currentSong = (currentSong + 1) % playlist.length;
  loadSong(currentSong);
  audio.play().catch(error => console.error("Error playing next song:", error));
}

// Play the previous song
function prevSong() {
  currentSong = (currentSong - 1 + playlist.length) % playlist.length;
  loadSong(currentSong);
  audio.play().catch(error => console.error("Error playing previous song:", error));
}

// Event listeners
playBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Update the time display
audio.addEventListener("timeupdate", () => {
  let minutes = Math.floor(audio.currentTime / 60);
  let seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
  timeDisplay.textContent = `${minutes}:${seconds}`;
});

// When the song ends, go to the next song
audio.addEventListener("ended", nextSong);

// Initialize the first song
loadSong(currentSong);

