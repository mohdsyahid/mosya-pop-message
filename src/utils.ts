// Utility functions for Mosya Pop Message

/**
 * Create an element with attributes
 */
export function createElement(tag: string, attrs: Record<string, string> = {}): Element {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  return el;
}

/**
 * Generate unique ID
 */
let idCounter = 0;
export function generateId(): string {
  return `mosya-${Date.now()}-${++idCounter}`;
}

/**
 * Escape HTML to prevent XSS
 */
export function escapeHtml(text: string): string {
  const div = createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Convert milliseconds to seconds
 */
export function msToSeconds(ms: number): number {
  return ms / 1000;
}

/**
 * Format icon based on type
 */
export function getIconSVG(iconType: string): string {
  switch (iconType) {
    case 'info':
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>`;
    case 'success':
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
    case 'warning':
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>`;
    case 'error':
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M12 21.75V12m0 0l-2.25 2.25M12 9.75L9.75 12m0 0l-2.25 2.25M12 12.75h.008v.008H12v-.008z M12 15.75h.008v.008H12V15.75z" /></svg>`;
    case 'question':
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>`;
    default:
      return '';
  }
}

/**
 * Add animation classes
 */
export function addAnimationClasses(element: Element, animateIn: boolean = true): void {
  if (!animateIn) return;
  
  const rect = element.getBoundingClientRect();
  const isCenter = Math.abs(rect.left - window.innerWidth / 2) < 10 && 
                   Math.abs(rect.top - window.innerHeight / 2) < 10;
  
  if (isCenter) {
    element.classList.add('mosya-animate-in-center');
  } else {
    element.classList.add('mosya-animate-in-side');
  }
}

/**
 * Get configuration from global config
 */
export function getConfig(): Readonly<{
  alerts: typeof import('./config').config.alerts;
  toasts: typeof import('./config').config.toasts;
  common: typeof import('./config').config.common;
}> {
  // This will be replaced by actual config import
  return null as any;
}
