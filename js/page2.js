document.addEventListener("DOMContentLoaded", () => {
  if (!window.db) {
    console.error("Firestore belum siap");
    return;
  }

  const isAdmin =
    new URLSearchParams(window.location.search).get("admin") === "111213";

  const LIMIT = 5;
  let lastDoc = null;

  const guestbookRef = window.db.collection("guestbook");
  const container = document.getElementById("messages-container");
  const loadMoreBtn = document.getElementById("load-more-btn");

  function labelAttendance(val) {
    return {
      hadir: "✓ Hadir",
      tidak_hadir: "✗ Tidak Hadir",
      belum_tahu: "? Belum Tahu"
    }[val] || "";
  }

  function renderMessage(doc) {
    const msg = doc.data();
    const div = document.createElement("div");

    div.className = "glass-card rounded-xl p-5 shadow-md";
    div.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <div>
          <strong>${msg.name}</strong>
          <div class="text-xs">${labelAttendance(msg.attendance)}</div>
        </div>
        ${
          isAdmin
            ? `<button onclick="deleteMessage('${doc.id}')"
                 class="text-red-500 text-sm">🗑️</button>`
            : ""
        }
      </div>
      <p class="text-sm">${msg.message}</p>
    `;

    container.appendChild(div);
  }

  async function loadMessages(loadMore = false) {
    let query = guestbookRef
      .orderBy("createdAt", "desc")
      .limit(LIMIT);

    if (loadMore && lastDoc) {
      query = query.startAfter(lastDoc);
    }

    const snap = await query.get();

    if (!loadMore) container.innerHTML = "";

    snap.forEach(doc => renderMessage(doc));

    lastDoc = snap.docs[snap.docs.length - 1];

    loadMoreBtn.style.display =
      snap.size === LIMIT ? "block" : "none";
  }

  window.deleteMessage = async function (id) {
    if (!isAdmin) return;
    if (!confirm("Hapus ucapan ini?")) return;

    await guestbookRef.doc(id).delete();
    loadMessages();
  };

  const form = document.getElementById("guestbook-form");

if (form) {
  form.addEventListener("submit", async e => {
    e.preventDefault();

    const nameInput = document.getElementById("guest-name");
    const messageInput = document.getElementById("guest-message");

    if (!nameInput || !messageInput) {
      alert("Form tidak lengkap");
      return;
    }

    const name = document.getElementById("guest-name").value.trim();
    const message = document.getElementById("guest-message").value.trim();


    const attendance =
      document.querySelector('input[name="attendance"]:checked')?.value ||
      "belum_tahu";

    if (!name || !message) {
      alert("Nama dan ucapan wajib diisi");
      return;
    }

    try {
      await guestbookRef.add({
        name,
        message,
        attendance,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      form.reset();
      loadMessages();
    } catch (err) {
      console.error("Gagal kirim ucapan:", err);
      alert("Gagal mengirim ucapan");
    }
  });
}










 