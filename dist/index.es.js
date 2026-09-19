var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
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
function injectStyles() {
  if (injected) return;
  injected = true;
  const style = document.createElement("style");
  style.setAttribute("data-mosya", "true");
  style.textContent = STYLES;
  document.head.appendChild(style);
}
let idCounter = 0;
function generateId() {
  return `mosya-${Date.now()}-${++idCounter}`;
}
function getIconSVG(iconType) {
  switch (iconType) {
    case "info":
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>`;
    case "success":
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
    case "warning":
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>`;
    case "error":
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M12 21.75V12m0 0l-2.25 2.25M12 9.75L9.75 12m0 0l-2.25 2.25M12 12.75h.008v.008H12v-.008z M12 15.75h.008v.008H12V15.75z" /></svg>`;
    case "question":
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>`;
    default:
      return "";
  }
}
class BasePopup {
  constructor(options = {}) {
    __publicField(this, "element");
    __publicField(this, "id");
    __publicField(this, "backdropClickHandler");
    __publicField(this, "keydownHandler");
    __publicField(this, "closeResolve");
    __publicField(this, "allowEscapeKey");
    __publicField(this, "closed", false);
    this.id = generateId();
    this.allowEscapeKey = options.allowEscapeKey ?? true;
    this.element = this.createPopupElement(options);
  }
  createBackdrop(showCloseOnBackdrop) {
    const backdrop = document.createElement("div");
    backdrop.className = "mosya-backdrop";
    if (showCloseOnBackdrop) {
      this.backdropClickHandler = () => {
        if (!this.isClosed()) {
          this.close();
        }
      };
      backdrop.addEventListener("click", this.backdropClickHandler);
    }
    return backdrop;
  }
  createContent(title, text) {
    const content = document.createElement("div");
    content.className = "mosya-content";
    if (title) {
      const titleEl = document.createElement("h2");
      titleEl.className = "mosya-title";
      titleEl.textContent = title;
      content.appendChild(titleEl);
    }
    if (text) {
      const textEl = document.createElement("p");
      textEl.className = "mosya-text";
      textEl.textContent = text;
      content.appendChild(textEl);
    }
    return content;
  }
  /**
   * Creates action buttons. Buttons are ALWAYS created when their text is
   * provided (handlers are attached externally by alert/confirm/prompt).
   */
  createActions(confirmButtonText, cancelButtonText) {
    const actions = document.createElement("div");
    actions.className = "mosya-actions";
    if (cancelButtonText) {
      const cancelButton = document.createElement("button");
      cancelButton.className = "mosya-button mosya-cancel-button";
      cancelButton.textContent = cancelButtonText;
      actions.appendChild(cancelButton);
    }
    const confirmButton = document.createElement("button");
    confirmButton.className = "mosya-button mosya-confirm-button";
    confirmButton.textContent = confirmButtonText;
    actions.appendChild(confirmButton);
    return actions;
  }
  createPopupElement(options) {
    const container = document.createElement("div");
    container.className = "mosya-container";
    container.id = this.id;
    const backdrop = this.createBackdrop(options.allowOutsideClick ?? true);
    const popup = document.createElement("div");
    popup.className = "mosya-popup";
    const iconWrapper = this.createIconWrapper(options.icon || "none");
    const content = this.createContent(options.title, options.text);
    const actions = this.createActions(
      options.confirmButtonText || "OK",
      options.showCancelButton ? options.cancelButtonText || "Cancel" : void 0
    );
    if (iconWrapper) popup.appendChild(iconWrapper);
    popup.appendChild(content);
    popup.appendChild(actions);
    container.appendChild(backdrop);
    container.appendChild(popup);
    return container;
  }
  createIconWrapper(iconType) {
    if (iconType === "none") return null;
    const wrapper = document.createElement("div");
    wrapper.className = `mosya-icon-wrapper mosya-icon-${iconType}`;
    const svg = this.getSvgIcon(iconType);
    if (svg) {
      const img = document.createElement("img");
      img.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      img.alt = "";
      img.className = "mosya-icon-svg";
      wrapper.appendChild(img);
    }
    return wrapper;
  }
  getSvgIcon(iconType) {
    const icons = {
      info: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>',
      success: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
      warning: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>',
      error: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
      question: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>'
    };
    return icons[iconType] || "";
  }
  show() {
    document.body.appendChild(this.element);
    const confirmBtn = this.element.querySelector(".mosya-confirm-button");
    confirmBtn == null ? void 0 : confirmBtn.focus();
    return new Promise((resolve) => {
      this.closeResolve = resolve;
    });
  }
  close() {
    var _a;
    if (!this.element.parentNode) return;
    this.element.parentNode.removeChild(this.element);
    if (this.keydownHandler) {
      document.removeEventListener("keydown", this.keydownHandler);
      this.keydownHandler = void 0;
    }
    (_a = this.closeResolve) == null ? void 0 : _a.call(this);
  }
  isClosed() {
    return !this.element.parentNode;
  }
  getElement() {
    return this.element;
  }
}
function alert$1(options, onClose) {
  const opts = typeof options === "string" ? { text: options } : { ...options };
  const popup = new BasePopup(opts);
  const actions = popup.getElement().querySelector(".mosya-actions");
  actions == null ? void 0 : actions.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      popup.close();
    });
  });
  if (opts.allowEscapeKey !== false) {
    const esc = (e) => {
      if (e.key === "Escape") {
        popup.close();
        document.removeEventListener("keydown", esc);
      }
    };
    document.addEventListener("keydown", esc);
  }
  return popup.show().then(() => {
    onClose == null ? void 0 : onClose();
  });
}
function confirm$1(options, onConfirm, onCancel, onDeny) {
  const opts = typeof options === "string" ? { text: options, showCancelButton: true } : { showCancelButton: true, ...options };
  const popup = new BasePopup(opts);
  const element = popup.getElement();
  const actions = element.querySelector(".mosya-actions");
  let settled = false;
  const settle = (value, cb) => {
    if (settled) return;
    settled = true;
    popup.close();
    cb == null ? void 0 : cb();
    resolvePromise(value);
  };
  let resolvePromise;
  const promise = new Promise((resolve) => {
    resolvePromise = resolve;
  });
  if (actions) {
    if (opts.showDenyButton) {
      const denyButton = document.createElement("button");
      denyButton.className = "mosya-button mosya-deny-button";
      denyButton.textContent = opts.denyButtonText || "Deny";
      denyButton.addEventListener("click", () => settle(false, onDeny));
      const confirmBtn2 = actions.querySelector(".mosya-confirm-button");
      if (confirmBtn2) actions.insertBefore(denyButton, confirmBtn2);
      else actions.appendChild(denyButton);
    }
    const cancelBtn = actions.querySelector(".mosya-cancel-button");
    const confirmBtn = actions.querySelector(".mosya-confirm-button");
    cancelBtn == null ? void 0 : cancelBtn.addEventListener("click", () => settle(false, onCancel));
    confirmBtn == null ? void 0 : confirmBtn.addEventListener("click", () => settle(true, onConfirm));
  }
  if (opts.allowEscapeKey !== false) {
    const esc = (e) => {
      if (e.key === "Escape") {
        settle(false, onCancel);
        document.removeEventListener("keydown", esc);
      }
    };
    document.addEventListener("keydown", esc);
  }
  popup.show();
  return promise;
}
function prompt$1(options, onConfirm, onCancel) {
  const opts = typeof options === "string" ? { text: options, showCancelButton: true, inputPlaceholder: "Type here..." } : { showCancelButton: true, ...options };
  const popup = new BasePopup(opts);
  const element = popup.getElement();
  const content = element.querySelector(".mosya-content");
  const actions = element.querySelector(".mosya-actions");
  const inputWrapper = document.createElement("div");
  inputWrapper.className = "mosya-input-wrapper";
  const input = document.createElement("input");
  input.type = "text";
  input.className = "mosya-input";
  input.placeholder = opts.inputPlaceholder || "";
  input.value = opts.inputValue || "";
  inputWrapper.appendChild(input);
  content == null ? void 0 : content.appendChild(inputWrapper);
  let settled = false;
  let resolvePromise;
  const promise = new Promise((resolve) => {
    resolvePromise = resolve;
  });
  const finish = (value, cb) => {
    if (settled) return;
    settled = true;
    document.removeEventListener("keydown", keyHandler);
    popup.close();
    if (value !== null) onConfirm == null ? void 0 : onConfirm(value);
    else onCancel == null ? void 0 : onCancel();
    resolvePromise(value);
  };
  const keyHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      finish(input.value);
    } else if (e.key === "Escape" && opts.allowEscapeKey !== false) {
      finish(null);
    }
  };
  document.addEventListener("keydown", keyHandler);
  if (actions) {
    const cancelBtn = actions.querySelector(".mosya-cancel-button");
    const confirmBtn = actions.querySelector(".mosya-confirm-button");
    cancelBtn == null ? void 0 : cancelBtn.addEventListener("click", () => finish(null));
    confirmBtn == null ? void 0 : confirmBtn.addEventListener("click", () => finish(input.value));
  }
  popup.show();
  setTimeout(() => input.focus(), 100);
  return promise;
}
class ToastManager {
  constructor() {
    __publicField(this, "active", /* @__PURE__ */ new Map());
  }
  show(options) {
    const id = generateId();
    const toast2 = document.createElement("div");
    toast2.className = `mosya-toast ${options.type || "info"}`;
    toast2.dataset.toastId = id;
    const position = options.position || "top-end";
    toast2.classList.add(`mosya-toast-position-${position}`);
    const iconWrapper = document.createElement("div");
    iconWrapper.className = "mosya-toast-icon";
    const iconType = options.icon && options.icon !== "none" ? options.icon : options.type || "info";
    const svg = getIconSVG(iconType);
    if (svg) {
      const img = document.createElement("img");
      img.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      img.alt = "";
      iconWrapper.appendChild(img);
    }
    const content = document.createElement("div");
    content.className = "mosya-toast-content";
    content.textContent = options.message;
    toast2.appendChild(iconWrapper);
    toast2.appendChild(content);
    const duration = options.duration ?? 3e3;
    if (duration > 0) {
      const bar = document.createElement("div");
      bar.className = "mosya-toast-duration";
      bar.style.width = "100%";
      bar.style.transition = `width ${duration}ms linear`;
      toast2.appendChild(bar);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.width = "0%";
        });
      });
    }
    document.body.appendChild(toast2);
    requestAnimationFrame(() => {
      toast2.classList.add("show");
    });
    let timer;
    if (duration > 0) {
      timer = setTimeout(() => this.hide(id), duration);
    }
    this.active.set(id, { element: toast2, timer });
    toast2.addEventListener("click", () => this.hide(id));
    return id;
  }
  hide(id) {
    const entry = this.active.get(id);
    if (!entry) return;
    this.active.delete(id);
    if (entry.timer) clearTimeout(entry.timer);
    const { element } = entry;
    element.classList.remove("show");
    element.classList.add("hide");
    setTimeout(() => {
      element.remove();
    }, 350);
  }
  hideAll() {
    Array.from(this.active.keys()).forEach((id) => this.hide(id));
  }
}
const toastManager = new ToastManager();
function toast$1(options) {
  const opts = typeof options === "string" ? { message: options } : { ...options };
  return toastManager.show(opts);
}
toast$1.info = (message, options) => toast$1({ message, type: "info", ...options });
toast$1.success = (message, options) => toast$1({ message, type: "success", ...options });
toast$1.warning = (message, options) => toast$1({ message, type: "warning", ...options });
toast$1.error = (message, options) => toast$1({ message, type: "error", ...options });
toast$1.question = (message, options) => toast$1({ message, type: "question", ...options });
toast$1.hide = (id) => toastManager.hide(id);
toast$1.hideAll = () => toastManager.hideAll();
class ProgressManager {
  constructor() {
    __publicField(this, "instances", /* @__PURE__ */ new Map());
  }
  show(options = {}) {
    const id = generateId();
    const container = document.createElement("div");
    container.className = "mosya-container";
    container.id = `mosya-progress-${id}`;
    if (options.backdrop !== false) {
      const backdrop = document.createElement("div");
      backdrop.className = "mosya-backdrop";
      container.appendChild(backdrop);
    }
    const popup = document.createElement("div");
    popup.className = "mosya-popup mosya-progress-popup";
    if (options.showCloseButton !== false) {
      const closeButton = document.createElement("button");
      closeButton.className = "mosya-close-button";
      closeButton.innerHTML = "&times;";
      closeButton.title = options.closeButtonTitle || "Close";
      closeButton.addEventListener("click", () => this.hide(id));
      popup.appendChild(closeButton);
    }
    const spinner = document.createElement("div");
    spinner.className = "mosya-progress-spinner";
    popup.appendChild(spinner);
    if (options.title) {
      const title = document.createElement("h3");
      title.className = "mosya-progress-title";
      title.textContent = options.title;
      popup.appendChild(title);
    }
    const text = document.createElement("p");
    text.className = "mosya-progress-text";
    text.textContent = options.text || (options.title ? "" : "Loading...");
    if (text.textContent) popup.appendChild(text);
    container.appendChild(popup);
    document.body.appendChild(container);
    if (options.allowEscapeKey !== false) {
      const esc = (e) => {
        if (e.key === "Escape") {
          this.hide(id);
          document.removeEventListener("keydown", esc);
        }
      };
      document.addEventListener("keydown", esc);
    }
    this.instances.set(id, container);
    return id;
  }
  update(id, options) {
    var _a;
    const instance = this.instances.get(id);
    if (!instance || !options) return;
    if (options.title !== void 0) {
      let titleElement = instance.querySelector(".mosya-progress-title");
      if (!titleElement) {
        titleElement = document.createElement("h3");
        titleElement.className = "mosya-progress-title";
        const spinner = instance.querySelector(".mosya-progress-spinner");
        spinner == null ? void 0 : spinner.after(titleElement);
      }
      titleElement.textContent = options.title;
    }
    if (options.text !== void 0) {
      let textElement = instance.querySelector(".mosya-progress-text");
      if (!textElement) {
        textElement = document.createElement("p");
        textElement.className = "mosya-progress-text";
        (_a = instance.querySelector(".mosya-progress-popup")) == null ? void 0 : _a.appendChild(textElement);
      }
      textElement.textContent = options.text;
    }
  }
  hide(id) {
    const instance = this.instances.get(id);
    if (instance) {
      instance.remove();
      this.instances.delete(id);
    }
  }
  hideAll() {
    Array.from(this.instances.keys()).forEach((id) => this.hide(id));
  }
}
const progressManager = new ProgressManager();
function progress$1(options = {}) {
  const opts = typeof options === "string" ? { text: options } : { ...options };
  if (opts.backdrop === void 0) opts.backdrop = true;
  return progressManager.show(opts);
}
function updateProgress$1(id, updates) {
  progressManager.update(id, updates);
}
function hideProgress$1(id) {
  progressManager.hide(id);
}
function hideAllProgress$1() {
  progressManager.hideAll();
}
function alert(options, onClose) {
  injectStyles();
  return alert$1(options, onClose);
}
function confirm(options, onConfirm, onCancel, onDeny) {
  injectStyles();
  return confirm$1(options, onConfirm, onCancel, onDeny);
}
function prompt(options, onConfirm, onCancel) {
  injectStyles();
  return prompt$1(options, onConfirm, onCancel);
}
function progress(options) {
  injectStyles();
  return progress$1(options);
}
function updateProgress(id, updates) {
  updateProgress$1(id, updates);
}
function hideProgress(id) {
  hideProgress$1(id);
}
function hideAllProgress() {
  hideAllProgress$1();
}
function toastFactory() {
  const base = function toast2(options) {
    injectStyles();
    return toast$1(typeof options === "string" ? { message: options } : options);
  };
  base.info = (message, options) => {
    injectStyles();
    return toast$1.info(message, options);
  };
  base.success = (message, options) => {
    injectStyles();
    return toast$1.success(message, options);
  };
  base.warning = (message, options) => {
    injectStyles();
    return toast$1.warning(message, options);
  };
  base.error = (message, options) => {
    injectStyles();
    return toast$1.error(message, options);
  };
  base.question = (message, options) => {
    injectStyles();
    return toast$1.question(message, options);
  };
  base.hide = (id) => toast$1.hide(id);
  base.hideAll = () => toast$1.hideAll();
  return base;
}
const toast = toastFactory();
export {
  alert,
  confirm,
  hideAllProgress,
  hideProgress,
  progress,
  prompt,
  toast,
  updateProgress
};
//# sourceMappingURL=index.es.js.map
