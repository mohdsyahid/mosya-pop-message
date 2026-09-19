// Mosya Pop Message - Modern Popup Notification Library
import { injectStyles } from './injectStyles';
import {
  alert as _alert,
  confirm as _confirm,
  prompt as _prompt
} from './components/alerts';
import { toast as _toast } from './components/toast';
import {
  progress as _progress,
  updateProgress as _updateProgress,
  hideProgress as _hideProgress,
  hideAllProgress as _hideAllProgress
} from './components/progress';

import type {
  MosyaAlertOptions,
  MosyaConfirmOptions,
  MosyaPromptOptions,
  MosyaToastOptions
} from './types';

// Wrap every public API so styles are injected before first render
export function alert(
  options: string | MosyaAlertOptions,
  onClose?: () => void
): Promise<void> {
  injectStyles();
  return _alert(options, onClose);
}

export function confirm(
  options: string | MosyaConfirmOptions,
  onConfirm?: () => void,
  onCancel?: () => void,
  onDeny?: () => void
): Promise<boolean> {
  injectStyles();
  return _confirm(options, onConfirm, onCancel, onDeny);
}

export function prompt(
  options: string | MosyaPromptOptions,
  onConfirm?: (value: string) => void,
  onCancel?: () => void
): Promise<string | null> {
  injectStyles();
  return _prompt(options, onConfirm, onCancel);
}

export function progress(options: string | any): string {
  injectStyles();
  return _progress(options as any);
}

export function updateProgress(id: string, updates: any): void {
  _updateProgress(id, updates);
}

export function hideProgress(id: string): void {
  _hideProgress(id);
}

export function hideAllProgress(): void {
  _hideAllProgress();
}

// Toast with convenience methods, all injecting styles
function toastFactory() {
  const base = function toast(options: string | MosyaToastOptions): string {
    injectStyles();
    return _toast(typeof options === 'string' ? { message: options } : options);
  } as typeof _toast;

  base.info = (message: string, options?: any) => {
    injectStyles();
    return _toast.info(message, options);
  };
  base.success = (message: string, options?: any) => {
    injectStyles();
    return _toast.success(message, options);
  };
  base.warning = (message: string, options?: any) => {
    injectStyles();
    return _toast.warning(message, options);
  };
  base.error = (message: string, options?: any) => {
    injectStyles();
    return _toast.error(message, options);
  };
  base.question = (message: string, options?: any) => {
    injectStyles();
    return _toast.question(message, options);
  };
  base.hide = (id: string) => _toast.hide(id);
  base.hideAll = () => _toast.hideAll();

  return base;
}

export const toast = toastFactory();

// Re-export types for easier imports
export type {
  MosyaAlertOptions,
  MosyaConfirmOptions,
  MosyaPromptOptions,
  MosyaToastOptions,
  MosyaProgressOptions,
  PositionType,
  ToastType,
  IconType
} from './types';
