# Suara Anda untuk BKPSDM

Website sederhana untuk masukan anonim (saran, kritik membangun, pertanyaan).
Isian dikirim ke Google Form Anda. Tidak ada data identitas yang dikumpulkan.

## Isi folder
- `index.html` : halaman utama
- `style.css` : tampilan
- `script.js` : logika pengiriman
- `config.js` : **satu-satunya file yang perlu Anda edit**

## 1. Siapkan Google Form
Buat form dengan 5 pertanyaan, urut:
1. Jenis masukan (dropdown): Pertanyaan, Saran, Kritik membangun, Apresiasi
2. Topik (dropdown): Pengembangan kompetensi, Layanan kepegawaian, Karier & mutasi, Tata kelola pegawai/kantor BKPSDM, Webinar NGOPI, Lainnya
3. Isi masukan (paragraf)
4. Harapan atau solusi (paragraf, tidak wajib)
5. Pernyataan setuju (jawaban singkat)

Pengaturan: jangan kumpulkan email, dan matikan "Batasi hingga 1 tanggapan".
Teks dropdown harus **sama persis** dengan yang ada di `index.html`.

## 2. Ambil kode untuk config.js
- `FORM_ACTION`: salin link form, ganti akhiran `/viewform` menjadi `/formResponse`.
- `ENTRY`: buka form lewat Pratinjau, klik kanan > Lihat sumber halaman, cari `entry.`
  Setiap pertanyaan punya nomor (contoh `entry.1234567890`).
  Alternatif: menu titik tiga di form > "Dapatkan link isi otomatis", isi semua kolom, lalu lihat nomor entry di link hasilnya.

## 3. Pasang di GitHub Pages
1. Buat repository baru di GitHub (public), misalnya `suara-bkpsdm`.
2. Unggah keempat file (Add file > Upload files), lalu Commit.
3. Buka Settings > Pages > Source: **Deploy from a branch**, Branch: `main`, folder `/ (root)`, Save.
4. Tunggu 1-2 menit. Alamatnya: `https://NAMA-GITHUB-ANDA.github.io/suara-bkpsdm/`
5. Bagikan link/QR code di Zoom.

## Catatan
- Uji dulu: kirim satu masukan percobaan, lalu cek tab Respons di Google Form.
- Repository public, jadi isi `config.js` bisa dilihat orang. Aman, karena hanya alamat tujuan kiriman. Masukan yang masuk hanya bisa dibaca pemilik Google Form.
- Orang yang tahu alamat formResponse bisa mengirim spam langsung. Pantau tab Respons dan hapus yang tidak pantas.
