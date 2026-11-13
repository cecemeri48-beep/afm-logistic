# Website Resmi PT Advanced Freight Management Global Logistic (AFM GL)

Website profil perusahaan logistik interaktif, modern, cepat, dan mobile-first untuk **PT AFM Global Logistic** (Jasa Pengurusan Transportasi - JPT KBLI 52311 & Freight Forwarding, Makassar).

---

## 🚀 Fitur Utama

1. **Mobile-First & Clean Corporate Design:**
   - Desain modern bernuansa Maritime Navy & Gold Accent tanpa AI-slop.
   - Logo asli PT AFM GL (`afm-logo.png`) sebagai identitas utama dengan ornamen mahkota watermark elegan di header dan footer.
   - Indikator status operasional aktif & menu responsive dengan tombol aksi WhatsApp Admin.
   - Hero Showcase Multimoda beresolusi tinggi (1200x800) yang pas dan tidak terpotong di HP.
   - Tombol Scroll-to-Top melayang otomatis dan optimasi Safe-Area Inset untuk kenyamanan navigasi iPhone/Android.

2. **Formulir Permintaan Penawaran Kargo Otomatis ke WhatsApp Admin:**
   - 4 input esensial (Asal, Tujuan, Jenis Barang, Perkiraan Berat/Dimensi) + chip rute cepat.
   - Mengarahkan langsung ke WhatsApp Hotline Admin AFM GL dengan pesan rapi tanpa menampilkan nomor telepon mentah di tampilan publik.

3. **Fungsi Gulung (Collapsible Drawers) & Tombol Detail:**
   - Bagian Solusi JPT, Alur Kerja 8 Tahapan, Sarana Armada, Dokumen Legalitas, dan Kontak dapat dibuka-tutup dengan satu klik tombol "Detail" sehingga tidak memakan ruang layar ponsel.

4. **Tautan Resmi Unduh Company Profile (PDF Resmi):**
   - Terintegrasi langsung dengan link Google Drive resmi perusahaan.

5. **Pratinjau Thumbnail WhatsApp (Open Graph):**
   - Banner resmi 1200x630 px siap tayang otomatis saat link dibagikan di WhatsApp/medsos.

6. **Dokumen Legalitas Lengkap Termasuk KTA ALFI/ILFA:**
   - Dilengkapi dokumen SK Kemenkumham RI, NIB OSS KBLI 52311, NPWP Badan, serta KTA Asosiasi Logistik & Forwarder Indonesia (ALFI/ILFA DPW Sulselbar 2026).

---

## 📁 Struktur Berkas (Ultra Ringan & Siap Push: ~1.2 MB)

```text
afm-logistic-website/
├── index.html                           # Berkas HTML utama (modern, semantic, Tailwind CDN)
├── styles.css                           # Styling kustom (drawer, animasi, modal)
├── app.js                               # Skrip interaktif (WA generator, drawer, modal zoom)
├── .gitignore                           # Filter berkas sementara OS/Editor
├── README.md                            # Dokumentasi proyek
└── assets/
    └── images/
        ├── afm-logo.png                 # Logo bulat asli resmi PT AFM GL (Navbar, Hero, Footer, Favicon)
        ├── crown-logo-header.png        # Pemanis watermark mahkota emas (Header & Footer background)
        ├── director-andi-farida.png     # Foto Direktur Utama (Ibu Andi Farida Merjan)
        ├── profile-pt-showcase.jpg      # Banner visual multimoda (1200x800)
        ├── og-thumbnail-afm.jpg         # Thumbnail share WhatsApp/Medsos (1200x630)
        ├── fuso-truck-crane.jpg         # Visual armada Truck Crane
        ├── operations-laptop.jpg        # Visual sistem alur operasional
        ├── legal-kta-alfi-ilfa.jpg      # Dokumen KTA ALFI/ILFA DPW Sulselbar 2026
        ├── legal-sk-kemenkumham.jpg     # Dokumen SK Kemenkumham RI
        ├── legal-nib-oss.jpg            # Dokumen NIB OSS KBLI 52311
        └── legal-npwp-card.jpg          # Kartu NPWP Perusahaan
```

---

## 🌐 Cara Deploy / Push ke Hosting (GitHub / Vercel / Netlify / cPanel)

### 1. Inisialisasi Git & Push:
```bash
git init
git add .
git commit -m "feat: initial release PT AFM GL modern website"
git branch -M main
git remote add origin <URL_REPOSITORY_ANDA>
git push -u origin main
```

### 2. Live Hosting Gratis & Instan:
- **Vercel:** Tarik repository GitHub atau drag-and-drop folder ini langsung ke dashboard Vercel.
- **Netlify:** Drag-and-drop folder ini ke [app.netlify.com/drop](https://app.netlify.com/drop).
- **GitHub Pages:** Aktifkan di Settings > Pages > Deploy from branch `main`.
