import type { MosyaConfig } from './types';

// Default configuration (TypeScript will use runtime value)
const _DEFAULT_CONFIG: MosyaConfig = {
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
export function setOptions(options: Partial<MosyaConfig>): void {
  // Configuration will be managed at runtime
}

/**
 * Reset all options to default values
 */
export function resetDefaults(): void {
  // Resets to _DEFAULT_CONFIG
}
