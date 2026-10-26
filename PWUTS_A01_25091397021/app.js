$(function () {
  // Memuat halaman fitur ke dalam index tanpa reload.
  function muat(url) {
    $("#main-content").load(url, function (_response, status) {
      if (status === "error") {
        $("#main-content").html('<div class="notice error">Konten gagal dimuat. Jalankan melalui Live Server atau localhost.</div>');
      }
    });
  }

  // Navigasi AJAX untuk menu kalkulator dan pemesanan.
  $(document).on("click", ".nav-ajax", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    if (url) {
      muat(url);
      $("#main-content")[0].scrollIntoView({ behavior: "smooth", block: "start" });
      $("#nav-links").removeClass("open");
    }
  });

  $("#menu-toggle").on("click", function () {
    $("#nav-links").toggleClass("open");
  });

  // Kalkulator: total = tarif x halaman x rangkap.
  $(document).on("submit", "#form-kalkulator", function (event) {
    event.preventDefault();
    var tarif = Number($("#jenis-cetak").val());
    var halaman = Number($("#jumlah-halaman").val());
    var rangkap = Number($("#jumlah-rangkap").val());

    if (!tarif || !Number.isInteger(halaman) || halaman < 1 ||
        !Number.isInteger(rangkap) || rangkap < 1) {
      $("#hasil-kalkulator").addClass("invalid").html(
        "<span>Periksa kembali input kamu.</span><strong>Data belum valid</strong><small>Pilih layanan dan masukkan halaman serta rangkap berupa bilangan bulat minimal 1.</small>"
      );
      return;
    }

    var total = tarif * halaman * rangkap;
    $("#hasil-kalkulator").removeClass("invalid").html(
      "<span>Perkiraan total biaya</span><strong>" + formatRupiah(total) +
      "</strong><small>" + halaman + " halaman × " + rangkap +
      " rangkap. Harga akhir dapat menyesuaikan kebutuhan cetak.</small>"
    );
  });

  // Form transaksi: validasi sebelum simulasi pesanan ditampilkan.
  $(document).on("submit", "#form-transaksi", function (event) {
    event.preventDefault();
    var nama = $("#nama-pelanggan").val().trim();
    var layanan = $("#layanan-pesanan").val();
    var halaman = Number($("#halaman-pesanan").val());
    var rangkap = Number($("#rangkap-pesanan").val());
    var catatan = $("#catatan-pesanan").val().trim();

    if (!nama || !layanan) {
      tampilkanPesan("Nama pelanggan dan layanan wajib diisi.", true);
      return;
    }
    if (!Number.isInteger(halaman) || halaman < 1 ||
        !Number.isInteger(rangkap) || rangkap < 1) {
      tampilkanPesan("Halaman dan rangkap harus berupa bilangan bulat minimal 1.", true);
      return;
    }

    var tarif = tarifLayanan(layanan);
    var total = tarif * halaman * rangkap;
    tampilkanPesan("Pesanan berhasil dibuat sebagai simulasi. Data belum dikirim ke server.", false);

    // Gunakan text() agar input pengguna ditampilkan sebagai teks biasa.
    $("#ringkasan-pesanan").prop("hidden", false).empty()
      .append($("<h3>").text("Ringkasan Pesanan"))
      .append($("<p>").text("Nama: " + nama))
      .append($("<p>").text("Layanan: " + layanan))
      .append($("<p>").text("Jumlah: " + halaman + " halaman × " + rangkap + " rangkap"))
      .append($("<p>").text("Catatan: " + (catatan || "-")))
      .append($("<div>").addClass("summary-total").text("Perkiraan total: " + formatRupiah(total)));
  });

  function tarifLayanan(layanan) {
    if (layanan === "Fotokopi hitam putih") return 300;
    if (layanan === "Print hitam putih") return 500;
    return 1500;
  }

  function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency", currency: "IDR", maximumFractionDigits: 0
    }).format(angka);
  }

  function tampilkanPesan(pesan, error) {
    $("#pesan-transaksi").removeClass("success error")
      .addClass(error ? "error" : "success").text(pesan);
  }
});
