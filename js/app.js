document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     ⏳ TUNGGU FIREBASE SIAP
  ================================ */
  function waitFirebase(cb) {
    if (window.firebase && window.db) cb();
    else setTimeout(() => waitFirebase(cb), 200);
  }

  waitFirebase(init);

  function init() {

    /* ===============================
       🔐 ADMIN MODE
    ================================ */
    const isAdmin =
      new URLSearchParams(window.location.search).get("admin") === "111213";

    /* ===============================
       📖 FIRESTORE
    ================================ */
    const guestbookRef = db.collection("guestbook");
    const container = document.getElementById("messages-container");
    const form = document.getElementById("guestbook-form");
    const loadMoreBtn = document.getElementById("load-more-btn");

    const LIMIT = 5;
    let lastDoc = null;

    /* ===============================
       🏷️ LABEL
    ================================ */
    function labelAttendance(v) {
      return {
        hadir: "✓ Hadir",
        tidak_hadir: "✗ Tidak Hadir",
        belum_tahu: "? Belum Tahu"
      }[v] || "";
    }

    /* ===============================
       🧱 RENDER
    ================================ */
    function renderMessage(doc) {
      const d = doc.data();

      // PROTEKSI DATA RUSAK
      if (!d.name || !d.message || !d.createdAtClient) return;

      const el = document.createElement("div");
      el.className = "glass-card rounded-xl p-5 shadow-md";
      el.innerHTML = `
        <div class="flex justify-between items-start mb-2">
          <div>
            <strong>${d.name}</strong>
            <div class="text-xs">${labelAttendance(d.attendance)}</div>
          </div>
          ${
            isAdmin
              ? `<button onclick="deleteMessage('${doc.id}')" class="text-red-500 text-sm">🗑️</button>`
              : ""
          }
        </div>
        <p class="text-sm">${d.message}</p>
      `;
      container.appendChild(el);
    }

    /* ===============================
       📥 LOAD DATA (AMAN REFRESH)
    ================================ */
    async function loadMessages(loadMore = false) {

      let q = guestbookRef
        .orderBy("createdAtClient", "desc")
        .limit(LIMIT);

      if (loadMore && lastDoc) q = q.startAfter(lastDoc);

      const snap = await q.get();

      if (!loadMore) {
        container.innerHTML = "";
        lastDoc = null;
      }

      snap.forEach(doc => renderMessage(doc));
      lastDoc = snap.docs[snap.docs.length - 1];

      loadMoreBtn.style.display =
        snap.size === LIMIT ? "block" : "none";
    }

    loadMoreBtn?.addEventListener("click", () => loadMessages(true));

    /* ===============================
       🗑️ DELETE (ADMIN)
    ================================ */
    window.deleteMessage = async id => {
      if (!isAdmin) return;
      if (!confirm("Hapus ucapan ini?")) return;
      await guestbookRef.doc(id).delete();
      loadMessages();
    };

    /* ===============================
       ✍️ SUBMIT
    ================================ */
    if (form) {
      form.addEventListener("submit", async e => {
        e.preventDefault();

        const name = document.getElementById("guest-name").value.trim();
        const message = document.getElementById("guest-message").value.trim();
        const attendance =
          document.querySelector('input[name="attendance"]:checked')?.value ||
          "belum_tahu";

        if (!name || !message) return;

        await guestbookRef.add({
          name,
          message,
          attendance,

          // 🔥 PALING AMAN
          createdAtClient: Date.now(),
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        form.reset();
        setTimeout(loadMessages, 300);
      });
    }

    /* ===============================
       🚀 INIT
    ================================ */
    loadMessages();
  }
});
