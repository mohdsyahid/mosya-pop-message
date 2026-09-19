// Alert Components (alert, confirm, prompt)
import { BasePopup } from './BasePopup';
import type { MosyaAlertOptions, MosyaConfirmOptions, MosyaPromptOptions } from '../types';

/**
 * Show an alert dialog. Resolves when closed.
 */
export function alert(
  options: string | MosyaAlertOptions,
  onClose?: () => void
): Promise<void> {
  const opts: MosyaAlertOptions =
    typeof options === 'string' ? { text: options } : { ...options };

  const popup = new BasePopup(opts);
  const actions = popup.getElement().querySelector('.mosya-actions');

  actions?.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      popup.close();
    });
  });

  // Click on backdrop closes (handled inside BasePopup via allowOutsideClick)
  // Escape key closes
  if (opts.allowEscapeKey !== false) {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        popup.close();
        document.removeEventListener('keydown', esc);
      }
    };
    document.addEventListener('keydown', esc);
  }

  return popup.show().then(() => {
    onClose?.();
  });
}

/**
 * Show a confirmation dialog. Resolves true on confirm, false otherwise.
 */
export function confirm(
  options: string | MosyaConfirmOptions,
  onConfirm?: () => void,
  onCancel?: () => void,
  onDeny?: () => void
): Promise<boolean> {
  const opts: MosyaConfirmOptions =
    typeof options === 'string'
      ? { text: options, showCancelButton: true }
      : { showCancelButton: true, ...options };

  const popup = new BasePopup(opts);
  const element = popup.getElement();
  const actions = element.querySelector('.mosya-actions');

  let settled = false;
  const settle = (value: boolean, cb?: () => void) => {
    if (settled) return;
    settled = true;
    popup.close();
    cb?.();
    resolvePromise(value);
  };

  let resolvePromise!: (v: boolean) => void;
  const promise = new Promise<boolean>((resolve) => {
    resolvePromise = resolve;
  });

  if (actions) {
    // Deny button (optional, inserted before confirm)
    if (opts.showDenyButton) {
      const denyButton = document.createElement('button');
      denyButton.className = 'mosya-button mosya-deny-button';
      denyButton.textContent = opts.denyButtonText || 'Deny';
      denyButton.addEventListener('click', () => settle(false, onDeny));
      const confirmBtn = actions.querySelector('.mosya-confirm-button');
      if (confirmBtn) actions.insertBefore(denyButton, confirmBtn);
      else actions.appendChild(denyButton);
    }

    const cancelBtn = actions.querySelector('.mosya-cancel-button');
    const confirmBtn = actions.querySelector('.mosya-confirm-button');

    cancelBtn?.addEventListener('click', () => settle(false, onCancel));
    confirmBtn?.addEventListener('click', () => settle(true, onConfirm));
  }

  if (opts.allowEscapeKey !== false) {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        settle(false, onCancel);
        document.removeEventListener('keydown', esc);
      }
    };
    document.addEventListener('keydown', esc);
  }

  popup.show();
  return promise;
}

/**
 * Show a prompt dialog. Resolves with the entered string, or null if cancelled.
 */
export function prompt(
  options: string | MosyaPromptOptions,
  onConfirm?: (value: string) => void,
  onCancel?: () => void
): Promise<string | null> {
  const opts: MosyaPromptOptions =
    typeof options === 'string'
      ? { text: options, showCancelButton: true, inputPlaceholder: 'Type here...' }
      : { showCancelButton: true, ...options };

  const popup = new BasePopup(opts);
  const element = popup.getElement();
  const content = element.querySelector('.mosya-content');
  const actions = element.querySelector('.mosya-actions');

  // Always add the input field
  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'mosya-input-wrapper';
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'mosya-input';
  input.placeholder = opts.inputPlaceholder || '';
  input.value = opts.inputValue || '';
  inputWrapper.appendChild(input);
  content?.appendChild(inputWrapper);

  let settled = false;
  let resolvePromise!: (v: string | null) => void;
  const promise = new Promise<string | null>((resolve) => {
    resolvePromise = resolve;
  });

  const finish = (value: string | null, cb?: (v?: string) => void) => {
    if (settled) return;
    settled = true;
    document.removeEventListener('keydown', keyHandler);
    popup.close();
    if (value !== null) onConfirm?.(value);
    else onCancel?.();
    resolvePromise(value);
    void cb;
  };

  const keyHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      finish(input.value);
    } else if (e.key === 'Escape' && opts.allowEscapeKey !== false) {
      finish(null);
    }
  };
  document.addEventListener('keydown', keyHandler);

  if (actions) {
    const cancelBtn = actions.querySelector('.mosya-cancel-button');
    const confirmBtn = actions.querySelector('.mosya-confirm-button');

    cancelBtn?.addEventListener('click', () => finish(null));
    confirmBtn?.addEventListener('click', () => finish(input.value));
  }

  popup.show();

  // Auto-focus input
  setTimeout(() => input.focus(), 100);

  return promise;
}

export default { alert, confirm, prompt };
