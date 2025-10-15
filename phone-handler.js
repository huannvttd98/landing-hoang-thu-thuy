// Phone call handler for HTTPS compatibility
class PhoneHandler {
  constructor() {
    this.phoneNumber = '0838128365';
    this.init();
  }

  init() {
    // Wait for DOM to be loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupHandlers());
    } else {
      this.setupHandlers();
    }
  }

  setupHandlers() {
    // Find all tel: links and add click handlers
    const telLinks = document.querySelectorAll('a[href^="tel:"]');
    telLinks.forEach(link => {
      link.addEventListener('click', e => this.handlePhoneClick(e, link));
    });
  }

  handlePhoneClick(event, link) {
    event.preventDefault();

    // Try different methods based on browser and protocol
    if (this.isHTTPS() && !this.isMobile()) {
      // For HTTPS on desktop, show options modal
      this.showPhoneModal();
    } else {
      // For HTTP or mobile devices, try direct tel: link
      this.attemptDirectCall();
    }
  }

  isHTTPS() {
    return window.location.protocol === 'https:';
  }

  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  attemptDirectCall() {
    // Try to use tel: protocol
    try {
      window.location.href = `tel:${this.phoneNumber}`;
    } catch (error) {
      console.log('Direct tel: failed, showing modal');
      this.showPhoneModal();
    }
  }

  showPhoneModal() {
    // Remove existing modal if any
    this.removeExistingModal();

    // Create modal
    const modal = this.createModal();
    document.body.appendChild(modal);

    // Show modal with animation
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);

    // Auto close after 10 seconds
    setTimeout(() => {
      this.closeModal();
    }, 10000);
  }

  createModal() {
    const modal = document.createElement('div');
    modal.className = 'phone-modal';
    modal.innerHTML = `
            <div class="phone-modal-content">
                <div class="phone-modal-header">
                    <h3>Liên hệ với chúng tôi</h3>
                    <button class="phone-modal-close">&times;</button>
                </div>
                <div class="phone-modal-body">
                    <div class="phone-number-display">
                        <span class="phone-icon">📞</span>
                        <span class="phone-number">${this.phoneNumber}</span>
                        <button class="copy-phone-btn" title="Sao chép số điện thoại">📋</button>
                    </div>
                    <div class="phone-options">
                        <button class="phone-option-btn try-call-btn">
                            <span class="phone-icon">📞</span>
                            Thử gọi ngay
                        </button>
                        <a href="https://zalo.me/${this.phoneNumber}" class="phone-option-btn zalo-btn" target="_blank">
                            <img src="images/zalo.png" alt="Zalo" style="width: 20px; height: 20px;">
                            Chat Zalo
                        </a>
                        <a href="https://www.facebook.com/dichvulaixeho365.vn" class="phone-option-btn facebook-btn" target="_blank">
                            <img src="images/icon_fa.png" alt="Facebook" style="width: 20px; height: 20px;">
                            Facebook
                        </a>
                    </div>
                    <p class="phone-modal-note">
                        * Nếu không gọi được, vui lòng sao chép số điện thoại và gọi từ ứng dụng điện thoại
                    </p>
                </div>
            </div>
        `;

    // Add event listeners
    modal
      .querySelector('.phone-modal-close')
      .addEventListener('click', () => this.closeModal());
    modal
      .querySelector('.copy-phone-btn')
      .addEventListener('click', () => this.copyPhoneNumber());
    modal
      .querySelector('.try-call-btn')
      .addEventListener('click', () => this.forceDirectCall());
    modal.addEventListener('click', e => {
      if (e.target === modal) this.closeModal();
    });

    return modal;
  }

  copyPhoneNumber() {
    try {
      navigator.clipboard
        .writeText(this.phoneNumber)
        .then(() => {
          this.showCopySuccess();
        })
        .catch(() => {
          // Fallback for older browsers
          this.fallbackCopy();
        });
    } catch (error) {
      this.fallbackCopy();
    }
  }

  fallbackCopy() {
    const textArea = document.createElement('textarea');
    textArea.value = this.phoneNumber;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    this.showCopySuccess();
  }

  showCopySuccess() {
    const copyBtn = document.querySelector('.copy-phone-btn');
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = '✅';
    copyBtn.style.background = '#4CAF50';

    setTimeout(() => {
      copyBtn.innerHTML = originalText;
      copyBtn.style.background = '';
    }, 2000);
  }

  forceDirectCall() {
    window.open(`tel:${this.phoneNumber}`, '_self');
  }

  closeModal() {
    const modal = document.querySelector('.phone-modal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => {
        if (modal.parentNode) {
          modal.parentNode.removeChild(modal);
        }
      }, 300);
    }
  }

  removeExistingModal() {
    const existingModal = document.querySelector('.phone-modal');
    if (existingModal) {
      existingModal.parentNode.removeChild(existingModal);
    }
  }
}

// Initialize phone handler when script loads
new PhoneHandler();
