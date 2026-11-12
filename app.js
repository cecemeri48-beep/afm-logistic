// PT ADVANCED FREIGHT MANAGEMENT GLOBAL LOGISTIC (AFM GL)
// Interactive Core Application Logic

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initWorkflowStepper();
  initRfqCalculator();
  initClipboardActions();
  initLegalityModals();
  initFleetTabs();
  initScrollSpy();
});

// 1. Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// 2. Interactive 8-Step Operational Workflow
const workflowSteps = [
  {
    step: "01",
    name: "Inquiry",
    tagline: "Penerimaan Permintaan Kebutuhan Pengiriman",
    desc: "Menerima permintaan dan kebutuhan pengiriman dari pelanggan melalui kanal resmi AFM GL (Telepon, WhatsApp 0852-4008-6288, email, atau pertemuan langsung).",
    actions: [
      "Pencatatan identitas pengirim dan penerima",
      "Pencatatan rute (origin dan destination)",
      "Pengecekan timeline kebutuhan pengiriman"
    ],
    output: "Form Tiket Inquiry & Nomor Tiket Permintaan",
    responsible: "Customer Service & Operational Planning"
  },
  {
    step: "02",
    name: "Cargo Identification",
    tagline: "Identifikasi Karakteristik & Klasifikasi Muatan",
    desc: "Mengidentifikasi karakteristik cargo, volume atau berat, asal-tujuan, waktu pengiriman, dan kebutuhan handling khusus.",
    actions: [
      "Analisis dimensi kargo (CBM) dan tonase berat (Kg/Ton)",
      "Identifikasi sifat kargo (general cargo, rapuh/fragile, muatan dingin, dsb.)",
      "Pemeriksaan regulasi pengangkutan & standar keselamatan"
    ],
    output: "Cargo Specification Sheet & Checklist Handling",
    responsible: "Logistics Specialist & Cargo Surveyor"
  },
  {
    step: "03",
    name: "Solution & Quotation",
    tagline: "Penyusunan Solusi Rute & Estimasi Biaya",
    desc: "Menyusun solusi transportasi, rute, moda yang paling efektif, serta estimasi biaya yang transparan dan kompetitif sesuai kebutuhan pelanggan.",
    actions: [
      "Penentuan kombinasi moda (Truk Fuso, Kapal Laut, atau Pesawat Udara)",
      "Optimasi rute perjalanan untuk efisiensi waktu & biaya",
      "Penyusunan dokumen penawaran harga resmi (Quotation)"
    ],
    output: "Surat Penawaran Harga Resmi (Official Quotation)",
    responsible: "Commercial & Route Planning Division"
  },
  {
    step: "04",
    name: "Order Confirmation",
    tagline: "Konfirmasi Layanan & Kesepakatan Operasional",
    desc: "Mengonfirmasi detail layanan, jadwal keberangkatan, kebutuhan operasional, dan kesepakatan pengiriman antara kedua belah pihak.",
    actions: [
      "Verifikasi Service Level Agreement (SLA) dan jadwal waktu",
      "Penerbitan surat perintah kerja / Shipping Instruction",
      "Koordinasi ketersediaan armada dan jadwal pelabuhan/bandara"
    ],
    output: "Shipping Instruction (SI) & Purchase Order Terkonfirmasi",
    responsible: "Account Executive & Operation Coordinator"
  },
  {
    step: "05",
    name: "Transportation Arrangement",
    tagline: "Pengaturan Armada & Jaringan Mitra Terpadu",
    desc: "Mengatur armada (seperti Truk Fuso), moda, dan jaringan transportasi yang sesuai melalui sumber daya internal dan mitra terpercaya AFM GL.",
    actions: [
      "Penugasan armada Truk Fuso atau pemesanan slot kontainer kapal/udara",
      "Pemeriksaan kelayakan armada dan kepatuhan pengemudi",
      "Sinkronisasi jadwal penjemputan barang (pick-up schedule)"
    ],
    output: "Surat Jalan Ekspedisi, Delivery Order (DO) & Manifest Armada",
    responsible: "Fleet & Dispatch Controller"
  },
  {
    step: "06",
    name: "Loading & Delivery",
    tagline: "Pemuatan Sesuai Standar Keselamatan & Pengiriman",
    desc: "Melaksanakan proses pemuatan (loading) dan pengiriman sesuai karakteristik kargo, standar keselamatan kerja, serta tujuan yang disepakati.",
    actions: [
      "Supervisi penataan dan pengikatan muatan (lashing & securing)",
      "Pengecekan kesesuaian fisik kargo dengan manifest",
      "Pemberangkatan armada menuju titik transit atau tujuan akhir"
    ],
    output: "Berita Acara Muat (Loading Report) & Dokumen Perjalanan",
    responsible: "Field Operation Supervisor & Ground Crew"
  },
  {
    step: "07",
    name: "Monitoring",
    tagline: "Koordinasi Berkelanjutan & Pemantauan Perjalanan",
    desc: "Melakukan koordinasi intensif dengan operator atau mitra selama proses perjalanan kargo hingga mendekati lokasi penerima.",
    actions: [
      "Monitoring berkala posisi armada dan estimasi waktu ketibaan (ETA)",
      "Antisipasi kendala cuaca, pelabuhan, atau lalu lintas jalan",
      "Pembaruan status operasional berkala kepada pemilik kargo"
    ],
    output: "Status Tracking Update & Daily Journey Log",
    responsible: "Logistics Monitoring & Customer Care"
  },
  {
    step: "08",
    name: "POD & Reporting",
    tagline: "Penyelesaian Serah Terima & Proof of Delivery",
    desc: "Menyelesaikan proses delivery serta menyediakan Proof of Delivery (POD) yang sah dan pelaporan status pengiriman sesuai kebutuhan pelanggan.",
    actions: [
      "Pemeriksaan fisik kondisi kargo bersama penerima di titik tujuan",
      "Penandatanganan bukti serah terima (Proof of Delivery / POD)",
      "Penerbitan laporan penyelesaian pengiriman dan evaluasi kepuasan"
    ],
    output: "Signed Proof of Delivery (POD), Berita Acara Serah Terima & Final Invoice",
    responsible: "Field Delivery Team & Finance Administration"
  }
];

