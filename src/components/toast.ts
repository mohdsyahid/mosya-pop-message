// Toast Notification Component
import { generateId, getIconSVG } from '../utils';
import type { MosyaToastOptions, PositionType, ToastType } from '../types';
import styles from '../styles.css?inline';

interface ToastInstance {
  element: HTMLElement;
  hide(): void;
}

/**
 * Create a toast notification manager
 */
class ToastManager {
  private toasts: Map<string, ToastInstance> = new Map();
  private container: HTMLElement | null = null;

  constructor() {
    this.ensureContainer();
  }

  private ensureContainer(): void {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'mosya-toast-container';
      this.container.style.position = 'fixed';
      this.container.style.top = '0';
      this.container.style.left = '0';
      this.container.style.right = '0';
      this.container.style.bottom = '0';
      this.container.style.zIndex = '99999';
      this.container.style.pointerEvents = 'none';
      document.body.appendChild(this.container);
    }
  }

  public show(options: MosyaToastOptions): string {
    const id = generateId();
    const toastElement = this.createToast(id, options);
    
    this.container?.appendChild(toastElement);
    
    // Trigger animation
    requestAnimationFrame(() => {
      toastElement.classList.add('show');
    });

    // Auto-hide after duration
    const duration = options.duration || 3000;
    if (duration > 0) {
      setTimeout(() => {
        this.hide(id);
      }, duration);
    }

    return id;
  }

  private createToast(id: string, options: MosyaToastOptions): HTMLElement {
    const toast = document.createElement('div');
    toast.className = `mosya-toast ${options.type || 'info'} toast`;
    toast.dataset.toastId = id;

    // Position class
    const positionClass = `mosya-toast-position-${(options.position as string) || 'top-end'}`;
    toast.classList.add(positionClass);

    // Icon
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'mosya-toast-icon';
    
    if (options.icon && options.icon !== 'none') {
      const iconSvg = getIconSVG(options.icon || '');
      const img = document.createElement('img');
      img.src = `data:image/svg+xml,${encodeURIComponent(iconSvg)}`;
      img.alt = '';
      iconWrapper.appendChild(img);
    } else {
      // Show type as letter if no icon
      const firstLetter = (options.type || 'info').charAt(0).toUpperCase();
      iconWrapper.textContent = firstLetter;
      iconWrapper.style.width = '24px';
      iconWrapper.style.height = '24px';
      iconWrapper.style.display = 'flex';
      iconWrapper.style.alignItems = 'center';
      iconWrapper.style.justifyContent = 'center';
      iconWrapper.style.fontWeight = 'bold';
      iconWrapper.style.color = '#fff';
      
      switch (options.type) {
        case 'success':
          iconWrapper.style.backgroundColor = '#22c55e';
          break;
        case 'warning':
          iconWrapper.style.backgroundColor = '#f59e0b';
          break;
        case 'error':
          iconWrapper.style.backgroundColor = '#ef4444';
          break;
        default:
          iconWrapper.style.backgroundColor = '#3b82f6';
      }
    }

    // Content
    const content = document.createElement('div');
    content.className = 'mosya-toast-content';
    content.innerHTML = options.message;

    // Append elements
    toast.appendChild(iconWrapper);
    toast.appendChild(content);

    // Duration bar
    const durationBar = document.createElement('div');
    durationBar.className = 'mosya-toast-duration';
    durationBar.style.width = '100%';
    
    if (options.duration && options.duration > 0) {
      durationBar.style.transition = `width ${options.duration}ms linear`;
      setTimeout(() => {
        durationBar.style.width = '0%';
      }, 100);
    }
    
    toast.appendChild(durationBar);

    // Click to remove
    toast.addEventListener('click', () => {
      this.hide(id);
    });

    return toast;
  }

  public hide(id: string): void {
    const instance = this.toasts.get(id);
    if (instance) {
      instance.hide();
      this.toasts.delete(id);
    }
  }

  public hideAll(): void {
    Array.from(this.toasts.keys()).forEach(id => {
      this.hide(id);
    });
  }
}

const toastManager = new ToastManager();

/**
 * Show a toast notification
 */
export function toast(options: Omit<MosyaToastOptions, 'icon'> & { icon?: 'none' | 'info' | 'success' | 'warning' | 'error' }): string {
  let opts: MosyaToastOptions;
  
  if (typeof options === 'string') {
    opts = { message: options };
  } else {
    opts = { ...options };
  }

  // Set default icon based on type if not provided
  if (!opts.icon && opts.type && opts.type !== 'info') {
    opts.icon = opts.type as any;
  }

  return toastManager.show(opts);
}

/**
 * Convenience methods for different toast types
 */
toast.info = (message: string, options?: Omit<MosyaToastOptions, 'message' | 'type'>): string => {
  return toast({ message, type: 'info', ...options });
};

toast.success = (message: string, options?: Omit<MosyaToastOptions, 'message' | 'type'>): string => {
  return toast({ message, type: 'success', ...options });
};

toast.warning = (message: string, options?: Omit<MosyaToastOptions, 'message' | 'type'>): string => {
  return toast({ message, type: 'warning', ...options });
};

toast.error = (message: string, options?: Omit<MosyaToastOptions, 'message' | 'type'>): string => {
  return toast({ message, type: 'error', ...options });
};

toast.question = (message: string, options?: Omit<MosyaToastOptions, 'message' | 'type'>): string => {
  return toast({ message, type: 'question', ...options });
};

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  toastManager.hideAll();
});

export default toast;
