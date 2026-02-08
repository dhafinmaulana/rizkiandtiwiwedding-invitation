document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const toggle = document.getElementById("musicToggle");

  if (!music || !toggle) return;

  music.volume = 0.6;
  let playing = false;

  toggle.addEventListener("click", () => {
    if (!playing) {
      music.play().then(() => {
        toggle.textContent = "🔊";
        playing = true;
      }).catch(() => {
        alert("Tap sekali lagi untuk memulai musik");
      });
    } else {
      music.pause();
      toggle.textContent = "🔇";
      playing = false;
    }
  });
});
