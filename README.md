# CopyKuy — Sistem Website Fotokopi

**Nama:** Mochammad Zacky Firmansyah  
**NIM:** 25091397021  
**Mata kuliah:** UTS Pemrograman Web

## Bagian yang dikerjakan
- **2.a Layout utama:** `index.html` berisi navbar, katalog layanan dan harga, petunjuk pemesanan, serta footer responsif.
- **2.b Fitur interaktif:** `views/interaktif.html` berisi kalkulator biaya cetak berdasarkan tarif, jumlah halaman, dan rangkap.
- **2.c Form transaksi:** `views/transaksi.html` berisi form pemesanan dengan nama pelanggan, layanan, jumlah halaman, rangkap, dan catatan.

## Teknologi
HTML, CSS, JavaScript, dan jQuery.

## Cara menjalankan
1. Buka folder proyek di Visual Studio Code.
2. Jalankan `index.html` menggunakan ekstensi Live Server.
3. Pastikan koneksi internet aktif untuk memuat jQuery dari CDN.
4. Gunakan menu **Kalkulator** untuk menghitung biaya dan **Pesan Sekarang** untuk mencoba form.

## Validasi
- Nama pelanggan dan layanan wajib diisi.
- Jumlah halaman dan rangkap wajib bilangan bulat minimal 1.
- Kalkulator menghitung tarif × halaman × rangkap.
- Navigasi AJAX memuat halaman kalkulator dan pemesanan tanpa memuat ulang seluruh halaman.

## Catatan
Proyek ini merupakan simulasi front-end. Data pesanan belum disimpan ke database atau dikirim ke server.
