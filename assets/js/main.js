/**
 * WHAT YA GOT? HANDYMAN SERVICES - CAIRNS QLD
 * High-Performance Client Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeNav = () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', closeNav);
    }

    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        closeNav();
      }
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }

  // Interactive Pricing Calculator
  const hoursSlider = document.getElementById('calc-hours');
  const hoursValDisplay = document.getElementById('calc-hours-val');
  const partsCheckbox = document.getElementById('calc-parts');
  const totalDisplay = document.getElementById('calc-total');

  function calculateEstimate() {
    if (!hoursSlider || !totalDisplay) return;
    const hours = parseFloat(hoursSlider.value) || 1;
    if (hoursValDisplay) {
      hoursValDisplay.textContent = `${hours} ${hours === 1 ? 'hr' : 'hrs'}`;
    }

    // Set rate: $100/hr inc GST, min $100 callout
    let total = Math.max(1, hours) * 100;

    // Optional parts acquiring: $50/hr
    if (partsCheckbox && partsCheckbox.checked) {
      total += 50; // default 1 hour hardware acquiring
    }

    totalDisplay.textContent = `$${total}`;
  }

  if (hoursSlider) {
    hoursSlider.addEventListener('input', calculateEstimate);
  }
  if (partsCheckbox) {
    partsCheckbox.addEventListener('change', calculateEstimate);
  }
  calculateEstimate();

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close other items
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active', !isActive);
      });
    }
  });

  // Modal Dialogs
  const quoteModal = document.getElementById('quote-modal');
  const openModalBtns = document.querySelectorAll('.btn-open-quote-modal');
  const closeModalBtns = document.querySelectorAll('.modal-close-btn');

  const openQuoteModal = (e) => {
    if (e) e.preventDefault();
    if (quoteModal) {
      quoteModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeQuoteModal = () => {
    if (quoteModal) {
      quoteModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', openQuoteModal);
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', closeQuoteModal);
  });

  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) closeQuoteModal();
    });
  }

  // Photo / File Attachment Handler
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach(input => {
    const dropzone = input.closest('.file-dropzone') || input.parentElement;
    const preview = dropzone.querySelector('.file-preview') || document.getElementById('file-name-preview');

    input.addEventListener('change', () => {
      if (input.files && input.files.length > 0) {
        const fileNames = Array.from(input.files).map(f => f.name).join(', ');
        if (preview) {
          preview.textContent = `Attached: ${fileNames}`;
          preview.style.display = 'block';
          preview.style.color = '#15803D';
          preview.style.fontWeight = 'bold';
        }
      }
    });
  });

  // Handle Quick Quote Form Submission -> Direct SMS / WhatsApp Option
  const quoteForms = document.querySelectorAll('.quote-form');
  quoteForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value || 'Client';
      const phone = form.querySelector('[name="phone"]')?.value || '';
      const suburb = form.querySelector('[name="suburb"]')?.value || 'Cairns';
      const service = form.querySelector('[name="service"]')?.value || 'General Repair';
      const details = form.querySelector('[name="details"]')?.value || '';

      const message = `Hi Mark, I'd like a rough quote for ${service} in ${suburb}. Details: ${details}. From: ${name} (${phone})`;
      
      const successBox = form.querySelector('.form-success-box') || document.getElementById('form-success');
      if (successBox) {
        successBox.style.display = 'block';
        successBox.innerHTML = `
          <div style="background:#DCFCE7; color:#166534; padding:16px; border-radius:10px; margin-top:16px; border:1px solid #86EFAC;">
            <p style="font-weight:700; margin-bottom:6px;">✓ Inquiry Prepared for Mark!</p>
            <p style="font-size:0.9rem; margin-bottom:12px;">Click below to send your details and photos directly to Mark's mobile:</p>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <a href="sms:0402844150?body=${encodeURIComponent(message)}" class="btn btn-sm btn-primary">📱 Send via SMS (Text)</a>
              <a href="https://wa.me/61402844150?text=${encodeURIComponent(message)}" target="_blank" class="btn btn-sm btn-whatsapp">💬 Send via WhatsApp</a>
              <a href="tel:0402844150" class="btn btn-sm btn-secondary">📞 Call Mark 0402 844 150</a>
            </div>
          </div>
        `;
      }
    });
  });
});
