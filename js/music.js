const music = document.getElementById("bg-music");
const toggle = document.getElementById("musicToggle");
const openBtn = document.getElementById("openInvitation");

let musicStarted = false;

openBtn.addEventListener("click", () => {
  // tampilkan page 2 di sini (kalau ada)
  toggle.style.display = "inline-block";

  if (!musicStarted) {
    music.volume = 0.6;
    music.play().then(() => {
      musicStarted = true;
      toggle.textContent = "🔊";
    }).catch(err => {
      console.log("Audio blocked:", err);
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

