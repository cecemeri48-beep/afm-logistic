// PT ADVANCED FREIGHT MANAGEMENT GLOBAL LOGISTIC (AFM GL)
// Mobile-First, Section Roll/Drawer (Fungsi Gulung) & Instant WhatsApp RFQ

document.addEventListener('DOMContentLoaded', () => {
  initQuickRfqForm();
  initSectionRolls();
  initInternalAccordions();
  initImageModals();
  initClipboardButtons();
  initMobileMenu();
  initNavAnchorScrollWithAutoUnroll();
  initSharePreview();
});

// ============================================================
// 1. FUNGSI GULUNG (SECTION ROLL / EXPANDABLE DRAWER)
// ============================================================
function initSectionRolls() {
  const rollSections = document.querySelectorAll('.roll-section');

  rollSections.forEach(sec => {
    const trigger = sec.querySelector('.roll-trigger');
    const badgeText = sec.querySelector('.roll-badge-text');

    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isUnrolled = sec.classList.contains('unrolled');

      if (isUnrolled) {
        sec.classList.remove('unrolled');
        if (badgeText) badgeText.textContent = 'Buka Detail';
      } else {
        sec.classList.add('unrolled');
        if (badgeText) badgeText.textContent = 'Gulung';
      }
    });
  });

  // Global "Buka Semua / Gulung Semua" button if present
  const toggleAllBtn = document.getElementById('toggleAllRollsBtn');
  if (toggleAllBtn) {
    let allOpen = false;
    toggleAllBtn.addEventListener('click', () => {
      allOpen = !allOpen;
      rollSections.forEach(sec => {
        const badgeText = sec.querySelector('.roll-badge-text');
        if (allOpen) {
          sec.classList.add('unrolled');
          if (badgeText) badgeText.textContent = 'Gulung';
        } else {
          sec.classList.remove('unrolled');
          if (badgeText) badgeText.textContent = 'Buka Detail';
        }
      });
      toggleAllBtn.innerHTML = allOpen 
        ? `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg><span>Gulung Semua Bagian</span>`
        : `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg><span>Buka Semua Bagian</span>`;
    });
  }
}

// When user clicks a nav link, auto unroll the target section and scroll
function initNavAnchorScrollWithAutoUnroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      // If the target element is a roll-section or inside one, unroll it
      const parentRoll = targetEl.classList.contains('roll-section') 
        ? targetEl 
        : targetEl.closest('.roll-section');

      if (parentRoll) {
        parentRoll.classList.add('unrolled');
        const badgeText = parentRoll.querySelector('.roll-badge-text');
        if (badgeText) badgeText.textContent = 'Gulung';
      }

      // Smooth scroll after slight delay for DOM expansion
      setTimeout(() => {
        parentRoll?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    });
  });
}

// ============================================================
// 2. INSTANT WHATSAPP RFQ FORM (NO CALCULATOR MATH)
// ============================================================
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

// ============================================================
// 3. INTERNAL ACCORDION (FOR SUB-ITEMS INSIDE SECTIONS)
// ============================================================
function initInternalAccordions() {
  const accordionGroups = document.querySelectorAll('.accordion-group');

  accordionGroups.forEach(group => {
    const items = group.querySelectorAll('.accordion-item');

    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      if (!header) return;

      header.addEventListener('click', (e) => {
        e.stopPropagation(); // Avoid triggering parent roll
        const isActive = item.classList.contains('active');

        // Close other items in the same group to keep compact
        items.forEach(otherItem => otherItem.classList.remove('active'));

        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  });
}

// ============================================================
// 4. IMAGE ZOOM & DIRECTOR MODAL
// ============================================================
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
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
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
    openDirBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dirModal.classList.remove('hidden');
    });
  }
  if (closeDirBtn && dirModal) {
    closeDirBtn.addEventListener('click', () => dirModal.classList.add('hidden'));
    dirModal.addEventListener('click', (e) => {
      if (e.target === dirModal) dirModal.classList.add('hidden');
    });
  }
}

// ============================================================
// 5. CLIPBOARD COPY TOAST
// ============================================================
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
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
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

// ============================================================
// 6. MOBILE NAVIGATION DRAWER
// ============================================================
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

// ============================================================
// 7. SHARE PREVIEW & OPEN GRAPH THUMBNAIL UTILITY
// ============================================================
function initSharePreview() {
  // If hosted on a web server (http or https), upgrade relative og:image to full absolute URL
  if (window.location.protocol.startsWith('http')) {
    try {
      const absoluteThumbUrl = new URL('assets/images/og-thumbnail-afm.jpg', window.location.href).href;
      
      const ogImg = document.querySelector('meta[property="og:image"]');
      const ogImgSec = document.querySelector('meta[property="og:image:secure_url"]');
      const twImg = document.querySelector('meta[name="twitter:image"]');
      const linkImg = document.querySelector('link[rel="image_src"]');

      if (ogImg) ogImg.setAttribute('content', absoluteThumbUrl);
      if (ogImgSec) ogImgSec.setAttribute('content', absoluteThumbUrl);
      if (twImg) twImg.setAttribute('content', absoluteThumbUrl);
      if (linkImg) linkImg.setAttribute('href', absoluteThumbUrl);
    } catch (e) {
      console.warn('Could not set absolute OG image URL:', e);
    }
  }

  // Dynamic WhatsApp share link
  const shareBtn = document.querySelector('.btn-share-wa, #share-hub a[href*="api.whatsapp.com"], #share-preview a[href*="api.whatsapp.com"]');
  if (shareBtn) {
    const isOnline = window.location.protocol.startsWith('http');
    const targetUrl = isOnline ? window.location.origin + window.location.pathname : 'https://afmgloballogistik.com';
    const shareText = `PT ADVANCED FREIGHT MANAGEMENT GLOBAL LOGISTIC (AFM GL)\n“Connecting Logistics, Delivering Excellence”\n\nJPT Resmi KBLI 52311 & Freight Forwarding Makassar.\nLayanan Kargo Darat (Armada Fuso), Laut & Udara Nusantara.\n\n🌐 Kunjungi Website Resmi:\n${targetUrl}\n\n📄 Unduh Company Profile PDF:\nhttps://drive.google.com/file/d/1Na15-ZoQRCUnlcwrqCh6Lh_Qk3gvEpNt/view?usp=drive_link`;

    shareBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  }
}
