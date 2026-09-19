// Type definitions for Mosya Pop Message

export type PositionType = 'top' | 'top-start' | 'top-end' | 'middle' | 'bottom' | 'bottom-start' | 'bottom-end';
export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'question';
export type IconType = 'none' | 'info' | 'success' | 'warning' | 'error' | 'question';

export interface MosyaAlertOptions {
  title?: string;
  text?: string;
  icon?: IconType;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonText?: string;
  cancelButtonColor?: string;
  showCancelButton?: boolean;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  customClass?: {
    container?: string;
    popup?: string;
    title?: string;
    htmlContainer?: string;
    actions?: string;
    buttonCancel?: string;
    buttonConfirm?: string;
  };
}

export interface MosyaConfirmOptions extends MosyaAlertOptions {
  showDenyButton?: boolean;
  denyButtonText?: string;
  denyButtonColor?: string;
}

export interface MosyaPromptOptions extends Omit<MosyaAlertOptions, 'showCancelButton'> {
  inputPlaceholder?: string;
  inputValue?: string;
  inputValidator?: (value: string) => string | void;
  showLoaderOnConfirm?: boolean;
}

export interface MosyaToastOptions {
  message: string;
  type?: ToastType;
  position?: PositionType;
  duration?: number;
  icon?: IconType;
  progress?: {
    color?: string;
    height?: number;
  };
  customClass?: {
    toast?: string;
    icon?: string;
  };
}

export interface MosyaProgressOptions {
  title?: string;
  text?: string;
  backdrop?: boolean;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  showCloseButton?: boolean;
  closeButtonTitle?: string;
  progressPosition?: 'top' | 'center' | 'bottom';
}

// Global configuration interface
export interface MosyaConfig {
  alerts: {
    confirmButtonText: string;
    cancelButtonText: string;
    denyButtonText: string;
    confirmButtonColor: string;
    cancelButtonColor: string;
    denyButtonColor: string;
  };
  toasts: {
    defaultDuration: number;
    position: PositionType;
  };
  common: {
    animationDuration: number;
    backdropOpacity: number;
    zIndex: number;
  };
}
