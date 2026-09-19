import type { MosyaConfig } from './types';

// Default configuration
let config: MosyaConfig = {
  alerts: {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    denyButtonText: 'Deny',
    confirmButtonColor: '#3b82f6',
    cancelButtonColor: '#6b7280',
    denyButtonColor: '#ef4444'
  },
  toasts: {
    defaultDuration: 3000,
    position: 'top-end' as const
  },
  common: {
    animationDuration: 300,
    backdropOpacity: 0.5,
    zIndex: 9999
  }
};

/**
 * Set global options for all popups
 */
export function setOptions(options: Partial<MosyaConfig>) {
  config = {
    ...config,
    ...options
  };
}

/**
 * Reset all options to default values
 */
export function resetDefaults() {
  config = {
    alerts: {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      denyButtonText: 'Deny',
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      denyButtonColor: '#ef4444'
    },
    toasts: {
      defaultDuration: 3000,
      position: 'top-end' as const
    },
    common: {
      animationDuration: 300,
      backdropOpacity: 0.5,
      zIndex: 9999
    }
  };
}

/**
 * Get current configuration
 */
export function getConfig(): Readonly<MosyaConfig> {
  return config;
}
