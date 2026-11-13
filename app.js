// PT ADVANCED FREIGHT MANAGEMENT GLOBAL LOGISTIC (AFM GL)
// Mobile-First, User-Friendly, Accordion Collapsible & Instant WhatsApp RFQ

document.addEventListener('DOMContentLoaded', () => {
  initQuickRfqForm();
  initAccordions();
  initImageModals();
  initClipboardButtons();
  initMobileMenu();
});

// ==========================================
// 1. INSTANT WHATSAPP RFQ FORM (NO CALCULATOR MATH)
// ==========================================
function initQuickRfqForm() {
  const form = document.getElementById('quickRfqForm');
  const originInput = document.getElementById('rfqOrigin');
  const destInput = document.getElementById('rfqDestination');
  const cargoInput = document.getElementById('rfqCargo');
  const weightInput = document.getElementById('rfqWeight');
  const notesInput = document.getElementById('rfqNotes');
  const toast = document.getElementById('toastNotice');
  const quickDestChips = document.querySelectorAll('.quick-dest-chip');

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('opacity-0', 'translate-y-3', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-3', 'pointer-events-none');
      toast.classList.remove('opacity-100', 'translate-y-0');
    }, 2800);
  }

  // Quick suggestion chips for destination
  quickDestChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const destValue = chip.dataset.dest;
      if (destInput && destValue) {
        destInput.value = destValue;
        quickDestChips.forEach(c => c.classList.remove('bg-navy-primary', 'text-white', 'border-navy-primary'));
        chip.classList.add('bg-navy-primary', 'text-white', 'border-navy-primary');
      }
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const origin = originInput?.value.trim() || 'Makassar';
      const dest = destInput?.value.trim() || '';
      const cargo = cargoInput?.value.trim() || '';
      const weight = weightInput?.value.trim() || '';
      const notes = notesInput?.value.trim() || '-';

      if (!dest) {
        showToast('⚠️ Silakan masukkan kota tujuan pengiriman');
        destInput?.focus();
        return;
      }
      if (!cargo) {
        showToast('⚠️ Silakan pilih atau isi jenis barang');
        cargoInput?.focus();
        return;
      }
      if (!weight) {
        showToast('⚠️ Silakan masukkan estimasi berat kargo');
        weightInput?.focus();
        return;
      }

      // Format WhatsApp message
      const waText = encodeURIComponent(
        `*PERMINTAAN PENAWARAN PENGIRIMAN KARGO*\n` +
        `Kepada: *PT Advanced Freight Management Global Logistic (AFM GL)*\n\n` +
        `Halo Admin AFM GL, saya ingin menanyakan penawaran dan jadwal pengiriman barang:\n` +
        `📍 *Kota Asal:* ${origin}\n` +
        `🎯 *Kota Tujuan:* ${dest}\n` +
        `📦 *Jenis Barang:* ${cargo}\n` +
        `⚖️ *Berat / Volume:* ${weight}\n` +
        `📝 *Catatan Khusus:* ${notes}\n\n` +
        `Mohon konfirmasi ketersediaan armada, rute perjalanan, dan penawaran resminya. Terima kasih.`
      );

      const waUrl = `https://wa.me/6285240086288?text=${waText}`;
      
      showToast('🚀 Membuka WhatsApp Admin...');
      window.open(waUrl, '_blank');
    });
  }
}

// ==========================================
// 2. FUNGSI LIPAT (COLLAPSIBLE ACCORDIONS)
// ==========================================
function initAccordions() {
  const accordionGroups = document.querySelectorAll('.accordion-group');

  accordionGroups.forEach(group => {
    const items = group.querySelectorAll('.accordion-item');

    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      if (!header) return;

      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items in the same group to avoid clutter on mobile
        items.forEach(otherItem => {
          otherItem.classList.remove('active');
        });

        // Toggle clicked item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  });
}

// ==========================================
// 3. IMAGE PREVIEW MODAL & DIRECTOR MODAL
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
// 4. CLIPBOARD COPY TOAST
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
// 5. MOBILE DRAWER NAVIGATION
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
