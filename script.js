// ========================================
// JAVASCRIPT WEBSITE KANTIN BU MAY
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // NOMOR WHATSAPP ADMIN
    const nomorAdmin = "6281348219488";

    // DAFTAR HARGA MENU
    const daftarHarga = {
        "Dimsum Ayam Keju": 2000,
        "Indomie Goreng": 5000,
        "Es Teh Manis (Kecil)": 3000,
        "Es Teh Manis (Besar)": 4000,
        "Sosis Goreng": 1000,
        "Simba Sereal": 3000,
        "Nugget Crispy": 1000
    };


    // MENGAMBIL ELEMEN HTML
    const form = document.querySelector("#pesan form");
    const pilihanMenu = document.querySelector("#pilihan-menu");
    const jumlahInput = document.querySelector("#jumlah");
    const totalHarga = document.querySelector("#total-harga");


    // FORMAT RUPIAH
    function formatRupiah(angka) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(angka);
    }


    // ========================================
    // FUNGSI MENGHITUNG TOTAL HARGA
    // ========================================

    function hitungTotal() {

        const menu = pilihanMenu.value;
        const jumlah = parseInt(jumlahInput.value) || 0;

        const harga = daftarHarga[menu] || 0;
        const total = harga * jumlah;

        totalHarga.textContent = formatRupiah(total);

    }


    // MENGHITUNG SAAT MENU DIGANTI
    pilihanMenu.addEventListener("change", hitungTotal);


    // MENGHITUNG SAAT JUMLAH DIUBAH
    jumlahInput.addEventListener("input", hitungTotal);


    // ========================================
    // MEMILIH MENU DARI KARTU PRODUK
    // ========================================

    document.querySelectorAll(".kartu-menu a[href='#pesan']")
        .forEach(function (tombol) {

            tombol.addEventListener("click", function () {

                const kartu = tombol.closest(".kartu-menu");
                const namaMenu = kartu.querySelector("h3")
                    .textContent.trim();

                const opsi = Array.from(pilihanMenu.options)
                    .find(function (option) {

                        return option.value === namaMenu;

                    });

                if (opsi) {

                    pilihanMenu.value = opsi.value;

                    hitungTotal();

                }

            });

        });


    // ========================================
    // PROSES PEMESANAN
    // ========================================

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        // MENGAMBIL DATA PELANGGAN
        const nama = document.querySelector("#nama").value.trim();

        const nomorHP = document.querySelector("#email").value.trim();

        const menu = pilihanMenu.value;

        const jumlah = parseInt(jumlahInput.value);

        const catatan = document.querySelector("#catatan").value.trim();


        // VALIDASI NAMA
        if (nama === "") {

            alert("Nama pelanggan harus diisi!");

            return;

        }


        // VALIDASI NOMOR WHATSAPP
        if (!/^[0-9]{10,15}$/.test(nomorHP)) {

            alert("Masukkan nomor WhatsApp yang benar!");

            return;

        }


        // VALIDASI MENU
        if (menu === "") {

            alert("Silakan pilih menu terlebih dahulu!");

            return;

        }


        // VALIDASI JUMLAH
        if (isNaN(jumlah) || jumlah < 1 || jumlah > 100) {

            alert("Jumlah pesanan minimal 1 dan maksimal 100!");

            return;

        }


        // MENGAMBIL HARGA
        const harga = daftarHarga[menu];

        if (harga === undefined) {

            alert("Menu tidak ditemukan!");

            return;

        }


        // MENGHITUNG TOTAL
        const total = harga * jumlah;


        // MEMBUAT PESAN WHATSAPP
        const pesan =

            "HALO KANTIN BU MAY\n\n" +

            "Saya ingin memesan makanan/minuman.\n\n" +

            "Nama: " + nama + "\n" +

            "Nomor WhatsApp: " + nomorHP + "\n" +

            "Menu: " + menu + "\n" +

            "Harga: " + formatRupiah(harga) + "\n" +

            "Jumlah Pesanan: " + jumlah + "\n" +

            "Total Harga: " + formatRupiah(total) + "\n" +

            "Catatan: " + (catatan || "-") + "\n\n" +

            "Mohon konfirmasi pesanan saya. Terima kasih.";


        // MEMBUKA WHATSAPP
        const linkWhatsApp =

            "https://wa.me/" +

            nomorAdmin +

            "?text=" +

            encodeURIComponent(pesan);


        window.location.href = linkWhatsApp;

    });


    // ========================================
    // TAHUN OTOMATIS DI FOOTER
    // ========================================

    const tahun = document.querySelector("#tahun");

    if (tahun) {

        tahun.textContent = new Date().getFullYear();

    }


    // ========================================
    // TOMBOL KEMBALI KE ATAS
    // ========================================

    const tombolAtas = document.querySelector("#tombol-atas");

    if (tombolAtas) {

        tombolAtas.addEventListener("click", function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    // HITUNG TOTAL SAAT WEBSITE DIBUKA
    hitungTotal();

});