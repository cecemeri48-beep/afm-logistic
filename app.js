// PT ADVANCED FREIGHT MANAGEMENT GLOBAL LOGISTIC (AFM GL)
// Core Application & Route Calculator Engine (Fully Functional)

document.addEventListener('DOMContentLoaded', () => {
  initRouteCalculator();
  initWorkflowStepper();
  initFleetTabs();
  initImageModals();
  initClipboardButtons();
  initMobileMenu();
});

// ==========================================
// 1. ROUTE & COST CALCULATOR ENGINE
// ==========================================

const routeMatrix = {
  'kendari': {
    dist: 980,
    fusoDays: '2 - 3 Hari',
    seaDays: '4 - 5 Hari',
    airDays: '1 Hari',
    fusoRate: 2800,
    seaRate: 2200,
    airRate: 18500,
    notes: 'Rute Trans-Sulawesi via Penyeberangan Bajoe - Kolaka atau jalan poros darat.'
  },
  'palu': {
    dist: 820,
    fusoDays: '2 - 3 Hari',
    seaDays: '3 - 4 Hari',
    airDays: '1 Hari',
    fusoRate: 2500,
    seaRate: 2000,
    airRate: 17500,
    notes: 'Jalur Trans Sulawesi Barat (Parepare - Majene - Mamuju - Pasangkayu - Palu).'
  },
  'mamuju': {
    dist: 440,
    fusoDays: '1 - 2 Hari',
    seaDays: '2 - 3 Hari',
    airDays: '1 Hari',
    fusoRate: 1800,
    seaRate: 1600,
    airRate: 15000,
    notes: 'Jalur pesisir barat Sulawesi, armada Fuso langsung ke lokasi gudang.'
  },
  'manado': {
    dist: 1720,
    fusoDays: '4 - 6 Hari',
    seaDays: '3 - 5 Hari',
    airDays: '1 - 2 Hari',
    fusoRate: 4200,
    seaRate: 2800,
    airRate: 24000,
    notes: 'Melalui koridor Gorontalo - Minahasa atau pelayaran langsung Makassar - Bitung.'
  },
  'gorontalo': {
    dist: 1350,
    fusoDays: '3 - 5 Hari',
    seaDays: '4 - 5 Hari',
    airDays: '1 Hari',
    fusoRate: 3600,
    seaRate: 2500,
    airRate: 21000,
    notes: 'Rute darat lintas Sulawesi Tengah menuju Gorontalo.'
  },
  'surabaya': {
    dist: 780,
    fusoDays: '3 - 4 Hari (Multimoda)',
    seaDays: '2 - 4 Hari (Kapal RoRo/FCL)',
    airDays: '1 Hari',
    fusoRate: 2400,
    seaRate: 1400,
    airRate: 19000,
    notes: 'Koneksi harian Pelabuhan Soekarno Hatta Makassar - Tanjung Perak Surabaya.'
  },
  'jakarta': {
    dist: 1450,
    fusoDays: '4 - 6 Hari (Multimoda)',
    seaDays: '3 - 5 Hari (Kapal Petikemas)',
    airDays: '1 Hari',
    fusoRate: 2900,
    seaRate: 1800,
    airRate: 23000,
    notes: 'Jalur utama logistik nasional via Tanjung Priok & Bandara Hasanuddin - Soekarno Hatta.'
  },
  'balikpapan': {
    dist: 560,
    fusoDays: '3 - 4 Hari (Multimoda)',
    seaDays: '2 - 3 Hari (Pelayaran Selat Makassar)',
    airDays: '1 Hari',
    fusoRate: 2700,
    seaRate: 1700,
    airRate: 18000,
    notes: 'Penyeberangan Selat Makassar menuju pintu gerbang IKN & Kalimantan Timur.'
  },
  'ambon': {
    dist: 980,
    fusoDays: '5 - 7 Hari (Multimoda)',
    seaDays: '3 - 5 Hari (Pelayaran Maluku)',
    airDays: '1 Hari',
    fusoRate: 3900,
    seaRate: 2400,
    airRate: 26000,
    notes: 'Konektivitas kapal kargo regular ke Maluku.'
  },
  'jayapura': {
    dist: 2300,
    fusoDays: '8 - 12 Hari (Multimoda)',
    seaDays: '6 - 9 Hari (Tol Laut/Kontainer)',
    airDays: '1 - 2 Hari',
    fusoRate: 5500,
    seaRate: 3200,
    airRate: 38000,
    notes: 'Rute kargo strategis Papua dari Hub Makassar.'
  }
};

