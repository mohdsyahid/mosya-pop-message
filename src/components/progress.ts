// Progress/Loading Indicator Component
import { generateId } from '../utils';
import type { MosyaProgressOptions } from '../types';

class ProgressManager {
  private instances: Map<string, HTMLElement> = new Map();

  public show(options: MosyaProgressOptions = {}): string {
    const id = generateId();
    const container = document.createElement('div');
    container.className = 'mosya-container';
    container.id = `mosya-progress-${id}`;

    // Backdrop
    if (options.backdrop !== false) {
      const backdrop = document.createElement('div');
      backdrop.className = 'mosya-backdrop';
      container.appendChild(backdrop);
    }

    // Popup
    const popup = document.createElement('div');
    popup.className = 'mosya-popup mosya-progress-popup';

    // Close button
    if (options.showCloseButton !== false) {
      const closeButton = document.createElement('button');
      closeButton.className = 'mosya-close-button';
      closeButton.innerHTML = '&times;';
      closeButton.title = options.closeButtonTitle || 'Close';
      closeButton.addEventListener('click', () => this.hide(id));
      popup.appendChild(closeButton);
    }

    // Spinner
    const spinner = document.createElement('div');
    spinner.className = 'mosya-progress-spinner';
    popup.appendChild(spinner);

    // Title
    if (options.title) {
      const title = document.createElement('h3');
      title.className = 'mosya-progress-title';
      title.textContent = options.title;
      popup.appendChild(title);
    }

    // Text
    const text = document.createElement('p');
    text.className = 'mosya-progress-text';
    text.textContent = options.text || (options.title ? '' : 'Loading...');
    if (text.textContent) popup.appendChild(text);

    container.appendChild(popup);
    document.body.appendChild(container);

    // Escape key closes
    if (options.allowEscapeKey !== false) {
      const esc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          this.hide(id);
          document.removeEventListener('keydown', esc);
        }
      };
      document.addEventListener('keydown', esc);
    }

    this.instances.set(id, container);
    return id;
  }

  public update(id: string, options?: Partial<MosyaProgressOptions>): void {
    const instance = this.instances.get(id);
    if (!instance || !options) return;

    if (options.title !== undefined) {
      let titleElement = instance.querySelector('.mosya-progress-title') as HTMLElement | null;
      if (!titleElement) {
        titleElement = document.createElement('h3');
        titleElement.className = 'mosya-progress-title';
        const spinner = instance.querySelector('.mosya-progress-spinner');
        spinner?.after(titleElement);
      }
      titleElement.textContent = options.title;
    }

    if (options.text !== undefined) {
      let textElement = instance.querySelector('.mosya-progress-text') as HTMLElement | null;
      if (!textElement) {
        textElement = document.createElement('p');
        textElement.className = 'mosya-progress-text';
        instance.querySelector('.mosya-progress-popup')?.appendChild(textElement);
      }
      textElement.textContent = options.text;
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
    Array.from(this.instances.keys()).forEach((id) => this.hide(id));
  }
}

const progressManager = new ProgressManager();

/**
 * Show a loading/progress indicator. Accepts a string or an options object.
 */
function progress(options: string | MosyaProgressOptions = {}): string {
  const opts: MosyaProgressOptions =
    typeof options === 'string' ? { text: options } : { ...options };
  if (opts.backdrop === undefined) opts.backdrop = true;
  return progressManager.show(opts);
}

function updateProgress(id: string, updates: Partial<MosyaProgressOptions>): void {
  progressManager.update(id, updates);
}

function hideProgress(id: string): void {
  progressManager.hide(id);
}

function hideAllProgress(): void {
  progressManager.hideAll();
}

export { progress, updateProgress, hideProgress, hideAllProgress };
export default progress;
