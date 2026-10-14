/**
 * SUOLA LOGISTICS — LIGHTWEIGHT CONCIERGE SCRIPT
 * MM2 Local Airport, First Floor Departure Hall, Lagos, Nigeria
 * Hotline: +234 702 651 8719
 */

const WA_NUMBER = '2347026518719';
const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

// ============================================================================
// 1. Theme Switcher (Dark / Light with localStorage persistence)
// ============================================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const rootHtml = document.documentElement;

function applyTheme(theme) {
  rootHtml.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('suola_theme', theme);
  } catch (e) {
    // Ignore storage restrictions if running under sandboxed file URI
  }

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'light' ? '#fafafc' : '#09090d');
  }

  if (themeToggleBtn) {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    themeToggleBtn.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
    themeToggleBtn.setAttribute('title', `Switch to ${nextTheme} mode`);
  }
}

// Detect saved theme or system preference
let savedTheme = null;
try {
  savedTheme = localStorage.getItem('suola_theme');
} catch (e) {}

const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
const initialTheme = savedTheme || (prefersLight ? 'light' : 'dark');
applyTheme(initialTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = rootHtml.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

// ============================================================================
// 2. Service Tab Switcher (Flight, Cargo, Car, Hotel, Protocol)
// ============================================================================
const tabButtons = document.querySelectorAll('.service-selector .service-btn');
const formPanels = document.querySelectorAll('.concierge-card .form-panel');

function switchService(tabName) {
  tabButtons.forEach((btn) => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });

  formPanels.forEach((panel) => {
    panel.hidden = panel.id !== `panel-${tabName}`;
  });
}

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => switchService(btn.dataset.tab));
});

// ============================================================================
// 3. Form to WhatsApp Automation
// ============================================================================
function formToMessage(form) {
  const type = form.dataset.type || 'INQUIRY';
  const formData = new FormData(form);

  const lines = [
    `✈️ *SUOLA LOGISTICS — MM2 LAGOS*`,
    `📋 *Request:* ${type}`,
    `--------------------------------`
  ];

  for (const [key, rawVal] of formData.entries()) {
    const val = String(rawVal).trim();
    if (!val || val === '0') continue;
    lines.push(`• *${key}:* ${val}`);
  }

  lines.push(`--------------------------------`);
  lines.push(`📍 *Location:* MM2 Airport First Floor Desk`);
  return lines.join('\n');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 3500);
}

document.querySelectorAll('form[data-type]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = formToMessage(form);
    window.open(waLink(message), '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp with your request...');
  });
});

// Quick action links on service cards
document.querySelectorAll('[data-wa]').forEach((link) => {
  link.href = waLink(link.dataset.wa);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

// ============================================================================
// 4. Date Safeguards
// ============================================================================
const now = new Date();
const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();
const todayString = localIso.slice(0, 10);
const nowDateTimeString = localIso.slice(0, 16);

document.querySelectorAll('.date-min').forEach((el) => {
  el.min = todayString;
});

document.querySelectorAll('input[type="datetime-local"]').forEach((el) => {
  el.min = nowDateTimeString;
});

document.querySelectorAll('[data-after]').forEach((endInput) => {
  const startInput = document.getElementById(endInput.dataset.after);
  if (startInput) {
    startInput.addEventListener('change', () => {
      endInput.min = startInput.value || todayString;
      if (endInput.value && endInput.value < startInput.value) {
        endInput.value = '';
      }
    });
  }
});

// Auto-update footer year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ============================================================================
// 5. Interactive Button Enhancements (Swap, Date Chips, Copy, Back-to-Top)
// ============================================================================

// Route Swap Button (Flight)
const swapFlightBtn = document.getElementById('btn-swap-flight');
if (swapFlightBtn) {
  swapFlightBtn.addEventListener('click', () => {
    const fromInput = document.getElementById('f-from');
    const toInput = document.getElementById('f-to');
    if (fromInput && toInput) {
      const temp = fromInput.value;
      fromInput.value = toInput.value;
      toInput.value = temp;
      showToast(`Swapped: ${fromInput.value || 'Origin'} ⇄ ${toInput.value || 'Destination'}`);
    }
  });
}

// Quick Date Chips (Today / Tomorrow)
document.querySelectorAll('.date-chip-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const offsetDays = parseInt(btn.dataset.offset || '0', 10);
    const targetInput = document.getElementById(targetId);
    if (targetInput) {
      const targetDate = new Date(Date.now() + offsetDays * 86400000);
      const dateIso = new Date(targetDate.getTime() - targetDate.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      targetInput.value = dateIso;
      targetInput.dispatchEvent(new Event('change'));
      showToast(`Date set to ${offsetDays === 0 ? 'Today' : 'Tomorrow'}`);
    }
  });
});

// Copy Desk Address Button with Visual Confirmation
const copyAddressBtn = document.getElementById('btn-copy-address');
if (copyAddressBtn) {
  copyAddressBtn.addEventListener('click', async () => {
    const addressText = 'Murtala Muhammed Airport Terminal 2 (MM2), First Floor, Departure Hall, Ikeja, Lagos';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(addressText);
      }
      const defaultIcon = copyAddressBtn.querySelector('.icon-copy-default');
      const successIcon = copyAddressBtn.querySelector('.icon-copy-success');
      const copyLabel = document.getElementById('copy-label');

      if (defaultIcon && successIcon && copyLabel) {
        defaultIcon.style.display = 'none';
        successIcon.style.display = 'block';
        copyLabel.textContent = 'Copied!';
        setTimeout(() => {
          defaultIcon.style.display = 'block';
          successIcon.style.display = 'none';
          copyLabel.textContent = 'Copy Address';
        }, 2200);
      }
      showToast('Copied MM2 desk address to clipboard!');
    } catch (err) {
      showToast('MM2 First Floor, Departure Hall, Ikeja, Lagos');
    }
  });
}

// Floating Back to Top Button
const backToTopBtn = document.getElementById('btn-back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 380) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
