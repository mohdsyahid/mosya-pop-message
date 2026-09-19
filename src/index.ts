// Mosya Pop Message - Modern Popup Notification Library
export { alert, confirm, prompt } from './components/alerts';
export { toast } from './components/toast';
export { progress } from './components/progress';
export { setOptions, resetDefaults } from './config';
export type { AlertOptions, ToastOptions, ProgressOptions } from './types';

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
