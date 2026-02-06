document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const toggle = document.getElementById("musicToggle");

  if (!music || !toggle) return;

  music.volume = 0.6;

  if (localStorage.getItem("musicAllowed") === "true") {
    setTimeout(() => {
      music.play().then(() => {
        toggle.textContent = "🔊";
      }).catch(() => {
        toggle.textContent = "🔇";
      });
    }, 300);
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
});
