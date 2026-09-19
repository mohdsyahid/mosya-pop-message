// Base Popup Component
import { createElement, generateId, escapeHtml } from '../utils';
import type { MosyaAlertOptions } from '../types';

export class BasePopup {
  protected element: HTMLElement;
  private id: string;
  private backdropClickHandler?: EventListener;
  private keydownHandler?: EventListener;
  private closeResolve?: () => void;
  private allowEscapeKey: boolean;
  protected closed = false;

  constructor(options: MosyaAlertOptions = {}) {
    this.id = generateId();
    this.allowEscapeKey = options.allowEscapeKey ?? true;
    this.element = this.createPopupElement(options);
  }

  private createBackdrop(showCloseOnBackdrop: boolean): HTMLElement {
    const backdrop = document.createElement('div');
    backdrop.className = 'mosya-backdrop';

    if (showCloseOnBackdrop) {
      this.backdropClickHandler = () => {
        if (!this.isClosed()) {
          this.close();
        }
      };
      backdrop.addEventListener('click', this.backdropClickHandler);
    }

    return backdrop;
  }

  private createContent(title?: string, text?: string): HTMLElement {
    const content = document.createElement('div');
    content.className = 'mosya-content';

    if (title) {
      const titleEl = document.createElement('h2');
      titleEl.className = 'mosya-title';
      titleEl.textContent = title;
      content.appendChild(titleEl);
    }

    if (text) {
      const textEl = document.createElement('p');
      textEl.className = 'mosya-text';
      textEl.textContent = text;
      content.appendChild(textEl);
    }

    return content;
  }

  /**
   * Creates action buttons. Buttons are ALWAYS created when their text is
   * provided (handlers are attached externally by alert/confirm/prompt).
   */
  private createActions(
    confirmButtonText: string,
    cancelButtonText: string | undefined
  ): HTMLElement {
    const actions = document.createElement('div');
    actions.className = 'mosya-actions';

    if (cancelButtonText) {
      const cancelButton = document.createElement('button');
      cancelButton.className = 'mosya-button mosya-cancel-button';
      cancelButton.textContent = cancelButtonText;
      actions.appendChild(cancelButton);
    }

    const confirmButton = document.createElement('button');
    confirmButton.className = 'mosya-button mosya-confirm-button';
    confirmButton.textContent = confirmButtonText;
    actions.appendChild(confirmButton);

    return actions;
  }

  protected createPopupElement(options: MosyaAlertOptions): HTMLElement {
    const container = document.createElement('div');
    container.className = 'mosya-container';
    container.id = this.id;

    const backdrop = this.createBackdrop(options.allowOutsideClick ?? true);
    const popup = document.createElement('div');
    popup.className = 'mosya-popup';

    const iconWrapper = this.createIconWrapper(options.icon || 'none');
    const content = this.createContent(options.title, options.text);
    const actions = this.createActions(
      options.confirmButtonText || 'OK',
      options.showCancelButton ? (options.cancelButtonText || 'Cancel') : undefined
    );

    if (iconWrapper) popup.appendChild(iconWrapper);
    popup.appendChild(content);
    popup.appendChild(actions);

    container.appendChild(backdrop);
    container.appendChild(popup);

    return container;
  }

  private createIconWrapper(iconType: string): HTMLElement | null {
    if (iconType === 'none') return null;

    const wrapper = document.createElement('div');
    wrapper.className = `mosya-icon-wrapper mosya-icon-${iconType}`;

    const svg = this.getSvgIcon(iconType);
    if (svg) {
      const img = document.createElement('img');
      img.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      img.alt = '';
      img.className = 'mosya-icon-svg';
      wrapper.appendChild(img);
    }

    return wrapper;
  }

  private getSvgIcon(iconType: string): string {
    const icons: Record<string, string> = {
      info: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>',
      success: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
      warning: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>',
      error: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
      question: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>'
    };
    return icons[iconType] || '';
  }

  public show(): Promise<void> {
    document.body.appendChild(this.element);

    // Focus the confirm button for accessibility
    const confirmBtn = this.element.querySelector('.mosya-confirm-button') as HTMLButtonElement | null;
    confirmBtn?.focus();

    return new Promise<void>((resolve) => {
      this.closeResolve = resolve;
    });
  }

  public close(): void {
    if (!this.element.parentNode) return;

    this.element.parentNode.removeChild(this.element);

    if (this.keydownHandler) {
      document.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = undefined;
    }

    this.closeResolve?.();
  }

  public isClosed(): boolean {
    return !this.element.parentNode;
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}

export default BasePopup;
