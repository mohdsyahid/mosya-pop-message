// Alert Components (alert, confirm, prompt)
import { BasePopup } from './BasePopup';
import type { MosyaAlertOptions, MosyaConfirmOptions, MosyaPromptOptions } from '../types';
import styles from '../styles.css?inline';

/**
 * Show an alert dialog
 */
export function alert(
  options: string | MosyaAlertOptions,
  onClose?: () => void
): Promise<void> {
  let opts: MosyaAlertOptions;

  if (typeof options === 'string') {
    opts = { text: options };
  } else {
    opts = options;
  }

  const popup = new AlertPopup(opts);

  // Add click handlers for buttons
  const actions = popup.getElement().querySelector('.mosya-actions');
  if (actions) {
    const buttons = actions.querySelectorAll('button');
    
    buttons.forEach((btn, index) => {
      if (btn.classList.contains('mosya-cancel-button')) {
        btn.addEventListener('click', () => {
          popup.close();
          onClose?.();
        });
      } else if (btn.classList.contains('mosya-confirm-button')) {
        btn.addEventListener('click', () => {
          popup.close();
          onClose?.();
        });
      }
    });
  }

  return popup.show(onClose);
}

/**
 * Show a confirmation dialog
 */
export function confirm(
  options: string | MosyaConfirmOptions,
  onConfirm?: () => void,
  onCancel?: () => void,
  onDeny?: () => void
): Promise<boolean> {
  return new Promise((resolve) => {
    let opts: MosyaConfirmOptions;

    if (typeof options === 'string') {
      opts = { text: options };
    } else {
      opts = options;
    }

    const popup = new ConfirmPopup(opts);

    // Add button handlers
    const actions = popup.getElement().querySelector('.mosya-actions');
    if (actions) {
      const denyBtn = actions.querySelector('.mosya-deny-button');
      const cancelBtn = actions.querySelector('.mosya-cancel-button');
      const confirmBtn = actions.querySelector('.mosya-confirm-button');

      denyBtn?.addEventListener('click', () => {
        popup.close();
        resolve(false);
        onDeny?.();
      });

      cancelBtn?.addEventListener('click', () => {
        popup.close();
        resolve(false);
        onCancel?.();
      });

      confirmBtn?.addEventListener('click', () => {
        popup.close();
        resolve(true);
        onConfirm?.();
      });
    }

    popup.show(() => {}); // Don't auto-close
  });
}

/**
 * Show a prompt dialog
 */
export function prompt(
  options: string | MosyaPromptOptions,
  onConfirm?: (value: string) => void,
  onCancel?: () => void
): Promise<string | null> {
  return new Promise((resolve) => {
    let opts: MosyaPromptOptions;

    if (typeof options === 'string') {
      opts = { title: 'Input', text: options };
    } else {
      opts = options;
    }

    const popup = new PromptPopup(opts);

    const actions = popup.getElement().querySelector('.mosya-actions');
    const inputWrapper = popup.getElement().querySelector('.mosya-input-wrapper');

    if (inputWrapper && actions) {
      const input = inputWrapper.querySelector('input') as HTMLInputElement;
      const cancelButton = actions.querySelector('.mosya-cancel-button');
      const confirmButton = actions.querySelector('.mosya-confirm-button');

      cancelButton?.addEventListener('click', () => {
        popup.close();
        resolve(null);
        onCancel?.();
      });

      confirmButton?.addEventListener('click', () => {
        const value = input?.value || '';
        popup.close();
        resolve(value);
        onConfirm?.(value);
      });

      // Auto-focus input
      setTimeout(() => {
        input?.focus();
      }, 100);
    }

    popup.show(() => {});
  });
}

// AlertPopup implementation
class AlertPopup extends BasePopup {
  constructor(options: MosyaAlertOptions = {}) {
    super(options);
    
    const iconWrapper = this.getElement().querySelector('.mosya-icon-wrapper');
    if (!options.icon || options.icon === 'none' || !iconWrapper) {
      iconWrapper?.remove();
    }
  }
}

// ConfirmPopup implementation
class ConfirmPopup extends BasePopup {
  private options: MosyaConfirmOptions;

  constructor(options: MosyaConfirmOptions = {}) {
    super(options);
    this.options = options;
    
    const iconWrapper = this.getElement().querySelector('.mosya-icon-wrapper');
    if (!options.icon || options.icon === 'none' || !iconWrapper) {
      iconWrapper?.remove();
    }

    this.setupDenyButton(options);
  }

  private setupDenyButton(options: MosyaConfirmOptions): void {
    const actions = this.getElement().querySelector('.mosya-actions');
    if (actions && options.showDenyButton) {
      // Insert deny button before confirm button
      const denyButton = document.createElement('button');
      denyButton.className = 'mosya-button mosya-deny-button';
      denyButton.textContent = options.denyButtonText || 'Deny';
      
      const confirmButton = actions.querySelector('.mosya-confirm-button');
      if (confirmButton) {
        actions.insertBefore(denyButton, confirmButton);
      } else {
        actions.appendChild(denyButton);
      }
    }
  }
}

// PromptPopup implementation
class PromptPopup extends BasePopup {
  constructor(options: MosyaPromptOptions = {}) {
    super(options);

    const iconWrapper = this.getElement().querySelector('.mosya-icon-wrapper');
    if (!options.icon || options.icon === 'none' || !iconWrapper) {
      iconWrapper?.remove();
    }

    this.addInputField(options);
    this.updateActionsCount(options);
  }

  private addInputField(options: MosyaPromptOptions): void {
    const content = this.getElement().querySelector('.mosya-content');
    
    if (options.inputPlaceholder) {
      const inputWrapper = document.createElement('div');
      inputWrapper.className = 'mosya-input-wrapper';

      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = options.inputPlaceholder;
      input.value = options.inputValue || '';
      input.className = 'mosya-input';

      inputWrapper.appendChild(input);
      content?.appendChild(inputWrapper);
    }
  }

  private updateActionsCount(options: MosyaPromptOptions): void {
    const actions = this.getElement().querySelector('.mosya-actions');
    actions?.setAttribute('data-buttons', '2');
  }
}

export default {
  alert,
  confirm,
  prompt
};
