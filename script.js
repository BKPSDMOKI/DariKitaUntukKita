(function () {
  "use strict";
  var C = window.CONFIG || {};
  var $ = function (id) { return document.getElementById(id); };
  var KEY = "suara-bkpsdm-last";

  function msg(text, cls) { var m = $("msg"); m.textContent = text; m.className = "msg " + cls; }
  function configured() {
    return C.FORM_ACTION && C.ENTRY && ["jenis", "topik", "isi", "harapan", "setuju"].every(function (k) { return C.ENTRY[k]; });
  }
  function lastSent() { try { return Number(localStorage.getItem(KEY)) || 0; } catch (e) { return 0; } }
  function markSent() { try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {} }

  $("isi").addEventListener("input", function (e) { $("c1").textContent = e.target.value.length; });

  $("f").addEventListener("submit", function (e) {
    e.preventDefault();
    if ($("website").value) return; // bot

    if (!$("jenis").value || !$("topik").value || !$("isi").value.trim())
      return msg("Mohon lengkapi jenis, topik, dan isi masukan.", "err");
    if (!$("setuju").checked)
      return msg("Mohon centang pernyataan bebas SARA dan tidak menyudutkan.", "err");
    if (!configured())
      return msg("Halaman belum dihubungkan ke Google Form. Lengkapi config.js.", "err");

    var wait = (C.COOLDOWN_SECONDS || 0) * 1000 - (Date.now() - lastSent());
    if (wait > 0)
      return msg("Mohon tunggu " + Math.ceil(wait / 1000) + " detik sebelum mengirim lagi.", "err");

    var data = new URLSearchParams();
    data.append(C.ENTRY.jenis, $("jenis").value);
    data.append(C.ENTRY.topik, $("topik").value);
    data.append(C.ENTRY.isi, $("isi").value.trim());
    if ($("harapan").value.trim()) data.append(C.ENTRY.harapan, $("harapan").value.trim());
    data.append(C.ENTRY.setuju, "Saya menyatakan masukan ini bebas dari unsur SARA dan tidak menyudutkan pihak tertentu."); // harus sama persis dengan teks kotak centang di Google Form

    $("btn").disabled = true;
    fetch(C.FORM_ACTION, { method: "POST", mode: "no-cors", body: data })
      .then(function () {
        markSent();
        $("f").reset(); $("c1").textContent = "0";
        msg("Terima kasih, suara Anda sudah kami terima.", "ok");
      })
      .catch(function () { msg("Gagal mengirim. Periksa koneksi lalu coba lagi.", "err"); })
      .then(function () { $("btn").disabled = false; });
  });
})();
