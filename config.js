/* ===== PENGATURAN: hanya file ini yang perlu Anda edit =====
   Lihat README.md untuk cara mendapatkan nilai-nilainya.
   Catatan: nilai di sini terlihat publik di GitHub. Itu aman, karena
   hanya alamat tujuan kiriman, bukan kata sandi. */
window.CONFIG = {
  // Ganti /viewform pada link Google Form Anda menjadi /formResponse
  FORM_ACTION: "https://docs.google.com/forms/d/e/1FAIpQLSecZ3aei1xeB3sg6PSiAshRONQyh-Ebl0Z6I8OfGmnz-bVL2g/formResponse",

  // Nomor entry tiap pertanyaan di Google Form
  ENTRY: {
    jenis:   "entry.805193830",
    topik:   "entry.49788409",
    isi:     "entry.1342542468",
    harapan: "entry.1272257978",
    setuju:  "entry.2060580260"
  },

  // Jeda antar kiriman dari perangkat yang sama (detik), mencegah spam
  COOLDOWN_SECONDS: 30
};