function initRouteCalculator() {
  const originSelect = document.getElementById('calcOrigin');
  const destInput = document.getElementById('calcDestination');
  const modeSelect = document.getElementById('calcMode');
  const cargoType = document.getElementById('calcCargoType');
  const weightInput = document.getElementById('calcWeight');
  const calculateBtn = document.getElementById('btnCalculate');
  const presetButtons = document.querySelectorAll('.route-preset-btn');

  // Output elements
  const resOriginDest = document.getElementById('resOriginDest');
  const resDistance = document.getElementById('resDistance');
  const resDuration = document.getElementById('resDuration');
  const resFleet = document.getElementById('resFleet');
  const resRatePerKg = document.getElementById('resRatePerKg');
  const resEstTotal = document.getElementById('resEstTotal');
  const resHandling = document.getElementById('resHandling');
  const resNotes = document.getElementById('resNotes');
  const btnSendWhatsApp = document.getElementById('btnSendCalcWA');

  function calculate() {
    const origin = originSelect?.value || 'Makassar';
    const destText = destInput?.value.trim() || 'Kendari';
    const destLower = destText.toLowerCase();
    const mode = modeSelect?.value || 'fuso';
    const cargo = cargoType?.value || 'General Cargo';
    let weight = parseFloat(weightInput?.value) || 1000;
    if (weight < 1) weight = 1;

    // Detect matched route or default
    let routeKey = 'kendari';
    for (const key of Object.keys(routeMatrix)) {
      if (destLower.includes(key)) {
        routeKey = key;
        break;
      }
    }

    const routeData = routeMatrix[routeKey] || {
      dist: 800,
      fusoDays: '2 - 4 Hari',
      seaDays: '3 - 5 Hari',
      airDays: '1 - 2 Hari',
      fusoRate: 2800,
      seaRate: 2000,
      airRate: 20000,
      notes: 'Rute kargo reguler dengan koordinasi jadwal armada dan mitra transportasi.'
    };

    let estDays = routeData.fusoDays;
    let ratePerKg = routeData.fusoRate;
    let fleetName = 'Armada Truk Fuso (Kapasitas 8 - 15 Ton)';
    let handlingDesc = 'Standar Lashing muatan & Surat Jalan JPT';

    if (mode === 'fuso') {
      estDays = routeData.fusoDays;
      ratePerKg = routeData.fusoRate;
      fleetName = weight > 8000 ? 'Truk Fuso Berat / Loss Bak' : 'Truk Fuso Box Standar';
      handlingDesc = 'Door-to-Door, Bongkar Muat Terjadwal, Terpal Kedap Air';
    } else if (mode === 'sea') {
      estDays = routeData.seaDays;
      ratePerKg = routeData.seaRate;
      fleetName = weight >= 10000 ? 'Petikemas FCL 20ft / 40ft' : 'Konsolidasi Kargo Laut (LCL)';
      handlingDesc = 'Pelabuhan Soekarno-Hatta Makassar ➔ Pelabuhan Tujuan, Dokumen B/L';
    } else if (mode === 'air') {
      estDays = routeData.airDays;
      ratePerKg = routeData.airRate;
      fleetName = 'Air Cargo Express (Bandara Sultan Hasanuddin)';
      handlingDesc = 'Air Waybill (AWB), Penanganan Prioritas & Tracking Real-time';
    } else if (mode === 'multimoda') {
      estDays = routeData.fusoDays;
      ratePerKg = Math.round(routeData.fusoRate * 0.9 + routeData.seaRate * 0.3);
      fleetName = 'Multimoda Terpadu (Fuso Darat + Kapal Laut)';
      handlingDesc = 'Penanganan End-to-End dari gudang hingga ke tangan penerima';
    }

    // Multiply cargo category factor
    if (cargo.includes('Fragile') || cargo.includes('Mesin')) {
      ratePerKg = Math.round(ratePerKg * 1.15);
      handlingDesc += ' + Extra Securing / Kayu Pallet';
    }

    const estimatedTotal = ratePerKg * weight;
    const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(estimatedTotal);
    const formattedRate = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(ratePerKg);

    // Update UI elements
    if (resOriginDest) resOriginDest.textContent = `${origin} ➔ ${destText}`;
    if (resDistance) resDistance.textContent = `± ${routeData.dist} Km`;
    if (resDuration) resDuration.textContent = estDays;
    if (resFleet) resFleet.textContent = fleetName;
    if (resRatePerKg) resRatePerKg.textContent = `${formattedRate} / Kg`;
    if (resEstTotal) resEstTotal.textContent = formattedTotal;
    if (resHandling) resHandling.textContent = handlingDesc;
    if (resNotes) resNotes.textContent = routeData.notes;

    // Generate WhatsApp direct text
    const waText = encodeURIComponent(
      `*PERMINTAAN PENAWARAN RESMI (HASIL KALKULATOR)*\n` +
      `Kepada: PT Advanced Freight Management Global Logistic (AFM GL)\n\n` +
      `Halo tim AFM GL, saya telah mengecek kalkulasi pengiriman di website:\n` +
      `• Asal: ${origin}\n` +
      `• Tujuan: ${destText}\n` +
      `• Jarak Estimasi: ±${routeData.dist} Km\n` +
      `• Jenis Kargo: ${cargo}\n` +
      `• Pilihan Moda: ${fleetName}\n` +
      `• Berat Kargo: ${weight.toLocaleString('id-ID')} Kg\n` +
      `• Estimasi Durasi: ${estDays}\n` +
      `• Estimasi Nilai Biaya: ${formattedTotal}\n` +
      `• Rekomendasi Handling: ${handlingDesc}\n\n` +
      `Mohon konfirmasi ketersediaan armada, jadwal muat, dan penawaran resmi dari AFM GL. Terima kasih.`
    );

    if (btnSendWhatsApp) {
      btnSendWhatsApp.href = `https://wa.me/6285240086288?text=${waText}`;
    }
  }

  // Handle Preset Route clicks
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const presetDest = btn.dataset.presetDest;
      const presetMode = btn.dataset.presetMode;
      if (destInput && presetDest) destInput.value = presetDest;
      if (modeSelect && presetMode) modeSelect.value = presetMode;

      // Highlight active preset button
      presetButtons.forEach(b => b.classList.remove('bg-navy-primary', 'text-white', 'border-navy-primary'));
      btn.classList.add('bg-navy-primary', 'text-white', 'border-navy-primary');

      calculate();
    });
  });

  // Calculate button
  if (calculateBtn) {
    calculateBtn.addEventListener('click', (e) => {
      e.preventDefault();
      calculate();
      // Smooth scroll to result if on mobile
      if (window.innerWidth < 1024) {
        document.getElementById('calcResultCard')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // Auto recalculate on change
  [originSelect, destInput, modeSelect, cargoType, weightInput].forEach(el => {
    if (el) {
      el.addEventListener('change', calculate);
      el.addEventListener('input', calculate);
    }
  });

  // Initial calculation
  calculate();
}

// ==========================================
// 2. 8-STEP OPERATIONAL WORKFLOW
// ==========================================

const stepsData = [
  {
    step: "01",
    name: "Inquiry",
    tag: "Permintaan Pelanggan",
    desc: "Menerima permintaan dan kebutuhan pengiriman dari pelanggan melalui telepon, WhatsApp 0852-4008-6288, email, atau pertemuan langsung di kantor AFM GL.",
    actions: [
      "Pencatatan rincian kargo, lokasi muat (origin) dan titik bongkar (destination).",
      "Pengecekan timeline target ketibaan kargo di tujuan.",
      "Pemberian nomor registrasi inquiry untuk pemantauan layanan."
    ],
    doc: "Form Tiket Inquiry & Lembar Identifikasi Kebutuhan",
    pic: "Customer Service & Operational Planning"
  },
  {
    step: "02",
    name: "Cargo Identification",
    tag: "Klasifikasi & Sifat Muatan",
    desc: "Mengidentifikasi karakteristik kargo, volume atau berat (tonase/CBM), asal-tujuan, waktu pengiriman, dan kebutuhan handling khusus.",
    actions: [
      "Penghitungan kubikasi kargo (CBM) dan berat aktual timbangan.",
      "Identifikasi sensitivitas muatan (barang mudah pecah, suhu terjaga, atau alat berat).",
      "Pemeriksaan standar keselamatan dan kepatuhan regulasi pengangkutan."
    ],
    doc: "Cargo Specification Sheet & Checklist Safety Handling",
    pic: "Cargo Specialist & Surveyor Lapangan"
  },
  {
    step: "03",
    name: "Solution & Quotation",
    tag: "Penyusunan Rute & Biaya",
    desc: "Menyusun solusi transportasi, rute, moda yang paling efektif, serta estimasi biaya yang transparan dan kompetitif sesuai kebutuhan pelanggan.",
    actions: [
      "Pemilihan armada yang paling tepat (Truk Fuso, Kapal Laut FCL/LCL, atau Udara).",
      "Optimasi rute perjalanan untuk meminimalkan waktu transit dan biaya bahan bakar.",
      "Penerbitan surat penawaran harga resmi (Quotation) lengkap dengan rincian layanan."
    ],
    doc: "Official Quotation (Surat Penawaran Harga Resmi)",
    pic: "Commercial & Route Planning Division"
  },
  {
    step: "04",
    name: "Order Confirmation",
    tag: "Kesepakatan Pengiriman",
    desc: "Mengonfirmasi detail layanan, jadwal keberangkatan, kebutuhan operasional, dan kesepakatan pengiriman antara kedua belah pihak.",
    actions: [
      "Penandatanganan konfirmasi pesanan (Purchase Order / Shipping Instruction).",
      "Penyelarasan Service Level Agreement (SLA) waktu ketibaan.",
      "Penetapan titik penjemputan (pick-up) dan penugasan armada."
    ],
    doc: "Shipping Instruction (SI) & Perjanjian Pengangkutan",
    pic: "Account Executive & Dispatch Controller"
  },
  {
    step: "05",
    name: "Transportation Arrangement",
    tag: "Penyiapan Armada & Tim",
    desc: "Mengatur armada (seperti Truk Fuso), moda, dan jaringan transportasi yang sesuai melalui sumber daya dan mitra yang tersedia.",
    actions: [
      "Inspeksi fisik dan kelayakan armada Truk Fuso / booking slot pelayaran.",
      "Pemeriksaan identitas pengemudi, kelengkapan SIM, KIR, dan APD keselamatan.",
      "Penyiapan perlengkapan pengamanan (lashing, ganjal kayu, dan terpal waterproof)."
    ],
    doc: "Surat Perintah Jalan (SPJ) & Manifest Muatan",
    pic: "Fleet Manager & Transport Coordinator"
  },
  {
    step: "06",
    name: "Loading & Delivery",
    tag: "Pemuatan & Pemberangkatan",
    desc: "Melaksanakan proses loading dan pengiriman sesuai karakteristik kargo, standar keselamatan, serta tujuan yang disepakati.",
    actions: [
      "Supervisi penataan muatan di bak/box truk agar distribusi berat seimbang.",
      "Pemeriksaan segel kontainer / kunci box sebelum truk bertolak.",
      "Pemberangkatan armada menuju rute lintasan atau pelabuhan muat."
    ],
    doc: "Surat Jalan Ekspedisi & Berita Acara Pemuatan",
    pic: "Ground Operation Crew & Supervisor Muat"
  },
  {
    step: "07",
    name: "Monitoring",
    tag: "Pemantauan Perjalanan",
    desc: "Melakukan koordinasi dengan operator atau mitra selama proses perjalanan kargo hingga mendekati lokasi penerima.",
    actions: [
      "Pemantauan berkala checkpoint perjalanan (posisi truk di jalan / kapal di laut).",
      "Pemberian update berkala mengenai posisi barang kepada pengirim.",
      "Antisipasi cepat jika terjadi kendala rute jalan atau cuaca maritim."
    ],
    doc: "Daily Journey Status & Transit Tracking Log",
    pic: "Logistics Monitoring Team & Customer Support"
  },
  {
    step: "08",
    name: "POD & Reporting",
    tag: "Serah Terima & Dokumen Sah",
    desc: "Menyelesaikan proses delivery serta menyediakan Proof of Delivery (POD) dan pelaporan status pengiriman sesuai kebutuhan pelanggan.",
    actions: [
      "Pemeriksaan keutuhan fisik barang bersama penerima di titik tujuan.",
      "Penandatanganan dan cap bukti tanda terima barang (Proof of Delivery / POD).",
      "Pengiriman salinan POD kepada pelanggan dan pengarsipan administrasi."
    ],
    doc: "Signed Proof of Delivery (POD) & Laporan Serah Terima Tuntas",
    pic: "Field Delivery Team & Finance Administration"
  }
];

function initWorkflowStepper() {
  const stepBtns = document.querySelectorAll('.step-btn');
  const stepNumber = document.getElementById('stepNumDisplay');
  const stepName = document.getElementById('stepNameDisplay');
  const stepTag = document.getElementById('stepTagDisplay');
  const stepDesc = document.getElementById('stepDescDisplay');
  const stepActions = document.getElementById('stepActionsDisplay');
  const stepDoc = document.getElementById('stepDocDisplay');
  const stepPic = document.getElementById('stepPicDisplay');

  function renderStep(idx) {
    const data = stepsData[idx];
    if (!data) return;

    if (stepNumber) stepNumber.textContent = data.step;
    if (stepName) stepName.textContent = data.name;
    if (stepTag) stepTag.textContent = data.tag;
    if (stepDesc) stepDesc.textContent = data.desc;
    if (stepDoc) stepDoc.textContent = data.doc;
    if (stepPic) stepPic.textContent = data.pic;

    if (stepActions) {
      stepActions.innerHTML = data.actions.map(act => `
        <li class="flex items-start gap-2.5 text-slate-700 text-sm">
          <svg class="w-4 h-4 text-emerald-600 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
          <span>${act}</span>
        </li>
      `).join('');
    }

    stepBtns.forEach((btn, i) => {
      if (i === idx) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.stepIndex, 10);
      renderStep(idx);
    });
  });

  renderStep(0);
}

// ==========================================
// 3. FLEET & NETWORK TABS
// ==========================================

function initFleetTabs() {
  const tabs = document.querySelectorAll('.fleet-tab');
  const panels = document.querySelectorAll('.fleet-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.targetPanel;

      tabs.forEach(t => {
        t.classList.remove('border-navy-primary', 'text-navy-primary', 'bg-blue-50/60', 'font-bold');
        t.classList.add('border-transparent', 'text-slate-600', 'font-medium');
      });

      tab.classList.add('border-navy-primary', 'text-navy-primary', 'bg-blue-50/60', 'font-bold');
      tab.classList.remove('border-transparent', 'text-slate-600', 'font-medium');

      panels.forEach(p => {
        if (p.id === targetId) {
          p.classList.remove('hidden');
        } else {
          p.classList.add('hidden');
        }
      });
    });
  });
}

