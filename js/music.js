const music = document.getElementById("bg-music");
const toggle = document.getElementById("musicToggle");

if (music && toggle) {
  music.volume = 0.6;

  // delay biar browser siap
  setTimeout(() => {
    music.play().catch(() => {});
  }, 1200);

  toggle.addEventListener("click", () => {
    if (music.paused) {
      music.play().catch(() => {});
      toggle.textContent = "🔊";
    } else {
      music.pause();
      toggle.textContent = "🔇";
    }
  });
}