function initWorkflowStepper() {
  const stepButtons = document.querySelectorAll('.step-nav-btn');
  const stepNumber = document.getElementById('activeStepNumber');
  const stepName = document.getElementById('activeStepName');
  const stepTagline = document.getElementById('activeStepTagline');
  const stepDesc = document.getElementById('activeStepDesc');
  const stepActions = document.getElementById('activeStepActions');
  const stepOutput = document.getElementById('activeStepOutput');
  const stepResponsible = document.getElementById('activeStepResponsible');

  function renderStep(index) {
    const data = workflowSteps[index];
    if (!data) return;

    if (stepNumber) stepNumber.textContent = data.step;
    if (stepName) stepName.textContent = data.name;
    if (stepTagline) stepTagline.textContent = data.tagline;
    if (stepDesc) stepDesc.textContent = data.desc;
    if (stepOutput) stepOutput.textContent = data.output;
    if (stepResponsible) stepResponsible.textContent = data.responsible;

    if (stepActions) {
      stepActions.innerHTML = data.actions.map(act => `
        <li class="flex items-start gap-2.5 text-slate-700 text-sm">
          <svg class="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
          <span>${act}</span>
        </li>
      `).join('');
    }

    stepButtons.forEach((btn, idx) => {
      if (idx === index) {
        btn.classList.add('bg-slate-900', 'text-amber-400', 'border-amber-400', 'shadow-md');
        btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
      } else {
        btn.classList.remove('bg-slate-900', 'text-amber-400', 'border-amber-400', 'shadow-md');
        btn.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
      }
    });
  }

  stepButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.stepIndex, 10);
      renderStep(idx);
    });
  });

  // Render initial step
  renderStep(0);
}

