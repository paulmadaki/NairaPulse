// ================= TOAST NOTIFICATION SYSTEM =================
// Modern replacement for browser alerts - production ready for 2026

class Toast {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    // Create container if it doesn't exist
    if (!document.getElementById('toast-container')) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        pointer-events: none;
      `;
      document.body.appendChild(this.container);
    } else {
      this.container = document.getElementById('toast-container');
    }

    // Add CSS if not already added
    if (!document.getElementById('toast-styles')) {
      const styles = document.createElement('style');
      styles.id = 'toast-styles';
      styles.textContent = `
        .toast {
          background: white;
          border-radius: 8px;
          padding: 16px 20px;
          margin-bottom: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border-left: 4px solid #007bff;
          pointer-events: auto;
          animation: slideIn 0.3s ease-out;
          max-width: 400px;
          font-family: 'Segoe UI', sans-serif;
          font-size: 14px;
        }

        .toast.success { border-left-color: #28a745; }
        .toast.error { border-left-color: #dc3545; }
        .toast.warning { border-left-color: #ffc107; }
        .toast.info { border-left-color: #17a2b8; }

        .toast.fade-out {
          animation: fadeOut 0.3s ease-out forwards;
        }

        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(100%); }
        }

        @media (max-width: 480px) {
          #toast-container {
            left: 10px;
            right: 10px;
            top: 10px;
          }
          .toast {
            max-width: none;
            margin-bottom: 8px;
          }
        }
      `;
      document.head.appendChild(styles);
    }
  }

  show(message, type = 'info', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    this.container.appendChild(toast);

    // Auto remove after duration
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);

    // Click to dismiss
    toast.addEventListener('click', () => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    });
  }
}

// Global instance
const toast = new Toast();

// Convenience methods
window.showToast = (message, type = 'info', duration = 4000) => {
  toast.show(message, type, duration);
};

window.showSuccess = (message, duration = 4000) => {
  toast.show(message, 'success', duration);
};

window.showError = (message, duration = 4000) => {
  toast.show(message, 'error', duration);
};

window.showWarning = (message, duration = 4000) => {
  toast.show(message, 'warning', duration);
};