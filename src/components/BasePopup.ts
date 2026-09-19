// Base Popup Component
import { createElement, generateId, escapeHtml } from '../utils';
import type { MosyaAlertOptions } from '../types';

export class BasePopup {
  protected element: HTMLElement;
  private id: string;
  private onClose?: () => void;
  private backdropClickHandler?: (e: MouseEvent) => void;
  private keydownHandler?: (e: KeyboardEvent) => void;

  constructor(options: MosyaAlertOptions = {}) {
    this.id = generateId();
    this.element = this.createPopupElement(options);
  }

  private createBackdrop(showCloseOnBackdrop: boolean): HTMLElement {
    const backdrop = createElement('div', {
      class: 'mosya-backdrop'
    });

    this.backdropClickHandler = showCloseOnBackdrop ? (e: Event) => {
      if (e.target === backdrop && !this.isClosed()) {
        this.close();
      }
    } : undefined;

    if (this.backdropClickHandler) {
      backdrop.addEventListener('click', this.backdropClickHandler);
    }

    return backdrop;
  }

  private createContent(title?: string, text?: string): HTMLElement {
    const content = createElement('div', { class: 'mosya-content' });

    if (title) {
      const titleEl = createElement('h2', {
        class: 'mosya-title',
        innerHTML: escapeHtml(title)
      });
      content.appendChild(titleEl);
    }

    if (text) {
      const textEl = createElement('p', {
        class: 'mosya-text',
        innerText: escapeHtml(text)
      });
      content.appendChild(textEl);
    }

    return content;
  }

  private createActions(
    confirmButtonText?: string,
    cancelButtonText?: string,
    denyButtonText?: string,
    onConfirm?: () => void,
    onCancel?: () => void,
    onDeny?: () => void
  ): HTMLElement {
    const actions = createElement('div', { class: 'mosya-actions' });

    if (denyButtonText && onDeny) {
      const denyButton = this.createButton(denyButtonText, 'deny', onDeny);
      actions.appendChild(denyButton);
    }

    if (confirmButtonText && onConfirm) {
      const confirmButton = this.createButton(confirmButtonText, 'confirm', onConfirm);
      actions.appendChild(confirmButton);
    }

    if (cancelButtonText && onCancel) {
      const cancelButton = this.createButton(cancelButtonText, 'cancel', onCancel);
      actions.appendChild(cancelButton);
    }

    return actions;
  }

  private createButton(
    text: string,
    type: 'confirm' | 'cancel' | 'deny',
    onClick: () => void
  ): HTMLButtonElement {
    const button = createElement('button', {
      class: `mosya-button mosya-${type}-button`,
      innerText: text
    });

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      onClick();
    });

    return button as HTMLButtonElement;
  }

  protected createPopupElement(options: MosyaAlertOptions): HTMLElement {
    const container = createElement('div', {
      class: 'mosya-container',
      id: this.id
    });

    const backdrop = this.createBackdrop(options.allowOutsideClick ?? true);
    const popup = createElement('div', {
      class: 'mosya-popup'
    });

    const iconWrapper = this.createIconWrapper(options.icon || 'none');
    const content = this.createContent(options.title, options.text);
    const actions = this.createActions(
      options.confirmButtonText,
      options.cancelButtonText,
      undefined, // deny is handled by ConfirmPopup
      undefined, // onConfirm set externally
      undefined  // onCancel set externally
    );

    popup.appendChild(iconWrapper);
    popup.appendChild(content);
    popup.appendChild(actions);

    container.appendChild(backdrop);
    container.appendChild(popup);

    return container;
  }

  private createIconWrapper(iconType: string): HTMLElement {
    const wrapper = createElement('div', {
      class: `mosya-icon-wrapper mosya-icon-${iconType}`
    });

    if (iconType !== 'none') {
      const iconSvg = `data:image/svg+xml,${encodeURIComponent(this.getSvgIcon(iconType))}`;
      const img = document.createElement('img');
      img.src = iconSvg;
      img.alt = '';
      img.className = 'mosya-icon-svg';
      wrapper.appendChild(img);
    }

    return wrapper;
  }

  private getSvgIcon(iconType: string): string {
    switch (iconType) {
      case 'info':
        return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>';
      case 'success':
        return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
      case 'warning':
        return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>';
      case 'error':
        return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M12 21.75V12m0 0l-2.25 2.25M12 9.75L9.75 12m0 0l-2.25 2.25M12 12.75h.008v.008H12v-.008z M12 15.75h.008v.008H12V15.75z" /></svg>';
      case 'question':
        return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>';
      default:
        return '';
    }
  }

  private setupKeyboardHandlers(
    allowEscapeKey: boolean = true,
    onCloseCallback: () => void
  ): void {
    if (allowEscapeKey) {
      this.keydownHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          this.close();
        }
      };
      document.addEventListener('keydown', this.keydownHandler);
    }
  }

  public show(onClose?: () => void): Promise<void> {
    this.onClose = onClose;
    document.body.appendChild(this.element);
    
    // Setup keyboard handler
    this.setupKeyboardHandlers(true, () => this.close());

    return new Promise(resolve => {
      this.onClose = () => {
        resolve();
      };
    });
  }

  public close(): void {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }

    if (this.backdropClickHandler) {
      const backdrop = this.element.querySelector('.mosya-backdrop');
      if (backdrop) {
        backdrop.removeEventListener('click', this.backdropClickHandler);
      }
    }

    if (this.keydownHandler) {
      document.removeEventListener('keydown', this.keydownHandler);
    }
  }

  public isClosed(): boolean {
    return !this.element.parentNode;
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}

export default BasePopup;
