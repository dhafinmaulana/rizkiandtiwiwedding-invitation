document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const openBtn = document.getElementById("openInvitation");
  const toggle = document.getElementById("musicToggle");

  if (!music || !openBtn || !toggle) return;

  let started = false;
  music.volume = 0.6;

  openBtn.addEventListener("click", () => {
    toggle.style.display = "inline-block";

    if (!started) {
      music.play()
        .then(() => {
          started = true;
          toggle.textContent = "🔊";
        })
        .catch(() => {
          toggle.textContent = "🔇";
        });
    }
  });

  toggle.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      toggle.textContent = "🔊";
    } else {
      music.pause();
      toggle.textContent = "🔇";
    }
  });
});
