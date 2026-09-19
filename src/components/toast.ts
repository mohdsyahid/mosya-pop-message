// Toast Notification Component
import { generateId, getIconSVG } from '../utils';
import type { MosyaToastOptions, PositionType, ToastType } from '../types';

class ToastManager {
  private active: Map<string, { element: HTMLElement; timer?: ReturnType<typeof setTimeout> }> = new Map();

  public show(options: MosyaToastOptions): string {
    const id = generateId();
    const toast = document.createElement('div');
    toast.className = `mosya-toast ${options.type || 'info'}`;
    toast.dataset.toastId = id;

    // Position
    const position: PositionType = options.position || 'top-end';
    toast.classList.add(`mosya-toast-position-${position}`);

    // Icon
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'mosya-toast-icon';

    const iconType = options.icon && options.icon !== 'none' ? options.icon : (options.type || 'info');
    const svg = getIconSVG(iconType);
    if (svg) {
      const img = document.createElement('img');
      img.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      img.alt = '';
      iconWrapper.appendChild(img);
    }

    // Content
    const content = document.createElement('div');
    content.className = 'mosya-toast-content';
    content.textContent = options.message;

    toast.appendChild(iconWrapper);
    toast.appendChild(content);

    // Duration bar
    const duration = options.duration ?? 3000;
    if (duration > 0) {
      const bar = document.createElement('div');
      bar.className = 'mosya-toast-duration';
      bar.style.width = '100%';
      bar.style.transition = `width ${duration}ms linear`;
      toast.appendChild(bar);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.width = '0%';
        });
      });
    }

    document.body.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto-hide
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (duration > 0) {
      timer = setTimeout(() => this.hide(id), duration);
    }

    this.active.set(id, { element: toast, timer });

    // Click to dismiss
    toast.addEventListener('click', () => this.hide(id));

    return id;
  }

  public hide(id: string): void {
    const entry = this.active.get(id);
    if (!entry) return;

    this.active.delete(id);
    if (entry.timer) clearTimeout(entry.timer);

    const { element } = entry;
    element.classList.remove('show');
    element.classList.add('hide');

    setTimeout(() => {
      element.remove();
    }, 350);
  }

  public hideAll(): void {
    Array.from(this.active.keys()).forEach((id) => this.hide(id));
  }
}

const toastManager = new ToastManager();

/**
 * Show a toast notification. Accepts a string or an options object.
 */
function toast(options: string | MosyaToastOptions): string {
  const opts: MosyaToastOptions =
    typeof options === 'string' ? { message: options } : { ...options };
  return toastManager.show(opts);
}

toast.info = (message: string, options?: Partial<MosyaToastOptions>): string =>
  toast({ message, type: 'info', ...options });

toast.success = (message: string, options?: Partial<MosyaToastOptions>): string =>
  toast({ message, type: 'success', ...options });

toast.warning = (message: string, options?: Partial<MosyaToastOptions>): string =>
  toast({ message, type: 'warning', ...options });

toast.error = (message: string, options?: Partial<MosyaToastOptions>): string =>
  toast({ message, type: 'error', ...options });

toast.question = (message: string, options?: Partial<MosyaToastOptions>): string =>
  toast({ message, type: 'question', ...options });

toast.hide = (id: string): void => toastManager.hide(id);
toast.hideAll = (): void => toastManager.hideAll();

export { toast };
export default toast;
