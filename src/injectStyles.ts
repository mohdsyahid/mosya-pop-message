// Inject styles automatically when library loads
const STYLES = `
/* Mosya Pop Message Styles */
.mosya-container {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: var(--mosya-z-index, 9999);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.mosya-backdrop {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, var(--mosya-backdrop-opacity, 0.5));
  animation: mosya-fade-in 0.3s forwards;
}

.mosya-popup {
  position: relative;
  background: #fff;
  border-radius: 12px;
  max-width: 480px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
  animation: mosya-popup-slide-in 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

.mosya-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px; height: 80px;
  border-radius: 50%;
  margin: 32px auto 0 auto;
}

.mosya-icon-wrapper.mosya-icon-info { color: #3b82f6; background-color: rgba(59, 130, 246, 0.1); }
.mosya-icon-wrapper.mosya-icon-success { color: #22c55e; background-color: rgba(34, 197, 94, 0.1); }
.mosya-icon-wrapper.mosya-icon-warning { color: #f59e0b; background-color: rgba(245, 158, 11, 0.1); }
.mosya-icon-wrapper.mosya-icon-error { color: #ef4444; background-color: rgba(239, 68, 68, 0.1); }
.mosya-icon-wrapper.mosya-icon-question { color: #6b7280; background-color: rgba(107, 114, 128, 0.1); }
.mosya-icon-wrapper.mosya-icon-none { display: none; }

.mosya-icon-wrapper .mosya-icon-svg { width: 44px; height: 44px; }

.mosya-content { padding: 24px 32px 8px 32px; }

.mosya-title {
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
  line-height: 1.3;
}

.mosya-text {
  margin: 0 0 16px 0;
  font-size: 16px;
  color: #6b7280;
  text-align: center;
  line-height: 1.6;
}

.mosya-input-wrapper { margin-top: 20px; }

.mosya-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.mosya-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.mosya-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  padding: 16px 32px 24px 32px;
}

.mosya-button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
}

.mosya-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.mosya-button.mosya-confirm-button { background-color: #3b82f6; color: white; }
.mosya-button.mosya-confirm-button:hover { background-color: #2563eb; }
.mosya-button.mosya-cancel-button { background-color: #6b7280; color: white; }
.mosya-button.mosya-cancel-button:hover { background-color: #4b5563; }
.mosya-button.mosya-deny-button { background-color: #ef4444; color: white; }
.mosya-button.mosya-deny-button:hover { background-color: #dc2626; }

.mosya-close-button {
  position: absolute;
  top: 12px; right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  z-index: 10;
}

.mosya-close-button:hover { background-color: #f3f4f6; color: #6b7280; }

.mosya-toast {
  position: fixed;
  z-index: var(--mosya-z-index, 99999);
  min-width: 280px;
  max-width: 380px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  padding: 16px 20px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  pointer-events: auto;
  opacity: 0;
  transform: translateX(40px);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.mosya-toast.show { opacity: 1; transform: translateX(0); }
.mosya-toast.hide { opacity: 0; transform: translateX(40px); }

.mosya-toast.info { border-left: 4px solid #3b82f6; }
.mosya-toast.success { border-left: 4px solid #22c55e; }
.mosya-toast.warning { border-left: 4px solid #f59e0b; }
.mosya-toast.error { border-left: 4px solid #ef4444; }
.mosya-toast.question { border-left: 4px solid #6b7280; }

.mosya-toast-icon { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; }
.mosya-toast-icon img { width: 24px; height: 24px; }

.mosya-toast-content {
  flex: 1;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
}

.mosya-toast-duration {
  position: absolute;
  bottom: 0; left: 0;
  height: 3px;
  background: #3b82f6;
  border-radius: 0 0 0 12px;
}

.mosya-toast-position-top { top: 20px; left: 50%; margin-left: -190px; }
.mosya-toast-position-top-start { top: 20px; left: 20px; }
.mosya-toast-position-top-end { top: 20px; right: 20px; }
.mosya-toast-position-bottom { bottom: 20px; left: 50%; margin-left: -190px; }
.mosya-toast-position-bottom-start { bottom: 20px; left: 20px; }
.mosya-toast-position-bottom-end { bottom: 20px; right: 20px; }

.mosya-progress-popup { padding: 40px 32px 32px 32px; text-align: center; }

.mosya-progress-spinner {
  width: 50px; height: 50px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: mosya-spin 0.8s linear infinite;
  margin: 0 auto 20px auto;
}

.mosya-progress-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.mosya-progress-text {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

@keyframes mosya-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes mosya-popup-slide-in {
  from { transform: scale(0.7) translateY(-50px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}
@keyframes mosya-spin { to { transform: rotate(360deg); } }

@media (max-width: 640px) {
  .mosya-popup { width: 95%; }
  .mosya-content { padding: 20px; }
  .mosya-actions { padding: 12px 20px 20px 20px; }
  .mosya-button { flex: 1; min-width: auto; }
  .mosya-toast { min-width: auto; width: calc(100% - 40px); }
  .mosya-toast-position-top, .mosya-toast-position-bottom { margin-left: 0; left: 20px; right: 20px; }
}
`;

let injected = false;

export function injectStyles(): void {
  if (injected) return;
  injected = true;
  const style = document.createElement('style');
  style.setAttribute('data-mosya', 'true');
  style.textContent = STYLES;
  document.head.appendChild(style);
}
