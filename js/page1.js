/* ======================
   COUNTDOWN
====================== */
const targetDate = new Date("April 12, 2026 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;
  if (distance < 0) return;

  document.getElementById("days").innerText =
    Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById("hours").innerText =
    Math.floor((distance / (1000 * 60 * 60)) % 24);
  document.getElementById("minutes").innerText =
    Math.floor((distance / (1000 * 60)) % 60);
  document.getElementById("seconds").innerText =
    Math.floor((distance / 1000) % 60);
}, 1000);


/* ======================
   NAMA TAMU (1 KALI SAJA)
====================== */
const nameText =
  new URLSearchParams(window.location.search).get("to") ||
  "Nama Tamu Undangan";

const guestTarget = document.getElementById("guestName");

// reset isi (PENTING supaya tidak dobel)
guestTarget.textContent = "";

let i = 0;
function typeEffect() {
  if (i < nameText.length) {
    guestTarget.textContent += nameText.charAt(i);
    i++;
    setTimeout(typeEffect, 70);
  }
}
typeEffect();


/* ======================
   ANTI COPY (OPSIONAL)
====================== */
document.addEventListener("contextmenu", e => e.preventDefault());


// function openInvitation() {
//   // simpan izin user interaction
//   localStorage.setItem("allowMusic", "true");

//   document.body.classList.add("fade-out");

//   setTimeout(() => {
//     window.location.href = "page2.html";
//   }, 800);
// }
/* ======================
   OPEN INVITATION (KUNCI)
====================== */
document.getElementById("openInvitation")
  .addEventListener("click", () => {

    // 🔑 INI YANG DIBUTUHKAN CHROME
    localStorage.setItem("musicAllowed", "true");

    document.body.classList.add("fade-out");

    setTimeout(() => {
      window.location.href = "page2.html";
    }, 800);
  });