// 3. Interactive RFQ & WhatsApp Generator
function initRfqCalculator() {
  const form = document.getElementById('rfqForm');
  const originSelect = document.getElementById('rfqOrigin');
  const destInput = document.getElementById('rfqDestination');
  const cargoType = document.getElementById('rfqCargoType');
  const transportMode = document.getElementById('rfqTransportMode');
  const weightInput = document.getElementById('rfqWeight');
  const notesInput = document.getElementById('rfqNotes');

  // Preview elements
  const previewSummary = document.getElementById('rfqSummaryText');
  const previewRecommendedFleet = document.getElementById('rfqRecommendedFleet');
  const previewEstimatedTime = document.getElementById('rfqEstimatedTime');
  const sendWaBtn = document.getElementById('sendWaRfqBtn');

  function updatePreview() {
    const origin = originSelect?.value || 'Makassar';
    const dest = destInput?.value.trim() || 'Tujuan Belum Diisi';
    const cargo = cargoType?.value || 'General Cargo';
    const mode = transportMode?.value || 'Truk Fuso Darat';
    const weight = weightInput?.value || '1000';

    let estTime = '2 - 4 Hari';
    let fleet = 'Truk Fuso Box / Bak Terbuka';

    if (mode === 'Truk Fuso Darat') {
      fleet = 'Armada Truk Fuso (Kapasitas s/d 8 - 15 Ton)';
      estTime = origin.includes('Makassar') && dest.toLowerCase().includes('sulawesi') ? '1 - 3 Hari (Jalur Trans Sulawesi)' : '3 - 6 Hari (Lintas Pulau)';
    } else if (mode === 'Sea Freight (Laut)') {
      fleet = 'Kontainer Kapal Laut (FCL 20ft/40ft atau LCL)';
      estTime = '4 - 8 Hari (Sesuai Jadwal Sandar Pelabuhan)';
    } else if (mode === 'Air Freight (Udara)') {
      fleet = 'Kargo Pesawat Udara (Bandara Sultan Hasanuddin / Direct Airport)';
      estTime = '1 - 2 Hari (Prioritas Kilat)';
    } else if (mode === 'Multimodal Terpadu') {
      fleet = 'Kombinasi Fuso + Kapal Laut / Pesawat (Full Coordination)';
      estTime = '3 - 5 Hari (Door to Door)';
    }

    if (previewSummary) {
      previewSummary.textContent = `Pengiriman ${cargo} dari ${origin} ke ${dest} seberat ±${weight} Kg via ${mode}.`;
    }
    if (previewRecommendedFleet) {
      previewRecommendedFleet.textContent = fleet;
    }
    if (previewEstimatedTime) {
      previewEstimatedTime.textContent = estTime;
    }

    // Prepare WhatsApp Message
    const waText = encodeURIComponent(
      `*PERMINTAAN PENAWARAN LOGISTIK (RFQ)*\n` +
      `Kepada: PT Advanced Freight Management Global Logistic (AFM GL)\n\n` +
      `Halo tim AFM GL, saya ingin meminta informasi penawaran dan jadwal pengiriman barang:\n` +
      `• Asal Pengiriman: ${origin}\n` +
      `• Kota/Daerah Tujuan: ${dest}\n` +
      `• Jenis Kargo: ${cargo}\n` +
      `• Pilihan Moda/Armada: ${mode}\n` +
      `• Estimasi Bobot/Volume: ${weight} Kg\n` +
      `• Catatan Khusus: ${notesInput?.value || '-'}\n\n` +
      `Mohon informasikan ketersediaan rute, estimasi biaya, dan jadwal koordinasi. Terima kasih.`
    );

    if (sendWaBtn) {
      sendWaBtn.href = `https://wa.me/6285240086288?text=${waText}`;
    }
  }

  // Bind change events
  [originSelect, destInput, cargoType, transportMode, weightInput, notesInput].forEach(el => {
    if (el) {
      el.addEventListener('input', updatePreview);
      el.addEventListener('change', updatePreview);
    }
  });

  updatePreview();
}

// 4. Clipboard helper with toast notification
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('copyToast');

  function showToast(message = 'Berhasil disalin ke papan klip!') {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
      toast.classList.remove('opacity-100', 'translate-y-0');
    }, 2800);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.dataset.copyValue;
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`"${textToCopy}" tersalin!`);
        }).catch(() => {
          showToast('Teks berhasil disalin!');
        });
      }
    });
  });
}

