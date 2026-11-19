/* ===== PENGATURAN: hanya file ini yang perlu Anda edit =====
   Lihat README.md untuk cara mendapatkan nilai-nilainya.
   Catatan: nilai di sini terlihat publik di GitHub. Itu aman, karena
   hanya alamat tujuan kiriman, bukan kata sandi. */
window.CONFIG = {
  // Ganti /viewform pada link Google Form Anda menjadi /formResponse
  FORM_ACTION: "", // contoh: "https://docs.google.com/forms/d/e/XXXX/formResponse"

  // Nomor entry tiap pertanyaan di Google Form
  ENTRY: {
    jenis:   "", // contoh: "entry.1111111111"
    topik:   "",
    isi:     "",
    harapan: "",
    setuju:  ""
  },

  // Jeda antar kiriman dari perangkat yang sama (detik), mencegah spam
  COOLDOWN_SECONDS: 30
};
