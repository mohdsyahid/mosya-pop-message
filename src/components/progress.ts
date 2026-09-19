// Progress/Loading Indicator Component
import { generateId } from '../utils';
import type { MosyaProgressOptions } from '../types';
import styles from '../styles.css?inline';

class ProgressManager {
  private instances: Map<string, HTMLElement> = new Map();

  public show(options: MosyaProgressOptions = {}): string {
    const id = generateId();
    const popup = this.createProgressPopup(id, options);
    
    document.body.appendChild(popup);
    this.instances.set(id, popup);

    return id;
  }

  private createProgressPopup(id: string, options: MosyaProgressOptions): HTMLElement {
    const container = document.createElement('div');
    container.className = 'mosya-container mosya-progress-container';
    container.id = `mosya-progress-${id}`;

    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'mosya-backdrop';
    if (!options.backdrop) {
      backdrop.style.display = 'none';
    }
    backdrop.style.opacity = '0.5';
    backdrop.style.background = 'rgba(0, 0, 0, 0.5)';

    // Popup
    const popup = document.createElement('div');
    popup.className = 'mosya-popup mosya-progress-popup';

    // Close button
    if (options.showCloseButton !== false) {
      const closeButton = document.createElement('button');
      closeButton.className = 'mosya-close-button';
      closeButton.innerHTML = '&times;';
      closeButton.title = options.closeButtonTitle || 'Close';
      
      closeButton.addEventListener('click', () => {
        this.hide(id);
      });

      popup.appendChild(closeButton);
    }

    // Spinner
    const spinner = document.createElement('div');
    spinner.className = 'mosya-progress-spinner';

    // Title
    if (options.title) {
      const title = document.createElement('h3');
      title.className = 'mosya-progress-title';
      title.textContent = options.title;
      popup.appendChild(title);
    }

    // Text
    if (options.text) {
      const text = document.createElement('p');
      text.className = 'mosya-progress-text';
      text.textContent = options.text;
      popup.appendChild(text);
    } else if (!options.title) {
      // Default text if neither title nor text provided
      const text = document.createElement('p');
      text.className = 'mosya-progress-text';
      text.textContent = 'Loading...';
      popup.appendChild(text);
    }

    popup.appendChild(spinner);
    container.appendChild(backdrop);
    container.appendChild(popup);

    return container;
  }

  public update(id: string, options?: Partial<MosyaProgressOptions>): void {
    const instance = this.instances.get(id);
    if (instance && options) {
      const titleElement = instance.querySelector('.mosya-progress-title');
      const textElement = instance.querySelector('.mosya-progress-text');

      if (options.title && titleElement) {
        titleElement.textContent = options.title;
      }
      if (options.text && textElement) {
        textElement.textContent = options.text;
      }
    }
  }

  public hide(id: string): void {
    const instance = this.instances.get(id);
    if (instance) {
      instance.remove();
      this.instances.delete(id);
    }
  }

  public hideAll(): void {
    this.instances.forEach((_, id) => {
      this.hide(id);
    });
  }
}

const progressManager = new ProgressManager();

/**
 * Show a loading/progress indicator
 */
export function progress(options: Omit<MosyaProgressOptions, 'backdrop' | 'closeButtonTitle'> & 
  { 
    title?: string;
    text?: string;
    backdrop?: boolean;
    allowOutsideClick?: boolean;
    allowEscapeKey?: boolean;
    showCloseButton?: boolean;
    closeButtonTitle?: string;
  }
): string {
  let opts: MosyaProgressOptions;
  
  if (typeof options === 'string') {
    opts = { text: options };
  } else {
    opts = { ...options };
  }

  // Default backdrop to true
  if (opts.backdrop === undefined) {
    opts.backdrop = true;
  }

  return progressManager.show(opts);
}

/**
 * Update an active progress indicator
 */
export function updateProgress(id: string, updates: Partial<MosyaProgressOptions>): void {
  progressManager.update(id, updates);
}

/**
 * Hide a specific progress indicator
 */
export function hideProgress(id: string): void {
  progressManager.hide(id);
}

/**
 * Hide all progress indicators
 */
export function hideAllProgress(): void {
  progressManager.hideAll();
}

export default progress;