// ==========================================
// 4. IMAGE ZOOM & LEGALITY MODAL INSPECTOR
// ==========================================

function initImageModals() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const closeModalBtn = document.getElementById('closeImageModal');
  const triggers = document.querySelectorAll('.open-image-modal');

  // Director Message Modal
  const dirModal = document.getElementById('directorModal');
  const openDirBtn = document.getElementById('openDirectorModalBtn');
  const closeDirBtn = document.getElementById('closeDirectorModal');

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.dataset.imageSrc;
      const caption = btn.dataset.imageCaption || 'Dokumen Resmi PT AFM GL';
      if (modal && modalImg) {
        modalImg.src = src;
        if (modalCaption) modalCaption.textContent = caption;
        modal.classList.remove('hidden');
      }
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }

  if (openDirBtn && dirModal) {
    openDirBtn.addEventListener('click', () => dirModal.classList.remove('hidden'));
  }
  if (closeDirBtn && dirModal) {
    closeDirBtn.addEventListener('click', () => dirModal.classList.add('hidden'));
    dirModal.addEventListener('click', (e) => {
      if (e.target === dirModal) dirModal.classList.add('hidden');
    });
  }
}

// ==========================================
// 5. CLIPBOARD COPY TOAST
// ==========================================

function initClipboardButtons() {
  const copyBtns = document.querySelectorAll('.btn-copy');
  const toast = document.getElementById('toastNotice');

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.remove('opacity-0', 'translate-y-3', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-3', 'pointer-events-none');
      toast.classList.remove('opacity-100', 'translate-y-0');
    }, 2500);
  }

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.copyText;
      if (val) {
        navigator.clipboard.writeText(val).then(() => {
          showToast(`✓ Berhasil disalin: ${val}`);
        }).catch(() => {
          showToast(`✓ Berhasil disalin!`);
        });
      }
    });
  });
}

// ==========================================
// 6. MOBILE NAVIGATION
// ==========================================

function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('mobileMenuContent');
  const links = document.querySelectorAll('.mobile-link');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    links.forEach(l => {
      l.addEventListener('click', () => menu.classList.add('hidden'));
    });
  }
}
