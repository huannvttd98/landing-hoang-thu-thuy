// Gửi dữ liệu tới Google Apps Script Web App
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx3jeNPzjxEivda0v2xX2CIwGSTTklSYFJAVUNjmCcBe8Q4572DkwXJfrSr2U4S7nCU/exec';

// Hàm hiển thị notification đẹp
function showNotification(message, type = 'info') {
  // Xóa notification cũ nếu có
  const existingNotification = document.querySelector('.custom-notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Tạo notification element
  const notification = document.createElement('div');
  notification.className = 'custom-notification';

  // Định nghĩa màu sắc và icon cho từng loại
  const types = {
    success: {
      bg: '#4CAF50',
      icon: '✓',
      border: '#45a049',
    },
    error: {
      bg: '#f44336',
      icon: '✕',
      border: '#da190b',
    },
    info: {
      bg: '#2196F3',
      icon: 'ℹ',
      border: '#0b7dda',
    },
    warning: {
      bg: '#ff9800',
      icon: '⚠',
      border: '#e68900',
    },
  };

  const currentType = types[type] || types.info;

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${currentType.bg};
    color: white;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 10000;
    min-width: 300px;
    max-width: 400px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    border-left: 4px solid ${currentType.border};
    display: flex;
    align-items: center;
    gap: 12px;
    animation: slideIn 0.3s ease-out;
    cursor: pointer;
    transition: all 0.2s ease;
  `;

  // Thêm CSS animation
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      .custom-notification:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0,0,0,0.4) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Tạo nội dung notification
  const iconSpan = document.createElement('span');
  iconSpan.textContent = currentType.icon;
  iconSpan.style.cssText = `
    font-size: 18px;
    font-weight: bold;
    flex-shrink: 0;
  `;

  const messageSpan = document.createElement('span');
  messageSpan.textContent = message;
  messageSpan.style.flex = '1';

  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '×';
  closeBtn.style.cssText = `
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;
    flex-shrink: 0;
    margin-left: 8px;
  `;

  closeBtn.addEventListener('mouseenter', () => (closeBtn.style.opacity = '1'));
  closeBtn.addEventListener(
    'mouseleave',
    () => (closeBtn.style.opacity = '0.7')
  );

  notification.appendChild(iconSpan);
  notification.appendChild(messageSpan);
  notification.appendChild(closeBtn);

  // Thêm vào DOM
  document.body.appendChild(notification);

  // Hàm ẩn notification
  function hideNotification() {
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  // Tự động ẩn sau 5 giây (trừ type error sẽ ẩn sau 7 giây)
  const autoHideTime = type === 'error' ? 7000 : 5000;
  const autoHideTimer = setTimeout(hideNotification, autoHideTime);

  // Click để đóng
  closeBtn.addEventListener('click', e => {
    e.stopPropagation();
    clearTimeout(autoHideTimer);
    hideNotification();
  });

  // Click vào notification để đóng
  notification.addEventListener('click', () => {
    clearTimeout(autoHideTimer);
    hideNotification();
  });

  return notification;
}

// Hàm validation riêng cho từng trường
function validateName(name) {
  const errors = [];
  if (!name.trim()) {
    errors.push('Vui lòng nhập họ và tên');
  } else if (name.trim().length < 2) {
    errors.push('Họ và tên phải có ít nhất 2 ký tự');
  } else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(name.trim())) {
    errors.push('Họ và tên chỉ được chứa chữ cái và khoảng trắng');
  }
  return errors;
}

function validatePhone(phone) {
  const errors = [];
  if (!phone.trim()) {
    errors.push('Vui lòng nhập số điện thoại');
  } else {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    if (!/^(0[3|5|7|8|9])[0-9]{8}$/.test(cleanPhone)) {
      errors.push('Số điện thoại không đúng định dạng (VD: 0987654321)');
    }
  }
  return errors;
}

// Hàm hiển thị lỗi dưới input cụ thể
function showInputError(input, errors) {
  // Xóa lỗi cũ của input này
  const existingError = input.parentNode.querySelector('.input-error');
  if (existingError) {
    existingError.remove();
  }

  // Reset border input
  input.style.borderColor = '';
  input.style.boxShadow = '';

  if (errors.length > 0) {
    // Tạo element hiển thị lỗi
    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.style.cssText = `
      color: #dc3545;
      font-size: 12px;
      margin-top: 4px;
      line-height: 1.4;
      min-height: 16px;
      animation: fadeIn 0.3s ease-out;
    `;

    // Hiển thị lỗi đầu tiên
    errorDiv.textContent = errors[0];

    // Thêm CSS animation nếu chưa có
    if (!document.querySelector('#input-error-styles')) {
      const style = document.createElement('style');
      style.id = 'input-error-styles';
      style.textContent = `
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .form-input.error {
          border-color: #dc3545 !important;
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
        }
        .form-input.success {
          border-color: #28a745 !important;
          box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25) !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Style input có lỗi
    input.classList.add('error');
    input.classList.remove('success');

    // Thêm error vào sau input
    input.parentNode.appendChild(errorDiv);
  } else {
    // Không có lỗi - hiển thị success state
    input.classList.add('success');
    input.classList.remove('error');
  }
}

