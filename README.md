# Website Resmi PT Advanced Freight Management Global Logistic (AFM GL)

Website profil perusahaan logistik interaktif, modern, cepat, dan mobile-first untuk **PT AFM Global Logistic** (Jasa Pengurusan Transportasi - JPT KBLI 52311 & Freight Forwarding, Makassar).

---

## 🚀 Fitur Utama

1. **Mobile-First & Clean Corporate Design:**
   - Desain modern bernuansa Maritime Navy & Gold Accent tanpa AI-slop.
   - Header sticky dengan indikator status operasional aktif & menu responsive.
   - Hero Showcase Multimoda beresolusi tinggi (1200x800) yang pas dan tidak terpotong di HP.

2. **Formulir Permintaan Penawaran Kargo Otomatis ke WhatsApp Admin:**
   - 4 input esensial (Asal, Tujuan, Jenis Barang, Perkiraan Berat/Dimensi) + chip rute cepat.
   - Mengarahkan langsung ke WhatsApp Hotline Admin AFM GL (`0852-4008-6288`) dengan pesan rapi.

3. **Fungsi Gulung (Collapsible Drawers):**
   - Bagian Solusi JPT, Alur Kerja 8 Tahapan, Sarana Armada, Dokumen Legalitas, dan Kontak dapat dibuka-tutup dengan satu klik sehingga tidak memakan ruang layar ponsel.

4. **Tautan Resmi Unduh Company Profile (PDF 15 Halaman):**
   - Terintegrasi langsung dengan link Google Drive resmi perusahaan.

5. **Pratinjau Thumbnail WhatsApp (Open Graph):**
   - Banner resmi 1200x630 px siap tayang otomatis saat link dibagikan di WhatsApp/medsos.

---

## 📁 Struktur Berkas (Ultra Ringan & Siap Push: ~1.1 MB)

```text
afm-logistic-website/
├── index.html                           # Berkas HTML utama (modern, semantic, Tailwind CDN)
├── styles.css                           # Styling kustom (drawer, animasi, modal)
├── app.js                               # Skrip interaktif (WA generator, drawer, modal zoom)
├── .gitignore                           # Filter berkas sementara OS/Editor
├── README.md                            # Dokumentasi proyek
└── assets/
    └── images/
        ├── afm-logo.png                 # Logo resmi PT (Mahkota Emas & AFM GL)
        ├── director-andi-farida.png     # Foto Direktur Utama (Ibu Andi Farida Merjan)
        ├── profile-pt-showcase.jpg      # Banner visual multimoda (1200x800)
        ├── og-thumbnail-afm.jpg         # Thumbnail share WhatsApp/Medsos (1200x630)
        ├── fuso-truck-crane.jpg         # Visual armada Truk Fuso Crane
        ├── operations-laptop.jpg        # Visual sistem alur operasional
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
