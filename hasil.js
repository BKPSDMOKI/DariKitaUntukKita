(function () {
  "use strict";
  var C = window.CONFIG || {};
  var $ = function (id) { return document.getElementById(id); };
  var data = [], fJ = "", fT = "", q = "", present = false, idx = 0, rot = null;

  function parseCSV(t) {
    var rows = [], row = [], f = "", inq = false, i, ch;
    for (i = 0; i < t.length; i++) {
      ch = t[i];
      if (inq) {
        if (ch === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else inq = false; }
        else f += ch;
      } else if (ch === '"') inq = true;
      else if (ch === ",") { row.push(f); f = ""; }
      else if (ch === "\n" || ch === "\r") { if (ch === "\r" && t[i + 1] === "\n") i++; row.push(f); f = ""; rows.push(row); row = []; }
      else f += ch;
    }
    if (f || row.length) { row.push(f); rows.push(row); }
    return rows;
  }

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function count(key) { var m = {}; data.forEach(function (d) { m[d[key]] = (m[d[key]] || 0) + 1; }); return m; }

  function filtered() {
    var s = q.toLowerCase();
    return data.filter(function (d) {
      return (!fJ || d.jenis === fJ) && (!fT || d.topik === fT) &&
        (!s || (d.isi + " " + d.harapan).toLowerCase().indexOf(s) > -1);
    });
  }

  function card(d) {
    var c = el("article", "c2"); c.setAttribute("data-j", d.jenis);
    var tags = el("div", "tags");
    tags.appendChild(el("span", "tag j", d.jenis));
    tags.appendChild(el("span", "tag", d.topik));
    c.appendChild(tags);
    c.appendChild(el("p", "", d.isi));
    if (d.harapan) {
      var h = el("div", "hrp"); h.appendChild(el("b", "", "Harapan/solusi: ")); h.appendChild(document.createTextNode(d.harapan));
      c.appendChild(h);
    }
    return c;
  }

  function bars(title, map) {
    var box = el("div", "stat"); box.appendChild(el("h3", "", title));
    var keys = Object.keys(map).sort(function (a, b) { return map[b] - map[a]; });
    var max = keys.length ? map[keys[0]] : 1;
    keys.forEach(function (k) {
      var b = el("div", "bar");
      b.appendChild(el("span", "name", k));
      var tr = el("span", "track"), fl = el("span", "fill"); fl.style.width = (map[k] / max * 100) + "%"; tr.appendChild(fl);
      b.appendChild(tr); b.appendChild(el("span", "n", map[k]));
      box.appendChild(b);
    });
    return box;
  }

  function renderStats() {
    var s = $("stats"); s.textContent = "";
    var t = el("div", "stat"); t.appendChild(el("h3", "", "Total masukan tayang")); t.appendChild(el("div", "big", String(data.length)));
    s.appendChild(t); s.appendChild(bars("Per jenis", count("jenis"))); s.appendChild(bars("Per topik", count("topik")));
  }

  function chipRow(map, cur, setter) {
    Object.keys(map).forEach(function (k) {
      var b = el("button", "chip" + (cur === k ? " on" : ""), k + " (" + map[k] + ")");
      b.type = "button";
      b.onclick = function () { setter(cur === k ? "" : k); render(); };
      $("chips").appendChild(b);
    });
  }

  function render() {
    renderStats();
    $("chips").textContent = "";
    chipRow(count("jenis"), fJ, function (v) { fJ = v; });
    chipRow(count("topik"), fT, function (v) { fT = v; });
    var list = filtered(), g = $("grid"); g.textContent = "";
    $("state").textContent = data.length ? (list.length ? "" : "Tidak ada masukan yang cocok.") : "Belum ada masukan yang ditayangkan.";
    list.forEach(function (d) { g.appendChild(card(d)); });
    $("upd").textContent = "Diperbarui " + new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    if (present) showStage();
  }

  function showStage() {
    var list = filtered(), sc = $("stageCard"); sc.textContent = "";
    if (!list.length) { sc.appendChild(el("p", "state", "Belum ada masukan yang ditayangkan.")); $("stageNav").textContent = ""; return; }
    idx = idx % list.length;
    sc.appendChild(card(list[idx]));
    $("stageNav").textContent = (idx + 1) + " / " + list.length;
  }

  function setPresent(on) {
    present = on; $("stage").hidden = !on; clearInterval(rot);
    if (on) {
      idx = 0; showStage();
      rot = setInterval(function () { idx++; showStage(); }, 12000);
      if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(function () {});
    } else if (document.fullscreenElement) document.exitFullscreen();
  }

  function load() {
    if (!C.SHEET_CSV_URL) { $("state").textContent = "Halaman belum dihubungkan ke Google Sheets. Lengkapi SHEET_CSV_URL di config.js."; return; }
    var u = C.SHEET_CSV_URL + (C.SHEET_CSV_URL.indexOf("?") > -1 ? "&" : "?") + "t=" + Date.now();
    fetch(u).then(function (r) { if (!r.ok) throw 0; return r.text(); }).then(function (t) {
      data = parseCSV(t).slice(1).map(function (r) {
        return { jenis: (r[0] || "").trim(), topik: (r[1] || "").trim(), isi: (r[2] || "").trim(), harapan: (r[3] || "").trim() };
      }).filter(function (d) { return d.isi && d.isi.charAt(0) !== "#"; }).reverse();
      render();
    }).catch(function () { $("state").textContent = "Gagal memuat data. Periksa SHEET_CSV_URL dan pengaturan publikasi tab."; });
  }

  $("q").addEventListener("input", function (e) { q = e.target.value; render(); });
  $("btnReload").onclick = load;
  $("btnPresent").onclick = function () { setPresent(true); };
  $("btnExit").onclick = function () { setPresent(false); };
  document.addEventListener("keydown", function (e) {
    if (!present) return;
    if (e.key === "Escape") setPresent(false);
    if (e.key === "ArrowRight") { idx++; showStage(); }
    if (e.key === "ArrowLeft") { idx = Math.max(0, idx - 1); showStage(); }
  });
  document.addEventListener("fullscreenchange", function () { if (!document.fullscreenElement && present) setPresent(false); });

  load();
  setInterval(load, 60000);
})();