// Hàm xóa tất cả lỗi input
function clearAllInputErrors() {
  const allErrors = document.querySelectorAll('.input-error');
  allErrors.forEach(error => error.remove());

  const allInputs = document.querySelectorAll('.form-input');
  allInputs.forEach(input => {
    input.classList.remove('error', 'success');
    input.style.borderColor = '';
    input.style.boxShadow = '';
  });
}

// Hàm validation tổng thể (giữ lại cho tương thích)
function validateForm(name, phone) {
  const errors = [];
  const nameErrors = validateName(name);
  const phoneErrors = validatePhone(phone);

  errors.push(...nameErrors);
  errors.push(...phoneErrors);

  return errors;
}

// Hàm hiển thị lỗi (cập nhật để sử dụng input validation)
function showErrors(nameErrors, phoneErrors) {
  const nameInput = document.querySelector('input[placeholder="Họ và tên"]');
  const phoneInput = document.querySelector(
    'input[placeholder="Số điện thoại"]'
  );

  showInputError(nameInput, nameErrors);
  showInputError(phoneInput, phoneErrors);

  // Scroll đến lỗi đầu tiên
  if (nameErrors.length > 0) {
    nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    nameInput.focus();
  } else if (phoneErrors.length > 0) {
    phoneInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    phoneInput.focus();
  }

  return nameErrors.length === 0 && phoneErrors.length === 0;
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');
  const submitBtn = form.querySelector('.btn-submit');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Lấy dữ liệu và trim
    const name = form
      .querySelector('input[placeholder="Họ và tên"]')
      .value.trim();
    const phone = form
      .querySelector('input[placeholder="Số điện thoại"]')
      .value.trim();
    const notes = form.querySelector('textarea').value.trim();

    // Validate từng trường riêng biệt
    const nameErrors = validateName(name);
    const phoneErrors = validatePhone(phone);

    // Hiển thị lỗi dưới từng input
    if (!showErrors(nameErrors, phoneErrors)) {
      return;
    }

    // Disable button để tránh submit nhiều lần
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang gửi...';

    // Hiển thị notification đang gửi
    showNotification('Đang gửi thông tin, vui lòng đợi...', 'info');

    try {
      const dataPost = {
        name: name,
        phone: phone,
        notes: notes,
      };

      console.log('dataPost', dataPost);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // tránh lỗi CORS
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPost),
      });

      showNotification(
        'Gửi thông tin thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.',
        'success'
      );
      form.reset();

      // Xóa các thông báo lỗi sau khi gửi thành công
      clearAllInputErrors();
    } catch (error) {
      console.error('Error:', error);
      showNotification(
        'Có lỗi xảy ra khi gửi thông tin. Vui lòng kiểm tra kết nối mạng và thử lại!',
        'error'
      );
    } finally {
      // Enable lại button
      submitBtn.disabled = false;
      submitBtn.textContent = 'Gửi Yêu Cầu';
    }
  });

  // Thêm validation real-time khi người dùng nhập
  const nameInput = form.querySelector('input[placeholder="Họ và tên"]');
  const phoneInput = form.querySelector('input[placeholder="Số điện thoại"]');

  function addInputValidation(input, validator) {
    input.addEventListener('blur', function () {
      const value = this.value.trim();
      const errors = validator(value);
      showInputError(this, errors);
    });

    input.addEventListener('input', function () {
      // Xóa lỗi khi người dùng bắt đầu nhập lại
      if (this.classList.contains('error')) {
        const existingError = this.parentNode.querySelector('.input-error');
        if (existingError) {
          existingError.remove();
        }
        this.classList.remove('error');
        this.style.borderColor = '';
        this.style.boxShadow = '';
      }
    });
  }

  // Validate tên real-time
  addInputValidation(nameInput, validateName);

  // Validate số điện thoại real-time
  addInputValidation(phoneInput, validatePhone);
});