// 5. Legality Modal Inspector
function initLegalityModals() {
  const modal = document.getElementById('legalityModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalBody = document.getElementById('modalBody');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const openModalBtns = document.querySelectorAll('.open-legal-modal');

  const legalDocs = {
    kemenkumham: {
      title: "SK Pengesahan Kemenkumham RI",
      subtitle: "Nomor AHU-0054296.AH.01.01.Tahun 2026",
      content: `
        <div class="space-y-4 text-sm text-slate-700">
          <div class="bg-amber-50 border-l-4 border-amber-500 p-3 rounded text-xs text-amber-900 font-medium">
            Dokumen Resmi Negara Republik Indonesia — Pengesahan Badan Hukum Perseroan Terbatas
          </div>
          <p><strong>Nama Badan Hukum:</strong> PT ADVANCED FREIGHT MANAGEMENT GLOBAL LOGISTIC (disingkat PT AFM GL)</p>
          <p><strong>Kedudukan:</strong> Kota Makassar, Sulawesi Selatan</p>
          <p><strong>Akta Notaris:</strong> Nomor 03 Tanggal 06 Juli 2026</p>
          <p><strong>Notaris Pembuat:</strong> RISNA MANSYUR, S.H., M.Kn. (Kabupaten Pinrang / Pengesahan Wilayah Sulawesi)</p>
          <p><strong>Nomor Pendaftaran:</strong> 4026070973102913 (Tanggal 09 Juli 2026)</p>
          <p><strong>Daftar Perseroan:</strong> Nomor AHU-0156365.AH.01.11.TAHUN 2026 Tanggal 10 Juli 2026</p>
          <p><strong>Penetapan Keputusan:</strong> Ditetapkan di Jakarta, Tanggal 10 Juli 2026 atas nama Menteri Hukum RI oleh Direktur Jenderal Administrasi Hukum Umum (Widodo).</p>
        </div>
      `
    },
    nib: {
      title: "Nomor Induk Berusaha (NIB)",
      subtitle: "NIB: 0508260212793 — OSS Berbasis Risiko BKPM",
      content: `
        <div class="space-y-4 text-sm text-slate-700">
          <div class="bg-blue-50 border-l-4 border-blue-500 p-3 rounded text-xs text-blue-900 font-medium">
            Perizinan Berusaha Berbasis Risiko — Pemerintah Republik Indonesia
          </div>
          <p><strong>Nama Pelaku Usaha:</strong> PT ADVANCED FREIGHT MANAGEMENT GLOBAL LOGISTIC</p>
          <p><strong>Nomor Induk Berusaha (NIB):</strong> 0508260212793</p>
          <p><strong>Tanggal Diterbitkan:</strong> Jakarta, 5 Agustus 2026</p>
          <p><strong>Penerbit:</strong> Menteri Investasi dan Hilirisasi / Kepala BKPM (Sistem OSS BSN & BSrE BSSN)</p>
          <p><strong>Klasifikasi Baku Lapangan Usaha (KBLI):</strong> KBLI 52311 (Aktivitas Jasa Pengurusan Transportasi / JPT)</p>
          <p><strong>Status Penanaman Modal:</strong> Penanaman Modal Dalam Negeri (PMDN)</p>
          <p><strong>Skala Usaha:</strong> Usaha Mikro</p>
          <p><strong>Fungsi NIB:</strong> Berlaku sebagai identitas berusaha, hak akses kepabeanan, pendaftaran kepesertaan jaminan sosial, dan WLKP.</p>
        </div>
      `
    },
    npwp: {
      title: "Nomor Pokok Wajib Pajak (NPWP)",
      subtitle: "NPWP Badan: 1000000010340490 (16 Digit Terstandar)",
      content: `
        <div class="space-y-4 text-sm text-slate-700">
          <div class="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded text-xs text-emerald-900 font-medium">
            Kementerian Keuangan Republik Indonesia — Direktorat Jenderal Pajak (DJP)
          </div>
          <p><strong>Nama Wajib Pajak:</strong> PT ADVANCED FREIGHT MANAGEMENT GLOBAL LOGISTIC</p>
          <p><strong>NPWP 16 Digit:</strong> 1000000010340490</p>
          <p><strong>KPP Terdaftar:</strong> Kantor Pelayanan Pajak Pratama Makassar Utara</p>
          <p><strong>Alamat Terdaftar:</strong> BTN Angkasa Pura 1 Sudiang Blok B 8/6 RT. 002 RW. 005, Kelurahan Laikang, Biringkanaya, Kota Makassar, Sulawesi Selatan</p>
          <p><strong>Status Kepatuhan:</strong> Taat Pajak dan Terdaftar Resmi di Administrasi Perpajakan Nasional</p>
        </div>
      `
    },
    alfi: {
      title: "Keanggotaan ALFI / ILFA",
      subtitle: "Asosiasi Logistik & Forwarder Indonesia",
      content: `
        <div class="space-y-4 text-sm text-slate-700">
          <div class="bg-indigo-50 border-l-4 border-indigo-500 p-3 rounded text-xs text-indigo-900 font-medium">
            Ekosistem Resmi Asosiasi Logistik dan Forwarder Indonesia (ALFI / ILFA)
          </div>
          <p>PT Advanced Freight Management Global Logistic (AFM GL) terafiliasi dengan ekosistem industri transportasi nasional melalui ALFI/ILFA.</p>
          <p><strong>Manfaat Kemitraan:</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Keterhubungan jaringan forwarder nasional dan internasional</li>
            <li>Standarisasi tata kelola pengurusan transportasi dan keselamatan kargo</li>
            <li>Akses langsung ke rantai kemitraan pelayaran, pergudangan, dan armada darat</li>
            <li>Wawasan regulasi kepelabuhanan dan logistik terkini</li>
          </ul>
        </div>
      `
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const docKey = btn.dataset.legalDoc;
      const data = legalDocs[docKey];
      if (data && modal) {
        modalTitle.textContent = data.title;
        modalSubtitle.textContent = data.subtitle;
        modalBody.innerHTML = data.content;
        modal.classList.remove('hidden');
      }
    });
  });

  // 5b. Director's Full Message Modal
  const dirBtn = document.getElementById('openDirectorMessageBtn');
  if (dirBtn && modal) {
    dirBtn.addEventListener('click', () => {
      modalTitle.textContent = "Sambutan Lengkap Direktur";
      modalSubtitle.textContent = "Andi Farida Merjan — Direktur PT AFM GL";
      modalBody.innerHTML = `
        <div class="space-y-3.5 text-sm text-slate-700 leading-relaxed max-h-[65vh] overflow-y-auto pr-1">
          <p class="font-semibold text-slate-900">Assalamu Alaikum Wr. Wb.</p>
          <p>
            Puji syukur kami panjatkan atas berdirinya <strong>PT Advanced Freight Management Global Logistic (AFM GL)</strong> sebagai perusahaan yang bergerak di bidang Jasa Pengurusan Transportasi (JPT) dan freight forwarding.
          </p>
          <p>
            PT AFM GL hadir dengan komitmen untuk memberikan layanan pengurusan transportasi dan logistik yang profesional, responsif, aman, dan berorientasi pada kebutuhan pelanggan. Kami memahami bahwa kelancaran transportasi merupakan bagian penting dari keberlangsungan rantai pasok dan aktivitas bisnis setiap pelanggan.
          </p>
          <p>
            Dengan mengembangkan jaringan transportasi dan kemitraan yang andal, kami berupaya menghadirkan solusi pengiriman yang fleksibel sesuai karakteristik cargo, kebutuhan rute, waktu, serta kondisi operasional pelanggan. Sebagai perusahaan yang sedang berada pada tahap awal pengembangan, kami menjadikan integritas, profesionalisme, keselamatan, keandalan, dan pelayanan pelanggan sebagai fondasi dalam membangun bisnis. Kami percaya bahwa pertumbuhan perusahaan harus dibangun melalui kualitas layanan dan hubungan jangka panjang yang saling memberikan nilai.
          </p>
          <p>
            Ke depan, PT AFM GL berkomitmen untuk terus memperkuat jaringan, meningkatkan kompetensi sumber daya manusia, mengembangkan sistem operasional dan digital, serta memperluas kemampuan layanan transportasi dan logistik secara bertahap.
          </p>
          <p>
            Kami mengundang pelanggan dan mitra untuk tumbuh bersama dan membangun kerja sama yang berkelanjutan.
          </p>
          <p class="font-semibold text-slate-900 pt-2">
            Wassalamu Alaikum Wr. Wb.<br>
            <span class="text-amber-600 font-bold">Connecting Logistics, Delivering Excellence.</span>
          </p>
          <div class="pt-3 border-t border-slate-200 text-xs text-slate-500">
            <strong>Andi Farida Merjan</strong><br>
            Direktur PT Advanced Freight Management Global Logistic
          </div>
        </div>
      `;
      modal.classList.remove('hidden');
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }
}

// 6. Fleet & Multimodal Tabs
function initFleetTabs() {
  const tabs = document.querySelectorAll('.fleet-tab-btn');
  const panels = document.querySelectorAll('.fleet-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.fleetTarget;

      tabs.forEach(t => {
        t.classList.remove('border-amber-400', 'text-amber-400', 'bg-slate-800');
        t.classList.add('border-transparent', 'text-slate-400', 'hover:text-white');
      });

      tab.classList.add('border-amber-400', 'text-amber-400', 'bg-slate-800');
      tab.classList.remove('border-transparent', 'text-slate-400');

      panels.forEach(p => {
        if (p.id === target) {
          p.classList.remove('hidden');
        } else {
          p.classList.add('hidden');
        }
      });
    });
  });
}

// 7. ScrollSpy for Smooth Active Header Links
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-amber-400', 'font-semibold');
      link.classList.add('text-slate-300');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-amber-400', 'font-semibold');
        link.classList.remove('text-slate-300');
      }
    });
  });
}
