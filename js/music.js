const music = document.getElementById("bg-music");
const toggle = document.getElementById("musicToggle");

if (localStorage.getItem("musicAllowed") === "true") {
  music.src = "./music/lagu2.mp3";
  music.volume = 0.6;
  music.play().catch(() => {});
}

toggle.addEventListener("click", () => {
  if (music.paused) {
    music.play().catch(() => {});
    toggle.textContent = "🔊";
  } else {
    music.pause();
    toggle.textContent = "🔇";
  }
});
